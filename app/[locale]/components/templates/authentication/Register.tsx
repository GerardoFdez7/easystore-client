import Footer from '@organisms/shared/Footer';
import HeaderRegister from '@organisms/authentication/register/HeaderRegister';
import MainRegister from '@organisms/authentication/register/MainRegister';

export default function RegisterTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderRegister />
      <MainRegister />
      <Footer />
    </div>
  );
}
