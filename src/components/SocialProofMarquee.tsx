'use client';

import React from 'react';
import { ShieldCheck, Cpu, Terminal, Zap, Globe, Database, Layers, Cloud } from 'lucide-react';

const PARTNERS = [
  { name: 'Vercel', icon: Zap },
  { name: 'Supabase', icon: Database },
  { name: 'Next.js 14', icon: Layers },
  { name: 'Stripe', icon: ShieldCheck },
  { name: 'Resend', icon: Terminal },
  { name: 'Railway', icon: Cloud },
  { name: 'PlanetScale', icon: Globe },
  { name: 'Convex', icon: Cpu },
];

export const SocialProofMarquee: React.FC = () => {
  return (
    <section className="py-12 border-y border-white/5 bg-[#090A0F]/90 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-6 text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Trusted by Next-Gen Developers & Engineering Teams Worldwide
        </p>
      </div>

      {/* Marquee Track */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center justify-around gap-12 py-2">
          {PARTNERS.concat(PARTNERS).map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 transition-colors opacity-75 hover:opacity-100 cursor-pointer"
              >
                <Icon className="h-5 w-5 text-cyan-500" />
                <span className="text-sm font-semibold tracking-wide">{partner.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
