import test from 'node:test';
import assert from 'node:assert/strict';
import { latexToIndonesianSpeech } from './narrator';

test('converts LaTeX equations into clean Indonesian speech with zero raw LaTeX syntax', () => {
  const spoken1 = latexToIndonesianSpeech('$F = m \\times a$');
  assert.ok(spoken1.includes('sama dengan'));
  assert.ok(spoken1.includes('dikali'));
  assert.ok(!spoken1.includes('\\'));
  assert.ok(!spoken1.includes('$'));

  const spoken2 = latexToIndonesianSpeech('$\\Sigma F = \\frac{\\Delta p}{\\Delta t}$');
  assert.ok(spoken2.includes('sigma gaya'));
  assert.ok(spoken2.includes('dibagi'));
  assert.ok(spoken2.includes('delta t'));
  assert.ok(!spoken2.includes('{'));
  assert.ok(!spoken2.includes('}'));
});
