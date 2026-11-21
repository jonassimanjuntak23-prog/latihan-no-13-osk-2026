import { ArrowRight } from 'lucide-react';
import { ANALYSIS_12_POINTS, ORIGINAL_SOAL_13 } from '../data/knowledgeData';
import type { MenuId } from '../types/physics';
import { MathFormula } from './MathFormula';
import { NarratorInlineButton } from './NarratorControls';

interface AnalysisViewProps {
  onNavigate: (menu: MenuId) => void;
  onNarrate: (title: string, script: string) => void;
}

export function AnalysisView({ onNavigate, onNarrate }: AnalysisViewProps) {
  const overviewSpeech = `Mari kita bedah naskah asli Soal OSK Fisika SMA 2026 Nomor 13. Soalnya berbunyi: ${ORIGINAL_SOAL_13.text} Kunci utamanya adalah Hukum Tiga Newton dan Teorema Impuls Momentum. Karena gaya dorong empat puluh enam Newton bekerja selama satu koma dua detik pada kedua perahu dari keadaan diam, momentum masing-masing perahu langsung sama dengan lima puluh lima koma dua Newton sekon.`;

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2 max-w-3xl">
          <p className="text-xs font-semibold text-[#8E1B37]">
            Sumber Primer · {ORIGINAL_SOAL_13.documentName}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Analisis Mendalam Soal OSK Fisika 2026 Nomor 13
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Seluruh 15 soal latihan dan modul teori di aplikasi ini dikembangkan langsung dari konsep inti naskah asli berikut.
          </p>
        </div>
        <NarratorInlineButton
          label="Dengarkan Analisis Soal 13"
          variant="primary"
          onSpeak={() => onNarrate('Analisis Soal OSK No. 13', overviewSpeech)}
        />
      </div>

      {/* Original Excerpt Card */}
      <section className="rounded-2xl border border-[#DFC7CE] bg-[#FDF9FA] p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-[#5A0B1E]">
            Naskah Asli Soal Nomor 13 (OSK Fisika SMA 2026)
          </h2>
          <span className="font-mono-tabular text-xs font-semibold text-[#6B0F24]">
            Hasil Terverifikasi: {ORIGINAL_SOAL_13.exactResult}
          </span>
        </div>

        <blockquote className="rounded-xl border border-[#E9D8DC] bg-white p-4 text-sm sm:text-base leading-relaxed text-slate-800">
          “13) {ORIGINAL_SOAL_13.text}”
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-xs font-bold text-slate-900 mb-2">
              Parameter Resmi pada Dokumen
            </h3>
            <ul className="space-y-1 text-xs text-slate-700">
              {ORIGINAL_SOAL_13.officialParameters.map((p, idx) => (
                <li key={idx}>• {p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">
                Inti Penyelesaian Ilmiah
              </h3>
              <MathFormula
                latex="|p_1| = |p_2| = F\\,\\Delta t = 46 \\times 1{,}2 = 55{,}2\\text{ Ns}"
                displayMode
              />
            </div>
            <p className="text-xs text-slate-600">
              Massa 130 kg dan 250 kg menentukan kecepatan masing-masing, namun tidak mengubah besar impuls atau momentum akhir.
            </p>
          </div>
        </div>
      </section>

      {/* Concept Map SVG */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Peta Konsep Pengembangan Soal Nomor 13
        </h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 overflow-x-auto">
          <svg
            viewBox="0 0 820 300"
            className="w-full min-w-[640px] h-auto"
            role="img"
            aria-label="Peta konsep pengembangan Soal Nomor 13 OSK Fisika 2026"
          >
            {/* Connectors */}
            <line x1="410" y1="150" x2="155" y2="62" stroke="#D8BCC4" strokeWidth="2" />
            <line x1="410" y1="150" x2="155" y2="150" stroke="#D8BCC4" strokeWidth="2" />
            <line x1="410" y1="150" x2="155" y2="238" stroke="#D8BCC4" strokeWidth="2" />
            <line x1="410" y1="150" x2="665" y2="62" stroke="#D8BCC4" strokeWidth="2" />
            <line x1="410" y1="150" x2="665" y2="150" stroke="#D8BCC4" strokeWidth="2" />
            <line x1="410" y1="150" x2="665" y2="238" stroke="#D8BCC4" strokeWidth="2" />

            {/* Center Node */}
            <rect x="295" y="112" width="230" height="76" rx="14" fill="#6B0F24" />
            <text x="410" y="143" textAnchor="middle" className="fill-[#F4D58D] text-[11px] font-bold">
              INTI SOAL OSK NO. 13
            </text>
            <text x="410" y="164" textAnchor="middle" className="fill-white text-sm font-bold">
              Momentum Linear &amp; Impuls
            </text>

            {/* Left Nodes */}
            <rect x="20" y="30" width="210" height="62" rx="10" fill="#FDF9FA" stroke="#8E1B37" strokeWidth="1.5" />
            <text x="125" y="55" textAnchor="middle" className="fill-slate-900 text-xs font-bold">Hukum III Newton</text>
            <text x="125" y="74" textAnchor="middle" className="fill-slate-600 text-[11px]">F₁₂ = −F₂₁ · Soal 01–03</text>

            <rect x="20" y="119" width="210" height="62" rx="10" fill="#FDF9FA" stroke="#8E1B37" strokeWidth="1.5" />
            <text x="125" y="144" textAnchor="middle" className="fill-slate-900 text-xs font-bold">Impuls Gaya Berubah F(t)</text>
            <text x="125" y="163" textAnchor="middle" className="fill-slate-600 text-[11px]">Luas &amp; Integral · Soal 04, 13</text>

            <rect x="20" y="208" width="210" height="62" rx="10" fill="#FDF9FA" stroke="#8E1B37" strokeWidth="1.5" />
            <text x="125" y="233" textAnchor="middle" className="fill-slate-900 text-xs font-bold">Vektor &amp; Kondisi Awal</text>
            <text x="125" y="252" textAnchor="middle" className="fill-slate-600 text-[11px]">v₀ ≠ 0 &amp; Sudut 37° · Soal 05, 08</text>

            {/* Right Nodes */}
            <rect x="590" y="30" width="210" height="62" rx="10" fill="#FDF9FA" stroke="#8E1B37" strokeWidth="1.5" />
            <text x="695" y="55" textAnchor="middle" className="fill-slate-900 text-xs font-bold">Energi &amp; Pegas (p²/2μ)</text>
            <text x="695" y="74" textAnchor="middle" className="fill-slate-600 text-[11px]">Usaha Internal · Soal 06, 11</text>

            <rect x="590" y="119" width="210" height="62" rx="10" fill="#FDF9FA" stroke="#8E1B37" strokeWidth="1.5" />
            <text x="695" y="144" textAnchor="middle" className="fill-slate-900 text-xs font-bold">Pusat Massa &amp; Pertukaran</text>
            <text x="695" y="163" textAnchor="middle" className="fill-slate-600 text-[11px]">Jarak &amp; Lompatan · Soal 07, 10</text>

            <rect x="590" y="208" width="210" height="62" rx="10" fill="#FDF9FA" stroke="#8E1B37" strokeWidth="1.5" />
            <text x="695" y="233" textAnchor="middle" className="fill-slate-900 text-xs font-bold">Hambatan &amp; Tumbukan</text>
            <text x="695" y="252" textAnchor="middle" className="fill-slate-600 text-[11px]">f, f=−bv, Pantulan · Soal 09, 12, 14, 15</text>
          </svg>
        </div>
      </section>

      {/* 12 Analysis Points Grid */}
      <section className="space-y-5">
        <h2 className="font-display text-xl font-bold text-slate-900">
          12 Identifikasi Kurikulum &amp; Fisika Soal Nomor 13
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ANALYSIS_12_POINTS.map((point) => (
            <article
              key={point.number}
              className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2.5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-slate-900">
                  {String(point.number).padStart(2, '0')}. {point.title}
                </h3>
              </div>
              <p className="text-sm font-semibold text-[#6B0F24]">{point.summary}</p>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {point.details.map((d, idx) => (
                  <li key={idx}>• {d}</li>
                ))}
              </ul>
              {point.latex && <MathFormula latex={point.latex} displayMode />}
            </article>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onNavigate('pengetahuan')}
          className="inline-flex items-center gap-2 rounded-xl bg-[#6B0F24] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5A0B1E] transition-colors cursor-pointer"
        >
          <span>Lanjut ke Pusat Pengetahuan Fisika</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
