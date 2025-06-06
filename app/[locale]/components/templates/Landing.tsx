import Footer from '@organisms/shared/Footer';
import HeaderLanding from '@organisms/landing/HeaderLanding';
import MainLanding from '@organisms/landing/MainLanding';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <HeaderLanding />
      <MainLanding />
      <Footer />
    </div>
  );
}
