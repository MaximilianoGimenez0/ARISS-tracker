export const boot = {
  logs: {
    init: '[SYSTEM] Initializing kernel module ARISS-OS v9.2...',
    uplink: '[SATLINK] Uplink established with NORAD TLE database...',
    tle: '[TLE-ENG] SGP4 orbital propagator synchronized...',
    ground: '[GROUND] Handshake complete: 10 active SDR ground stations...',
    maps: '[MAPS] Rendering 3D Earth topology projection...',
    iss: '[ISS] Telemetry datalink active: Alt ~420km...',
    mission: '[MISSION] Connection secure. Welcome to Mission Control.'
  },
  title: 'ARISS-TRACKER-OS',
  subtitle: 'Mission Control v9.2',
  initStatus: 'System Initialization'
} as const;
