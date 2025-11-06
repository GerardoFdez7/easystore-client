import Footer from '@organisms/shared/Footer';
import HeaderLogin from '@organisms/authentication/login/HeaderLogin';
import MainLogin from '@organisms/authentication/login/MainLogin';

export default function LoginTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderLogin />
      <MainLogin />
      <Footer />
    </div>
  );
}
