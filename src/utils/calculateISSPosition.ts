import {
  twoline2satrec,
  propagate,
  gstime,
  eciToGeodetic,
  degreesLong,
  degreesLat,
} from 'satellite.js';

export interface IssPosition {
  lat: number;
  lng: number;
  /** Altitude above mean sea level in kilometers. */
  alt: number;
}

/**
 * Computes geodetic coordinates from a TLE string using the SGP4 propagator.
 * Returns null if propagation fails or coordinates are invalid.
 */
export const calculateISSPosition = (tleStr: string): IssPosition | null => {
  try {
    const lines = tleStr
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean);

    if (lines.length < 2) {
      console.warn('TLE inválido: menos de 2 líneas');
      return null;
    }

    // Use the last two lines to support 3-line TLE formats containing a title line
    const [tleLine1, tleLine2] = lines.length === 2 ? lines : lines.slice(-2);

    const satrec = twoline2satrec(tleLine1, tleLine2);
    const now = new Date();
    const pv = propagate(satrec, now);

    if (!pv?.position || typeof pv.position === 'boolean') {
      console.warn('Propagation falló (posición inercial ECI inválida)');
      return null;
    }

    // Greenwich Mean Sidereal Time converts inertial ECI to Earth-fixed geodetic coordinates
    const gmst = gstime(now);

    const gd = eciToGeodetic(pv.position, gmst);

    const lat = degreesLat(gd.latitude);
    const lng = degreesLong(gd.longitude);
    const alt = gd.height;

    if (![lat, lng, alt].every(Number.isFinite)) {
      return null;
    }

    return { lat, lng, alt };
  } catch (err) {
    console.error('Error calculando posición de la ISS (SGP4 Model Error):', err);
    return null;
  }
};