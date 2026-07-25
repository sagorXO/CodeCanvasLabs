'use client';

import React from 'react';
import { Layers, Sparkles, Terminal, Shield, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-[#060507]/90 backdrop-blur-xl transition-all shadow-xl shadow-cyan-950/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#060507]">
              <Layers className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              CodeCanvas <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">Labs</span>
            </span>
          </div>
        </a>

        {/* Anchor Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#simulator" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-400" /> Simulator
          </a>
          <a href="#features" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" /> Features
          </a>
          <a href="#pricing" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" /> Pricing
          </a>
        </nav>

        {/* CTA Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenWaitlist}
            className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-cyan-500/50 hover:scale-[1.03] active:scale-[0.97] btn-glow"
          >
            <span>Join Waitlist</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
