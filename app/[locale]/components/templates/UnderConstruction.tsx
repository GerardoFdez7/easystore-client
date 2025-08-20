import type React from 'react';
import HeaderConstruction from '@organisms/construction/HeaderConstruction';
import MainConstruction from '@organisms/construction/MainConstruction';
import Footer from '@organisms/shared/Footer';
import AnimatedBackground from '@atoms/shared/AnimatedBackground';

export default function UnderConstructionTemplate() {
  return (
    <div className="from-background via-card to-background min-h-screen bg-gradient-to-br">
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col px-4 py-8">
        <div className="mb-12 flex flex-1 flex-col items-center justify-center space-y-12 text-center">
          <HeaderConstruction />
          <MainConstruction />
        </div>

        <Footer />
        <AnimatedBackground />
      </div>
    </div>
  );
}
