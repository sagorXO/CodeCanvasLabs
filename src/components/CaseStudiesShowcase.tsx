'use client';

import React, { useState } from 'react';
import { Layers, ArrowUpRight, Cpu, Shield, Zap, Terminal, Activity, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CASE_STUDIES = [
  {
    id: 'case_1',
    title: 'Visual AI Workflow & Wasm Pipeline Engine',
    client: 'Fintech AI Enterprise',
    budget: '$18,500 Engagement',
    summary: 'Engineered a real-time node graph execution pipeline capable of processing multimodal AI payloads directly at edge locations with sub-11ms latency.',
    metrics: [
      { label: 'Avg Latency', val: '8.4 ms' },
      { label: 'Throughput', val: '120k req/s' },
      { label: 'Uptime SLA', val: '99.999%' },
    ],
    businessImpact: {
      roi: '3.4x Annual Operational Cost Savings',
      timeSaved: '78% reduction in manual transaction auditing',
      deliverable: 'Fully managed Wasm edge pipeline with automated failover & 24/7 monitoring dashboard.',
      highlights: [
        'Eliminated third-party SaaS dependency cost by $45,000/yr',
        'Accelerated customer onboarding flow from 12 mins to 14 seconds',
        'Guaranteed Zero Data Loss SLA with distributed multi-region sync'
      ]
    },
    architecture: [
      'Next.js 14 App Router + React 18 Concurrent Rendering',
      'Three.js GLSL Custom Noise WebGL Shader Pipeline',
      'Gemini 3.6 Flash Native Binding via Server-Sent Events',
      'WebAssembly (Wasm) Edge Worker Isolates'
    ],
    codeSnippet: `// Wasm Edge Payload Dispatcher (Sub-11ms SLA)
import { WasmEdgeMesh } from '@saiedsagar/edge-core';

export async function processPipelinePayload(stream: ArrayBuffer) {
  const isolate = await WasmEdgeMesh.spawn({ region: 'global_mesh' });
  const result = await isolate.transform(stream, { model: 'gemini-3.6-flash' });
  return result.latency_ms < 11 ? result.data : result.fallback();
}`
  },
  {
    id: 'case_2',
    title: 'Zero-Trust Edge Microservices Mesh',
    client: 'High-Frequency Trading Group',
    budget: '$22,000 Engagement',
    summary: 'Architected end-to-end encrypted payload routing microservices with automatic geo-failover across 300+ global edge locations.',
    metrics: [
      { label: 'Payload Encryption', val: 'AES-256 GCM' },
      { label: 'Failover Speed', val: '< 2 ms' },
      { label: 'Compliance', val: 'SOC2 Type II' },
    ],
    businessImpact: {
      roi: 'Passed SOC2 Type II Audit in 3 Weeks',
      timeSaved: '99.99% automated threat containment',
      deliverable: 'Complete Zero-Trust mesh setup with automated penetration test suite.',
      highlights: [
        'Shielded trading systems against multi-gigabit DDoS attack vectors',
        'Reduced security compliance audit preparation overhead by 120 hours',
        'Zero downtime recorded across 18 consecutive months'
      ]
    },
    architecture: [
      'Distributed Rust / Wasm Microservices',
      'Persistent WebSockets Mesh with Zero Cold-Starts',
      'Automated Rate-Limiting & Sliding Window Bucket Shielding',
      'Docker & Kubernetes Helm Chart Deployment Manifests'
    ],
    codeSnippet: `// Zero-Trust Security Shielding Policy
export const securityPolicy = {
  encryption: 'AES-256-GCM',
  headers: {
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': 'default-src https:',
  },
  rateLimit: { windowMs: 60000, maxRequests: 100 }
};`
  },
  {
    id: 'case_3',
    title: 'Autonomous Multimodal Agent Suite',
    client: 'Next-Gen SaaS Incubator',
    budget: '$15,000 Engagement',
    summary: 'Built an autonomous agentic framework leveraging Gemini 3.6 Flash for multi-step structured data extraction and automated code refactoring.',
    metrics: [
      { label: 'Accuracy', val: '99.4%' },
      { label: 'Cost Savings', val: '64%' },
      { label: 'Execution', val: 'Deterministic' },
    ],
    businessImpact: {
      roi: '5.2x Engineering Velocity Increase',
      timeSaved: 'Automated 80% of routine code migration tasks',
      deliverable: 'Custom agentic SDK with pre-built TDD validation harness.',
      highlights: [
        'Enabled non-technical product managers to generate verified API schemas',
        'Reduced cloud API token expenditures by 64% through prompt caching',
        'Shipped full MVP production release 3 weeks ahead of scheduled deadline'
      ]
    },
    architecture: [
      'Gemini 3.6 Flash Multi-Modal Tool Calling API',
      'Framer Motion Micro-Interaction UI State Machine',
      'PostgreSQL Prisma Migration & Audit Logging Layer',
      'Vitest TDD Test Suite (80%+ Code Coverage Guarantee)'
    ],
    codeSnippet: `// Gemini Agentic Tool Dispatch Loop
const agent = new GeminiAgent({ model: 'gemini-3.6-flash' });
const decision = await agent.evaluateTask(userPrompt);
if (decision.tool) {
  await executeTool(decision.tool, decision.args);
}`
  }
];

export const CaseStudiesShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('case_1');
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');

  const currentCase = CASE_STUDIES.find(c => c.id === activeTab) || CASE_STUDIES[0];

  return (
    <section id="cases" className="py-24 px-6 mx-auto max-w-6xl relative z-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-mono text-blue-300 mb-4">
          <Layers className="h-3.5 w-3.5" />
          <span>Selected Client Case Studies & Architecture Blueprints</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          Proven Engineering <span className="text-gradient">Case Studies</span>
        </h2>
        <p className="mt-4 text-slate-300/80 text-base sm:text-lg max-w-2xl mx-auto">
          Explore real-world software architecture engagements delivered for enterprise clients.
        </p>
      </div>

      {/* Dual View Mode Switcher: Business ROI vs Technical Specs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setViewMode('business')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
              viewMode === 'business'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>💼 Executive Business Impact</span>
          </button>
          <button
            onClick={() => setViewMode('technical')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
              viewMode === 'technical'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚡ Technical Architecture</span>
          </button>
        </div>
      </div>

      {/* Case Study Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {CASE_STUDIES.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveTab(c.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
              activeTab === c.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                : 'bg-white/[0.04] text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Main Case Study Display Frame */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentCase.id}-${viewMode}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-cyan-500/30 bg-[#0E111E]/95 p-8 md:p-12 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8 pb-8 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {currentCase.client}
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {currentCase.budget}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{currentCase.title}</h3>
              <p className="text-slate-300/90 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                {currentCase.summary}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 shrink-0 bg-black/40 p-4 rounded-2xl border border-white/10">
              {currentCase.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                  <div className="text-lg sm:text-xl font-extrabold text-cyan-300 font-mono mt-1">{m.val}</div>
                </div>
              ))}
            </div>
          </div>

          {viewMode === 'business' ? (
            /* Business ROI & Deliverable View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 bg-gradient-to-br from-cyan-950/20 to-transparent p-6 rounded-2xl border border-cyan-500/20">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  Business Value & ROI Highlights
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono text-slate-400">Measured Financial Impact</div>
                    <div className="text-xl font-bold text-emerald-300 mt-0.5">{currentCase.businessImpact.roi}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Operational Time Saved</div>
                    <div className="text-base font-semibold text-white mt-0.5">{currentCase.businessImpact.timeSaved}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Client Deliverable</div>
                    <div className="text-sm text-slate-300 mt-0.5">{currentCase.businessImpact.deliverable}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  Key Business Outcomes Achieved
                </h4>
                <ul className="space-y-3">
                  {currentCase.businessImpact.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 bg-white/[0.03] p-4 rounded-xl border border-white/[0.06]">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            /* Technical Architecture & Code View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Architecture Invariants */}
              <div className="lg:col-span-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  System Invariants & Stack Specification
                </h4>
                <ul className="space-y-3">
                  {currentCase.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-300 bg-white/[0.03] p-3 rounded-xl border border-white/[0.06]">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Code Snippet */}
              <div className="lg:col-span-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  Authoritative Implementation Snippet
                </h4>
                <pre className="p-5 rounded-2xl bg-[#060710] border border-white/10 font-mono text-xs text-cyan-300/90 leading-relaxed overflow-x-auto">
                  <code>{currentCase.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
