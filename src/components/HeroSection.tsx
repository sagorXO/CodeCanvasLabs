'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Code2, Users } from 'lucide-react';
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
    <section className="relative overflow-hidden py-24 md:py-32 bg-radial-glow">
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-500/10 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>⚡ CodeCanvas v2.0 Live — Visual Agentic Infrastructure</span>
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
        </motion.div>

        {/* High-Impact Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.15]"
        >
          Architect Pipelines at the <br />
          <span className="text-gradient">Speed of Thought.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-slate-300 md:text-xl max-w-3xl mx-auto font-normal leading-relaxed"
        >
          Build, simulate, and deploy deterministic AI visual workflows with zero layout shift, sub-second execution, and enterprise-grade security.
        </motion.p>

        {/* Inline Email Input Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="mt-10 mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md"
        >
          <div className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="w-full rounded-xl border border-white/15 bg-slateCard/90 px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-md shadow-inner transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Get Early Access</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.form>

        {/* Trust Badge Matrix */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-400 border-t border-white/10 pt-8"
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-cyan-400" />
            <span>3,800+ Developers On Waitlist</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-400" />
            <span>11ms Average Execution</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>SOC2 Type II Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-cyan-400" />
            <span>TypeScript Native</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
