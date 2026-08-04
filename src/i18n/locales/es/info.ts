export const info = {
  hero: {
    title: 'Ingeniería detrás del',
    titleAccent: 'Rastreo'
  },
  tle: {
    title: '1. Conjunto de Elementos de Dos Líneas (TLE)',
    p1: 'El rastreo comienza con un TLE (Two-Line Element), un formato de datos estándar codificado que describe las variables orbitales (elementos keplerianos) de un satélite en un momento específico (época). A partir de estos parámetros, podemos extrapolar su posición futura.',
    tagNorad: 'NORAD ID (25544)',
    tagInc: 'Inclinación (51.6418°)'
  },
  sgp4: {
    title: '2. Propagación Orbital',
    p1: 'Los satélites en Órbita Terrestre Baja (LEO) sufren perturbaciones debido a la gravedad de la Luna, el Sol y el achatamiento de la Tierra, además del arrastre atmosférico.',
    p2Start: 'El modelo',
    p2Accent: 'SGP4 (Simplified General Perturbations-4)',
    p2End: 'toma el TLE y resuelve las ecuaciones de movimiento para predecir los vectores de estado (posición y velocidad) exactos del satélite en el espacio en cualquier instante de tiempo.'
  },
  ecef: {
    title: '3. Geodésicas a ECEF',
    p1Start: 'Para calcular hacia dónde mirar, convertimos las coordenadas de nuestra estación terrena (Latitud, Longitud, Altitud) a un sistema cartesiano 3D llamado',
    p1Strong: 'ECEF',
    p1End: '(Earth-Centered, Earth-Fixed).',
    p2Start: 'Al tener tanto el satélite como al observador en coordenadas (X, Y, Z), calculamos el',
    p2Strong: 'Vector Relativo',
    p2End: '(distancia y dirección en el espacio).',
    formula: 'Vector Relativo = Posición Satélite − Posición Observador'
  },
  los: {
    title: '4. Línea de Vista (LOS)',
    p1Start: 'Mediante trigonometría esférica y el producto escalar entre el vector del observador y el vector relativo, obtenemos los ángulos de apuntamiento:',
    p1Azimut: 'Azimut',
    p1Mid: '(rumbo) y',
    p1Elev: 'Elevación',
    p1End: '.',
    formula: 'Elevación > 0° ⟹ LOS (Visible)',
    p2: 'Si la elevación es mayor a cero, significa que el satélite ha superado el horizonte topográfico y tenemos contacto visual o de radio directo (Line of Sight).'
  },
  doppler: {
    title: '5. Corrección Doppler',
    p1Start: 'La ISS se mueve a ~28,000 km/h. Debido a esta enorme velocidad radial relativa, las frecuencias de radio se comprimen al acercarse (',
    p1Blue: 'Blue Shift',
    p1Mid: ') y se expanden al alejarse (',
    p1Orange: 'Red Shift',
    p1End: ').',
    p2: 'Para recibir la telemetría (ej. en 145.800 MHz VHF), el sistema debe compensar constantemente esta desviación para mantener la sintonía en el receptor SDR en tiempo real.'
  }
} as const;
