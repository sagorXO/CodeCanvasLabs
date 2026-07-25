'use client';

import React, { useState, useEffect } from 'react';
import { WaitlistEntry } from '@/lib/types';
import { X, CheckCircle2, Copy, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail);
  const [role, setRole] = useState('Software Engineer');
  const [useCase, setUseCase] = useState('Workflow Automation');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WaitlistEntry | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v1/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, use_case: useCase }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
      } else {
        setError(json.error || 'Failed to submit registration');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (result?.referral_code) {
      navigator.clipboard.writeText(result.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-slateCard/95 p-8 shadow-2xl backdrop-blur-xl shadow-cyan-500/20"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          {!result ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="text-2xl font-bold text-white">Join CodeCanvas Waitlist</h3>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Reserve your early access pass for the next generation of visual AI workflow tools.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-xs text-red-300 font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-white/15 bg-[#090A0F]/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#090A0F]/80 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  >
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Tech Lead / Architect">Tech Lead / Architect</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="Founder / Executive">Founder / Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Use Case
                  </label>
                  <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#090A0F]/80 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  >
                    <option value="Workflow Automation">Workflow Automation</option>
                    <option value="AI Infrastructure">AI Infrastructure & Agent Nodes</option>
                    <option value="Visual Pipelines">Visual Pipelines & Simulation</option>
                    <option value="Full-stack Integration">Full-stack Integration</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Securing Your Spot...
                    </>
                  ) : (
                    <>
                      <span>Submit Waitlist Pass</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-4 border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-1">Spot Reserved!</h3>
              <p className="text-sm text-slate-300 mb-6">
                Welcome to CodeCanvas Labs. Your early access pass has been issued.
              </p>

              {/* Position Display Card */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-6 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
                  Your Waitlist Queue Position
                </span>
                <span className="text-4xl font-extrabold text-white text-gradient">
                  #{result.waitlist_position.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block mt-2">
                  Registered: {result.email}
                </span>
              </div>

              {/* Referral Code Box */}
              <div className="rounded-xl border border-white/10 bg-[#090A0F] p-4 flex items-center justify-between gap-3 mb-6">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Referral Code</span>
                  <span className="text-sm font-mono font-bold text-cyan-300">{result.referral_code}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-all"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all"
              >
                Close & Return to Site
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
