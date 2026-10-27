import { API_URL } from "./api";
export type Study = {
  id: string;
  original_filename: string;
  size_bytes: number;
  status: string;
  created_at: string;
};
export async function getStudyById(id: string): Promise<Study | null> {
  const response = await fetch(`${API_URL}/studies/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Failed to fetch study (${response.status})`);
  }
  return (await response.json()) as Study;
}
export function formatStudyDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}
export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
