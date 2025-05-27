import Footer from '@organisms/shared/Footer';
import HeaderLogin from '@organisms/login/HeaderLogin';
import MainLogin from '@organisms/login/MainLogin';

export default function LoginPage() {
  return (
    <div className="bg-background min-h-screen">
      <HeaderLogin />
      <MainLogin />
      <Footer />
    </div>
  );
}
