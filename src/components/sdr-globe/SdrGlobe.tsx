// Imports
import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { FiCrosshair } from 'react-icons/fi';
import { useTranslation } from '@/i18n';

import type { SdrStation } from '@/types/SdrStation';
import { sdrStations } from '@/utils/sdrStations';
import useIssPosition from '@/hooks/useIssPosition';
import SdrInfoPanel from '@/components/sdr-info-panel/SdrInfoPanel';
import styles from './SdrGlobe.module.css';
import { getStationFrequency, getBestStation } from '@/utils/formatFrequency';

// Tipos e interfaces (No se declaran tipos locales aquí, se importan)

// Constantes
const COLOR_ACTIVE = '#00F0FF';
const COLOR_INACTIVE = 'rgba(112, 0, 255, 0.55)';
const ROTATION_SPEED = 0.05;

// Componente principal

/**
 * SdrGlobe: Representa el globo terráqueo 3D, los marcadores de las estaciones SDR
 * terrestres y la ISS orbitando en tiempo real.
 * Coordina la evaluación espacial constante para seleccionar la estación óptima
 * y calcula el efecto Doppler en la frecuencia de transmisión.
 */
const SdrGlobe = () => {
  const { t } = useTranslation();
  const tRef = useRef(t);
  
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const issPositionRef = useRef<{ lat: number; lng: number; alt: number } | null>(null);
  const prevIssForDopplerRef = useRef<{ lat: number; lng: number; alt: number } | null>(null);
  const highlightIndexRef = useRef(-1);

  // Estados
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [issAvailable, setIssAvailable] = useState(false);
  const [frequency, setFrequency] = useState<string>('145.80000 MHz');

  // Hooks personalizados

  // hook encargado de mantener la posición de la ISS y su TLE al día (trabajo de fondo).
  useIssPosition(globeRef, issPositionRef, () => setIssAvailable(true));

  // Valores derivados
  const activeStation = sdrStations.find(s => s.id === highlightIndex) || null;

  // Effects

  /**
   * Mantiene un ref sincronizado con el estado de la estación resaltada para
   * poder leerlo sin problemas de closure en los callbacks asíncronos de Globe.gl.
   */
  useEffect(() => {
    highlightIndexRef.current = highlightIndex;
  }, [highlightIndex]);

  /**
   * Bucle de cálculo del Efecto Doppler.
   * Se evalúa cada 1 segundo respecto de la estación actualmente activa.
   */
  useEffect(() => {
    if (!activeStation) {
      setFrequency(t('globe.outOfRange'));
      return;
    }

    const dopplerInterval = setInterval(() => {
      const currentIss = issPositionRef.current;
      if (!currentIss) return;

      const prevIss = prevIssForDopplerRef.current;

      if (prevIss) {
        const timeDeltaSeconds = 1;
        const baseFreq = 145.800; // Frecuencia de downlink de telemetría / repetidor de la ISS (MHz)

        // Se simula la altitud de la estación terrestre a nivel del mar (0) para la geometría del Doppler
        const stationPositionForDoppler = {
          lat: activeStation.lat,
          lng: activeStation.lng,
          alt: 0,
        };

        const calculatedFreq = getStationFrequency(
          currentIss,
          prevIss,
          timeDeltaSeconds,
          baseFreq,
          stationPositionForDoppler
        );

        setFrequency(calculatedFreq);
      }

      prevIssForDopplerRef.current = { ...currentIss };
    }, 1000);

    return () => {
      clearInterval(dopplerInterval);
      prevIssForDopplerRef.current = null;
    };
  }, [activeStation, t]);

  /**
   * Bucle del Escáner de Visibilidad Espacial.
   * Chequea cada 3 segundos si hay una estación con un mejor ángulo de elevación
   * hacia la ISS, lo cual garantiza una mejor Línea de Vista (LOS).
   */
  useEffect(() => {
    const evaluateInterval = setInterval(() => {
      const currentIss = issPositionRef.current;

      if (currentIss) {
        const optimalStation = getBestStation(currentIss, sdrStations);

        if (optimalStation) {
          if (optimalStation.id !== highlightIndexRef.current) {
            console.log(`Cambiando a la mejor estación: ${optimalStation.city}`);
            setHighlightIndex(optimalStation.id);
          }
        } else {
          if (highlightIndexRef.current !== -1) {
            console.log("ISS fuera de rango de todas las estaciones.");
            setHighlightIndex(-1);
          }
        }
      }
    }, 3000);

    return () => clearInterval(evaluateInterval);
  }, []);

  /**
   * Inicialización e inyección del lienzo (canvas) WebGL mediante Globe.gl.
   * Configura las luces, atmósferas, estilos de los marcadores y HTML overlays.
   */
  useEffect(() => {
    if (!containerRef.current) return;

    const globe = new Globe(containerRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl("")
      .backgroundImageUrl(null)
      .showAtmosphere(true)
      .atmosphereColor('#38bdf8')
      .atmosphereAltitude(0.22)

      // SDR STATIONS (Render de Puntos)
      .pointsData(sdrStations)
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude((d: any) =>
        (d as SdrStation).id === highlightIndexRef.current ? 0.05 : 0.01
      )
      .pointRadius((d: any) =>
        (d as SdrStation).id === highlightIndexRef.current ? 1.1 : 0.65
      )
      .pointColor((d: any) =>
        (d as SdrStation).id === highlightIndexRef.current ? COLOR_ACTIVE : COLOR_INACTIVE
      )
      .pointLabel((d: any) => {
        const s = d as SdrStation;
        const isActive = s.id === highlightIndexRef.current;
        const accentColor = isActive ? '#00F0FF' : '#7000FF';
        const labelText = isActive ? tRef.current('globe.activeStation') : tRef.current('globe.sdrStation');
        return `
          <div style="
            background: rgba(11, 16, 30, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 10px 14px;
            border-radius: 4px;
            color: #F8FAFC;
            border: 1px solid rgba(0, 240, 255, 0.2);
            box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.5), 0 0 0 1px ${accentColor}33;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 12px;
            min-width: 140px;
          ">
            <div style="font-size: 9px; font-weight: 700; color: ${accentColor}; letter-spacing: 0.1em; margin-bottom: 4px; text-transform: uppercase;">
              ${labelText}
            </div>
            <strong style="font-size: 13px; color: #ffffff; letter-spacing: 0.05em;">${s.city}</strong><br/>
            <span style="color: #94A3B8; font-size: 11px;">${s.country}</span>
            <div style="margin-top: 6px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 6px; font-size: 10px; color: #00F0FF; font-family: 'Fira Code', monospace;">
              LAT: ${s.lat.toFixed(4)}<br/>
              LNG: ${s.lng.toFixed(4)}
            </div>
          </div>
        `;
      })
      .onPointHover((hoverObj: any) => {
        if (containerRef.current) {
          containerRef.current.style.cursor = hoverObj ? 'pointer' : 'default';
        }
      })
      .width(containerRef.current.clientWidth)
      .height(containerRef.current.clientHeight);

    // ISS (SVG + HOVER TOOLTIP como Elemento HTML para evitar borrosidad del Canvas 3D)
    globe
      .htmlElementsData([])
      .htmlLat('lat')
      .htmlLng('lng')
      .htmlAltitude(0.22)
      .htmlElement((d: any) => {
        const el = document.createElement('div');
        el.className = styles.issMarkerContainer;
        el.innerHTML = `
          <svg class="${styles.issMarker}" viewBox="0 0 64 64" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="${styles.issRadar}" cx="32" cy="32" r="28" stroke="#00F0FF" stroke-width="1" stroke-opacity="0.8" stroke-dasharray="4 2" />
            <circle cx="32" cy="32" r="16" stroke="#00F0FF" stroke-width="0.5" stroke-opacity="0.3" />
            <rect x="28" y="22" width="8" height="20" rx="2" fill="#00F0FF" />
            <rect x="22" y="29" width="20" height="6" rx="1" fill="#00F0FF" />
            <rect x="6" y="16" width="14" height="12" rx="1" fill="#1E3A8A" fill-opacity="0.9" stroke="#00F0FF" stroke-width="1" />
            <rect x="6" y="36" width="14" height="12" rx="1" fill="#1E3A8A" fill-opacity="0.9" stroke="#00F0FF" stroke-width="1" />
            <line x1="13" y1="28" x2="13" y2="36" stroke="#00F0FF" stroke-width="2" />
            <rect x="44" y="16" width="14" height="12" rx="1" fill="#1E3A8A" fill-opacity="0.9" stroke="#00F0FF" stroke-width="1" />
            <rect x="44" y="36" width="14" height="12" rx="1" fill="#1E3A8A" fill-opacity="0.9" stroke="#00F0FF" stroke-width="1" />
            <line x1="51" y1="28" x2="51" y2="36" stroke="#00F0FF" stroke-width="2" />
            <line x1="20" y1="32" x2="22" y2="32" stroke="#00F0FF" stroke-width="2" />
            <line x1="42" y1="32" x2="44" y2="32" stroke="#00F0FF" stroke-width="2" />
            <circle cx="32" cy="32" r="2.5" fill="#ffffff" />
          </svg>
          <div class="${styles.issTooltip}">
            <strong style="color:#00F0FF; letter-spacing: 0.1em; text-transform: uppercase;">${tRef.current('globe.issDatalink')}</strong><br/><br/>
            LAT <span class="iss-lat" style="color: #fff; margin-left: 8px;">${d.lat ? d.lat.toFixed(4) : '0.0000'}</span><br/>
            LNG <span class="iss-lng" style="color: #fff; margin-left: 8px;">${d.lng ? d.lng.toFixed(4) : '0.0000'}</span><br/>
            ALT <span class="iss-alt" style="color: #fff; margin-left: 8px;">${d.alt ? d.alt.toFixed(1) : '0.0'}</span> KM
          </div>
        `;
        el.style.pointerEvents = 'auto';
        el.style.cursor = 'pointer';

        el.onclick = () => {
          window.open('https://live.ariss.org/', '_blank', 'noopener,noreferrer');
        };

        d.element = el;
        return el;
      })

      .htmlElementVisibilityModifier((el: any, isVisible: boolean) => {
        el.style.opacity = isVisible ? '1' : '0';
        el.style.pointerEvents = isVisible ? 'auto' : 'none';
      });

    // ORBITAL PATH (La estela que deja la ISS detrás)
    globe
      .pathsData([])
      .pathPointLat((p: any) => p.lat)
      .pathPointLng((p: any) => p.lng)
      .pathPointAlt((p: any) => p.alt)
      .pathColor(() => 'rgba(56, 191, 248, 0)')
      .pathStroke(() => 2.5);

    // LABELS (Texto para la estación activa)
    globe
      .labelsData(sdrStations.filter(s => s.id === highlightIndexRef.current))
      .labelLat('lat')
      .labelLng('lng')
      .labelText('city')
      .labelColor(() => '#00F0FF')
      .labelSize(1.4)
      .labelResolution(8)
      .labelAltitude(0);

    // RINGS (Pulsos de onda de radio sobre la ISS)
    globe
      .ringsData([])
      .ringColor(() => 'rgba(0, 240, 255, 0.15)')
      .ringMaxRadius(3.5)
      .ringPropagationSpeed(0.9)
      .ringRepeatPeriod(2000);

    // CONTROLES DE CÁMARA
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = ROTATION_SPEED;
    controls.enableZoom = true;
    controls.enablePan = false;

    globeRef.current = globe;
    const container = containerRef.current;

    // Ajuste responsivo automático si el div contenedor cambia de tamaño
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (globeRef.current) {
          globeRef.current.width(width);
          globeRef.current.height(height);
        }
      }
    });

    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver.disconnect();
      globeRef.current = null;
      if (container) container.innerHTML = '';
    };
  }, []);

  /**
   * Actualización Dinámica del estado gráfico WebGL en base a React State.
   * Ajusta colores, alturas, tamaños y encuadre (Point Of View) cuando la estación óptima cambia.
   */
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.pointColor((d: any) =>
      (d as SdrStation).id === highlightIndex ? COLOR_ACTIVE : COLOR_INACTIVE
    );
    globe.pointAltitude((d: any) =>
      (d as SdrStation).id === highlightIndex ? 0.05 : 0.01
    );
    globe.pointRadius((d: any) =>
      (d as SdrStation).id === highlightIndex ? 1.1 : 0.65
    );

    globe.labelsData(sdrStations.filter(s => s.id === highlightIndex));

    if (activeStation) {
      // Si entra una estación a foco, girar el globo para observarla desde arriba
      globe.pointOfView(
        { lat: activeStation.lat, lng: activeStation.lng, altitude: 1.6 },
        1200
      );
    }
  }, [highlightIndex, activeStation]);

  // Funciones auxiliares / Event Handlers

  /**
   * Fuerza la rotación del globo de forma manual para enfocar la posición actual de la ISS.
   */
  const focusISS = () => {
    const globe = globeRef.current;
    const iss = issPositionRef.current;
    if (!globe || !iss) return;

    globe.pointOfView(
      { lat: iss.lat, lng: iss.lng, altitude: 1.6 },
      1200
    );
  };

  // Render
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.globeWrapper}>
        <div ref={containerRef} className={styles.globeContainer} />

        <button
          onClick={focusISS}
          className={styles.focusButton}
          disabled={!issAvailable}
        >
          <FiCrosshair />
          ISS
        </button>
      </div>

      <SdrInfoPanel
        station={activeStation}
        frequency={frequency}
      />
    </div>
  );
};

export default SdrGlobe;