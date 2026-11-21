import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ALL_PROBLEMS, DIFFICULTY_TIERS } from '../data/problemsData';
import type { DifficultyTier, ProblemAttempt } from '../types/physics';
import { checkStudentAnswer, type AnswerCheckResult } from '../utils/answerChecker';
import { InteractiveFBD } from './InteractiveFBD';
import { MathFormula } from './MathFormula';
import { NarratorInlineButton } from './NarratorControls';
import { PhysicsAnimator } from './PhysicsAnimator';
import { StimulusDiagram } from './StimulusDiagram';

interface ProblemBankViewProps {
  attempts: Record<number, ProblemAttempt>;
  selectedProblemId: number;
  onSelectProblem: (id: number) => void;
  onRecordAttempt: (
    problemId: number,
    input: string,
    isCorrect: boolean,
    hintUsed?: boolean,
    solutionOpened?: boolean
  ) => void;
  onNarrate: (title: string, script: string) => void;
}

export function ProblemBankView({
  attempts,
  selectedProblemId,
  onSelectProblem,
  onRecordAttempt,
  onNarrate,
}: ProblemBankViewProps) {
  const [tierFilter, setTierFilter] = useState<'Semua' | DifficultyTier>('Semua');
  const [inputValue, setInputValue] = useState('');
  const [checkResult, setCheckResult] = useState<AnswerCheckResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showPembahasan, setShowPembahasan] = useState(false);

  const problem =
    ALL_PROBLEMS.find((p) => p.id === selectedProblemId) ?? ALL_PROBLEMS[0];
  const currentAttempt = attempts[problem.id];

  // Sync local input & states when switching problems
  useEffect(() => {
    const saved = attempts[problem.id];
    setInputValue(saved?.lastInput ?? '');
    setCheckResult(null);
    setShowHint(saved?.hintUsed ?? false);
    setShowPembahasan(saved?.solutionOpened ?? false);
  }, [problem.id]);

  const filteredProblems =
    tierFilter === 'Semua'
      ? ALL_PROBLEMS
      : ALL_PROBLEMS.filter((p) => p.tier === tierFilter);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkStudentAnswer(
      inputValue,
      problem.exactValue,
      problem.formattedAnswer,
      problem.unit
    );
    setCheckResult(res);

    if (res.status === 'correct') {
      onRecordAttempt(problem.id, inputValue.trim(), true, showHint, showPembahasan);
    } else if (res.status === 'incorrect' || res.status === 'format-warning') {
      onRecordAttempt(problem.id, inputValue.trim(), false, showHint, showPembahasan);
    }
  };

  const handleToggleHint = () => {
    const next = !showHint;
    setShowHint(next);
    if (next) {
      onRecordAttempt(
        problem.id,
        inputValue,
        currentAttempt?.isCorrect ?? false,
        true,
        showPembahasan
      );
    }
  };

  const handleTogglePembahasan = () => {
    const next = !showPembahasan;
    setShowPembahasan(next);
    if (next) {
      onRecordAttempt(
        problem.id,
        inputValue,
        currentAttempt?.isCorrect ?? false,
        showHint,
        true
      );
    }
  };

  const handleRetry = () => {
    setInputValue('');
    setCheckResult(null);
  };

  const handleNext = () => {
    const nextId = problem.id < 15 ? problem.id + 1 : 1;
    onSelectProblem(nextId);
  };

  const pb = problem.pembahasan;

  return (
    <div className="space-y-8 pb-14">
      {/* Header & Filter */}
      <div className="border-b border-slate-200 pb-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#8E1B37]">
              Latihan Bertahap · Isian Singkat Numerik 1 Desimal Koma
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Bank 15 Soal Latihan OSK Fisika 2026
            </h1>
          </div>
          <p className="text-xs font-mono-tabular font-semibold text-slate-600">
            Terjawab benar: {Object.values(attempts).filter((a) => a.isCorrect).length} / 15 soal
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100 p-1.5"
          role="group"
          aria-label="Filter tingkat kesulitan soal"
        >
          {(['Semua', ...DIFFICULTY_TIERS] as const).map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setTierFilter(tier)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                tierFilter === tier
                  ? 'bg-[#6B0F24] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Number Grid Navigator */}
        <div className="flex flex-wrap gap-2" aria-label="Navigasi nomor soal">
          {filteredProblems.map((item) => {
            const att = attempts[item.id];
            const isSelected = item.id === problem.id;
            const statusClass = att?.isCorrect
              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
              : att && !att.isCorrect
                ? 'border-rose-400 bg-rose-50 text-rose-800'
                : 'border-slate-200 bg-white text-slate-700 hover:border-[#8E1B37]';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectProblem(item.id)}
                aria-current={isSelected ? 'page' : undefined}
                className={`min-w-[44px] h-10 rounded-lg border px-2.5 text-xs font-mono-tabular font-bold transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#6B0F24] bg-[#6B0F24] text-white ring-2 ring-[#6B0F24]/25'
                    : statusClass
                }`}
              >
                {String(item.id).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Problem Card */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        {/* Problem Metadata (Zero-Pill Unboxed Text) */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8E1B37]">
              <span>{problem.code}</span>
              <span aria-hidden="true">·</span>
              <span>{problem.tier}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-600">{problem.subtopic}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              {problem.title}
            </h2>
          </div>

          <NarratorInlineButton
            label="Bacakan Soal & Gambar"
            variant="primary"
            onSpeak={() =>
              onNarrate(
                `${problem.code} — ${problem.title}`,
                `${problem.code}. ${problem.stimulusCaption}. Penjelasan gambar: ${problem.stimulusElements.join('. ')}. Pertanyaannya: ${problem.questionText}`
              )
            }
          />
        </div>

        {/* Stimulus Figure + Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-2">
            <StimulusDiagram problem={problem} />
            <p className="text-xs text-slate-500">{problem.stimulusCaption}</p>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-[#F8F8FA] p-4 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900">
              Penjelasan Elemen Visual Stimulus
            </h3>
            <ul className="space-y-1.5 text-xs leading-relaxed text-slate-700">
              {problem.stimulusElements.map((el, i) => (
                <li key={i}>• {el}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Question Text */}
        <div className="rounded-xl border border-[#E8DADF] bg-[#FDF9FA] p-5 space-y-2">
          <p className="text-xs font-bold text-[#6B0F24]">Naskah Soal</p>
          <p className="text-sm sm:text-base leading-relaxed text-slate-900 font-medium">
            {problem.questionText}
          </p>
        </div>

        {/* Answer Form */}
        <form onSubmit={handleCheck} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="numeric-answer-input"
              className="block text-sm font-bold text-slate-900"
            >
              Jawaban Anda ({problem.unit}):
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <input
                  id="numeric-answer-input"
                  type="text"
                  inputMode="decimal"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Contoh: 12,5"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono-tabular text-base font-semibold text-slate-900 focus:border-[#6B0F24] focus:outline-none focus:ring-2 focus:ring-[#6B0F24]/20"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
                  {problem.unit}
                </span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-[#6B0F24] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5A0B1E] transition-colors cursor-pointer whitespace-nowrap"
              >
                Periksa Jawaban
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Petunjuk format: Tuliskan angka numerik saja dengan tepat satu angka di belakang koma memakai tanda koma (contoh: 12,5 atau 0,8 atau 125,0).
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleToggleHint}
              aria-expanded={showHint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5 text-[#8E1B37]" aria-hidden="true" />
              <span>{showHint ? 'Tutup Petunjuk Konsep' : 'Lihat Petunjuk'}</span>
            </button>

            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Coba Lagi</span>
            </button>

            <button
              type="button"
              onClick={handleTogglePembahasan}
              aria-expanded={showPembahasan}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8BCC4] bg-[#FDF5F7] px-3.5 py-2 text-xs font-semibold text-[#6B0F24] hover:bg-[#F7E5EA] transition-colors cursor-pointer"
            >
              {showPembahasan ? (
                <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>{showPembahasan ? 'Tutup Pembahasan' : 'Buka Pembahasan'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer ml-auto"
            >
              <span>Soal Selanjutnya</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </form>

        {/* Feedback Banner */}
        {checkResult && (
          <div
            role="status"
            className={`rounded-xl border p-4 flex items-start gap-3 ${
              checkResult.status === 'correct'
                ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                : checkResult.status === 'format-warning'
                  ? 'border-amber-300 bg-amber-50 text-amber-900'
                  : 'border-rose-300 bg-rose-50 text-rose-900'
            }`}
          >
            {checkResult.status === 'correct' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div className="space-y-1.5 text-sm">
              <p className="font-bold">
                {checkResult.status === 'correct'
                  ? 'Jawaban Benar — Luar Biasa!'
                  : checkResult.status === 'format-warning'
                    ? 'Hampir Sempurna — Perbaiki Format Penulisan'
                    : 'Belum Tepat — Terus Coba dengan Penalaran Konsep'}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">{checkResult.message}</p>
              {checkResult.status === 'correct' ? (
                <div className="pt-1 flex flex-wrap gap-2">
                  <p className="text-xs text-emerald-800 w-full">
                    {pb.bagian6Kesimpulan.interpretasiFisis}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (!showPembahasan) handleTogglePembahasan();
                    }}
                    className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 cursor-pointer"
                  >
                    Lihat Pembahasan &amp; Animasi Bukti
                  </button>
                </div>
              ) : (
                <p className="text-xs text-rose-800">
                  <strong>Petunjuk Mister Jo:</strong> {problem.hint}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Hint Drawer */}
        {showHint && (
          <div className="rounded-xl border border-[#C99A3B]/45 bg-[#FFFBEB] p-4 space-y-2">
            <p className="text-xs font-bold text-[#92400E]">
              Petunjuk Konsep &amp; Peringatan Miskonsepsi
            </p>
            <p className="text-sm text-slate-800 leading-relaxed">{problem.hint}</p>
            <p className="text-xs text-amber-900">
              <strong>Waspada Jebakan:</strong> {problem.misconceptionWarning}
            </p>
          </div>
        )}

        {/* 8-Part Collapsible Pembahasan */}
        {showPembahasan && (
          <div className="border-t border-slate-200 pt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl font-bold text-[#5A0B1E]">
                PEMBAHASAN {problem.code}
              </h3>
              <NarratorInlineButton
                label="Bacakan Pembahasan Lengkap"
                variant="primary"
                onSpeak={() =>
                  onNarrate(`Pembahasan ${problem.code}`, problem.narrationPrompt)
                }
              />
            </div>

            {/* Bagian 1 */}
            <div className="rounded-xl border border-slate-200 bg-[#F8F8FA] p-5 space-y-2.5">
              <h4 className="font-display text-base font-bold text-slate-900">
                Bagian 1 – Memahami Permasalahan
              </h4>
              <p className="text-sm text-slate-700">
                <strong>Fenomena:</strong> {pb.bagian1Memahami.fenomena}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <div>
                  <p className="font-bold text-slate-900 mb-1">Diketahui:</p>
                  <ul className="space-y-0.5">
                    {pb.bagian1Memahami.diketahui.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong className="text-slate-900">Ditanyakan:</strong>{' '}
                    {pb.bagian1Memahami.ditanyakan}
                  </p>
                  <p>
                    <strong className="text-slate-900">Konsep Utama:</strong>{' '}
                    {pb.bagian1Memahami.konsep.join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Bagian 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <h4 className="font-display text-base font-bold text-slate-900">
                Bagian 2 – Visualisasi Fenomena &amp; Animasi Pembuktian
              </h4>
              <PhysicsAnimator
                config={problem.simulation}
                title={problem.code}
                onNarrate={(txt) => onNarrate(`Animasi ${problem.code}`, txt)}
              />
              <ul className="space-y-1.5 text-sm text-slate-700">
                {pb.bagian2Visualisasi.penjelasanProses.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>

            {/* Bagian 3 */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <h4 className="font-display text-base font-bold text-slate-900">
                Bagian 3 – Analisis Fisika &amp; Free Body Diagram
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
                <p>
                  <strong className="text-slate-900">Hukum Fisika:</strong>{' '}
                  {pb.bagian3Analisis.hukumFisika}
                </p>
                <p>
                  <strong className="text-slate-900">Sumbu Koordinat:</strong>{' '}
                  {pb.bagian3Analisis.sumbuKoordinat}
                </p>
                <p className="md:col-span-2">
                  <strong className="text-slate-900">Analisis Hubungan:</strong>{' '}
                  {pb.bagian3Analisis.analisisHubungan}
                </p>
              </div>
              <InteractiveFBD
                forces={problem.fbdForces}
                axesNote={problem.fbdAxesNote}
                equationsLatex={problem.fbdEquationsLatex}
                onNarrate={(txt) => onNarrate(`FBD ${problem.code}`, txt)}
              />
            </div>

            {/* Bagian 4 */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
              <h4 className="font-display text-base font-bold text-slate-900">
                Bagian 4 – Persamaan Dasar
              </h4>
              <MathFormula latex={pb.bagian4Persamaan.rumusUtamaLatex} displayMode />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                {pb.bagian4Persamaan.maknaSimbol.map((s, i) => (
                  <p key={i}>
                    <strong className="text-[#6B0F24]">{s.symbol}:</strong> {s.meaning}
                  </p>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                <strong className="text-slate-900">Alasan Pemilihan Rumus:</strong>{' '}
                {pb.bagian4Persamaan.alasanPemilihan}
              </p>
            </div>

            {/* Bagian 5 */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <h4 className="font-display text-base font-bold text-slate-900">
                Bagian 5 – Penyelesaian Matematis Bertahap
              </h4>
              <div className="space-y-4">
                {pb.bagian5Penyelesaian.langkah.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-slate-100 bg-[#FBF9FA] p-4 space-y-1.5"
                  >
                    <p className="text-xs font-bold text-[#6B0F24]">{step.label}</p>
                    <MathFormula latex={step.latex} displayMode />
                    <p className="text-xs text-slate-600">{step.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700">
                <strong className="text-slate-900">Aturan Pembulatan:</strong>{' '}
                {pb.bagian5Penyelesaian.pembulatan}
              </p>
            </div>

            {/* Bagian 6 */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 space-y-2">
              <h4 className="font-display text-base font-bold text-emerald-950">
                Bagian 6 – Kesimpulan
              </h4>
              <p className="font-mono-tabular text-2xl font-extrabold text-emerald-800">
                {pb.bagian6Kesimpulan.nilaiAkhir} {pb.bagian6Kesimpulan.satuan}
              </p>
              <p className="text-sm text-emerald-900 leading-relaxed">
                {pb.bagian6Kesimpulan.interpretasiFisis}
              </p>
            </div>

            {/* Bagian 7 & 8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5">
                <h4 className="font-display text-base font-bold text-slate-900">
                  Bagian 7 – Strategi Olimpiade
                </h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  <strong>Trik Efisien:</strong> {pb.bagian7Strategi.trikEfisien}
                </p>
                <p className="text-xs sm:text-sm text-slate-700">
                  <strong>Cara Mengenali:</strong> {pb.bagian7Strategi.caraMengenali}
                </p>
                <ul className="space-y-1 text-xs text-rose-800">
                  {pb.bagian7Strategi.kesalahanDihindari.map((k, i) => (
                    <li key={i}>• Hindari: {k}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5">
                <h4 className="font-display text-base font-bold text-slate-900">
                  Bagian 8 – Pendalaman Konsep
                </h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  <strong>Konsep Lanjutan:</strong> {pb.bagian8Pendalaman.konsepLanjutan}
                </p>
                <p className="text-xs sm:text-sm text-slate-700">
                  <strong>Variasi Soal:</strong> {pb.bagian8Pendalaman.variasiSoal}
                </p>
                <p className="text-xs sm:text-sm text-[#6B0F24] font-medium">
                  {pb.bagian8Pendalaman.hubunganBerikutnya}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
