'use client';

import React from 'react';
import { Layers } from 'lucide-react';

const footerLinks = {
  Services: ['Visual AI Systems', 'Next.js Web Platforms', 'Wasm Edge Microservices', 'SOC2 Architecture Audits'],
  CaseStudies: ['Visual AI Engine', 'Edge Microservices Mesh', 'Autonomous Agentic Suite', 'Fintech Data Ledger'],
  Studio: ['About Saied Sagar', 'Engineering Principles', 'Security Standards', 'Book Call'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Security Policy', 'NDA Template'],
};

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[#060507] pt-16 pb-10 px-6">
      {/* Top gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#060507]">
                  <Layers className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-base font-bold text-white">Saied Sagar Studio</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
              Senior AI Systems Architect & Software Engineering Studio. Delivering high-impact software engagements for enterprise clients.
            </p>

            {/* System Status */}
            <div className="inline-flex items-center gap-2 text-xs text-slate-400 font-mono border border-emerald-500/15 bg-emerald-950/15 px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Q3/Q4 2026 Engagements</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-cyan-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a href="https://github.com/sagorXO" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors duration-200" aria-label="GitHub">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors duration-200" aria-label="Twitter">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-600 font-mono">
            © {new Date().getFullYear()} Saied Sagar Studio. All rights reserved. Built with Next.js 14 & Three.js.
          </p>
        </div>
      </div>
    </footer>
  );
};
