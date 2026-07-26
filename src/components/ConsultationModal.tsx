'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles, Loader2, ArrowRight, Calendar, Mail, User, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialDetails = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budgetTier, setBudgetTier] = useState('$10,000 - $25,000');
  const [projectNotes, setProjectNotes] = useState(initialDetails);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (initialDetails) {
      setProjectNotes(initialDetails);
    }
  }, [initialDetails]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate direct consultation registration
    setTimeout(() => {
      const ref = `SAGAR-ESTIMATE-${Math.floor(Math.random() * 8999 + 1000)}`;
      setBookingRef(ref);
      setLoading(false);
      setSubmitted(true);
    }, 900);
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
          className="relative w-full max-w-lg rounded-3xl border border-cyan-500/40 bg-[#0E111E] p-8 shadow-2xl shadow-cyan-500/20 z-10 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="h-4 w-4" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Book Architecture Discovery Call</h3>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Schedule a 1-on-1 discovery consultation directly with Saied Sagar ($10,000+ engagements).
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Vance"
                      required
                      className="w-full rounded-xl border border-white/15 bg-black/50 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@enterprise.com"
                      required
                      className="w-full rounded-xl border border-white/15 bg-black/50 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                    Estimated Project Budget
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <select
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/50 pl-10 pr-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="$5,000 - $10,000">$5,000 - $10,000 (Sprint Engagement)</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000 (Full Architecture & Build)</option>
                      <option value="$25,000+">$25,000+ (Enterprise Multi-Month retainer)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                    Project Scope & Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Briefly describe your goals, required timeline, and system requirements..."
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 btn-glow font-mono"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Scheduling Priority Slot...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Proposal Inquiry</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">Discovery Proposal Registered!</h3>
              <p className="text-xs text-slate-300 mb-6">
                Thank you {name}. Saied Sagar will review your requirements and reach out via email within 12 hours.
              </p>

              <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 mb-6 font-mono">
                <span className="text-xs text-slate-400 uppercase block mb-1">Consultation Reference Code</span>
                <span className="text-xl font-extrabold text-cyan-400">{bookingRef}</span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/10"
              >
                Close & Continue Exploring
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
