'use client';

import { LoginForm } from '@components/molecules/login/LoginForm';
import HeaderForm from '@components/molecules/login/HeaderForm';

export default function MainLogin() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login data:', data);
  };

  return (
    <main className="mb-10 flex flex-col items-center justify-center px-4">
      <HeaderForm />
      <LoginForm onSubmit={handleLogin} />
    </main>
  );
}
