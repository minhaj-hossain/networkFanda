import React, { useState } from 'react';
import { DayCurriculum, PhaseId } from '../types/curriculum';
import { PHASES_METADATA } from '../data/curriculumData';
import { CheckCircle2, Circle, Clock, Award, BarChart3, ChevronRight, FileDown } from 'lucide-react';

interface CompetencyTrackerProps {
  days: DayCurriculum[];
  completedDays: number[];
  inProgressDays: number[];
  onToggleDayComplete: (dayId: number) => void;
  onSelectDay: (dayId: number) => void;
}

export const CompetencyTracker: React.FC<CompetencyTrackerProps> = ({
  days,
  completedDays,
  inProgressDays,
  onToggleDayComplete,
  onSelectDay,
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<PhaseId | 'all'>('all');

  // Filtered day list
  const filteredDays =
    selectedPhaseFilter === 'all'
      ? days
      : days.filter((d) => d.phase === selectedPhaseFilter);

  // Compute domain competencies
  const competencyDomains = [
    {
      name: 'IP Addressing & Subnetting',
      days: [3, 4, 5],
      skills: ['IPv4 Structure & Octets', 'Subnet Mask Calculation', 'CIDR Prefix Division', 'Usable Host Math'],
    },
    {
      name: 'Dynamic Host Configuration (DHCP)',
      days: [7, 27],
      skills: ['4-Step DORA Flow', 'Lease Timers & Scopes', 'APIPA (169.254.x.x) Diagnosis', 'Option 3 & 6 Configuration'],
    },
    {
      name: 'Domain Name System (DNS)',
      days: [8, 24],
      skills: ['Recursive vs Authoritative', 'A & CNAME Records', 'Split DNS Isolation', 'nslookup & dig Diagnostics'],
    },
    {
      name: 'Switching & Layer 2 Technologies',
      days: [2, 11, 12, 13, 14, 15],
      skills: ['MAC Table Dynamic Learning', 'VLAN Logical Isolation', '802.1Q Trunk Tagging', 'Inter-VLAN Sub-interfaces'],
    },
    {
      name: 'Routing & Layer 3 Forwarding',
      days: [16, 17, 18, 19, 20],
      skills: ['Longest Prefix Match Table', 'Static Routing Bidirectionality', 'Default Route (0.0.0.0/0)', 'NAT/PAT Port Mapping'],
    },
    {
      name: 'Enterprise IT Support & Incident Response',
      days: [21, 22, 23, 25, 28, 30],
      skills: ['Windows CMD & Linux CLI Mastery', 'Blast Radius Scope Analysis', 'Ticket #1001 & #1002 Resolution', 'Root Cause Analysis (RCA)'],
    },
  ];

  const overallProgress = Math.round((completedDays.length / days.length) * 100);

  return (
    <div className="w-full space-y-6 text-slate-200">
      {/* Top Banner: Competency Overview */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Award className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-slate-100">
              TechNova Junior IT Support Engineer Competency Profile
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Progress is tracked by validated operational competency across networking disciplines
            rather than rote passive video watching.
          </p>
        </div>

        {/* Circular / Bar Progress Gauge */}
        <div className="flex items-center gap-4 bg-slate-950 px-5 py-3.5 rounded-xl border border-slate-800 shrink-0">
          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-sky-400 tabular-nums">
              {overallProgress}%
            </span>
            <p className="text-[11px] text-slate-500 font-mono">
              {completedDays.length} / {days.length} Days Finished
            </p>
          </div>
          <div className="w-20 bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-sky-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Domain Competency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competencyDomains.map((domain, idx) => {
          const completedInDomain = domain.days.filter((d) => completedDays.includes(d)).length;
          const domainPercent = Math.round((completedInDomain / domain.days.length) * 100);

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-3 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <h3 className="font-semibold text-xs text-slate-200">{domain.name}</h3>
                  <span className="font-mono text-xs text-sky-400 font-semibold tabular-nums">
                    {domainPercent}%
                  </span>
                </div>

                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      domainPercent === 100 ? 'bg-emerald-400' : 'bg-sky-400'
                    }`}
                    style={{ width: `${domainPercent}%` }}
                  />
                </div>

                <ul className="space-y-1 text-[11px] text-slate-400">
                  {domain.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Days: {domain.days.join(', ')}</span>
                <span>{completedInDomain}/{domain.days.length} Complete</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Day-by-Day Implementation Checklist */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-sky-400" />
            <h3 className="font-semibold text-sm text-slate-100">
              30-Day Project Roadmap Checklist
            </h3>
          </div>

          {/* Phase Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs overflow-x-auto">
            <button
              onClick={() => setSelectedPhaseFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                selectedPhaseFilter === 'all'
                  ? 'bg-slate-800 text-sky-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Phases
            </button>
            {PHASES_METADATA.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPhaseFilter(p.id)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedPhaseFilter === p.id
                    ? 'bg-slate-800 text-sky-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                P0{p.id}
              </button>
            ))}
          </div>
        </div>

        {/* Days List Table */}
        <div className="space-y-2">
          {filteredDays.map((day) => {
            const isCompleted = completedDays.includes(day.id);
            const isInProgress = inProgressDays.includes(day.id) && !isCompleted;

            return (
              <div
                key={day.id}
                className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg flex flex-wrap items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleDayComplete(day.id)}
                    className="text-slate-500 hover:text-sky-400 transition-colors"
                    title={isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isInProgress ? (
                      <Clock className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-sky-400">
                        Day {day.id.toString().padStart(2, '0')}
                      </span>
                      <span className="text-slate-600">·</span>
                      <h4 className="text-xs font-semibold text-slate-200">{day.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {day.concepts.slice(0, 4).join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                      isCompleted
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : isInProgress
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    {isCompleted ? 'COMPLETED' : isInProgress ? 'IN PROGRESS' : 'TO FINISH'}
                  </span>

                  <button
                    onClick={() => onSelectDay(day.id)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Open Day Simulation"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
