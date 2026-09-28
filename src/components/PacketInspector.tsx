import React from 'react';
import { PacketInfo, NetworkDevice } from '../types/curriculum';
import { CheckCircle2, XCircle, Info, ArrowRight, ShieldCheck, Binary } from 'lucide-react';

interface PacketInspectorProps {
  packet: PacketInfo | null;
  selectedDevice: NetworkDevice | null;
}

export const PacketInspector: React.FC<PacketInspectorProps> = ({ packet, selectedDevice }) => {
  return (
    <div className="w-full rounded-xl bg-slate-900 border border-slate-800 p-4 flex flex-col gap-4 text-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Binary className="w-4 h-4 text-sky-400" />
          <h3 className="font-semibold text-sm text-slate-100 tracking-tight">
            Packet Inspector & Header Breakdown
          </h3>
        </div>

        {packet ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              Protocol: {packet.protocol}
            </span>
            <span
              className={`font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                packet.status === 'delivered'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  : packet.status === 'dropped'
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
              }`}
            >
              {packet.status === 'delivered' && <CheckCircle2 className="w-3 h-3" />}
              {packet.status === 'dropped' && <XCircle className="w-3 h-3" />}
              <span>Status: {packet.status.toUpperCase()}</span>
            </span>
          </div>
        ) : (
          <span className="text-slate-500 italic">No packet in transit</span>
        )}
      </div>

      {packet ? (
        <div className="space-y-4">
          {/* Current Step Explanation Callout */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-300 leading-relaxed font-normal">
                {packet.description}
              </p>
              <div className="mt-1.5 flex items-center gap-2 font-mono text-[11px] text-slate-400">
                <span>Hop {packet.currentHopIndex + 1} of {packet.hops.length}</span>
                <span aria-hidden="true">·</span>
                <span className="text-sky-300">
                  Current Node: {packet.hops[packet.currentHopIndex]}
                </span>
              </div>
            </div>
          </div>

          {/* Layer Headers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Layer 2: Data Link / Ethernet */}
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/70">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] block mb-2">
                Layer 2 — Ethernet Frame
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Src MAC:</span>
                  <span className="text-slate-300">{packet.layer2Header.srcMac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dst MAC:</span>
                  <span className="text-slate-300">{packet.layer2Header.dstMac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">EtherType:</span>
                  <span className="text-sky-400">{packet.layer2Header.etherType}</span>
                </div>
                {packet.layer2Header.vlanTag !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">802.1Q Tag:</span>
                    <span className="text-indigo-400 font-bold">VLAN {packet.layer2Header.vlanTag}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Layer 3: Network / IPv4 */}
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/70">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] block mb-2">
                Layer 3 — IPv4 Packet
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Src IP:</span>
                  <span className="text-emerald-400">{packet.layer3Header.srcIp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dst IP:</span>
                  <span className="text-sky-400">{packet.layer3Header.dstIp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TTL:</span>
                  <span className="text-amber-400">{packet.layer3Header.ttl} hops</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Protocol ID:</span>
                  <span className="text-slate-300">{packet.layer3Header.protocol}</span>
                </div>
              </div>
            </div>

            {/* Layer 4: Transport (TCP / UDP / ICMP) */}
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/70">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] block mb-2">
                Layer 4 — Transport Segment
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                {packet.layer4Header.srcPort !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Src Port:</span>
                    <span className="text-slate-300">{packet.layer4Header.srcPort}</span>
                  </div>
                )}
                {packet.layer4Header.dstPort !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dst Port:</span>
                    <span className="text-sky-400">{packet.layer4Header.dstPort}</span>
                  </div>
                )}
                {packet.layer4Header.flags && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">TCP Flags:</span>
                    <span className="text-amber-400">{packet.layer4Header.flags}</span>
                  </div>
                )}
                {packet.layer4Header.type && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">ICMP Type:</span>
                    <span className="text-slate-300">{packet.layer4Header.type}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payload Data View */}
          <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800/80 font-mono text-[11px] text-slate-300 flex items-center justify-between">
            <span className="text-slate-500">Data Payload:</span>
            <span className="text-slate-200 truncate max-w-lg">{packet.payload}</span>
          </div>
        </div>
      ) : selectedDevice ? (
        /* Device Properties Inspector when no packet is selected */
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-slate-200">{selectedDevice.name}</p>
              <p className="text-[11px] text-slate-400 font-mono">Hardware Type: {selectedDevice.type.toUpperCase()}</p>
            </div>
            <span
              className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                selectedDevice.status === 'online'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              ● {selectedDevice.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">IPv4 Address</span>
              <span className="text-sky-400 font-semibold">{selectedDevice.ip}</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">MAC Address</span>
              <span className="text-slate-300">{selectedDevice.mac}</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Subnet Mask</span>
              <span className="text-slate-300">{selectedDevice.subnetMask}</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Default Gateway</span>
              <span className="text-amber-400">{selectedDevice.gateway}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-6 text-center text-slate-500">
          <p>Click any device on the topology or press "Play Simulation" to inspect packet headers.</p>
        </div>
      )}
    </div>
  );
};
