'use client';

import { LoginForm } from '@components/molecules/login/LoginForm';

export default function MainLogin() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login data:', data);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <LoginForm onSubmit={handleLogin} />
    </main>
  );
}
