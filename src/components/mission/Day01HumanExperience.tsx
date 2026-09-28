import React, { useState } from 'react';
import { DayCurriculum, ITTicket } from '../../types/curriculum';
import {
  ArrowLeft,
  ArrowRight,
  Laptop,
  Cpu,
  Radio,
  Server,
  Globe,
  Plug,
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
  Mail,
  Truck,
  Building2,
  Power,
  Layers,
  XCircle,
  FileText,
  RefreshCw,
  Sliders,
  ChevronRight,
} from 'lucide-react';

interface Day01HumanExperienceProps {
  day: DayCurriculum;
  ticket?: ITTicket;
  onExitMission: () => void;
  onCompleteMission: (dayId: number) => void;
}

type Stage = 'mystery' | 'hardware' | 'journey' | 'incident' | 'celebration';

export const Day01HumanExperience: React.FC<Day01HumanExperienceProps> = ({
  day,
  ticket,
  onExitMission,
  onCompleteMission,
}) => {
  const [currentStage, setCurrentStage] = useState<Stage>('mystery');

  // Beat 1 State: The Mystery
  const [browserUrl, setBrowserUrl] = useState('http://example.com');
  const [browserSubmitted, setBrowserSubmitted] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Beat 2 State: Option C Problem -> Solution First-Principles Flow
  const [activeProblemIndex, setActiveProblemIndex] = useState<number>(0);

  // Beat 3 State: The Packet Journey
  const [currentHop, setCurrentHop] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Beat 4 State: The Incident Ticket
  const [cablePluggedIn, setCablePluggedIn] = useState<boolean>(false);
  const [testSent, setTestSent] = useState<boolean>(false);
  const [incidentSolved, setIncidentSolved] = useState<boolean>(false);

  // Mentor drawer
  const [showMentorTip, setShowMentorTip] = useState<boolean>(false);

  // Stages configuration for top progress bar
  const stages: { id: Stage; number: string; title: string; subtitle: string }[] = [
    { id: 'mystery', number: '1', title: 'The Mystery', subtitle: 'What happens when you type a URL?' },
    { id: 'hardware', number: '2', title: 'The 4 Boxes', subtitle: 'Physical devices in every network' },
    { id: 'journey', number: '3', title: 'Trace Journey', subtitle: 'Follow the envelope hop-by-hop' },
    { id: 'incident', number: '4', title: 'First IT Ticket', subtitle: 'Diagnose and fix a real outage' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.id === currentStage);

  // Option C: Problem -> Solution First-Principles data
  const problemSolutions = [
    {
      id: 'problem-client',
      stepNumber: '1',
      problemShort: '1. Human Intent',
      problemTitle: 'Problem 1: How does a human thought turn into electricity?',
      problemQuote: '“I want to look at example.com. But my brain thinks in ideas, while network cables only understand electrical voltages.”',
      problemDilemma: 'Humans cannot speak in binary pulses. You cannot plug an Ethernet copper cable directly into your forehead.',
      solutionName: "The Client (Sarah's Laptop)",
      solutionRole: 'The Question Creator & Screen',
      solutionWhat: 'A personal workstation with a keyboard, browser, and network interface card (NIC) that packages human intention into an electrical digital message and paints the final webpage on a screen.',
      whyNeeded: 'Without a client, no network request can ever start. It translates between the human world and the electrical world.',
      physicalLocation: 'On Sarah’s desk in Accounting, plugged into the blue wall socket.',
      goldenRule: 'The Client creates the question and displays the answer.',
      icon: <Laptop className="w-8 h-8 text-sky-400" />,
      accentBg: 'bg-sky-500/10 border-sky-400/30 text-sky-300',
      badgeColor: 'bg-sky-500 text-slate-950',
    },
    {
      id: 'problem-switch',
      stepNumber: '2',
      problemShort: '2. 50 Shared Desks',
      problemTitle: 'Problem 2: 50 people on one floor. Do we run 50 cables out the window?',
      problemQuote: '“There are 50 employees on Floor 2. Running 50 separate 5-mile cables through the ceiling and out to the street would cost a fortune and create a rat\'s nest of wires.”',
      problemDilemma: 'Plus, what happens when Sarah wants to send an Excel spreadsheet directly to Bob on the same floor? Should that file travel all the way outside to the internet and back?',
      solutionName: 'The Floor Switch',
      solutionRole: 'The Local Floor Combiner & Hub',
      solutionWhat: 'A single metal box mounted in the hallway closet with 24 to 48 ports. Every desk on Floor 2 plugs into this one box. It lets coworkers talk to each other locally at lightning speed, while bundling all their traffic into ONE single cable leaving the floor.',
      whyNeeded: 'It acts like a power strip for data. Instead of 50 wires leaving the floor, the switch merges all 50 desks into 1 shared uplink.',
      physicalLocation: 'Floor 2 Hallway Wiring Closet (Rack A).',
      goldenRule: 'A Switch connects devices on the SAME floor (Local Area Network / LAN).',
      icon: <Cpu className="w-8 h-8 text-indigo-400" />,
      accentBg: 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300',
      badgeColor: 'bg-indigo-500 text-slate-950',
    },
    {
      id: 'problem-router',
      stepNumber: '3',
      problemShort: '3. Leaving Building',
      problemTitle: 'Problem 3: How do we reach the outside world without letting strangers in?',
      problemQuote: '“All 50 desks are now happily chatting on Floor 2. But the switch has no idea how to find Google or Wikipedia. And we cannot let random people on the internet browse our private office files.”',
      problemDilemma: 'The switch is blind to the global internet. It only knows ports 1 through 24 in our hallway.',
      solutionName: 'The Edge Router',
      solutionRole: 'The Building Front Door & Gateway',
      solutionWhat: 'The intelligent gateway placed at the building’s telecom entrance. It inspects every departing envelope: if the destination is internal, it keeps it inside. If the destination is external, it translates the address and hands it to the Internet Service Provider (ISP).',
      whyNeeded: 'It separates your private office network from the public wild-west internet. It is the only device that knows the global map to guide packets across cities.',
      physicalLocation: 'Basement Server Room (attached to the fiber line entering from the street).',
      goldenRule: 'A Router connects SEPARATE networks together (Local LAN ↔ Global Internet).',
      icon: <Radio className="w-8 h-8 text-amber-400" />,
      accentBg: 'bg-amber-500/10 border-amber-400/30 text-amber-300',
      badgeColor: 'bg-amber-500 text-slate-950',
    },
    {
      id: 'problem-server',
      stepNumber: '4',
      problemShort: '4. 24/7 Answerer',
      problemTitle: 'Problem 4: Our message reached Virginia. But who is awake to answer at 3 AM?',
      problemQuote: '“Sarah’s request traveled 3,000 miles across fiber cables. But personal laptops go to sleep when workers go home. Where does the website actually live?”',
      problemDilemma: 'A regular office PC would melt if 100,000 people tried to visit it simultaneously, and it would disappear the moment someone closed the laptop lid.',
      solutionName: 'The Web Server',
      solutionRole: 'The 24/7 Remote Library',
      solutionWhat: 'A heavy-duty enterprise computer in a climate-controlled data center with backup generators and fiber connections. It stores the webpage files on disk, stays online 24/7/365, and automatically mails copies to anyone who asks.',
      whyNeeded: 'Because websites need an answerer that never sleeps, never disconnects, and can answer thousands of visitors per second.',
      physicalLocation: 'AWS Cloud Data Center in Ashburn, Virginia.',
      goldenRule: 'The Server stores the website files and answers incoming client requests.',
      icon: <Server className="w-8 h-8 text-emerald-400" />,
      accentBg: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300',
      badgeColor: 'bg-emerald-500 text-slate-950',
    },
  ];

  // Hop steps for Beat 3
  const journeyHops = [
    {
      hop: 0,
      title: 'Step 1: The Request is Born',
      activeNode: 'laptop',
      actor: "Sarah's Laptop (The Client)",
      action: 'Sarah hits Enter on example.com. Her browser creates a digital message called an HTTP Request: "Please send me index.html".',
      envelopeStatus: 'Created on laptop · Preparing to leave network card',
      whatHappensPhysically: 'The computer converts the text into electrical pulses on the network interface card (NIC).',
    },
    {
      hop: 1,
      title: 'Step 2: Traveling Down the Desk Cable',
      activeNode: 'cable',
      actor: 'Blue Cat6 Ethernet Cable',
      action: 'The electrical pulses travel at roughly 67% the speed of light along copper twisted pairs inside the blue cable plugged into the wall jack.',
      envelopeStatus: 'In transit across copper cable (Desk to Wall)',
      whatHappensPhysically: 'Pure electrical voltages traveling 15 meters to the wiring closet.',
    },
    {
      hop: 2,
      title: 'Step 3: Inside the Floor Switch',
      activeNode: 'switch',
      actor: 'Floor 2 Network Switch',
      action: 'The switch receives the pulses on Port 14. It recognizes that this traffic is headed out of the local building, so it directs it toward the Edge Router uplink port.',
      envelopeStatus: 'Switch forwards frame out Uplink Port',
      whatHappensPhysically: 'Switch inspects the destination and forwards it within microseconds.',
    },
    {
      hop: 3,
      title: 'Step 4: The Edge Router & ISP Highway',
      activeNode: 'router',
      actor: 'Edge Router & Internet Service Provider',
      action: 'The router realizes the destination is outside TechNova. It sends the packet onto the ISP fiber cables, traversing cross-country routers and undersea backbones.',
      envelopeStatus: 'Traversing the global Internet backbone',
      whatHappensPhysically: 'Light pulses through underground glass fiber optic cables across states and oceans.',
    },
    {
      hop: 4,
      title: 'Step 5: The Web Server Answers!',
      activeNode: 'server',
      actor: 'Destination Web Server (example.com)',
      action: 'The web server receives Sarah\'s request, loads index.html, packages it into a reply envelope, and sends it back along the exact same path!',
      envelopeStatus: 'Delivered! Server is returning HTML webpage',
      whatHappensPhysically: 'The server returns the HTML, and Sarah\'s browser displays the website.',
    },
  ];

  const handleNextHop = () => {
    if (currentHop < journeyHops.length - 1) {
      setCurrentHop(currentHop + 1);
    } else {
      setCurrentHop(0);
    }
  };

  const handlePrevHop = () => {
    if (currentHop > 0) {
      setCurrentHop(currentHop - 1);
    }
  };

  // Incident test trigger
  const handleTestIncident = () => {
    setTestSent(true);
    if (cablePluggedIn) {
      setTimeout(() => {
        setIncidentSolved(true);
      }, 700);
    }
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
            <span className="font-mono text-[11px] text-sky-400 font-bold block uppercase tracking-wider">
              DAY 01 · FOUNDATIONS
            </span>
            <span className="text-xs font-bold text-white block">
              What Actually Happens When You Open a Website?
            </span>
          </div>
        </div>

        {/* Right: Friendly Mentor Assistant */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMentorTip(!showMentorTip)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              showMentorTip
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/80'
            }`}
            title="Ask your senior engineer mentor for a hint"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Mentor Tip</span>
          </button>
        </div>
      </header>

      {/* Mentor Floating Guidance Callout */}
      {showMentorTip && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-3 text-xs text-amber-200 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Senior IT Mentor:</strong> Networking isn’t abstract magic. Think of it like physical mail: you write a message, put it in an envelope, pass it to your local mailroom, and delivery trucks carry it across town.
            </span>
          </div>
          <button
            onClick={() => setShowMentorTip(false)}
            className="text-amber-400 hover:text-amber-100 font-mono text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN LEARNING AREA (One Screen = One Clear Human Purpose)              */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between max-w-5xl mx-auto w-full">
        {/* ----------------------------------------------------------------------- */}
        {/* BEAT 1: THE MYSTERY — "What happens when you type example.com?"          */}
        {/* ----------------------------------------------------------------------- */}
        {currentStage === 'mystery' && (
          <div className="space-y-6 my-auto">
            {/* Context Heading */}
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                Beat 1 of 4 · The Everyday Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                What Actually Happens When You Open a Website?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Every single day, billions of people type a web address and hit <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 font-mono text-xs border border-slate-700">Enter</kbd>. But how does that webpage get from a computer across the world onto your screen?
              </p>
            </div>

            {/* Interactive Browser & Laptop Desk Simulation */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Laptop Screen Frame */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
                {/* Browser Window Chrome */}
                <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>

                  {/* Address Bar */}
                  <div className="flex-1 max-w-lg mx-auto flex items-center gap-2 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-xs font-mono">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-400">http://</span>
                    <input
                      type="text"
                      value={browserUrl}
                      onChange={(e) => setBrowserUrl(e.target.value)}
                      className="bg-transparent text-white font-mono text-xs focus:outline-none flex-1"
                    />
                  </div>

                  <button
                    onClick={() => setBrowserSubmitted(true)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Open Site</span>
                  </button>
                </div>

                {/* Browser Viewport */}
                <div className="p-6 sm:p-10 text-center min-h-[220px] flex flex-col items-center justify-center space-y-4">
                  {!browserSubmitted ? (
                    <div className="space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                        <Laptop className="w-7 h-7 text-sky-400" />
                      </div>
                      <p className="text-sm font-semibold text-slate-200">
                        Sarah is sitting at her desk in TechNova Accounting.
                      </p>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Click <strong className="text-sky-400">"Open Site"</strong> above to see what Sarah’s laptop creates the moment she hits Enter.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5 animate-in zoom-in-95 duration-200 max-w-xl mx-auto w-full">
                      {/* Tactile Digital Envelope */}
                      <div className="rounded-xl bg-slate-900 border border-sky-400/40 p-4 sm:p-5 text-left shadow-lg shadow-sky-500/10 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">✉️</span>
                            <span className="font-mono text-xs font-bold text-sky-400">
                              Digital Envelope (HTTP Request Packet)
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                            STAMP: HTTP · Port 80
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="space-y-0.5">
                            <span className="font-mono text-[10px] text-slate-500 uppercase block">Sender (From):</span>
                            <span className="font-semibold text-slate-200">Sarah's Laptop</span>
                            <span className="text-slate-400 block text-[11px]">Desk 04 · TechNova Accounting</span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-mono text-[10px] text-slate-500 uppercase block">Recipient (To):</span>
                            <span className="font-semibold text-emerald-400">example.com</span>
                            <span className="text-slate-400 block text-[11px]">AWS Cloud Data Center · Ashburn, VA</span>
                          </div>
                        </div>

                        {/* Expandable Letter Content Inside */}
                        <div className="pt-2">
                          <button
                            onClick={() => setEnvelopeOpened(!envelopeOpened)}
                            className="w-full py-2 px-3 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-mono flex items-center justify-between transition-colors border border-slate-800 cursor-pointer"
                          >
                            <span>{envelopeOpened ? 'Hide Letter Content' : 'Click to Read Inside the Letter'}</span>
                            <span className="text-sky-400 font-bold">{envelopeOpened ? '▲' : '▼ Read'}</span>
                          </button>

                          {envelopeOpened && (
                            <div className="mt-2 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 animate-in fade-in duration-200">
                              <p className="text-sky-400 font-bold">GET / HTTP/1.1</p>
                              <p className="text-slate-400">Host: example.com</p>
                              <p className="text-slate-400">User-Agent: Chrome on Windows 11 Workstation</p>
                              <p className="text-emerald-300 pt-1 border-t border-slate-800/80">
                                💬 Plain English: <em>"Hello web server! Please send me the home page files so Sarah can view them on her screen."</em>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* The Physical Reality Takeaway */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 text-left leading-relaxed">
                        <p className="font-bold text-white mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                          <span>The Physical Reality of Networking</span>
                        </p>
                        Does Sarah’s laptop have a 3,000-mile wire connected directly to the website’s computer? <strong className="text-rose-400 font-bold">No.</strong> Her laptop can only reach the blue cable plugged into her wall. That digital envelope must be passed across <strong>4 physical pieces of equipment</strong> to get across the country.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Navigation Call to Action */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  Ready to see the physical boxes that carry this letter?
                </span>

                <button
                  onClick={() => setCurrentStage('hardware')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-sky-500/10 cursor-pointer"
                >
                  <span>Step 2: Meet the 4 Equipment Boxes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* BEAT 2: THE 4 BOXES — Option C: Problem -> Solution First-Principles     */}
        {/* ----------------------------------------------------------------------- */}
        {currentStage === 'hardware' && (
          <div className="space-y-6 my-auto max-w-4xl mx-auto w-full">
            {/* Header: Clear, calm question */}
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                Beat 2 of 4 · First-Principles Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Why Does a Network Need 4 Boxes?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Every piece of networking equipment exists to solve one specific physical dilemma. Click through the 4 real-world problems below:
              </p>
            </div>

            {/* 4 Problem Selector Tabs (Clean, readable, zero clutter) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
              {problemSolutions.map((prob, idx) => {
                const isActive = activeProblemIndex === idx;

                return (
                  <button
                    key={prob.id}
                    onClick={() => setActiveProblemIndex(idx)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isActive
                        ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="font-mono text-[10px] uppercase opacity-75">
                      Dilemma 0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold truncate w-full">
                      {prob.problemShort}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* THE MAIN FIRST-PRINCIPLES CARD (Problem -> Solution) */}
            {(() => {
              const currentProb = problemSolutions[activeProblemIndex];

              return (
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
                  {/* Part 1: The Real-World Physical Problem */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                      <span>⚠️ The Physical Dilemma</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {currentProb.problemTitle}
                    </h3>

                    <blockquote className="text-xs sm:text-sm italic text-amber-200/90 leading-relaxed bg-amber-500/10 p-3 rounded-lg border-l-2 border-amber-400">
                      {currentProb.problemQuote}
                    </blockquote>

                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {currentProb.problemDilemma}
                    </p>
                  </div>

                  {/* Transition Indicator */}
                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
                    <div className="h-px w-16 bg-slate-800" />
                    <span className="text-sky-400 font-bold flex items-center gap-1">
                      <span>↓</span> The Physical Invention That Solves This
                    </span>
                    <div className="h-px w-16 bg-slate-800" />
                  </div>

                  {/* Part 2: The Physical Equipment Solution */}
                  <div className="p-5 sm:p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center gap-5">
                    {/* Device Icon & Identity */}
                    <div className="flex items-center gap-4 shrink-0 md:w-64">
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                        {currentProb.icon}
                      </div>

                      <div className="space-y-1">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${currentProb.accentBg}`}>
                          {currentProb.solutionRole}
                        </span>
                        <h4 className="text-base font-bold text-white tracking-tight">
                          {currentProb.solutionName}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400 block">
                          📍 {currentProb.physicalLocation}
                        </span>
                      </div>
                    </div>

                    {/* Device Explanation */}
                    <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-800/80 pt-4 md:pt-0 md:pl-5 flex-1 text-xs leading-relaxed">
                      <div>
                        <strong className="text-white block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-0.5">
                          How it solves the dilemma:
                        </strong>
                        <p className="text-slate-300">
                          {currentProb.solutionWhat}
                        </p>
                      </div>

                      <div className="pt-1">
                        <strong className="text-white block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-0.5">
                          Why we cannot live without it:
                        </strong>
                        <p className="text-slate-300">
                          {currentProb.whyNeeded}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Part 3: The Golden Takeaway Rule */}
                  <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-400/25 text-xs text-slate-200 flex items-center gap-3">
                    <Lightbulb className="w-5 h-5 text-sky-400 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="font-mono text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
                        The "Aha!" Rule to Remember:
                      </span>
                      <p className="font-medium text-white">
                        {currentProb.goldenRule}
                      </p>
                    </div>
                  </div>

                  {/* Intra-Problem Step Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => setActiveProblemIndex(Math.max(0, activeProblemIndex - 1))}
                      disabled={activeProblemIndex === 0}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                    >
                      ← Previous Dilemma
                    </button>

                    <div className="flex items-center gap-1.5">
                      {problemSolutions.map((_, i) => (
                        <div
                          key={i}
                          onClick={() => setActiveProblemIndex(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                            activeProblemIndex === i
                              ? 'bg-sky-400 w-6'
                              : 'bg-slate-700 hover:bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>

                    {activeProblemIndex < problemSolutions.length - 1 ? (
                      <button
                        onClick={() => setActiveProblemIndex(activeProblemIndex + 1)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span>Next Dilemma</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentStage('journey')}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                      >
                        <span>All 4 Solved! Trace Journey</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Bottom Complete Pipeline Summary */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-mono text-slate-400">
                <span className="font-bold text-white">The Complete Chain:</span>
                <span className="text-sky-400 font-semibold">1. Client</span>
                <span>→</span>
                <span className="text-indigo-400 font-semibold">2. Switch</span>
                <span>→</span>
                <span className="text-amber-400 font-semibold">3. Router</span>
                <span>→</span>
                <span className="text-emerald-400 font-semibold">4. Server</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStage('mystery')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  ← Back to Step 1
                </button>
                <button
                  onClick={() => setCurrentStage('journey')}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                >
                  <span>Step 3: Trace Packet →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* BEAT 3: TRACE THE JOURNEY — Hop-by-Hop Stepper (No Robot Abstraction)   */}
        {/* ----------------------------------------------------------------------- */}
        {currentStage === 'journey' && (
          <div className="space-y-6 my-auto">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                Beat 3 of 4 · The Packet Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Follow the Digital Envelope Across the World
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Step through each hop in slow motion. Watch how the request leaves Sarah’s desk, passes through each piece of hardware, and returns with the webpage:
              </p>
            </div>

            {/* Visual Tangible Highway Diagram */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
              {/* The Physical Hardware Train */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                {/* 1. Laptop Node */}
                <div
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all min-w-[110px] ${
                    currentHop === 0
                      ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-400/40 shadow-lg shadow-sky-500/20'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <Laptop className={`w-6 h-6 mb-1 ${currentHop === 0 ? 'text-sky-300' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-white">Sarah's Laptop</span>
                  <span className="text-[10px] font-mono text-slate-400">Desk 04</span>
                </div>

                {/* Cable Conduit Indicator */}
                <div className="flex-1 hidden md:flex items-center justify-center px-1">
                  <div className={`h-1.5 w-full rounded-full transition-all ${
                    currentHop >= 1 ? 'bg-sky-400 shadow-sm shadow-sky-400/50' : 'bg-slate-800'
                  }`} />
                </div>

                {/* 2. Switch Node */}
                <div
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all min-w-[110px] ${
                    currentHop === 2
                      ? 'bg-indigo-500/20 border-indigo-400 ring-2 ring-indigo-400/40 shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <Cpu className={`w-6 h-6 mb-1 ${currentHop === 2 ? 'text-indigo-300' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-white">Floor Switch</span>
                  <span className="text-[10px] font-mono text-slate-400">Wiring Closet</span>
                </div>

                {/* Uplink Conduit Indicator */}
                <div className="flex-1 hidden md:flex items-center justify-center px-1">
                  <div className={`h-1.5 w-full rounded-full transition-all ${
                    currentHop >= 3 ? 'bg-indigo-400 shadow-sm shadow-indigo-400/50' : 'bg-slate-800'
                  }`} />
                </div>

                {/* 3. Router Node */}
                <div
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all min-w-[110px] ${
                    currentHop === 3
                      ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <Radio className={`w-6 h-6 mb-1 ${currentHop === 3 ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-white">Edge Router</span>
                  <span className="text-[10px] font-mono text-slate-400">Server Room</span>
                </div>

                {/* Fiber Conduit Indicator */}
                <div className="flex-1 hidden md:flex items-center justify-center px-1">
                  <div className={`h-1.5 w-full rounded-full transition-all ${
                    currentHop >= 4 ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-slate-800'
                  }`} />
                </div>

                {/* 4. Remote Web Server Node */}
                <div
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all min-w-[110px] ${
                    currentHop === 4
                      ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <Server className={`w-6 h-6 mb-1 ${currentHop === 4 ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-white">example.com</span>
                  <span className="text-[10px] font-mono text-slate-400">Data Center</span>
                </div>
              </div>

              {/* Current Hop Live Telemetry Card (Human Readable) */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {journeyHops[currentHop].title}
                    </h3>
                  </div>

                  <span className="font-mono text-xs text-sky-400 font-semibold">
                    Hop {currentHop + 1} of 5
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-mono text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                      What is happening right now:
                    </span>
                    <p className="text-slate-200 leading-relaxed text-sm">
                      {journeyHops[currentHop].action}
                    </p>
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                    <span className="font-mono text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                      Under the Hood (Physical Reality):
                    </span>
                    <p className="text-slate-300 leading-relaxed text-xs">
                      {journeyHops[currentHop].whatHappensPhysically}
                    </p>
                  </div>
                </div>

                {/* Digital Envelope Snapshot */}
                <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-400/20 text-xs font-mono text-sky-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span>✉️</span>
                    <span><strong>Envelope Status:</strong> {journeyHops[currentHop].envelopeStatus}</span>
                  </div>
                  {currentHop === 4 && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Page Rendered!
                    </span>
                  )}
                </div>
              </div>

              {/* Hop Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevHop}
                    disabled={currentHop === 0}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    ← Previous Hop
                  </button>

                  <button
                    onClick={handleNextHop}
                    className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>{currentHop === journeyHops.length - 1 ? 'Replay From Start' : 'Next Hop →'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setCurrentStage('incident')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/10 cursor-pointer ml-auto"
                >
                  <span>Step 4: Solve Your First Workplace Incident</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* BEAT 4: SOLVE YOUR FIRST INCIDENT — Hands-on Confidence & Resolution   */}
        {/* ----------------------------------------------------------------------- */}
        {currentStage === 'incident' && (
          <div className="space-y-6 my-auto">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Beat 4 of 4 · Authentic Workplace Challenge
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                TechNova Incident #1001: The Mystery Disconnect
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                You are on duty at the TechNova IT Support desk. An urgent employee ticket just came in. Put your Day 1 knowledge to the test:
              </p>
            </div>

            {/* The Helpdesk Incident Card */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Ticket Header */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      HIGH PRIORITY
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      Ticket #1001 · Reported by Sarah (Accounting)
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    "My screen says 'No Internet Connection' when I try to open example.com!"
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Logged 4 mins ago</span>
                </div>
              </div>

              {/* Physical Chain Inspection & Fix Area */}
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">
                    Physical Link Inspection
                  </span>
                  <span className={cablePluggedIn ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {cablePluggedIn ? '✓ All Physical Links Connected' : '⚠️ Physical Defect Detected at Desk 04'}
                  </span>
                </div>

                {/* Cable Visualization */}
                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-6">
                  {/* Laptop */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      <Laptop className="w-6 h-6 text-sky-400" />
                    </div>
                    <span className="text-xs font-bold text-white">Sarah's Laptop</span>
                    <span className="text-[10px] font-mono text-slate-400">RJ45 Port</span>
                  </div>

                  {/* The Physical Cable Status */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-1 rounded-full ${cablePluggedIn ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                      <div
                        className={`p-2.5 rounded-full border transition-all ${
                          cablePluggedIn
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-md shadow-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-bounce'
                        }`}
                      >
                        <Plug className="w-5 h-5 rotate-45" />
                      </div>
                      <div className={`w-8 h-1 rounded-full ${cablePluggedIn ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                    </div>

                    <button
                      onClick={() => setCablePluggedIn(!cablePluggedIn)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        cablePluggedIn
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          : 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-lg shadow-rose-500/20'
                      }`}
                    >
                      {cablePluggedIn ? 'Disconnect Cable (Test)' : '🔌 Plug Cable In (Fix Issue)'}
                    </button>
                  </div>

                  {/* Floor Switch */}
                  <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-indigo-400" />
                    </div>
                    <span className="text-xs font-bold text-white">Floor Switch</span>
                    <span className="text-[10px] font-mono text-slate-400">Port 14</span>
                  </div>
                </div>

                {/* Connection Verification Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">
                    Once the physical cable is firmly in place, send a test ping to verify whether Sarah can reach the web server.
                  </p>

                  <button
                    onClick={handleTestIncident}
                    className="w-full sm:w-auto px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-sky-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Test Connection & Verify Page</span>
                  </button>
                </div>
              </div>

              {/* Feedback and Celebration */}
              {testSent && (
                <div className="animate-in fade-in duration-300">
                  {incidentSolved ? (
                    <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">
                            Incident Resolved! Webpage Loaded Successfully!
                          </h4>
                          <p className="text-xs text-emerald-300">
                            Sarah's workstation regained physical link sync. The digital envelope traversed the switch, router, and reached example.com.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs font-mono text-emerald-400">
                          ✓ Day 01 Competency: Physical Network Architecture Verified
                        </span>

                        <button
                          onClick={() => onCompleteMission(day.id)}
                          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                        >
                          Complete Mission & Claim Day 01 Badge →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      <span>
                        The packet could not leave Sarah’s desk! The physical Ethernet cable is still disconnected. Click <strong>"Plug Cable In"</strong> above.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
