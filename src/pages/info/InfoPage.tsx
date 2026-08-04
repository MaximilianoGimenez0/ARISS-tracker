// Imports
import styles from './InfoPage.module.css';
import { LuBinary, LuActivity, LuGlobe, LuEye, LuRadioReceiver } from 'react-icons/lu';
import { useTranslation } from '@/i18n';

// Componente principal

/**
 * InfoPage: Vista estática informativa de la aplicación.
 * Desglosa y explica paso por paso la teoría, el modelo matemático y los cálculos orbitales 
 * subyacentes que permiten a la aplicación predecir y rastrear la ISS en tiempo real, 
 * junto al cálculo del efecto Doppler.
 */
const InfoPage = () => {
    const { t } = useTranslation();

    // Render
    return (
        <div className={styles.container}>
            <div className={styles.content}>

                {/* 1. Sección Hero (Encabezado principal) */}
                <header className={styles.hero}>
                    <h1 className={styles.title}>
                        {t('info.hero.title')} <span className={styles.accentOrange}>{t('info.hero.titleAccent')}</span>
                    </h1>
                </header>

                {/* 2. Sección de Datos TLE (Explicación del origen de la información) */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}><LuBinary size={28} /></div>
                        <h2 className={styles.cardTitle}>{t('info.tle.title')}</h2>
                    </div>

                    <p className={styles.cardText}>
                        {t('info.tle.p1')}
                    </p>

                    <div className={styles.tleTerminal}>
                        <span className={styles.tleLine}>ISS (ZARYA)</span>
                        <span className={styles.tleLine}>
                            1 <span className={styles.tleHighlightOrange}>25544</span>U 98067A   23282.52981545  .00018177  00000-0  32997-3 0  9997
                        </span>
                        <span className={styles.tleLine}>
                            2 <span className={styles.tleHighlightOrange}>25544</span> <span className={styles.tleHighlightBlue}> 51.6418</span>  94.1378 0003551  53.2847 306.9042 15.50027725419358
                        </span>
                    </div>

                    <div className={styles.tagContainer}>
                        <span className={styles.tag}>{t('info.tle.tagNorad')}</span>
                        <span className={`${styles.tag} ${styles.tagBlue}`}>{t('info.tle.tagInc')}</span>
                    </div>
                </section>

                <div className={styles.grid}>
                    {/* 3. Sección de Propagación SGP4 (Cálculo del movimiento) */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}><LuActivity size={28} /></div>
                            <h2 className={styles.cardTitle}>{t('info.sgp4.title')}</h2>
                        </div>

                        <p className={styles.cardText}>
                            {t('info.sgp4.p1')}
                        </p>
                        <p className={styles.cardText}>
                            {t('info.sgp4.p2Start')} <span className={styles.accentOrange}>{t('info.sgp4.p2Accent')}</span> {t('info.sgp4.p2End')}
                        </p>
                    </section>

                    {/* 4. Sección de Transformación Espacial ECEF */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}><LuGlobe size={28} /></div>
                            <h2 className={styles.cardTitle}>{t('info.ecef.title')}</h2>
                        </div>

                        <p className={styles.cardText}>
                            {t('info.ecef.p1Start')} <span className={styles.strong}>{t('info.ecef.p1Strong')}</span> {t('info.ecef.p1End')}
                        </p>
                        <p className={styles.cardText}>
                            {t('info.ecef.p2Start')} <span className={styles.strong}>{t('info.ecef.p2Strong')}</span> {t('info.ecef.p2End')}
                        </p>

                        <div className={styles.mathBlock}>
                            <div className={styles.formula}>
                                {t('info.ecef.formula')}
                            </div>
                        </div>
                    </section>
                </div>

                <div className={styles.grid}>
                    {/* 5. Sección de Línea de Vista (LOS) y Trigonometría */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}><LuEye size={28} /></div>
                            <h2 className={styles.cardTitle}>{t('info.los.title')}</h2>
                        </div>

                        <p className={styles.cardText}>
                            {t('info.los.p1Start')} <span className={styles.strong}>{t('info.los.p1Azimut')}</span> {t('info.los.p1Mid')} <span className={styles.strong}>{t('info.los.p1Elev')}</span>{t('info.los.p1End')}
                        </p>

                        <div className={styles.mathBlock}>
                            <div className={styles.formula}>
                                {t('info.los.formula')}
                            </div>
                        </div>

                        <p className={styles.cardText}>
                            {t('info.los.p2')}
                        </p>
                    </section>

                    {/* 6. Sección de Efecto Doppler y Modulación */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}><LuRadioReceiver size={28} /></div>
                            <h2 className={styles.cardTitle}>{t('info.doppler.title')}</h2>
                        </div>

                        <p className={styles.cardText}>
                            {t('info.doppler.p1Start')}<span className={styles.accentBlue}>{t('info.doppler.p1Blue')}</span>{t('info.doppler.p1Mid')}<span className={styles.accentOrange}>{t('info.doppler.p1Orange')}</span>{t('info.doppler.p1End')}
                        </p>
                        <p className={styles.cardText}>
                            {t('info.doppler.p2')}
                        </p>

                        <div className={styles.mathBlock}>
                            <div className={styles.formula}>
                                Δf = f₀ × (v / c)
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;

