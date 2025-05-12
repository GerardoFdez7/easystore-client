import HeaderRegister from '@components/organisms/register/HeaderRegister';
import MainConfirmRegister from '@components/organisms/register/MainConfirmRegister';
import Footer from '@organisms/shared/Footer';

export default function ConfirmRegister() {
  return (
    <div className="bg-background min-h-screen">
      <HeaderRegister />
      <MainConfirmRegister />
      <Footer />
    </div>
  );
}
