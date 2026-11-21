import { useState } from 'react';
import { FORMULA_SUMMARY_LIST } from '../data/knowledgeData';
import { MathFormula } from './MathFormula';
import { NarratorInlineButton } from './NarratorControls';

interface FormulaSummaryViewProps {
  onNarrate: (title: string, script: string) => void;
}

const CATEGORIES = [
  'Semua',
  'Dasar',
  'Sistem Dua Benda',
  'Energi & Kerja',
  'Kasus Lanjutan',
] as const;

export function FormulaSummaryView({ onNarrate }: FormulaSummaryViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>('Semua');

  const items =
    selectedCategory === 'Semua'
      ? FORMULA_SUMMARY_LIST
      : FORMULA_SUMMARY_LIST.filter((f) => f.category === selectedCategory);

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <p className="text-xs font-semibold text-[#8E1B37]">
            Referensi Cepat Olimpiade · Satuan SI &amp; Batas Keberlakuan
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Rangkuman Rumus Momentum Linear
          </h1>
          <p className="text-sm text-slate-600">
            Jangan menghafal rumus tanpa mengetahui arti simbol, satuan SI, dan kondisi kapan rumus tersebut sah digunakan.
          </p>
        </div>

        <NarratorInlineButton
          label="Bacakan Rangkuman Rumus"
          variant="primary"
          onSpeak={() =>
            onNarrate(
              'Rangkuman Rumus Utama',
              items
                .map(
                  (f) =>
                    `${f.name}. Persamaan: ${f.latex}. Syarat berlaku: ${f.conditions}`
                )
                .join('. ')
            )
          }
        />
      </div>

      <div
        className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5"
        role="group"
        aria-label="Filter kategori rumus"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#6B0F24] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#8E1B37]">
                  {item.category}
                </span>
                <NarratorInlineButton
                  label="Bacakan"
                  onSpeak={() =>
                    onNarrate(
                      item.name,
                      `${item.name}. ${item.latex}. Syarat berlaku: ${item.conditions}. Hubungan besaran: ${item.relations}`
                    )
                  }
                />
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                {item.name}
              </h2>
              <MathFormula latex={item.latex} displayMode />

              <div className="rounded-xl border border-slate-100 bg-[#F8F8FA] p-3.5 space-y-1.5">
                <p className="text-xs font-bold text-slate-800">
                  Arti Simbol &amp; Satuan SI:
                </p>
                {item.symbols.map((sym, idx) => (
                  <div
                    key={idx}
                    className="flex items-baseline justify-between gap-3 text-xs text-slate-700"
                  >
                    <span>
                      <MathFormula latex={sym.symbol} /> — {sym.meaning}
                    </span>
                    <span className="font-mono-tabular font-semibold text-slate-900 shrink-0">
                      [{sym.unit}]
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600">
              <p>
                <strong className="text-slate-900">Kondisi Penggunaan:</strong>{' '}
                {item.conditions}
              </p>
              <p>
                <strong className="text-[#6B0F24]">Hubungan Antarbesaran:</strong>{' '}
                {item.relations}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
