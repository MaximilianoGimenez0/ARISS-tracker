import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { useTranslation } from '@/i18n';
import styles from './TleErrorModal.module.css';

interface TleErrorModalProps {
  isOpen: boolean;
  /** Invoked when reload is triggered; reloads the window if omitted. */
  onReload?: () => void;
}

const TleErrorModal = ({ isOpen, onReload }: TleErrorModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={styles.modalOverlay} role="alertdialog" aria-modal="true">
      <div className={styles.modalCard}>
        <div className={styles.scannerLine} />

        <div className={styles.iconContainer}>
          <div className={styles.iconPulse} />
          <FiAlertTriangle className={styles.warningIcon} />
        </div>

        <div className={styles.badge}>
          <span className={styles.statusDot} />
          <span>{t('error.tle.badge')}</span>
        </div>

        <h2 className={styles.title}>{t('error.tle.title')}</h2>

        <p className={styles.description}>
          {t('error.tle.description')}
        </p>

        <button
          type="button"
          onClick={handleReload}
          className={styles.reloadButton}
        >
          <FiRefreshCw className={styles.buttonIcon} />
          <span>{t('error.tle.actionReload')}</span>
        </button>
      </div>
    </div>
  );
};

export default TleErrorModal;
