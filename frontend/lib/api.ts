export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function getStudies() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  const response = await fetch(`${API_URL}/studies`);
  if (!response.ok) {
    throw new Error(`Failed to fetch studies: ${response.status}`);
  }
  return response.json();
}
