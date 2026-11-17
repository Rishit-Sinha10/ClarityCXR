import { API_URL, ApiRequestError, requestJson } from "./api";

export type Study = {
  id: string;
  original_filename: string;
  filename: string;
  size_bytes: number;
  status: string;
  created_at: string;
};

type RawStudy = {
  id: string;
  original_filename?: string;
  filename?: string;
  size_bytes: number;
  status: string;
  created_at: string;
};

function normalizeStudy(raw: RawStudy): Study {
  const filename = raw.original_filename ?? raw.filename ?? "Untitled study";

  return {
    id: raw.id,
    original_filename: filename,
    filename,
    size_bytes: raw.size_bytes,
    status: raw.status,
    created_at: raw.created_at,
  };
}

export async function listStudies(): Promise<Study[]> {
  const studies = await requestJson<RawStudy[]>("/studies");
  return studies.map(normalizeStudy);
}

export async function getStudyById(id: string): Promise<Study | null> {
  try {
    const study = await requestJson<RawStudy>(
      `/studies/${encodeURIComponent(id)}`,
    );
    return normalizeStudy(study);
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export function getStudyImageUrl(studyId: string): string | null {
  if (!API_URL) {
    return null;
  }

  return `${API_URL}/studies/${encodeURIComponent(studyId)}/image`;
}

export function studyLabel(study: Pick<Study, "filename" | "id">) {
  return study.filename || study.id;
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
