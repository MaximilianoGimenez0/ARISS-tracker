export const error = {
  tle: {
    badge: 'FALLO DE ENLACE // 504 TIMEOUT',
    title: 'Error de Telemetría TLE',
    description: 'No se pudieron sincronizar los datos orbitales de la ISS desde los servidores de ARISS (la solicitud superó el límite de 5 segundos o se perdió la conexión).',
    actionReload: 'Recargar sistema',
  },
} as const;
