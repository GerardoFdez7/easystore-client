import Footer from '@organisms/shared/Footer';
import HeaderResetPassword from '@organisms/reset-password/HeaderResetPassword';
import MainResetPassword from '@organisms/reset-password/MainResetPassword';

export default function ResetPasswordTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderResetPassword />
      <MainResetPassword />
      <Footer />
    </div>
  );
}
