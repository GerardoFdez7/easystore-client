'use client';

import LoginForm from '@molecules/authentication/login/LoginForm';
import ForgotPassword from '@atoms/authentication/login/ForgotPassword';
import ResetPasswordForm from '@molecules/authentication/login/ResetPasswordForm';

// import SocialRegisterButtons from '@molecules/shared/SocialAuthButtons';

export default function MainLogin() {
  return (
    <main className="mb-8 flex flex-col items-center justify-center gap-4 px-4">
      <LoginForm />
      <ForgotPassword />
      {/* <SocialRegisterButtons /> */}
      <ResetPasswordForm />
    </main>
  );
}
