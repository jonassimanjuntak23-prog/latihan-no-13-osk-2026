import { PROBLEMS_PART_1 } from './problemsPart1';
import { PROBLEMS_PART_2 } from './problemsPart2';
import type { DifficultyTier, PhysicsProblem } from '../types/physics';

export const ALL_PROBLEMS: PhysicsProblem[] = [
  ...PROBLEMS_PART_1,
  ...PROBLEMS_PART_2,
];

export const DIFFICULTY_TIERS: DifficultyTier[] = [
  'Fondasi Konsep',
  'Penerapan & Analisis Matematis',
  'Variasi Kondisi',
  'Analisis Kompleks',
  'Tantangan Olimpiade Kota',
];
