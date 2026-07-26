'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Activity, Zap, Calculator, Calendar, Cpu, Layers } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { Hero3DBackgroundCanvas } from './Hero3DBackgroundCanvas';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onOpenWaitlist: (email?: string) => void;
}

const titleWords = ['Engineering', 'Enterprise', 'AI', 'Systems'];
const accentWords = ['&', 'Bespoke', 'Web', 'Platforms'];

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

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation, onOpenWaitlist }) => {
  // Parallax Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 15 });

  const badgeX1 = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const badgeY1 = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  const badgeX2 = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const badgeY2 = useTransform(springY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden select-none"
    >
      {/* 3D Mouse-Following Geometric Background Element Behind Text */}
      <Hero3DBackgroundCanvas />

      {/* Ambient Spotlight Background Overlays */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Hero Grid */}
      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
          
          {/* Left Text Column (7 Cols) */}
          <div className="lg:col-span-7 relative">
            {/* Parallax Floating 3D Micro-Badge 1 */}
            <motion.div
              style={{ x: badgeX1, y: badgeY1 }}
              className="hidden lg:flex absolute -top-8 -left-6 items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E1325]/90 border border-cyan-400/30 backdrop-blur-xl text-[11px] font-mono text-cyan-300 shadow-xl pointer-events-none z-30"
            >
              <Cpu className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>Gemini 3.6 Flash Multi-Modal Engine</span>
            </motion.div>

            {/* Status Pill */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.05}
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono backdrop-blur-xl mb-8 shadow-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              </span>
              <span className="text-cyan-300 font-semibold tracking-wider text-[11px] uppercase">
                ⚡ Saied Sagar Studio — Available for Q3/Q4 Enterprise Contracts
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tighter text-white sm:text-6xl lg:text-6xl xl:text-7xl leading-[1.08]">
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
              <span className="block mt-1">
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
              className="mt-6 text-base text-slate-300/90 sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Bespoke systems architecture, sub-11ms Wasm edge integrations, and high-converting SaaS applications built with Next.js 14, Three.js 3D WebGL, and Gemini AI Engines.
            </motion.p>

            {/* Glass CTA Buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={1.0}
              variants={fadeUpVariants}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.98] btn-glow font-mono"
              >
                <Calendar className="h-4 w-4" />
                <span className="relative z-10 tracking-tight">Book Discovery Call ($10k+)</span>
                <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white/[0.06] border border-white/15 px-6 py-4 text-sm font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all font-mono"
              >
                <Calculator className="h-4 w-4 text-cyan-400" />
                <span>Calculate Project Scope</span>
              </a>
            </motion.div>

            {/* Trust Matrix */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={1.2}
              variants={fadeUpVariants}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs font-mono text-slate-400"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>SOC2 Compliant Architecture</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" />
                <span>99.999% SLA Guarantee</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span>Sub-11ms Edge Execution</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Prominent Interactive 3D WebGL Core Box (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative z-20"
          >
            {/* Parallax Floating 3D Micro-Badge 2 */}
            <motion.div
              style={{ x: badgeX2, y: badgeY2 }}
              className="hidden lg:flex absolute -top-6 -right-4 items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E1325]/90 border border-emerald-400/30 backdrop-blur-xl text-[11px] font-mono text-emerald-300 shadow-xl pointer-events-none z-30"
            >
              <Layers className="h-3.5 w-3.5 text-emerald-400" />
              <span>Sub-11ms Wasm Edge Mesh</span>
            </motion.div>

            <div className="w-full relative p-4 rounded-3xl bg-gradient-to-b from-[#101529]/95 via-[#0A0D1D]/95 to-[#060507] border border-cyan-500/30 backdrop-blur-2xl shadow-2xl shadow-cyan-500/20 hover:border-cyan-400/50 transition-colors duration-500">
              <Hero3DCanvas />

              {/* Overlay Badge */}
              <div className="mt-2 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#060710] border border-cyan-400/30 text-xs font-mono text-cyan-300 font-bold shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Interactive 3D Engine Core</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
