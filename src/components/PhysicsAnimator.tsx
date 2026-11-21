import { Gauge, Pause, Play, RotateCcw, StepForward } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { SimulationConfig, SimulationStateFrame } from '../types/physics';
import { evaluateSimulationAt } from '../utils/physicsEngine';
import { NarratorInlineButton } from './NarratorControls';

interface PhysicsAnimatorProps {
  config: SimulationConfig;
  title: string;
  onNarrate?: (script: string) => void;
}

export function PhysicsAnimator({
  config,
  title,
  onNarrate,
}: PhysicsAnimatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [simTime, setSimTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slowMotion, setSlowMotion] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastFrameMsRef = useRef<number | null>(null);
  const simTimeRef = useRef(0);

  // Reset when problem/config changes
  useEffect(() => {
    setIsPlaying(false);
    simTimeRef.current = 0;
    setSimTime(0);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, [config]);

  const frame: SimulationStateFrame = evaluateSimulationAt(config, simTime);

  // Animation loop using requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      lastFrameMsRef.current = null;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const tick = (nowMs: number) => {
      if (lastFrameMsRef.current === null) {
        lastFrameMsRef.current = nowMs;
      }
      const rawDt = Math.min(0.05, (nowMs - lastFrameMsRef.current) / 1000);
      lastFrameMsRef.current = nowMs;
      const rate = slowMotion ? 0.35 : 1.0;
      const nextT = Math.min(config.totalTime, simTimeRef.current + rawDt * rate);
      simTimeRef.current = nextT;
      setSimTime(nextT);

      if (nextT < config.totalTime) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsPlaying(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, slowMotion, config]);

  // Draw HTML5 Canvas whenever frame or config updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const width = 760;
    const height = 270;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Sky & Water Backdrop
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, 185);
    ctx.fillStyle = '#EFF6FF';
    ctx.fillRect(0, 185, width, 85);

    // Water surface line
    ctx.strokeStyle = '#93C5FD';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 185);
    ctx.lineTo(width, 185);
    ctx.stroke();

    // Scale meters -> pixels: center of viewport moves gently if v0 > 0
    const pxPerMeter = config.mode === 'viscous-drag' ? 42 : config.mode === 'pier-bounce' ? 56 : 54;
    const cameraShiftMeters =
      config.mode === 'moving-initial' ? frame.xCenterOfMass * 0.75 : 0;
    const toPx = (xMeters: number) =>
      width / 2 + (xMeters - cameraShiftMeters) * pxPerMeter;

    // Reference ruler ticks every 1 meter
    ctx.fillStyle = '#64748B';
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    const minM = Math.floor(cameraShiftMeters - 6);
    const maxM = Math.ceil(cameraShiftMeters + 6);
    for (let m = minM; m <= maxM; m++) {
      const px = toPx(m);
      if (px > 24 && px < width - 24) {
        ctx.strokeStyle = m === 0 ? '#6B0F24' : '#CBD5E1';
        ctx.lineWidth = m === 0 ? 1.8 : 1;
        ctx.beginPath();
        ctx.moveTo(px, 218);
        ctx.lineTo(px, 228);
        ctx.stroke();
        ctx.fillText(`${m}m`, px, 242);
      }
    }

    // Pier wall for pier-bounce mode
    if (config.mode === 'pier-bounce') {
      const wallPx = toPx(-1.55) - 42;
      ctx.fillStyle = '#CBD5E1';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.fillRect(wallPx - 18, 95, 18, 120);
      ctx.strokeRect(wallPx - 18, 95, 18, 120);
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Dermaga', wallPx - 9, 86);
    }

    // Center of mass marker
    const cmPx = toPx(frame.xCenterOfMass);
    ctx.strokeStyle = '#C99A3B';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cmPx, 45);
    ctx.lineTo(cmPx, 212);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#92400E';
    ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Pusat Massa', cmPx, 36);

    const drawBoat = (
      xMeters: number,
      label: string,
      mass: number,
      vel: number,
      fill: string,
      stroke: string
    ) => {
      const cx = toPx(xMeters);
      const yTop = 158;
      const w = 86;
      const h = 30;

      // Hull
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - w / 2, yTop);
      ctx.lineTo(cx + w / 2, yTop);
      ctx.lineTo(cx + w / 2 - 12, yTop + h);
      ctx.lineTo(cx - w / 2 + 12, yTop + h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Label inside boat
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${label} (${mass} kg)`, cx, yTop + 19);

      // Velocity arrow above boat
      if (Math.abs(vel) > 0.02) {
        const len = Math.min(85, Math.max(24, Math.abs(vel) * 38)) * Math.sign(vel);
        const startX = cx;
        const endX = cx + len;
        const arrowY = 132;
        ctx.strokeStyle = '#0F172A';
        ctx.fillStyle = '#0F172A';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(startX, arrowY);
        ctx.lineTo(endX, arrowY);
        ctx.stroke();
        const dir = Math.sign(vel);
        ctx.beginPath();
        ctx.moveTo(endX, arrowY);
        ctx.lineTo(endX - dir * 7, arrowY - 4);
        ctx.lineTo(endX - dir * 7, arrowY + 4);
        ctx.closePath();
        ctx.fill();

        const sepPx = Math.abs(toPx(frame.x2) - toPx(frame.x1));
        const labelOffset = sepPx < 170 ? (label === 'P1' ? -24 : label === 'P2' ? 24 : 0) : 0;
        ctx.font = '600 11px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(
          `v = ${vel.toFixed(2).replace('.', ',')} m/s`,
          cx + labelOffset,
          arrowY - 12
        );
      }
    };

    // Draw Spring if compressed-spring mode and still pushing
    if (config.mode === 'compressed-spring' && frame.forceCurrent > 1) {
      const p1x = toPx(frame.x1) + 43;
      const p2x = toPx(frame.x2) - 43;
      ctx.strokeStyle = '#6B0F24';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const coils = 8;
      ctx.moveTo(p1x, 170);
      for (let i = 1; i < coils; i++) {
        const px = p1x + ((p2x - p1x) * i) / coils;
        const py = 170 + (i % 2 === 0 ? -9 : 9);
        ctx.lineTo(px, py);
      }
      ctx.lineTo(p2x, 170);
      ctx.stroke();
    }

    drawBoat(frame.x1, 'P1', config.m1, frame.v1, '#FEF3C7', '#B45309');
    drawBoat(frame.x2, 'P2', config.m2, frame.v2, '#DCFCE7', '#15803D');
    if (config.mode === 'three-boats-inelastic' && frame.x3 !== undefined) {
      drawBoat(
        frame.x3,
        'P3',
        config.m3 ?? 300,
        frame.v3 ?? 0,
        '#E0E7FF',
        '#4338CA'
      );
    }

    // Person jumping for Soal 10
    if (config.mode === 'person-jump' && frame.xPerson !== undefined) {
      const px = toPx(frame.xPerson);
      const isInAir = simTime > 1.8 && simTime < 2.6;
      const py = isInAir ? 118 - Math.sin(((simTime - 1.8) / 0.8) * Math.PI) * 34 : 142;
      ctx.fillStyle = '#6B0F24';
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Anak 50kg', px, py - 11);
    }

    // Active Force Vector badge
    if (frame.forceCurrent > 0.5) {
      const midPx = (toPx(frame.x1) + toPx(frame.x2)) / 2;
      ctx.fillStyle = '#8E1B37';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `Gaya Aksi–Reaksi = ${frame.forceCurrent.toFixed(1).replace('.', ',')} N`,
        midPx,
        74
      );
      // Left & Right push arrows
      ctx.strokeStyle = '#8E1B37';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(midPx - 8, 86);
      ctx.lineTo(midPx - 46, 86);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(midPx + 8, 86);
      ctx.lineTo(midPx + 46, 86);
      ctx.stroke();
    }

    ctx.restore();
  }, [config, frame, simTime]);

  const activeStep =
    [...config.stepDescriptions]
      .reverse()
      .find((s) => simTime >= s.t)?.text ?? config.stepDescriptions[0]?.text ?? '';

  const handlePlayPause = () => {
    if (simTime >= config.totalTime) {
      simTimeRef.current = 0;
      setSimTime(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((p) => !p);
  };

  const handleReplay = () => {
    simTimeRef.current = 0;
    setSimTime(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    simTimeRef.current = 0;
    setSimTime(0);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#8E1B37]">
            Simulasi Pembuktian Fisika · {title}
          </p>
          <p className="text-sm font-bold text-slate-900 mt-0.5">{frame.phaseLabel}</p>
        </div>
        {onNarrate && (
          <NarratorInlineButton
            label="Narasi Animasi"
            onSpeak={() =>
              onNarrate(
                `Pada simulasi ${title}, saat waktu t sama dengan ${simTime
                  .toFixed(1)
                  .replace('.', ',')} detik: ${activeStep}. Momentum perahu satu ${frame.p1
                  .toFixed(1)
                  .replace('.', ',')} Newton sekon, dan momentum perahu dua ${frame.p2
                  .toFixed(1)
                  .replace('.', ',')} Newton sekon.`
              )
            }
          />
        )}
      </div>

      {/* Canvas Stage */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <canvas
          ref={canvasRef}
          data-testid="physics-canvas"
          className="w-full h-auto block"
        />
      </div>

      {/* Scrub Slider + Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label htmlFor="sim-time-scrub" className="text-xs font-semibold text-slate-600 shrink-0">
            Waktu t:
          </label>
          <input
            id="sim-time-scrub"
            type="range"
            min={0}
            max={config.totalTime}
            step={0.02}
            value={simTime}
            onChange={(e) => {
              const v = Number(e.target.value);
              setIsPlaying(false);
              simTimeRef.current = v;
              setSimTime(v);
            }}
            className="w-full accent-[#6B0F24] cursor-pointer"
          />
          <span className="font-mono-tabular text-xs font-bold text-slate-900 w-16 text-right shrink-0">
            {simTime.toFixed(2).replace('.', ',')} s
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handlePlayPause}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#6B0F24] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#5A0B1E] transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <StepForward className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Replay</span>
          </button>

          <button
            type="button"
            onClick={() => setSlowMotion((s) => !s)}
            aria-pressed={slowMotion}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
              slowMotion
                ? 'border-[#6B0F24] bg-[#FDF5F7] text-[#6B0F24]'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Slow Motion ({slowMotion ? 'Aktif 0,35×' : '1×'})</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Live Telemetry Readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-[#F8F8FA] border border-slate-200 p-3 text-xs">
        <div>
          <span className="text-slate-500 block">Momentum p₁</span>
          <span className="font-mono-tabular font-bold text-[#8E1B37] text-sm">
            {frame.p1.toFixed(1).replace('.', ',')} Ns
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Momentum p₂</span>
          <span className="font-mono-tabular font-bold text-emerald-700 text-sm">
            {frame.p2.toFixed(1).replace('.', ',')} Ns
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Kecepatan (v₁ / v₂)</span>
          <span className="font-mono-tabular font-bold text-slate-900 text-sm">
            {frame.v1.toFixed(2).replace('.', ',')} / {frame.v2.toFixed(2).replace('.', ',')} m/s
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Energi Kinetik Total</span>
          <span className="font-mono-tabular font-bold text-slate-900 text-sm">
            {frame.kineticTotal.toFixed(1).replace('.', ',')} J
          </span>
        </div>
      </div>

      {activeStep && (
        <p className="rounded-lg border border-[#E6D5DA] bg-[#FDF9FA] px-3.5 py-2.5 text-xs leading-relaxed text-slate-800">
          <strong className="text-[#6B0F24]">Penjelasan Tahap:</strong> {activeStep}
        </p>
      )}
    </div>
  );
}
