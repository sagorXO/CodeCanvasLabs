'use client';

import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingMatrixProps {
  onOpenWaitlist: () => void;
}

export const PricingMatrix: React.FC<PricingMatrixProps> = ({ onOpenWaitlist }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Developer',
      tagline: 'For individual developers & side projects',
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        'Up to 10,000 Pipeline Executions/mo',
        '3 Active Visual Canvas Nodes',
        'Standard Community Support',
        '11ms Edge Response Time',
      ],
      popular: false,
      cta: 'Get Started Free',
    },
    {
      name: 'Pro Engine',
      tagline: 'For fast-growing engineering teams',
      priceMonthly: 29,
      priceAnnual: 23,
      features: [
        'Unlimited Pipeline Executions',
        'Unlimited Canvas Nodes & Branches',
        'Gemini 3.6 Flash Integration',
        'Priority 24/7 Slack Support',
        'Custom Webhooks & WebSockets',
        'SOC2 Security Shielding',
      ],
      popular: true,
      cta: 'Claim Waitlist Discount',
    },
    {
      name: 'Enterprise',
      tagline: 'For mission-critical production workloads',
      priceMonthly: 99,
      priceAnnual: 79,
      features: [
        'Dedicated Isolated Worker Clusters',
        'Custom SLA & 99.999% Guarantee',
        'Self-Hosted On-Prem Engine Options',
        'Custom Audit Logs & Compliance',
        'Dedicated Solutions Engineer',
      ],
      popular: false,
      cta: 'Contact Enterprise Team',
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 mx-auto max-w-7xl relative z-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          Simple, Transparent <span className="text-gradient">Pricing</span>
        </h2>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
          Start for free in developer sandbox mode. Upgrade when your visual pipelines scale.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full border border-cyan-500/30 bg-[#11131F] backdrop-blur-xl shadow-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              billingCycle === 'annual'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => {
          const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-8 rounded-2xl relative flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#11131F] border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.25)] scale-[1.02]'
                  : 'bg-[#11131F]/90 border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold tracking-wider uppercase shadow-lg flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300" /> Most Popular
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-300 min-h-[32px] mb-6">{plan.tagline}</p>

                {/* Price Counter with Framer Motion Animation */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white">$</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={price}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-5xl font-extrabold text-white tracking-tight"
                    >
                      {price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm font-semibold text-slate-400 ml-1">/ month</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-200">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenWaitlist}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] btn-glow'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
