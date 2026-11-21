import type { SimulationConfig, SimulationStateFrame } from '../types/physics';

/**
 * Independent analytical physics calculators for all 15 OSK problems
 * rooted in OSK 2026 Problem 13 (Linear Momentum, Impulse, Newton's 3rd Law).
 */
export function computeProblemAnswers(): Record<number, number> {
  // Soal 01: p = F * dt = 54 * 1.5 = 81.0 Ns
  const s1 = 54 * 1.5;

  // Soal 02: Original OSK 2026 #13 params: m1=130, m2=250, F=46, dt=1.2 => v_rel = p*(1/m1 + 1/m2)
  const p2 = 46 * 1.2;
  const s2 = p2 * (1 / 130 + 1 / 250); // 0.645415... -> 0.6 m/s

  // Soal 03: m2=300, v2=0.4, dt=0.8 => F = (m2 * v2) / dt = 120 / 0.8 = 150.0 N
  const s3 = (300 * 0.4) / 0.8;

  // Soal 04: Trapezoid F(t): 0->0.4s linear to 80N, 0.4->1.0s const 80N, 1.0->1.4s linear to 0.
  // I = 0.5 * (1.4 + 0.6) * 80 = 80.0 Ns; v1 = I / 100 = 0.8 m/s
  const trapImpulse = 0.5 * (1.4 + 0.6) * 80;
  const s4 = trapImpulse / 100;

  // Soal 05: Initial v0=2.0 m/s, m1=140, F=80 N backward on boat 1 for dt=1.4s => v1' = 2.0 - (80*1.4)/140 = 1.2 m/s
  const s5 = 2.0 - (80 * 1.4) / 140;

  // Soal 06: m1=120, m2=180, F=60, dt=2.0 => p=120 Ns; K_tot = p^2/2 * (1/120 + 1/180) = 100.0 J
  const p6 = 60 * 2.0;
  const s6 = 0.5 * p6 * p6 * (1 / 120 + 1 / 180);

  // Soal 07: m1=100, m2=150, F=50, dt1=2.0s push + dt2=3.0s coast
  // a1 = 0.5, a2 = 1/3; x1 = 0.5*0.5*4 + 1.0*3.0 = 4.0 m; x2 = 0.5*(1/3)*4 + (2/3)*3.0 = 8/3 m
  const a7_1 = 50 / 100;
  const a7_2 = 50 / 150;
  const x7_1 = 0.5 * a7_1 * 4 + a7_1 * 2 * 3;
  const x7_2 = 0.5 * a7_2 * 4 + a7_2 * 2 * 3;
  const s7 = x7_1 + x7_2; // 6.6666... -> 6.7 m

  // Soal 08: F=85 N at 37 deg (cos 37 = 0.8), dt=1.5s => px = 85 * 0.8 * 1.5 = 102.0 Ns
  const s8 = 85 * 0.8 * 1.5;

  // Soal 09: F=70 N internal push, f=15 N kinetic friction opposing motion, dt=2.0s => p1 = (70-15)*2.0 = 110.0 Ns
  const s9 = (70 - 15) * 2.0;

  // Soal 10: m1=150, m2=250 initially push (60 N, 1.0s => +-60 Ns). Child m_a=50kg jumps from boat 2 so boat 2 (200kg) moves at +1.2 m/s.
  // Total momentum = 0 => (m1+m_a)*v1'' = 200 * 1.2 = 240 Ns => v1'' = 240 / 200 = 1.2 m/s
  const s10 = (200 * 1.2) / (150 + 50);

  // Soal 11: Spring k=2000 N/m, dx=0.6 m, m1=120, m2=240 => Ep = 360 J, mu = 80 kg => p = sqrt(2*80*360) = 240.0 Ns
  const mu11 = (120 * 240) / (120 + 240);
  const ep11 = 0.5 * 2000 * 0.6 * 0.6;
  const s11 = Math.sqrt(2 * mu11 * ep11);

  // Soal 12: m1=120, m2=240, F=80, dt=1.5 => p=120 => v1=-1.0, v2=+0.5.
  // Boat 1 bounces elastically off pier => v1'=+1.0. Then 1D elastic collision with boat 2:
  // v2'' = (2*m1*v1' + (m2-m1)*v2) / (m1+m2) = (240 + 60) / 360 = 5/6 = 0.8333... -> 0.8 m/s
  const v12_1p = (80 * 1.5) / 120;
  const v12_2 = (80 * 1.5) / 240;
  const s12 = (2 * 120 * v12_1p + (240 - 120) * v12_2) / (120 + 240);

  // Soal 13: F(t) = 150*t*(2 - t) for 0 <= t <= 2s, m1=100, m2=150
  // x1(2) = (150/100)*[(2^3)/3 - (2^4)/12] = 1.5 * (8/3 - 4/3) = 2.0 m
  // x2(2) = (150/150)*(4/3) = 4/3 m => separation = 10/3 = 3.333... -> 3.3 m
  const x13_1 = (150 / 100) * (8 / 3 - 16 / 12);
  const x13_2 = (150 / 150) * (8 / 3 - 16 / 12);
  const s13 = x13_1 + x13_2;

  // Soal 14: F=90 N, dt=2.0s => p2=180 Ns on m2=200kg => K_before = 180^2/(2*200) = 81.0 J.
  // Perfectly inelastic collision with m3=300kg => K_after = 180^2/(2*500) = 32.4 J => dK = 48.6 J
  const p14 = 90 * 2.0;
  const s14 = (p14 * p14) / (2 * 200) - (p14 * p14) / (2 * (200 + 300));

  // Soal 15: Impulse I=120 Ns on m1=100, m2=150 with linear drag f = -b*v (b = 25 kg/s)
  // x_max1 = I/b = 120/25 = 4.8 m, x_max2 = I/b = 4.8 m => total separation = 9.6 m
  const s15 = 120 / 25 + 120 / 25;

  return {
    1: s1,
    2: s2,
    3: s3,
    4: s4,
    5: s5,
    6: s6,
    7: s7,
    8: s8,
    9: s9,
    10: s10,
    11: s11,
    12: s12,
    13: s13,
    14: s14,
    15: s15,
  };
}

export function roundOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

export function formatIndonesianDecimal(value: number): string {
  const rounded = roundOneDecimal(value);
  return rounded.toFixed(1).replace('.', ',');
}

/**
 * Evaluates the exact physical state of a two/three-boat simulation at time t >= 0.
 * Used by both PhysicsAnimator (problem proofs) and LabView (interactive sandbox).
 */
export function evaluateSimulationAt(
  config: SimulationConfig,
  rawT: number
): SimulationStateFrame {
  const t = Math.max(0, Math.min(rawT, config.totalTime));
  const { m1, m2, force, duration } = config;

  if (config.mode === 'constant-push' || config.mode === 'angled-push') {
    const fEff =
      config.mode === 'angled-push'
        ? force * Math.cos(((config.angleDeg ?? 37) * Math.PI) / 180)
        : force;
    const a1 = -fEff / m1;
    const a2 = fEff / m2;
    const tp = Math.min(t, duration);
    const tc = Math.max(0, t - duration);
    const v1 = a1 * tp;
    const v2 = a2 * tp;
    const x1 = -0.6 + 0.5 * a1 * tp * tp + v1 * tc;
    const x2 = 0.6 + 0.5 * a2 * tp * tp + v2 * tc;
    const p1 = m1 * v1;
    const p2 = m2 * v2;
    const xcm = (m1 * (x1 + 0.6) + m2 * (x2 - 0.6)) / (m1 + m2);
    return {
      t,
      x1,
      x2,
      v1,
      v2,
      p1,
      p2,
      forceCurrent: t < duration ? fEff : 0,
      xCenterOfMass: xcm,
      kineticTotal: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2,
      phaseLabel:
        t < duration
          ? 'Fase Dorongan (Impuls Aktif)'
          : 'Fase Meluncur Bebas (Momentum Kekal)',
    };
  }

  if (config.mode === 'trapezoid-push') {
    // Generic trapezoid: ramp up 0..0.4s, flat 0.4..1.0s, ramp down 1.0..1.4s (scaled if duration differs)
    const t1 = (0.4 / 1.4) * duration;
    const t2 = (1.0 / 1.4) * duration;
    const steps = 160;
    const dt = t / steps;
    let x1 = -0.6;
    let x2 = 0.6;
    let v1 = 0;
    let v2 = 0;
    let fCur = 0;
    const getF = (tau: number) => {
      if (tau <= 0 || tau >= duration) return 0;
      if (tau < t1) return force * (tau / t1);
      if (tau <= t2) return force;
      return force * ((duration - tau) / (duration - t2));
    };
    for (let i = 0; i < steps; i++) {
      const tau = (i + 0.5) * dt;
      const f = getF(tau);
      v1 += (-f / m1) * dt;
      v2 += (f / m2) * dt;
      x1 += v1 * dt;
      x2 += v2 * dt;
    }
    fCur = getF(t);
    return {
      t,
      x1,
      x2,
      v1,
      v2,
      p1: m1 * v1,
      p2: m2 * v2,
      forceCurrent: fCur,
      xCenterOfMass: 0,
      kineticTotal: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2,
      phaseLabel:
        t < t1
          ? 'Gaya Dorong Naik Linear'
          : t <= t2
            ? 'Gaya Dorong Puncak Konstan'
            : t < duration
              ? 'Gaya Dorong Turun Linear'
              : 'Dorongan Selesai (GLB)',
    };
  }

  if (config.mode === 'moving-initial') {
    const v0 = config.v0 ?? 2.0;
    const tp = Math.min(t, duration);
    const tc = Math.max(0, t - duration);
    const a1 = -force / m1;
    const a2 = force / m2;
    const v1 = v0 + a1 * tp;
    const v2 = v0 + a2 * tp;
    const x1 = -0.6 + v0 * tp + 0.5 * a1 * tp * tp + v1 * tc;
    const x2 = 0.6 + v0 * tp + 0.5 * a2 * tp * tp + v2 * tc;
    const xcm = v0 * t;
    return {
      t,
      x1,
      x2,
      v1,
      v2,
      p1: m1 * v1,
      p2: m2 * v2,
      forceCurrent: t < duration ? force : 0,
      xCenterOfMass: xcm,
      kineticTotal: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2,
      phaseLabel:
        t < duration
          ? 'Mendorong Sambil Bergerak (Pusat Massa Tetap v₀)'
          : 'Keduanya Bergerak dengan Kecepatan Baru',
    };
  }

  if (config.mode === 'constant-friction') {
    const fFric = config.friction ?? 15;
    const tp = Math.min(t, duration);
    const tc = Math.max(0, t - duration);
    const fNet = Math.max(0, force - fFric);
    const a1Push = -fNet / m1;
    const a2Push = fNet / m2;
    const v1EndPush = a1Push * tp;
    const v2EndPush = a2Push * tp;

    // After push stops, friction decelerates each boat independently until v=0
    const decel1 = fFric / m1;
    const decel2 = fFric / m2;
    const tStop1 = Math.abs(v1EndPush) / decel1;
    const tStop2 = Math.abs(v2EndPush) / decel2;

    const tc1 = Math.min(tc, tStop1);
    const tc2 = Math.min(tc, tStop2);

    const v1 = t <= duration ? v1EndPush : v1EndPush + decel1 * tc1;
    const v2 = t <= duration ? v2EndPush : v2EndPush - decel2 * tc2;

    const x1Push = 0.5 * a1Push * tp * tp;
    const x2Push = 0.5 * a2Push * tp * tp;
    const x1Coast = v1EndPush * tc1 + 0.5 * decel1 * tc1 * tc1;
    const x2Coast = v2EndPush * tc2 - 0.5 * decel2 * tc2 * tc2;

    return {
      t,
      x1: -0.6 + x1Push + (t > duration ? x1Coast : 0),
      x2: 0.6 + x2Push + (t > duration ? x2Coast : 0),
      v1,
      v2,
      p1: m1 * v1,
      p2: m2 * v2,
      forceCurrent: t < duration ? force : 0,
      xCenterOfMass: 0,
      kineticTotal: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2,
      phaseLabel:
        t < duration
          ? 'Dorongan Melawan Hambatan Air'
          : 'Perlambatan oleh Gaya Gesek Air',
    };
  }

  if (config.mode === 'person-jump') {
    // Phase 1 (0..1.0s): initial push F=60N => v1=-0.4, v2=+0.24
    // Phase 2 (1.0..1.8s): boats drift apart
    // Phase 3 (1.8..2.6s): child (50kg) jumps from boat 2 at v=-3.6 m/s; boat 2 becomes +1.2 m/s
    // Phase 4 (2.6..4.0s): child lands on boat 1 => boat 1+child moves at -1.2 m/s
    const tPush = 1.0;
    const tJump = 1.8;
    const tLand = 2.6;
    const mChild = 50;
    const m2After = m2 - mChild;

    if (t <= tPush) {
      const a1 = -force / m1;
      const a2 = force / m2;
      const v1 = a1 * t;
      const v2 = a2 * t;
      return {
        t,
        x1: -0.6 + 0.5 * a1 * t * t,
        x2: 0.6 + 0.5 * a2 * t * t,
        xPerson: 0.6 + 0.5 * a2 * t * t,
        v1,
        v2,
        p1: m1 * v1,
        p2: m2 * v2,
        forceCurrent: force,
        xCenterOfMass: 0,
        kineticTotal: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2,
        phaseLabel: 'Tahap 1: Kedua Perahu Saling Mendorong',
      };
    }

    const x1Push = -0.6 + 0.5 * (-force / m1) * tPush * tPush;
    const x2Push = 0.6 + 0.5 * (force / m2) * tPush * tPush;
    const v1Init = (-force * tPush) / m1; // -0.4
    const v2Init = (force * tPush) / m2; // +0.24

    if (t <= tJump) {
      const dt = t - tPush;
      const x1 = x1Push + v1Init * dt;
      const x2 = x2Push + v2Init * dt;
      return {
        t,
        x1,
        x2,
        xPerson: x2,
        v1: v1Init,
        v2: v2Init,
        p1: m1 * v1Init,
        p2: m2 * v2Init,
        forceCurrent: 0,
        xCenterOfMass: 0,
        kineticTotal: 0.5 * m1 * v1Init * v1Init + 0.5 * m2 * v2Init * v2Init,
        phaseLabel: 'Tahap 2: Kedua Perahu Saling Menjauh',
      };
    }

    const x1Jump = x1Push + v1Init * (tJump - tPush);
    const x2Jump = x2Push + v2Init * (tJump - tPush);
    const v2AfterJump = 1.2;

    if (t <= tLand) {
      const dt = t - tJump;
      const frac = dt / (tLand - tJump);
      const x1 = x1Jump + v1Init * dt;
      const x2 = x2Jump + v2AfterJump * dt;
      const x1AtLand = x1Jump + v1Init * (tLand - tJump);
      const xPerson = x2Jump + (x1AtLand - x2Jump) * frac;
      return {
        t,
        x1,
        x2,
        xPerson,
        v1: v1Init,
        v2: v2AfterJump,
        p1: m1 * v1Init,
        p2: m2After * v2AfterJump,
        forceCurrent: 0,
        xCenterOfMass: 0,
        kineticTotal:
          0.5 * m1 * v1Init * v1Init +
          0.5 * m2After * v2AfterJump * v2AfterJump +
          0.5 * mChild * 3.6 * 3.6,
        phaseLabel: 'Tahap 3: Anak Melompat dari Perahu 2 Menuju Perahu 1',
      };
    }

    const dtAfter = t - tLand;
    const x1AtLand = x1Jump + v1Init * (tLand - tJump);
    const x2AtLand = x2Jump + v2AfterJump * (tLand - tJump);
    const v1Final = -1.2;
    const x1 = x1AtLand + v1Final * dtAfter;
    const x2 = x2AtLand + v2AfterJump * dtAfter;
    return {
      t,
      x1,
      x2,
      xPerson: x1,
      v1: v1Final,
      v2: v2AfterJump,
      p1: (m1 + mChild) * v1Final,
      p2: m2After * v2AfterJump,
      forceCurrent: 0,
      xCenterOfMass: 0,
      kineticTotal:
        0.5 * (m1 + mChild) * v1Final * v1Final +
        0.5 * m2After * v2AfterJump * v2AfterJump,
      phaseLabel: 'Tahap 4: Anak Mendarat — Momentum Total Tetap Nol',
    };
  }

  if (config.mode === 'compressed-spring') {
    const k = config.springK ?? 2000;
    const dx0 = config.springDx ?? 0.6;
    const mu = (m1 * m2) / (m1 + m2);
    const omega = Math.sqrt(k / mu);
    const tRelease = (Math.PI / 2) / omega; // quarter period when spring reaches natural length
    const pMax = Math.sqrt(2 * mu * 0.5 * k * dx0 * dx0);
    const v1Max = -pMax / m1;
    const v2Max = pMax / m2;

    if (t <= tRelease) {
      const compression = dx0 * Math.cos(omega * t);
      const dispRel = dx0 - compression;
      const x1 = -0.5 - (m2 / (m1 + m2)) * dispRel;
      const x2 = 0.5 + (m1 / (m1 + m2)) * dispRel;
      const vRel = dx0 * omega * Math.sin(omega * t);
      const v1 = -(m2 / (m1 + m2)) * vRel;
      const v2 = (m1 / (m1 + m2)) * vRel;
      return {
        t,
        x1,
        x2,
        v1,
        v2,
        p1: m1 * v1,
        p2: m2 * v2,
        forceCurrent: k * compression,
        xCenterOfMass: 0,
        kineticTotal: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2,
        phaseLabel: 'Pegas Mendorong Kedua Perahu (Energi Pegas -> Kinetik)',
      };
    }

    const dt = t - tRelease;
    const x1Rel = -0.5 - (m2 / (m1 + m2)) * dx0;
    const x2Rel = 0.5 + (m1 / (m1 + m2)) * dx0;
    return {
      t,
      x1: x1Rel + v1Max * dt,
      x2: x2Rel + v2Max * dt,
      v1: v1Max,
      v2: v2Max,
      p1: -pMax,
      p2: pMax,
      forceCurrent: 0,
      xCenterOfMass: 0,
      kineticTotal: 0.5 * m1 * v1Max * v1Max + 0.5 * m2 * v2Max * v2Max,
      phaseLabel: 'Pegas Terlepas — Kedua Perahu Meluncur Konstan',
    };
  }

  if (config.mode === 'pier-bounce') {
    // Soal 12: 0..1.5s push F=80N (m1=120,m2=240 => v1=-1.0, v2=+0.5)
    // Pier at x=-2.75 m => Boat 1 hits pier at t=1.5 + (2.75 - 1.35)/1.0? Let's place pier at x=-2.85 m:
    // After 1.5s push: x1 = -0.6 - 0.5*(80/120)*(1.5^2) = -1.35 m; x2 = +0.6 + 0.5*(80/240)*(1.5^2) = +0.975 m.
    // Pier wall at x = -2.85 m => Boat 1 hits wall at tBounce = 1.5 + 1.5 = 3.0 s!
    // After t=3.0 s, v1' = +1.0 m/s, x1(t) = -2.85 + 1.0*(t-3.0); x2(t) = 0.975 + 0.5*(t-1.5) = 0.225 + 0.5*t.
    // Catch-up when -2.85 + (t-3.0) = 0.225 + 0.5*t => 0.5*t = 6.075? Let's make pier closer: at x = -1.85 m!
    // Then tBounce = 1.5 + 0.5 = 2.0 s!
    // At t=2.0: x1 = -1.85, x2 = 0.975 + 0.25 = 1.225. Gap = 3.075 m. Relative speed 0.5 m/s -> collision at t = 2.0 + 6.15 = 8.15 s.
    // Or put initial boats closer & pier at x = -1.55 m:
    // t=1.5: x1=-1.35, x2=0.975. Hits pier at -1.55 at tBounce=1.7s! At t=1.7: x2=1.075, x1=-1.55. Gap = 2.625 -> hits at t = 1.7 + 5.25 = 6.95s!
    // Let's set totalTime = 8.5s in Soal 12 so the student actually watches the push, bounce, chase, AND elastic collision!
    const tPush = duration; // 1.5
    const a1 = -force / m1; // -2/3
    const a2 = force / m2; // +1/3
    const x1PushEnd = -0.6 + 0.5 * a1 * tPush * tPush; // -1.35
    const x2PushEnd = 0.6 + 0.5 * a2 * tPush * tPush; // +0.975
    const v1Push = a1 * tPush; // -1.0
    const v2Push = a2 * tPush; // +0.5
    const pierX = -1.55;
    const tBounce = tPush + (x1PushEnd - pierX) / Math.abs(v1Push); // 1.7s
    const x2AtBounce = x2PushEnd + v2Push * (tBounce - tPush);
    const v1AfterBounce = Math.abs(v1Push); // +1.0
    // Collision when pierX + v1AfterBounce*(t - tBounce) = x2AtBounce + v2Push*(t - tBounce) - 0.8 (boat width clearance)
    const clearance = 0.8;
    const tCollide =
      tBounce + (x2AtBounce - clearance - pierX) / (v1AfterBounce - v2Push);
    const v1Final =
      ((m1 - m2) * v1AfterBounce + 2 * m2 * v2Push) / (m1 + m2); // 1/3
    const v2Final =
      (2 * m1 * v1AfterBounce + (m2 - m1) * v2Push) / (m1 + m2); // 5/6

    if (t <= tPush) {
      return {
        t,
        x1: -0.6 + 0.5 * a1 * t * t,
        x2: 0.6 + 0.5 * a2 * t * t,
        v1: a1 * t,
        v2: a2 * t,
        p1: m1 * a1 * t,
        p2: m2 * a2 * t,
        forceCurrent: force,
        xCenterOfMass: 0,
        kineticTotal: 0.5 * m1 * (a1 * t) ** 2 + 0.5 * m2 * (a2 * t) ** 2,
        phaseLabel: 'Tahap 1: Dorongan Awal Saling Menjauh',
      };
    }
    if (t <= tBounce) {
      const dt = t - tPush;
      return {
        t,
        x1: x1PushEnd + v1Push * dt,
        x2: x2PushEnd + v2Push * dt,
        v1: v1Push,
        v2: v2Push,
        p1: m1 * v1Push,
        p2: m2 * v2Push,
        forceCurrent: 0,
        xCenterOfMass: 0,
        kineticTotal: 0.5 * m1 * v1Push ** 2 + 0.5 * m2 * v2Push ** 2,
        phaseLabel: 'Tahap 2: Perahu 1 Menuju Dinding Dermaga',
      };
    }
    if (t <= tCollide) {
      const dt = t - tBounce;
      return {
        t,
        x1: pierX + v1AfterBounce * dt,
        x2: x2AtBounce + v2Push * dt,
        v1: v1AfterBounce,
        v2: v2Push,
        p1: m1 * v1AfterBounce,
        p2: m2 * v2Push,
        forceCurrent: 0,
        xCenterOfMass: 0,
        kineticTotal: 0.5 * m1 * v1AfterBounce ** 2 + 0.5 * m2 * v2Push ** 2,
        phaseLabel: 'Tahap 3: Memantul Elastis & Mengejar Perahu 2',
      };
    }

    const dtC = t - tCollide;
    const x1Col = pierX + v1AfterBounce * (tCollide - tBounce);
    const x2Col = x2AtBounce + v2Push * (tCollide - tBounce);
    return {
      t,
      x1: x1Col + v1Final * dtC,
      x2: x2Col + v2Final * dtC,
      v1: v1Final,
      v2: v2Final,
      p1: m1 * v1Final,
      p2: m2 * v2Final,
      forceCurrent: 0,
      xCenterOfMass: 0,
      kineticTotal: 0.5 * m1 * v1Final ** 2 + 0.5 * m2 * v2Final ** 2,
      phaseLabel: 'Tahap 4: Tumbukan Elastis Perahu 1 dan Perahu 2',
    };
  }

  if (config.mode === 'quadratic-push') {
    // F(t) = 150 * t * (2 - t) for 0 <= t <= 2.0
    const tp = Math.min(t, duration);
    const tc = Math.max(0, t - duration);
    const fCur = t < duration ? 150 * t * (2 - t) : 0;
    // I(t) = 150*(t^2 - t^3/3)
    const impTp = 150 * (tp * tp - (tp * tp * tp) / 3);
    const v1 = -impTp / m1;
    const v2 = impTp / m2;
    const disp = 150 * ((tp ** 3) / 3 - (tp ** 4) / 12);
    const x1 = -0.6 - disp / m1 + v1 * tc;
    const x2 = 0.6 + disp / m2 + v2 * tc;
    return {
      t,
      x1,
      x2,
      v1,
      v2,
      p1: m1 * v1,
      p2: m2 * v2,
      forceCurrent: fCur,
      xCenterOfMass: 0,
      kineticTotal: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2,
      phaseLabel:
        t < duration
          ? 'Gaya Kuadratik F(t) = 150t(2-t) Sedang Bekerja'
          : 'Galah Terlepas — Meluncur dengan Kecepatan Tetap',
    };
  }

  if (config.mode === 'three-boats-inelastic') {
    const m3 = config.m3 ?? 300;
    const tPush = duration; // 2.0s
    const a1 = -force / m1; // -0.9
    const a2 = force / m2; // +0.45
    const x1Push = -1.2 + 0.5 * a1 * tPush * tPush;
    const x2Push = 0.0 + 0.5 * a2 * tPush * tPush; // +0.9
    const v1End = a1 * tPush; // -1.8
    const v2End = a2 * tPush; // +0.9
    const x3Pos = 3.6;
    const clearance = 0.9;
    const tCollide = tPush + (x3Pos - clearance - x2Push) / v2End; // 2.0 + 1.8/0.9 = 4.0s
    const v23 = (m2 * v2End) / (m2 + m3); // 180/500 = 0.36 m/s

    if (t <= tPush) {
      return {
        t,
        x1: -1.2 + 0.5 * a1 * t * t,
        x2: 0.0 + 0.5 * a2 * t * t,
        x3: x3Pos,
        v1: a1 * t,
        v2: a2 * t,
        v3: 0,
        p1: m1 * a1 * t,
        p2: m2 * a2 * t,
        p3: 0,
        forceCurrent: force,
        xCenterOfMass: 0,
        kineticTotal: 0.5 * m1 * (a1 * t) ** 2 + 0.5 * m2 * (a2 * t) ** 2,
        phaseLabel: 'Tahap 1: Perahu 1 Mendorong Perahu 2',
      };
    }

    if (t <= tCollide) {
      const dt = t - tPush;
      return {
        t,
        x1: x1Push + v1End * dt,
        x2: x2Push + v2End * dt,
        x3: x3Pos,
        v1: v1End,
        v2: v2End,
        v3: 0,
        p1: m1 * v1End,
        p2: m2 * v2End,
        p3: 0,
        forceCurrent: 0,
        xCenterOfMass: 0,
        kineticTotal: 0.5 * m1 * v1End ** 2 + 0.5 * m2 * v2End ** 2,
        phaseLabel: 'Tahap 2: Perahu 2 Mendekati Perahu 3 yang Diam',
      };
    }

    const dtC = t - tCollide;
    const x2Col = x2Push + v2End * (tCollide - tPush);
    return {
      t,
      x1: x1Push + v1End * (t - tPush),
      x2: x2Col + v23 * dtC,
      x3: x3Pos + v23 * dtC,
      v1: v1End,
      v2: v23,
      v3: v23,
      p1: m1 * v1End,
      p2: m2 * v23,
      p3: m3 * v23,
      forceCurrent: 0,
      xCenterOfMass: 0,
      kineticTotal: 0.5 * m1 * v1End ** 2 + 0.5 * (m2 + m3) * v23 ** 2,
      phaseLabel: 'Tahap 3: Tumbukan Tak Elastis (Energi Hilang 48,6 J)',
    };
  }

  // viscous-drag: f = -b * v => v(t) = v0 * exp(-(b/m)*t), x(t) = (p0/b)*(1 - exp(-(b/m)*t))
  const b = config.dragB ?? 25;
  const imp = config.impulse ?? 120;
  const v10 = -imp / m1;
  const v20 = imp / m2;
  const k1 = b / m1;
  const k2 = b / m2;
  const v1 = v10 * Math.exp(-k1 * t);
  const v2 = v20 * Math.exp(-k2 * t);
  const x1 = -0.6 - (imp / b) * (1 - Math.exp(-k1 * t));
  const x2 = 0.6 + (imp / b) * (1 - Math.exp(-k2 * t));
  return {
    t,
    x1,
    x2,
    v1,
    v2,
    p1: m1 * v1,
    p2: m2 * v2,
    forceCurrent: t < 0.15 ? imp / 0.15 : 0,
    xCenterOfMass: (m1 * (x1 + 0.6) + m2 * (x2 - 0.6)) / (m1 + m2),
    kineticTotal: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2,
    phaseLabel:
      t < 3
        ? 'Perlambatan Eksponensial (Perahu Ringan Lebih Cepat Melambat)'
        : 'Mendekati Berhenti — Jarak Tempuh Sama (4,8 m)',
  };
}
