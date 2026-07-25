'use client';

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onOpenWaitlist: (email?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWaitlist }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onOpenWaitlist(email.trim());
    } else {
      onOpenWaitlist();
    }
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[#090A0F]">
      {/* Stitch Background elements & Tech Grid */}
      <div className="absolute inset-0 tech-grid z-0 opacity-40 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Stitch v2.0 Live Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#152031]/80 px-4 py-1.5 text-xs font-semibold backdrop-blur-md mb-8 shadow-lg shadow-cyan-500/5"
        >
          <span className="relative flex h-2 w-2">
            <span className="pulse-animation absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="font-mono text-cyan-400 uppercase tracking-widest text-[11px]">⚡ v2.0 Engine Live</span>
        </motion.div>

        {/* High-Impact Headline from Stitch Design */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.15]"
        >
          Architect & Deploy <br className="hidden md:block" />
          <span className="text-gradient">Visual AI Pipelines</span> in Seconds
        </motion.h1>

        {/* Subheadline from Stitch Design */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-slate-300 md:text-xl max-w-3xl mx-auto font-normal leading-relaxed"
        >
          Simulate, test, and stream multimodal AI workflows with zero layout shift and sub-11ms execution latency. The professional toolset for DevOps-led AI engineering.
        </motion.p>

        {/* Inline Email Waitlist Form from Stitch Design */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="mt-10 mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg p-2 glass-panel rounded-2xl glow-cyan-border transition-all duration-300"
        >
          <div className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your engineering email..."
              className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-cyan-500 hover:bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:glow-cyan active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>Claim Early Access</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>

        {/* Trust Matrix Badges from Stitch Design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span>SOC2 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>99.99% Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span>Sub-11ms Edge Execution</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
