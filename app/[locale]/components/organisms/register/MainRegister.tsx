'use client';

import RegisterForm from '@molecules/register/RegisterForm';
import LinkToLogin from '@molecules/register/LinkToLogin';
import SocialRegisterButtons from '@molecules/shared/SocialAuthButtons';

export default function MainRegister() {
  const handleRegister = (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log('Register data:', data);
  };

  return (
    <main className="mb-8 flex flex-col items-center justify-center gap-4 px-4">
      <RegisterForm onSubmit={handleRegister} />
      <LinkToLogin />
      <SocialRegisterButtons />
    </main>
  );
}
