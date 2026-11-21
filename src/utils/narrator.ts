import type { NarrationSpeed } from '../types/physics';

/**
 * Converts LaTeX physics expressions and symbols into clear, natural Indonesian spoken prose
 * so Mister Jo never reads raw LaTeX syntax or programming characters aloud.
 */
export function latexToIndonesianSpeech(input: string): string {
  let text = input;

  // Replace \frac{a}{b} iteratively (supports nested non-braced simple fractions)
  for (let i = 0; i < 4; i++) {
    text = text.replace(
      /\\frac\{([^{}]+)\}\{([^{}]+)\}/g,
      '($1) dibagi ($2)'
    );
  }

  // Replace \sqrt{x}
  text = text.replace(/\\sqrt\{([^{}]+)\}/g, 'akar kuadrat dari ($1)');

  // Common physics/math commands
  const replacements: [RegExp, string][] = [
    [/\\vec\{([^{}]+)\}/g, 'vektor $1'],
    [/\\hat\{([^{}]+)\}/g, 'vektor satuan $1'],
    [/\\text\{([^{}]+)\}/g, '$1'],
    [/\\mathrm\{([^{}]+)\}/g, '$1'],
    [/\\Sigma\s*F/g, 'sigma gaya atau resultan gaya'],
    [/\\Sigma\s*p/g, 'sigma momentum atau momentum total'],
    [/\\Sigma/g, 'sigma atau jumlah total'],
    [/\\Delta\s*t/g, 'delta t atau selang waktu'],
    [/\\Delta\s*p/g, 'delta p atau perubahan momentum'],
    [/\\Delta\s*x/g, 'delta x atau perpindahan'],
    [/\\Delta\s*K/g, 'delta K atau perubahan energi kinetik'],
    [/\\Delta/g, 'delta'],
    [/\\int_\{([^{}]+)\}\^\{([^{}]+)\}/g, 'integral dari $1 hingga $2 dari'],
    [/\\int_0\^([0-9.,]+)/g, 'integral dari nol hingga $1 dari'],
    [/\\int/g, 'integral'],
    [/\\theta/g, 'teta'],
    [/\\alpha/g, 'alfa'],
    [/\\mu/g, 'mu atau massa tereduksi'],
    [/\\cdot/g, ' dikali '],
    [/\\times/g, ' dikali '],
    [/\\approx/g, ' kira-kira sama dengan '],
    [/\\le/g, ' kurang dari atau sama dengan '],
    [/\\ge/g, ' lebih dari atau sama dengan '],
    [/\\to/g, ' menuju '],
    [/\\implies/g, ' maka '],
    [/\\cos/g, 'kosinus '],
    [/\\sin/g, 'sinus '],
    [/\\infty/g, 'tak hingga'],
    [/\\,/g, ' '],
    [/\\;/g, ' '],
    [/\\left\|/g, ' nilai mutlak '],
    [/\\right\|/g, ' '],
    [/\\left\(/g, '('],
    [/\\right\)/g, ')'],
    [/\^2/g, ' kuadrat'],
    [/\^3/g, ' pangkat tiga'],
    [/\^4/g, ' pangkat empat'],
    [/\^\{([^{}]+)\}/g, ' pangkat $1'],
    [/_\{([^{}]+)\}/g, ' $1'],
    [/_([a-zA-Z0-9])/g, ' $1'],
    [/\$/g, ''],
    [/[{}]/g, ''],
    [/\\/g, ''],
    [/=/g, ' sama dengan '],
    [/×/g, ' dikali '],
    [/÷/g, ' dibagi '],
    [/−/g, ' dikurangi '],
    [/\+/g, ' ditambah '],
  ];

  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
  }

  // Clean up whitespace
  return text.replace(/\s+/g, ' ').trim();
}

export interface NarratorCallbacks {
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onEnd?: () => void;
  onStatus?: (mode: 'speech' | 'caption-fallback', message: string) => void;
  onProgressWord?: (progressRatio: number) => void;
}

class MisterJoNarrator {
  private currentText = '';
  private speed: NarrationSpeed = 1;
  private isPlaying = false;
  private isPaused = false;
  private fallbackTimer: number | null = null;
  private fallbackStartMs = 0;
  private fallbackElapsedMs = 0;
  private fallbackTotalMs = 4000;
  private callbacks: NarratorCallbacks = {};

  public hasSpeechSupport(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return false;
    }
    const voices = window.speechSynthesis.getVoices();
    return Array.isArray(voices) ? voices.length >= 0 : true;
  }

  private pickIndonesianVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return null;
    }
    const voices = window.speechSynthesis.getVoices();
    const idVoices = voices.filter((v) =>
      v.lang.toLowerCase().startsWith('id')
    );
    if (idVoices.length > 0) {
      const maleVoice = idVoices.find((v) =>
        /male|pria|laki|ardi|andika|damayanti/i.test(v.name)
      );
      return maleVoice ?? idVoices[0];
    }
    return null;
  }

  public setCallbacks(cb: NarratorCallbacks) {
    this.callbacks = cb;
  }

  public setSpeed(speed: NarrationSpeed) {
    this.speed = speed;
    if (this.isPlaying && !this.isPaused && this.currentText) {
      const text = this.currentText;
      this.stop(false);
      this.speak(text);
    }
  }

  public speak(rawText: string) {
    this.stop(false);
    const cleanText = latexToIndonesianSpeech(rawText);
    this.currentText = cleanText;
    this.isPlaying = true;
    this.isPaused = false;

    const canUseSpeech =
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined';

    if (canUseSpeech) {
      try {
        const voices = window.speechSynthesis.getVoices();
        const idVoice = this.pickIndonesianVoice();

        // If browser has SpeechSynthesis API, speak with it (even if voice list loads async)
        // Only fall back to caption mode if speechSynthesis throws or fails to start
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'id-ID';
        if (idVoice) {
          utterance.voice = idVoice;
        }
        utterance.pitch = 0.92; // Authoritative, warm adult male tone
        utterance.rate = this.speed;

        let started = false;
        utterance.onstart = () => {
          started = true;
          this.callbacks.onStatus?.(
            'speech',
            idVoice
              ? `Suara Mister Jo aktif (${idVoice.name}, ${this.speed}×)`
              : `Suara Mister Jo aktif (Bahasa Indonesia, ${this.speed}×)`
          );
          this.callbacks.onStart?.();
        };

        utterance.onend = () => {
          this.isPlaying = false;
          this.isPaused = false;
          this.callbacks.onProgressWord?.(1);
          this.callbacks.onEnd?.();
        };

        utterance.onerror = () => {
          if (!started) {
            this.runCaptionFallback(cleanText);
          } else {
            this.isPlaying = false;
            this.isPaused = false;
            this.callbacks.onEnd?.();
          }
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);

        // Guard for headless / silent environments where speechSynthesis neither fires onstart nor onerror
        window.setTimeout(() => {
          if (this.isPlaying && !this.isPaused && !started && voices.length === 0) {
            window.speechSynthesis.cancel();
            this.runCaptionFallback(cleanText);
          }
        }, 450);
        return;
      } catch {
        this.runCaptionFallback(cleanText);
        return;
      }
    }

    this.runCaptionFallback(cleanText);
  }

  private runCaptionFallback(cleanText: string) {
    this.clearFallbackTimer();
    const wordCount = Math.max(1, cleanText.split(/\s+/).length);
    // ~150 words per minute at 1x
    this.fallbackTotalMs = Math.max(2000, (wordCount / (2.5 * this.speed)) * 1000);
    this.fallbackElapsedMs = 0;
    this.fallbackStartMs = performance.now();

    this.callbacks.onStatus?.(
      'caption-fallback',
      'Audio TTS sistem tidak tersedia di browser ini — menjalankan Mode Teks Terpandu Mister Jo.'
    );
    this.callbacks.onStart?.();

    this.fallbackTimer = window.setInterval(() => {
      if (!this.isPlaying || this.isPaused) return;
      const elapsed =
        this.fallbackElapsedMs + (performance.now() - this.fallbackStartMs);
      const ratio = Math.min(1, elapsed / this.fallbackTotalMs);
      this.callbacks.onProgressWord?.(ratio);
      if (ratio >= 1) {
        this.clearFallbackTimer();
        this.isPlaying = false;
        this.isPaused = false;
        this.callbacks.onEnd?.();
      }
    }, 100);
  }

  private clearFallbackTimer() {
    if (this.fallbackTimer !== null) {
      window.clearInterval(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }

  public pause() {
    if (!this.isPlaying || this.isPaused) return;
    this.isPaused = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    if (this.fallbackTimer !== null) {
      this.fallbackElapsedMs += performance.now() - this.fallbackStartMs;
    }
    this.callbacks.onPause?.();
  }

  public resume() {
    if (!this.isPlaying || !this.isPaused) return;
    this.isPaused = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    if (this.fallbackTimer !== null) {
      this.fallbackStartMs = performance.now();
    }
    this.callbacks.onResume?.();
  }

  public replay() {
    if (!this.currentText) return;
    this.speak(this.currentText);
  }

  public stop(notify = true) {
    this.clearFallbackTimer();
    this.isPlaying = false;
    this.isPaused = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (notify) {
      this.callbacks.onEnd?.();
    }
  }
}

export const misterJoNarrator = new MisterJoNarrator();
