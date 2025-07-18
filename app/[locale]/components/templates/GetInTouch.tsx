import Footer from '@organisms/shared/Footer';
import HeaderTouch from '@organisms/get-in-touch/HeaderTouch';

export default function GetInTouchTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderTouch />
      <Footer />
    </div>
  );
}
