'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'What makes CodeCanvas Labs faster than standard AI workflow runners?',
    answer: 'CodeCanvas Labs executes pipeline graph nodes directly at edge locations worldwide via WebAssembly (Wasm) worker isolates. By avoiding centralized cold-start delays and routing network streams through local edge regions, average execution latency stays strictly under 11ms.',
  },
  {
    question: 'How does the sub-11ms edge execution latency work?',
    answer: 'We utilize zero-allocation binary node serialization and persistent WebSocket stream tunnels connected directly to edge nodes. Data payloads are processed in-memory without disk I/O bottlenecks.',
  },
  {
    question: 'Can I self-host the CodeCanvas engine on my own cloud infrastructure?',
    answer: 'Yes! Enterprise plan customers receive Docker and Kubernetes deployment manifests to run private CodeCanvas worker nodes inside AWS EKS, GCP GKE, or on-premise hardware behind custom VPCs.',
  },
  {
    question: 'What models are supported in Gemini AI Node transformations?',
    answer: 'Native integration includes Gemini 3.6 Flash, Gemini 1.5 Pro, and custom fine-tuned Gemini model checkpoints for structured JSON generation, multimodal image/video analysis, and autonomous tool calling.',
  },
  {
    question: 'Is CodeCanvas Labs SOC2 Type II certified?',
    answer: 'Yes. Every payload transmitted through our edge mesh is encrypted using AES-256 GCM at rest and TLS 1.3 in transit. We undergo bi-annual SOC2 Type II and ISO 27001 third-party security audits.',
  },
  {
    question: 'How does early waitlist access and onboarding work?',
    answer: 'When you sign up for early waitlist access, you receive a position badge and referral code. Priority access keys are dispatched in weekly batches with complimentary sandbox API credits.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-6 mx-auto max-w-4xl relative z-20">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs font-mono text-purple-300 mb-4">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          Everything You Need to <span className="text-gradient">Know</span>
        </h2>
        <p className="mt-4 text-slate-300/80 text-base sm:text-lg max-w-2xl mx-auto">
          Have questions about node latency, security, or enterprise deployments? Find answers below.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/[0.08] bg-[#0A0C16] overflow-hidden transition-colors duration-300 hover:border-cyan-500/30"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white text-base md:text-lg hover:text-cyan-300 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-cyan-300' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 pt-0 text-slate-400 text-sm md:text-base leading-relaxed border-t border-white/[0.04]">
                      <p className="mt-4">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
