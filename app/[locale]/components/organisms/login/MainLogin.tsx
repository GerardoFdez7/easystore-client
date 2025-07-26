'use client';

import LoginForm from '@molecules/login/LoginForm';
import ForgotPassword from '@atoms/login/ForgotPassword';
// import SocialRegisterButtons from '@molecules/shared/SocialAuthButtons';

export default function MainLogin() {
  return (
    <main className="mb-8 flex flex-col items-center justify-center gap-4 px-4">
      <LoginForm />
      <ForgotPassword />
      {/* <SocialRegisterButtons /> */}
    </main>
  );
}
