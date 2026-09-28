import React, { useState, useEffect } from 'react';
import { DayCurriculum, ITTicket } from '../../types/curriculum';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Lightbulb,
  Building2,
  Check,
  HelpCircle,
  Globe,
  MapPin,
  Hash,
  Monitor,
  Terminal,
  Printer,
  Search,
  Binary,
  Zap,
  Info,
  Cpu,
  FlaskConical,
} from 'lucide-react';

interface Day03HumanExperienceProps {
  day: DayCurriculum;
  ticket?: ITTicket;
  onExitMission: () => void;
  onCompleteMission: (dayId: number, nextDayId?: number | null) => void;
}

type Stage = 'address' | 'city-map' | 'experiment' | 'incident' | 'celebration';

// ==========================================
// Stage 1 Data: IPv4 Octet Anatomy (/24)
// ==========================================
interface OctetInfo {
  index: number;
  decimal: number;
  binary: string;
  portion: 'network' | 'host';
  humanLabel: string;
  humanRole: string;
  analogy: string;
}

const IP_OCTETS: OctetInfo[] = [
  {
    index: 0,
    decimal: 192,
    binary: '11000000',
    portion: 'network',
    humanLabel: 'City',
    humanRole: 'Region of the city',
    analogy:
      'Like the district of a city. Every office in this whole area shares the leading 192 to keep the mailing system organized.',
  },
  {
    index: 1,
    decimal: 168,
    binary: '10101000',
    portion: 'network',
    humanLabel: 'Street',
    humanRole: 'Street name',
    analogy:
      'Like the street name on an envelope. Everyone living on this street shares the same 168 so the mail carrier knows which road to walk down.',
  },
  {
    index: 2,
    decimal: 1,
    binary: '00000001',
    portion: 'network',
    humanLabel: 'Building',
    humanRole: 'Exact building number',
    analogy:
      'The building number itself. Every desk on this Local Area Network shares 192.168.1 — this is what makes them "neighbors" who can talk directly through the switch.',
  },
  {
    index: 3,
    decimal: 10,
    binary: '00001010',
    portion: 'host',
    humanLabel: 'Apartment',
    humanRole: 'Unique unit inside the building',
    analogy:
      'Your apartment unit number. It must be unique inside the building — if two residents claim Apartment 10, mail (and peace) breaks down immediately.',
  },
];

// ==========================================
// Stage 2 Data: Address Space Classification
// ==========================================
type AddressClass = 'private' | 'public' | 'loopback' | 'apipa';

interface SortItem {
  address: string;
  correct: AddressClass;
  humanHint: string;
  explanation: string;
}

const SORT_ITEMS: SortItem[] = [
  {
    address: '192.168.1.10',
    correct: 'private',
    humanHint: "Priya's desk at TechNova",
    explanation:
      '192.168.0.0/16 is a classic RFC 1918 private range. It lives only inside your office walls — routers on the internet refuse to carry it.',
  },
  {
    address: '10.20.30.40',
    correct: 'private',
    humanHint: 'Backbone of a large enterprise',
    explanation:
      '10.0.0.0/8 is private too — the biggest RFC 1918 block. Giant companies use it to give millions of internal devices addresses that never touch the public internet.',
  },
  {
    address: '8.8.8.8',
    correct: 'public',
    humanHint: 'Google Public DNS resolver',
    explanation:
      'A public address. It is globally routable, unique in the world, and reachable from any connected device — that is exactly why Google can run DNS on it.',
  },
  {
    address: '127.0.0.1',
    correct: 'loopback',
    humanHint: 'Talking to yourself',
    explanation:
      'The loopback range 127.0.0.0/8 never leaves the machine. It is how a device tests its own TCP/IP stack — "can I still talk to myself?"',
  },
  {
    address: '169.254.12.5',
    correct: 'apipa',
    humanHint: 'Seen when DHCP goes silent',
    explanation:
      'APIPA (169.254.0.0/16). The OS shouted DHCP Discover but no server answered, so it self-assigned this address — internet access is now impossible.',
  },
  {
    address: '172.32.0.1',
    correct: 'public',
    humanHint: 'The classic exam trap',
    explanation:
      'Only 172.16.0.0 – 172.31.255.255 is private. 172.32 sits OUTSIDE that window, so it is a public address — a favorite trap on certification exams.',
  },
];

const CLASS_OPTIONS: { key: AddressClass; label: string }[] = [
  { key: 'private', label: 'Private (RFC 1918)' },
  { key: 'public', label: 'Public (Internet)' },
  { key: 'loopback', label: 'Loopback (Self)' },
  { key: 'apipa', label: 'APIPA (DHCP failed)' },
];

// ==========================================
// Stage 4 Data: Ticket #1005 Diagnosis
// ==========================================
const DIAGNOSIS_OPTIONS: { text: string; correct: boolean; feedback: string }[] = [
  {
    text: 'Her Ethernet cable is unplugged at Layer 1.',
    correct: false,
    feedback:
      'The link light is green and she can still reach other devices inside 192.168.2.x — Layer 1 is fine. The cable is not the culprit.',
  },
  {
    text: 'Her manually typed IP (192.168.2.10) put her in network 192.168.2.0 — a different building than the print server’s 192.168.1.0.',
    correct: true,
    feedback: '',
  },
  {
    text: 'The print server at 192.168.1.250 is offline or broken.',
    correct: false,
    feedback:
      'Her colleague sitting one desk away prints to 192.168.1.250 successfully right now — the server is alive and serving.',
  },
  {
    text: 'DNS is down, so the print server name cannot be resolved.',
    correct: false,
    feedback:
      'She is pinging the raw IP 192.168.1.250, not a hostname like print01.local. DNS is never consulted when you type the numbers directly.',
  },
];

export const Day03HumanExperience: React.FC<Day03HumanExperienceProps> = ({
  day,
  onExitMission,
  onCompleteMission,
}) => {
  const [currentStage, setCurrentStage] = useState<Stage>('address');

  // Stage 1: Address Anatomy State
  const [addressView, setAddressView] = useState<'human' | 'engineer'>('human');
  const [selectedOctet, setSelectedOctet] = useState<number>(2);

  // Stage 2: Classification Game State
  const [classAnswers, setClassAnswers] = useState<Record<number, AddressClass>>({});
  const [classRevealed, setClassRevealed] = useState<Record<number, boolean>>({});

  // Stage 3: Prediction + Ping Lab State
  const [predictionIndex, setPredictionIndex] = useState<number | null>(null);
  const [predictionCorrect, setPredictionCorrect] = useState<boolean | null>(null);
  const [pcAThirdOctet, setPcAThirdOctet] = useState<number>(1);
  const [pingLog, setPingLog] = useState<string[]>([]);
  const [pingNarration, setPingNarration] = useState<string[]>([]);
  const [pingScript, setPingScript] = useState<string[]>([]);
  const [pingRunning, setPingRunning] = useState(false);
  const [hasRunPing, setHasRunPing] = useState(false);
  const [lastPingFailed, setLastPingFailed] = useState<boolean | null>(null);

  // Stage 4: Incident Ticket State
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<number | null>(null);
  const [diagnosisFeedback, setDiagnosisFeedback] = useState<string | null>(null);
  const [diagnosisSolved, setDiagnosisSolved] = useState(false);
  const [ipFixed, setIpFixed] = useState(false);
  const [verified, setVerified] = useState(false);

  // Mentor drawer
  const [showMentorTip, setShowMentorTip] = useState(false);

  // Stages configuration
  const stages: { id: Stage; number: string; title: string; subtitle: string }[] = [
    { id: 'address', number: '1', title: 'The Apartment Address', subtitle: 'Anatomy of a 32-bit IPv4 address' },
    { id: 'city-map', number: '2', title: 'Public vs Private Streets', subtitle: 'RFC 1918, loopback & APIPA spaces' },
    { id: 'experiment', number: '3', title: 'The Split-Building Ping', subtitle: 'Predict, experiment, observe' },
    { id: 'incident', number: '4', title: 'Workplace Ticket', subtitle: 'Diagnose the unreachable print server' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.id === currentStage);

  // ==========================================
  // Stage 2: Classification Handlers
  // ==========================================
  const classCorrectCount = SORT_ITEMS.filter((_, i) => classRevealed[i]).length;
  const allClassified = classCorrectCount === SORT_ITEMS.length;

  const handleClassify = (itemIndex: number, choice: AddressClass) => {
    if (classRevealed[itemIndex]) return;
    setClassAnswers((prev) => ({ ...prev, [itemIndex]: choice }));
    if (choice === SORT_ITEMS[itemIndex].correct) {
      setClassRevealed((prev) => ({ ...prev, [itemIndex]: true }));
    }
  };

  // ==========================================
  // Stage 3: Prediction Handler
  // ==========================================
  const handlePredict = (index: number) => {
    setPredictionIndex(index);
    setPredictionCorrect(index === day.experimentPrompt.correctAnswerIndex);
  };

  // ==========================================
  // Stage 3: Ping Lab Engine
  // ==========================================
  const buildPingRun = () => {
    const sameBuilding = pcAThirdOctet === 1;
    const pcAIp = `192.168.${pcAThirdOctet}.10`;

    if (sameBuilding) {
      return {
        success: true,
        consoleLines: [
          'C:\\Users\\desk> ping 192.168.1.20',
          '',
          'Pinging 192.168.1.20 with 32 bytes of data:',
          'Reply from 192.168.1.20: bytes=32 time<1ms TTL=128',
          'Reply from 192.168.1.20: bytes=32 time<1ms TTL=128',
          'Reply from 192.168.1.20: bytes=32 time<1ms TTL=128',
          'Reply from 192.168.1.20: bytes=32 time<1ms TTL=128',
          '',
          'Ping statistics for 192.168.1.20:',
          '    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),',
        ],
        narration: [
          `PC-A reads its own address ${pcAIp}/24 → network portion 192.168.1.0. PC-B (192.168.1.20) lives in the SAME network. Same building → direct delivery.`,
          'ARP whispers "Who is 192.168.1.20?" — PC-B answers with its MAC address (the Day 02 badge logic, reused here).',
          'The switch reads the destination MAC and delivers the frame straight to PC-B. All 4 echo replies come home: 0% loss.',
        ],
      };
    }

    return {
      success: false,
      consoleLines: [
        'C:\\Users\\desk> ping 192.168.1.20',
        '',
        'Pinging 192.168.1.20 with 32 bytes of data:',
        'Request timed out.',
        'Request timed out.',
        'Request timed out.',
        'Request timed out.',
        '',
        'Ping statistics for 192.168.1.20:',
        '    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss),',
      ],
      narration: [
        `PC-A reads ${pcAIp}/24 → its network portion is 192.168.2.0, but PC-B lives in 192.168.1.0. DIFFERENT buildings.`,
        'Same-building rule broken: PC-A must hand the packet to a router (gateway 192.168.1.1) — yet that gateway is not inside its 192.168.2.0 neighborhood, and this lab has no router at all.',
        'With no Layer 3 device bridging 192.168.2.0 and 192.168.1.0, every echo dies on the way out: 100% packet loss.',
      ],
    };
  };

  const handleRunPing = () => {
    if (pingRunning) return;
    const run = buildPingRun();
    setPingLog([]);
    setPingNarration(run.narration);
    setPingScript(run.consoleLines);
    setLastPingFailed(!run.success);
    setHasRunPing(true);
    setPingRunning(true);
  };

  const handleResetPing = () => {
    setPingLog([]);
    setPingNarration([]);
    setPingScript([]);
    setPingRunning(false);
    setLastPingFailed(null);
  };

  // Stream console lines one by one while a ping run is active
  useEffect(() => {
    if (!pingRunning || pingScript.length === 0) return;
    let cursor = 0;
    const timer = setInterval(() => {
      cursor += 1;
      setPingLog(pingScript.slice(0, cursor));
      if (cursor >= pingScript.length) {
        clearInterval(timer);
        setPingRunning(false);
      }
    }, 320);
    return () => clearInterval(timer);
  }, [pingRunning, pingScript]);

  // ==========================================
  // Stage 4: Incident Handlers
  // ==========================================
  const handleDiagnose = (index: number) => {
    if (diagnosisSolved) return;
    setSelectedDiagnosis(index);
    const option = DIAGNOSIS_OPTIONS[index];
    if (option.correct) {
      setDiagnosisSolved(true);
      setDiagnosisFeedback(null);
    } else {
      setDiagnosisFeedback(option.feedback);
    }
  };

  const handleApplyFix = () => setIpFixed(true);
  const handleVerifyFix = () => setVerified(true);

  // Console line colorization helper
  const consoleLineClass = (line: string) => {
    if (line.startsWith('Reply from')) return 'text-emerald-400';
    if (line.includes('timed out')) return 'text-rose-400';
    if (line.startsWith('    Packets')) return 'text-sky-400';
    if (line.includes('>') || line.startsWith('Pinging')) return 'text-slate-200 font-bold';
    return 'text-slate-400';
  };

  const selectedOctetInfo = IP_OCTETS[selectedOctet];
  const pcAIp = `192.168.${pcAThirdOctet}.10`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. TOP BAR: Orientation, Exit & Mentor                                   */}
      {/* ========================================================================= */}
      <header className="h-16 px-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitMission}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Mission</span>
          </button>

          <div className="hidden sm:block border-l border-slate-800 pl-3">
            <span className="font-mono text-[11px] text-sky-400 font-bold block uppercase tracking-wider">
              DAY 03 · LOGICAL ADDRESSING
            </span>
            <span className="text-xs font-bold text-white block">
              The Apartment Address: IPv4 &amp; Where Devices Live
            </span>
          </div>
        </div>

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

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA (4 STAGES + CELEBRATION)                            */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">

        {/* Senior Mentor Tip Overlay */}
        {showMentorTip && (
          <div className="fixed top-16 inset-x-0 z-40 bg-amber-950/95 border-b border-amber-500/30 px-6 py-3 flex items-start justify-between gap-4 text-xs text-amber-200 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-3 max-w-4xl">
              <span className="text-xl">🧙‍♂️</span>
              <div>
                <p className="font-bold text-amber-300">Senior Network Architect Mentor Note:</p>
                <p className="mt-0.5 text-amber-200/90 leading-relaxed">
                  “An <strong>IPv4 address</strong> is a mailing address you can change:{' '}
                  <span className="font-mono font-bold text-white">192.168.1.10</span> — the front part{' '}
                  <span className="font-mono font-bold text-sky-300">192.168.1</span> is your street &amp; building (the{' '}
                  <strong>Network ID</strong>) that every device on your floor shares, and the last number{' '}
                  <span className="font-mono font-bold text-amber-300">.10</span> is your apartment unit (the{' '}
                  <strong>Host ID</strong>). Devices talk directly only when they live in the SAME building — to cross buildings you
                  need a router: the mail sorting office. Your Day 02 MAC badge was the permanent fingerprint; this address is the
                  temporary location.”
                </p>
              </div>
            </div>
            <button onClick={() => setShowMentorTip(false)} className="text-amber-400 hover:text-amber-200 font-bold px-2 py-1">
              ✕
            </button>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 1: THE APARTMENT ADDRESS (IPv4 ANATOMY)                           */}
        {/* ======================================================================= */}
        {currentStage === 'address' && (
          <div className="w-full max-w-5xl space-y-6 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
                <Hash className="w-3.5 h-3.5" />
                <span>PHASE 1 · DAY 03 · LOGICAL ADDRESSING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                The Apartment Address: What is an IPv4 Address?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Yesterday you met the MAC address — a fingerprint burned into silicon. But fingerprints cannot be sorted, mapped, or
                routed across a city. Networks need <strong>logical locations</strong> you can look up and deliver to: the{' '}
                <strong>IPv4 Address</strong>.
              </p>
            </div>

            {/* Human / Engineer Mode Switcher */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setAddressView('human')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer font-mono ${
                  addressView === 'human'
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🏠 Human Mailing Label
              </button>
              <button
                onClick={() => setAddressView('engineer')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer font-mono ${
                  addressView === 'engineer'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚡ Network Engineer View (Binary)
              </button>
            </div>

            {/* The Interactive Address Display */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  {addressView === 'human' ? 'MAILING LABEL · TECHNOVA OFFICE NETWORK' : 'IPv4 DOTTED-QUAD · 32 BITS TOTAL'}
                </span>
                <span className="text-[11px] font-mono text-sky-400">
                  {addressView === 'human' ? 'Click any box to inspect its role' : 'Click any box to inspect its bits'}
                </span>
              </div>

              {/* 4 Octet Cards with dots */}
              <div className="flex flex-wrap items-stretch justify-center gap-1.5 sm:gap-2">
                {IP_OCTETS.map((octet, i) => {
                  const isSelected = selectedOctet === octet.index;
                  const isNetwork = octet.portion === 'network';
                  return (
                    <React.Fragment key={octet.index}>
                      <button
                        onClick={() => setSelectedOctet(octet.index)}
                        className={`min-w-[92px] sm:min-w-[132px] p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? isNetwork
                              ? 'bg-sky-500/20 border-sky-400 ring-1 ring-sky-400'
                              : 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400'
                            : isNetwork
                              ? 'bg-sky-500/10 border-sky-500/30 hover:border-sky-400/60'
                              : 'bg-amber-500/10 border-amber-500/30 hover:border-amber-400/60'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                          <span className={isNetwork ? 'text-sky-400' : 'text-amber-400'}>OCTET {i + 1}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded ${
                              isNetwork ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {isNetwork ? 'NETWORK' : 'HOST'}
                          </span>
                        </div>

                        {addressView === 'human' ? (
                          <>
                            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1.5">{octet.decimal}</div>
                            <div className="text-[11px] text-slate-300 mt-0.5 font-semibold">{octet.humanLabel}</div>
                            <div className="text-[10px] text-slate-500">{octet.humanRole}</div>
                          </>
                        ) : (
                          <>
                            <div className="text-lg sm:text-xl font-extrabold text-white font-mono mt-1.5 tracking-tight">
                              {octet.binary}
                            </div>
                            <div className="text-[11px] text-slate-300 mt-0.5 font-mono">= {octet.decimal}</div>
                            <div className="text-[10px] text-slate-500">8 bits · 0 – 255</div>
                          </>
                        )}
                      </button>

                      {i < IP_OCTETS.length - 1 && (
                        <div className="flex items-center text-2xl font-bold text-slate-600 px-0.5">.</div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Network / Host Brackets */}
              <div className="grid grid-cols-12 gap-2 text-center">
                <div className="col-span-9 p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30">
                  <div className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                    Network ID — Street &amp; Building · 24 bits (/24)
                  </div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">192.168.1 · everyone here shares this</div>
                </div>
                <div className="col-span-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Host ID · 8 bits</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">.10 · unique</div>
                </div>
              </div>

              {/* 32-Bit Strip */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    The full 32-bit binary form
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">4 × 8 bits = 32 bits</span>
                </div>
                <div className="flex flex-wrap items-center gap-1 justify-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                  {IP_OCTETS.map((octet, i) => (
                    <React.Fragment key={octet.index}>
                      <div className="flex gap-0.5">
                        {octet.binary.split('').map((bit, bi) => (
                          <span
                            key={bi}
                            className={`w-4 h-5 rounded-[3px] flex items-center justify-center text-[9px] font-mono font-bold ${
                              octet.portion === 'network'
                                ? 'bg-sky-500/25 text-sky-200 border border-sky-500/40'
                                : 'bg-amber-500/25 text-amber-200 border border-amber-500/40'
                            }`}
                          >
                            {bit}
                          </span>
                        ))}
                      </div>
                      {i < IP_OCTETS.length - 1 && <span className="text-slate-600 font-bold text-xs mx-0.5">.</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Octet Deep-Dive Panel */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                selectedOctetInfo.portion === 'network'
                  ? 'bg-sky-500/5 border-sky-500/30'
                  : 'bg-amber-500/5 border-amber-500/30'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      selectedOctetInfo.portion === 'network' ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    <Binary className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      Octet {selectedOctetInfo.index + 1} = {selectedOctetInfo.decimal}
                      <span className="text-slate-500 font-mono font-normal"> · {selectedOctetInfo.binary}</span>
                    </span>
                    <span
                      className={`text-[11px] font-mono font-bold ${
                        selectedOctetInfo.portion === 'network' ? 'text-sky-400' : 'text-amber-400'
                      }`}
                    >
                      {selectedOctetInfo.portion === 'network'
                        ? 'NETWORK PORTION — shared by the whole building'
                        : 'HOST PORTION — unique to this device'}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono ${
                    selectedOctetInfo.portion === 'network'
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {selectedOctetInfo.humanLabel}: {selectedOctetInfo.humanRole}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedOctetInfo.analogy}</p>
            </div>

            {/* Golden Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-400" />
                  32 Bits in 4 Octets
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Each octet is 8 bits valued 0–255, separated by dots. 4 × 8 = 32 bits — the whole IPv4 space holds about 4.3
                  billion combinations.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-400" />
                  Network = Street · Host = Apartment
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Devices speak directly through a switch only when their network portions match — and no two devices in the same
                  building may share a host portion (duplicate IP conflicts).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-400" />
                  Why Not Just Use MAC?
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  A MAC (Day 02) is a hardware fingerprint with no global structure — routers cannot summarize or route it. IP is a
                  structured, sortable location that changes whenever you move networks.
                </p>
              </div>
            </div>

            {/* Forward button to Stage 2 */}
            <div className="pt-1 flex justify-end">
              <button
                onClick={() => setCurrentStage('city-map')}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-sky-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Next: Public vs Private Streets</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 2: PUBLIC VS PRIVATE STREETS (ADDRESS SPACES)                     */}
        {/* ======================================================================= */}
        {currentStage === 'city-map' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>STAGE 2 · ADDRESS SPACES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Public vs Private Streets: Where Do Addresses Live?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Not every mailing address may roam the globe. Networks carve the IPv4 space into{' '}
                <strong className="text-violet-300">private neighborhoods</strong> (internal only),{' '}
                <strong className="text-sky-300">public streets</strong> (globally routed), plus two special zones. Classify all
                six addresses below — wrong guesses reveal a clue, so keep sorting.
              </p>
            </div>

            {/* Sorting Progress */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 uppercase tracking-wider font-bold">Sorting Progress</span>
                <span className="text-emerald-400 font-bold">
                  {classCorrectCount} / {SORT_ITEMS.length} correctly classified
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${(classCorrectCount / SORT_ITEMS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Classification Cards */}
            <div className="space-y-3">
              {SORT_ITEMS.map((item, idx) => {
                const revealed = classRevealed[idx];
                const chosen = classAnswers[idx];
                const wrongPick = !revealed && chosen !== undefined;
                return (
                  <div
                    key={item.address}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      revealed
                        ? 'bg-emerald-500/5 border-emerald-500/40'
                        : wrongPick
                          ? 'bg-rose-500/5 border-rose-500/40'
                          : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-extrabold text-white font-mono">{item.address}</span>
                        <span className="text-[11px] text-slate-400 italic">{item.humanHint}</span>
                      </div>
                      {revealed && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          ✓ Correct
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CLASS_OPTIONS.map((option) => {
                        const isChosen = chosen === option.key;
                        const isAnswer = option.key === item.correct;
                        let btnClass =
                          'bg-slate-800/70 hover:bg-slate-700 text-slate-300 border border-slate-700/60';
                        if (revealed && isAnswer) {
                          btnClass = 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/60';
                        } else if (isChosen && !revealed) {
                          btnClass = 'bg-rose-500/20 text-rose-200 border border-rose-400/60';
                        }
                        return (
                          <button
                            key={option.key}
                            onClick={() => handleClassify(idx, option.key)}
                            disabled={revealed}
                            className={`px-2.5 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${btnClass}`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>

                    {(revealed || wrongPick) && (
                      <p
                        className={`mt-3 text-xs leading-relaxed ${
                          revealed ? 'text-emerald-300' : 'text-rose-300'
                        }`}
                      >
                        {revealed ? item.explanation : `Not quite — “${chosen}” doesn't fit. Look at the range once more and try again.`}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reference Cheat-Sheet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-violet-500/30 space-y-1">
                <span className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  Private · RFC 1918
                </span>
                <p className="text-[11px] font-mono text-white">10.0.0.0/8 · 172.16.0.0/12 · 192.168.0.0/16</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Inside-only neighborhoods. Internet routers refuse to carry them — free to assign, invisible from outside.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/30 space-y-1">
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  Public · The Global Streets
                </span>
                <p className="text-[11px] font-mono text-white">Everything else (8.8.8.8, 172.32.x.x…)</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Globally unique and routed planet-wide. You rent them from an ISP or registry — they are never truly free.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4" />
                  Loopback · Talking To Yourself
                </span>
                <p className="text-[11px] font-mono text-white">127.0.0.0/8 (127.0.0.1)</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  The OS answers internally without touching any cable — the classic "is my own TCP/IP stack alive?" test.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  APIPA · The Silent Alarm
                </span>
                <p className="text-[11px] font-mono text-white">169.254.0.0/16</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Self-assigned when DHCP never answers. Link-local only — no gateway, no internet, a red flag for technicians.
                </p>
              </div>
            </div>

            {/* Stage Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => setCurrentStage('address')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Address Anatomy</span>
              </button>

              {allClassified ? (
                <button
                  onClick={() => setCurrentStage('experiment')}
                  className="px-5 py-2.5 bg-violet-500 hover:bg-violet-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-violet-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: The Split-Building Ping Experiment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Info className="w-3.5 h-3.5" />
                  <span>Classify all 6 addresses to continue</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 3: THE SPLIT-BUILDING PING (GUIDED EXPERIMENT)                    */}
        {/* ======================================================================= */}
        {currentStage === 'experiment' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>STAGE 3 · GUIDED EXPERIMENT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                The Split-Building Ping: Predict, Then Prove It
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Engineers do not guess — they <strong>predict first, then test</strong>. Read the scenario, commit to an answer, and
                run the live simulation to see whether reality agrees with you.
              </p>
            </div>

            {/* Prediction Card (from curriculum experiment prompt) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <HelpCircle className="w-4 h-4" />
                <span className="font-mono uppercase tracking-wider">Step 1 · Make Your Prediction</span>
              </div>
              <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">{day.experimentPrompt.question}</p>

              <div className="space-y-2">
                {day.experimentPrompt.options.map((option, idx) => {
                  const isChosen = predictionIndex === idx;
                  const isAnswer = idx === day.experimentPrompt.correctAnswerIndex;
                  let btnClass = 'bg-slate-800/70 hover:bg-slate-700 border-slate-700/60 text-slate-300';
                  if (predictionCorrect === true && isChosen) {
                    btnClass = 'bg-emerald-500/15 border-emerald-400/60 text-emerald-200';
                  } else if (predictionCorrect === false && isChosen) {
                    btnClass = 'bg-rose-500/15 border-rose-400/60 text-rose-200';
                  } else if (predictionCorrect === false && isAnswer) {
                    btnClass = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePredict(idx)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${btnClass}`}
                    >
                      <span className="font-mono font-bold text-slate-500 shrink-0">{String.fromCharCode(65 + idx)}.</span>
                      <span className="leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {predictionCorrect !== null && (
                <div
                  className={`p-4 rounded-xl text-xs leading-relaxed ${
                    predictionCorrect
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-200'
                  }`}
                >
                  <span className="font-bold block mb-1">
                    {predictionCorrect ? '✓ Great instinct — now prove it below.' : '✗ Not quite — '}
                  </span>
                  {predictionCorrect
                    ? day.experimentPrompt.explanation
                    : 're-read the options and try again; the lab below will still confirm the answer.'}
                </div>
              )}
            </div>

            {/* Prediction gate: lab unlocks only after a correct prediction */}
            {predictionCorrect === true && (
              <div className="space-y-6">
                {/* Lab Controls & Topology */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      Step 2 · LIVE LAB: MOVE PC-A TO ANOTHER BUILDING
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">Target: ping 192.168.1.20 (PC-B)</span>
                  </div>

                  {/* Mini Topology */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
                    <div
                      className={`p-4 rounded-xl border space-y-1.5 ${
                        pcAThirdOctet === 1 ? 'bg-sky-500/10 border-sky-500/40' : 'bg-rose-500/10 border-rose-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Monitor className={`w-4 h-4 ${pcAThirdOctet === 1 ? 'text-sky-400' : 'text-rose-400'}`} />
                        <span className="text-xs font-bold text-white">PC-A (your machine)</span>
                      </div>
                      <p className="text-sm font-mono font-bold text-white">{pcAIp}</p>
                      <p className="text-[11px] font-mono text-slate-400">Mask 255.255.255.0 · GW 192.168.1.1</p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          pcAThirdOctet === 1 ? 'bg-sky-500/20 text-sky-300' : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        Network 192.168.{pcAThirdOctet}.0
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-1.5 text-center">
                      <Cpu className="w-5 h-5 text-violet-400" />
                      <span className="text-xs font-bold text-white">Floor Switch</span>
                      <span className="text-[10px] text-slate-500 font-mono">Layer 2 only — cannot cross buildings</span>
                    </div>

                    <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/40 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">PC-B (target)</span>
                      </div>
                      <p className="text-sm font-mono font-bold text-white">192.168.1.20</p>
                      <p className="text-[11px] font-mono text-slate-400">Mask 255.255.255.0</p>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                        Network 192.168.1.0
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">Set PC-A IP:</span>
                    <button
                      onClick={() => setPcAThirdOctet(1)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                        pcAThirdOctet === 1
                          ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      192.168.1.10 (same building)
                    </button>
                    <button
                      onClick={() => setPcAThirdOctet(2)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                        pcAThirdOctet === 2
                          ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      192.168.2.10 (different building)
                    </button>

                    <div className="flex-1" />

                    <button
                      onClick={handleResetPing}
                      disabled={pingRunning || pingLog.length === 0}
                      className="px-3 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                    <button
                      onClick={handleRunPing}
                      disabled={pingRunning}
                      className="px-5 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{pingRunning ? 'Pinging…' : 'Run: ping 192.168.1.20'}</span>
                    </button>
                  </div>
                </div>

                {/* Console + Narration */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* CMD Console */}
                  <div className="bg-black border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-mono text-slate-400">Command Prompt — PC-A</span>
                    </div>
                    <div className="p-4 min-h-[210px] font-mono text-[11px] sm:text-xs leading-relaxed space-y-0.5">
                      {pingLog.length === 0 ? (
                        <span className="text-slate-600">
                          Console idle. Choose PC-A&apos;s building, then press{' '}
                          <span className="text-emerald-400 font-bold">Run: ping 192.168.1.20</span>.
                        </span>
                      ) : (
                        pingLog.map((line, idx) => (
                          <div key={idx} className={consoleLineClass(line)}>
                            {line === '' ? ' ' : line}
                          </div>
                        ))
                      )}
                      {pingRunning && <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />}
                    </div>
                  </div>

                  {/* Engineer Narration */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Search className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                        What the stack is thinking
                      </span>
                    </div>
                    {pingNarration.length === 0 ? (
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Run a ping to watch PC-A reason through the network portion of the target address — hop by hop, line by line.
                      </p>
                    ) : (
                      <ol className="space-y-2.5">
                        {pingNarration.map((line, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>

                {/* Insight card after first completed run */}
                {hasRunPing && !pingRunning && lastPingFailed !== null && (
                  <div
                    className={`p-5 rounded-2xl border space-y-2 ${
                      lastPingFailed ? 'bg-rose-500/10 border-rose-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
                    }`}
                  >
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      {lastPingFailed ? (
                        <>
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                          Experiment confirmed: different network portions cannot talk without a router
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Experiment confirmed: matching network portions talk directly through the switch
                        </>
                      )}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lastPingFailed
                        ? '192.168.2.10 knows that 192.168.1.20 is off-subnet, so it never even ARPs for it — it needs a Layer 3 default gateway to leave its own building. No router, no conversation. Try switching back to 192.168.1.10 to see the healthy case, then move on to your first real ticket.'
                        : 'PC-A and PC-B shared the 192.168.1.0 network, so ARP plus the switch carried the frames with zero router involvement. Now flip PC-A to 192.168.2.10 and watch the same command die — that contrast is the entire lesson of Day 03.'}
                    </p>
                  </div>
                )}

                {/* Stage Navigation */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentStage('city-map')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Address Sorting</span>
                  </button>

                  {hasRunPing && !pingRunning ? (
                    <button
                      onClick={() => setCurrentStage('incident')}
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                    >
                      <span>Next: Workplace Ticket #1005</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <Info className="w-3.5 h-3.5" />
                      <span>{pingRunning ? 'Ping in progress…' : 'Run at least one ping experiment to continue'}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 4: WORKPLACE TICKET #1005 (UNREACHABLE PRINT SERVER)              */}
        {/* ======================================================================= */}
        {currentStage === 'incident' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>TICKET #1005 · TECHNOVA IT SERVICE DESK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Workplace Ticket: The Printer Beyond Reach
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Apply your new understanding of network portions to diagnose a real incident — one that wastes hours for junior
                technicians who forget to compare the third octet.
              </p>
            </div>

            {/* Incident Briefing Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              {/* Ticket header metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Finance cannot reach the office print server</h3>
                    <span className="text-xs text-slate-400">Reported by Priya N. · Finance Desk 14 · Priority: Medium</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Status: Open &amp; Unresolved
                </span>
              </div>

              {/* Reporter quote */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <HelpCircle className="w-4 h-4" />
                  <span>User&apos;s Description:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  “I set a static IP yesterday so my seat would stop renumbering. Since then{' '}
                  <strong className="text-rose-400">ping 192.168.1.250 times out completely</strong> — but the analyst next to me
                  prints to that same server right now. The cable light is green and my email works fine. Is the printer broken?”
                </p>
              </div>

              {/* Evidence Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ipconfig evidence */}
                <div className="p-4 rounded-xl bg-black border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                    Evidence A · ipconfig on Priya&apos;s PC
                  </span>
                  <div className="font-mono text-[11px] leading-relaxed text-slate-300">
                    <div>Ethernet adapter Office NIC:</div>
                    <div className="pl-3">
                      IPv4 Address. . . : <span className="text-rose-400 font-bold">192.168.2.10</span>
                    </div>
                    <div className="pl-3">
                      Subnet Mask . . . : <span className="text-slate-200">255.255.255.0</span>
                    </div>
                    <div className="pl-3">
                      Default Gateway : <span className="text-slate-200">192.168.1.1</span>
                    </div>
                  </div>
                </div>

                {/* Target server evidence */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                    Evidence B · The print server
                  </span>
                  <div className="font-mono text-[11px] leading-relaxed text-slate-300">
                    <div>
                      Address: <span className="text-emerald-400 font-bold">192.168.1.250/24</span>
                    </div>
                    <div>Network: 192.168.1.0 (Finance floor)</div>
                    <div>Status: Online · serving other desks</div>
                    <div className="text-slate-500">Same office switch, different subnet than Priya</div>
                  </div>
                </div>
              </div>

              {/* Diagnosis Arena */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                  <Search className="w-4 h-4" />
                  <span className="font-mono uppercase tracking-wider">Step 1 · Pick the root cause</span>
                </div>

                <div className="space-y-2">
                  {DIAGNOSIS_OPTIONS.map((option, idx) => {
                    const isChosen = selectedDiagnosis === idx;
                    const solvedOption = diagnosisSolved && option.correct;
                    let btnClass = 'bg-slate-800/70 hover:bg-slate-700 border-slate-700/60 text-slate-300';
                    if (solvedOption) {
                      btnClass = 'bg-emerald-500/15 border-emerald-400/60 text-emerald-200';
                    } else if (diagnosisSolved) {
                      btnClass = 'bg-slate-800/40 border-slate-800 text-slate-500';
                    } else if (isChosen) {
                      btnClass = 'bg-rose-500/15 border-rose-400/60 text-rose-200';
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleDiagnose(idx)}
                        disabled={diagnosisSolved}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${btnClass}`}
                      >
                        <span className="font-mono font-bold text-slate-500 shrink-0">{String.fromCharCode(65 + idx)}.</span>
                        <span className="leading-relaxed">{option.text}</span>
                      </button>
                    );
                  })}
                </div>

                {diagnosisFeedback && !diagnosisSolved && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 leading-relaxed animate-in fade-in duration-200">
                    <span className="font-bold">✗ Incorrect diagnosis — </span>
                    {diagnosisFeedback}
                  </div>
                )}
              </div>
            </div>

            {/* Fix & Verification Panel (unlocks after correct diagnosis) */}
            {diagnosisSolved && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-mono uppercase tracking-wider">Step 2 · Remediate &amp; Verify</span>
                </div>

                {/* The correction diff */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-sm">
                  <div className="text-center">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Before</span>
                    <span className="text-rose-400 font-bold line-through">192.168.2.10</span>
                    <span className="block text-[10px] text-slate-500">Network 192.168.2.0</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 rotate-90 sm:rotate-0" />
                  <div className="text-center">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">After</span>
                    <span className="text-emerald-400 font-bold">192.168.1.10</span>
                    <span className="block text-[10px] text-slate-500">Network 192.168.1.0 ✓ same building</span>
                  </div>
                </div>

                {/* Apply fix */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {!ipFixed ? (
                    <button
                      onClick={handleApplyFix}
                      className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-sky-500/20 cursor-pointer flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Apply Fix: Set Priya&apos;s IP back to 192.168.1.10</span>
                    </button>
                  ) : (
                    !verified && (
                      <button
                        onClick={handleVerifyFix}
                        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Verify: ping 192.168.1.250</span>
                      </button>
                    )
                  )}
                </div>

                {/* Verification console */}
                {ipFixed && (
                  <div className="bg-black border border-slate-800 rounded-xl overflow-hidden">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-mono text-slate-400">Command Prompt — Priya&apos;s PC</span>
                    </div>
                    <div className="p-4 font-mono text-[11px] sm:text-xs leading-relaxed space-y-0.5">
                      {!verified ? (
                        <span className="text-slate-600">
                          Configuration applied. Run the verification ping to confirm reachability.
                        </span>
                      ) : (
                        <>
                          <div className="text-slate-200 font-bold">C:\Users\priya&gt; ping 192.168.1.250</div>
                          <div className="text-slate-400">Pinging 192.168.1.250 with 32 bytes of data:</div>
                          <div className="text-emerald-400">Reply from 192.168.1.250: bytes=32 time=1ms TTL=128</div>
                          <div className="text-emerald-400">Reply from 192.168.1.250: bytes=32 time=1ms TTL=128</div>
                          <div className="text-emerald-400">Reply from 192.168.1.250: bytes=32 time=2ms TTL=128</div>
                          <div className="text-emerald-400">Reply from 192.168.1.250: bytes=32 time=1ms TTL=128</div>
                          <div className="text-slate-400">&nbsp;</div>
                          <div className="text-sky-400">Ping statistics for 192.168.1.250:</div>
                          <div className="text-sky-400">    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),</div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Resolution */}
                {verified && (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Ticket #1005 Resolved — 0% packet loss!</h4>
                        <p className="text-xs text-emerald-300">
                          Priya lives back in 192.168.1.0 with the print server. No hardware was ever broken — the third octet had
                          quietly moved her desk to another building.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-mono text-emerald-400">
                        ✓ Day 03 Competency: IPv4 network/host calculation verified in the field
                      </span>

                      <button
                        onClick={() => setCurrentStage('celebration')}
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
                      >
                        <span>Complete Mission &amp; Claim Day 03 Badge</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Lower Section Navigation */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentStage('experiment')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Ping Experiment</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* STAGE 5: CELEBRATION & BADGE CLAIM                                      */}
        {/* ======================================================================= */}
        {currentStage === 'celebration' && (
          <div className="w-full max-w-3xl space-y-6 text-center animate-in zoom-in-95 duration-400 py-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 text-4xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
              🏅
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                MISSION ACCOMPLISHED · DAY 03 COMPLETE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                You Mastered Logical IPv4 Addressing!
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                You now read IP addresses the way senior engineers do — not as random numbers, but as structured locations with a
                street, a building, and an apartment inside.
              </p>
            </div>

            {/* Recap Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  IPv4 = 32 Bits in 4 Octets
                </span>
                <p className="text-[11px] text-slate-400">
                  Each octet holds 8 bits (0–255). Human label: city · street · building · apartment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Network vs Host Governs Talk
                </span>
                <p className="text-[11px] text-slate-400">
                  Matching network portions → direct switch delivery. Mismatched → a router (gateway) is mandatory.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Private · Loopback · APIPA Ranges
                </span>
                <p className="text-[11px] text-slate-400">
                  RFC 1918 (10/8, 172.16/12, 192.168/16), 127.0.0.1 loopback, and the 169.254 APIPA alarm bell.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  The Third-Octet Trap
                </span>
                <p className="text-[11px] text-slate-400">
                  One wrong octet silently relocates a device to another network — the cause of Ticket #1005 and countless real
                  outages.
                </p>
              </div>
            </div>

            {/* Claim badge and return to journey buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setCurrentStage('incident')}
                className="w-full sm:w-auto px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Ticket</span>
              </button>

              <button
                onClick={() => onCompleteMission(day.id, null)}
                className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Save Progress &amp; Return to Roadmap</span>
              </button>

              <button
                onClick={() => onCompleteMission(day.id, day.id + 1)}
                className="w-full sm:w-auto px-7 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-emerald-500/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Unlock &amp; Launch Day 04 (Subnet Masks)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
