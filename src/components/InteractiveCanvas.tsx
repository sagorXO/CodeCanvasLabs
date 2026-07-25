'use client';

import React, { useState } from 'react';
import { CanvasTab, PipelineNode } from '@/lib/types';
import { Terminal, Network, Code, CheckCircle2, Loader2, ArrowRight, Play, RefreshCw, Cpu, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InteractiveCanvas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CanvasTab>('visual');
  const [isExecuting, setIsExecuting] = useState(false);
  const [nodes, setNodes] = useState<PipelineNode[]>([
    { id: 'n1', type: 'trigger', label: 'Webhook Ingest', status: '200 OK', execution_ms: 2 },
    { id: 'n2', type: 'ai_transform', label: 'Gemini Engine Node', status: 'processing', execution_ms: 7 },
    { id: 'n3', type: 'output', label: 'HTTP Response', status: 'ready', execution_ms: 2 }
  ]);

  const handleSimulateRun = () => {
    setIsExecuting(true);
    setNodes(prev => prev.map(n => ({ ...n, status: 'processing' })));
    setTimeout(() => {
      setNodes([
        { id: 'n1', type: 'trigger', label: 'Webhook Ingest', status: '200 OK', execution_ms: 2 },
        { id: 'n2', type: 'ai_transform', label: 'Gemini Engine Node', status: '200 OK', execution_ms: 6 },
        { id: 'n3', type: 'output', label: 'HTTP Response', status: '200 OK', execution_ms: 3 }
      ]);
      setIsExecuting(false);
    }, 1200);
  };

  const jsonState = {
    active_tab: activeTab,
    nodes: nodes,
    metrics: { execution_time_ms: isExecuting ? 18 : 11, uptime_percentage: 99.99 }
  };

  return (
    <section id="simulator" className="py-16 px-6 mx-auto max-w-6xl">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
          Interactive <span className="text-gradient">Pipeline Simulator</span>
        </h2>
        <p className="mt-3 text-slate-400 text-base max-w-2xl mx-auto">
          Test real-time node routing, inspection payloads, and sub-second execution streams live in your browser.
        </p>
      </div>

      {/* Main Canvas Window Container */}
      <div className="rounded-2xl border border-white/15 bg-slateCard/95 shadow-2xl backdrop-blur-xl overflow-hidden shadow-cyan-500/10">
        {/* Window Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#0C0E18] px-5 py-3.5 gap-4">
          {/* Tab Selection */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-4">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>

            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'visual'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Network className="h-3.5 w-3.5" /> Visual Graph
            </button>

            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'json'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code className="h-3.5 w-3.5" /> Raw JSON Stream
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'logs'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" /> Terminal Stream
            </button>
          </div>

          {/* Execution Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <Activity className="h-3.5 w-3.5 text-cyan-400" /> 11ms Latency
            </span>
            <button
              onClick={handleSimulateRun}
              disabled={isExecuting}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Simulating...
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" /> Run Pipeline
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="p-8 min-h-[340px] flex items-center justify-center bg-[#090A0F]/60">
          <AnimatePresence mode="wait">
            {activeTab === 'visual' && (
              <motion.div
                key="visual"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full max-w-4xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Node 1: Webhook Ingest */}
                  <div className="glass-panel p-5 rounded-xl border-cyan-500/20 relative group hover:border-cyan-400 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Trigger</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> {nodes[0].status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                        <Terminal className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{nodes[0].label}</h4>
                        <p className="text-xs text-slate-400">POST /api/v1/webhook</p>
                      </div>
                    </div>
                  </div>

                  {/* Node 2: Gemini Engine Node */}
                  <div className="glass-panel p-5 rounded-xl border-cyan-500/30 relative group shadow-lg shadow-cyan-500/10 bg-cyan-950/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">AI Processing</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                        {isExecuting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Cpu className="h-3 w-3 text-cyan-400" />}
                        {nodes[1].status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-300">
                        <Cpu className="h-5 w-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{nodes[1].label}</h4>
                        <p className="text-xs text-cyan-400 font-mono">Gemini 3.6 Flash</p>
                      </div>
                    </div>
                  </div>

                  {/* Node 3: Output Response */}
                  <div className="glass-panel p-5 rounded-xl border-blue-500/20 relative group hover:border-blue-400 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Response</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> {nodes[2].status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{nodes[2].label}</h4>
                        <p className="text-xs text-slate-400">JSON Payload 201</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'json' && (
              <motion.div
                key="json"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full max-w-3xl"
              >
                <div className="rounded-xl border border-white/10 bg-[#0C0E18] p-5 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
                  <pre>{JSON.stringify(jsonState, null, 2)}</pre>
                </div>
              </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full max-w-3xl font-mono text-xs leading-relaxed text-slate-300"
              >
                <div className="rounded-xl border border-white/10 bg-[#0C0E18] p-5 space-y-2 text-left">
                  <p className="text-slate-500">[2026-07-25T13:56:40Z] INFO  - [CoreEngine] Pipeline initialized successfully.</p>
                  <p className="text-cyan-400">[2026-07-25T13:56:41Z] INGEST- Webhook payload received via POST /api/v1/waitlist</p>
                  <p className="text-blue-400">[2026-07-25T13:56:41Z] EXEC  - Gemini Engine Node executed in 6ms (Tokens: 142)</p>
                  <p className="text-emerald-400">[2026-07-25T13:56:41Z] RESP  - HTTP 201 Created sent to client in 11ms total.</p>
                  <p className="text-slate-500">[2026-07-25T13:56:42Z] METRIC- Global Uptime: 99.99% | Active Worker Threads: 12</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
