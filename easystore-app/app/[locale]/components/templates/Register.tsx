import Footer from '@organisms/shared/Footer';
import HeaderRegister from '@organisms/register/HeaderRegister';
import MainRegister from '@organisms/register/MainRegister';

export default function RegisterPage() {
  return (
    <div className="bg-background min-h-screen">
      <HeaderRegister />
      <MainRegister />
      <Footer />
    </div>
  );
}
