import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeProblemAnswers,
  evaluateSimulationAt,
  formatIndonesianDecimal,
} from './physicsEngine';
import { ALL_PROBLEMS } from '../data/problemsData';

test('ALL_PROBLEMS dataset has 15 problems matching analytical calculator and 1-decimal comma rule', () => {
  assert.equal(ALL_PROBLEMS.length, 15);
  const answers = computeProblemAnswers();
  for (let i = 0; i < 15; i++) {
    const p = ALL_PROBLEMS[i];
    assert.equal(p.id, i + 1);
    assert.ok(Math.abs(p.exactValue - answers[p.id]) < 1e-6, `Exact value mismatch on Soal ${p.id}`);
    assert.equal(
      p.formattedAnswer,
      formatIndonesianDecimal(answers[p.id]),
      `Formatted answer mismatch on Soal ${p.id}`
    );
    assert.ok(/^-?\d+,\d$/.test(p.formattedAnswer), `Invalid comma decimal on Soal ${p.id}`);
    assert.ok(p.pembahasan.bagian5Penyelesaian.langkah.length > 0);
  }
});

test('all 15 problem answers match analytically verified values', () => {
  const answers = computeProblemAnswers();
  const expectedFormatted: Record<number, string> = {
    1: '81,0',
    2: '0,6',
    3: '150,0',
    4: '0,8',
    5: '1,2',
    6: '100,0',
    7: '6,7',
    8: '102,0',
    9: '110,0',
    10: '1,2',
    11: '240,0',
    12: '0,8',
    13: '3,3',
    14: '48,6',
    15: '9,6',
  };

  for (let id = 1; id <= 15; id++) {
    assert.equal(
      formatIndonesianDecimal(answers[id]),
      expectedFormatted[id],
      `Problem ${id} mismatch`
    );
  }
});

test('constant-push simulation conserves total momentum and matches Soal 01', () => {
  const frame = evaluateSimulationAt(
    {
      mode: 'constant-push',
      m1: 120,
      m2: 240,
      force: 54,
      duration: 1.5,
      totalTime: 4.0,
      stepDescriptions: [],
    },
    1.5
  );

  assert.ok(Math.abs(frame.p1 + 81.0) < 1e-6);
  assert.ok(Math.abs(frame.p2 - 81.0) < 1e-6);
  assert.ok(Math.abs(frame.p1 + frame.p2) < 1e-6, 'Total momentum must be 0');
});

test('compressed-spring simulation converts potential energy to kinetic energy accurately', () => {
  const frame = evaluateSimulationAt(
    {
      mode: 'compressed-spring',
      m1: 120,
      m2: 240,
      force: 0,
      duration: 1.0,
      totalTime: 4.0,
      springK: 2000,
      springDx: 0.6,
      stepDescriptions: [],
    },
    2.0
  );

  // Ep = 0.5 * 2000 * 0.36 = 360 J, p = 240 Ns
  assert.ok(Math.abs(frame.p2 - 240) < 1e-4);
  assert.ok(Math.abs(frame.p1 + 240) < 1e-4);
  assert.ok(Math.abs(frame.kineticTotal - 360) < 1e-3);
});

test('quadratic-push simulation matches Soal 13 separation 10/3 m at t=2.0 s', () => {
  const frame = evaluateSimulationAt(
    {
      mode: 'quadratic-push',
      m1: 100,
      m2: 150,
      force: 150,
      duration: 2.0,
      totalTime: 4.0,
      stepDescriptions: [],
    },
    2.0
  );

  // Initial offsets were -0.6 and +0.6 (gap 1.2 m), displacements are -2.0 and +4/3
  const disp1 = -0.6 - frame.x1;
  const disp2 = frame.x2 - 0.6;
  assert.ok(Math.abs(disp1 - 2.0) < 1e-6);
  assert.ok(Math.abs(disp2 - 4 / 3) < 1e-6);
  assert.ok(Math.abs(disp1 + disp2 - 10 / 3) < 1e-6);
});

test('viscous-drag simulation approaches equal stopping distances 4.8 m each for Soal 15', () => {
  const frame = evaluateSimulationAt(
    {
      mode: 'viscous-drag',
      m1: 100,
      m2: 150,
      force: 0,
      duration: 0.15,
      totalTime: 40,
      dragB: 25,
      impulse: 120,
      stepDescriptions: [],
    },
    35
  );

  const disp1 = -0.6 - frame.x1;
  const disp2 = frame.x2 - 0.6;
  assert.ok(Math.abs(disp1 - 4.8) < 0.02);
  assert.ok(Math.abs(disp2 - 4.8) < 0.02);
});
