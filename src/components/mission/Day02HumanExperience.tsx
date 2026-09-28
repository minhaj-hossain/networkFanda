import React, { useState, useEffect } from 'react';
import { DayCurriculum, ITTicket } from '../../types/curriculum';
import {
  ArrowLeft,
  ArrowRight,
  Laptop,
  Cpu,
  Printer,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Send,
  Building,
  Check,
  HelpCircle,
  Clock,
  Award,
  Volume2,
  VolumeX,
  ShieldCheck,
  Search,
  Eye,
  Sliders,
  ChevronRight,
  Layers,
  Zap,
  Tag,
  Radio,
  Building2,
  RefreshCw,
  Info,
} from 'lucide-react';

interface Day02HumanExperienceProps {
  day: DayCurriculum;
  ticket?: ITTicket;
  onExitMission: () => void;
  onCompleteMission: (dayId: number, nextDayId?: number | null) => void;
}

type Stage = 'badges' | 'envelope' | 'hub-vs-switch' | 'postroom-learning' | 'ghost-printer' | 'celebration';

interface OfficeColleague {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  port: number;
  mac: string;
  ouiVendor: string;
  deviceSerial: string;
  ip: string;
  accentColor: string;
  badgeBg: string;
}

const COLLEAGUES: OfficeColleague[] = [
  {
    id: 'pc1',
    name: 'Alice',
    role: 'Accounting Analyst',
    department: 'Accounting',
    avatar: '👩‍💼',
    port: 1,
    mac: '00:1A:2B:AA:00:01',
    ouiVendor: '00:1A:2B (Cisco Enterprise NIC)',
    deviceSerial: 'AA:00:01 (Unit #65,537)',
    ip: '192.168.1.10',
    accentColor: 'text-sky-400 border-sky-500/40 bg-sky-500/10',
    badgeBg: 'bg-sky-500 text-slate-950',
  },
  {
    id: 'pc2',
    name: 'Bob',
    role: 'Financial Controller',
    department: 'Finance',
    avatar: '👨‍💼',
    port: 2,
    mac: '00:1A:2B:BB:00:02',
    ouiVendor: '00:1A:2B (Cisco Enterprise NIC)',
    deviceSerial: 'BB:00:02 (Unit #76,802)',
    ip: '192.168.1.11',
    accentColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    badgeBg: 'bg-emerald-500 text-slate-950',
  },
  {
    id: 'pc3',
    name: 'Carol',
    role: 'Talent Lead',
    department: 'Human Resources',
    avatar: '👩‍💻',
    port: 3,
    mac: '70:85:C2:CC:00:03',
    ouiVendor: '70:85:C2 (Apple Silicon)',
    deviceSerial: 'CC:00:03 (Unit #12,301)',
    ip: '192.168.1.12',
    accentColor: 'text-violet-400 border-violet-500/40 bg-violet-500/10',
    badgeBg: 'bg-violet-500 text-slate-950',
  },
  {
    id: 'pc4',
    name: 'Dave',
    role: 'Sales Executive',
    department: 'Sales',
    avatar: '👨‍💻',
    port: 4,
    mac: '00:50:56:DD:00:04',
    ouiVendor: '00:50:56 (Dell Workstation)',
    deviceSerial: 'DD:00:04 (Unit #94,112)',
    ip: '192.168.1.13',
    accentColor: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    badgeBg: 'bg-amber-500 text-slate-950',
  },
];

interface CamEntry {
  port: number;
  mac: string;
  name: string;
  learnedAt: string;
  status: 'active' | 'learning';
}

export const Day02HumanExperience: React.FC<Day02HumanExperienceProps> = ({
  day,
  ticket,
  onExitMission,
  onCompleteMission,
}) => {
  const [currentStage, setCurrentStage] = useState<Stage>('badges');

  // Stage 1: Badges State
  const [selectedColleague, setSelectedColleague] = useState<OfficeColleague>(COLLEAGUES[0]);
  const [inspectedPart, setInspectedPart] = useState<'all' | 'oui' | 'serial'>('all');

  // Stage 2: Envelope State
  const [viewMode, setViewMode] = useState<'human' | 'engineer'>('human');
  const [envelopePartHover, setEnvelopePartHover] = useState<string | null>(null);

  // Stage 3: Hub vs Switch State
  const [comparisonDevice, setComparisonDevice] = useState<'hub' | 'switch'>('switch');
  const [isHallwaySending, setIsHallwaySending] = useState(false);

  // Stage 4: Postroom Learning Simulation State
  const [simStep, setSimStep] = useState<number>(1);
  const [camTable, setCamTable] = useState<CamEntry[]>([]);
  const [animationPacket, setAnimationPacket] = useState<{
    from: string;
    to: string;
    currentPosition: 'atSource' | 'inSwitch' | 'flooding' | 'delivered';
    floodedPorts?: number[];
  } | null>(null);
  const [postroomLog, setPostroomLog] = useState<string[]>([
    'Postroom Clerk woke up. Clipboard (CAM Table) is 100% empty.',
  ]);

  // Stage 5: Incident Ticket (Ghost Printer) State
  const [printerPoweredOn, setPrinterPoweredOn] = useState(true);
  const [printerSentTraffic, setPrinterSentTraffic] = useState(false);
  const [printerTicketSolved, setPrinterTicketSolved] = useState(false);

  // Mentor Drawer
  const [showMentorTip, setShowMentorTip] = useState(false);

  // Stages configuration
  const stages: { id: Stage; number: string; title: string; subtitle: string }[] = [
    { id: 'badges', number: '1', title: 'The Name-Badge', subtitle: 'Hardware MAC Addresses burned into silicon' },
    { id: 'envelope', number: '2', title: 'The Office Envelope', subtitle: 'Anatomy of an Ethernet frame' },
    { id: 'hub-vs-switch', number: '3', title: 'Megaphone vs Switch', subtitle: 'How modern switches eliminated chaos' },
    { id: 'postroom-learning', number: '4', title: 'The Postroom Clerk', subtitle: 'Step-by-step CAM table learning' },
    { id: 'ghost-printer', number: '5', title: 'Workplace Ticket', subtitle: 'Diagnose the silent printer on Port 4' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.id === currentStage);

  // ==========================================
  // Postroom Simulation Stepper Logic
  // ==========================================
  const handleNextSimStep = () => {
    if (simStep === 1) {
      // Step 2: Alice sends to Bob
      setSimStep(2);
      setAnimationPacket({
        from: 'Alice (Port 1)',
        to: 'Bob (Port 2)',
        currentPosition: 'inSwitch',
      });
      // Switch records Alice
      setCamTable([{ port: 1, mac: '00:1A:2B:AA:00:01', name: 'Alice (Accounting)', learnedAt: 'Just now', status: 'active' }]);
      setPostroomLog((prev) => [
        '📝 CLERK ACTION: Envelope arrived on Port 1 from Alice (00:1A:2B:AA:00:01). Clerk wrote: Port 1 = Alice on clipboard!',
        '🔍 CLERK LOOKUP: Clerk checks clipboard for recipient Bob (00:1A:2B:BB:00:02)... NOT FOUND!',
        ...prev,
      ]);
    } else if (simStep === 2) {
      // Step 3: Unknown Unicast Flooding (Polite Roll-Call)
      setSimStep(3);
      setAnimationPacket({
        from: 'Alice (Port 1)',
        to: 'Bob (Port 2)',
        currentPosition: 'flooding',
        floodedPorts: [2, 3, 4],
      });
      setPostroomLog((prev) => [
        '📢 CLERK ACTION: Unknown Unicast Flooding! Clerk sends a copy to Ports 2, 3, and 4 (never back to 1).',
        '🗑️ Carol (Port 3) & Dave (Port 4) read "To: Bob" -> "Not for me!" and discard the copy.',
        '📬 Bob (Port 2) reads "To: Bob" -> "That’s me!" and prepares an answer.',
        ...prev,
      ]);
    } else if (simStep === 3) {
      // Step 4: Bob replies back to Alice
      setSimStep(4);
      setAnimationPacket({
        from: 'Bob (Port 2)',
        to: 'Alice (Port 1)',
        currentPosition: 'delivered',
      });
      // Switch records Bob
      setCamTable([
        { port: 1, mac: '00:1A:2B:AA:00:01', name: 'Alice (Accounting)', learnedAt: 'Step 2', status: 'active' },
        { port: 2, mac: '00:1A:2B:BB:00:02', name: 'Bob (Finance)', learnedAt: 'Just now', status: 'active' },
      ]);
      setPostroomLog((prev) => [
        '📝 CLERK ACTION: Bob replies from Port 2. Clerk immediately writes Port 2 = Bob on clipboard!',
        '🎯 DIRECT UNICAST: Clerk checks destination (Alice) -> Found Port 1 on clipboard! Directly delivered! ZERO flooding!',
        '✨ PERFECT MEMORY: Future communication between Alice and Bob is now 100% private and instant.',
        ...prev,
      ]);
    }
  };

  const handleResetSim = () => {
    setSimStep(1);
    setCamTable([]);
    setAnimationPacket(null);
    setPostroomLog(['Postroom Clerk reset. Clipboard (CAM Table) is 100% empty.']);
  };

  // Ticket handling
  const handleWakeupPrinter = () => {
    setPrinterSentTraffic(true);
    setTimeout(() => {
      setPrinterTicketSolved(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. TOP BAR: Clear Orientation & Smooth Progress                          */}
      {/* ========================================================================= */}
      <header className="h-16 px-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        {/* Left: Exit & Mission Overview */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitMission}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Mission</span>
          </button>

          <div className="hidden sm:block border-l border-slate-800 pl-3">
            <span className="font-mono text-[11px] text-emerald-400 font-bold block uppercase tracking-wider">
              DAY 02 · PHYSICAL ADDRESSING & SWITCHING
            </span>
            <span className="text-xs font-bold text-white block">
              The Office Postroom: MAC Addresses & Ethernet
            </span>
          </div>
        </div>

        {/* Right: Mentor Help & Postroom Mode Indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMentorTip(!showMentorTip)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
              showMentorTip
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Ask Senior Mentor</span>
          </button>
        </div>
      </header>

      {/* Senior Mentor Tip Overlay */}
      {showMentorTip && (
        <div className="bg-amber-950/40 border-b border-amber-500/30 px-6 py-3 flex items-start justify-between gap-4 text-xs text-amber-200 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start gap-3">
            <span className="text-xl">🧙‍♂️</span>
            <div>
              <p className="font-bold text-amber-300">Senior Network Architect Mentor Note:</p>
              <p className="mt-0.5 text-amber-200/90 leading-relaxed">
                “Think of an <strong>IP Address</strong> as someone’s temporary desk extension number (it changes when you move departments). 
                A <strong>MAC Address</strong> is like their physical fingerprint or government ID badge — it is permanently etched into the silicon chip at the factory. 
                Switches only care about physical badges to decide which cable to deliver data to!”
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowMentorTip(false)}
            className="text-amber-400 hover:text-amber-200 font-bold px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA (5 STAGES)                                          */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        {/* ======================================================================= */}
        {/* STAGE 1: THE PHYSICAL NAME-BADGE (MAC ADDRESSES)                        */}
        {/* ======================================================================= */}
        {currentStage === 'badges' && (
          <div className="w-full max-w-5xl space-y-6 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <Tag className="w-3.5 h-3.5" />
                <span>PHASE 1 · DAY 02 · HARDWARE IDENTITY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                The Physical Name-Badge: What is a MAC Address?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                When you plug a network cable into a laptop, how does the building know who you are? 
                Every network card is born with an unforgeable, factory-burned physical badge: the <strong>MAC Address</strong>.
              </p>
            </div>

            {/* Interactive Badge Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Col: 4 Coworkers at TechNova Desks */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Floor 2 Desks (Select a Coworker)
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Click to inspect badge</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {COLLEAGUES.map((c) => {
                    const isSelected = selectedColleague.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColleague(c)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-slate-800/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                            : 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0 shadow-inner">
                            {c.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{c.name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                                Port {c.port}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400 block">{c.role} ({c.department})</span>
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold block mt-0.5">
                              {c.mac}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-5 h-5 transition-transform ${
                            isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Golden takeaway pill */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Burned In Forever:</strong> A computer’s MAC address never changes, even if you travel to Tokyo or unplug from the network. It is hardcoded into the network card’s ROM chip.
                  </div>
                </div>
              </div>

              {/* Right Col: High-Resolution Name-Badge Inspector */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Badge Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      TECHNOVA HARDWARE BADGE INSPECTOR
                    </span>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                      <span>{selectedColleague.name}'s Network Interface Card</span>
                      <span className="text-base">{selectedColleague.avatar}</span>
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    Switch Port {selectedColleague.port}
                  </span>
                </div>

                {/* The Physical Badge Visual representation */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700/80 shadow-inner space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-800/80 pb-3">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-emerald-400" />
                      <span>Physical Layer 2 Address (48 Bits / 6 Hex Bytes)</span>
                    </span>
                    <span className="text-emerald-400 font-bold">100% UNIQUE ON EARTH</span>
                  </div>

                  {/* Hex Blocks Breakdown */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* OUI Half */}
                    <div
                      onClick={() => setInspectedPart(inspectedPart === 'oui' ? 'all' : 'oui')}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        inspectedPart === 'oui' || inspectedPart === 'all'
                          ? 'bg-sky-500/10 border-sky-400/50 shadow-md shadow-sky-500/10'
                          : 'bg-slate-900 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-sky-400 font-bold">
                        <span>FIRST 3 BYTES (OUI)</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
                          Vendor / Maker
                        </span>
                      </div>
                      <div className="text-xl sm:text-2xl font-mono font-extrabold text-white tracking-wider my-1">
                        {selectedColleague.mac.slice(0, 8)}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        <strong>Who made the badge:</strong> {selectedColleague.ouiVendor}
                      </p>
                    </div>

                    {/* Serial Half */}
                    <div
                      onClick={() => setInspectedPart(inspectedPart === 'serial' ? 'all' : 'serial')}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        inspectedPart === 'serial' || inspectedPart === 'all'
                          ? 'bg-purple-500/10 border-purple-400/50 shadow-md shadow-purple-500/10'
                          : 'bg-slate-900 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-purple-400 font-bold">
                        <span>LAST 3 BYTES (NIC ID)</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                          Serial Number
                        </span>
                      </div>
                      <div className="text-xl sm:text-2xl font-mono font-extrabold text-white tracking-wider my-1">
                        {selectedColleague.mac.slice(9)}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        <strong>Device identity:</strong> {selectedColleague.deviceSerial}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 text-center pt-1 italic">
                    💡 Click either box above to toggle detailed technical breakdown
                  </p>
                </div>

                {/* Real-Life Comparison Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400 block flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      MAC Address (Physical Badge)
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Your government passport ID or fingerprint. Given when created at the factory. Never changes regardless of location.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="font-bold text-sky-400 block flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      IP Address (Mailing Address)
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Your hotel room number or current apartment address. Changes dynamically whenever you move to a new Wi-Fi or office network.
                    </p>
                  </div>
                </div>

                {/* Forward button to Stage 2 */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setCurrentStage('envelope')}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: See The Office Envelope (Ethernet Frame)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 2: THE OFFICE ENVELOPE (ETHERNET FRAME)                            */}
        {/* ======================================================================= */}
        {currentStage === 'envelope' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
                <Mail className="w-3.5 h-3.5" />
                <span>STAGE 2 · PACKET ANATOMY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                The Office Envelope: Anatomy of an Ethernet Frame
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                You cannot just shoot raw text into an electrical cable. The data must be wrapped in an official 
                <strong> Ethernet Frame</strong> — an envelope with clear address windows so switches know where to deliver it.
              </p>
            </div>

            {/* Human / Engineer Mode Switcher */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Viewing Mode:</span>
              <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setViewMode('human')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'human'
                      ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ✉️ Office Postroom View
                </button>
                <button
                  onClick={() => setViewMode('engineer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-mono ${
                    viewMode === 'engineer'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ Network Engineer View (802.3)
                </button>
              </div>
            </div>

            {/* The Interactive Envelope Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  {viewMode === 'human'
                    ? 'OFFICE INTER-DEPARTMENT MEMO ENVELOPE'
                    : 'IEEE 802.3 STANDARD ETHERNET FRAME FORMAT (64 – 1518 BYTES)'}
                </span>
                <span className="text-[11px] font-mono text-sky-400">
                  {viewMode === 'human' ? 'Hover sections for plain English' : 'Hover for byte-offset specs'}
                </span>
              </div>

              {/* The Visual Envelope Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 p-4 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-inner">
                {/* 1. Destination Address Window */}
                <div
                  onMouseEnter={() => setEnvelopePartHover('dest')}
                  className={`sm:col-span-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    envelopePartHover === 'dest'
                      ? 'bg-emerald-500/20 border-emerald-400 ring-1 ring-emerald-400'
                      : 'bg-emerald-500/10 border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 font-bold">
                    <span>{viewMode === 'human' ? 'TO: RECIPIENT' : 'DST MAC'}</span>
                    <span>{viewMode === 'human' ? 'Plastic Window' : '6 BYTES'}</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {viewMode === 'human' ? "Bob's Desk (Finance)" : '00:1A:2B:BB:00:02'}
                  </div>
                  <div className="text-[11px] text-emerald-300 mt-1 font-mono">
                    {viewMode === 'human' ? 'Port 2 on Core Switch' : 'Unicast Address'}
                  </div>
                </div>

                {/* 2. Source Address Window */}
                <div
                  onMouseEnter={() => setEnvelopePartHover('src')}
                  className={`sm:col-span-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    envelopePartHover === 'src'
                      ? 'bg-sky-500/20 border-sky-400 ring-1 ring-sky-400'
                      : 'bg-sky-500/10 border-sky-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-sky-400 font-bold">
                    <span>{viewMode === 'human' ? 'FROM: SENDER' : 'SRC MAC'}</span>
                    <span>{viewMode === 'human' ? 'Return Label' : '6 BYTES'}</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {viewMode === 'human' ? "Alice's Desk (Accounting)" : '00:1A:2B:AA:00:01'}
                  </div>
                  <div className="text-[11px] text-sky-300 mt-1 font-mono">
                    {viewMode === 'human' ? 'Port 1 on Core Switch' : 'Transmitting Station'}
                  </div>
                </div>

                {/* 3. EtherType / Language Label */}
                <div
                  onMouseEnter={() => setEnvelopePartHover('type')}
                  className={`sm:col-span-2 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    envelopePartHover === 'type'
                      ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400'
                      : 'bg-amber-500/10 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold">
                    <span>{viewMode === 'human' ? 'CONTENT TYPE' : 'ETHERTYPE'}</span>
                    <span>2B</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {viewMode === 'human' ? 'IPv4 Internet Data' : '0x0800 (IPv4)'}
                  </div>
                  <div className="text-[11px] text-amber-300 mt-1">
                    {viewMode === 'human' ? 'Standard Protocol' : 'Layer 3 Protocol'}
                  </div>
                </div>

                {/* 4. Payload / The Confidential Letter */}
                <div
                  onMouseEnter={() => setEnvelopePartHover('payload')}
                  className={`sm:col-span-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    envelopePartHover === 'payload'
                      ? 'bg-indigo-500/20 border-indigo-400 ring-1 ring-indigo-400'
                      : 'bg-indigo-500/10 border-indigo-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400 font-bold">
                    <span>{viewMode === 'human' ? 'INSIDE MEMO' : 'PAYLOAD (MTU)'}</span>
                    <span>46–1500B</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-white mt-1 truncate">
                    "Q3 Budget: $42,500 approved"
                  </div>
                  <div className="text-[11px] text-indigo-300 mt-1">
                    {viewMode === 'human' ? 'Confidential Message' : 'IP Packet / Data'}
                  </div>
                </div>

                {/* 5. Checksum / Wax Seal */}
                <div
                  onMouseEnter={() => setEnvelopePartHover('fcs')}
                  className={`sm:col-span-1 p-3.5 rounded-xl border transition-all cursor-pointer text-center ${
                    envelopePartHover === 'fcs'
                      ? 'bg-rose-500/20 border-rose-400 ring-1 ring-rose-400'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  <div className="text-[10px] font-mono text-rose-400 font-bold">
                    {viewMode === 'human' ? 'SEAL' : 'FCS'}
                  </div>
                  <div className="text-xs font-mono font-bold text-white mt-1">
                    {viewMode === 'human' ? 'Wax' : 'CRC32'}
                  </div>
                  <div className="text-[9px] text-rose-300 mt-1 font-mono">
                    {viewMode === 'human' ? 'Tamper' : '4 Bytes'}
                  </div>
                </div>
              </div>

              {/* Explanatory callout for hovered element */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 min-h-[75px] flex items-center">
                {envelopePartHover === 'dest' && (
                  <div>
                    <span className="font-bold text-emerald-400">Destination MAC (Recipient):</span> The switch glances ONLY at this address to decide which physical socket to shoot the electrons out of. If it recognizes Bob’s badge, it forwards the envelope to Bob’s port only.
                  </div>
                )}
                {envelopePartHover === 'src' && (
                  <div>
                    <span className="font-bold text-sky-400">Source MAC (Sender):</span> The return address. When this envelope arrives at the switch, the clerk immediately writes down: <em>"Port 1 = Alice!"</em> The switch learns where people sit simply by watching who sends mail!
                  </div>
                )}
                {envelopePartHover === 'type' && (
                  <div>
                    <span className="font-bold text-amber-400">EtherType (Payload Type):</span> Identifies the language inside. `0x0800` means IPv4 internet data. `0x0806` means ARP discovery. This tells the recipient computer which software process to hand the letter to.
                  </div>
                )}
                {envelopePartHover === 'payload' && (
                  <div>
                    <span className="font-bold text-indigo-400">Payload (Data):</span> The actual human content — whether an email, photo, or spreadsheet. The Ethernet frame is just the shipping container carrying this payload from desk to switch.
                  </div>
                )}
                {envelopePartHover === 'fcs' && (
                  <div>
                    <span className="font-bold text-rose-400">Frame Check Sequence (FCS / CRC):</span> A mathematical wax seal. If electrical noise on the copper cable corrupted even a single zero or one, the math won't match, and the switch silently drops the ruined envelope.
                  </div>
                )}
                {!envelopePartHover && (
                  <div className="text-slate-400 italic">
                    💡 Hover your mouse or tap any box of the envelope above to see how network switches read it in milliseconds.
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStage('badges')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Badges</span>
                </button>

                <button
                  onClick={() => setCurrentStage('hub-vs-switch')}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Hub vs Switch (The Megaphone Hallway)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 3: HUB VS SWITCH (THE MEGAPHONE HALLWAY)                          */}
        {/* ======================================================================= */}
        {currentStage === 'hub-vs-switch' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                <Volume2 className="w-3.5 h-3.5" />
                <span>STAGE 3 · THE HISTORICAL EVOLUTION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Hub vs Switch: The Loud Megaphone vs The Smart Clerk
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Before modern switches existed, early networks used <strong>Hubs</strong>. 
                Experience why hubs turned offices into screaming, colliding traffic jams, and why switches revolutionized computing.
              </p>
            </div>

            {/* Toggle Hub vs Switch */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setComparisonDevice('hub');
                  setIsHallwaySending(false);
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  comparisonDevice === 'hub'
                    ? 'bg-rose-500/10 border-rose-500/60 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/30'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase">ANCIENT TECHNOLOGY (1990s)</span>
                  <Volume2 className="w-4 h-4 text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-white mt-1">The Dumb Hub (Megaphone)</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Has no brain or memory. Shouts every single message out of every port to everyone.
                </p>
              </button>

              <button
                onClick={() => {
                  setComparisonDevice('switch');
                  setIsHallwaySending(false);
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  comparisonDevice === 'switch'
                    ? 'bg-emerald-500/10 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">MODERN STANDARD</span>
                  <Cpu className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mt-1">The Smart Switch (Clerk)</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Has a clipboard (CAM table). Delivers letters directly and privately to the exact desk port.
                </p>
              </button>
            </div>

            {/* Interactive Simulation Arena */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Simulation: Alice is sending a confidential financial memo to Bob</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {comparisonDevice === 'hub'
                      ? 'Watch what happens when connected through a Dumb Hub...'
                      : 'Watch how the Smart Switch protects privacy and bandwidth...'}
                  </p>
                </div>

                <button
                  onClick={() => setIsHallwaySending(!isHallwaySending)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md ${
                    comparisonDevice === 'hub'
                      ? 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-rose-500/20'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isHallwaySending ? 'Reset Test' : 'Test Transmission'}</span>
                </button>
              </div>

              {/* The Hallway Desks Layout */}
              <div className="relative p-6 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden min-h-[260px] flex flex-col justify-between">
                {/* Center Central Box (Hub or Switch) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-xl transition-all ${
                      comparisonDevice === 'hub'
                        ? 'bg-rose-950/80 border-rose-500 text-rose-400 ring-4 ring-rose-500/20'
                        : 'bg-emerald-950/80 border-emerald-500 text-emerald-400 ring-4 ring-emerald-500/20'
                    }`}
                  >
                    {comparisonDevice === 'hub' ? <Volume2 className="w-8 h-8" /> : <Cpu className="w-8 h-8" />}
                  </div>
                  <span className="text-xs font-bold text-white mt-1.5">
                    {comparisonDevice === 'hub' ? 'Dumb Hub' : 'Smart Switch'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {comparisonDevice === 'hub' ? 'Zero Memory (Repeater)' : 'CAM Memory Enabled'}
                  </span>
                </div>

                {/* 4 Desks in the Corners */}
                <div className="grid grid-cols-2 gap-y-16 gap-x-32 sm:gap-x-48 z-0">
                  {/* Alice (Sender) */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400 text-xl flex items-center justify-center shrink-0">
                      👩‍💼
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Alice (Port 1)</div>
                      <span className="text-[10px] font-mono text-sky-400">Sender</span>
                    </div>
                  </div>

                  {/* Bob (Intended Target) */}
                  <div className="flex items-center gap-3 justify-end text-right">
                    <div>
                      <div className="text-xs font-bold text-white">Bob (Port 2)</div>
                      <span className="text-[10px] font-mono text-emerald-400">Intended Target</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 text-xl flex items-center justify-center shrink-0">
                      👨‍💼
                    </div>
                  </div>

                  {/* Carol (HR Bystander) */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl border text-xl flex items-center justify-center shrink-0 transition-all ${
                        isHallwaySending && comparisonDevice === 'hub'
                          ? 'bg-rose-500/30 border-rose-500 animate-pulse'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      👩‍💻
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Carol (Port 3)</div>
                      <span className="text-[10px] text-slate-400">HR Bystander</span>
                    </div>
                  </div>

                  {/* Dave (Sales Bystander) */}
                  <div className="flex items-center gap-3 justify-end text-right">
                    <div>
                      <div className="text-xs font-bold text-white">Dave (Port 4)</div>
                      <span className="text-[10px] text-slate-400">Sales Bystander</span>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-xl border text-xl flex items-center justify-center shrink-0 transition-all ${
                        isHallwaySending && comparisonDevice === 'hub'
                          ? 'bg-rose-500/30 border-rose-500 animate-pulse'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      👨‍💻
                    </div>
                  </div>
                </div>

                {/* Animated Transmission Signals */}
                {isHallwaySending && (
                  <div className="mt-4 p-3 rounded-xl border text-xs text-center animate-in fade-in duration-200">
                    {comparisonDevice === 'hub' ? (
                      <div className="bg-rose-500/20 border-rose-500/40 text-rose-200 font-semibold space-y-1">
                        <div className="flex items-center justify-center gap-1.5 text-rose-300">
                          <Volume2 className="w-4 h-4 animate-bounce" />
                          <span>MEGAPHONE BROADCAST COLLISION HAZARD!</span>
                        </div>
                        <p className="text-[11px] text-rose-300/90 font-normal">
                          The Hub repeated Alice’s message to <strong>Bob, Carol, AND Dave</strong> simultaneously! 
                          Carol and Dave’s network cards were forced to process data they didn’t request, wasting bandwidth and leaking private data.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-emerald-500/20 border-emerald-500/40 text-emerald-200 font-semibold space-y-1">
                        <div className="flex items-center justify-center gap-1.5 text-emerald-300">
                          <ShieldCheck className="w-4 h-4" />
                          <span>PINPOINT UNICAST DELIVERY!</span>
                        </div>
                        <p className="text-[11px] text-emerald-300/90 font-normal">
                          The Switch consulted its CAM clipboard: <em>"Bob is on Port 2"</em>. 
                          The message flew <strong>directly to Bob only</strong>! Carol and Dave’s cables stayed 100% silent and free for other work.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Comparison Summary Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-rose-400 block">The Hub (Single Shared Collision Domain)</span>
                  <ul className="text-slate-400 space-y-1 text-[11px] list-disc list-inside">
                    <li>Only 1 computer can talk at a time; otherwise signals smash into each other</li>
                    <li>Operates at Layer 1 (Physical electrical repeater)</li>
                    <li>Security risk: Anyone can run a packet sniffer and read everything</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 block">The Switch (Dedicated Microsegmentation)</span>
                  <ul className="text-slate-400 space-y-1 text-[11px] list-disc list-inside">
                    <li>Every port gets its own dedicated, private collision domain</li>
                    <li>Operates at Layer 2 (Data Link · Inspects MAC headers)</li>
                    <li>Full Duplex: Alice can send to Bob while Carol talks to Dave at full gigabit speed</li>
                  </ul>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStage('envelope')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Envelope</span>
                </button>

                <button
                  onClick={() => setCurrentStage('postroom-learning')}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: The Postroom Clerk Simulation (Interactive)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 4: THE POSTROOM CLERK (INTERACTIVE CAM LEARNING SIMULATION)        */}
        {/* ======================================================================= */}
        {currentStage === 'postroom-learning' && (
          <div className="w-full max-w-5xl space-y-6 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <Cpu className="w-3.5 h-3.5" />
                <span>STAGE 4 · CORE SWITCHING LOGIC</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                The Postroom Clerk: How a Switch Builds its Memory
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                When a brand-new switch powers on, it knows <strong>nothing</strong>. It doesn’t know who sits at Port 1, 2, 3, or 4. 
                Step through the 4-beat journey to watch the switch learn and build its <strong>CAM Table</strong> in real time!
              </p>
            </div>

            {/* Stepper Bar */}
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { step: 1, title: '1. Empty Clipboard', desc: 'Power-on Tabula Rasa' },
                { step: 2, title: '2. Alice Sends', desc: 'Learns Port 1 = Alice' },
                { step: 3, title: '3. Polite Roll-Call', desc: 'Unknown Unicast Flooding' },
                { step: 4, title: '4. Bob Replies', desc: 'Learns Bob & Direct Unicast' },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    simStep === s.step
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold ring-1 ring-emerald-500/30'
                      : simStep > s.step
                      ? 'bg-slate-900 border-slate-700/60 text-slate-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold">{s.title}</div>
                  <div className="text-[10px] text-slate-400 hidden sm:block mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>

            {/* Main Interactive Stage Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Cols: The Interactive Star Topology Canvas */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Floor 2 Star Topology Switch
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">
                    Step {simStep} of 4
                  </span>
                </div>

                {/* SVG Visual Network Topology */}
                <div className="relative h-72 sm:h-80 bg-slate-950 rounded-2xl border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
                  {/* Central Switch Box */}
                  <div className="z-10 flex flex-col items-center text-center p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/50 shadow-2xl shadow-emerald-500/10">
                    <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                      <Cpu className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-white mt-1.5">Core Switch A</span>
                    <span className="text-[9px] font-mono text-emerald-400">The Postroom Clerk</span>
                  </div>

                  {/* Connecting Cables SVG overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    {/* Top Left: Alice (Port 1) */}
                    <line
                      x1="22%"
                      y1="22%"
                      x2="45%"
                      y2="45%"
                      stroke={simStep >= 2 ? '#38bdf8' : '#334155'}
                      strokeWidth="3"
                      strokeDasharray={simStep === 2 ? '4 4' : 'none'}
                    />
                    {/* Bottom Left: Bob (Port 2) */}
                    <line
                      x1="22%"
                      y1="78%"
                      x2="45%"
                      y2="55%"
                      stroke={simStep >= 3 ? '#34d399' : '#334155'}
                      strokeWidth="3"
                      strokeDasharray={simStep === 3 || simStep === 4 ? '4 4' : 'none'}
                    />
                    {/* Top Right: Carol (Port 3) */}
                    <line
                      x1="78%"
                      y1="22%"
                      x2="55%"
                      y2="45%"
                      stroke={simStep === 3 ? '#f43f5e' : '#334155'}
                      strokeWidth="2"
                    />
                    {/* Bottom Right: Dave (Port 4) */}
                    <line
                      x1="78%"
                      y1="78%"
                      x2="55%"
                      y2="55%"
                      stroke={simStep === 3 ? '#f43f5e' : '#334155'}
                      strokeWidth="2"
                    />
                  </svg>

                  {/* 4 Workstation Corners */}
                  {/* Alice - Port 1 (Top Left) */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/90 border border-sky-500/40 p-2.5 rounded-xl shadow-md">
                    <span className="text-lg">👩‍💼</span>
                    <div>
                      <div className="text-xs font-bold text-white">Alice</div>
                      <div className="text-[9px] font-mono text-sky-400">Port 1 · AA:AA:01</div>
                    </div>
                  </div>

                  {/* Bob - Port 2 (Bottom Left) */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-slate-900/90 border border-emerald-500/40 p-2.5 rounded-xl shadow-md">
                    <span className="text-lg">👨‍💼</span>
                    <div>
                      <div className="text-xs font-bold text-white">Bob</div>
                      <div className="text-[9px] font-mono text-emerald-400">Port 2 · BB:BB:02</div>
                    </div>
                  </div>

                  {/* Carol - Port 3 (Top Right) */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-slate-900/90 border border-slate-700 p-2.5 rounded-xl shadow-md">
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">Carol</div>
                      <div className="text-[9px] font-mono text-slate-400">Port 3 · CC:CC:03</div>
                    </div>
                    <span className="text-lg">👩‍💻</span>
                  </div>

                  {/* Dave - Port 4 (Bottom Right) */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-slate-900/90 border border-slate-700 p-2.5 rounded-xl shadow-md">
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">Dave</div>
                      <div className="text-[9px] font-mono text-slate-400">Port 4 · DD:DD:04</div>
                    </div>
                    <span className="text-lg">👨‍💻</span>
                  </div>

                  {/* Dynamic Floating Envelope Banner */}
                  {animationPacket && (
                    <div className="absolute bottom-16 px-4 py-1.5 rounded-full bg-slate-900/95 border border-amber-400/80 text-amber-300 text-xs font-mono shadow-xl flex items-center gap-2 animate-bounce z-20">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>{animationPacket.from} ➔ {animationPacket.to}</span>
                    </div>
                  )}
                </div>

                {/* Simulation Step Action Controls */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={handleResetSim}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Clipboard</span>
                  </button>

                  {simStep < 4 ? (
                    <button
                      onClick={handleNextSimStep}
                      className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>
                        {simStep === 1 && '▶ Step 2: Alice sends envelope to Bob'}
                        {simStep === 2 && '▶ Step 3: Clerk floods (Unknown Unicast)'}
                        {simStep === 3 && '▶ Step 4: Bob replies back to Alice'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>4-Step Cycle Complete! Full Unicast achieved.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right 5 Cols: The Switch's Real Clipboard (CAM Table) */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                      Switch Clipboard (CAM Table)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    mac-address-table
                  </span>
                </div>

                {/* The CAM Table Entries */}
                <div className="space-y-2">
                  <div className="grid grid-cols-12 text-[10px] font-mono uppercase text-slate-400 px-3 py-1 border-b border-slate-800">
                    <span className="col-span-2">Port</span>
                    <span className="col-span-6">MAC Address</span>
                    <span className="col-span-4 text-right">Learned Owner</span>
                  </div>

                  {camTable.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400 bg-slate-950 rounded-xl border border-dashed border-slate-800">
                      <div className="text-2xl mb-1">📋</div>
                      <strong>Clipboard is completely empty!</strong>
                      <p className="text-[11px] text-slate-400 mt-1">
                        The switch does not guess. It only learns when someone talks. Click "Step 2" to begin.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {camTable.map((entry) => (
                        <div
                          key={entry.port}
                          className="grid grid-cols-12 items-center p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs font-mono animate-in fade-in duration-300 shadow-sm"
                        >
                          <span className="col-span-2 font-bold text-white bg-slate-800 px-2 py-0.5 rounded text-center">
                            Fa0/{entry.port}
                          </span>
                          <span className="col-span-6 text-emerald-400 font-bold truncate">
                            {entry.mac}
                          </span>
                          <span className="col-span-4 text-right text-slate-300 text-[11px] truncate">
                            {entry.name.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Postroom Activity Log */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Clerk's Internal Action Log
                  </span>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] space-y-2 max-h-40 overflow-y-auto font-mono text-slate-300">
                    {postroomLog.map((log, i) => (
                      <div key={i} className="leading-snug">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Golden switching rule */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">The Golden Rule:</strong> Switches inspect the <strong>SOURCE</strong> MAC address to learn, and the <strong>DESTINATION</strong> MAC address to forward!
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStage('hub-vs-switch')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Hub vs Switch</span>
              </button>

              <button
                onClick={() => setCurrentStage('ghost-printer')}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Next: Solve Workplace Incident (The Silent Printer)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 5: WORKPLACE TICKET (THE SILENT PRINTER ON PORT 4)                 */}
        {/* ======================================================================= */}
        {currentStage === 'ghost-printer' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>TICKET #1004 · TECHNOVA IT SERVICE DESK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Workplace Ticket: The Ghost Printer on Port 4
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Apply your new understanding of MAC address learning to diagnose a real IT problem that trips up 
                thousands of junior technicians.
              </p>
            </div>

            {/* The Incident Briefing Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              {/* Ticket header metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Marketing cannot reach the new HP Color LaserJet
                    </h3>
                    <span className="text-xs text-slate-400">
                      Reported by Dave (Marketing / Sales) · Priority: Medium
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Status: Open & Unresolved
                </span>
              </div>

              {/* The Junior Technician's Trap */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <HelpCircle className="w-4 h-4" />
                  <span>The Junior Technician's Note:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  “I plugged the new printer into Switch Port 4 and turned the power on. The green link light is ON. 
                  However, when I run <span className="text-emerald-400">show mac address-table</span> on the switch, 
                  <strong> Port 4 is completely blank!</strong> The switch doesn’t know it exists. Should we return the printer as defective?”
                </p>
              </div>

              {/* The Interactive Diagnosis Arena */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Switch Port 4 Hardware State</span>
                  <span className={printerTicketSolved ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {printerTicketSolved ? '✓ MAC RECORDED IN CAM' : '⚠️ SILENT HOST (0 FRAMES SENT)'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4 border-y border-slate-800">
                  {/* Switch Port 4 */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400">
                      <Cpu className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-white">Switch Port Fa0/4</span>
                    <span className="text-[10px] font-mono text-emerald-400">Link: Physical UP</span>
                  </div>

                  {/* The Cable with Traffic Indicator */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 sm:w-16 h-1 rounded-full bg-emerald-500" />
                      <div
                        className={`p-2 rounded-full border transition-all ${
                          printerSentTraffic
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 animate-bounce'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="w-10 sm:w-16 h-1 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {printerSentTraffic ? 'Traffic flowing!' : 'Zero frames sent yet'}
                    </span>
                  </div>

                  {/* HP Printer */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all ${
                        printerTicketSolved
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      <Printer className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-white">HP Color LaserJet</span>
                    <span className="text-[10px] font-mono text-slate-400">00:1E:8C:PR:00:04</span>
                  </div>
                </div>

                {/* The "Aha!" realization & Fix Action */}
                <div className="space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Remember the Golden Rule:</strong> The switch’s postroom clerk is <em>passive</em>. 
                    The switch does not scan ports; it only writes down a MAC address when the device <strong>sends an outgoing frame</strong>! 
                    Because the printer was silent after power-up, the switch has had nothing to read yet.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-emerald-400 font-mono">
                      Fix: Send a test announcement packet from the printer to populate the switch CAM table.
                    </span>

                    <button
                      onClick={handleWakeupPrinter}
                      disabled={printerTicketSolved}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                        printerTicketSolved
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{printerTicketSolved ? '✓ Traffic Sent & Table Learned' : '🖨️ Send Test Frame from Printer'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Resolution Feedback */}
              {printerTicketSolved && (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Ticket #1004 Resolved! CAM Table Successfully Populated!
                      </h4>
                      <p className="text-xs text-emerald-300">
                        The printer transmitted its initial gratuitous frame. Switch Port 4 inspected the source header and instantly recorded: 
                        <span className="font-mono font-bold text-white"> Port Fa0/4 = 00:1E:8C:PR:00:04</span>. 
                        Dave and the Marketing team can now print directly.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-mono text-emerald-400">
                      ✓ Day 02 Competency: Layer 2 Physical Addressing & Switch Learning Verified
                    </span>

                    <button
                      onClick={() => setCurrentStage('celebration')}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
                    >
                      <span>Complete Mission & Claim Day 02 Badge</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Lower Section Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStage('postroom-learning')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Postroom Simulation</span>
                </button>

                {printerTicketSolved && (
                  <button
                    onClick={() => setCurrentStage('celebration')}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Completion & Badges</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 6: CELEBRATION & BADGE CLAIM                                      */}
        {/* ======================================================================= */}
        {currentStage === 'celebration' && (
          <div className="w-full max-w-3xl space-y-6 text-center animate-in zoom-in-95 duration-400 py-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 text-4xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
              🏅
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                MISSION ACCOMPLISHED · DAY 02 COMPLETE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                You Mastered Physical Layer 2 & Switching!
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                You now possess the foundational intuition that separates true network engineers from people who merely memorize acronyms.
              </p>
            </div>

            {/* Recap Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  MAC Address = Factory Fingerprint
                </span>
                <p className="text-[11px] text-slate-400">
                  48 bits (6 hex bytes). First half identifies the manufacturer (OUI), second half is the unique device serial number.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Ethernet Frame = The Office Envelope
                </span>
                <p className="text-[11px] text-slate-400">
                  Transports packets across copper cables with Destination MAC, Source MAC, EtherType, and an FCS checksum wax seal.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Hubs Shout · Switches Learn
                </span>
                <p className="text-[11px] text-slate-400">
                  Hubs broadcast everything like loud megaphones. Switches maintain a CAM clipboard for private, dedicated microsegmentation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Learning is Passive
                </span>
                <p className="text-[11px] text-slate-400">
                  Switches learn source MACs exclusively when devices transmit frames. Silent devices remain invisible until they speak.
                </p>
              </div>
            </div>

            {/* Claim badge and return to journey button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setCurrentStage('ghost-printer')}
                className="w-full sm:w-auto px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Ticket</span>
              </button>

              <button
                onClick={() => onCompleteMission(day.id, null)}
                className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Save Progress & Return to Roadmap</span>
              </button>

              <button
                onClick={() => onCompleteMission(day.id, day.id + 1)}
                className="w-full sm:w-auto px-7 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-emerald-500/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Unlock & Launch Day 03 (IPv4)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
