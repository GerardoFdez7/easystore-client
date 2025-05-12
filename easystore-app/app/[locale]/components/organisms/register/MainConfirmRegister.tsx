'use client';

import { ConfirmRegisterForm } from '@components/molecules/register/RegisterConfirmForm';
import type { Plan } from '@components/molecules/register/RegisterConfirmForm';

export default function MainConfirmRegister() {
  const handleConfirm = (businessName: string, plan: Plan) => {
    console.log('Business Name:', businessName);
    console.log('Selected Plan:', plan);
  };

  return (
    <main className="mb-10 flex flex-col items-center justify-center px-4">
      <ConfirmRegisterForm onConfirm={handleConfirm} />
    </main>
  );
}
