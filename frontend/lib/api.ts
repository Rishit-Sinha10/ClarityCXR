const configuredApiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
export const API_URL = (
  configuredApiUrl ??
  (process.env.NODE_ENV === "development" ? "http://127.0.0.1:8001" : undefined)
)?.replace(/\/+$/, "");
export class ApiRequestError extends Error {
  constructor(
    public readonly status: number | null,
    message: string,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}
function getApiUrl() {
  if (!API_URL) {
    throw new ApiRequestError(
      null,
      "Set NEXT_PUBLIC_API_URL to connect to the backend.",
    );
  }
  return API_URL;
}
export async function requestJson<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${getApiUrl()}${path}`;
  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }
    throw new ApiRequestError(
      null,
      "Could not reach the backend. Check the API URL and backend connection.",
    );
  }

  if (!response.ok) {
    throw new ApiRequestError(
      response.status,
      `The backend returned HTTP ${response.status}.`,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiRequestError(
      response.status,
      "The backend returned an invalid response.",
    );
  }
}

export type PredictionStatus =
  "pending" | "processing" | "completed" | "failed";

export type PredictionRecord = {
  id: string;
  study_id: string;
  status: PredictionStatus;
  model_name: string | null;
  model_version: string | null;
  task_type: string | null;
  results_json: unknown;
  created_at: string;
  completed_at: string | null;
};

export type PredictionCreated = Pick<PredictionRecord, "id" | "status">;

export async function getStudies() {
  return requestJson<unknown[]>("/studies");
}

export async function createPrediction(
  studyId: string,
): Promise<PredictionCreated> {
  return requestJson(`/studies/${encodeURIComponent(studyId)}/predict`, {
    method: "POST",
  });
}

export async function getStudyPredictions(
  studyId: string,
): Promise<PredictionRecord[]> {
  return requestJson(`/studies/${encodeURIComponent(studyId)}/predictions`);
}

export async function getPrediction(
  predictionId: string,
): Promise<PredictionRecord> {
  return requestJson(`/predictions/${encodeURIComponent(predictionId)}`);
}
