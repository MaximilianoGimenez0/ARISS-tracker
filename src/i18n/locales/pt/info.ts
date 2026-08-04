export const info = {
  hero: {
    title: 'Engenharia por trás do',
    titleAccent: 'Rastreamento'
  },
  tle: {
    title: '1. Conjunto de Elementos de Duas Linhas (TLE)',
    p1: 'O rastreamento começa com um TLE (Two-Line Element), um formato de dados padrão codificado que descreve as variáveis orbitais (elementos keplerianos) de um satélite em um momento específico (época). A partir desses parâmetros, podemos extrapolar sua posição futura.',
    tagNorad: 'NORAD ID (25544)',
    tagInc: 'Inclinação (51.6418°)'
  },
  sgp4: {
    title: '2. Propagação Orbital',
    p1: 'Satélites em Órbita Terrestre Baixa (LEO) sofrem perturbações devido à gravidade da Lua, do Sol, do achatamento da Terra e do arrasto atmosférico.',
    p2Start: 'O modelo',
    p2Accent: 'SGP4 (Simplified General Perturbations-4)',
    p2End: 'pega o TLE e resolve as equações de movimento para prever os vetores de estado (posição e velocidade) exatos do satélite no espaço em qualquer instante de tempo.'
  },
  ecef: {
    title: '3. Geodésicas para ECEF',
    p1Start: 'Para calcular para onde olhar, convertemos as coordenadas de nossa estação terrestre (Latitude, Longitude, Altitude) para um sistema cartesiano 3D chamado',
    p1Strong: 'ECEF',
    p1End: '(Earth-Centered, Earth-Fixed).',
    p2Start: 'Tendo tanto o satélite quanto o observador em coordenadas (X, Y, Z), calculamos o',
    p2Strong: 'Vetor Relativo',
    p2End: '(distância e direção no espaço).',
    formula: 'Vetor Relativo = Posição do Satélite − Posição do Observador'
  },
  los: {
    title: '4. Linha de Visada (LOS)',
    p1Start: 'Usando trigonometria esférica e o produto escalar entre o vetor do observador e o vetor relativo, obtemos os ângulos de apontamento:',
    p1Azimut: 'Azimute',
    p1Mid: '(rumo) e',
    p1Elev: 'Elevação',
    p1End: '.',
    formula: 'Elevação > 0° ⟹ LOS (Visível)',
    p2: 'Se a elevação for maior que zero, significa que o satélite superou o horizonte topográfico e temos contato visual ou de rádio direto (Line of Sight).'
  },
  doppler: {
    title: '5. Correção Doppler',
    p1Start: 'A ISS se move a ~28.000 km/h. Devido a essa enorme velocidade radial relativa, as frequências de rádio são comprimidas ao se aproximar (',
    p1Blue: 'Blue Shift',
    p1Mid: ') e expandidas ao se afastar (',
    p1Orange: 'Red Shift',
    p1End: ').',
    p2: 'Para receber a telemetria (ex: em 145.800 MHz VHF), o sistema deve compensar constantemente esse desvio para manter a sintonia no receptor SDR em tempo real.'
  }
} as const;
