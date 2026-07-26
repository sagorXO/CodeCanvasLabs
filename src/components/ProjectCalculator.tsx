'use client';

import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectCalculatorProps {
  onOpenConsultation: (details?: string) => void;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({ onOpenConsultation }) => {
  const [projectType, setProjectType] = useState<'ai_platform' | 'saas_app' | 'edge_mesh'>('ai_platform');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['gemini_ai', 'wasm_edge']);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'expedited'>('standard');

  const basePrices = {
    ai_platform: 10000,
    saas_app: 12500,
    edge_mesh: 15000,
  };

  const addonPrices: Record<string, { label: string; price: number; timeWeeks: number }> = {
    gemini_ai: { label: 'Gemini 3.6 Flash / LLM Agent Engines', price: 2500, timeWeeks: 1 },
    three_3d: { label: '3D WebGL / Canvas Micro-Interactions', price: 2000, timeWeeks: 1 },
    wasm_edge: { label: 'Sub-11ms Wasm Edge Optimization', price: 3000, timeWeeks: 2 },
    soc2_compliance: { label: 'SOC2 & Zero-Trust Security Audit', price: 2500, timeWeeks: 1 },
  };

  const toggleAddon = (key: string) => {
    setSelectedAddons(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const calculateTotal = () => {
    let total = basePrices[projectType];
    selectedAddons.forEach(k => {
      if (addonPrices[k]) total += addonPrices[k].price;
    });
    if (timelineSpeed === 'expedited') total *= 1.2; // 20% surge for priority sprint
    return Math.round(total);
  };

  const calculateTimelineWeeks = () => {
    let weeks = projectType === 'ai_platform' ? 4 : projectType === 'saas_app' ? 5 : 6;
    selectedAddons.forEach(k => {
      if (addonPrices[k]) weeks += addonPrices[k].timeWeeks;
    });
    if (timelineSpeed === 'expedited') weeks = Math.max(2, Math.round(weeks * 0.7));
    return weeks;
  };

  const totalEstimate = calculateTotal();
  const totalWeeks = calculateTimelineWeeks();

  return (
    <section id="calculator" className="py-24 px-6 mx-auto max-w-6xl relative z-20">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-mono text-cyan-300 mb-4">
          <Calculator className="h-3.5 w-3.5" />
          <span>Interactive Enterprise Scope Estimator</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          Project Scope & <span className="text-gradient">Cost Estimator</span>
        </h2>
        <p className="mt-4 text-slate-300/80 text-base sm:text-lg max-w-2xl mx-auto">
          Transparent, deterministic pricing for high-ticket software architecture engagements ($10,000+).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Estimator Controls (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Core Architecture Type */}
          <div className="p-6 rounded-2xl bg-[#0E111E]/90 border border-white/[0.08] backdrop-blur-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-4">
              1. Select Primary System Architecture
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'ai_platform', label: 'Visual AI Engine', sub: 'From $10,000' },
                { id: 'saas_app', label: 'Full-Stack SaaS', sub: 'From $12,500' },
                { id: 'edge_mesh', label: 'High-Speed Edge Mesh', sub: 'From $15,000' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setProjectType(item.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    projectType === item.id
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold">{item.label}</div>
                  <div className="text-xs font-mono text-cyan-400/80 mt-1">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Advanced Technology Add-ons */}
          <div className="p-6 rounded-2xl bg-[#0E111E]/90 border border-white/[0.08] backdrop-blur-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-4">
              2. Select Specialized System Modules
            </h4>
            <div className="space-y-2.5">
              {Object.entries(addonPrices).map(([key, data]) => {
                const isSelected = selectedAddons.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() => toggleAddon(key)}
                    className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white'
                        : 'bg-black/40 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-sm font-semibold">
                      <div className={`h-4 w-4 rounded flex items-center justify-center border ${
                        isSelected ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-600'
                      }`}>
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span>{data.label}</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-300 font-bold">+$${data.price.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Delivery Timeline Speed */}
          <div className="p-6 rounded-2xl bg-[#0E111E]/90 border border-white/[0.08] backdrop-blur-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-4">
              3. Sprint Delivery Schedule
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTimelineSpeed('standard')}
                className={`p-3.5 rounded-xl border text-center text-xs font-mono font-bold transition-all ${
                  timelineSpeed === 'standard'
                    ? 'bg-cyan-500/15 border-cyan-400 text-white'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                Standard Sprint (Iterative)
              </button>
              <button
                onClick={() => setTimelineSpeed('expedited')}
                className={`p-3.5 rounded-xl border text-center text-xs font-mono font-bold transition-all ${
                  timelineSpeed === 'expedited'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                ⚡ Priority Fast-Track (+20%)
              </button>
            </div>
          </div>
        </div>

        {/* Live Investment Summary Card (Right 5 Cols) */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="p-8 rounded-3xl border-2 border-cyan-400 bg-gradient-to-b from-[#11162B] via-[#0E111E] to-[#070912] shadow-[0_0_50px_rgba(6,182,212,0.2)]">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-semibold mb-3">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Investment Proposal Estimate</span>
            </div>

            <div className="mb-6">
              <div className="text-xs font-mono text-slate-400">Estimated Total Investment</div>
              <div className="text-5xl font-extrabold text-white tracking-tight mt-1 flex items-baseline gap-1">
                <span>${totalEstimate.toLocaleString()}</span>
                <span className="text-xs font-mono font-normal text-slate-400">USD</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-3 mb-6 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-cyan-400" /> Timeline</span>
                <span className="text-cyan-300 font-bold">{totalWeeks} Weeks</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Warranty</span>
                <span className="text-emerald-300 font-bold">90-Day Post-Launch</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-cyan-400" /> Latency Guarantee</span>
                <span className="text-cyan-300 font-bold">Sub-11ms SLA</span>
              </div>
            </div>

            <button
              onClick={() => onOpenConsultation(`Estimated Proposal: $${totalEstimate.toLocaleString()} USD (${totalWeeks} Weeks Delivery)`)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all btn-glow flex items-center justify-center gap-2 font-mono"
            >
              <span>Request Custom Proposal</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-[11px] text-center text-slate-500 font-mono mt-4">
              Direct consultation & discovery contract with Saied Sagar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
