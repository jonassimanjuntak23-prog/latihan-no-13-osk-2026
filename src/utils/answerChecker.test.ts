import test from 'node:test';
import assert from 'node:assert/strict';
import { checkStudentAnswer } from './answerChecker';

test('accepts valid Indonesian comma decimal with exact 1 decimal digit', () => {
  const res = checkStudentAnswer('81,0', 81.0, '81,0', 'Ns');
  assert.equal(res.status, 'correct');

  const res2 = checkStudentAnswer(' 0,6 ', 0.645415, '0,6', 'm/s');
  assert.equal(res2.status, 'correct');
});

test('rejects physically wrong answers within tenths', () => {
  const res = checkStudentAnswer('0,7', 0.645415, '0,6', 'm/s');
  assert.equal(res.status, 'incorrect');

  const res2 = checkStudentAnswer('55,3', 55.2, '55,2', 'Ns');
  assert.equal(res2.status, 'incorrect');
});

test('flags missing comma or dot separator with format-warning without giving away full answer', () => {
  const resDot = checkStudentAnswer('81.0', 81.0, '81,0', 'Ns');
  assert.equal(resDot.status, 'format-warning');

  const resInt = checkStudentAnswer('81', 81.0, '81,0', 'Ns');
  assert.equal(resInt.status, 'format-warning');
});

test('rejects empty or non-numeric strings as invalid', () => {
  assert.equal(checkStudentAnswer('', 81.0, '81,0', 'Ns').status, 'invalid');
  assert.equal(
    checkStudentAnswer('81,0 Ns', 81.0, '81,0', 'Ns').status,
    'invalid'
  );
});
