import React from 'react';
import { DayCurriculum } from '../../types/curriculum';
import { ArrowLeft, Play, Clock, Award, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MissionBriefingViewProps {
  day: DayCurriculum;
  isCompleted: boolean;
  onStartMission: () => void;
  onBackToPath: () => void;
}

export const MissionBriefingView: React.FC<MissionBriefingViewProps> = ({
  day,
  isCompleted,
  onStartMission,
  onBackToPath,
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Back button */}
      <button
        onClick={onBackToPath}
        className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Career Path</span>
      </button>

      {/* Main Briefing Card (Clean, Focused, Zero Clutter) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 sm:p-10 space-y-8 shadow-2xl">
        {/* Header Metadata */}
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-sky-400">
              MISSION BRIEFING · DAY {day.id.toString().padStart(2, '0')}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mission Completed</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            {day.title}
          </h1>
          <p className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-slate-500" />
            <span>TechNova Ltd. · Junior IT Support Engineering</span>
          </p>

          {day.id === 1 && (
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Beginner Friendly · Zero prior networking experience required</span>
              </span>
            </div>
          )}

          {day.id === 2 && (
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>The Office Postroom Experience · Visual CAM Learning & Hardware Name-Badges</span>
              </span>
            </div>
          )}
        </div>

        {/* Your Task */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Operational Task
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed font-normal bg-slate-950 p-4 rounded-xl border border-slate-800">
            {day.visualStory}
          </p>
        </div>

        {/* Skills & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Estimated Duration
            </span>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>30–45 minutes</span>
            </div>
            <p className="text-[11px] text-slate-500">Self-paced interactive simulation</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Target Competencies
            </span>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{day.concepts.slice(0, 2).join(' & ')}</span>
            </div>
            <p className="text-[11px] text-slate-500">Verified by guided challenge</p>
          </div>
        </div>

        {/* Core Concepts Involved */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Core Concepts
          </span>
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {day.concepts.map((concept, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* The Single Prominent Primary Action */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onStartMission}
            className="flex items-center gap-2.5 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-sky-500/10 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Mission</span>
          </button>
        </div>
      </div>
    </div>
  );
};
