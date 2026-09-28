import React from 'react';
import { NetworkDevice } from '../../types/curriculum';
import { X, Server, Monitor, Cpu, Radio, Shield, Globe } from 'lucide-react';

interface DeviceInspectorDrawerProps {
  device: NetworkDevice | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateIp?: (newIp: string) => void;
}

export const DeviceInspectorDrawer: React.FC<DeviceInspectorDrawerProps> = ({
  device,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !device) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto font-sans text-slate-200">
      <div className="space-y-6">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              {device.type === 'pc' ? (
                <Monitor className="w-4 h-4" />
              ) : device.type === 'switch' ? (
                <Cpu className="w-4 h-4" />
              ) : device.type === 'router' ? (
                <Radio className="w-4 h-4" />
              ) : (
                <Server className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-100">{device.name}</h3>
              <p className="text-[10px] font-mono uppercase text-slate-400">
                Hardware Device Inspector
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* State Badge */}
        <div className="flex items-center justify-between text-xs p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono">
          <span className="text-slate-400">Interface Status:</span>
          <span
            className={`font-semibold ${
              device.status === 'online'
                ? 'text-emerald-400'
                : device.status === 'misconfigured'
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          >
            ● {device.status.toUpperCase()}
          </span>
        </div>

        {/* Network Properties Grid */}
        <div className="space-y-3 font-mono text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
            TCP/IP Configuration
          </span>

          <div className="space-y-2">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">IPv4 Address:</span>
              <span className="text-sky-300 font-semibold">{device.ip}</span>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Physical MAC:</span>
              <span className="text-slate-300">{device.mac}</span>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Subnet Mask:</span>
              <span className="text-slate-300">{device.subnetMask}</span>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Default Gateway:</span>
              <span className="text-amber-400">{device.gateway}</span>
            </div>

            {device.dns && (
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Primary DNS:</span>
                <span className="text-slate-300">{device.dns}</span>
              </div>
            )}

            {device.vlan && (
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Assigned VLAN:</span>
                <span className="text-indigo-400 font-bold">VLAN {device.vlan}</span>
              </div>
            )}
          </div>
        </div>

        {/* CAM / MAC Table for Switches */}
        {device.type === 'switch' && (
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              CAM / MAC Address Table
            </span>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>Port</span>
                <span>Learned MAC</span>
                <span>VLAN</span>
              </div>
              <div className="flex justify-between text-slate-300 text-[11px]">
                <span>Gi0/1</span>
                <span>AA:BB:CC:01:01:01</span>
                <span>1</span>
              </div>
              <div className="flex justify-between text-slate-300 text-[11px]">
                <span>Gi0/2</span>
                <span>00:1A:2B:SW:01:00</span>
                <span>1</span>
              </div>
            </div>
          </div>
        )}

        {/* Routing Table for Routers */}
        {device.type === 'router' && (
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              IP Routing Table
            </span>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1.5 text-[11px]">
              <div className="text-slate-400 font-semibold">192.168.1.0/24 is directly connected, Gi0/0</div>
              <div className="text-slate-400 font-semibold">203.0.113.0/29 is directly connected, Gi0/1</div>
              <div className="text-sky-300 font-semibold">S* 0.0.0.0/0 [1/0] via 203.0.113.1</div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
        >
          Close Inspector
        </button>
      </div>
    </div>
  );
};
