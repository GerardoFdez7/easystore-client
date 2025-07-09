import HeaderConfirmRegister from '@organisms/confirm-register/HeaderConfirmRegister';
import MainConfirmRegister from '@organisms/confirm-register/MainConfirmRegister';
import Footer from '@organisms/shared/Footer';

export default function ConfirmRegisterTemplate() {
  return (
    <div className="bg-background min-h-screen">
      <HeaderConfirmRegister />
      <MainConfirmRegister />
      <Footer />
    </div>
  );
}
