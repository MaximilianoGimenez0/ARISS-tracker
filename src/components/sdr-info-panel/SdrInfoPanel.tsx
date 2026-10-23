import { useState } from 'react';
import { FiRadio, FiCopy, FiCheck } from 'react-icons/fi';
import { useTranslation } from '@/i18n';

import type { SdrStation } from '@/types/SdrStation';
import styles from './SdrInfoPanel.module.css';

interface SdrInfoPanelProps {
  /** Current line-of-sight station, or null when the ISS is out of range. */
  station: SdrStation | null;
  frequency: string;
}

const SdrInfoPanel = ({ station, frequency }: SdrInfoPanelProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(frequency);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  const handleOpenStationLink = () => {
    if (station && station.url) {
      window.open(station.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!station) {
    return (
      <div className={styles.panelContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.section}>
            <div className={styles.iconWrapper}>
              <FiRadio />
            </div>

            <div className={styles.infoContent}>
              <span className={styles.label}>{t('panel.station')}</span>
              <span className={styles.value}>
                {t('panel.noStation')}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panelContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.section}>
          <div
            className={styles.iconWrapper}
            onClick={handleOpenStationLink}
            title="Abrir enlace de la estación SDR"
          >
            <FiRadio />
          </div>

          <div className={styles.infoContent}>
            <span className={styles.label}>{t('panel.station')}</span>

            <span className={styles.value}>
              {station.city}, {station.country}
            </span>

            <span className={styles.subValue}>{station.utc}</span>
          </div>
        </div>

        <div className={styles.frequencySection}>
          <div className={styles.infoContent}>
            <span className={styles.label}>{t('panel.frequency')}</span>

            <div className={styles.frequencyDisplay}>
              <span className={styles.frequencyValue}>{frequency} Mhz</span>

              <button
                onClick={handleCopy}
                className={`${styles.copyButton} ${copied ? styles.copied : ''
                  }`}
                title="Copiar frecuencia"
                aria-label="Copiar frecuencia"
              >
                {copied ? <FiCheck /> : <FiCopy />}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.frequencySection}>
          <div className={styles.infoContent}>
            <span className={styles.label}>{t('panel.distance')}</span>
            <div className={styles.frequencyDisplay}>
              <span className={styles.frequencyValue}>{station.distanceFromIss?.toFixed(2) || '0.00'} km</span>
            </div>
          </div>
        </div>

        <div className={styles.frequencySection}>
          <div className={styles.infoContent}>
            <span className={styles.label}>{t('panel.elevation')}</span>
            <div className={styles.frequencyDisplay}>
              <span className={styles.frequencyValue}>{station.elevation?.toFixed(2) || '0.00'}°</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SdrInfoPanel;