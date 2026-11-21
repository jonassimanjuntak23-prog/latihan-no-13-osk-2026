import {
  Pause,
  Play,
  RotateCcw,
  Square,
  Volume2,
  X,
} from 'lucide-react';
import type { NarrationSpeed } from '../types/physics';

interface NarratorInlineButtonProps {
  label?: string;
  onSpeak: () => void;
  variant?: 'primary' | 'subtle';
  className?: string;
}

export function NarratorInlineButton({
  label = 'Dengarkan Mister Jo',
  onSpeak,
  variant = 'subtle',
  className = '',
}: NarratorInlineButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-[#6B0F24] text-white hover:bg-[#5A0B1E] border border-[#6B0F24]'
      : 'bg-[#FDF5F7] text-[#6B0F24] hover:bg-[#F7E5EA] border border-[#E5C6CE]';

  return (
    <button
      type="button"
      onClick={onSpeak}
      className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B0F24] ${styles} ${className}`}
    >
      <Volume2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

interface NarratorDockProps {
  isOpen: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  speed: NarrationSpeed;
  title: string;
  spokenText: string;
  statusMessage: string;
  progressRatio: number;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onReplay: () => void;
  onStop: () => void;
  onClose: () => void;
  onSpeedChange: (speed: NarrationSpeed) => void;
}

const SPEEDS: NarrationSpeed[] = [0.75, 1, 1.25];

export function NarratorDock({
  isOpen,
  isPlaying,
  isPaused,
  speed,
  title,
  spokenText,
  statusMessage,
  progressRatio,
  onPlay,
  onPause,
  onResume,
  onReplay,
  onStop,
  onClose,
  onSpeedChange,
}: NarratorDockProps) {
  if (!isOpen) return null;

  const words = spokenText.split(/\s+/).filter(Boolean);
  const activeWordIndex = Math.min(
    words.length - 1,
    Math.floor(progressRatio * words.length)
  );

  return (
    <aside
      aria-label="Panel Narator Suara Mister Jo"
      className="fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-[#DEC8CE] bg-white shadow-xl"
    >
      <div className="flex items-center justify-between gap-3 rounded-t-2xl bg-[#5A0B1E] px-4 py-3 text-white">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/src/assets/images/mister_jo_mentor_1795269557007.jpg"
            alt="Mister Jo — Guru Pembimbing OSK Fisika"
            referrerPolicy="no-referrer"
            className="h-9 w-9 rounded-full object-cover border border-[#C99A3B] shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#F4D58D] tracking-wide">
              Guru Pembimbing · Mister Jo
            </p>
            <p className="truncate text-sm font-semibold text-white">{title}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup panel narator"
          className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {statusMessage && (
          <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
            {statusMessage}
          </p>
        )}

        <div className="max-h-28 overflow-y-auto rounded-lg border border-slate-200 bg-[#FBF9FA] p-3 text-xs leading-relaxed text-slate-700">
          {words.length > 0 ? (
            words.map((w, idx) => (
              <span
                key={`${idx}-${w}`}
                className={
                  isPlaying && idx <= activeWordIndex
                    ? 'text-[#6B0F24] font-semibold'
                    : 'text-slate-600'
                }
              >
                {w}{' '}
              </span>
            ))
          ) : (
            <span>Pilih bagian materi atau soal untuk didengarkan bersama Mister Jo.</span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {!isPlaying && (
              <button
                type="button"
                onClick={onPlay}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#6B0F24] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5A0B1E] transition-colors cursor-pointer"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Putar Narasi</span>
              </button>
            )}
            {isPlaying && !isPaused && (
              <button
                type="button"
                onClick={onPause}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#8E1B37] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#6B0F24] transition-colors cursor-pointer"
              >
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Pause</span>
              </button>
            )}
            {isPlaying && isPaused && (
              <button
                type="button"
                onClick={onResume}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#059669] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#047857] transition-colors cursor-pointer"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Lanjutkan</span>
              </button>
            )}
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Ulangi</span>
            </button>
            <button
              type="button"
              onClick={onStop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Square className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Hentikan</span>
            </button>
          </div>

          <div
            className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5"
            role="group"
            aria-label="Kecepatan narasi"
          >
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSpeedChange(s)}
                className={`rounded-md px-2 py-1 text-xs font-mono-tabular font-semibold transition-colors cursor-pointer ${
                  speed === s
                    ? 'bg-[#6B0F24] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s.toString().replace('.', ',')}×
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
