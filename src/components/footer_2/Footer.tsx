import { FaGithub, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { FiCrosshair } from 'react-icons/fi';
import { useTranslation } from '@/i18n';
import {
  APP_NAME,
  APP_NAME_PREFIX,
  APP_NAME_SUFFIX,
  DEVELOPER_NAME,
  DEVELOPER_SOCIALS,
} from '@/config/constants';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <FiCrosshair className="footer-icon" />
            <h3>{APP_NAME_PREFIX}<span>{APP_NAME_SUFFIX}</span></h3>
          </div>
          <p className="footer-slogan">{t('footer.slogan')}</p>
        </div>

        <div className="footer-links-section">
          <h4>{t('footer.developer')}</h4>
          <p className="author-name">{DEVELOPER_NAME}</p>
          <div className="footer-socials">
            <a
              href={DEVELOPER_SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={DEVELOPER_SOCIALS.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href={DEVELOPER_SOCIALS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. {t('footer.dataBy')}</p>
      </div>
    </footer>
  );
};

export default Footer;
