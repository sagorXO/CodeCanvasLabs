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
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#060507]">
      {/* Ambient gradients */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none z-0" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-cyan-500/12 via-blue-600/5 to-transparent rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#090A0F] to-transparent pointer-events-none z-10" />

      {/* Content — layered above 3D */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
        {/* Status Pill */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUpVariants}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-xs font-mono backdrop-blur-2xl mb-10 shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          </span>
          <span className="text-cyan-400 font-semibold tracking-wider text-[11px] uppercase">
            ⚡ CodeCanvas v2.0 Live — Visual Engine
          </span>
        </motion.div>

        {/* Headline — word-by-word stagger */}
        <h1 className="text-4xl font-extrabold tracking-tighter text-white sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] max-w-4xl mx-auto">
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
          custom={1.0}
          variants={fadeUpVariants}
          className="mt-7 text-base text-slate-300/90 sm:text-lg lg:text-xl max-w-xl mx-auto font-normal leading-relaxed text-pretty"
        >
          Simulate, test, and deploy multimodal AI workflows with zero layout shift and sub-11ms execution latency.
        </motion.p>

        {/* Glass CTA Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1.3}
          variants={fadeUpVariants}
          className="mt-11"
        >
          <button
            type="button"
            onClick={() => onOpenWaitlist()}
            className="group relative inline-flex items-center gap-3 rounded-2xl bg-white/[0.07] border border-white/[0.12] px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.12] hover:border-cyan-400/40 hover:shadow-[0_0_60px_rgba(6,182,212,0.25)] active:scale-[0.98]"
          >
            {/* Animated border glow blob */}
            <span className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" aria-hidden="true">
              <span className="border-glow-blob absolute w-24 h-24 rounded-full bg-cyan-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </span>

            <span className="relative z-10 font-mono tracking-tight text-[15px]">Get Unlimited Access</span>
            <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-cyan-400/20 transition-colors duration-300">
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>

        {/* Trust Matrix */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1.6}
          variants={fadeUpVariants}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-400/80"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400/70" />
            <span>SOC2 Certified</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400/70" />
            <span>99.99% Uptime</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-cyan-400/70" />
            <span>Sub-11ms Edge Execution</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
