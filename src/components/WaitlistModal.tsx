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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Modal Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-[#0E111E] p-8 shadow-2xl shadow-cyan-500/20 z-10 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="h-4 w-4" />
          </button>

          {!result ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Join CodeCanvas Waitlist</h3>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Gain priority early access to our visual AI pipeline engine & developer sandbox.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                    Engineering Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dev@company.com"
                    required
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                    Developer Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                  >
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Tech Lead">Tech Lead / Engineering Manager</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="System Architect">System Architect</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                    Primary Use Case
                  </label>
                  <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                  >
                    <option value="Workflow Automation">Workflow Automation</option>
                    <option value="AI Infrastructure">AI Infrastructure & LLMs</option>
                    <option value="Visual Pipelines">Visual Graph Pipelines</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 btn-glow"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing Access...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Registration</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">Access Confirmed!</h3>
              <p className="text-xs text-slate-300 mb-6">
                You are registered on the CodeCanvas Labs developer waitlist.
              </p>

              {/* Queue Position Card */}
              <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 mb-6">
                <span className="text-xs font-mono text-slate-400 uppercase block mb-1">Your Waitlist Position</span>
                <span className="text-3xl font-extrabold text-cyan-400 tracking-tight">#{result.waitlist_position}</span>
              </div>

              {/* Referral Code Copy */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 mb-6">
                <span className="text-xs font-mono text-slate-400 uppercase block mb-2">Priority Referral Code</span>
                <div className="flex items-center justify-between gap-2 bg-slate-900/80 px-3 py-2 rounded-lg border border-white/10">
                  <span className="font-mono text-sm text-cyan-300 font-bold">{result.referral_code}</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-white px-2 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 transition-all"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/10"
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
