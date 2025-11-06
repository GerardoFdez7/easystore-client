'use client';
import AboutUs from '@molecules/landing/AboutUs';
import FAQs from '@molecules/landing/FAQs';
import Everywhere from '@molecules/landing/Everywhere';
import Features from '@molecules/landing/Features';
import Portrait from '@molecules/landing/Portrait';
import Start from '@molecules/landing/Start';
import PricingLading from '@molecules/landing/PricingLanding';

export default function MainLanding() {
  return (
    <main className="mt-21 space-y-30 sm:mt-26 md:mx-20 xl:mx-35">
      <Portrait />
      <Start />
      <Features />
      <Everywhere />
      <PricingLading />
      <FAQs />
      <AboutUs />
    </main>
  );
}
