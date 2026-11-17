export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://claritycxr.com"
).replace(/\/$/, "");

export const siteName = "ClarityCXR";

export const siteDescription =
  "ClarityCXR links findings on chest X-ray and CT to the chart, prior reports, and clinical notes in one source-linked summary. Decision support for radiology teams.";

export const siteTitle =
  "ClarityCXR — Chest X-ray and CT reads with the clinical picture";
