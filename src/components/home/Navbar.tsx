import React, { useState } from 'react';
import {
  Activity,
  Search,
  Menu,
  X,
  Layers,
  GraduationCap,
  LifeBuoy,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { PWAInstallButton } from '../PWAInstallButton';
import { DAYS_DATA } from '../../data/curriculumData';

export type NavTab = 'journey' | 'simulations' | 'practice' | 'progress' | 'curriculum_doc';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  completedDaysCount: number;
  totalDays: number;
  currentDayId: number;
  onOpenMentor: () => void;
  onSearchSelectDay?: (dayId: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  completedDaysCount,
  totalDays,
  currentDayId,
  onOpenMentor,
  onSearchSelectDay,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'journey', label: 'Roadmap', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'simulations', label: 'Simulations', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'practice', label: 'Practice', icon: <LifeBuoy className="w-3.5 h-3.5" /> },
  ];

  const percentComplete = Math.round((completedDaysCount / totalDays) * 100);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Professional Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('journey')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            {/* Geometric Modern Emblem */}
            <div className="relative w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 group-hover:bg-sky-500/20 transition-all duration-200">
              <Activity className="w-4 h-4 text-sky-400" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                TechNova NetLab
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                IT Systems Academy
              </span>
            </div>
          </button>
        </div>

        {/* Center: Clean Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectTab(link.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-sky-300 bg-sky-500/10 border border-sky-500/25 shadow-sm shadow-sky-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Streak / Progress, Notification & Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Curriculum Search */}
          <div className="relative hidden lg:block">
            <div
              className={`flex items-center relative transition-all duration-200 ${
                searchFocused || searchQuery ? 'w-60' : 'w-44'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topics (e.g. ARP, VLAN)..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:bg-slate-900 transition-all font-sans"
              />
            </div>

            {/* Search Dropdown Results */}
            {searchFocused && searchQuery.trim().length > 1 && (
              <div className="absolute top-full mt-2 left-0 right-0 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-1 max-h-64 overflow-y-auto">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 py-1 block">
                  Curriculum Results
                </span>
                {DAYS_DATA.filter(
                  (d) =>
                    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.concepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    `day ${d.id}`.includes(searchQuery.toLowerCase())
                )
                  .slice(0, 5)
                  .map((d) => (
                    <button
                      key={d.id}
                      onMouseDown={() => {
                        if (onSearchSelectDay) {
                          onSearchSelectDay(d.id);
                        }
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-sky-400 font-semibold">
                          Day {d.id.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Level 0{d.phase}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 group-hover:text-white line-clamp-1 font-medium">
                        {d.title}
                      </p>
                    </button>
                  ))}
              </div>
            )}
          </div>
          {/* Quick Streak / Day Status Indicator */}
          <button
            onClick={() => onSelectTab('progress')}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 text-xs font-mono transition-colors cursor-pointer"
            title="View Competencies & Progress"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-400">Day {currentDayId.toString().padStart(2, '0')}</span>
            <span className="text-slate-600">·</span>
            <span className="text-sky-400 font-semibold">{percentComplete}%</span>
          </button>

          {/* Mentor Button (Quiet & Discreet) */}
          <button
            onClick={onOpenMentor}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 text-xs font-medium transition-colors cursor-pointer"
            title="Ask Senior IT Mentor"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Mentor</span>
          </button>

          {/* PWA Install Button */}
          <div className="hidden sm:block">
            <PWAInstallButton />
          </div>

          {/* Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-semibold text-xs text-sky-300">
              TM
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-semibold text-slate-200 block leading-tight">
                IT Trainee
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                Level 01 Active
              </span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-slate-950 border-b border-slate-800 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left ${
                activeTab === link.id
                  ? 'bg-sky-500/15 text-sky-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400 px-3">
            <span>Overall Path Progress</span>
            <span className="text-sky-400 font-bold">{percentComplete}% Complete</span>
          </div>
        </div>
      )}
    </header>
  );
};
