'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Pricing from '@organisms/shared/Pricing';
import { Button } from '@atoms/shared/Button';

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
      <Button
        variant={'auth'}
        size={'xl'}
        className="mx-auto my-12 flex w-xs sm:w-xl"
      >
        {t('confirmButton')}
      </Button>
    </main>
  );
}
