'use client';
import PlanBasic from '@molecules/confirm-register/PlanBasic';
import PlanAdvanced from '@molecules/confirm-register/PlanAdvanced';
import PlanPremium from '@molecules/confirm-register/PlanPremium';
import PlanEnterPrise from '@molecules/confirm-register/PlanEnterPrise';
import { Tabs, TabsList, TabsTrigger } from '@atoms/shared/Tabs';
import { useState } from 'react';

export default function Pricing() {
  type BillingType = 'monthly' | 'yearly';
  type PlanType = 'basic' | 'advanced' | 'premium' | 'enterprise';
  const [billing, setBilling] = useState<BillingType>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('basic');
  const styleTriggersPlans =
    'data-[state=active]:bg-foreground text-[12px] rounded-xl';

  const prices: Record<BillingType, Record<PlanType, string>> = {
    monthly: {
      basic: '$0',
      advanced: '$15',
      premium: '$30',
      enterprise: '$100',
    },
    yearly: { basic: '$0', advanced: '$11', premium: '$22', enterprise: '$75' },
  };

  const renderPlan = () => {
    const price = prices[billing][selectedPlan];
    switch (selectedPlan) {
      case 'basic':
        return <PlanBasic />;
      case 'advanced':
        return <PlanAdvanced price={price} />;
      case 'premium':
        return <PlanPremium price={price} />;
      case 'enterprise':
        return <PlanEnterPrise price={price} />;
    }
  };

  return (
    <section>
      <h2 className="text-title px-5 pb-5 text-2xl font-bold 2xl:text-3xl">
        Choose a Plan
      </h2>
      {/* Tabs of Billing */}
      <Tabs
        defaultValue={billing}
        onValueChange={(val) => setBilling(val as BillingType)}
      >
        <TabsList className="mx-auto grid w-[263px] grid-cols-2 gap-2">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="hidden min-[904px]:block">
        <div className="flex flex-wrap justify-center gap-6">
          <PlanBasic />
          <PlanAdvanced price={prices[billing].advanced} />
          <PlanPremium price={prices[billing].premium} />
          <PlanEnterPrise price={prices[billing].enterprise} />
        </div>
      </div>

      <div className="block min-[904px]:hidden">
        {/* Tabs of Plans */}
        <Tabs
          defaultValue={selectedPlan}
          onValueChange={(val) => setSelectedPlan(val as PlanType)}
        >
          <TabsList className="mx-auto grid h-[50px] max-w-[360px] min-w-[330px] grid-cols-4 rounded-xl">
            <TabsTrigger className={styleTriggersPlans} value="basic">
              Basic
            </TabsTrigger>
            <TabsTrigger className={styleTriggersPlans} value="advanced">
              Advanced
            </TabsTrigger>
            <TabsTrigger className={styleTriggersPlans} value="premium">
              Premium
            </TabsTrigger>
            <TabsTrigger className={styleTriggersPlans} value="enterprise">
              Enterprise
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex justify-center">{renderPlan()}</div>
      </div>
    </section>
  );
}
