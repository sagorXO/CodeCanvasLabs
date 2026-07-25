'use client';

import React from 'react';
import { Layers, Github, Twitter, Disc as Discord, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#090A0F] py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#090A0F]">
              <Layers className="h-4 w-4 text-cyan-400" />
            </div>
          </div>
          <span className="text-base font-bold text-white">CodeCanvas Labs</span>
        </div>

        {/* System Status Indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono border border-emerald-500/20 bg-emerald-950/20 px-3 py-1.5 rounded-full">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>All Systems Operational (11ms Latency)</span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} CodeCanvas Labs, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
