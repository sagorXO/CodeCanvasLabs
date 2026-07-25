'use client';

import React, { useState } from 'react';
import { CanvasTab, PipelineNode } from '@/lib/types';
import { Terminal, Network, Code, CheckCircle2, Loader2, Play, Cpu, Activity } from 'lucide-react';
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
    <section id="simulator" className="py-16 px-6 mx-auto max-w-6xl relative z-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
          Interactive <span className="text-gradient">Pipeline Simulator</span>
        </h2>
        <p className="mt-3 text-slate-300 text-base max-w-2xl mx-auto">
          Test real-time node routing, inspection payloads, and sub-second execution streams live in your browser.
        </p>
      </div>

      {/* Main Canvas Window Container */}
      <div className="rounded-2xl border border-cyan-500/30 bg-[#0E111E]/95 shadow-2xl backdrop-blur-xl overflow-hidden shadow-cyan-500/15">
        {/* Window Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#090B14] px-5 py-3.5 gap-4">
          {/* Tab Selection */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-4">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>

            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'visual'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              <span>Visual Graph</span>
            </button>

            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'json'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>Raw JSON Stream</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'logs'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Terminal Logs</span>
            </button>
          </div>

          {/* Execution Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              <span>11ms Latency</span>
            </div>

            <button
              onClick={handleSimulateRun}
              disabled={isExecuting}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Simulating...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Run Pipeline</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="p-8 min-h-[340px] flex items-center justify-center bg-[#090B14]/80">
          <AnimatePresence mode="wait">
            {activeTab === 'visual' && (
              <motion.div
                key="visual"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col md:flex-row items-center justify-between gap-6 relative"
              >
                {/* Visual Pipeline Nodes */}
                {nodes.map((node, index) => (
                  <React.Fragment key={node.id}>
                    <div className="w-full flex-1 p-5 rounded-xl border border-cyan-500/30 bg-[#121626] backdrop-blur-md shadow-lg shadow-cyan-500/5 hover:border-cyan-500/60 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">
                          Node 0{index + 1} · {node.type}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {node.status === 'processing' ? (
                            <Loader2 className="h-3 w-3 animate-spin text-cyan-400" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          )}
                          {node.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{node.label}</h4>
                      <p className="text-xs font-mono text-slate-400">exec: {node.execution_ms}ms</p>
                    </div>
                  </React.Fragment>
                ))}
              </motion.div>
            )}

            {activeTab === 'json' && (
              <motion.div
                key="json"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                <pre className="p-4 rounded-xl bg-[#06070D] border border-cyan-500/20 font-mono text-xs text-cyan-300 overflow-x-auto">
                  {JSON.stringify(jsonState, null, 2)}
                </pre>
              </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full font-mono text-xs space-y-2 p-4 rounded-xl bg-[#06070D] border border-cyan-500/20 text-slate-300"
              >
                <div className="text-emerald-400">[INFO] 19:22:15.002 - Webhook payload ingest verified (200 OK)</div>
                <div className="text-cyan-400">[INFO] 19:22:15.004 - Gemini 3.6 Flash transformation pipeline initialized</div>
                <div className="text-cyan-300">[DEBUG] 19:22:15.009 - Zero-trust CORS header validated</div>
                <div className="text-emerald-400">[SUCCESS] 19:22:15.011 - HTTP Edge response dispatched in 11ms</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
