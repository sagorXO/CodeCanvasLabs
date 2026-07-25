'use client';

import React, { useState } from 'react';
import { X, Search, CheckCircle2, Copy, Sparkles, Loader2, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaitlistEntry } from '@/lib/types';

interface WaitlistLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistLookupModal: React.FC<WaitlistLookupModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WaitlistEntry | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/v1/waitlist?query=${encodeURIComponent(query.trim())}`);
      const json = await res.json();

      if (json.success && json.data) {
        setResult(json.data);
      } else {
        setError(json.error || 'No waitlist entry found');
      }
    } catch (err: any) {
      setError(err.message || 'Error executing lookup');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReferral = () => {
    if (result?.referral_code) {
      navigator.clipboard.writeText(`https://codecanvas.io?ref=${result.referral_code}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md rounded-2xl border border-cyan-500/40 bg-[#0E111E] p-7 shadow-2xl shadow-cyan-500/20 z-10 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">Waitlist Rank Lookup</h3>
          </div>
          <p className="text-xs text-slate-300 mb-5">
            Enter your registered email address or priority referral code to check your position.
          </p>

          <form onSubmit={handleSearch} className="mb-5">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="dev@company.com or CANVAS-3842"
                required
                className="w-full rounded-xl border border-white/15 bg-black/50 pl-4 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold mb-4">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30">
                <span className="text-xs font-mono text-slate-400 uppercase block mb-1">Your Waitlist Position</span>
                <span className="text-4xl font-extrabold text-cyan-400 tracking-tight">#{result.waitlist_position}</span>
                <span className="text-[11px] font-mono text-emerald-400 block mt-1">Status: Early Access Queue Active</span>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-left">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Referral Link</span>
                  <span className="text-cyan-400 font-bold">{result.referral_code}</span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-slate-900/80 px-3 py-2 rounded-lg border border-white/10">
                  <span className="font-mono text-xs text-slate-300 truncate">
                    codecanvas.io?ref={result.referral_code}
                  </span>
                  <button
                    onClick={handleCopyReferral}
                    className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-white px-2 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 transition-all shrink-0"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
