export const error = {
  tle: {
    badge: 'UPLINK FAILURE // 504 TIMEOUT',
    title: 'TLE Telemetry Error',
    description: 'Unable to synchronize ISS orbital telemetry from ARISS servers (the request timed out after 5 seconds or connection failed).',
    actionReload: 'Reload System',
  },
} as const;
