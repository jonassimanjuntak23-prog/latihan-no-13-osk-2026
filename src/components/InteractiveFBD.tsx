import { Eye, Layers } from 'lucide-react';
import { useState } from 'react';
import type { FBDForce } from '../types/physics';
import { MathFormula } from './MathFormula';
import { NarratorInlineButton } from './NarratorControls';

interface InteractiveFBDProps {
  forces: FBDForce[];
  axesNote: string;
  equationsLatex: string[];
  onNarrate: (script: string) => void;
}

function SingleObjectFBD({
  title,
  massLabel,
  forces,
  visibleCount,
  accent,
}: {
  title: string;
  massLabel: string;
  forces: FBDForce[];
  visibleCount: number;
  accent: string;
}) {
  const shown = forces.slice(0, visibleCount);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <span className="text-xs font-medium text-slate-500">{massLabel}</span>
      </div>

      <svg
        viewBox="0 0 280 200"
        className="w-full h-auto rounded-lg bg-[#FBF9FA] border border-slate-100"
        role="img"
        aria-label={`Free Body Diagram ${title}`}
      >
        <defs>
          <marker id={`arr-${accent}-maroon`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#8E1B37" />
          </marker>
          <marker id={`arr-${accent}-emerald`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#059669" />
          </marker>
          <marker id={`arr-${accent}-sky`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#0284C7" />
          </marker>
          <marker id={`arr-${accent}-slate`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#475569" />
          </marker>
          <marker id={`arr-${accent}-amber`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#D97706" />
          </marker>
        </defs>

        {/* Coordinate axes */}
        <line x1="28" y1="175" x2="72" y2="175" stroke="#94A3B8" strokeWidth="1.2" />
        <line x1="28" y1="175" x2="28" y2="132" stroke="#94A3B8" strokeWidth="1.2" />
        <text x="76" y="178" className="fill-slate-500 text-[10px] font-semibold">+x</text>
        <text x="24" y="126" className="fill-slate-500 text-[10px] font-semibold">+y</text>

        {/* Body point / hull */}
        <rect
          x="108"
          y="82"
          width="64"
          height="36"
          rx="6"
          fill={accent === 'b1' ? '#FEF3C7' : '#DCFCE7'}
          stroke={accent === 'b1' ? '#B45309' : '#15803D'}
          strokeWidth="2"
        />
        <circle cx="140" cy="100" r="3.5" fill="#18181B" />

        {/* Vectors */}
        {shown.map((f) => {
          const markerName =
            f.color === '#059669'
              ? `arr-${accent}-emerald`
              : f.color === '#0284C7'
                ? `arr-${accent}-sky`
                : f.color === '#D97706'
                  ? `arr-${accent}-amber`
                  : f.color === '#475569'
                    ? `arr-${accent}-slate`
                    : `arr-${accent}-maroon`;

          if (f.direction === 'left') {
            return (
              <g key={f.id}>
                <line x1="108" y1="100" x2="36" y2="100" stroke={f.color} strokeWidth="2.8" markerEnd={`url(#${markerName})`} />
                <text x="64" y="88" textAnchor="middle" fill={f.color} className="text-[11px] font-bold">
                  {f.symbol} ({f.magnitudeLabel})
                </text>
              </g>
            );
          }
          if (f.direction === 'right') {
            return (
              <g key={f.id}>
                <line x1="172" y1="100" x2="244" y2="100" stroke={f.color} strokeWidth="2.8" markerEnd={`url(#${markerName})`} />
                <text x="212" y="88" textAnchor="middle" fill={f.color} className="text-[11px] font-bold">
                  {f.symbol} ({f.magnitudeLabel})
                </text>
              </g>
            );
          }
          if (f.direction === 'up') {
            return (
              <g key={f.id}>
                <line x1="140" y1="82" x2="140" y2="24" stroke={f.color} strokeWidth="2.8" markerEnd={`url(#${markerName})`} />
                <text x="150" y="34" fill={f.color} className="text-[11px] font-bold">
                  {f.symbol} ({f.magnitudeLabel})
                </text>
              </g>
            );
          }
          if (f.direction === 'down') {
            return (
              <g key={f.id}>
                <line x1="140" y1="118" x2="140" y2="178" stroke={f.color} strokeWidth="2.8" markerEnd={`url(#${markerName})`} />
                <text x="150" y="172" fill={f.color} className="text-[11px] font-bold">
                  {f.symbol} ({f.magnitudeLabel})
                </text>
              </g>
            );
          }
          if (f.direction === 'angled-down-right') {
            return (
              <g key={f.id}>
                <line x1="172" y1="100" x2="238" y2="148" stroke={f.color} strokeWidth="2.8" markerEnd={`url(#${markerName})`} />
                <line x1="172" y1="100" x2="242" y2="100" stroke="#94A3B8" strokeDasharray="3 3" />
                <text x="214" y="164" textAnchor="middle" fill={f.color} className="text-[10px] font-bold">
                  {f.symbol} ({f.magnitudeLabel})
                </text>
              </g>
            );
          }
          return (
            <g key={f.id}>
              <line x1="108" y1="100" x2="42" y2="52" stroke={f.color} strokeWidth="2.8" markerEnd={`url(#${markerName})`} />
              <line x1="108" y1="100" x2="38" y2="100" stroke="#94A3B8" strokeDasharray="3 3" />
              <text x="68" y="42" textAnchor="middle" fill={f.color} className="text-[10px] font-bold">
                {f.symbol} ({f.magnitudeLabel})
              </text>
            </g>
          );
        })}
      </svg>

      <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
        {shown.map((f) => (
          <li key={f.id} className="flex items-start gap-2">
            <span
              className="mt-1 h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: f.color }}
              aria-hidden="true"
            />
            <span>
              <strong className="text-slate-900">{f.symbol}</strong> — {f.name}: {f.explanation}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InteractiveFBD({
  forces,
  axesNote,
  equationsLatex,
  onNarrate,
}: InteractiveFBDProps) {
  const b1Forces = forces.filter((f) => f.target === 'boat1');
  const b2Forces = forces.filter((f) => f.target === 'boat2');
  const maxLen = Math.max(b1Forces.length, b2Forces.length, 1);
  const [step, setStep] = useState<number>(maxLen);

  const fbdSpeech = `Diagram benda bebas selalu memisahkan objek satu dan objek dua agar pasangan aksi reaksi tidak tertukar pada satu objek. ${axesNote} ${forces
    .map((f) => `${f.symbol}, ${f.name}: ${f.explanation}`)
    .join('. ')}`;

  return (
    <div className="space-y-4 rounded-xl border border-[#E6D5DA] bg-[#FCF9FA] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#5A0B1E]">
            Free Body Diagram (FBD) Ilmiah Terpisah per Objek
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">{axesNote}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStep((prev) => (prev >= maxLen ? 1 : prev + 1))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {step >= maxLen
                ? 'Munculkan Gaya Bertahap (Langkah 1)'
                : `Tambah Gaya (${step}/${maxLen})`}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setStep(maxLen)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Tampilkan Semua</span>
          </button>
          <NarratorInlineButton
            label="Bacakan FBD"
            onSpeak={() => onNarrate(fbdSpeech)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SingleObjectFBD
          title="FBD Perahu 1 (Objek Kiri)"
          massLabel="Sistem Perahu 1"
          forces={b1Forces}
          visibleCount={step}
          accent="b1"
        />
        <SingleObjectFBD
          title="FBD Perahu 2 (Objek Kanan)"
          massLabel="Sistem Perahu 2"
          forces={b2Forces}
          visibleCount={step}
          accent="b2"
        />
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-700">
          Keterkaitan FBD dengan Persamaan Hukum Newton:
        </p>
        {equationsLatex.map((eq, i) => (
          <MathFormula key={i} latex={eq} displayMode />
        ))}
      </div>
    </div>
  );
}
