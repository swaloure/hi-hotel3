const RETRY_DELAYS_MS = [700, 1600, 3200] as const;
const RETRYABLE_STATUS_CODES = new Set([408, 425, 429]);

export async function fetchWithRetry(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt += 1) {
    try {
      const response = await fetch(input, init);

      if (response.ok || !shouldRetryResponse(response) || attempt === RETRY_DELAYS_MS.length) {
        return response;
      }
    } catch (error) {
      lastError = error;
      if (attempt === RETRY_DELAYS_MS.length) throw error;
    }

    await wait(RETRY_DELAYS_MS[attempt]);
  }

  throw lastError instanceof Error ? lastError : new Error('Request failed after automatic retries.');
}

function shouldRetryResponse(response: Response) {
  return RETRYABLE_STATUS_CODES.has(response.status) || response.status >= 500;
}

function wait(delay: number) {
  return new Promise<void>((resolve) => globalThis.setTimeout(resolve, delay));
}
