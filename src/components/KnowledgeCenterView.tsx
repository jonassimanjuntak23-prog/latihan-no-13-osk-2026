import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { KNOWLEDGE_MODULES } from '../data/knowledgeData';
import type { MenuId, SimulationConfig } from '../types/physics';
import { MathFormula } from './MathFormula';
import { NarratorInlineButton } from './NarratorControls';
import { PhysicsAnimator } from './PhysicsAnimator';

interface KnowledgeCenterViewProps {
  onNavigate: (menu: MenuId) => void;
  onNarrate: (title: string, script: string) => void;
}

const DEMO_CONCEPT_SIM: SimulationConfig = {
  mode: 'constant-push',
  m1: 130,
  m2: 250,
  force: 46,
  duration: 1.2,
  totalTime: 3.6,
  stepDescriptions: [
    { t: 0, text: 't = 0,0 s: Kedua perahu diam berdekatan.' },
    { t: 0.6, text: 't = 0,6 s: Gaya aksi-reaksi 46 N sedang bekerja.' },
    { t: 1.2, text: 't = 1,2 s: Impuls tercapai 55,2 Ns pada masing-masing perahu.' },
    { t: 2.0, text: 't > 1,2 s: Perahu 1 (130 kg) melaju lebih cepat dibanding Perahu 2 (250 kg).' },
  ],
};

export function KnowledgeCenterView({
  onNavigate,
  onNarrate,
}: KnowledgeCenterViewProps) {
  const [activeId, setActiveId] = useState<number>(1);
  const current =
    KNOWLEDGE_MODULES.find((m) => m.id === activeId) ?? KNOWLEDGE_MODULES[0];

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <p className="text-xs font-semibold text-[#8E1B37]">
            Buku Teks Interaktif · Guru Pembimbing: Mister Jo
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Pusat Pengetahuan Fisika
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pelajari 12 tahap penguasaan konsep dari fenomena awal, penurunan rumus, kesalahan umum, hingga strategi olimpiade sebelum mengerjakan 15 soal latihan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('soal')}
          className="inline-flex items-center gap-2 rounded-xl bg-[#6B0F24] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A0B1E] transition-colors cursor-pointer"
        >
          <span>Siap ke Bank 15 Soal</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* 2-Column Textbook Layout: Sidebar index + Main Lesson */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside
          aria-label="Daftar Modul Pengetahuan"
          className="lg:col-span-4 rounded-2xl border border-slate-200 bg-[#F8F8FA] p-3 space-y-1"
        >
          <p className="px-3 py-2 text-xs font-bold text-slate-500">
            12 Bab Pembelajaran Sistematis
          </p>
          {KNOWLEDGE_MODULES.map((mod) => {
            const isActive = mod.id === activeId;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveId(mod.id)}
                className={`w-full text-left rounded-xl px-3 py-2.5 text-xs sm:text-sm transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#6B0F24] text-white font-semibold'
                    : 'text-slate-700 hover:bg-white hover:text-[#6B0F24]'
                }`}
              >
                {mod.title}
              </button>
            );
          })}
        </aside>

        <main className="lg:col-span-8 space-y-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#8E1B37]">
                  Bab {String(current.id).padStart(2, '0')} dari 12
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  {current.title}
                </h2>
                <p className="text-sm text-slate-600">{current.subtitle}</p>
              </div>
              <NarratorInlineButton
                label="Bacakan Materi Ini"
                variant="primary"
                onSpeak={() => onNarrate(current.title, current.narrationScript)}
              />
            </div>

            {current.image && (
              <figure className="space-y-2">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  <img
                    src={current.image.src}
                    alt={current.image.alt}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-80 object-cover"
                  />
                </div>
                <figcaption className="text-xs text-slate-500 italic">
                  {current.image.caption}
                </figcaption>
              </figure>
            )}

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              {current.prose.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {current.bullets && (
              <ul className="space-y-2 rounded-xl border border-slate-200 bg-[#FBF9FA] p-4 text-sm text-slate-700">
                {current.bullets.map((b, idx) => (
                  <li key={idx} className="leading-relaxed">
                    • {b}
                  </li>
                ))}
              </ul>
            )}

            {current.equations && (
              <div className="space-y-4">
                {current.equations.map((eq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#E9D8DC] bg-white p-4 space-y-1.5"
                  >
                    <p className="text-xs font-bold text-[#6B0F24]">{eq.label}</p>
                    <MathFormula latex={eq.latex} displayMode />
                    <p className="text-xs sm:text-sm text-slate-600">
                      <strong className="text-slate-800">Makna Fisis:</strong> {eq.meaning}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Key Takeaway */}
            <div className="rounded-xl border border-[#C99A3B]/45 bg-[#FFFBEB] p-4">
              <p className="text-xs font-bold text-[#92400E] mb-1">
                Intisari Konsep Mister Jo
              </p>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {current.keyTakeaway}
              </p>
            </div>

            {/* Chapter Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                disabled={activeId <= 1}
                onClick={() => setActiveId((id) => Math.max(1, id - 1))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Bab Sebelumnya</span>
              </button>
              <button
                type="button"
                disabled={activeId >= KNOWLEDGE_MODULES.length}
                onClick={() =>
                  setActiveId((id) => Math.min(KNOWLEDGE_MODULES.length, id + 1))
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#6B0F24] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#5A0B1E] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Bab Berikutnya</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Embedded Physics Proof Animation for Knowledge Center */}
          <PhysicsAnimator
            config={DEMO_CONCEPT_SIM}
            title="Demonstrasi Fenomena Asli OSK 2026 No. 13 (46 N · 1,2 s)"
            onNarrate={(text) => onNarrate('Demonstrasi Fenomena OSK No. 13', text)}
          />
        </main>
      </div>
    </div>
  );
}
