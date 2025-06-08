'use client';
import Pricing from '@organisms/shared/Pricing';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type PlanType = 'basic' | 'advanced' | 'premium' | 'enterprise';

export default function MainConfirmRegister() {
  const t = useTranslations('ConfirmRegister');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('basic');

  return (
    <main className="mt-10 md:mx-20 xl:mx-35">
      <h2 className="text-title px-5 pb-5 text-2xl font-bold 2xl:text-3xl">
        {t('choosePlan')}
      </h2>
      <Pricing
        mode="confirm"
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
      <div className="my-12 flex justify-center">
        <button className="bg-primary w-xs rounded-full py-3 font-medium text-white sm:w-xl">
          {t('confirmButton')}
        </button>
      </div>
    </main>
  );
}
