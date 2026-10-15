// Constantes globales de configuración de la aplicación

/**
 * URL del endpoint público de ARISS para obtener el Two-Line Element (TLE) más reciente de la ISS.
 */
export const ISS_TLE_URL = 'https://live.ariss.org/iss.txt';
export const ARISS_TLE_URL = ISS_TLE_URL;

/**
 * Tiempo de espera máximo (en milisegundos) para la solicitud de datos TLE.
 */
export const TLE_FETCH_TIMEOUT_MS = 5000;

/**
 * Metadatos y branding de la aplicación
 */
export const APP_NAME = 'ARISS-tracker';
export const APP_NAME_PREFIX = 'ARISS';
export const APP_NAME_SUFFIX = 'tracker';
export const APP_VERSION = 'ARISS-TRACKER-OS v9.2';

/**
 * Información del desarrollador
 */
export const DEVELOPER_NAME = 'Maximiliano Giménez';

/**
 * Enlaces a redes sociales y canales de contacto del desarrollador
 */
export const DEVELOPER_SOCIALS = {
    github: 'https://github.com/MaximilianoGimenez0',
    whatsapp: 'https://wa.me/5491140675852',
    linkedin: 'https://www.linkedin.com/in/maximiliano-gim%C3%A9nez-2644b0338/',
} as const;

export const GITHUB_URL = DEVELOPER_SOCIALS.github;
export const WHATSAPP_URL = DEVELOPER_SOCIALS.whatsapp;
export const LINKEDIN_URL = DEVELOPER_SOCIALS.linkedin;
