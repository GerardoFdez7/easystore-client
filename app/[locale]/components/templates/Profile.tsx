import Footer from '@organisms/shared/Footer';
import HeaderLogin from '@organisms/login/HeaderLogin';
import MainLogin from '@organisms/login/MainLogin';

export default function ProfileTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderLogin />
      <MainLogin />
      <Footer />
    </div>
  );
}
