/**
 * Ground SDR station tracking ISS downlink transmissions.
 */
export type SdrStation = {
  id: number;
  country: string;
  city: string;
  lat: number;
  lng: number;
  utc: string;
  url: string;
  correctedFreq?: string | null;
  /** Slant range to the ISS in kilometers. */
  distanceFromIss?: number | null;
  /** Topocentric elevation in degrees above local horizon (> 0 indicates LOS). */
  elevation?: number | null;
};
