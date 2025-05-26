'use client';
import Pricing from '@molecules/shared/Pricing';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type PlanType = 'basic' | 'advanced' | 'premium' | 'enterprise';

export default function Main() {
  const t = useTranslations('ConfirmRegister');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('basic');

  return (
    <main className="mt-10 md:mx-20 xl:mx-35">
      <div className="px-5">
        <h1 className="text-title mb-2 text-[32px] font-extrabold sm:text-4xl 2xl:text-5xl">
          {t('title')}
        </h1>
        <p className="text-primary tex-[16px] mb-8 2xl:text-xl">
          {t('description')}
        </p>

        <div className="mb-15">
          <label
            htmlFor="businessName"
            className="tex-[16px] text-foreground mb-2 block font-medium 2xl:text-xl"
          >
            {t('businessName')}
          </label>
          <input
            type="text"
            id="businessName"
            className="tex-[16px] text-foreground border-primary focus:ring-primary h-[56px] w-full rounded-xl border-1 bg-transparent p-3 focus:ring-2 focus:outline-none md:w-[593px] 2xl:text-xl"
          />
        </div>
      </div>
      <h2 className="text-title px-5 pb-5 text-2xl font-bold 2xl:text-3xl">
        {t('choosePlan')}
      </h2>
      <Pricing selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
      <div className="my-12 flex justify-center">
        <button className="bg-primary w-xs rounded-full py-3 font-medium text-white sm:w-xl">
          {t('confirmButton')}
        </button>
      </div>
    </main>
  );
}
