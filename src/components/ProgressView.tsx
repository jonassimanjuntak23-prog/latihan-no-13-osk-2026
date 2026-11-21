import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { ALL_PROBLEMS, DIFFICULTY_TIERS } from '../data/problemsData';
import type { MenuId, ProblemAttempt } from '../types/physics';

interface ProgressViewProps {
  attempts: Record<number, ProblemAttempt>;
  onOpenProblem: (id: number) => void;
  onNavigate: (menu: MenuId) => void;
  onResetProgress: () => void;
}

export function ProgressView({
  attempts,
  onOpenProblem,
  onNavigate,
  onResetProgress,
}: ProgressViewProps) {
  const attemptList = Object.values(attempts);
  const attemptedCount = attemptList.length;
  const correctCount = attemptList.filter((a) => a.isCorrect).length;
  const wrongCount = attemptList.filter((a) => !a.isCorrect).length;
  const masteryPct = Math.round((correctCount / 15) * 100);

  const recommendedProblems = ALL_PROBLEMS.filter((p) => {
    const att = attempts[p.id];
    return !att || !att.isCorrect;
  }).slice(0, 5);

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#8E1B37]">
            Evaluasi Penguasaan Konsep · OSK Fisika 2026
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Progres Belajar Bersama Mister Jo
          </h1>
          <p className="text-sm text-slate-600">
            Pantau perkembangan latihan dari 15 soal bertahap dan identifikasi submateri yang perlu diperdalam kembali.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetProgress}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Reset Semua Progres</span>
        </button>
      </div>

      {/* 4 KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-1">
          <p className="text-xs font-medium text-slate-500">Soal Dikerjakan</p>
          <p className="font-mono-tabular text-3xl font-bold text-slate-900">
            {attemptedCount} / 15
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 space-y-1">
          <p className="text-xs font-medium text-emerald-800">Jawaban Benar</p>
          <p className="font-mono-tabular text-3xl font-bold text-emerald-700">
            {correctCount}
          </p>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5 space-y-1">
          <p className="text-xs font-medium text-rose-800">Perlu Perbaikan</p>
          <p className="font-mono-tabular text-3xl font-bold text-rose-700">
            {wrongCount}
          </p>
        </div>

        <div className="rounded-2xl border border-[#DFC7CE] bg-[#FDF9FA] p-5 space-y-1">
          <p className="text-xs font-medium text-[#6B0F24]">Persentase Penguasaan</p>
          <p className="font-mono-tabular text-3xl font-bold text-[#5A0B1E]">
            {masteryPct}%
          </p>
        </div>
      </div>

      {/* Breakdown per Tier */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-slate-900">
          Penguasaan per Tingkat Kesulitan
        </h2>
        <div className="space-y-4">
          {DIFFICULTY_TIERS.map((tier) => {
            const tierProblems = ALL_PROBLEMS.filter((p) => p.tier === tier);
            const tierSolved = tierProblems.filter(
              (p) => attempts[p.id]?.isCorrect
            ).length;
            const pct = Math.round((tierSolved / tierProblems.length) * 100);
            return (
              <div key={tier} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800">{tier}</span>
                  <span className="font-mono-tabular text-slate-600">
                    {tierSolved} / {tierProblems.length} benar ({pct}%)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#6B0F24] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Review & Problem Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Status Lengkap 15 Soal
          </h2>
          <div className="divide-y divide-slate-100">
            {ALL_PROBLEMS.map((p) => {
              const att = attempts[p.id];
              return (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-2.5 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {att?.isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    ) : att && !att.isCorrect ? (
                      <XCircle className="h-4 w-4 text-rose-600 shrink-0" aria-hidden="true" />
                    ) : (
                      <span
                        className="h-4 w-4 rounded-full border border-slate-300 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span className="font-mono-tabular font-bold text-slate-800">
                      {p.code}
                    </span>
                    <span className="truncate text-slate-600">{p.title}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenProblem(p.id)}
                    className="text-xs font-semibold text-[#6B0F24] hover:underline cursor-pointer shrink-0"
                  >
                    {att?.isCorrect ? 'Tinjau Ulang' : 'Kerjakan'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-5 rounded-2xl border border-[#E8DADF] bg-[#FDF9FA] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#5A0B1E]">
            Materi yang Disarankan untuk Dipelajari Ulang
          </h2>
          {recommendedProblems.length === 0 ? (
            <div className="space-y-3 text-sm text-emerald-900">
              <p className="font-semibold">
                Selamat! Kamu telah menguasai seluruh 15 soal pengembangan OSK 2026 Nomor 13.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('laboratorium')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#6B0F24] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5A0B1E] cursor-pointer"
              >
                <span>Eksplorasi Laboratorium Animasi</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Berdasarkan riwayat jawabanmu, fokuskan latihan berikutnya pada topik berikut sebelum melompat ke soal tantangan:
              </p>
              <ul className="space-y-2.5">
                {recommendedProblems.map((p) => (
                  <li
                    key={p.id}
                    className="rounded-xl border border-[#E9D8DC] bg-white p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#6B0F24]">
                        {p.code} · {p.tier}
                      </p>
                      <p className="text-xs text-slate-700 truncate">{p.subtopic}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenProblem(p.id)}
                      className="rounded-lg bg-[#6B0F24] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5A0B1E] cursor-pointer shrink-0"
                    >
                      Buka
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('pengetahuan')}
                className="w-full rounded-xl border border-[#D8BCC4] bg-white px-4 py-2.5 text-xs font-semibold text-[#6B0F24] hover:bg-[#FDF5F7] cursor-pointer"
              >
                Pelajari Ulang Pusat Pengetahuan Fisika
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
