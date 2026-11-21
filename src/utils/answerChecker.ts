import { roundOneDecimal } from './physicsEngine';

export interface AnswerCheckResult {
  status: 'correct' | 'format-warning' | 'incorrect' | 'invalid';
  message: string;
  parsedValue: number | null;
}

/**
 * Evaluates student numeric input against the true physics result.
 * Enforces 1 decimal place with comma separator (e.g. "55,2", "0,8", "81,0").
 * Tolerance never accepts a physically wrong value.
 */
export function checkStudentAnswer(
  rawInput: string,
  exactValue: number,
  formattedExpected: string,
  unit: string
): AnswerCheckResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      status: 'invalid',
      message:
        'Masukkan nilai numerik terlebih dahulu menggunakan tanda koma (contoh: 55,2).',
      parsedValue: null,
    };
  }

  // Reject characters outside digits, comma, dot, plus/minus
  if (!/^[+-]?\d+([,.]\d+)?$/.test(trimmed)) {
    return {
      status: 'invalid',
      message:
        'Format tidak valid. Masukkan hanya angka dengan koma desimal, tanpa satuan atau huruf (contoh: 12,5).',
      parsedValue: null,
    };
  }

  const normalizedNumber = Number(trimmed.replace(',', '.'));
  if (!Number.isFinite(normalizedNumber)) {
    return {
      status: 'invalid',
      message: 'Nilai angka tidak dapat dikenali. Periksa kembali penulisan angkanya.',
      parsedValue: null,
    };
  }

  const expectedRounded = roundOneDecimal(exactValue);
  const hasCommaOneDecimal = /^[+-]?\d+,\d$/.test(trimmed);

  // Tight physical check: must round to exact 1-decimal answer (tolerance < 0.055 around rounded value,
  // or within 0.05 of exactValue ONLY if it matches expectedRounded, so wrong tenths like 0,7 for 0,645 are rejected)
  const diffFromRounded = Math.abs(normalizedNumber - expectedRounded);
  const isPhysicallyCorrect = diffFromRounded < 0.05;

  if (!isPhysicallyCorrect) {
    return {
      status: 'incorrect',
      message:
        'Hasil perhitungan belum tepat. Periksa kembali hukum fisika, tanda arah vektor, satuan SI, dan pembulatan satu angka di belakang koma.',
      parsedValue: normalizedNumber,
    };
  }

  if (!hasCommaOneDecimal) {
    return {
      status: 'format-warning',
      message: `Nilaimu sudah tepat secara fisika, namun tuliskan sesuai aturan OSK: tepat satu angka di belakang koma dengan tanda koma (contoh: ${formattedExpected.replace(/\d/g, '0').slice(0, 1) === '-' ? '-' : ''}XX,X).`,
      parsedValue: normalizedNumber,
    };
  }

  return {
    status: 'correct',
    message: `Tepat sekali! Jawaban ${trimmed} ${unit} terverifikasi benar secara ilmiah.`,
    parsedValue: normalizedNumber,
  };
}
