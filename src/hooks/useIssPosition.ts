import { useState, useEffect, useRef } from 'react';
import { getTLE } from '@/services/getTLE';
import { calculateISSPosition } from '@/utils/calculateISSPosition';

interface IssTrackPoint {
  lat: number;
  lng: number;
  alt: number;
  timestamp: number;
}

const UPDATE_INTERVAL_MS = 150;
const TLE_FETCH_INTERVAL_MS = 60000;
const MAX_PATH_POINTS = 2000;
const LERP_FACTOR = 0.08;

/**
 * Propagates ISS orbital position and animates its movement on a 3D globe.
 * Mutates issPositionRef directly to expose coordinates without triggering React re-renders.
 */
const useIssPosition = (
  globeRef: React.MutableRefObject<any>,
  issPositionRef?: React.MutableRefObject<{ lat: number; lng: number; alt: number } | null>,
  onAvailable?: () => void
) => {
  const [hasTleError, setHasTleError] = useState(false);

  const tleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const propagateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasNotifiedRef = useRef(false);
  const onAvailableRef = useRef(onAvailable);

  const tleRef = useRef<string>('');
  const bufferRef = useRef<IssTrackPoint[]>([]);
  const lastRenderedRef = useRef<{ lat: number; lng: number; alt: number } | null>(null);

  // Stable object prevents Globe.gl from re-instantiating the DOM marker
  const issPointRef = useRef({
    lat: 0,
    lng: 0,
    alt: 0,
    isISS: true,
    city: 'ISS',
    country: 'Orbit',
    element: null as HTMLDivElement | null,
  });

  // Keep callback ref updated to avoid restarting the propagation interval on re-render
  useEffect(() => {
    onAvailableRef.current = onAvailable;
  }, [onAvailable]);

  useEffect(() => {
    const fetchTle = async () => {
      try {
        const tle = await getTLE();
        tleRef.current = tle;
        setHasTleError(false);
      } catch (e) {
        console.error('Error fetching TLE in hook:', e);
        if (!tleRef.current) {
          setHasTleError(true);
        }
      }
    };

    fetchTle();
    tleIntervalRef.current = setInterval(fetchTle, TLE_FETCH_INTERVAL_MS);

    return () => {
      if (tleIntervalRef.current) clearInterval(tleIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const globe = globeRef.current;
      if (!globe || !tleRef.current) return;

      const real = calculateISSPosition(tleRef.current);
      if (!real) return;

      const target = {
        lat: real.lat,
        lng: real.lng,
        // Fallback to nominal ISS orbital altitude in km (LEO average)
        alt: real.alt || 420,
      };

      if (!lastRenderedRef.current) {
        lastRenderedRef.current = target;
      }

      const prev = lastRenderedRef.current;
      const t = LERP_FACTOR;

      const lat = prev.lat + (target.lat - prev.lat) * t;
      const alt = prev.alt + (target.alt - prev.alt) * t;

      // Shortest-path longitude interpolation across the antimeridian
      let dLng = target.lng - prev.lng;
      if (dLng > 180) dLng -= 360;
      if (dLng < -180) dLng += 360;

      const lng = prev.lng + dLng * t;

      const smoothed = { lat, lng, alt };
      lastRenderedRef.current = smoothed;

      bufferRef.current.push({
        ...smoothed,
        timestamp: Date.now(),
      });

      if (bufferRef.current.length > MAX_PATH_POINTS) {
        bufferRef.current.shift();
      }

      const iss = issPointRef.current;
      iss.lat = smoothed.lat;
      iss.lng = smoothed.lng;
      iss.alt = smoothed.alt;

      if (issPositionRef) {
        issPositionRef.current = { lat: smoothed.lat, lng: smoothed.lng, alt: smoothed.alt };
      }

      if (onAvailableRef.current && !hasNotifiedRef.current) {
        hasNotifiedRef.current = true;
        onAvailableRef.current();
      }

      // Direct DOM mutation avoids React render cycles at high frequency
      if (iss.element) {
        const latEl = iss.element.querySelector('.iss-lat');
        const lngEl = iss.element.querySelector('.iss-lng');
        const altEl = iss.element.querySelector('.iss-alt');
        if (latEl) latEl.textContent = smoothed.lat.toFixed(4);
        if (lngEl) lngEl.textContent = smoothed.lng.toFixed(4);
        if (altEl) altEl.textContent = smoothed.alt.toFixed(1);
      }

      globe.htmlElementsData([iss]);

      if (bufferRef.current.length > 2) {
        globe.pathsData([
          bufferRef.current.map((p) => ({
            lat: p.lat,
            lng: p.lng,
            // Scaled orbital shell height in Globe.gl relative units
            alt: 0.16,
          })),
        ]);
      }

      globe.ringsData([smoothed]);
    };

    propagateIntervalRef.current = setInterval(tick, UPDATE_INTERVAL_MS);

    return () => {
      if (propagateIntervalRef.current) {
        clearInterval(propagateIntervalRef.current);
      }
    };
  }, [globeRef, issPositionRef]);

  return {
    hasTleError,
  };
};

export default useIssPosition;
