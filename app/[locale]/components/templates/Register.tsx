import Footer from '@organisms/shared/Footer';
import HeaderRegister from '@organisms/register/HeaderRegister';
import MainRegister from '@organisms/register/MainRegister';

export default function RegisterTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderRegister />
      <MainRegister />
      <Footer />
    </div>
  );
}
