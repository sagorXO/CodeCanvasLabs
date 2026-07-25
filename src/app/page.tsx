'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { SocialProofMarquee } from '@/components/SocialProofMarquee';
import { InteractiveCanvas } from '@/components/InteractiveCanvas';
import { BentoGrid } from '@/components/BentoGrid';
import { SDKShowcase } from '@/components/SDKShowcase';
import { PricingMatrix } from '@/components/PricingMatrix';
import { FAQSection } from '@/components/FAQSection';
import { CTABanner } from '@/components/CTABanner';
import { WaitlistModal } from '@/components/WaitlistModal';
import { Footer } from '@/components/Footer';

// Dynamic import for 3D Background
const Helion3DBackground = dynamic(
  () => import('@/components/Helion3DBackground').then(mod => ({ default: mod.Helion3DBackground })),
  { ssr: false }
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');

  const handleOpenWaitlist = (email?: string) => {
    if (email) {
      setInitialEmail(email);
    }
    setIsModalOpen(true);
  };

  const handleCloseWaitlist = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#060507] text-[#F9FAFB] flex flex-col justify-between overflow-x-hidden">
      {/* Fixed 3D Scene Background */}
      <Helion3DBackground />

      <div className="relative z-10">
        <Navbar onOpenWaitlist={() => handleOpenWaitlist()} />

        <main>
          {/* Hero Section — Translucent Deep Obsidian */}
          <div className="bg-[#060507]/60">
            <HeroSection onOpenWaitlist={handleOpenWaitlist} />
          </div>

          {/* Social Proof Marquee — Translucent Dark Slate Band */}
          <div className="bg-[#0B0E17]/80 backdrop-blur-sm border-y border-white/[0.04]">
            <SocialProofMarquee />
          </div>

          {/* Pipeline Simulator — Deep Midnight Indigo */}
          <div className="bg-gradient-to-b from-[#080C1B]/80 via-[#090D20]/80 to-[#080C1B]/80 border-b border-white/[0.04] relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
            <InteractiveCanvas />
          </div>

          {/* Bento Grid Features — Pure Obsidian */}
          <div className="bg-[#060507]/80">
            <BentoGrid />
          </div>

          {/* Developer SDK Showcase — Deep Dark Indigo */}
          <div className="bg-[#090918]/85 border-y border-white/[0.04] relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/15 via-transparent to-transparent pointer-events-none" />
            <SDKShowcase />
          </div>

          {/* Pricing Matrix — Rich Slate Blue */}
          <div className="bg-[#0D1120]/85 relative">
            <PricingMatrix onOpenWaitlist={() => handleOpenWaitlist()} />
          </div>

          {/* FAQ Accordion Section — Deep Charcoal */}
          <div className="bg-[#070912]/85 border-y border-white/[0.04]">
            <FAQSection />
          </div>

          {/* Final CTA Banner */}
          <div className="bg-[#060507]/90">
            <CTABanner onOpenWaitlist={() => handleOpenWaitlist()} />
          </div>
        </main>
      </div>

      <Footer />

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={handleCloseWaitlist}
        initialEmail={initialEmail}
      />
    </div>
  );
}
