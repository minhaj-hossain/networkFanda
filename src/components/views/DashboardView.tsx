import React from 'react';
import { DayCurriculum } from '../../types/curriculum';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Sparkles, Compass } from 'lucide-react';

interface DashboardViewProps {
  nextDay: DayCurriculum;
  completedDays: number[];
  totalDays: number;
  onStartDayBriefing: (dayId: number) => void;
  onGoToLearningPath: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  nextDay,
  completedDays,
  totalDays,
  onStartDayBriefing,
  onGoToLearningPath,
}) => {
  const percentComplete = Math.round((completedDays.length / totalDays) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Calm Greeting */}
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
          TechNova Ltd. · IT Engineering Trainee
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Where would you like to pick up?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Step by step from physical network cables to simulated IT support troubleshooting.
        </p>
      </div>

      {/* Hero Card: Continue Learning (Primary Action) */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-300">
              Current Mission Focus
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Estimated 30–45 min</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>{nextDay.phaseTitle}</span>
            <span>·</span>
            <span className="text-sky-400">Day {nextDay.id.toString().padStart(2, '0')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            {nextDay.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {nextDay.workplaceScenario}
          </p>
        </div>

        {/* Core Competencies Targeted */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-500 uppercase text-[10px]">Skills:</span>
          {nextDay.concepts.slice(0, 4).map((c, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
              {c}
            </span>
          ))}
        </div>

        {/* Primary Action Button */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => onStartDayBriefing(nextDay.id)}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm transition-colors shadow-lg shadow-sky-500/10 cursor-pointer"
          >
            <span>Continue Mission</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToLearningPath}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            View Career Path Timeline →
          </button>
        </div>
      </div>

      {/* Progress & Quick Stats (Minimal, Quiet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Overall Completion */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">Curriculum Progression</span>
            <span className="font-mono text-sky-400 font-bold">{percentComplete}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/60">
            <div
              className="bg-sky-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            {completedDays.length} of {totalDays} days finished · Phase 01 in progress
          </p>
        </div>

        {/* Recent Activity (Only 2-3 items) */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
          <span className="text-xs font-semibold text-slate-300 block">Recent Activity</span>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Completed Day 02: MAC Addresses & Ethernet</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Completed Day 01: What Happens When You Open a Website</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
