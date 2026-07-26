'use client';

import React from 'react';
import { Cpu, Globe, Shield, Terminal, Zap, Code, Server, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const STACK_CATEGORIES = [
  {
    title: 'Frontend & Visual 3D Engine',
    icon: Globe,
    skills: [
      { name: 'Next.js 14 App Router', metric: 'Sub-100ms Hydration' },
      { name: 'React 18 Concurrent UI', metric: 'Zero Layout Shift' },
      { name: 'Three.js / WebGL / GLSL', metric: '60 FPS Shaders' },
      { name: 'Tailwind CSS & Framer Motion', metric: 'Fluid Animations' },
    ],
  },
  {
    title: 'Backend & Cloud Edge Mesh',
    icon: Server,
    skills: [
      { name: 'Node.js & TypeScript', metric: '100% Strict Types' },
      { name: 'Python & FastAPIs', metric: 'Async Dispatch' },
      { name: 'WebAssembly (Wasm) Edge', metric: 'Sub-11ms Latency' },
      { name: 'Docker & Kubernetes (Helm)', metric: 'Cloud-Native' },
    ],
  },
  {
    title: 'AI Multimodal & Data Engines',
    icon: Cpu,
    skills: [
      { name: 'Gemini 3.6 Flash & Pro', metric: 'Native Bindings' },
      { name: 'OpenAI & Custom Fine-Tunes', metric: 'Structured Output' },
      { name: 'PostgreSQL & Supabase', metric: 'ACID Transactions' },
      { name: 'Redis & WebSockets Mesh', metric: 'Real-Time Pub/Sub' },
    ],
  },
];

export const TechStackMatrix: React.FC = () => {
  return (
    <section id="stack" className="py-24 px-6 mx-auto max-w-6xl relative z-20">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-mono text-cyan-300 mb-4">
          <Code className="h-3.5 w-3.5" />
          <span>Core Engineering Stack & Capabilities</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          System Capability <span className="text-gradient">Matrix</span>
        </h2>
        <p className="mt-4 text-slate-300/80 text-base sm:text-lg max-w-2xl mx-auto">
          Battle-tested technologies utilized across high-volume enterprise architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STACK_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-7 rounded-2xl bg-[#0E111E]/90 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-xl group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{cat.title}</h3>
              </div>

              <div className="space-y-3">
                {cat.skills.map((s, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-slate-200">{s.name}</span>
                    <span className="font-mono text-[11px] text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {s.metric}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
