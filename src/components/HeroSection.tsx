'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Activity, Zap } from 'lucide-react';

interface HeroSectionProps {
  onOpenWaitlist: (email?: string) => void;
}

const titleWords = ['Architect', 'AI', 'Pipelines', '—'];
const accentWords = ['We', 'Make', 'It', 'Cinematic'];

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.06,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient Radial Spotlight Overlays */}
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#060507] to-transparent pointer-events-none z-10" />

      {/* Content — layered cleanly */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
        {/* Status Pill */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.05}
          variants={fadeUpVariants}
          className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono backdrop-blur-xl mb-8 shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          </span>
          <span className="text-cyan-300 font-semibold tracking-wider text-[11px] uppercase">
            ⚡ CodeCanvas v2.0 Live — Visual Engine
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tighter text-white sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.08] max-w-4xl mx-auto">
          <span className="block">
            {titleWords.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block mt-1 sm:mt-2">
            {accentWords.map((word, i) => (
              <motion.span
                key={word}
                custom={titleWords.length + i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block mr-[0.25em] shimmer-text"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.8}
          variants={fadeUpVariants}
          className="mt-6 text-base text-slate-300/90 sm:text-lg lg:text-xl max-w-2xl mx-auto font-normal leading-relaxed text-pretty"
        >
          Simulate, test, and deploy multimodal AI workflows with zero layout shift and sub-11ms execution latency.
        </motion.p>

        {/* Glass CTA Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1.0}
          variants={fadeUpVariants}
          className="mt-9"
        >
          <button
            type="button"
            onClick={() => onOpenWaitlist()}
            className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.98] btn-glow"
          >
            <span className="relative z-10 font-mono tracking-tight text-[15px]">Get Unlimited Access</span>
            <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Trust Matrix */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1.2}
          variants={fadeUpVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span>SOC2 Certified</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>99.99% Uptime</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span>Sub-11ms Edge Execution</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
