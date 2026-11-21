export type MenuId =
  | 'beranda'
  | 'analisis'
  | 'pengetahuan'
  | 'soal'
  | 'laboratorium'
  | 'rumus'
  | 'progres';

export type DifficultyTier =
  | 'Fondasi Konsep'
  | 'Penerapan & Analisis Matematis'
  | 'Variasi Kondisi'
  | 'Analisis Kompleks'
  | 'Tantangan Olimpiade Kota';

export type StimulusType =
  | 'two-boats-push'
  | 'two-boats-relative'
  | 'two-boats-unknown-force'
  | 'force-time-trapezoid'
  | 'moving-boats-push'
  | 'energy-work-push'
  | 'two-phase-motion'
  | 'angled-push'
  | 'constant-friction'
  | 'person-jump'
  | 'compressed-spring'
  | 'pier-elastic-bounce'
  | 'quadratic-force'
  | 'three-boats-inelastic'
  | 'viscous-linear-drag';

export interface FBDForce {
  id: string;
  target: 'boat1' | 'boat2';
  symbol: string;
  name: string;
  direction: 'left' | 'right' | 'up' | 'down' | 'angled-down-right' | 'angled-up-left';
  magnitudeLabel: string;
  color: string;
  explanation: string;
}

export interface SimulationConfig {
  mode:
    | 'constant-push'
    | 'trapezoid-push'
    | 'moving-initial'
    | 'angled-push'
    | 'constant-friction'
    | 'person-jump'
    | 'compressed-spring'
    | 'pier-bounce'
    | 'quadratic-push'
    | 'three-boats-inelastic'
    | 'viscous-drag';
  m1: number;
  m2: number;
  m3?: number;
  mExtra?: number;
  force: number;
  duration: number;
  totalTime: number;
  v0?: number;
  angleDeg?: number;
  friction?: number;
  springK?: number;
  springDx?: number;
  dragB?: number;
  impulse?: number;
  stepDescriptions: { t: number; text: string }[];
}

export interface PembahasanSections {
  bagian1Memahami: {
    fenomena: string;
    diketahui: string[];
    ditanyakan: string;
    konsep: string[];
  };
  bagian2Visualisasi: {
    penjelasanProses: string[];
  };
  bagian3Analisis: {
    hukumFisika: string;
    sumbuKoordinat: string;
    analisisHubungan: string;
    fbdNote: string;
  };
  bagian4Persamaan: {
    rumusUtamaLatex: string;
    maknaSimbol: { symbol: string; meaning: string }[];
    alasanPemilihan: string;
  };
  bagian5Penyelesaian: {
    langkah: { label: string; latex: string; note: string }[];
    pembulatan: string;
  };
  bagian6Kesimpulan: {
    nilaiAkhir: string;
    satuan: string;
    interpretasiFisis: string;
  };
  bagian7Strategi: {
    trikEfisien: string;
    caraMengenali: string;
    kesalahanDihindari: string[];
  };
  bagian8Pendalaman: {
    konsepLanjutan: string;
    variasiSoal: string;
    hubunganBerikutnya: string;
  };
}

export interface PhysicsProblem {
  id: number;
  code: string;
  title: string;
  tier: DifficultyTier;
  subtopic: string;
  stimulusType: StimulusType;
  stimulusCaption: string;
  stimulusElements: string[];
  questionText: string;
  unit: string;
  exactValue: number;
  formattedAnswer: string;
  hint: string;
  misconceptionWarning: string;
  fbdForces: FBDForce[];
  fbdAxesNote: string;
  fbdEquationsLatex: string[];
  simulation: SimulationConfig;
  pembahasan: PembahasanSections;
  narrationPrompt: string;
}

export interface SimulationStateFrame {
  t: number;
  x1: number;
  x2: number;
  x3?: number;
  xPerson?: number;
  v1: number;
  v2: number;
  v3?: number;
  p1: number;
  p2: number;
  p3?: number;
  forceCurrent: number;
  xCenterOfMass: number;
  kineticTotal: number;
  phaseLabel: string;
}

export interface ProblemAttempt {
  problemId: number;
  lastInput: string;
  isCorrect: boolean;
  attempts: number;
  hintUsed: boolean;
  solutionOpened: boolean;
  updatedAt: number;
}

export type NarrationSpeed = 0.75 | 1 | 1.25;
