'use client';

import { RegisterForm } from '@components/molecules/register/RegisterForm';

export default function MainRegister() {
  const handleRegister = (data: {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log('Register data:', data);
  };

  return (
    <main className="mb-10 flex flex-col items-center justify-center px-4">
      <RegisterForm onSubmit={handleRegister} />
    </main>
  );
}
