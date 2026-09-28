import React, { useState } from 'react';
import { DayCurriculum } from '../../types/curriculum';
import { PHASES_METADATA } from '../../data/curriculumData';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Play,
  Terminal,
  Shield,
  Layers,
  Sparkles,
  ChevronRight,
  Lock,
  Compass,
  FileText,
  Activity,
  Award,
  BarChart3,
  TrendingUp,
  LayoutGrid,
  GitCommit,
  ChevronDown,
  ChevronUp,
  Sliders,
  Zap,
  Check,
  CircleDot,
  Radio,
  List,
  Target,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface HomeLearningJourneyProps {
  days: DayCurriculum[];
  completedDays: number[];
  inProgressDays: number[];
  onSelectDay: (dayId: number) => void;
  onLaunchMission: (dayId: number) => void;
  onGoToSimulations: () => void;
  onGoToPractice: () => void;
  onGoToProgress: () => void;
}

export type RoadmapLayoutMode = 'balanced' | 'pathway' | 'compact';

export const HomeLearningJourney: React.FC<HomeLearningJourneyProps> = ({
  days,
  completedDays,
  inProgressDays,
  onSelectDay,
  onLaunchMission,
  onGoToSimulations,
  onGoToPractice,
  onGoToProgress,
}) => {
  // Current active day (first uncompleted day, or day 1)
  const currentDayId = days.find((d) => !completedDays.includes(d.id))?.id || 1;
  const currentDay = days.find((d) => d.id === currentDayId) || days[0];

  // Active filter for levels
  const [selectedLevelId, setSelectedLevelId] = useState<number | 'all'>('all');

  // Presentation Layout Mode: 'balanced' (Option 1 + Option 3 Hybrid), 'pathway' (All open), 'compact' (List view)
  const [layoutMode, setLayoutMode] = useState<RoadmapLayoutMode>('balanced');

  // Accordion expanded level IDs (defaults to active level)
  const [expandedLevels, setExpandedLevels] = useState<number[]>([currentDay.phase]);

  const toggleLevelExpansion = (levelId: number) => {
    if (expandedLevels.includes(levelId)) {
      setExpandedLevels(expandedLevels.filter((id) => id !== levelId));
    } else {
      setExpandedLevels([...expandedLevels, levelId]);
    }
  };

  const expandAllLevels = () => {
    setExpandedLevels(PHASES_METADATA.map((p) => p.id));
  };

  const collapseAllLevels = () => {
    setExpandedLevels([]);
  };

  const focusActiveLevel = () => {
    setExpandedLevels([currentDay.phase]);
  };

  const totalCompleted = completedDays.length;
  const totalDays = days.length;
  const percentComplete = Math.round((totalCompleted / totalDays) * 100);

  // Group days by phase/level
  const levels = PHASES_METADATA.map((phase) => {
    const levelDays = days.filter((d) => d.phase === phase.id);
    const completedCount = levelDays.filter((d) => completedDays.includes(d.id)).length;
    const isLevelActive = levelDays.some((d) => d.id === currentDayId);
    const isLevelCompleted = completedCount === levelDays.length;
    const levelPercent = Math.round((completedCount / levelDays.length) * 100);
    return {
      ...phase,
      daysList: levelDays,
      completedCount,
      totalCount: levelDays.length,
      levelPercent,
      isLevelActive,
      isLevelCompleted,
    };
  });

  const displayedLevels =
    selectedLevelId === 'all'
      ? levels
      : levels.filter((l) => l.id === selectedLevelId);

  // SVG Circular Gauge parameters
  const ringRadius = 50;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference - (ringCircumference * percentComplete) / 100;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Clean Intro + Graphical Completion Report                */}
      {/* ========================================================================= */}
      <section className="relative border-b border-slate-800/80 overflow-hidden bg-slate-950">
        {/* Subtle background ambient mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
          <img
            src="/src/assets/images/hero_enterprise_network_1790590620805.jpg"
            alt="Enterprise Network Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter blur-[1px] brightness-75 scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/70" />
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Clean, uncluttered, focused intro (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet kicker */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-sky-400 font-semibold uppercase tracking-wider">
                  TechNova Systems Academy
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>30-Day Network Engineer Track</span>
              </div>

              {/* Bold, punchy headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Master Enterprise Networking & IT Infrastructure
              </h1>

              {/* Single concise description sentence */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                Hands-on packet simulations, network topology labs, and real workplace troubleshooting incidents designed to build job-ready systems engineering skills.
              </p>

              {/* Focused Current Mission Action Bar */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">
                      Up Next: Level 0{currentDay.phase} · Day {currentDay.id.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="font-mono text-slate-500 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    ~35 min
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                      {currentDay.title}
                    </h2>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {currentDay.workplaceScenario}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onLaunchMission(currentDay.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-sky-500/15"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Resume Day {currentDay.id.toString().padStart(2, '0')}</span>
                    </button>
                    <button
                      onClick={() => onSelectDay(currentDay.id)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    >
                      Briefing
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Graphical Completion Report (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
                {/* Header of Report */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                      Learner Progress Report
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
                    Level 0{currentDay.phase} Active
                  </span>
                </div>

                {/* Main Visual: SVG Circular Gauge + Overall Stats */}
                <div className="flex items-center justify-between gap-6">
                  {/* SVG Radial Meter */}
                  <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                      {/* Background Ring Track */}
                      <circle
                        cx="60"
                        cy="60"
                        r={ringRadius}
                        className="text-slate-800"
                        strokeWidth="9"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      {/* Active Progress Gradient Ring */}
                      <circle
                        cx="60"
                        cy="60"
                        r={ringRadius}
                        stroke="url(#progressGradient)"
                        strokeWidth="9"
                        strokeDasharray={ringCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                      />
                      {/* Gradient Definition */}
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Gauge Center Display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-white font-mono tracking-tight">
                        {percentComplete}%
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Complete
                      </span>
                    </div>
                  </div>

                  {/* Quick Telemetry Details */}
                  <div className="space-y-3 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Days Mastered</span>
                      <span className="font-mono font-semibold text-white">
                        {totalCompleted} <span className="text-slate-500">/ {totalDays}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Current Phase</span>
                      <span className="font-mono font-semibold text-sky-400">
                        Level 0{currentDay.phase} of 06
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Active Concept</span>
                      <span className="font-mono font-semibold text-emerald-400 truncate max-w-[120px] text-right">
                        {currentDay.concepts[0] || 'Physical'}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentComplete}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Level-by-Level Visual Progress Breakdown */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                    Curriculum Level Progression
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {levels.map((lvl) => (
                      <div
                        key={lvl.id}
                        className={`p-2 rounded-lg border flex flex-col gap-1 transition-colors ${
                          lvl.isLevelCompleted
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                            : lvl.isLevelActive
                            ? 'bg-sky-950/20 border-sky-500/30 text-sky-300'
                            : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold">L0{lvl.id}</span>
                          <span>
                            {lvl.completedCount}/{lvl.totalCount}
                          </span>
                        </div>
                        <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              lvl.isLevelCompleted
                                ? 'bg-emerald-400'
                                : lvl.isLevelActive
                                ? 'bg-sky-400'
                                : 'bg-slate-700'
                            }`}
                            style={{ width: `${lvl.levelPercent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer link to full competency matrix */}
                <button
                  onClick={onGoToProgress}
                  className="w-full pt-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer group"
                >
                  <span>View Verified Competency Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LEARNING JOURNEY / ROADMAP                                             */}
      {/* ========================================================================= */}
      <section className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-8">
        {/* Header with Title + Presentation Mode Selector + Level Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Career Roadmap & Lab Missions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              30-Day Network Engineering Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Progress through 6 structured tiers from physical Ethernet cabling to enterprise incident response.
            </p>
          </div>

          {/* Interactive Layout Mode & Utilities Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Selector: Balanced (Option 1 + 3) | Full Trail | Compact */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setLayoutMode('balanced')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  layoutMode === 'balanced'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title="Balanced: Collapsible Phase Focus with Connected Node Highway"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Balanced Journey</span>
              </button>

              <button
                onClick={() => setLayoutMode('pathway')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  layoutMode === 'pathway'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title="Full Trail: All Levels Expanded Simultaneously"
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>Full Trail</span>
              </button>

              <button
                onClick={() => setLayoutMode('compact')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  layoutMode === 'compact'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title="Compact List: High-Density Table View"
              >
                <List className="w-3.5 h-3.5" />
                <span>Compact List</span>
              </button>
            </div>

            {/* Quick Utility: Focus Active & Expand/Collapse */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={focusActiveLevel}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="Collapse other levels and focus only on the active learning level"
              >
                <Target className="w-3 h-3 text-sky-400" />
                <span>Focus Active</span>
              </button>
              <button
                onClick={() => {
                  if (expandedLevels.length === levels.length) {
                    collapseAllLevels();
                  } else {
                    expandAllLevels();
                  }
                }}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Toggle expand/collapse on all levels"
              >
                {expandedLevels.length === levels.length ? 'Collapse All' : 'Expand All'}
              </button>
            </div>

            {/* Level Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
              <button
                onClick={() => setSelectedLevelId('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedLevelId === 'all'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All (30)
              </button>
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevelId(lvl.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedLevelId === lvl.id
                      ? 'bg-slate-800 text-sky-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  L0{lvl.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BALANCED HYBRID (Option 1 + Option 3): Focused Accordion with Connected Node Highway */}
        {/* ========================================================================= */}
        {layoutMode === 'balanced' && (
          <div className="space-y-6">
            {displayedLevels.map((level) => {
              const isExpanded = expandedLevels.includes(level.id);

              return (
                <div
                  key={level.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    level.isLevelActive
                      ? 'border-sky-500/50 bg-slate-900/80 shadow-lg shadow-sky-500/10'
                      : level.isLevelCompleted
                      ? 'border-emerald-500/30 bg-slate-900/50'
                      : 'border-slate-800/80 bg-slate-900/30'
                  }`}
                >
                  {/* Collapsible Phase Header Bar */}
                  <div
                    onClick={() => toggleLevelExpansion(level.id)}
                    className="w-full p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left hover:bg-slate-800/30 transition-colors cursor-pointer select-none"
                  >
                    {/* Left: Phase Badge & Title */}
                    <div className="flex items-start sm:items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border transition-all ${
                          level.isLevelCompleted
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-sm'
                            : level.isLevelActive
                            ? 'bg-sky-500/20 text-sky-300 border-sky-400/50 ring-2 ring-sky-400/20 shadow-md shadow-sky-500/20'
                            : 'bg-slate-800/70 text-slate-400 border-slate-700/60'
                        }`}
                      >
                        {level.isLevelCompleted ? (
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        ) : level.isLevelActive ? (
                          <Radio className="w-5 h-5 text-sky-400 animate-pulse" />
                        ) : (
                          `0${level.id}`
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider">
                            Level 0{level.id}
                          </span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            {level.title}
                          </h3>

                          {/* Phase Status Badge */}
                          {level.isLevelCompleted ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <Check className="w-3 h-3" />
                              Certified Tier
                            </span>
                          ) : level.isLevelActive ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded border border-sky-400/40 animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                              Active Tier
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                              <Lock className="w-3 h-3 text-slate-500" />
                              Locked
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                          {level.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right: Progress Meter + Quick Action + Expand Toggle */}
                    <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                      {/* Telemetry Progress Fraction */}
                      <div className="flex items-center gap-3 text-right">
                        <div>
                          <div className="text-xs font-mono font-semibold text-slate-300">
                            {level.completedCount} / {level.totalCount} Mastered
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">
                            {level.levelPercent}% Completed
                          </div>
                        </div>

                        <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/50">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              level.isLevelCompleted
                                ? 'bg-emerald-400'
                                : level.isLevelActive
                                ? 'bg-sky-400'
                                : 'bg-slate-600'
                            }`}
                            style={{ width: `${level.levelPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Quick Resume Button (if active) */}
                      {level.isLevelActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onLaunchMission(currentDayId);
                          }}
                          className="hidden lg:flex items-center gap-1.5 py-1.5 px-3 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Resume Day 0{currentDayId}</span>
                        </button>
                      )}

                      {/* Expand / Collapse Chevron */}
                      <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Body: Connected Node Highway (Option 1 Experience) */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/70 space-y-6">
                      {/* Visual Highway Track Bar */}
                      <div className="pt-4 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/60 pb-3">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-3.5 h-3.5 text-sky-400" />
                          <span className="font-semibold text-slate-300">
                            Level 0{level.id} Sequential Milestone Conduits
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 hidden sm:inline">
                          Select any day to inspect briefings or launch simulation
                        </span>
                      </div>

                      {/* 5-Column Connected Cards Grid */}
                      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {level.daysList.map((day, idx) => {
                          const isDayDone = completedDays.includes(day.id);
                          const isCurrent = day.id === currentDayId;
                          const isUpcoming = !isDayDone && day.id > currentDayId;

                          return (
                            <div
                              key={day.id}
                              className={`relative rounded-xl p-4 flex flex-col justify-between transition-all duration-200 border group ${
                                isCurrent
                                  ? 'bg-slate-900 border-sky-400 shadow-xl shadow-sky-500/20 ring-2 ring-sky-400/40'
                                  : isDayDone
                                  ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900'
                                  : 'bg-slate-950/70 border-slate-800/60 hover:border-slate-700 hover:bg-slate-900/40'
                              }`}
                            >
                              {/* Top Bar: Day ID + Status Indicator */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-white">
                                  Day {day.id.toString().padStart(2, '0')}
                                </span>

                                {isDayDone ? (
                                  <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                    <Check className="w-3 h-3 stroke-[2.5]" />
                                    Mastered
                                  </span>
                                ) : isCurrent ? (
                                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded border border-sky-400/40 animate-pulse">
                                    <Radio className="w-3 h-3 text-sky-400" />
                                    Active Lab
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                                    <Lock className="w-3 h-3" />
                                    ~35m
                                  </span>
                                )}
                              </div>

                              {/* Lab Tech Category Pill */}
                              <div className="mb-2">
                                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                                  {day.simulationType.replace('_', ' ')}
                                </span>
                              </div>

                              {/* Day Title and Real-World Scenario Hook */}
                              <div className="space-y-2 mb-4 flex-1">
                                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2">
                                  {day.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                  {day.workplaceScenario}
                                </p>

                                {/* Concept Chips */}
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {day.concepts.slice(0, 2).map((c, i) => (
                                    <span
                                      key={i}
                                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                                    >
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Action Row */}
                              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                                <button
                                  onClick={() => onLaunchMission(day.id)}
                                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                                    isCurrent
                                      ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                                      : isDayDone
                                      ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                                  }`}
                                >
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>{isCurrent ? 'Start Lab' : isDayDone ? 'Review' : 'Launch'}</span>
                                </button>
                                <button
                                  onClick={() => onSelectDay(day.id)}
                                  className="py-1.5 px-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                                  title="View Mission Briefing & Topology Preview"
                                >
                                  Briefing
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Tier Capstone Verification Banner */}
                      <div className="pt-2">
                        <div
                          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            level.isLevelCompleted
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : level.isLevelActive
                              ? 'bg-sky-500/10 border-sky-500/25'
                              : 'bg-slate-950 border-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-sm shrink-0 ${
                                level.isLevelCompleted
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : level.isLevelActive
                                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                                  : 'bg-slate-800 text-slate-500'
                              }`}
                            >
                              <Award className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                                <span>Tier 0{level.id} Mastery Checkpoint</span>
                                {level.isLevelCompleted && (
                                  <span className="text-[10px] text-emerald-400 font-normal">
                                    · Competency Verified
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400">
                                {level.isLevelCompleted
                                  ? `All 5 hands-on missions completed. Level 0${level.id} credential recorded to your competency telemetry matrix.`
                                  : `${level.completedCount} of 5 missions completed. Master all 5 days in this tier to unlock your Level 0${level.id} certified endorsement.`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={onGoToProgress}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
                              <span>View Tier Matrix</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* OPTION 1: THE FULL CONNECTED PATHWAY (All Levels Expanded at Once)        */}
        {/* ========================================================================= */}
        {layoutMode === 'pathway' && (
          <div className="space-y-12">
            {displayedLevels.map((level) => {
              return (
                <div
                  key={level.id}
                  className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-6"
                >
                  {/* Level Header Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/70">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-mono text-xs font-bold text-sky-400">
                        0{level.id}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {level.title}
                        </h3>
                        <p className="text-xs text-slate-400">{level.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-slate-400">
                        {level.completedCount} / {level.totalCount} Mastered
                      </span>
                      <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-sky-400 h-full rounded-full transition-all"
                          style={{ width: `${level.levelPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Connected Pathway Grid */}
                  <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {level.daysList.map((day) => {
                      const isDayDone = completedDays.includes(day.id);
                      const isCurrent = day.id === currentDayId;

                      return (
                        <div
                          key={day.id}
                          className={`relative rounded-xl p-4 flex flex-col justify-between transition-all duration-200 border group ${
                            isCurrent
                              ? 'bg-slate-900 border-sky-400/80 shadow-xl shadow-sky-500/15 ring-2 ring-sky-400/40'
                              : isDayDone
                              ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900'
                              : 'bg-slate-950/70 border-slate-800/60 hover:border-slate-700 hover:bg-slate-900/40'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-slate-200">
                              Day {day.id.toString().padStart(2, '0')}
                            </span>

                            {isDayDone ? (
                              <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                <Check className="w-3 h-3" />
                                Mastered
                              </span>
                            ) : isCurrent ? (
                              <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded border border-sky-400/30 animate-pulse">
                                <Radio className="w-3 h-3 text-sky-400" />
                                Active
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                                <Lock className="w-3 h-3" />
                                ~35m
                              </span>
                            )}
                          </div>

                          <div className="space-y-2 mb-4">
                            <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">
                              {day.title}
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {day.concepts.slice(0, 2).map((c, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                            <span
                              className={`font-semibold ${
                                isCurrent
                                  ? 'text-sky-400'
                                  : isDayDone
                                  ? 'text-emerald-400'
                                  : 'text-slate-400'
                              }`}
                            >
                              {isCurrent ? 'Start Lab' : isDayDone ? 'Review Lab' : 'Briefing'}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => onLaunchMission(day.id)}
                                className="p-1 hover:text-sky-400 transition-colors cursor-pointer"
                                title="Launch Mission"
                              >
                                <Play className="w-3.5 h-3.5 fill-current" />
                              </button>
                              <button
                                onClick={() => onSelectDay(day.id)}
                                className="p-1 hover:text-sky-400 transition-colors cursor-pointer"
                                title="Mission Briefing"
                              >
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* COMPACT LIST (Option 3 minimal row view)                                  */}
        {/* ========================================================================= */}
        {layoutMode === 'compact' && (
          <div className="space-y-4">
            {displayedLevels.map((level) => {
              const isExpanded = expandedLevels.includes(level.id);

              return (
                <div
                  key={level.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
                >
                  {/* Collapsible Level Bar */}
                  <button
                    onClick={() => toggleLevelExpansion(level.id)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                          level.isLevelCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : level.isLevelActive
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        0{level.id}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {level.title}
                        </h3>
                        <p className="text-xs text-slate-400">{level.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                        {level.completedCount} of {level.totalCount} completed ({level.levelPercent}%)
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Days Line Rows */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-800/80 divide-y divide-slate-800/60">
                      {level.daysList.map((day) => {
                        const isDone = completedDays.includes(day.id);
                        const isCur = day.id === currentDayId;

                        return (
                          <div
                            key={day.id}
                            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/20 px-2 rounded-lg transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs font-bold text-sky-400 w-16 shrink-0">
                                Day {day.id.toString().padStart(2, '0')}
                              </span>
                              <div className="space-y-0.5">
                                <h4 className="text-sm font-semibold text-white">{day.title}</h4>
                                <span className="text-xs text-slate-400">
                                  {day.concepts.slice(0, 3).join(' · ')}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                              {isDone ? (
                                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold mr-2">
                                  <Check className="w-3.5 h-3.5" />
                                  Mastered
                                </span>
                              ) : isCur ? (
                                <span className="text-xs font-mono text-sky-400 flex items-center gap-1 font-bold mr-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                                  Current
                                </span>
                              ) : null}

                              <button
                                onClick={() => onLaunchMission(day.id)}
                                className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                              >
                                Launch Lab
                              </button>
                              <button
                                onClick={() => onSelectDay(day.id)}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                              >
                                Briefing
                              </button>
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
        )}
      </section>
    </div>
  );
};
