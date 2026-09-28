import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/home/Navbar';
import { HomeLearningJourney } from './components/home/HomeLearningJourney';
import { MissionBriefingView } from './components/views/MissionBriefingView';
import { FullScreenMission } from './components/mission/FullScreenMission';
import { NetworkCanvas } from './components/NetworkCanvas';
import { PacketInspector } from './components/PacketInspector';
import { SubnetExplorer } from './components/SubnetExplorer';
import { TicketDesk } from './components/TicketDesk';
import { CompetencyTracker } from './components/CompetencyTracker';
import { CurriculumReader } from './components/CurriculumReader';
import { MentorDrawer } from './components/drawers/MentorDrawer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { DAYS_DATA, INITIAL_TICKETS } from './data/curriculumData';
import { DayCurriculum, ITTicket, NetworkDevice, PacketInfo, ProtocolType } from './types/curriculum';

export default function App() {
  // Navigation View (Default is the redesigned 'journey' homepage)
  const [currentView, setCurrentView] = useState<NavTab>('journey');

  // Active Mission State (Full Screen Mode)
  const [activeMissionDayId, setActiveMissionDayId] = useState<number | null>(null);

  // Active Mission Briefing State (Pre-flight Screen)
  const [activeBriefingDayId, setActiveBriefingDayId] = useState<number | null>(null);

  // Global Mentor Drawer State
  const [mentorDrawerOpen, setMentorDrawerOpen] = useState(false);

  // Progress Tracking (LocalStorage)
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('technova_completed_days');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const [inProgressDays, setInProgressDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('technova_completed_days');
      const comp: number[] = saved ? JSON.parse(saved) : [1, 2];
      const next = DAYS_DATA.find((d) => !comp.includes(d.id))?.id || 1;
      return [next];
    } catch {
      return [3];
    }
  });

  const [tickets, setTickets] = useState<ITTicket[]>(() => {
    try {
      const saved = localStorage.getItem('technova_tickets');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  // Sandbox-only Simulation state (when in 'simulations' view)
  const [sandboxDevices, setSandboxDevices] = useState<NetworkDevice[]>(DAYS_DATA[0].defaultDevices);
  const [sandboxSelectedDevice, setSandboxSelectedDevice] = useState<NetworkDevice | null>(null);
  const [sandboxPacket, setSandboxPacket] = useState<PacketInfo | null>(null);
  const [sandboxIsSimulating, setSandboxIsSimulating] = useState(false);
  const [sandboxSimSpeed, setSandboxSimSpeed] = useState(1);
  const [sandboxGatewayBroken, setSandboxGatewayBroken] = useState(false);
  const [sandboxDnsBroken, setSandboxDnsBroken] = useState(false);
  const [sandboxCableUnplugged, setSandboxCableUnplugged] = useState(false);
  const [sandboxVlanMismatch, setSandboxVlanMismatch] = useState(false);

  // Persist completed days
  useEffect(() => {
    try {
      localStorage.setItem('technova_completed_days', JSON.stringify(completedDays));
    } catch {
      // ignore
    }
  }, [completedDays]);

  // Persist tickets
  useEffect(() => {
    try {
      localStorage.setItem('technova_tickets', JSON.stringify(tickets));
    } catch {
      // ignore
    }
  }, [tickets]);

  // Derive Next Day to Learn
  const nextDayId = DAYS_DATA.find((d) => !completedDays.includes(d.id))?.id || 1;
  const nextDay = DAYS_DATA.find((d) => d.id === nextDayId) || DAYS_DATA[0];

  // Briefing Day
  const briefingDay = DAYS_DATA.find((d) => d.id === activeBriefingDayId) || nextDay;

  // Active Full-Screen Mission Day
  const missionDay = DAYS_DATA.find((d) => d.id === activeMissionDayId) || nextDay;
  const missionTicket = tickets.find((t) => t.dayId === missionDay.id) || tickets[0];

  // Start Briefing for a specific day
  const handleStartDayBriefing = (dayId: number) => {
    setActiveBriefingDayId(dayId);
  };

  // Launch Full Screen Mission
  const handleLaunchMission = (dayId: number) => {
    setActiveBriefingDayId(null);
    setActiveMissionDayId(dayId);
  };

  // Complete Mission and Advance / Unlock Ahead Day
  const handleCompleteMission = (dayId: number, targetNextDayId?: number | null) => {
    // 1. Mark day as completed
    const updatedCompleted = completedDays.includes(dayId) ? completedDays : [...completedDays, dayId];
    setCompletedDays(updatedCompleted);
    try {
      localStorage.setItem('technova_completed_days', JSON.stringify(updatedCompleted));
    } catch {
      // ignore
    }

    // 2. Next day to unlock
    const nextId = targetNextDayId !== undefined ? targetNextDayId : dayId + 1;

    if (nextId !== null && nextId <= DAYS_DATA.length) {
      // Unlock next day in progress list
      setInProgressDays((prev) => (prev.includes(nextId) ? prev : [...prev, nextId]));
      // Launch next day mission directly!
      setActiveBriefingDayId(null);
      setActiveMissionDayId(nextId);
    } else {
      // Return to journey roadmap
      setActiveMissionDayId(null);
      setActiveBriefingDayId(null);
      setCurrentView('journey');
    }
  };

  // Exit Mission
  const handleExitMission = () => {
    setActiveMissionDayId(null);
  };

  // Sandbox Packet injection
  const handleSandboxSendPacket = (protocol: ProtocolType = 'HTTP') => {
    const hopIds = sandboxDevices.map((d) => d.id);
    const newPacket: PacketInfo = {
      id: `sandbox-pkt-${Date.now()}`,
      sourceDevice: sandboxDevices[0]?.name || 'PC',
      destDevice: sandboxDevices[sandboxDevices.length - 1]?.name || 'Server',
      sourceIp: sandboxDevices[0]?.ip || '192.168.1.10',
      destIp: sandboxDevices[sandboxDevices.length - 1]?.ip || '93.184.216.34',
      sourceMac: sandboxDevices[0]?.mac || 'AA:01:00',
      destMac: sandboxDevices[1]?.mac || '00:1A:2B',
      protocol,
      status: sandboxCableUnplugged ? 'dropped' : 'transmitting',
      currentHopIndex: 0,
      hops: hopIds,
      description: sandboxCableUnplugged
        ? 'Physical cable unplugged at Layer 1.'
        : `Traffic originating at ${sandboxDevices[0]?.name} heading to ${sandboxDevices[sandboxDevices.length - 1]?.ip}.`,
      payload: protocol === 'HTTP' ? 'GET /index.html HTTP/1.1' : 'ICMP Echo Request',
      layer2Header: {
        srcMac: sandboxDevices[0]?.mac || 'AA:01',
        dstMac: sandboxDevices[1]?.mac || '00:1A',
        etherType: '0x0800',
      },
      layer3Header: {
        version: 'IPv4',
        srcIp: sandboxDevices[0]?.ip || '192.168.1.10',
        dstIp: sandboxDevices[sandboxDevices.length - 1]?.ip || '93.184.216.34',
        ttl: 64,
        protocol,
      },
      layer4Header: {
        srcPort: 49152,
        dstPort: 80,
      },
    };
    setSandboxPacket(newPacket);
    setSandboxIsSimulating(true);
  };

  const handleSandboxStep = () => {
    if (!sandboxPacket) {
      handleSandboxSendPacket('HTTP');
      return;
    }
    const nextIdx = sandboxPacket.currentHopIndex + 1;
    if (nextIdx >= sandboxPacket.hops.length) {
      setSandboxPacket({
        ...sandboxPacket,
        status: 'delivered',
        description: 'Packet delivered to destination host.',
      });
      setSandboxIsSimulating(false);
    } else {
      setSandboxPacket({
        ...sandboxPacket,
        currentHopIndex: nextIdx,
        description: `Packet forwarding via hop ${nextIdx + 1}.`,
      });
    }
  };

  // Solve Ticket
  const handleSolveTicket = (ticketId: string, chosenOptionIndex: number) => {
    const updated = tickets.map((t) => (t.id === ticketId ? { ...t, solved: true } : t));
    setTickets(updated);

    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket && !completedDays.includes(ticket.dayId)) {
      setCompletedDays([...completedDays, ticket.dayId]);
    }
  };

  // ==========================================
  // 1. FULL-SCREEN DEDICATED MISSION MODE
  // ==========================================
  if (activeMissionDayId !== null) {
    return (
      <FullScreenMission
        key={activeMissionDayId}
        day={missionDay}
        ticket={missionTicket}
        onExitMission={handleExitMission}
        onCompleteMission={handleCompleteMission}
      />
    );
  }

  // ==========================================
  // 2. STANDARD FOCUSED DESKTOP ENVIRONMENT
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Persistent Navigation Bar (One-row, 3-zone contract) */}
      <Navbar
        activeTab={currentView}
        onSelectTab={(tab) => {
          setActiveBriefingDayId(null);
          setCurrentView(tab);
        }}
        completedDaysCount={completedDays.length}
        totalDays={DAYS_DATA.length}
        currentDayId={nextDayId}
        onOpenMentor={() => setMentorDrawerOpen(true)}
        onSearchSelectDay={(dayId) => handleStartDayBriefing(dayId)}
      />

      {/* Main View Port Container */}
      <main className="flex-1 flex flex-col">
        {/* A. MISSION BRIEFING VIEW (Focused Pre-Flight Screen) */}
        {activeBriefingDayId !== null ? (
          <MissionBriefingView
            day={briefingDay}
            isCompleted={completedDays.includes(briefingDay.id)}
            onStartMission={() => handleLaunchMission(briefingDay.id)}
            onBackToPath={() => setActiveBriefingDayId(null)}
          />
        ) : (
          <>
            {/* B. LEARNING JOURNEY / HOMEPAGE (The Redesigned Core Experience) */}
            {currentView === 'journey' && (
              <HomeLearningJourney
                days={DAYS_DATA}
                completedDays={completedDays}
                inProgressDays={inProgressDays}
                onSelectDay={handleStartDayBriefing}
                onLaunchMission={handleLaunchMission}
                onGoToSimulations={() => setCurrentView('simulations')}
                onGoToPractice={() => setCurrentView('practice')}
                onGoToProgress={() => setCurrentView('progress')}
              />
            )}

            {/* C. SIMULATIONS VIEW (Dedicated Free Sandbox) */}
            {currentView === 'simulations' && (
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                    Network Engineering Sandbox
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Interactive Topology Lab
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Inject packets, introduce hardware and routing defects, and inspect frame headers in real time.
                  </p>
                </div>

                <NetworkCanvas
                  devices={sandboxDevices}
                  selectedDevice={sandboxSelectedDevice}
                  onSelectDevice={(d) => setSandboxSelectedDevice(d)}
                  currentPacket={sandboxPacket}
                  isSimulating={sandboxIsSimulating}
                  onTogglePlay={() => setSandboxIsSimulating(!sandboxIsSimulating)}
                  onResetSim={() => {
                    setSandboxIsSimulating(false);
                    setSandboxPacket(null);
                  }}
                  onStepForward={handleSandboxStep}
                  simSpeed={sandboxSimSpeed}
                  setSimSpeed={setSandboxSimSpeed}
                  onSendTestPacket={handleSandboxSendPacket}
                  isGatewayBroken={sandboxGatewayBroken}
                  onToggleGatewayBreak={() => setSandboxGatewayBroken(!sandboxGatewayBroken)}
                  isDnsBroken={sandboxDnsBroken}
                  onToggleDnsBreak={() => setSandboxDnsBroken(!sandboxDnsBroken)}
                  isCableUnplugged={sandboxCableUnplugged}
                  onToggleCableUnplug={() => setSandboxCableUnplugged(!sandboxCableUnplugged)}
                  isVlanMismatch={sandboxVlanMismatch}
                  onToggleVlanMismatch={() => setSandboxVlanMismatch(!sandboxVlanMismatch)}
                />

                <PacketInspector packet={sandboxPacket} selectedDevice={sandboxSelectedDevice} />

                <SubnetExplorer />
              </div>
            )}

            {/* D. PRACTICE & SUPPORT TICKETS VIEW */}
            {currentView === 'practice' && (
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                    Workplace Practice
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    TechNova Helpdesk Incident Tickets
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Authentic employee incident tickets. Investigate symptoms, isolate root causes, and verify resolution.
                  </p>
                </div>

                <TicketDesk
                  tickets={tickets}
                  onSolveTicket={handleSolveTicket}
                  onSelectDay={(dayId) => handleStartDayBriefing(dayId)}
                />
              </div>
            )}

            {/* E. PROGRESS & COMPETENCY VIEW */}
            {currentView === 'progress' && (
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                    Skills & Mastery
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Junior IT Engineer Competency Profile
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Track your mastery across IP Addressing, DHCP, DNS, Switching, Routing, and Incident Response.
                  </p>
                </div>

                <CompetencyTracker
                  days={DAYS_DATA}
                  completedDays={completedDays}
                  inProgressDays={inProgressDays}
                  onToggleDayComplete={(dayId) => {
                    if (completedDays.includes(dayId)) {
                      setCompletedDays(completedDays.filter((id) => id !== dayId));
                    } else {
                      setCompletedDays([...completedDays, dayId]);
                    }
                  }}
                  onSelectDay={handleStartDayBriefing}
                />
              </div>
            )}

            {/* F. CURRICULUM SPECIFICATION VIEW */}
            {currentView === 'curriculum_doc' && (
              <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
                <CurriculumReader />
              </div>
            )}
          </>
        )}
      </main>

      {/* Global Contextual Mentor Drawer */}
      <MentorDrawer
        isOpen={mentorDrawerOpen}
        onClose={() => setMentorDrawerOpen(false)}
        day={briefingDay}
        currentStepName="general"
      />

      {/* Offline Connectivity Notification */}
      <OfflineIndicator />

      {/* Quiet Footer (anti-slop rule: no ornamental status tickers) */}
      <footer className="border-t border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 font-mono">
        <p>TechNova NetLab · Junior IT & Network Systems Engineering Academy · Hands-on Incident Simulation</p>
      </footer>
    </div>
  );
}
