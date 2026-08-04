export const info = {
  hero: {
    title: 'Engineering behind the',
    titleAccent: 'Tracking'
  },
  tle: {
    title: '1. Two-Line Element Set (TLE)',
    p1: 'Tracking starts with a TLE (Two-Line Element), a standard encoded data format that describes the orbital variables (Keplerian elements) of a satellite at a specific time (epoch). From these parameters, we can extrapolate its future position.',
    tagNorad: 'NORAD ID (25544)',
    tagInc: 'Inclination (51.6418°)'
  },
  sgp4: {
    title: '2. Orbital Propagation',
    p1: 'Satellites in Low Earth Orbit (LEO) suffer perturbations due to the gravity of the Moon, the Sun, the Earth\'s oblateness, and atmospheric drag.',
    p2Start: 'The model',
    p2Accent: 'SGP4 (Simplified General Perturbations-4)',
    p2End: 'takes the TLE and solves the equations of motion to predict the exact state vectors (position and velocity) of the satellite in space at any instant in time.'
  },
  ecef: {
    title: '3. Geodetic to ECEF',
    p1Start: 'To calculate where to look, we convert the coordinates of our ground station (Latitude, Longitude, Altitude) to a 3D Cartesian system called',
    p1Strong: 'ECEF',
    p1End: '(Earth-Centered, Earth-Fixed).',
    p2Start: 'Having both the satellite and the observer in (X, Y, Z) coordinates, we calculate the',
    p2Strong: 'Relative Vector',
    p2End: '(distance and direction in space).',
    formula: 'Relative Vector = Satellite Position − Observer Position'
  },
  los: {
    title: '4. Line of Sight (LOS)',
    p1Start: 'Using spherical trigonometry and the dot product between the observer vector and the relative vector, we obtain the pointing angles:',
    p1Azimut: 'Azimuth',
    p1Mid: '(heading) and',
    p1Elev: 'Elevation',
    p1End: '.',
    formula: 'Elevation > 0° ⟹ LOS (Visible)',
    p2: 'If the elevation is greater than zero, it means the satellite has risen above the topographic horizon and we have visual or direct radio contact (Line of Sight).'
  },
  doppler: {
    title: '5. Doppler Correction',
    p1Start: 'The ISS moves at ~28,000 km/h. Due to this enormous relative radial velocity, radio frequencies compress as it approaches (',
    p1Blue: 'Blue Shift',
    p1Mid: ') and expand as it moves away (',
    p1Orange: 'Red Shift',
    p1End: ').',
    p2: 'To receive telemetry (e.g., at 145.800 MHz VHF), the system must constantly compensate for this deviation to maintain tuning in the SDR receiver in real time.'
  }
} as const;
