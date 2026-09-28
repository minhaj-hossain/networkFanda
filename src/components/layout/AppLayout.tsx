import React, { useState } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Layers,
  LifeBuoy,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  Search,
  User,
  Menu,
  X,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import { PWAInstallButton } from '../PWAInstallButton';

export type AppNavView =
  | 'dashboard'
  | 'learning'
  | 'simulations'
  | 'practice'
  | 'progress'
  | 'curriculum_doc';

interface AppLayoutProps {
  currentView: AppNavView;
  setCurrentView: (view: AppNavView) => void;
  onOpenMentor: () => void;
  completedDaysCount: number;
  totalDays: number;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentView,
  setCurrentView,
  onOpenMentor,
  completedDaysCount,
  totalDays,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems: { id: AppNavView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'learning', label: 'Learning Path', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'simulations', label: 'Simulations', icon: <Layers className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice & Tickets', icon: <LifeBuoy className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      {/* Sidebar: Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800/80 shrink-0 select-none">
        {/* Brand / Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 transition-colors">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">
                TechNova NetLab
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                Junior IT Academy
              </span>
            </div>
          </button>
        </div>

        {/* Primary Navigation */}
        <div className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
            Workspace
          </p>
          {navItems.map((item) => {
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                  active
                    ? 'bg-sky-500/10 text-sky-300 font-semibold border border-sky-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className={active ? 'text-sky-400' : 'text-slate-500'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-6">
            <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
              Reference
            </p>
            <button
              onClick={() => setCurrentView('curriculum_doc')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                currentView === 'curriculum_doc'
                  ? 'bg-sky-500/10 text-sky-300 font-semibold border border-sky-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Full Curriculum .md</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          {/* Subtle Progress Metric */}
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
              <span className="text-slate-400">Path Progress</span>
              <span className="text-sky-400 font-semibold">
                {completedDaysCount} / {totalDays}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-sky-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.round((completedDaysCount / totalDays) * 100)}%` }}
              />
            </div>
          </div>

          {/* PWA Install */}
          <div className="flex items-center justify-between">
            <PWAInstallButton />
          </div>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Persistent Top Navigation Bar */}
        <header className="h-16 px-4 sm:px-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between gap-4 sticky top-0 z-30">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Search Box / Context */}
          <div className="flex-1 max-w-md hidden sm:flex items-center relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search concepts (e.g. ARP, VLAN, Default Route, NAT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-sans"
            />
          </div>

          {/* Top Right Utilities */}
          <div className="flex items-center gap-3">
            {/* Contextual Mentor Button (Lightbulb) */}
            <button
              onClick={onOpenMentor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-medium transition-colors"
              title="Open Contextual Mentor"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Mentor</span>
            </button>

            {/* Profile Avatar / Role Tag */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 text-xs font-bold">
                TN
              </div>
              <div className="hidden lg:block text-left">
                <span className="text-xs font-semibold text-slate-200 block leading-tight">
                  Trainee Engineer
                </span>
                <span className="text-[10px] text-slate-500 font-mono block">
                  TechNova Support
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-left ${
                  currentView === item.id
                    ? 'bg-sky-500/10 text-sky-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Screen View Container */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
