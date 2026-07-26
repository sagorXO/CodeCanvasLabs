'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { SocialProofMarquee } from '@/components/SocialProofMarquee';
import { CaseStudiesShowcase } from '@/components/CaseStudiesShowcase';
import { ProjectCalculator } from '@/components/ProjectCalculator';
import { InteractiveCanvas } from '@/components/InteractiveCanvas';
import { EdgeBenchmarkWidget } from '@/components/EdgeBenchmarkWidget';
import { TechStackMatrix } from '@/components/TechStackMatrix';
import { BentoGrid } from '@/components/BentoGrid';
import { SDKShowcase } from '@/components/SDKShowcase';
import { FAQSection } from '@/components/FAQSection';
import { CTABanner } from '@/components/CTABanner';
import { WaitlistModal } from '@/components/WaitlistModal';
import { WaitlistLookupModal } from '@/components/WaitlistLookupModal';
import { ConsultationModal } from '@/components/ConsultationModal';
import { Footer } from '@/components/Footer';

// Dynamic import for background 3D WebGL scene
const Helion3DBackground = dynamic(
  () => import('@/components/Helion3DBackground').then(mod => ({ default: mod.Helion3DBackground })),
  { ssr: false }
);

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationDetails, setConsultationDetails] = useState('');
  const [initialEmail, setInitialEmail] = useState('');

  const handleOpenConsultation = (details?: string) => {
    if (details) {
      setConsultationDetails(details);
    }
    setIsConsultationOpen(true);
  };

  const handleOpenWaitlist = (email?: string) => {
    if (email) {
      setInitialEmail(email);
    }
    setIsWaitlistOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#060507] text-[#F9FAFB] flex flex-col justify-between overflow-x-hidden">
      {/* Fixed Ambient 3D Scene Background */}
      <Helion3DBackground />

      <div className="relative z-10">
        <Navbar
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenWaitlist={() => handleOpenWaitlist()}
          onOpenLookup={() => setIsLookupOpen(true)}
        />

        <main>
          {/* Hero Section with Interactive 3D WebGL Element */}
          <div className="bg-[#060507]/60">
            <HeroSection
              onOpenConsultation={() => handleOpenConsultation()}
              onOpenWaitlist={handleOpenWaitlist}
            />
          </div>

          {/* Partner & Tech Proof Marquee */}
          <div className="bg-[#0B0E17]/80 backdrop-blur-sm border-y border-white/[0.04]">
            <SocialProofMarquee />
          </div>

          {/* Proven Enterprise Case Studies & Architecture Blueprints */}
          <div className="bg-gradient-to-b from-[#080C1B]/90 via-[#0A0E22]/90 to-[#080C1B]/90 border-b border-white/[0.04]">
            <CaseStudiesShowcase />
          </div>

          {/* Interactive Project Scope & Budget Calculator ($10,000+) */}
          <div className="bg-[#090C1A]/90 border-b border-white/[0.04] relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
            <ProjectCalculator onOpenConsultation={handleOpenConsultation} />
          </div>

          {/* Live Interactive Pipeline Graph Simulator */}
          <div className="bg-[#060507]/80 border-b border-white/[0.04]">
            <InteractiveCanvas />
          </div>

          {/* Real-time Edge Health Diagnostics Benchmark */}
          <div className="bg-[#070914]/85 border-b border-white/[0.04]">
            <EdgeBenchmarkWidget />
          </div>

          {/* System Capability & Tech Stack Matrix */}
          <div className="bg-[#090A16]/85 border-b border-white/[0.04]">
            <TechStackMatrix />
          </div>

          {/* Bento Grid Architectural Invariants */}
          <div className="bg-[#060507]/80">
            <BentoGrid />
          </div>

          {/* Developer SDK & Integration Showcase */}
          <div className="bg-[#090918]/85 border-y border-white/[0.04] relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/15 via-transparent to-transparent pointer-events-none" />
            <SDKShowcase />
          </div>

          {/* FAQ Accordion Section */}
          <div className="bg-[#070912]/85 border-y border-white/[0.04]">
            <FAQSection />
          </div>

          {/* Final Call to Action Banner */}
          <div className="bg-[#060507]/90">
            <CTABanner onOpenWaitlist={() => handleOpenConsultation()} />
          </div>
        </main>
      </div>

      <Footer />

      {/* Booking & Discovery Intake Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialDetails={consultationDetails}
      />

      {/* Waitlist Registration Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        initialEmail={initialEmail}
      />

      {/* Rank Lookup Modal */}
      <WaitlistLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />
    </div>
  );
}
