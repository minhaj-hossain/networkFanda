import React, { useState } from 'react';
import { Copy, Check, BookOpen, Layers, Target, Compass, Sparkles } from 'lucide-react';
import { PHASES_METADATA } from '../data/curriculumData';

export const CurriculumReader: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Read the CURRICULUM.md content or copy summary
    const curriculumText = `# 30-Day Interactive Networking & IT Support Curriculum
From Networking Fundamentals to a Simulated Junior IT Support Job
TechNova Ltd. Learning Platform

Core Philosophy: See → Interact → Predict → Experiment → Break → Troubleshoot → Understand → Apply

Phase 01 — How Networks Actually Work (Days 01-05)
Phase 02 — The Protocols Behind Network Communication (Days 06-10)
Phase 03 — Switching & Layer 2 (Days 11-15)
Phase 04 — Routing & Layer 3 (Days 16-20)
Phase 05 — Real IT Support Skills (Days 21-25)
Phase 06 — Simulated First Job at TechNova (Days 26-30)`;

    navigator.clipboard.writeText(curriculumText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6 text-slate-200">
      {/* Top Banner */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-slate-100">
              30-Day Interactive Networking & IT Support Curriculum
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Saved to <code className="text-sky-300 font-mono">/CURRICULUM.md</code> and <code className="text-sky-300 font-mono">/PROJECT_TRACKER.md</code>
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Curriculum' : 'Copy Curriculum'}</span>
        </button>
      </div>

      {/* 5-Layer Pedagogy Breakdown */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-sm text-slate-100">
            The 5-Layer Learning Architecture
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-sky-400 font-bold block text-[10px] uppercase">
              Layer 1
            </span>
            <p className="font-semibold text-slate-200">Visual Story</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Introduce a realistic workplace scenario at TechNova rather than dry textbook definitions.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-sky-400 font-bold block text-[10px] uppercase">
              Layer 2
            </span>
            <p className="font-semibold text-slate-200">Interactive Simulation</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Temporarily isolate the concept: watch packets physically travel, pause traffic, inspect headers.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-sky-400 font-bold block text-[10px] uppercase">
              Layer 3
            </span>
            <p className="font-semibold text-slate-200">Guided Experiment</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Learner changes values (IP, gateway, DNS), predicts outcome, and experiences consequence directly.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-sky-400 font-bold block text-[10px] uppercase">
              Layer 4
            </span>
            <p className="font-semibold text-slate-200">Workplace Application</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Return to fictional company to configure PCs, switch ports, and VLANs for new departments.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-mono text-sky-400 font-bold block text-[10px] uppercase">
              Layer 5
            </span>
            <p className="font-semibold text-slate-200">Troubleshooting</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Something breaks with zero spoilers. Learner investigates using terminal and packet inspector.
            </p>
          </div>
        </div>
      </div>

      {/* Phase Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PHASES_METADATA.map((phase) => (
          <div
            key={phase.id}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-sky-400">
                {phase.days}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                Phase 0{phase.id}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">{phase.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{phase.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
