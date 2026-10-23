import { ISS_TLE_URL, TLE_FETCH_TIMEOUT_MS } from '@/config/constants';

/**
 * Fetches raw Two-Line Elements (TLE) from the ARISS public endpoint.
 * Throws if the request fails or exceeds the timeout.
 */
export const getTLE = async (timeoutMs: number = TLE_FETCH_TIMEOUT_MS): Promise<string> => {
  const controller = new AbortController();

  console.log("Timer started");

  const timeoutId = setTimeout(() => {
    console.log("Timer aborted");
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(ISS_TLE_URL, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch TLE: ${response.status} ${response.statusText}`);
    }
    const data = await response.text();
    return data.trim();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      const timeoutError = new Error(`TLE fetch timed out after ${timeoutMs}ms`);
      console.error('Error fetching ISS TLE (Timeout):', timeoutError);
      throw timeoutError;
    }
    console.error('Error fetching ISS TLE (Red/API fallback):', error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
