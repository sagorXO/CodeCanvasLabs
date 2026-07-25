'use client';

import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface CTABannerProps {
  onOpenWaitlist: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="py-24 px-6 mx-auto max-w-6xl relative z-20">
      <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0E1528] via-[#090B16] to-[#060507] p-10 md:p-16 text-center overflow-hidden shadow-2xl shadow-cyan-500/10">
        {/* Ambient radial glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-mono text-cyan-300 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ready for Production AI Pipelines?</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight leading-tight">
            Build Better AI Workflows <br className="hidden sm:block" />
            <span className="shimmer-text">Start Building Today</span>
          </h2>

          <p className="mt-5 text-slate-300/90 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Join 3,800+ engineers building high-speed visual AI pipelines with zero layout shift and sub-11ms execution latency.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenWaitlist}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-slate-950 font-bold px-8 py-4 text-sm font-mono shadow-xl transition-all duration-300 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-cyan-400/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Early Access Key</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>SOC2 Type II Certified</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>Free Developer Sandbox</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
