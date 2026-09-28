import React, { useState } from 'react';
import { ITTicket } from '../types/curriculum';
import { ShieldAlert, CheckCircle2, AlertTriangle, FileText, ArrowRight, User, Building, Clock } from 'lucide-react';

interface TicketDeskProps {
  tickets: ITTicket[];
  onSolveTicket: (ticketId: string, chosenOptionIndex: number) => void;
  onSelectDay: (dayId: number) => void;
}

export const TicketDesk: React.FC<TicketDeskProps> = ({ tickets, onSolveTicket, onSelectDay }) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [selectedResolution, setSelectedResolution] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const activeTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleResolve = () => {
    if (selectedResolution === null || !activeTicket) return;
    const isCorrect = selectedResolution === activeTicket.correctOptionIndex;

    if (isCorrect) {
      setFeedback({
        success: true,
        message: 'Resolution Verified: The ticket has been resolved successfully! The workstation connectivity has returned to nominal status.',
      });
      onSolveTicket(activeTicket.id, selectedResolution);
    } else {
      setFeedback({
        success: false,
        message: 'Resolution Failed: That action did not fix the root cause. Investigate the symptoms and IP configuration again.',
      });
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-200">
      {/* Left Column: Ticket Queue */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-sky-400" />
            <h3 className="font-semibold text-sm text-slate-100">Helpdesk Queue</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {tickets.filter((t) => t.solved).length} / {tickets.length} Solved
          </span>
        </div>

        <div className="space-y-2">
          {tickets.map((t) => {
            const isSelected = t.id === activeTicket?.id;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTicketId(t.id);
                  setSelectedResolution(null);
                  setFeedback(null);
                }}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-sky-500/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-sky-400 font-semibold">{t.id}</span>
                  {t.solved ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-mono text-[10px]">
                      <CheckCircle2 className="w-3 h-3" />
                      SOLVED
                    </span>
                  ) : (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        t.priority === 'critical'
                          ? 'bg-rose-500/10 text-rose-300'
                          : t.priority === 'high'
                          ? 'bg-amber-500/10 text-amber-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {t.priority.toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-200 line-clamp-1">{t.title}</p>
                <p className="text-[11px] text-slate-400 mt-1">{t.department} · {t.reporter}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right 2 Columns: Active Ticket Detail & Resolution */}
      {activeTicket && (
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>{activeTicket.id}</span>
                <span>·</span>
                <span className="text-sky-300">Curriculum Day {activeTicket.dayId}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">{activeTicket.title}</h2>
            </div>

            <button
              onClick={() => onSelectDay(activeTicket.dayId)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-sky-300 border border-slate-700 transition-colors"
            >
              Open Day {activeTicket.dayId} Lab
            </button>
          </div>

          {/* Ticket Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-400">{activeTicket.reporter}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-400">{activeTicket.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-400">Status: {activeTicket.solved ? 'Closed' : 'Open'}</span>
            </div>
          </div>

          {/* User Description */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              User Problem Description
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-lg border border-slate-800">
              "{activeTicket.description}"
            </p>
          </div>

          {/* Reported Symptoms */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Observed Diagnostic Symptoms
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeTicket.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-950/40 p-2 rounded border border-slate-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Remediation Plan */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Select Diagnostic Hypothesis & Remediation Action
            </span>

            <div className="space-y-2">
              {activeTicket.resolutionOptions.map((opt, idx) => (
                <label
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedResolution === idx
                      ? 'bg-sky-500/10 border-sky-500/50 text-sky-200'
                      : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="resolution"
                    checked={selectedResolution === idx}
                    onChange={() => {
                      setSelectedResolution(idx);
                      setFeedback(null);
                    }}
                    className="mt-0.5 accent-sky-400"
                  />
                  <span className="text-xs leading-relaxed">{opt}</span>
                </label>
              ))}
            </div>

            {/* Verification Result Feedback */}
            {feedback && (
              <div
                className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                  feedback.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {feedback.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleResolve}
                disabled={selectedResolution === null || activeTicket.solved}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTicket.solved
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : selectedResolution === null
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                }`}
              >
                <span>{activeTicket.solved ? 'Ticket Already Resolved' : 'Submit & Verify Fix'}</span>
                {!activeTicket.solved && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
