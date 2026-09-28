import React from 'react';
import { TerminalWorkspace } from '../TerminalWorkspace';
import { X, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isGatewayBroken: boolean;
  isDnsBroken: boolean;
  isCableUnplugged: boolean;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  isGatewayBroken,
  isDnsBroken,
  isCableUnplugged,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 h-[380px] bg-slate-950 border-t border-slate-800 shadow-2xl flex flex-col font-sans">
      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-xs text-slate-200">
            Workstation Diagnostic CLI Drawer
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden p-2">
        <TerminalWorkspace
          isGatewayBroken={isGatewayBroken}
          isDnsBroken={isDnsBroken}
          isCableUnplugged={isCableUnplugged}
        />
      </div>
    </div>
  );
};
