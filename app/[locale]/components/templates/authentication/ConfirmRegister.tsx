import HeaderConfirmRegister from '@organisms/authentication/confirm-register/HeaderConfirmRegister';
import MainConfirmRegister from '@organisms/authentication/confirm-register/MainConfirmRegister';
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
