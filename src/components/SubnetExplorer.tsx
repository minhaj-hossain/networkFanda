import React, { useState } from 'react';
import { Sliders, CheckCircle2, Split, Server, Users, ArrowRight } from 'lucide-react';

export const SubnetExplorer: React.FC = () => {
  const [cidr, setCidr] = useState<number>(24);
  const baseIp = '192.168.1.0';

  // Subnet calculations
  const totalIps = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : totalIps - 2;

  const calculateSubnetMask = (prefix: number): string => {
    let mask = '';
    for (let i = 0; i < 4; i++) {
      const bitsInOctet = Math.min(Math.max(prefix - i * 8, 0), 8);
      const octetValue = 256 - Math.pow(2, 8 - bitsInOctet);
      mask += (i > 0 ? '.' : '') + octetValue;
    }
    return mask;
  };

  const subnetMask = calculateSubnetMask(cidr);

  // Department assignment simulation state (Day 5)
  const [deptAssignments, setDeptAssignments] = useState<{ [dept: string]: string }>({
    HR: '192.168.1.0/26',
    IT: '192.168.1.64/26',
    Finance: '192.168.1.128/26',
    Sales: '192.168.1.192/26',
  });

  const availableBlocks = [
    { label: 'Subnet 0', cidr: '192.168.1.0/26', range: '192.168.1.1 - 192.168.1.62', bc: '192.168.1.63' },
    { label: 'Subnet 1', cidr: '192.168.1.64/26', range: '192.168.1.65 - 192.168.1.126', bc: '192.168.1.127' },
    { label: 'Subnet 2', cidr: '192.168.1.128/26', range: '192.168.1.129 - 192.168.1.190', bc: '192.168.1.191' },
    { label: 'Subnet 3', cidr: '192.168.1.192/26', range: '192.168.1.193 - 192.168.1.254', bc: '192.168.1.255' },
  ];

  return (
    <div className="w-full space-y-6 text-slate-200">
      {/* Module 1: Interactive Subnet Boundary Slider (Day 4) */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h3 className="font-semibold text-sm text-slate-100">
              Interactive Subnet Mask Boundary Slider
            </h3>
          </div>
          <span className="font-mono text-sky-400 text-sm font-semibold">
            /{cidr} Prefix Length
          </span>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>/16 (Large WAN)</span>
            <span>/24 (Standard LAN)</span>
            <span>/26 (4 Subnets)</span>
            <span>/30 (Point-to-Point)</span>
          </div>
          <input
            type="range"
            min={16}
            max={30}
            step={1}
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>

        {/* Binary Visualizer (Network 1s vs Host 0s) */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
            32-Bit Mask Binary Representation
          </span>
          <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
            {Array.from({ length: 32 }).map((_, idx) => {
              const isNetworkBit = idx < cidr;
              return (
                <span
                  key={idx}
                  className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold ${
                    isNetworkBit
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  } ${idx % 8 === 7 && idx < 31 ? 'mr-1.5' : ''}`}
                >
                  {isNetworkBit ? '1' : '0'}
                </span>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-1">
            <span className="text-sky-300">{cidr} Network Bits</span>
            <span className="text-slate-400">{32 - cidr} Host Bits</span>
          </div>
        </div>

        {/* Computed Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-slate-500 text-[10px] block">Dotted Decimal Mask</span>
            <span className="text-sky-300 font-bold text-sm">{subnetMask}</span>
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-slate-500 text-[10px] block">Total IP Addresses</span>
            <span className="text-slate-200 font-bold text-sm tabular-nums">
              {totalIps.toLocaleString()}
            </span>
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-slate-500 text-[10px] block">Usable Host Hosts</span>
            <span className="text-emerald-400 font-bold text-sm tabular-nums">
              {usableHosts.toLocaleString()}
            </span>
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-slate-500 text-[10px] block">Block Size</span>
            <span className="text-amber-400 font-bold text-sm tabular-nums">
              {Math.min(totalIps, 256)}
            </span>
          </div>
        </div>
      </div>

      {/* Module 2: TechNova Department Subnet Allocator (Day 5) */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Split className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-sm text-slate-100">
              Day 05 Subnet Divider: 4 TechNova Departments
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Parent: 192.168.1.0/24 → Four /26 Subnets
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          TechNova has 4 departments and one single <code className="text-sky-300 font-mono">192.168.1.0/24</code> block.
          By borrowing 2 host bits, we create four non-overlapping <code className="text-emerald-300 font-mono">/26</code> subnets,
          each accommodating up to 62 usable endpoints.
        </p>

        {/* 4 Partitioned Subnet Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {availableBlocks.map((block, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-sky-400 font-mono">
                  {block.label}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono">
                  62 Hosts
                </span>
              </div>
              <p className="font-mono text-sm font-semibold text-slate-100">
                {block.cidr}
              </p>
              <div className="space-y-0.5 text-[10px] font-mono text-slate-400">
                <div>Range: <span className="text-slate-300">{block.range}</span></div>
                <div>Broadcast: <span className="text-slate-300">{block.bc}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Department Allocation Cards */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Department IP Scheme Assignments
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: 'HR Department', staff: '28 Staff', key: 'HR', color: 'border-emerald-500/40' },
              { name: 'IT Engineering', staff: '35 Engineers', key: 'IT', color: 'border-sky-500/40' },
              { name: 'Finance & Payroll', staff: '20 Staff', key: 'Finance', color: 'border-amber-500/40' },
              { name: 'Sales & Marketing', staff: '45 Staff', key: 'Sales', color: 'border-purple-500/40' },
            ].map((dept) => (
              <div
                key={dept.key}
                className={`p-3 bg-slate-950/80 border rounded-lg space-y-1.5 ${dept.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">{dept.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">{dept.staff}</p>
                <div className="p-1.5 rounded bg-slate-900 font-mono text-xs text-sky-300 font-semibold text-center">
                  {deptAssignments[dept.key]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
