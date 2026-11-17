import { ImageResponse } from "next/og";
import { siteName, siteUrl } from "@/lib/site";

export const alt =
  "ClarityCXR — chest X-ray and CT reads, fused with the clinical picture. Decision support for radiology teams.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["FILM", "LABS", "PRIOR", "NOTE"];

export default function OpengraphImage() {
  const host = siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#ffffff",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  backgroundColor: "#0fd3b8",
                  marginRight: 12,
                  display: "flex",
                }}
              />
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#0a0a0a",
                  letterSpacing: "-0.02em",
                }}
              >
                {siteName}
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#666666",
                letterSpacing: "0.18em",
              }}
            >
              DECISION SUPPORT FOR RADIOLOGY TEAMS
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 62,
                lineHeight: 1.05,
                fontWeight: 600,
                color: "#0a0a0a",
                letterSpacing: "-0.03em",
                maxWidth: 1010,
              }}
            >
              Chest X-ray and CT reads, fused with the clinical picture.
            </div>
            <div style={{ display: "flex", marginTop: 34 }}>
              {chips.map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    border: "1px solid #d9d9d9",
                    borderRadius: 8,
                    padding: "8px 13px",
                    marginRight: 10,
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    color: "#555555",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              borderTop: "1px solid #e6e6e6",
              paddingTop: 24,
            }}
          >
            <div style={{ fontSize: 20, color: "#3f3f3f" }}>
              Every finding traceable to its source.
            </div>
            <div style={{ display: "flex", fontSize: 14, color: "#8a8a8a" }}>
              {host} · Illustrative interface · synthetic data
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
