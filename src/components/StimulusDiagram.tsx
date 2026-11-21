import type { PhysicsProblem } from '../types/physics';

interface StimulusDiagramProps {
  problem: PhysicsProblem;
}

export function StimulusDiagram({ problem }: StimulusDiagramProps) {
  const { stimulusType, simulation } = problem;
  const { m1, m2, force, duration, v0, friction, springK, springDx, dragB, impulse } =
    simulation;

  // Special plot-based stimuli: trapezoid F(t) and quadratic F(t)
  if (stimulusType === 'force-time-trapezoid') {
    return (
      <svg
        viewBox="0 0 640 250"
        className="w-full h-auto rounded-xl border border-slate-200 bg-white"
        role="img"
        aria-label="Grafik gaya dorong trapesium F terhadap waktu t"
      >
        {/* Grid */}
        <defs>
          <pattern id="trapGrid" width="40" height="30" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#F1F5F9" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="70" y="20" width="520" height="180" fill="url(#trapGrid)" />
        {/* Axes */}
        <line x1="70" y1="200" x2="600" y2="200" stroke="#334155" strokeWidth="2" />
        <line x1="70" y1="200" x2="70" y2="20" stroke="#334155" strokeWidth="2" />
        {/* Shaded Area */}
        <polygon
          points="70,200 190,56 370,56 490,200"
          fill="#6B0F24"
          fillOpacity="0.12"
        />
        {/* Curve */}
        <polyline
          points="70,200 190,56 370,56 490,200"
          fill="none"
          stroke="#6B0F24"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Dashed guides */}
        <line x1="190" y1="56" x2="190" y2="200" stroke="#94A3B8" strokeDasharray="4 4" />
        <line x1="370" y1="56" x2="370" y2="200" stroke="#94A3B8" strokeDasharray="4 4" />
        <line x1="70" y1="56" x2="190" y2="56" stroke="#94A3B8" strokeDasharray="4 4" />
        {/* Labels */}
        <text x="58" y="61" textAnchor="end" className="fill-slate-700 text-xs font-semibold">80</text>
        <text x="58" y="204" textAnchor="end" className="fill-slate-700 text-xs">0</text>
        <text x="190" y="218" textAnchor="middle" className="fill-slate-700 text-xs font-semibold">0,4</text>
        <text x="370" y="218" textAnchor="middle" className="fill-slate-700 text-xs font-semibold">1,0</text>
        <text x="490" y="218" textAnchor="middle" className="fill-slate-700 text-xs font-semibold">1,4</text>
        <text x="595" y="218" textAnchor="end" className="fill-slate-700 text-xs font-bold">t (s)</text>
        <text x="24" y="34" className="fill-slate-700 text-xs font-bold">F (N)</text>
        <text x="280" y="135" textAnchor="middle" className="fill-[#6B0F24] text-xs font-semibold">
          Luas = Impuls I
        </text>
      </svg>
    );
  }

  if (stimulusType === 'quadratic-force') {
    const pts: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * 2.0;
      const f = 150 * t * (2 - t);
      const x = 80 + (t / 2.0) * 440;
      const y = 200 - (f / 150) * 140;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return (
      <svg
        viewBox="0 0 640 250"
        className="w-full h-auto rounded-xl border border-slate-200 bg-white"
        role="img"
        aria-label="Grafik gaya kuadratik F(t) = 150 t(2 - t) terhadap waktu t"
      >
        <line x1="80" y1="200" x2="580" y2="200" stroke="#334155" strokeWidth="2" />
        <line x1="80" y1="200" x2="80" y2="25" stroke="#334155" strokeWidth="2" />
        <polygon
          points={`80,200 ${pts.join(' ')} 520,200`}
          fill="#6B0F24"
          fillOpacity="0.12"
        />
        <polyline
          points={pts.join(' ')}
          fill="none"
          stroke="#6B0F24"
          strokeWidth="3.2"
        />
        <line x1="300" y1="60" x2="300" y2="200" stroke="#94A3B8" strokeDasharray="4 4" />
        <line x1="80" y1="60" x2="300" y2="60" stroke="#94A3B8" strokeDasharray="4 4" />
        <text x="68" y="64" textAnchor="end" className="fill-slate-700 text-xs font-semibold">150</text>
        <text x="68" y="204" textAnchor="end" className="fill-slate-700 text-xs">0</text>
        <text x="300" y="218" textAnchor="middle" className="fill-slate-700 text-xs font-semibold">1,0</text>
        <text x="520" y="218" textAnchor="middle" className="fill-slate-700 text-xs font-semibold">2,0</text>
        <text x="575" y="218" textAnchor="end" className="fill-slate-700 text-xs font-bold">t (s)</text>
        <text x="26" y="36" className="fill-slate-700 text-xs font-bold">F (N)</text>
        <text x="300" y="45" textAnchor="middle" className="fill-[#6B0F24] text-xs font-bold">
          F(t) = 150 t (2 − t) · m₁ = {m1} kg, m₂ = {m2} kg
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 640 250"
      className="w-full h-auto rounded-xl border border-slate-200 bg-white"
      role="img"
      aria-label={problem.stimulusCaption}
    >
      <defs>
        <marker id="arrowMaroon" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#8E1B37" />
        </marker>
        <marker id="arrowEmerald" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#059669" />
        </marker>
        <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#D97706" />
        </marker>
        <marker id="arrowSlate" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#334155" />
        </marker>
      </defs>

      {/* Water surface */}
      <rect x="0" y="168" width="640" height="82" fill="#EFF6FF" />
      <line x1="0" y1="168" x2="640" y2="168" stroke="#93C5FD" strokeWidth="2" />
      {/* x-axis */}
      <line x1="40" y1="215" x2="600" y2="215" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowSlate)" />
      <line x1="320" y1="207" x2="320" y2="223" stroke="#334155" strokeWidth="1.5" />
      <text x="320" y="238" textAnchor="middle" className="fill-slate-700 text-xs font-semibold">0</text>
      <text x="610" y="219" className="fill-slate-700 text-xs font-bold">x</text>

      {/* Pier wall for Soal 12 */}
      {stimulusType === 'pier-elastic-bounce' && (
        <g>
          <rect x="24" y="75" width="32" height="135" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
          <text x="40" y="65" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">
            Dermaga (e=1)
          </text>
        </g>
      )}

      {/* Boat 1 */}
      <g transform={stimulusType === 'three-boats-inelastic' ? 'translate(-65, 0)' : ''}>
        <path
          d="M 135 148 L 285 148 L 270 174 L 150 174 Z"
          fill="#FEF3C7"
          stroke="#B45309"
          strokeWidth="2"
        />
        <text x="210" y="165" textAnchor="middle" className="fill-slate-800 text-xs font-bold">
          Perahu 1 ({m1} kg)
        </text>
        {/* Person on Boat 1 */}
        <circle cx="255" cy="112" r="8" fill="none" stroke="#334155" strokeWidth="2" />
        <line x1="255" y1="120" x2="255" y2="148" stroke="#334155" strokeWidth="2" />
        <line x1="255" y1="128" x2="278" y2="128" stroke="#334155" strokeWidth="2" />
        <line x1="255" y1="148" x2="248" y2="148" stroke="#334155" strokeWidth="2" />
      </g>

      {/* Boat 2 */}
      <g transform={stimulusType === 'three-boats-inelastic' ? 'translate(-45, 0)' : ''}>
        <path
          d="M 355 148 L 505 148 L 490 174 L 370 174 Z"
          fill="#DCFCE7"
          stroke="#15803D"
          strokeWidth="2"
        />
        <text x="430" y="165" textAnchor="middle" className="fill-slate-800 text-xs font-bold">
          Perahu 2 ({m2} kg)
        </text>
        {/* Person on Boat 2 */}
        <circle cx="385" cy="112" r="8" fill="none" stroke="#334155" strokeWidth="2" />
        <line x1="385" y1="120" x2="385" y2="148" stroke="#334155" strokeWidth="2" />
        <line x1="385" y1="128" x2="362" y2="128" stroke="#334155" strokeWidth="2" />
      </g>

      {/* Boat 3 for Soal 14 */}
      {stimulusType === 'three-boats-inelastic' && (
        <g>
          <path
            d="M 490 148 L 615 148 L 602 174 L 503 174 Z"
            fill="#E0E7FF"
            stroke="#4338CA"
            strokeWidth="2"
          />
          <text x="552" y="165" textAnchor="middle" className="fill-slate-800 text-xs font-bold">
            Perahu 3 ({simulation.m3 ?? 300} kg)
          </text>
          <text x="552" y="135" textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold">
            diam (v₃ = 0)
          </text>
        </g>
      )}

      {/* Spring for Soal 11 */}
      {stimulusType === 'compressed-spring' && (
        <g>
          <polyline
            points="285,158 295,148 305,168 315,148 325,168 335,148 345,168 355,158"
            fill="none"
            stroke="#6B0F24"
            strokeWidth="2.5"
          />
          <text x="320" y="135" textAnchor="middle" className="fill-[#6B0F24] text-xs font-bold">
            k = {springK} N/m · Δx = {springDx?.toString().replace('.', ',')} m
          </text>
        </g>
      )}

      {/* Force / Velocity Annotations */}
      {stimulusType === 'angled-push' ? (
        <g>
          <line x1="330" y1="88" x2="410" y2="136" stroke="#059669" strokeWidth="2.8" markerEnd="url(#arrowEmerald)" />
          <line x1="330" y1="88" x2="415" y2="88" stroke="#94A3B8" strokeDasharray="4 3" />
          <text x="380" y="102" className="fill-emerald-700 text-xs font-bold">37°</text>
          <text x="415" y="128" className="fill-emerald-700 text-xs font-bold">F = {force} N</text>
          <line x1="305" y1="128" x2="225" y2="80" stroke="#8E1B37" strokeWidth="2.8" markerEnd="url(#arrowMaroon)" />
          <text x="215" y="72" className="fill-[#8E1B37] text-xs font-bold">F = {force} N (reaksi)</text>
        </g>
      ) : stimulusType === 'compressed-spring' ? null : stimulusType === 'viscous-linear-drag' ? (
        <g>
          <line x1="250" y1="82" x2="170" y2="82" stroke="#8E1B37" strokeWidth="2.8" markerEnd="url(#arrowMaroon)" />
          <text x="210" y="72" textAnchor="middle" className="fill-[#8E1B37] text-xs font-bold">
            p₀ = {impulse} Ns
          </text>
          <line x1="390" y1="82" x2="470" y2="82" stroke="#059669" strokeWidth="2.8" markerEnd="url(#arrowEmerald)" />
          <text x="430" y="72" textAnchor="middle" className="fill-emerald-700 text-xs font-bold">
            p₀ = {impulse} Ns
          </text>
          <line x1="160" y1="184" x2="215" y2="184" stroke="#D97706" strokeWidth="2.2" markerEnd="url(#arrowAmber)" />
          <text x="188" y="198" textAnchor="middle" className="fill-amber-700 text-[11px] font-semibold">
            f = −bv (b={dragB} kg/s)
          </text>
        </g>
      ) : (
        <g>
          <line
            x1={stimulusType === 'three-boats-inelastic' ? 195 : 250}
            y1="82"
            x2={stimulusType === 'three-boats-inelastic' ? 120 : 175}
            y2="82"
            stroke="#8E1B37"
            strokeWidth="2.8"
            markerEnd="url(#arrowMaroon)"
          />
          <text
            x={stimulusType === 'three-boats-inelastic' ? 158 : 212}
            y="72"
            textAnchor="middle"
            className="fill-[#8E1B37] text-xs font-bold"
          >
            {stimulusType === 'two-boats-unknown-force' ? 'F = ?' : `F = ${force} N`}
          </text>

          <line
            x1={stimulusType === 'three-boats-inelastic' ? 345 : 390}
            y1="82"
            x2={stimulusType === 'three-boats-inelastic' ? 420 : 465}
            y2="82"
            stroke="#059669"
            strokeWidth="2.8"
            markerEnd="url(#arrowEmerald)"
          />
          <text
            x={stimulusType === 'three-boats-inelastic' ? 382 : 428}
            y="72"
            textAnchor="middle"
            className="fill-emerald-700 text-xs font-bold"
          >
            {stimulusType === 'two-boats-unknown-force' ? 'v₂ = 0,4 m/s' : `F = ${force} N`}
          </text>

          {v0 && (
            <g>
              <line x1="280" y1="45" x2="360" y2="45" stroke="#334155" strokeWidth="2.2" markerEnd="url(#arrowSlate)" />
              <text x="320" y="36" textAnchor="middle" className="fill-slate-800 text-xs font-bold">
                Kecepatan awal bersama v₀ = +{v0.toString().replace('.', ',')} m/s
              </text>
            </g>
          )}

          {friction && (
            <g>
              <line x1="150" y1="186" x2="210" y2="186" stroke="#D97706" strokeWidth="2.2" markerEnd="url(#arrowAmber)" />
              <text x="180" y="200" textAnchor="middle" className="fill-amber-700 text-[11px] font-bold">
                gesekan f = {friction} N
              </text>
              <line x1="490" y1="186" x2="430" y2="186" stroke="#D97706" strokeWidth="2.2" markerEnd="url(#arrowAmber)" />
              <text x="460" y="200" textAnchor="middle" className="fill-amber-700 text-[11px] font-bold">
                gesekan f = {friction} N
              </text>
            </g>
          )}

          {stimulusType === 'person-jump' && (
            <g>
              <path
                d="M 380 105 Q 320 55 260 102"
                fill="none"
                stroke="#6B0F24"
                strokeWidth="2"
                strokeDasharray="5 4"
                markerEnd="url(#arrowMaroon)"
              />
              <text x="320" y="54" textAnchor="middle" className="fill-[#6B0F24] text-[11px] font-bold">
                Anak 50 kg melompat ke Perahu 1
              </text>
            </g>
          )}
        </g>
      )}

      {/* Duration pill-free metadata label */}
      <text x="320" y="22" textAnchor="middle" className="fill-slate-600 text-xs font-medium">
        {stimulusType === 'compressed-spring'
          ? 'Tali diputus pada t = 0 s hingga pegas kembali ke panjang alami'
          : stimulusType === 'viscous-linear-drag'
            ? 'Dorongan impulsif pada t = 0 s; berhenti akibat hambatan air f = −bv'
            : `Durasi dorongan: Δt = ${duration.toString().replace('.', ',')} s`}
      </text>
    </svg>
  );
}
