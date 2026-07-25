'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Sparkles, Terminal, Shield, ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#060507]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#060507]">
              <Layers className="h-4 w-4 text-cyan-400" />
            </div>
          </div>
          <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
            CodeCanvas <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">v2.0</span>
          </span>
        </a>

        {/* Anchor Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wide text-slate-300/80">
          <a href="#simulator" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" /> Simulator
          </a>
          <a href="#features" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" /> Features
          </a>
          <a href="#pricing" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-400" /> Pricing
          </a>
        </nav>

        {/* CTA Trigger (Desktop & Mobile trigger) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWaitlist}
            className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] btn-glow font-mono"
          >
            <span>Join Waitlist</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-white/[0.08] bg-[#060507]/95 backdrop-blur-2xl px-6 py-6 overflow-hidden"
          >
            <nav className="flex flex-col gap-4 font-mono text-sm text-slate-300">
              <a
                href="#simulator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 hover:text-cyan-400 transition-colors"
              >
                <Terminal className="h-4 w-4 text-cyan-400" /> Simulator
              </a>
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 hover:text-cyan-400 transition-colors"
              >
                <Sparkles className="h-4 w-4 text-blue-400" /> Features
              </a>
              <a
                href="#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 hover:text-cyan-400 transition-colors"
              >
                <Shield className="h-4 w-4 text-emerald-400" /> Pricing
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
