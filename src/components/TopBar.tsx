import React from 'react';
import { LearningMode } from '../types/curriculum';
import { Activity, RotateCcw, ShieldCheck, Terminal, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface TopBarProps {
  currentTab: 'curriculum' | 'sandbox' | 'terminal' | 'tickets' | 'tracker' | 'markdown';
  setCurrentTab: (tab: 'curriculum' | 'sandbox' | 'terminal' | 'tickets' | 'tracker' | 'markdown') => void;
  learningMode: LearningMode;
  setLearningMode: (mode: LearningMode) => void;
  completedDaysCount: number;
  totalDays: number;
  onResetProgress: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  setCurrentTab,
  learningMode,
  setLearningMode,
  completedDaysCount,
  totalDays,
  onResetProgress,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentTab('curriculum')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 transition-colors">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white group-hover:text-sky-300 transition-colors">
              TechNova NetLab
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
          <button
            onClick={() => setCurrentTab('curriculum')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'curriculum'
                ? 'bg-slate-800 text-sky-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum & Days</span>
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('sandbox')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'sandbox'
                ? 'bg-slate-800 text-sky-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Sandbox</span>
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('terminal')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'terminal'
                ? 'bg-slate-800 text-sky-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>Diagnostic CLI</span>
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('tickets')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'tickets'
                ? 'bg-slate-800 text-sky-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Support Desk</span>
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('tracker')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'tracker'
                ? 'bg-slate-800 text-sky-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Progress & Skills</span>
            </span>
          </button>
        </nav>

        {/* Zone 3: Mode & Quick Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Learning Mode Selector */}
          <div className="flex items-center p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setLearningMode('guided')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap font-medium ${
                learningMode === 'guided'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Guided Mode: Detailed step-by-step instructions"
            >
              Guided
            </button>
            <button
              onClick={() => setLearningMode('assisted')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap font-medium ${
                learningMode === 'assisted'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Assisted Mode: Conceptual hints only"
            >
              Assisted
            </button>
            <button
              onClick={() => setLearningMode('realistic')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap font-medium ${
                learningMode === 'realistic'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Realistic Mode: Raw incident tickets, no hints"
            >
              Realistic
            </button>
          </div>

          {/* Quick Counter */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400 font-mono">
            <span className="text-sky-400 font-semibold">{completedDaysCount}</span>
            <span>/</span>
            <span>{totalDays}</span>
            <span className="text-slate-500">Days</span>
          </div>

          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Reset Action */}
          <button
            onClick={onResetProgress}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            title="Reset All Progress"
            aria-label="Reset All Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
