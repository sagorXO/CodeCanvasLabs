'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { SocialProofMarquee } from '@/components/SocialProofMarquee';
import { InteractiveCanvas } from '@/components/InteractiveCanvas';
import { BentoGrid } from '@/components/BentoGrid';
import { PricingMatrix } from '@/components/PricingMatrix';
import { WaitlistModal } from '@/components/WaitlistModal';
import { Footer } from '@/components/Footer';

// Dynamic import — Three.js should never SSR and must not block initial paint
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
    <div className="relative min-h-screen bg-[#090A0F] text-[#F9FAFB] flex flex-col justify-between">
      {/* 3D Background — sits behind entire page, fades on scroll */}
      <Helion3DBackground />

      <div className="relative z-10">
        <Navbar onOpenWaitlist={() => handleOpenWaitlist()} />
        <main>
          <HeroSection onOpenWaitlist={handleOpenWaitlist} />
          <SocialProofMarquee />
          <InteractiveCanvas />
          <BentoGrid />
          <PricingMatrix onOpenWaitlist={() => handleOpenWaitlist()} />
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
