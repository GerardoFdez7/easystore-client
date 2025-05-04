import HeaderLanding from '@components/organisms/landing/HeaderLanding';
import MainLanding from '@components/organisms/landing/MainLanding';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <HeaderLanding />
      <MainLanding />
    </div>
  );
}
