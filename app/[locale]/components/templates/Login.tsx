import Footer from '@organisms/shared/Footer';
import HeaderLogin from '@components/organisms/login/HeaderLogin';
import MainLogin from '@components/organisms/login/MainLogin';

export default function LoginPage() {
  return (
    <div className="bg-background min-h-screen">
      <HeaderLogin />
      <MainLogin />
      <Footer />
    </div>
  );
}
