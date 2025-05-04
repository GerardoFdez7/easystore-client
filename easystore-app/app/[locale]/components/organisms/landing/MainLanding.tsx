import Portrait from '@components/molecules/landing/Portrait';
import Start from '@components/molecules/landing/Start';
import Footer from '@components/molecules/shared/Footer';

export default function MainLanding() {
  return (
    <div className="mx-0 mt-21 sm:mt-26 md:mx-20 xl:mx-35">
      <Portrait />
      <Start />
      <Footer />
    </div>
  );
}
