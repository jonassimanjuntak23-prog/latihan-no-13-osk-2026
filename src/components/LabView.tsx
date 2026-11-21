import { useMemo, useState } from 'react';
import type { SimulationConfig } from '../types/physics';
import { evaluateSimulationAt } from '../utils/physicsEngine';
import { NarratorInlineButton } from './NarratorControls';
import { PhysicsAnimator } from './PhysicsAnimator';

interface LabViewProps {
  onNarrate: (title: string, script: string) => void;
}

type LabMode = 'constant-push' | 'trapezoid-push' | 'compressed-spring' | 'viscous-drag';

export function LabView({ onNarrate }: LabViewProps) {
  const [mode, setMode] = useState<LabMode>('constant-push');
  const [m1, setM1] = useState(130);
  const [m2, setM2] = useState(250);
  const [force, setForce] = useState(46);
  const [duration, setDuration] = useState(1.2);
  const [springK, setSpringK] = useState(2000);
  const [springDx, setSpringDx] = useState(0.6);
  const [dragB, setDragB] = useState(25);

  const simConfig: SimulationConfig = useMemo(() => {
    const totalTime = mode === 'viscous-drag' ? 16.0 : 4.5;
    return {
      mode,
      m1,
      m2,
      force,
      duration,
      totalTime,
      springK,
      springDx,
      dragB,
      impulse: force * duration,
      stepDescriptions: [
        {
          t: 0,
          text:
            mode === 'compressed-spring'
              ? `Pegas k=${springK} N/m tertekan ${springDx.toFixed(1).replace('.', ',')} m dilepaskan.`
              : mode === 'viscous-drag'
                ? `Impuls awal ${(force * duration).toFixed(1).replace('.', ',')} Ns menghadapi hambatan b=${dragB} kg/s.`
                : `Gaya aksi-reaksi ${force} N bekerja selama ${duration.toFixed(1).replace('.', ',')} s pada m₁=${m1} kg dan m₂=${m2} kg.`,
        },
        {
          t: duration,
          text: 'Dorongan berakhir — perhatikan bahwa |p₁| selalu sebanding dengan |p₂| saat tanpa gesekan luar.',
        },
      ],
    };
  }, [mode, m1, m2, force, duration, springK, springDx, dragB]);

  // Sample 30 points for SVG Momentum & Velocity curves
  const curveData = useMemo(() => {
    const pts: { t: number; p1: number; p2: number; v1: number; v2: number }[] = [];
    for (let i = 0; i <= 30; i++) {
      const t = (i / 30) * simConfig.totalTime;
      const f = evaluateSimulationAt(simConfig, t);
      pts.push({ t, p1: f.p1, p2: f.p2, v1: f.v1, v2: f.v2 });
    }
    return pts;
  }, [simConfig]);

  const maxP = Math.max(10, ...curveData.map((d) => Math.max(Math.abs(d.p1), Math.abs(d.p2))));
  const toPlotX = (t: number) => 45 + (t / simConfig.totalTime) * 320;
  const toPlotY = (p: number) => 90 - (p / maxP) * 68;

  const p1Line = curveData.map((d) => `${toPlotX(d.t).toFixed(1)},${toPlotY(d.p1).toFixed(1)}`).join(' ');
  const p2Line = curveData.map((d) => `${toPlotX(d.t).toFixed(1)},${toPlotY(d.p2).toFixed(1)}`).join(' ');

  const labSpeech = `Selamat datang di Laboratorium Animasi Fisika Mister Jo. Saat ini kamu sedang menguji mode ${
    mode === 'constant-push'
      ? 'dorongan konstan'
      : mode === 'trapezoid-push'
        ? 'gaya trapesium'
        : mode === 'compressed-spring'
          ? 'pegas terkompresi'
          : 'hambatan viskos linear'
  } dengan massa perahu satu ${m1} kilogram dan perahu dua ${m2} kilogram. Amati grafik momentum di bawah kanvas: perhatikan bahwa kurva momentum perahu satu dan perahu dua selalu simetris berlawanan arah selama tidak ada gaya luar.`;

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <p className="text-xs font-semibold text-[#8E1B37]">
            Eksperimen Bebas Interaktif · Parameter Real-Time
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Laboratorium Animasi Momentum Linear
          </h1>
          <p className="text-sm text-slate-600">
            Ubah massa kedua perahu, besar gaya, durasi dorongan, konstanta pegas, atau koefisien hambatan air dan amati perubahan momentum secara langsung.
          </p>
        </div>

        <NarratorInlineButton
          label="Panduan Lab Mister Jo"
          variant="primary"
          onSpeak={() => onNarrate('Panduan Laboratorium Animasi', labSpeech)}
        />
      </div>

      {/* Mode Selector */}
      <div
        className="flex flex-wrap gap-2 rounded-xl bg-slate-100 p-1.5"
        role="group"
        aria-label="Pilih mode simulasi laboratorium"
      >
        {(
          [
            { id: 'constant-push', label: 'Dorongan Konstan (OSK No. 13)' },
            { id: 'trapezoid-push', label: 'Gaya Berubah Trapesium' },
            { id: 'compressed-spring', label: 'Pegas Terkompresi' },
            { id: 'viscous-drag', label: 'Hambatan Viskos f = −bv' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === tab.id
                ? 'bg-[#6B0F24] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Zone (Interactive Stage + Momentum Plot) */}
        <div className="lg:col-span-8 space-y-5">
          <PhysicsAnimator
            config={simConfig}
            title="Sandbox Laboratorium"
            onNarrate={(txt) => onNarrate('Pengamatan Laboratorium', txt)}
          />

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
            <h2 className="text-sm font-bold text-slate-900">
              Grafik Momentum p(t) Perahu 1 (Maroon) vs Perahu 2 (Hijau)
            </h2>
            <svg
              viewBox="0 0 400 180"
              className="w-full h-auto bg-[#FBF9FA] rounded-lg border border-slate-100"
              role="img"
              aria-label="Grafik momentum kedua perahu terhadap waktu"
            >
              <line x1="45" y1="90" x2="375" y2="90" stroke="#94A3B8" strokeWidth="1.2" />
              <line x1="45" y1="18" x2="45" y2="162" stroke="#334155" strokeWidth="1.5" />
              <polyline points={p2Line} fill="none" stroke="#059669" strokeWidth="2.5" />
              <polyline points={p1Line} fill="none" stroke="#8E1B37" strokeWidth="2.5" />
              <text x="38" y="25" textAnchor="end" className="fill-slate-600 text-[10px]">+{maxP.toFixed(0)}</text>
              <text x="38" y="93" textAnchor="end" className="fill-slate-600 text-[10px]">0</text>
              <text x="38" y="160" textAnchor="end" className="fill-slate-600 text-[10px]">−{maxP.toFixed(0)}</text>
              <text x="365" y="103" textAnchor="end" className="fill-slate-600 text-[10px]">t (s)</text>
              <text x="210" y="16" textAnchor="middle" className="fill-emerald-700 text-[10px] font-bold">
                p₂(t) · Perahu 2
              </text>
              <text x="210" y="171" textAnchor="middle" className="fill-[#8E1B37] text-[10px] font-bold">
                p₁(t) · Perahu 1
              </text>
            </svg>
          </div>
        </div>

        {/* Right Zone (Parameter Controls with Units) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-20 rounded-2xl border border-slate-200 bg-[#F8F8FA] p-5 space-y-5">
          <h2 className="font-display text-lg font-bold text-[#5A0B1E]">
            Panel Kontrol Parameter
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <label htmlFor="lab-m1">Massa Perahu 1 (m₁)</label>
                <span className="font-mono-tabular text-[#6B0F24]">{m1} kg</span>
              </div>
              <input
                id="lab-m1"
                type="range"
                min={50}
                max={300}
                step={10}
                value={m1}
                onChange={(e) => setM1(Number(e.target.value))}
                className="w-full accent-[#6B0F24] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <label htmlFor="lab-m2">Massa Perahu 2 (m₂)</label>
                <span className="font-mono-tabular text-[#6B0F24]">{m2} kg</span>
              </div>
              <input
                id="lab-m2"
                type="range"
                min={50}
                max={400}
                step={10}
                value={m2}
                onChange={(e) => setM2(Number(e.target.value))}
                className="w-full accent-[#6B0F24] cursor-pointer"
              />
            </div>

            {mode !== 'compressed-spring' && (
              <>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <label htmlFor="lab-force">
                      {mode === 'trapezoid-push' ? 'Gaya Puncak (F_max)' : 'Gaya Dorong (F)'}
                    </label>
                    <span className="font-mono-tabular text-[#6B0F24]">{force} N</span>
                  </div>
                  <input
                    id="lab-force"
                    type="range"
                    min={20}
                    max={150}
                    step={2}
                    value={force}
                    onChange={(e) => setForce(Number(e.target.value))}
                    className="w-full accent-[#6B0F24] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <label htmlFor="lab-duration">Durasi Dorongan (Δt)</label>
                    <span className="font-mono-tabular text-[#6B0F24]">
                      {duration.toFixed(1).replace('.', ',')} s
                    </span>
                  </div>
                  <input
                    id="lab-duration"
                    type="range"
                    min={0.4}
                    max={2.5}
                    step={0.1}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full accent-[#6B0F24] cursor-pointer"
                  />
                </div>
              </>
            )}

            {mode === 'compressed-spring' && (
              <>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <label htmlFor="lab-k">Konstanta Pegas (k)</label>
                    <span className="font-mono-tabular text-[#6B0F24]">{springK} N/m</span>
                  </div>
                  <input
                    id="lab-k"
                    type="range"
                    min={500}
                    max={3000}
                    step={100}
                    value={springK}
                    onChange={(e) => setSpringK(Number(e.target.value))}
                    className="w-full accent-[#6B0F24] cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <label htmlFor="lab-dx">Kompresi Pegas (Δx)</label>
                    <span className="font-mono-tabular text-[#6B0F24]">
                      {springDx.toFixed(1).replace('.', ',')} m
                    </span>
                  </div>
                  <input
                    id="lab-dx"
                    type="range"
                    min={0.2}
                    max={1.0}
                    step={0.1}
                    value={springDx}
                    onChange={(e) => setSpringDx(Number(e.target.value))}
                    className="w-full accent-[#6B0F24] cursor-pointer"
                  />
                </div>
              </>
            )}

            {mode === 'viscous-drag' && (
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <label htmlFor="lab-b">Koefisien Hambatan (b)</label>
                  <span className="font-mono-tabular text-[#6B0F24]">{dragB} kg/s</span>
                </div>
                <input
                  id="lab-b"
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={dragB}
                  onChange={(e) => setDragB(Number(e.target.value))}
                  className="w-full accent-[#6B0F24] cursor-pointer"
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setM1(130);
              setM2(250);
              setForce(46);
              setDuration(1.2);
              setSpringK(2000);
              setSpringDx(0.6);
              setDragB(25);
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Kembalikan Parameter Asli OSK No. 13
          </button>

          <div className="rounded-xl border border-[#E8DADF] bg-white p-3.5 text-xs leading-relaxed text-slate-700">
            <strong className="text-[#6B0F24] block mb-1">Prinsip yang Terbukti:</strong>
            {mode === 'viscous-drag'
              ? 'Perhatikan meski m₁ ≠ m₂, luas di bawah kurva kecepatan masing-masing menghasilkan jarak henti yang identik (p₀/b)!'
              : 'Ubahlah m₁ dan m₂ sesuka hati: kecepatan keduanya berubah, tetapi besar momentum akhir |p₁| dan |p₂| tetap persis sama!'}
          </div>
        </aside>
      </div>
    </div>
  );
}
