'use client';
import PlanBasic from '@molecules/authentication/confirm-register/PlanBasic';
import PlanAdvanced from '@molecules/authentication/confirm-register/PlanAdvanced';
import PlanPremium from '@molecules/authentication/confirm-register/PlanPremium';
import PlanEnterprise from '@molecules/authentication/confirm-register/PlanEnterprise';
import { Tabs, TabsList, TabsTrigger } from '@atoms/shared/PricingTabs';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

type PricingProps = {
  selectedPlan: PlanType;
  setSelectedPlan: (plan: PlanType) => void;
  mode?: 'confirm' | 'landing';
};

type PlanType = 'basic' | 'advanced' | 'premium' | 'enterprise';
type BillingType = 'monthly' | 'yearly';

export default function Pricing({
  selectedPlan,
  setSelectedPlan,
  mode,
}: PricingProps) {
  const t = useTranslations('ConfirmRegister');

  const [width, setWidth] = useState<number | null>(null);
  const [billing, setBilling] = useState<BillingType>('monthly');
  const styleTriggersPlans =
    'data-[state=active]:bg-title dark:data-[state=active]:bg-title text-title text-[12px] rounded-xl dark:data-[state=active]:text-black';

  const prices: Record<BillingType, Record<PlanType, string>> = {
    monthly: {
      basic: '$0',
      premium: '$15',
      advanced: '$30',
      enterprise: '$100',
    },
    yearly: { basic: '$0', premium: '$11', advanced: '$22', enterprise: '$75' },
  };

  const renderPlan = () => {
    const price = prices[billing][selectedPlan];
    switch (selectedPlan) {
      case 'basic':
        return (
          <PlanBasic
            price={price}
            selected={selectedPlan === 'basic'}
            onSelect={() => setSelectedPlan('basic')}
            mode={mode}
          />
        );
      case 'premium':
        return (
          <PlanPremium
            price={price}
            selected={selectedPlan === 'premium'}
            onSelect={() => setSelectedPlan('premium')}
            mode={mode}
          />
        );
      case 'advanced':
        return (
          <PlanAdvanced
            price={price}
            selected={selectedPlan === 'advanced'}
            onSelect={() => setSelectedPlan('advanced')}
            mode={mode}
          />
        );
      case 'enterprise':
        return <PlanEnterprise price={price} />;
    }
  };

  //Update width of Tabs of Plans
  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section>
      {/* Tabs of Billing */}
      <Tabs
        defaultValue={billing}
        onValueChange={(val) => setBilling(val as BillingType)}
      >
        <TabsList className="mx-auto grid w-[263px] grid-cols-2 gap-2">
          <TabsTrigger value="monthly"> {t('monthly')}</TabsTrigger>
          <TabsTrigger value="yearly"> {t('yearly')}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="hidden min-[904px]:block">
        <div className="grid grid-cols-2 justify-items-center gap-6 2xl:grid-cols-4">
          <PlanBasic
            price={prices[billing].basic}
            selected={selectedPlan === 'basic'}
            onSelect={() => setSelectedPlan('basic')}
            mode={mode}
          />
          <PlanPremium
            price={prices[billing].premium}
            selected={selectedPlan === 'premium'}
            onSelect={() => setSelectedPlan('premium')}
            mode={mode}
          />
          <PlanAdvanced
            price={prices[billing].advanced}
            selected={selectedPlan === 'advanced'}
            onSelect={() => setSelectedPlan('advanced')}
            mode={mode}
          />
          <PlanEnterprise price={prices[billing].enterprise} />
        </div>
      </div>

      <div className="block min-[904px]:hidden">
        {/* Tabs of Plans */}
        <Tabs
          defaultValue={selectedPlan}
          onValueChange={(val) => setSelectedPlan(val as PlanType)}
        >
          <TabsList
            className={clsx(
              'mx-auto grid rounded-xl',
              width !== null && width <= 360
                ? 'h-auto w-[263px] grid-cols-2'
                : 'h-[50px] w-[360px] grid-cols-4',
            )}
          >
            <TabsTrigger className={styleTriggersPlans} value="basic">
              {t('basic')}
            </TabsTrigger>
            <TabsTrigger className={styleTriggersPlans} value="premium">
              {t('premium')}
            </TabsTrigger>
            <TabsTrigger className={styleTriggersPlans} value="advanced">
              {t('advanced')}
            </TabsTrigger>
            <TabsTrigger className={styleTriggersPlans} value="enterprise">
              {t('enterprise')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex justify-center">{renderPlan()}</div>
      </div>
    </section>
  );
}
