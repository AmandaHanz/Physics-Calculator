import { PHYSICS_CONSTANTS } from './constants';

export type Formula = {
  name: string;
  formula: string;
  description: string;
  calculate: (params: Record<string, number>) => number;
  parameters: Array<{
    symbol: string;
    name: string;
    unit: string;
    description?: string;
  }>;
  unit: string;
};

// Helper function to format scientific notation with proper precision
export const formatScientific = (num: number): string => {
  // Use a 16-digit precision to maintain maximum accuracy
  const [mantissa, exponent] = num.toExponential(16).split('e');
  const trimmedMantissa = mantissa.replace(/\.?0+$/, '');
  return `${trimmedMantissa}×10${exponent.replace(/\+/, '')}`;
};

export const PHYSICS_FORMULAS: Record<string, Formula> = {
  EINSTEIN_MASS_ENERGY: {
    name: "Einstein's Mass-Energy Equivalence",
    formula: 'E = mc²',
    description: 'Relates mass to its equivalent energy',
    calculate: ({ m }) => m * Math.pow(PHYSICS_CONSTANTS.SPEED_OF_LIGHT.value, 2),
    parameters: [
      { symbol: 'm', name: 'Mass', unit: 'kg', description: 'Rest mass of object' }
    ],
    unit: 'J'
  },
  GRAVITATIONAL_FORCE: {
    name: "Newton's Law of Universal Gravitation",
    formula: 'F = G(m₁m₂/r²)',
    description: 'Calculates gravitational force between two masses',
    calculate: ({ m1, m2, r }) => 
      PHYSICS_CONSTANTS.GRAVITATIONAL.value * (m1 * m2) / Math.pow(r, 2),
    parameters: [
      { symbol: 'm1', name: 'Mass 1', unit: 'kg', description: 'Mass of first object' },
      { symbol: 'm2', name: 'Mass 2', unit: 'kg', description: 'Mass of second object' },
      { symbol: 'r', name: 'Distance', unit: 'm', description: 'Distance between centers of masses' }
    ],
    unit: 'N'
  },
  KINETIC_ENERGY: {
    name: 'Kinetic Energy',
    formula: 'KE = ½mv²',
    description: 'Energy of an object due to its motion',
    calculate: ({ m, v }) => 0.5 * m * Math.pow(v, 2),
    parameters: [
      { symbol: 'm', name: 'Mass', unit: 'kg', description: 'Mass of object' },
      { symbol: 'v', name: 'Velocity', unit: 'm/s', description: 'Speed of object' }
    ],
    unit: 'J'
  },
  RELATIVISTIC_MASS: {
    name: 'Relativistic Mass',
    formula: 'm = m₀/√(1-v²/c²)',
    description: 'Mass of an object at relativistic speeds',
    calculate: ({ m0, v }) => {
      const c = PHYSICS_CONSTANTS.SPEED_OF_LIGHT.value;
      return m0 / Math.sqrt(1 - Math.pow(v, 2) / Math.pow(c, 2));
    },
    parameters: [
      { symbol: 'm0', name: 'Rest Mass', unit: 'kg', description: 'Mass at rest' },
      { symbol: 'v', name: 'Velocity', unit: 'm/s', description: 'Velocity of object' }
    ],
    unit: 'kg'
  },
  COULOMB_FORCE: {
    name: "Coulomb's Law",
    formula: 'F = k(q₁q₂/r²)',
    description: 'Electrostatic force between charged particles',
    calculate: ({ q1, q2, r }) => {
      const k = 1 / (4 * Math.PI * PHYSICS_CONSTANTS.VACUUM_PERMITTIVITY.value);
      return k * (q1 * q2) / Math.pow(r, 2);
    },
    parameters: [
      { symbol: 'q1', name: 'Charge 1', unit: 'C', description: 'First charge' },
      { symbol: 'q2', name: 'Charge 2', unit: 'C', description: 'Second charge' },
      { symbol: 'r', name: 'Distance', unit: 'm', description: 'Distance between charges' }
    ],
    unit: 'N'
  },
  WAVE_ENERGY: {
    name: 'Photon Energy',
    formula: 'E = hf',
    description: 'Energy of a photon based on its frequency',
    calculate: ({ f }) => PHYSICS_CONSTANTS.PLANCK.value * f,
    parameters: [
      { symbol: 'f', name: 'Frequency', unit: 'Hz', description: 'Frequency of the photon' }
    ],
    unit: 'J'
  }
};