import React, { useState } from 'react';
import { DayCurriculum, PhaseId } from '../../types/curriculum';
import { PHASES_METADATA } from '../../data/curriculumData';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';

interface CareerPathViewProps {
  days: DayCurriculum[];
  completedDays: number[];
  inProgressDays: number[];
  onSelectDay: (dayId: number) => void;
}

export const CareerPathView: React.FC<CareerPathViewProps> = ({
  days,
  completedDays,
  inProgressDays,
  onSelectDay,
}) => {
  // Collapsible phases (default Phase 1 & 2 open)
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const togglePhase = (phaseId: number) => {
    setOpenPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
          30-Day Engineering Journey
        </p>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
          Networking & IT Support Career Path
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Select any day to review its mission briefing and launch the learning environment.
        </p>
      </div>

      {/* Phases Timeline */}
      <div className="space-y-4">
        {PHASES_METADATA.map((phase) => {
          const phaseDays = days.filter((d) => d.phase === phase.id);
          const phaseCompleted = phaseDays.filter((d) => completedDays.includes(d.id)).length;
          const isOpen = !!openPhases[phase.id];

          return (
            <div
              key={phase.id}
              className="rounded-xl bg-slate-900 border border-slate-800/80 overflow-hidden transition-colors"
            >
              {/* Collapsible Phase Header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-800/40 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className="text-slate-400">
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-sky-400">
                        {phase.days}
                      </span>
                      <span className="text-slate-600">·</span>
                      <h3 className="text-sm font-bold text-slate-100">{phase.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{phase.subtitle}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-slate-400">
                    {phaseCompleted} / {phaseDays.length} Done
                  </span>
                </div>
              </button>

              {/* Day List in Phase */}
              {isOpen && (
                <div className="px-5 pb-4 pt-1 space-y-1.5 border-t border-slate-800/60">
                  {phaseDays.map((day) => {
                    const isCompleted = completedDays.includes(day.id);
                    const isInProgress = inProgressDays.includes(day.id) && !isCompleted;

                    return (
                      <div
                        key={day.id}
                        onClick={() => onSelectDay(day.id)}
                        className="p-3 rounded-lg bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/60 cursor-pointer flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : isInProgress ? (
                              <Clock className="w-4 h-4 text-amber-400" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-semibold text-slate-400">
                                Day {day.id.toString().padStart(2, '0')}
                              </span>
                              <span className="text-xs font-medium text-slate-200 group-hover:text-sky-300 transition-colors">
                                {day.title}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                            {day.concepts.length} Concepts
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
