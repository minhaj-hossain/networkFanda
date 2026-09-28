import React, { useState, useEffect } from 'react';
import { NetworkDevice, PacketInfo, ProtocolType } from '../types/curriculum';
import { Play, Pause, RotateCcw, AlertTriangle, Monitor, Server, Globe, Cpu, Radio, ShieldAlert } from 'lucide-react';

interface NetworkCanvasProps {
  devices: NetworkDevice[];
  selectedDevice: NetworkDevice | null;
  onSelectDevice: (device: NetworkDevice) => void;
  currentPacket: PacketInfo | null;
  isSimulating: boolean;
  onTogglePlay: () => void;
  onResetSim: () => void;
  onStepForward: () => void;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
  onSendTestPacket: (protocol: ProtocolType) => void;
  isGatewayBroken: boolean;
  onToggleGatewayBreak: () => void;
  isDnsBroken: boolean;
  onToggleDnsBreak: () => void;
  isCableUnplugged: boolean;
  onToggleCableUnplug: () => void;
  isVlanMismatch: boolean;
  onToggleVlanMismatch: () => void;
}

export const NetworkCanvas: React.FC<NetworkCanvasProps> = ({
  devices,
  selectedDevice,
  onSelectDevice,
  currentPacket,
  isSimulating,
  onTogglePlay,
  onResetSim,
  onStepForward,
  simSpeed,
  setSimSpeed,
  onSendTestPacket,
  isGatewayBroken,
  onToggleGatewayBreak,
  isDnsBroken,
  onToggleDnsBreak,
  isCableUnplugged,
  onToggleCableUnplug,
  isVlanMismatch,
  onToggleVlanMismatch,
}) => {
  // Compute positions of devices for drawing SVG lines
  const getDeviceById = (id: string) => devices.find((d) => d.id === id);

  // Derive links between nodes
  const links = [
    { from: devices[0]?.id, to: devices[1]?.id },
    { from: devices[1]?.id, to: devices[2]?.id },
    { from: devices[2]?.id, to: devices[3]?.id },
    { from: devices[3]?.id, to: devices[4]?.id },
  ].filter((l) => l.from && l.to);

  // Calculate packet animated position along hops
  const [packetPos, setPacketPos] = useState<{ x: number; y: number }>({ x: 15, y: 50 });

  useEffect(() => {
    if (!currentPacket || currentPacket.hops.length === 0) {
      setPacketPos({ x: devices[0]?.x || 15, y: devices[0]?.y || 50 });
      return;
    }
    const currentHopId = currentPacket.hops[currentPacket.currentHopIndex];
    const targetDev = devices.find((d) => d.id === currentHopId);
    if (targetDev) {
      setPacketPos({ x: targetDev.x, y: targetDev.y });
    }
  }, [currentPacket, currentPacket?.currentHopIndex, devices]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'pc':
        return <Monitor className="w-5 h-5 text-sky-400" />;
      case 'switch':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'router':
        return <Radio className="w-5 h-5 text-amber-400" />;
      case 'server':
      case 'dns':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'cloud':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      default:
        return <Monitor className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="relative w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      {/* Canvas Header / Status Bar */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
            Live Topology Visualizer
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-mono">
            {devices.length} Devices Online
          </span>
          {isCableUnplugged && (
            <span className="inline-flex items-center gap-1 text-rose-400 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Link Severed</span>
            </span>
          )}
          {isGatewayBroken && (
            <span className="inline-flex items-center gap-1 text-amber-400 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Gateway Misconfigured</span>
            </span>
          )}
          {isDnsBroken && (
            <span className="inline-flex items-center gap-1 text-amber-400 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>DNS Offline</span>
            </span>
          )}
          {isVlanMismatch && (
            <span className="inline-flex items-center gap-1 text-purple-400 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>VLAN Isolation Active</span>
            </span>
          )}
        </div>

        {/* Experiment / Break Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleCableUnplug}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              isCableUnplugged
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isCableUnplugged ? 'Reconnect Cable' : 'Unplug Cable (L1)'}
          </button>

          <button
            onClick={onToggleGatewayBreak}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              isGatewayBroken
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isGatewayBroken ? 'Restore Gateway' : 'Break Gateway (L3)'}
          </button>

          <button
            onClick={onToggleDnsBreak}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              isDnsBroken
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isDnsBroken ? 'Restore DNS' : 'Disable DNS'}
          </button>

          <button
            onClick={onToggleVlanMismatch}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              isVlanMismatch
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isVlanMismatch ? 'Fix VLAN Tag' : 'VLAN Mismatch'}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-950/90 select-none overflow-hidden">
        {/* Subtle Background Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #38bdf8 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* SVG Interconnect Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="brokenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {links.map((link, idx) => {
            const devA = getDeviceById(link.from);
            const devB = getDeviceById(link.to);
            if (!devA || !devB) return null;

            const isLinkBroken =
              isCableUnplugged && ((devA.type === 'pc' && devB.type === 'switch') || (devA.type === 'switch' && devB.type === 'pc'));

            return (
              <g key={idx}>
                <line
                  x1={`${devA.x}%`}
                  y1={`${devA.y}%`}
                  x2={`${devB.x}%`}
                  y2={`${devB.y}%`}
                  stroke={isLinkBroken ? 'url(#brokenGradient)' : 'url(#linkGradient)'}
                  strokeWidth={isLinkBroken ? '2' : '2'}
                  strokeDasharray={isLinkBroken ? '6 6' : undefined}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Animated Traveling Packet */}
        {currentPacket && (
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ease-out"
            style={{
              left: `${packetPos.x}%`,
              top: `${packetPos.y}%`,
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Outer Packet Pulse */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
                  currentPacket.status === 'dropped'
                    ? 'bg-rose-500 animate-pulse text-white'
                    : currentPacket.status === 'delivered'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-sky-500 animate-bounce text-white'
                }`}
              >
                {currentPacket.status === 'dropped' ? (
                  <ShieldAlert className="w-3.5 h-3.5" />
                ) : (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </div>

              {/* Packet Tag Box */}
              <div className="mt-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 shadow-md font-mono text-[10px] text-sky-300 whitespace-nowrap">
                {currentPacket.protocol} {currentPacket.status === 'dropped' ? '❌ DROPPED' : ''}
              </div>
            </div>
          </div>
        )}

        {/* Physical Network Devices */}
        {devices.map((device) => {
          const isSelected = selectedDevice?.id === device.id;
          const isOffline =
            device.status === 'offline' ||
            (device.type === 'pc' && isCableUnplugged) ||
            (device.type === 'dns' && isDnsBroken);

          return (
            <div
              key={device.id}
              onClick={() => onSelectDevice(device)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group transition-transform ${
                isSelected ? 'scale-110' : 'hover:scale-105'
              }`}
              style={{
                left: `${device.x}%`,
                top: `${device.y}%`,
              }}
            >
              {/* Device Card */}
              <div
                className={`relative px-3 py-2 rounded-xl flex flex-col items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-2 border-sky-400 shadow-lg shadow-sky-500/20'
                    : isOffline
                    ? 'bg-slate-900/60 border border-rose-500/40 opacity-75'
                    : 'bg-slate-900/90 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Device Icon Avatar */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                    isOffline
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                      : isSelected
                      ? 'bg-sky-500/20 border-sky-500/40'
                      : 'bg-slate-800/80 border-slate-700/60'
                  }`}
                >
                  {getDeviceIcon(device.type)}
                </div>

                {/* Device Labels */}
                <div className="text-center">
                  <p className="text-xs font-semibold text-slate-200 tracking-tight whitespace-nowrap">
                    {device.name}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                    {device.ip}
                  </p>
                  {device.vlan && (
                    <span className="text-[9px] font-mono text-indigo-400">
                      VLAN {device.vlan}
                    </span>
                  )}
                </div>

                {/* Active Indicator Dot */}
                <div
                  className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-slate-950 ${
                    isOffline
                      ? 'bg-rose-500 animate-pulse'
                      : device.status === 'misconfigured'
                      ? 'bg-amber-500'
                      : 'bg-emerald-400'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Playback Controls & Action Deck */}
      <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Playback controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            {isSimulating ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={onStepForward}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors whitespace-nowrap font-medium"
            title="Single-step one hop forward"
          >
            Step ⏭
          </button>

          <button
            onClick={onResetSim}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
            title="Replay from start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed Selector */}
          <div className="flex items-center ml-2 p-0.5 bg-slate-950 rounded border border-slate-800 font-mono text-[11px]">
            <button
              onClick={() => setSimSpeed(0.5)}
              className={`px-2 py-0.5 rounded ${
                simSpeed === 0.5 ? 'bg-slate-800 text-sky-400' : 'text-slate-400'
              }`}
            >
              0.5x
            </button>
            <button
              onClick={() => setSimSpeed(1)}
              className={`px-2 py-0.5 rounded ${
                simSpeed === 1 ? 'bg-slate-800 text-sky-400' : 'text-slate-400'
              }`}
            >
              1.0x
            </button>
            <button
              onClick={() => setSimSpeed(2)}
              className={`px-2 py-0.5 rounded ${
                simSpeed === 2 ? 'bg-slate-800 text-sky-400' : 'text-slate-400'
              }`}
            >
              2.0x
            </button>
          </div>
        </div>

        {/* Right: Quick Packet Generators */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 text-[11px] font-medium mr-1">Inject Traffic:</span>
          <button
            onClick={() => onSendTestPacket('ICMP')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono transition-colors"
          >
            ICMP Ping
          </button>
          <button
            onClick={() => onSendTestPacket('HTTP')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono transition-colors"
          >
            HTTP GET
          </button>
          <button
            onClick={() => onSendTestPacket('ARP')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono transition-colors"
          >
            ARP Query
          </button>
          <button
            onClick={() => onSendTestPacket('DNS')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono transition-colors"
          >
            DNS Lookup
          </button>
        </div>
      </div>
    </div>
  );
};
