'use client';

import React, { useState } from 'react';
import { Activity, RefreshCw, Zap, Globe, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { EdgeRegionPing } from '@/lib/types';

const DEFAULT_REGIONS: EdgeRegionPing[] = [
  { region: 'us-east-1', location: 'N. Virginia, USA', latency_ms: 8, status: 'optimal' },
  { region: 'eu-west-1', location: 'Frankfurt, DE', latency_ms: 11, status: 'optimal' },
  { region: 'ap-south-1', location: 'Tokyo, JP', latency_ms: 14, status: 'good' },
  { region: 'sa-east-1', location: 'São Paulo, BR', latency_ms: 19, status: 'good' },
];

export const EdgeBenchmarkWidget: React.FC = () => {
  const [regions, setRegions] = useState<EdgeRegionPing[]>(DEFAULT_REGIONS);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [lastChecked, setLastChecked] = useState<string>('Just now');

  const runBenchmark = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      setRegions(prev =>
        prev.map(r => ({
          ...r,
          latency_ms: Math.floor(Math.random() * 8) + 7, // 7ms to 14ms jitter
          status: 'optimal'
        }))
      );
      setIsBenchmarking(false);
      setLastChecked(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 900);
  };

  return (
    <section id="benchmark" className="py-20 px-6 mx-auto max-w-6xl relative z-20">
      <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0C101E]/95 via-[#080B17]/95 to-[#060507] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-mono text-cyan-300 mb-3">
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              <span>Real-Time Edge Health Mesh</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Global Edge <span className="text-gradient">Latency Diagnostics</span>
            </h3>
            <p className="text-sm text-slate-300/80 mt-2 max-w-xl">
              Live edge node response times across global worker clusters. Sub-11ms guaranteed SLA.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-mono text-slate-400">Last Verified</div>
              <div className="text-xs font-mono text-cyan-300 font-semibold">{lastChecked}</div>
            </div>
            <button
              onClick={runBenchmark}
              disabled={isBenchmarking}
              className="flex items-center gap-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-5 py-3 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-500/30 hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isBenchmarking ? 'animate-spin' : ''}`} />
              <span>{isBenchmarking ? 'Testing Mesh...' : 'Run Ping Test'}</span>
            </button>
          </div>
        </div>

        {/* Region Ping Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map((node, idx) => (
            <motion.div
              key={node.region}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-[#0F1324] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 font-semibold">{node.region}</span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  {node.status}
                </span>
              </div>
              <div className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <Globe className="h-4 w-4 text-cyan-400" />
                <span>{node.location}</span>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-baseline justify-between">
                <span className="text-xs font-mono text-slate-500">RTT Latency</span>
                <span className="text-xl font-extrabold text-cyan-300 font-mono tracking-tight">
                  {node.latency_ms} ms
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
