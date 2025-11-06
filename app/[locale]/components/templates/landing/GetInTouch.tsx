import Footer from '@organisms/shared/Footer';
import HeaderTouch from '@organisms/landing/get-in-touch/HeaderTouch';
import MainTouch from '@organisms/landing/get-in-touch/MainTouch';

export default function GetInTouchTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderTouch />
      <MainTouch />
      <Footer />
    </div>
  );
}
