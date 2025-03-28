// Physics constants in SI units with maximum precision
export const PHYSICS_CONSTANTS = {
  PLANCK: {
    symbol: 'h',
    value: 6.62607015e-34,
    unit: 'J⋅s',
    name: 'Planck constant',
    description: 'Quantum of electromagnetic action',
  },
  REDUCED_PLANCK: {
    symbol: 'ℏ',
    value: 1.054571817e-34,
    unit: 'J⋅s',
    name: 'Reduced Planck constant',
    description: 'ℏ = h/2π',
  },
  SPEED_OF_LIGHT: {
    symbol: 'c',
    value: 299792458,
    unit: 'm/s',
    name: 'Speed of light in vacuum',
    description: 'Exact defined value',
  },
  GRAVITATIONAL: {
    symbol: 'G',
    value: 6.67430e-11,
    unit: 'm³⋅kg⁻¹⋅s⁻²',
    name: 'Gravitational constant',
    description: 'Universal gravitational constant',
  },
  ELECTRON_MASS: {
    symbol: 'mₑ',
    value: 9.1093837015e-31,
    unit: 'kg',
    name: 'Electron mass',
    description: 'Rest mass of electron',
  },
  PROTON_MASS: {
    symbol: 'mₚ',
    value: 1.67262192369e-27,
    unit: 'kg',
    name: 'Proton mass',
    description: 'Rest mass of proton',
  },
  ELEMENTARY_CHARGE: {
    symbol: 'e',
    value: 1.602176634e-19,
    unit: 'C',
    name: 'Elementary charge',
    description: 'Magnitude of electric charge carried by a proton',
  },
  BOLTZMANN: {
    symbol: 'k',
    value: 1.380649e-23,
    unit: 'J/K',
    name: 'Boltzmann constant',
    description: 'Relates temperature to particle energy',
  },
  AVOGADRO: {
    symbol: 'Nₐ',
    value: 6.02214076e23,
    unit: 'mol⁻¹',
    name: 'Avogadro constant',
    description: 'Number of particles in one mole',
  },
  VACUUM_PERMITTIVITY: {
    symbol: 'ε₀',
    value: 8.8541878128e-12,
    unit: 'F/m',
    name: 'Vacuum permittivity',
    description: 'Electric constant in vacuum',
  },
} as const;