export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";

export async function publicFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!response.ok) {
    let message = `Error ${response.status}`;
    try {
      const body = (await response.json()) as { detail?: string };
      if (body.detail) message = body.detail;
    } catch {
      // Keep status-only error when response is not JSON.
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export interface SimulationPayload {
  productId: string;
  clientImageBase64: string;
  maskBase64: string;
}

export interface SimulationResult {
  success: boolean;
  simulationUrl: string;
  productId: string;
}

export function simulateProduct(payload: SimulationPayload): Promise<SimulationResult> {
  return publicFetch<SimulationResult>("/public/simulate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
