import AboutUs from '@components/molecules/landing/AboutUs';
import FAQs from '@components/molecules/landing/FAQs';
import Everywhere from '@molecules/landing/Everywhere';
import Features from '@molecules/landing/Features';
import Portrait from '@molecules/landing/Portrait';
import Start from '@molecules/landing/Start';

export default function MainLanding() {
  return (
    <main className="mt-21 sm:mt-26 md:mx-20 xl:mx-35">
      <Portrait />
      <Start />
      <Features />
      <Everywhere />
      <FAQs />
      <AboutUs />
    </main>
  );
}
