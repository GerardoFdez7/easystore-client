import Footer from '@organisms/shared/Footer';
import HeaderRegister from '@components/organisms/register/HeaderRegister';
import MainRegister from '@components/organisms/register/MainRegister';

export default function RegisterPage() {
  return (
    <div className="bg-background min-h-screen">
      <HeaderRegister />
      <MainRegister />
      <Footer />
    </div>
  );
}
