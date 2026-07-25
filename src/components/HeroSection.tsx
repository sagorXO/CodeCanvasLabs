'use client';

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Activity, RefreshCw, Cpu, CheckCircle2, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onOpenWaitlist: (email?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWaitlist }) => {
  const [email, setEmail] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onOpenWaitlist(email.trim());
    } else {
      onOpenWaitlist();
    }
  };

  const handleRunQuickSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-[#060507]">
      {/* GetLayers Helion Ambient Shader & Grid Overlay Background */}
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-blue-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#060507] to-transparent pointer-events-none z-10" />

      <div className="relative z-20 mx-auto max-w-6xl px-6 text-center">
        {/* Helion Glass Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono backdrop-blur-xl mb-8 shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#4cd7f6]" />
          </span>
          <span className="text-cyan-400 font-semibold tracking-wider text-[11px] uppercase">
            ⚡ CodeCanvas v2.0 Live — Visual Engine
          </span>
        </motion.div>

        {/* Helion Shimmer Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tighter text-white sm:text-6xl lg:text-7xl leading-[1.1] max-w-4xl mx-auto"
        >
          Architect AI Pipelines — <br className="hidden sm:block" />
          <span className="shimmer-text">We Make It Cinematic</span>
        </motion.h1>

        {/* Helion Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base text-slate-300 sm:text-lg lg:text-xl max-w-2xl mx-auto font-normal leading-relaxed text-pretty"
        >
          Simulate, test, and stream multimodal AI workflows with zero layout shift and sub-11ms execution latency.
        </motion.p>

        {/* Helion CTA Form with Shimmer Hover Button */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
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
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 backdrop-blur-xl transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-white text-slate-950 font-bold px-6 py-3.5 text-sm transition-all duration-300 hover:bg-cyan-400 hover:text-slate-950 btn-glow relative overflow-hidden group flex items-center justify-center gap-2"
          >
            <span className="relative z-10 font-mono tracking-tight">Get Unlimited Access</span>
            <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </button>
        </motion.form>

        {/* Helion Trust Matrix */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400"
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

        {/* Helion Browser Chrome 3D Preview Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 max-w-5xl mx-auto rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl relative"
        >
          {/* Top Browser Window Bar */}
          <div className="h-10 border-b border-white/5 px-4 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 dot-pulse" />
                <span>Live Streaming Latency: 8.4ms</span>
              </div>
              <button
                type="button"
                onClick={handleRunQuickSimulation}
                className="text-slate-400 hover:text-cyan-400 transition-colors p-1 rounded"
                title="Refresh Latency Metric"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Interactive Pipeline Node Graph Surface */}
          <div className="p-8 bg-[#090A0F]/90 min-h-[220px] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

            {/* Node 1 */}
            <div className="relative z-10 flex-1 w-full p-4 rounded-xl border border-slate-800 bg-[#11131F]/90 backdrop-blur-md hover:border-cyan-500/40 transition-all text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Node 01 · Webhook</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">200 OK</span>
              </div>
              <p className="text-sm font-semibold text-white">Event Stream Ingest</p>
              <p className="text-xs font-mono text-slate-400 mt-1">latency: 1.8ms</p>
            </div>

            {/* Connector Arrow 1 */}
            <div className="hidden md:flex items-center justify-center text-slate-600">
              <ArrowRight className="h-5 w-5 animate-pulse text-cyan-400" />
            </div>

            {/* Node 2 */}
            <div className="relative z-10 flex-1 w-full p-4 rounded-xl border border-cyan-500/50 bg-[#11131F] backdrop-blur-md shadow-lg shadow-cyan-500/10 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Node 02 · Gemini Engine</span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <Cpu className="h-3 w-3 animate-spin text-cyan-400" />
                  <span>Processing</span>
                </span>
              </div>
              <p className="text-sm font-semibold text-white">Multimodal Transformation</p>
              <p className="text-xs font-mono text-slate-400 mt-1">latency: 4.6ms</p>
            </div>

            {/* Connector Arrow 2 */}
            <div className="hidden md:flex items-center justify-center text-slate-600">
              <ArrowRight className="h-5 w-5 animate-pulse text-cyan-400" />
            </div>

            {/* Node 3 */}
            <div className="relative z-10 flex-1 w-full p-4 rounded-xl border border-slate-800 bg-[#11131F]/90 backdrop-blur-md hover:border-cyan-500/40 transition-all text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Node 03 · Response</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Ready</span>
              </div>
              <p className="text-sm font-semibold text-white">HTTP Edge Dispatch</p>
              <p className="text-xs font-mono text-slate-400 mt-1">latency: 2.0ms</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
