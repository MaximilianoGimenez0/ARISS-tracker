import type { SdrStation } from '@/types/SdrStation';
import type { IssPosition } from '@/utils/calculateISSPosition';

// Speed of light in vacuum in km/s
const C_KM_S = 299792.458;
// Mean volumetric Earth radius in km
const EARTH_RADIUS_KM = 6371;

/**
 * Converts geodetic coordinates to ECEF 3D cartesian coordinates using a spherical Earth model.
 */
export const toCartesian = (
  lat: number,
  lng: number,
  alt: number
): { x: number; y: number; z: number } => {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  const r = EARTH_RADIUS_KM + alt;

  return {
    x: r * Math.cos(latRad) * Math.cos(lngRad),
    y: r * Math.cos(latRad) * Math.sin(lngRad),
    z: r * Math.sin(latRad),
  };
};

/**
 * Computes 3D Euclidean distance (slant range) between two ECEF points.
 */
export const distance3D = (
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number }
): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

/**
 * Computes topocentric elevation angle in degrees of the ISS above the ground station horizon.
 */
export const getElevation = (
  stationLat: number,
  stationLng: number,
  stationAlt: number,
  issLat: number,
  issLng: number,
  issAlt: number
): number => {
  const station3D = toCartesian(stationLat, stationLng, stationAlt);
  const iss3D = toCartesian(issLat, issLng, issAlt);

  // Line-of-sight vector from station to ISS
  const rx = iss3D.x - station3D.x;
  const ry = iss3D.y - station3D.y;
  const rz = iss3D.z - station3D.z;

  const slantRange = Math.sqrt(rx * rx + ry * ry + rz * rz);
  if (slantRange === 0) return 90; // Zenith fallback when station and ISS coordinates coincide

  const stationNorm = Math.sqrt(
    station3D.x * station3D.x +
    station3D.y * station3D.y +
    station3D.z * station3D.z
  );
  if (stationNorm === 0) return -90;

  // Station local zenith unit normal vector
  const nx = station3D.x / stationNorm;
  const ny = station3D.y / stationNorm;
  const nz = station3D.z / stationNorm;

  const dotProduct = rx * nx + ry * ny + rz * nz;
  const sinElevation = dotProduct / slantRange;

  const clampedSin = Math.max(-1, Math.min(1, sinElevation));
  const elevationRad = Math.asin(clampedSin);

  return (elevationRad * 180) / Math.PI;
};

export const hasLOS = (elevationDeg: number): boolean => {
  return elevationDeg > 0;
};

/**
 * Computes Doppler-shifted received frequency given radial velocity derived from consecutive positions.
 */
export const getStationFrequency = (
  currentIss: IssPosition,
  prevIss: IssPosition,
  deltaTimeSeconds: number,
  baseFreqMHz: number,
  station: IssPosition
): string => {
  if (deltaTimeSeconds <= 0) {
    return `${baseFreqMHz.toFixed(5)}`;
  }

  const station3D = toCartesian(station.lat, station.lng, station.alt);
  const current3D = toCartesian(currentIss.lat, currentIss.lng, currentIss.alt);
  const prev3D = toCartesian(prevIss.lat, prevIss.lng, prevIss.alt);

  const currentDistance = distance3D(station3D, current3D);
  const prevDistance = distance3D(station3D, prev3D);

  // Radial velocity derived from slant-range change; negative approaching, positive receding
  const radialVelocityKmS = (currentDistance - prevDistance) / deltaTimeSeconds;

  // Non-relativistic Doppler frequency shift
  const shiftedFreq = baseFreqMHz * (1 - radialVelocityKmS / C_KM_S);

  return `${shiftedFreq.toFixed(5)}`;
};

/**
 * Selects the ground station with the highest elevation angle to the ISS.
 * Mutates distanceFromIss and elevation on station objects in place.
 */
export const getBestStation = (
  issPosition: IssPosition,
  stations: SdrStation[]
): SdrStation | null => {
  if (!stations.length) return null;

  let best: SdrStation | null = null;
  let maxElevation = -Infinity;

  for (const station of stations) {
    const station3D = toCartesian(station.lat, station.lng, 0);
    const iss3D = toCartesian(issPosition.lat, issPosition.lng, issPosition.alt);

    const slantRange = distance3D(station3D, iss3D);
    station.distanceFromIss = slantRange;

    const elevation = getElevation(
      station.lat,
      station.lng,
      0,
      issPosition.lat,
      issPosition.lng,
      issPosition.alt
    );

    if (hasLOS(elevation)) {
      if (elevation > maxElevation) {
        maxElevation = elevation;
        best = station;
        station.elevation = maxElevation;
      }
    }
  }

  if (!best) {
    console.log(
      '🛰️ ISS fuera de rango. Ninguna estación terrestre SDR tiene línea de vista directa (LOS).'
    );
    return null;
  }

  console.log(
    `✅ Mejor estación: ${best.city}, ${best.country} (Distancia real: ${best.distanceFromIss?.toFixed(2) ?? "N/A"} km, Elevación: ${maxElevation.toFixed(2)}°)`
  );

  return best;
};