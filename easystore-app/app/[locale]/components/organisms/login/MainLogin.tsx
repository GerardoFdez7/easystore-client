'use client';

import { LoginForm } from '@components/molecules/login/LoginForm';

export default function MainLogin() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login data:', data);
  };

  return (
    <main className="mb-10 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32">
      <LoginForm onSubmit={handleLogin} />
    </main>
  );
}
