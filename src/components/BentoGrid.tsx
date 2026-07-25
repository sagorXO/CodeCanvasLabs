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
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-cyan-400',
    span: 'col-span-1 md:col-span-2'
  },
  {
    title: 'Gemini AI Nodes',
    description: 'Native Gemini 3.6 Flash integration for structured JSON transformations and autonomous task execution.',
    icon: Cpu,
    badge: 'Multimodal',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'hover:border-blue-400',
    span: 'col-span-1'
  },
  {
    title: 'Zero-Trust Shielding',
    description: 'End-to-end payload encryption, strict CORS controls, and rate-limiting policies out of the box.',
    icon: Shield,
    badge: 'SOC2 Type II',
    color: 'from-emerald-500/20 to-cyan-500/20',
    borderColor: 'hover:border-emerald-400',
    span: 'col-span-1'
  },
  {
    title: 'Global CDN Mesh',
    description: 'Deploy pipelines to 300+ edge locations worldwide with automatic geo-routing and instant failover.',
    icon: Globe,
    badge: '300+ Regions',
    color: 'from-blue-500/20 to-emerald-500/20',
    borderColor: 'hover:border-blue-400',
    span: 'col-span-1'
  },
  {
    title: 'Global Observability',
    description: 'Live payload tracing, memory diagnostics, and real-time execution logs streaming via WebSockets.',
    icon: Activity,
    badge: 'Real-time',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-cyan-400',
    span: 'col-span-1'
  },
  {
    title: 'Instant Pipeline Branching',
    description: 'Fork production pipelines into isolated preview environments instantly with zero data footprint.',
    icon: GitBranch,
    badge: 'Git-Native',
    color: 'from-cyan-500/20 to-emerald-500/20',
    borderColor: 'hover:border-cyan-400',
    span: 'col-span-1 md:col-span-2'
  }
];

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 mx-auto max-w-7xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          Engineered for <span className="text-gradient">Production Scale</span>
        </h2>
        <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
          Every component is optimized for performance, deterministic reliability, and developer experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-panel p-8 rounded-2xl relative group glass-panel-hover flex flex-col justify-between ${feature.span} ${feature.borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} border border-white/10 text-cyan-400`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  {feature.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>CodeCanvas Core v2.0</span>
                <span className="text-cyan-400/80">Deterministic</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
