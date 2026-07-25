'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal, Sparkles, Code2, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Language = 'typescript' | 'python' | 'curl';

const CODE_SNIPPETS: Record<Language, { code: string; filename: string }> = {
  typescript: {
    filename: 'pipeline.ts',
    code: `import { CodeCanvas } from '@codecanvas/sdk';

const canvas = new CodeCanvas({
  apiKey: process.env.CANVAS_API_KEY,
  region: 'us-east-edge',
});

// Execute visual AI pipeline with sub-11ms latency
const result = await canvas.pipelines.run({
  id: 'pipe_multimodal_984',
  inputs: {
    stream: 'event_webhook_ingest',
    model: 'gemini-3.6-flash',
  },
  timeout: 1000,
});

console.log(\`Execution Latency: \${result.latency_ms}ms\`);`,
  },
  python: {
    filename: 'pipeline.py',
    code: `from codecanvas import CodeCanvasClient

client = CodeCanvasClient(
    api_key="canvas_sk_live_98410294812",
    edge_routing=True
)

# Dispatch deterministic AI node transformation
response = client.pipelines.execute(
    pipeline_id="pipe_multimodal_984",
    payload={"stream": "event_webhook_ingest"},
    model="gemini-3.6-flash"
)

print(f"Pipeline Status: {response.status} ({response.latency_ms}ms)")`,
  },
  curl: {
    filename: 'request.sh',
    code: `curl -X POST https://api.codecanvas.io/v1/pipelines/run \\
  -H "Authorization: Bearer canvas_sk_live_98410294812" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pipeline_id": "pipe_multimodal_984",
    "model": "gemini-3.6-flash",
    "edge_mode": true
  }'`,
  },
};

export const SDKShowcase: React.FC = () => {
  const [activeLang, setActiveLang] = useState<Language>('typescript');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeLang].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sdk" className="py-24 px-6 mx-auto max-w-6xl relative z-20">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-mono text-cyan-300 mb-4">
          <Code2 className="h-3.5 w-3.5" />
          <span>Developer SDK & API Integrations</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          Integrate in <span className="text-gradient">3 Lines of Code</span>
        </h2>
        <p className="mt-4 text-slate-300/80 text-base sm:text-lg max-w-2xl mx-auto">
          Type-safe SDKs for TypeScript, Python, and REST. Zero boilerplate, native Gemini 3.6 Flash bindings.
        </p>
      </div>

      {/* Code Editor Frame */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#090A14] shadow-2xl overflow-hidden">
        {/* Top Window Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/[0.06] bg-[#06070E] px-5 py-3.5 gap-4">
          {/* Language Switcher Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-4">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>

            {(['typescript', 'python', 'curl'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${
                  activeLang === lang
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {lang === 'typescript' ? 'TypeScript' : lang === 'python' ? 'Python' : 'cURL / REST'}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              {CODE_SNIPPETS[activeLang].filename}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] border border-white/10 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 md:p-8 bg-[#06070E]/90 overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeLang}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-xs md:text-sm text-slate-200 leading-relaxed"
            >
              <code>{CODE_SNIPPETS[activeLang].code}</code>
            </motion.pre>
          </AnimatePresence>
        </div>

        {/* Simulated Response Footer */}
        <div className="border-t border-white/[0.06] bg-[#080912] p-4 px-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">200 OK</span>
            <span className="text-slate-500">|</span>
            <span>Response Time: 8.4ms</span>
          </div>
          <div className="text-slate-500">Zero-Trust Edge Dispatch Active</div>
        </div>
      </div>
    </section>
  );
};
