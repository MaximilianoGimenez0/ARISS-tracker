import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { FiCrosshair } from 'react-icons/fi';
import { useTranslation } from "../../i18n";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <FiCrosshair className="footer-icon" />
            <h3>ARISS<span>tracker</span></h3>
          </div>
          <p className="footer-slogan">{t('footer.slogan')}</p>
        </div>

        <div className="footer-links-section">
          <h4>{t('footer.developer')}</h4>
          <p className="author-name">Maximiliano Giménez</p>
          <div className="footer-socials">
            <a href="https://github.com/MaximilianoGimenez0" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://wa.me/5491140675852" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://www.linkedin.com/in/maximiliano-gim%C3%A9nez-2644b0338/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ARISS-tracker. {t('footer.dataBy')}</p>
      </div>
    </footer>
  );
}
