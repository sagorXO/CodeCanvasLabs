'use client';

import React from 'react';
import { Cpu, Zap, Shield, Globe, Activity, GitBranch, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'Edge Execution Engine',
    description: 'Run visual workflows directly at the edge with sub-11ms execution latency and zero warm-up delays.',
    icon: Zap,
    badge: '11ms Latency',
    span: 'col-span-1 md:col-span-2',
  },
  {
    title: 'Gemini AI Nodes',
    description: 'Native Gemini 3.6 Flash integration for structured JSON transformations and autonomous task execution.',
    icon: Cpu,
    badge: 'Multimodal',
    span: 'col-span-1',
  },
  {
    title: 'Zero-Trust Shielding',
    description: 'End-to-end payload encryption, strict CORS controls, and rate-limiting policies out of the box.',
    icon: Shield,
    badge: 'SOC2 Type II',
    span: 'col-span-1',
  },
  {
    title: 'Global CDN Mesh',
    description: 'Deploy pipelines to 300+ edge locations worldwide with automatic geo-routing and instant failover.',
    icon: Globe,
    badge: '300+ Regions',
    span: 'col-span-1',
  },
  {
    title: 'Global Observability',
    description: 'Live payload tracing, memory diagnostics, and real-time execution logs streaming via WebSockets.',
    icon: Activity,
    badge: 'Real-time',
    span: 'col-span-1',
  },
  {
    title: 'Instant Pipeline Branching',
    description: 'Fork production pipelines into isolated preview environments instantly with zero data footprint.',
    icon: GitBranch,
    badge: 'Git-Native',
    span: 'col-span-1 md:col-span-2',
  },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 40,
    x: i % 2 === 0 ? -20 : 20,
    rotateX: 4,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-28 px-6 mx-auto max-w-7xl relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          Engineered for <span className="text-gradient">Production Scale</span>
        </h2>
        <p className="mt-4 text-slate-300/80 text-base sm:text-lg max-w-2xl mx-auto">
          Every component is optimized for performance, deterministic reliability, and developer experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ perspective: '1200px' }}>
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              className={`group relative bg-[#0E111E]/90 backdrop-blur-xl p-7 rounded-2xl border border-white/[0.06] hover:border-cyan-500/30 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.12)] ${feature.span}`}
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-cyan-400 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/[0.08] transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/[0.04] text-slate-300 border border-white/[0.06] group-hover:text-cyan-300 group-hover:border-cyan-500/20 transition-all duration-300">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-200 transition-colors duration-300 flex items-center gap-2">
                  {feature.title}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400" />
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="relative z-10 mt-7 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>CodeCanvas Core v2.0</span>
                <span className="text-cyan-500/60 font-semibold">Deterministic</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
