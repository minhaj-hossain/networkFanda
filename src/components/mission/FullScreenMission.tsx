import React, { useState } from 'react';
import { DayCurriculum, ITTicket, NetworkDevice, PacketInfo, ProtocolType } from '../../types/curriculum';
import { Day01HumanExperience } from './Day01HumanExperience';
import { Day02HumanExperience } from './Day02HumanExperience';
import { NetworkCanvas } from '../NetworkCanvas';
import { PacketInspector } from '../PacketInspector';
import { SubnetExplorer } from '../SubnetExplorer';
import { DeviceInspectorDrawer } from '../drawers/DeviceInspectorDrawer';
import { TerminalDrawer } from '../drawers/TerminalDrawer';
import { MentorDrawer } from '../drawers/MentorDrawer';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Sliders,
  BookOpen,
  HelpCircle,
  Briefcase,
  CheckCircle2,
  Terminal,
  Binary,
  Lightbulb,
  Building,
  RotateCcw,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

interface FullScreenMissionProps {
  day: DayCurriculum;
  ticket?: ITTicket;
  onExitMission: () => void;
  onCompleteMission: (dayId: number) => void;
}

type MissionStage = 'observe' | 'explore' | 'understand' | 'practice' | 'challenge' | 'complete';

export const FullScreenMission: React.FC<FullScreenMissionProps> = ({
  day,
  ticket,
  onExitMission,
  onCompleteMission,
}) => {
  // Day 1: Dedicated Human-Centric First-Principles Experience (No machine jargon, tangible story)
  if (day.id === 1) {
    return (
      <Day01HumanExperience
        day={day}
        ticket={ticket}
        onExitMission={onExitMission}
        onCompleteMission={onCompleteMission}
      />
    );
  }

  // Day 2: The Office Postroom & Name-Badge Experience (Choice A)
  if (day.id === 2) {
    return (
      <Day02HumanExperience
        day={day}
        ticket={ticket}
        onExitMission={onExitMission}
        onCompleteMission={onCompleteMission}
      />
    );
  }

  const [currentStage, setCurrentStage] = useState<MissionStage>('observe');

  // Simulation state
  const [devices, setDevices] = useState<NetworkDevice[]>(day.defaultDevices);
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(day.defaultDevices[0] || null);
  const [currentPacket, setCurrentPacket] = useState<PacketInfo | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);

  // Defect toggles
  const [isGatewayBroken, setIsGatewayBroken] = useState(false);
  const [isDnsBroken, setIsDnsBroken] = useState(false);
  const [isCableUnplugged, setIsCableUnplugged] = useState(false);
  const [isVlanMismatch, setIsVlanMismatch] = useState(false);

  // Drawers
  const [deviceDrawerOpen, setDeviceDrawerOpen] = useState(false);
  const [terminalDrawerOpen, setTerminalDrawerOpen] = useState(false);
  const [inspectorModalOpen, setInspectorModalOpen] = useState(false);
  const [mentorDrawerOpen, setMentorDrawerOpen] = useState(false);

  // Practice Stage Prediction
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [predictionResult, setPredictionResult] = useState<{ correct: boolean; explanation: string } | null>(null);

  // Challenge Stage
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<number | null>(null);
  const [challengeResolved, setChallengeResolved] = useState(false);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  // Stage steps sequence
  const stages: { id: MissionStage; label: string; icon: React.ReactNode }[] = [
    { id: 'observe', label: '1. Observe', icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'explore', label: '2. Explore', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'understand', label: '3. Understand', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'practice', label: '4. Practice', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'challenge', label: '5. Work Challenge', icon: <Briefcase className="w-3.5 h-3.5" /> },
  ];

  const currentStageIndex = stages.findIndex((s) => s.id === currentStage);
  const progressPercent = Math.round(((currentStageIndex + 1) / stages.length) * 100);

  // Handlers for Simulation
  const handleSendPacket = (protocol: ProtocolType = 'HTTP') => {
    const hopIds = devices.map((d) => d.id);
    const newPacket: PacketInfo = {
      id: `pkt-${Date.now()}`,
      sourceDevice: devices[0]?.name || 'PC',
      destDevice: devices[devices.length - 1]?.name || 'Server',
      sourceIp: devices[0]?.ip || '192.168.1.10',
      destIp: devices[devices.length - 1]?.ip || '93.184.216.34',
      sourceMac: devices[0]?.mac || 'AA:01:00',
      destMac: devices[1]?.mac || '00:1A:2B',
      protocol,
      status: isCableUnplugged ? 'dropped' : 'transmitting',
      currentHopIndex: 0,
      hops: hopIds,
      description: isCableUnplugged
        ? 'Physical cable disconnected: Frame dropped.'
        : `Packet originating at ${devices[0]?.name} heading to ${devices[devices.length - 1]?.ip}.`,
      payload: protocol === 'HTTP' ? 'GET /index.html HTTP/1.1' : 'ICMP Echo Request',
      layer2Header: {
        srcMac: devices[0]?.mac || 'AA:01',
        dstMac: devices[1]?.mac || '00:1A',
        etherType: '0x0800 (IPv4)',
        vlanTag: isVlanMismatch ? 99 : devices[0]?.vlan,
      },
      layer3Header: {
        version: 'IPv4',
        srcIp: devices[0]?.ip || '192.168.1.10',
        dstIp: devices[devices.length - 1]?.ip || '93.184.216.34',
        ttl: 64,
        protocol,
      },
      layer4Header: {
        srcPort: 49152,
        dstPort: 80,
      },
    };
    setCurrentPacket(newPacket);
    setIsSimulating(true);
  };

  const handleStepForward = () => {
    if (!currentPacket) {
      handleSendPacket('HTTP');
      return;
    }
    const nextIdx = currentPacket.currentHopIndex + 1;
    if (nextIdx >= currentPacket.hops.length) {
      setCurrentPacket({
        ...currentPacket,
        status: 'delivered',
        description: 'Packet delivered to destination host.',
      });
      setIsSimulating(false);
    } else {
      setCurrentPacket({
        ...currentPacket,
        currentHopIndex: nextIdx,
        description: `Packet forwarding via hop ${nextIdx + 1} (${devices[nextIdx]?.name}).`,
      });
    }
  };

  const handleSelectDevice = (device: NetworkDevice) => {
    setSelectedDevice(device);
    setDeviceDrawerOpen(true);
  };

  const handleVerifyPrediction = () => {
    if (selectedPrediction === null) return;
    const isCorrect = selectedPrediction === day.experimentPrompt.correctAnswerIndex;
    setPredictionResult({
      correct: isCorrect,
      explanation: day.experimentPrompt.explanation,
    });
  };

  const handleResolveChallenge = () => {
    if (selectedDiagnosis === null || !ticket) return;
    const isCorrect = selectedDiagnosis === ticket.correctOptionIndex;
    if (isCorrect) {
      setChallengeResolved(true);
      setChallengeFeedback('Diagnosis Verified: You identified the exact root cause and resolved the incident!');
      onCompleteMission(day.id);
    } else {
      setChallengeFeedback('Diagnosis Incomplete: That action did not fix the outage. Inspect the symptoms and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden">
      {/* 1. Immersive Top Bar */}
      <header className="h-16 px-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        {/* Left: Exit & Mission Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitMission}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Mission</span>
          </button>
          <div className="hidden sm:block border-l border-slate-800 pl-3">
            <span className="font-mono text-xs text-sky-400 font-semibold block">
              Day {day.id.toString().padStart(2, '0')} · TechNova IT Support
            </span>
            <span className="text-xs font-bold text-slate-100 block">{day.title}</span>
          </div>
        </div>

        {/* Right: Contextual Drawers / Tools (Progressive Disclosure) */}
        <div className="flex items-center gap-2">
          {/* Packet Inspector Drawer Trigger */}
          <button
            onClick={() => setInspectorModalOpen(!inspectorModalOpen)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              inspectorModalOpen
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Toggle Packet Inspector"
          >
            <Binary className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Inspector</span>
          </button>

          {/* Terminal Drawer Trigger */}
          <button
            onClick={() => setTerminalDrawerOpen(!terminalDrawerOpen)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              terminalDrawerOpen
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Toggle Terminal CLI Drawer"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Mentor Button */}
          <button
            onClick={() => setMentorDrawerOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors"
            title="Open Senior Mentor"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mentor</span>
          </button>
        </div>
      </header>

      {/* 2. Main Full-Screen Experience Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-between">
        {/* STAGE 1: OBSERVE (The concept visualizer takes the entire stage) */}
        {currentStage === 'observe' && (
          <div className="max-w-5xl mx-auto w-full space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                Step 1 of 5 — Observe
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                Watch the Concept Happen
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                {day.visualStory}
              </p>
            </div>

            {/* Network Canvas dominates the screen */}
            <NetworkCanvas
              devices={devices}
              selectedDevice={selectedDevice}
              onSelectDevice={handleSelectDevice}
              currentPacket={currentPacket}
              isSimulating={isSimulating}
              onTogglePlay={() => setIsSimulating(!isSimulating)}
              onResetSim={() => {
                setIsSimulating(false);
                setCurrentPacket(null);
              }}
              onStepForward={handleStepForward}
              simSpeed={simSpeed}
              setSimSpeed={setSimSpeed}
              onSendTestPacket={handleSendPacket}
              isGatewayBroken={isGatewayBroken}
              onToggleGatewayBreak={() => setIsGatewayBroken(!isGatewayBroken)}
              isDnsBroken={isDnsBroken}
              onToggleDnsBreak={() => setIsDnsBroken(!isDnsBroken)}
              isCableUnplugged={isCableUnplugged}
              onToggleCableUnplug={() => setIsCableUnplugged(!isCableUnplugged)}
              isVlanMismatch={isVlanMismatch}
              onToggleVlanMismatch={() => setIsVlanMismatch(!isVlanMismatch)}
            />
          </div>
        )}

        {/* STAGE 2: EXPLORE (Learner controls parameters & devices) */}
        {currentStage === 'explore' && (
          <div className="max-w-5xl mx-auto w-full space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                Step 2 of 5 — Explore & Interact
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                Interact with the Network Nodes
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                Click any device below to open its hardware properties. Test connection paths or use the defect toggles above to observe what happens when a link is disrupted.
              </p>
            </div>

            <NetworkCanvas
              devices={devices}
              selectedDevice={selectedDevice}
              onSelectDevice={handleSelectDevice}
              currentPacket={currentPacket}
              isSimulating={isSimulating}
              onTogglePlay={() => setIsSimulating(!isSimulating)}
              onResetSim={() => {
                setIsSimulating(false);
                setCurrentPacket(null);
              }}
              onStepForward={handleStepForward}
              simSpeed={simSpeed}
              setSimSpeed={setSimSpeed}
              onSendTestPacket={handleSendPacket}
              isGatewayBroken={isGatewayBroken}
              onToggleGatewayBreak={() => setIsGatewayBroken(!isGatewayBroken)}
              isDnsBroken={isDnsBroken}
              onToggleDnsBreak={() => setIsDnsBroken(!isDnsBroken)}
              isCableUnplugged={isCableUnplugged}
              onToggleCableUnplug={() => setIsCableUnplugged(!isCableUnplugged)}
              isVlanMismatch={isVlanMismatch}
              onToggleVlanMismatch={() => setIsVlanMismatch(!isVlanMismatch)}
            />
          </div>
        )}

        {/* STAGE 3: UNDERSTAND (Concise, uncluttered pedagogical explanation) */}
        {currentStage === 'understand' && (
          <div className="max-w-3xl mx-auto w-full space-y-6 py-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                Step 3 of 5 — Understand
              </span>
              <h2 className="text-2xl font-bold text-slate-100">
                The Core Principle Explained
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-xs font-mono text-sky-400 uppercase font-semibold block mb-1">
                  Required Understanding
                </span>
                <p className="text-sm font-medium text-slate-100 leading-relaxed">
                  "{day.requiredUnderstanding}"
                </p>
              </div>

              {/* Subnet Explorer on Days 4 & 5 */}
              {(day.id === 4 || day.id === 5) ? (
                <SubnetExplorer />
              ) : (
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <p>
                    Networking equipment operates strictly by protocols: switches use MAC addresses to forward frames locally, while routers use IP addresses to navigate across multiple network segments.
                  </p>
                  <p>
                    When a packet cannot reach its destination, the breakdown is always traceable: Layer 1 (Physical Cable), Layer 2 (MAC / VLAN), Layer 3 (IP Subnet / Gateway), or Layer 4/7 (Port / DNS).
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 4: PRACTICE / PREDICT (Guided experiment & consequence) */}
        {currentStage === 'practice' && (
          <div className="max-w-3xl mx-auto w-full space-y-6 py-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                Step 4 of 5 — Guided Prediction Challenge
              </span>
              <h2 className="text-2xl font-bold text-slate-100">
                Predict the Consequence
              </h2>
              <p className="text-xs text-slate-400">
                Before running the test, what do you predict will happen?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                {day.experimentPrompt.question}
              </p>

              <div className="space-y-2.5">
                {day.experimentPrompt.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedPrediction === idx
                        ? 'bg-sky-500/10 border-sky-500/50 text-sky-200'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="prediction"
                      checked={selectedPrediction === idx}
                      onChange={() => {
                        setSelectedPrediction(idx);
                        setPredictionResult(null);
                      }}
                      className="mt-0.5 accent-sky-400"
                    />
                    <span className="text-xs leading-relaxed">{opt}</span>
                  </label>
                ))}
              </div>

              {predictionResult && (
                <div
                  className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                    predictionResult.correct
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  {predictionResult.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold mb-1">
                      {predictionResult.correct ? 'Accurate Prediction!' : 'Different Consequence:'}
                    </p>
                    <p className="leading-relaxed">{predictionResult.explanation}</p>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleVerifyPrediction}
                  disabled={selectedPrediction === null}
                  className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                >
                  Verify Prediction
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: CHALLENGE / TROUBLESHOOTING (Work Mode) */}
        {currentStage === 'challenge' && (
          <div className="max-w-4xl mx-auto w-full space-y-6 py-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Work Mode · TechNova IT Support Incident</span>
                </span>
                <h2 className="text-xl font-bold text-slate-100">
                  {ticket ? ticket.title : `Day ${day.id} Operational Assessment`}
                </h2>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                Ticket #10{day.id.toString().padStart(2, '0')}
              </span>
            </div>

            {/* Workplace Report */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                  Employee Incident Report
                </span>
                <p className="text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed font-mono">
                  "{ticket ? ticket.description : day.workplaceScenario}"
                </p>
              </div>

              {/* Action tools row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTerminalDrawerOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-sky-300 border border-slate-700"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Open Workstation CLI</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDevice(devices[0]);
                      setDeviceDrawerOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700"
                  >
                    <span>Inspect Target PC</span>
                  </button>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  Investigate symptoms before selecting remediation
                </span>
              </div>

              {/* Diagnosis Options */}
              {ticket && (
                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Select Root Cause & Remediation
                  </span>
                  {ticket.resolutionOptions.map((opt, idx) => (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedDiagnosis === idx
                          ? 'bg-sky-500/10 border-sky-500/50 text-sky-200'
                          : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="diagnosis"
                        checked={selectedDiagnosis === idx}
                        onChange={() => setSelectedDiagnosis(idx)}
                        className="mt-0.5 accent-sky-400"
                      />
                      <span className="text-xs leading-relaxed">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {challengeFeedback && (
                <div
                  className={`p-4 rounded-xl border text-xs flex items-start gap-2.5 ${
                    challengeResolved
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  {challengeResolved ? (
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                  )}
                  <span>{challengeFeedback}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleResolveChallenge}
                  disabled={selectedDiagnosis === null || challengeResolved}
                  className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                >
                  {challengeResolved ? 'Incident Resolved' : 'Submit Diagnosis'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 6: COMPLETE */}
        {currentStage === 'complete' && (
          <div className="max-w-md mx-auto w-full text-center space-y-6 py-12">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-100">Mission Accomplished!</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                You successfully mastered Day {day.id}: {day.title}. Your TechNova competency profile has been updated.
              </p>
            </div>

            <button
              onClick={onExitMission}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        )}

        {/* 3. Bottom Navigation Bar within Mission */}
        {currentStage !== 'complete' && (
          <div className="max-w-5xl mx-auto w-full pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                if (currentStageIndex > 0) {
                  setCurrentStage(stages[currentStageIndex - 1].id);
                } else {
                  onExitMission();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentStageIndex === 0 ? 'Exit' : 'Previous Step'}</span>
            </button>

            <button
              onClick={() => {
                if (currentStageIndex < stages.length - 1) {
                  setCurrentStage(stages[currentStageIndex + 1].id);
                } else {
                  setCurrentStage('complete');
                  onCompleteMission(day.id);
                }
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              <span>{currentStageIndex === stages.length - 1 ? 'Finish Mission' : 'Continue to Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Progressive Disclosure Drawers */}
      <DeviceInspectorDrawer
        device={selectedDevice}
        isOpen={deviceDrawerOpen}
        onClose={() => setDeviceDrawerOpen(false)}
      />

      <TerminalDrawer
        isOpen={terminalDrawerOpen}
        onClose={() => setTerminalDrawerOpen(false)}
        isGatewayBroken={isGatewayBroken}
        isDnsBroken={isDnsBroken}
        isCableUnplugged={isCableUnplugged}
      />

      <MentorDrawer
        isOpen={mentorDrawerOpen}
        onClose={() => setMentorDrawerOpen(false)}
        day={day}
        currentStepName={currentStage}
      />

      {/* Floating Packet Inspector Modal */}
      {inspectorModalOpen && (
        <div className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-4 md:w-[480px] z-40 shadow-2xl">
          <PacketInspector packet={currentPacket} selectedDevice={selectedDevice} />
        </div>
      )}
    </div>
  );
};
