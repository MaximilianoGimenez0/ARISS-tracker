// Imports
import { ISS_TLE_URL, TLE_FETCH_TIMEOUT_MS } from '@/config/constants';

// Funciones principales

/**
 * getTLE: Realiza una solicitud HTTP a la API pública de ARISS (Amateur Radio on the ISS)
 * para obtener el conjunto de elementos orbitales (TLE) más reciente en formato de texto puro.
 * 
 * Implementa un timeout de 5 segundos mediante AbortController.
 * 
 * Este TLE es la "semilla" matemática obligatoria que necesita el propagador SGP4
 * para calcular la órbita presente y futura.
 * 
 * @param {number} [timeoutMs=TLE_FETCH_TIMEOUT_MS] Tiempo máximo de espera en milisegundos.
 * @returns {Promise<string>} Una promesa que se resuelve con el contenido bruto (raw text) del TLE.
 * @throws Lanzará un error si la solicitud de red falla, se agota el timeout o el servidor de ARISS está caído.
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
