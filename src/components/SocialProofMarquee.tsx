'use client';

import React from 'react';

// Inline SVG tech logos — actual brand marks, not generic Lucide icons
const PARTNERS = [
  {
    name: 'Vercel',
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 76 65" fill="currentColor">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 109 113" fill="none">
        <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284Z" fill="url(#a-supa)" />
        <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284Z" fill="url(#b-supa)" fillOpacity=".2" />
        <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.071Z" fill="currentColor" />
        <defs>
          <linearGradient id="a-supa" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity=".5" />
          </linearGradient>
          <linearGradient id="b-supa" x1="36.156" y1="30.578" x2="54.484" y2="72.263" gradientUnits="userSpaceOnUse">
            <stop />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 394 80" fill="currentColor">
        <path d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z" />
        <path d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3c-.3.4-.6.9-1 1.2-.5.3-1 .5-1.6.5l-.5.1z" />
      </svg>
    ),
  },
  {
    name: 'Stripe',
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 60 25" fill="currentColor">
        <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a13.3 13.3 0 0 1-4.56.83c-4.14 0-6.83-2.41-6.83-7.08 0-4.23 2.25-7.16 6.11-7.16 3.74 0 6.09 2.67 6.09 7.16v1.33zm-8.06-2.77h4.26c0-1.65-.83-2.82-2.11-2.82-1.2 0-2.05 1.06-2.15 2.82zM40.95 20.03c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V6.25h3.56l.22 1.04c.63-.49 1.7-1.33 3.37-1.33 2.93 0 5.17 2.72 5.17 7.18 0 5.05-2.31 6.89-5.28 6.89zM40 9.77c-.7 0-1.47.33-1.97.7l.02 6.61c.5.37 1.25.67 1.95.67 1.53 0 2.57-1.77 2.57-4.06 0-2.17-1.04-3.92-2.57-3.92zM28.24 5.57h4.13v14.26h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.6H19.8V6.25h3.56l.22 1.31c.91-1.18 2.2-1.6 3.34-1.6v4.13c-.22-.04-.46-.04-.7-.04-.8 0-1.74.37-2.3.88zM14 6.26l.22 1.04c.63-.49 1.7-1.33 3.37-1.33l.28.02v4.13c-.32-.08-.67-.12-1.05-.12-.7 0-1.47.33-1.97.7l.02 9.13h-4.12V6.25H14zM2.74 19.56c-.52-.49-.98-1.11-1.36-1.87-.38-.76-.64-1.67-.78-2.72a13.6 13.6 0 0 1 .78-6.35c.38-.76.83-1.38 1.36-1.87a5.9 5.9 0 0 1 1.85-1.18A5.73 5.73 0 0 1 6.72 5c.76 0 1.47.12 2.13.37.66.25 1.24.58 1.74.99l-1.84 2.42c-.28-.25-.6-.45-.95-.59a2.9 2.9 0 0 0-1.08-.21c-.91 0-1.63.4-2.17 1.2-.54.81-.81 1.93-.81 3.38 0 1.44.27 2.57.81 3.38.54.8 1.26 1.2 2.17 1.2.42 0 .78-.07 1.08-.21.35-.14.67-.34.95-.59l1.84 2.42c-.5.41-1.08.74-1.74.99-.66.25-1.37.37-2.13.37-.81 0-1.57-.19-2.27-.57a5.9 5.9 0 0 1-1.85-1.19z" />
      </svg>
    ),
  },
  {
    name: 'Railway',
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.345 7.808a.5.5 0 0 1 .196-.68l9.73-5.62a3.48 3.48 0 0 1 3.458 0l9.73 5.62a.5.5 0 0 1 .196.68L12.345 14.37a.5.5 0 0 1-.69 0L.345 7.808Zm11.31 8.283a.5.5 0 0 0 .69 0l11.31-6.563a.5.5 0 0 1 .196.68l-4.96 8.59a3.48 3.48 0 0 1-1.729 1.51l-4.62 2.1a.5.5 0 0 1-.428 0l-4.62-2.1A3.48 3.48 0 0 1 5.765 18.8L.804 10.208a.5.5 0 0 1 .196-.68l10.655 6.563Z" />
      </svg>
    ),
  },
  {
    name: 'Resend',
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm3.519.758a.75.75 0 0 0-.903 1.199l6.857 5.167a1.25 1.25 0 0 0 1.504-.047l6.505-5.12a.75.75 0 1 0-.928-1.18l-6.505 5.12-6.53-4.24Z" />
      </svg>
    ),
  },
  {
    name: 'PlanetScale',
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 256 256" fill="currentColor">
        <path d="M128 0C57.308 0 0 57.308 0 128c0 38.233 16.783 72.558 43.375 95.941l147.344-147.344A127.618 127.618 0 0 0 128 0Zm84.708 32.061L65.364 179.406A127.615 127.615 0 0 0 128 256c70.692 0 128-57.308 128-128 0-38.233-16.783-72.558-43.292-95.939Z" />
      </svg>
    ),
  },
  {
    name: 'Convex',
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

export const SocialProofMarquee: React.FC = () => {
  const doubledPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-14 border-y border-white/[0.04] bg-[#090A0F] overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-6 text-center mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Trusted by Next-Gen Developers & Engineering Teams Worldwide
        </p>
      </div>

      {/* Marquee Track 1 — forward */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] group">
        <div className="flex shrink-0 animate-marquee items-center gap-14 py-2 group-hover:[animation-play-state:paused]">
          {doubledPartners.map((partner, index) => (
            <div
              key={`t1-${index}`}
              className="flex items-center gap-3 text-slate-500 hover:text-cyan-400 transition-colors duration-300 opacity-60 hover:opacity-100 cursor-pointer"
            >
              {partner.svg}
              <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track 2 — reverse */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] mt-4 group">
        <div className="flex shrink-0 animate-marquee-reverse items-center gap-14 py-2 group-hover:[animation-play-state:paused]">
          {doubledPartners.map((partner, index) => (
            <div
              key={`t2-${index}`}
              className="flex items-center gap-3 text-slate-500 hover:text-cyan-400 transition-colors duration-300 opacity-40 hover:opacity-100 cursor-pointer"
            >
              {partner.svg}
              <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
