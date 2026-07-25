'use client';

import React, { useState, useRef } from 'react';
import { CanvasTab, PipelineNode } from '@/lib/types';
import { Terminal, Network, Code, CheckCircle2, Loader2, Play, Activity, ArrowRight, Settings2, Plus, Trash2, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const InteractiveCanvas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CanvasTab>('visual');
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('n2');
  const sectionRef = useRef<HTMLElement>(null);
  
  const [nodes, setNodes] = useState<PipelineNode[]>([
    { id: 'n1', type: 'trigger', label: 'Webhook Ingest', status: '200 OK', execution_ms: 2, model: 'HTTPS / Wasm' },
    { id: 'n2', type: 'ai_transform', label: 'Gemini Engine Node', status: '200 OK', execution_ms: 6, model: 'gemini-3.6-flash' },
    { id: 'n3', type: 'output', label: 'HTTP Edge Response', status: 'ready', execution_ms: 3, model: 'CDN Dispatch' }
  ]);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const handleSimulateRun = () => {
    setIsExecuting(true);
    setNodes(prev => prev.map(n => ({ ...n, status: 'processing' })));
    setTimeout(() => {
      setNodes(prev => prev.map(n => ({ ...n, status: '200 OK' })));
      setIsExecuting(false);
    }, 1100);
  };

  const handleUpdateNodeModel = (model: string) => {
    if (!selectedNodeId) return;
    setNodes(prev =>
      prev.map(n => (n.id === selectedNodeId ? { ...n, model } : n))
    );
  };

  const handleUpdateNodeLabel = (label: string) => {
    if (!selectedNodeId) return;
    setNodes(prev =>
      prev.map(n => (n.id === selectedNodeId ? { ...n, label } : n))
    );
  };

  const handleAddNode = () => {
    if (nodes.length >= 5) return;
    const newId = `n${nodes.length + 1}`;
    const newNode: PipelineNode = {
      id: newId,
      type: 'ai_transform',
      label: `Gemini Filter 0${nodes.length + 1}`,
      status: 'ready',
      execution_ms: 4,
      model: 'gemini-1.5-flash-8b'
    };
    // insert before last output node if exists
    const lastIndex = nodes.length - 1;
    const updated = [...nodes.slice(0, lastIndex), newNode, nodes[lastIndex]];
    setNodes(updated);
    setSelectedNodeId(newId);
  };

  const handleDeleteNode = (id: string) => {
    if (nodes.length <= 2) return; // Keep at least 2 nodes
    setNodes(prev => prev.filter(n => n.id !== id));
    if (selectedNodeId === id) {
      setSelectedNodeId(nodes[0].id);
    }
  };

  const totalLatency = nodes.reduce((acc, curr) => acc + (curr.execution_ms || 0), 0);

  const jsonState = {
    active_tab: activeTab,
    pipeline_id: "pipe_live_visual_984",
    nodes: nodes,
    metrics: {
      total_execution_ms: isExecuting ? totalLatency + 5 : totalLatency,
      uptime_percentage: 99.99,
      zero_trust_status: "ACTIVE_SOC2"
    }
  };

  return (
    <section id="simulator" ref={sectionRef} className="py-24 px-6 mx-auto max-w-6xl relative z-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          Interactive <span className="text-gradient">Pipeline Simulator</span>
        </h2>
        <p className="mt-4 text-slate-300/80 text-base sm:text-lg max-w-2xl mx-auto">
          Configure AI nodes, inspect raw JSON streams, and execute multimodal pipeline benchmarks live in your browser.
        </p>
      </motion.div>

      {/* Main Canvas Window */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-white/[0.08] bg-[#0C0E1A]/95 shadow-2xl backdrop-blur-xl overflow-hidden hover:border-cyan-500/20 transition-colors duration-500"
      >
        {/* Window Top Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/[0.06] bg-[#080A12] px-5 py-3.5 gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-4">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>

            {(['visual', 'json', 'logs'] as CanvasTab[]).map((tab) => {
              const Icon = tab === 'visual' ? Network : tab === 'json' ? Code : Terminal;
              const label = tab === 'visual' ? 'Visual Graph' : tab === 'json' ? 'Raw JSON Stream' : 'Terminal Logs';
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddNode}
              disabled={nodes.length >= 5}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-all disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5 text-cyan-400" />
              <span>Add Node</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              <span>{totalLatency}ms Total Latency</span>
            </div>

            <button
              onClick={handleSimulateRun}
              disabled={isExecuting}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all duration-200"
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

        {/* Tab Content */}
        <div className="p-8 min-h-[340px] flex flex-col justify-between bg-[#080A12]/80 gap-6">
          <AnimatePresence mode="wait">
            {activeTab === 'visual' && (
              <motion.div
                key="visual"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                className="w-full flex flex-col md:flex-row items-center justify-between gap-4"
              >
                {nodes.map((node, index) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <React.Fragment key={node.id}>
                      <motion.div
                        variants={nodeVariants}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`w-full flex-1 p-5 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-300 relative group ${
                          isSelected
                            ? 'bg-[#11162B] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                            : 'bg-[#0E111E] border-white/[0.08] hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono font-semibold text-cyan-400/80 uppercase flex items-center gap-1">
                            Node 0{index + 1}
                            {isSelected && <Settings2 className="h-3 w-3 text-cyan-300" />}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                            {node.status === 'processing' ? (
                              <Loader2 className="h-3 w-3 animate-spin text-cyan-400" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            )}
                            {node.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{node.label}</h4>
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400/70">
                          <span>{node.model || 'Wasm'}</span>
                          <span>{node.execution_ms}ms</span>
                        </div>

                        {nodes.length > 2 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNode(node.id);
                            }}
                            className="absolute top-2 right-2 p-1 rounded bg-rose-500/10 text-rose-400 opacity-0 group-hover:opacity-100 hover:bg-rose-500/20 transition-all"
                            title="Delete Node"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </motion.div>

                      {index < nodes.length - 1 && (
                        <motion.div
                          variants={nodeVariants}
                          className="hidden md:flex items-center justify-center"
                        >
                          <ArrowRight className="h-4 w-4 text-cyan-400/50 animate-pulse" />
                        </motion.div>
                      )}
                    </React.Fragment>
                  );
                })}
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
                <pre className="p-5 rounded-xl bg-[#060710] border border-white/[0.06] font-mono text-xs text-cyan-300/80 overflow-x-auto">
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
                className="w-full font-mono text-xs space-y-2.5 p-5 rounded-xl bg-[#060710] border border-white/[0.06] text-slate-300"
              >
                {nodes.map((n, i) => (
                  <div key={n.id} className="text-cyan-400/90">
                    [INFO] 19:22:15.00{i * 2 + 2} — Node 0{i + 1} ({n.label}): executed with model [{n.model || 'Wasm'}] in {n.execution_ms}ms (200 OK)
                  </div>
                ))}
                <div className="text-emerald-400/90">[SUCCESS] 19:22:15.011 — HTTP Edge payload pipeline completed in {totalLatency}ms</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Node Configuration Toolbar */}
          {activeTab === 'visual' && selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300 bg-[#060710]/60 p-4 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-cyan-400" />
                <span className="font-bold text-white">Selected: {selectedNode.label}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Node Label:</span>
                  <input
                    type="text"
                    value={selectedNode.label}
                    onChange={(e) => handleUpdateNodeLabel(e.target.value)}
                    className="rounded bg-black/60 border border-white/15 px-2.5 py-1 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">AI Model / Engine:</span>
                  <select
                    value={selectedNode.model || 'gemini-3.6-flash'}
                    onChange={(e) => handleUpdateNodeModel(e.target.value)}
                    className="rounded bg-black/60 border border-white/15 px-2.5 py-1 text-xs text-cyan-300 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="gemini-3.6-flash">gemini-3.6-flash</option>
                    <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                    <option value="gemini-1.5-flash-8b">gemini-1.5-flash-8b</option>
                    <option value="wasm-edge-transform">wasm-edge-transform</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
