import Pricing from '@organisms/shared/Pricing';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type PlanType = 'basic' | 'advanced' | 'premium' | 'enterprise';

export default function PricingLading() {
  const t = useTranslations('Landing');

  const [selectedPlan, setSelectedPlan] = useState<PlanType>('basic');

  return (
    <section id="plans" className="mx-auto">
      <div className="mb-5 p-5 text-center">
        <h1 className="text-primary my-5 text-2xl font-medium sm:text-3xl">
          {t('pricing&Plans')}
        </h1>
        <h2 className="text-title my-5 text-5xl font-extrabold sm:text-6xl">
          {t('pricingTitle')}
        </h2>
        <p className="text-foreground mx-auto my-5 max-w-5xl text-center text-[20px] sm:text-2xl">
          {t('pricingDescription')}
        </p>
      </div>
      <Pricing selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
    </section>
  );
}
