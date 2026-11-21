import { useEffect, useState } from 'react';
import { AnalysisView } from './components/AnalysisView';
import { FormulaSummaryView } from './components/FormulaSummaryView';
import { HomeView } from './components/HomeView';
import { KnowledgeCenterView } from './components/KnowledgeCenterView';
import { LabView } from './components/LabView';
import { NarratorDock } from './components/NarratorControls';
import { Navbar } from './components/Navbar';
import { ProblemBankView } from './components/ProblemBankView';
import { ProgressView } from './components/ProgressView';
import type { MenuId, NarrationSpeed, ProblemAttempt } from './types/physics';
import { latexToIndonesianSpeech, misterJoNarrator } from './utils/narrator';

const STORAGE_KEY = 'osk_fisika_2026_no13_progress_v1';

export default function App() {
  const [activeMenu, setActiveMenu] = useState<MenuId>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return 'soal';
    }
    return 'beranda';
  });

  const [selectedProblemId, setSelectedProblemId] = useState<number>(1);
  const [attempts, setAttempts] = useState<Record<number, ProblemAttempt>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<number, ProblemAttempt>) : {};
    } catch {
      return {};
    }
  });

  // Mister Jo Narrator state
  const [narratorOpen, setNarratorOpen] = useState(false);
  const [narratorTitle, setNarratorTitle] = useState('Mister Jo — Guru Pembimbing');
  const [narratorRawText, setNarratorRawText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<NarrationSpeed>(1);
  const [ttsStatus, setTtsStatus] = useState('');
  const [progressRatio, setProgressRatio] = useState(0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
    } catch {
      // Ignore storage quota errors
    }
  }, [attempts]);

  useEffect(() => {
    misterJoNarrator.setCallbacks({
      onStart: () => {
        setIsSpeaking(true);
        setIsPaused(false);
      },
      onPause: () => {
        setIsPaused(true);
      },
      onResume: () => {
        setIsPaused(false);
      },
      onEnd: () => {
        setIsSpeaking(false);
        setIsPaused(false);
      },
      onStatus: (_mode, msg) => {
        setTtsStatus(msg);
      },
      onProgressWord: (ratio) => {
        setProgressRatio(ratio);
      },
    });
    return () => {
      misterJoNarrator.stop(false);
    };
  }, []);

  const handleNarrate = (title: string, script: string) => {
    setNarratorTitle(title);
    setNarratorRawText(script);
    setNarratorOpen(true);
    setProgressRatio(0);
    misterJoNarrator.speak(script);
  };

  const handleRecordAttempt = (
    problemId: number,
    input: string,
    isCorrect: boolean,
    hintUsed = false,
    solutionOpened = false
  ) => {
    setAttempts((prev) => {
      const existing = prev[problemId];
      return {
        ...prev,
        [problemId]: {
          problemId,
          lastInput: input,
          isCorrect: isCorrect || (existing?.isCorrect ?? false),
          attempts: (existing?.attempts ?? 0) + 1,
          hintUsed: hintUsed || (existing?.hintUsed ?? false),
          solutionOpened: solutionOpened || (existing?.solutionOpened ?? false),
          updatedAt: Date.now(),
        },
      };
    });
  };

  const handleResetProgress = () => {
    setAttempts({});
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleOpenProblem = (id: number) => {
    setSelectedProblemId(id);
    setActiveMenu('soal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (menu: MenuId) => {
    setActiveMenu(menu);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const solvedCount = Object.values(attempts).filter((a) => a.isCorrect).length;
  const attemptedCount = Object.keys(attempts).length;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar
        activeMenu={activeMenu}
        onSelectMenu={handleNavigate}
        solvedCount={solvedCount}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-6 sm:px-6 lg:px-8">
        {activeMenu === 'beranda' && (
          <HomeView
            solvedCount={solvedCount}
            attemptedCount={attemptedCount}
            onNavigate={handleNavigate}
            onNarrate={handleNarrate}
          />
        )}
        {activeMenu === 'analisis' && (
          <AnalysisView onNavigate={handleNavigate} onNarrate={handleNarrate} />
        )}
        {activeMenu === 'pengetahuan' && (
          <KnowledgeCenterView
            onNavigate={handleNavigate}
            onNarrate={handleNarrate}
          />
        )}
        {activeMenu === 'soal' && (
          <ProblemBankView
            attempts={attempts}
            selectedProblemId={selectedProblemId}
            onSelectProblem={setSelectedProblemId}
            onRecordAttempt={handleRecordAttempt}
            onNarrate={handleNarrate}
          />
        )}
        {activeMenu === 'laboratorium' && (
          <LabView onNarrate={handleNarrate} />
        )}
        {activeMenu === 'rumus' && (
          <FormulaSummaryView onNarrate={handleNarrate} />
        )}
        {activeMenu === 'progres' && (
          <ProgressView
            attempts={attempts}
            onOpenProblem={handleOpenProblem}
            onNavigate={handleNavigate}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-[#F8F8FA] py-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 px-4 text-xs text-slate-600 sm:px-6 lg:px-8">
          <p>
            <strong className="text-[#5A0B1E]">OSK Fisika SMA 2026</strong> · Pengembangan Khusus Soal Nomor 13 (Momentum Linear) · Guru Pembimbing: <strong className="text-[#6B0F24]">MISTER JO</strong>
          </p>
          <p>Semua perhitungan dan simulasi diverifikasi secara ilmiah dalam satuan SI.</p>
        </div>
      </footer>

      <NarratorDock
        isOpen={narratorOpen}
        isPlaying={isSpeaking}
        isPaused={isPaused}
        speed={speed}
        title={narratorTitle}
        spokenText={latexToIndonesianSpeech(narratorRawText)}
        statusMessage={ttsStatus}
        progressRatio={progressRatio}
        onPlay={() => {
          if (narratorRawText) misterJoNarrator.speak(narratorRawText);
        }}
        onPause={() => misterJoNarrator.pause()}
        onResume={() => misterJoNarrator.resume()}
        onReplay={() => misterJoNarrator.replay()}
        onStop={() => misterJoNarrator.stop(true)}
        onClose={() => {
          misterJoNarrator.stop(true);
          setNarratorOpen(false);
        }}
        onSpeedChange={(s) => {
          setSpeed(s);
          misterJoNarrator.setSpeed(s);
        }}
      />
    </div>
  );
}
