import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ROLES = new Set([
  "Radiologist",
  "Department head / clinical lead",
  "Hospital IT / imaging informatics",
  "Procurement / operations",
  "Clinical informatics",
  "Other",
]);

const VOLUMES = new Set([
  "Under 1,000 chest studies / month",
  "1,000 – 5,000 / month",
  "5,000 – 20,000 / month",
  "20,000+ / month",
  "Not sure yet",
]);

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);

  if (attempts.size > 5000) {
    for (const [key, times] of attempts) {
      if (!times.some((t) => now - t < WINDOW_MS)) attempts.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots do not retry.
  if (text(body.company_website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, 120);
  const email = text(body.email, 254);
  const institution = text(body.institution, 160);
  const role = text(body.role, 80);
  const volume = text(body.volume, 80);
  const message = text(body.message, 2000);

  if (!name || !email || !institution || !role) {
    return NextResponse.json(
      { error: "Please fill in your name, work email, institution, and role." },
      { status: 400 },
    );
  }

  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid work email address." },
      { status: 400 },
    );
  }

  if (!ROLES.has(role)) {
    return NextResponse.json({ error: "Please choose a role." }, { status: 400 });
  }

  const record = {
    name,
    email,
    institution,
    role,
    volume: VOLUMES.has(volume) ? volume : "",
    message,
    receivedAt: new Date().toISOString(),
    source: "website-demo",
  };

  const webhook = process.env.DEMO_REQUEST_WEBHOOK_URL;

  try {
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    } else if (process.env.NODE_ENV !== "production") {
      const dir = path.join(process.cwd(), ".data");
      await mkdir(dir, { recursive: true });
      await appendFile(
        path.join(dir, "demo-requests.jsonl"),
        `${JSON.stringify(record)}\n`,
        "utf8",
      );
    } else {
      return NextResponse.json(
        {
          error:
            "Demo requests are not connected yet. Please try again shortly.",
        },
        { status: 503 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "We could not save your request. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
