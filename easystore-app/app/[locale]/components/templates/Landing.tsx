import HeaderLanding from '@components/organisms/landing/HeaderLanding';
import Portrait from '@components/organisms/landing/Portrait';
import Start from '@components/organisms/landing/Start';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <HeaderLanding />
      <Portrait />
      <Start />
    </div>
  );
}
