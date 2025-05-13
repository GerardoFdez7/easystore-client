'use client';

import { FormField } from '@components/molecules/shared/FormField';
import { Form } from '@components/atoms/shared/Form';
import ButtonConfirmRegister from '@components/atoms/register/ButtonConfirmRegister';
import ButtonConfirmPlan from '@components/atoms/register/ButtonConfirmPlan';
import React, { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@components/atoms/shared/Card';
import { Check } from 'lucide-react';

export interface Plan {
  name: string;
  price: string;
  suffix: string;
  features: string[];
  buttonLabel: string;
}

const plans: Plan[] = [
  {
    name: 'Basic',
    price: '$0',
    suffix: '/month',
    features: [
      '50 products limit',
      '1 warehouse limit',
      '1 sales page',
      'Forum support',
    ],
    buttonLabel: 'Try for free',
  },
  {
    name: 'Premium',
    price: '$15',
    suffix: '/month',
    features: [
      '200 products limit',
      '3 warehouses limit',
      '5 employee accounts',
      '1 landing page',
      '1 sales page with 2 templates',
      '48h response mail support',
      'Basic reports',
      '+$5 optional personalized domain',
      'Inventory synchronization',
    ],
    buttonLabel: '14 days trial',
  },
  {
    name: 'Advanced',
    price: '$30',
    suffix: '/month',
    features: [
      'Unlimited products',
      '10 warehouses limit',
      '15 employee accounts',
      '1 landing page',
      '1 sales page 100% customizable',
      '2 extra pages',
      'Personalized chat support',
      'Complete analytics',
      'Custom domain included',
      'Inventory synchronization',
    ],
    buttonLabel: 'Get started',
  },
  {
    name: 'Enterprise',
    price: '$100',
    suffix: '/month',
    features: [
      'Unlimited products',
      'Unlimited warehouses',
      'Unlimited employee accounts',
      '100% custom site',
      '24/7 priority support',
      'Complete analytics',
      'Custom domain included',
      'Inventory synchronization',
      'AI for content',
    ],
    buttonLabel: 'Get in touch',
  },
];

interface ConfirmRegisterFormProps {
  onConfirm?: (businessName: string, plan: Plan) => void;
}

export const ConfirmRegisterForm: React.FC<ConfirmRegisterFormProps> = ({
  onConfirm,
}) => {
  const t = useTranslations('Register');
  const router = useRouter();

  const [businessName, setBusinessName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (businessName && selectedPlan) {
      onConfirm?.(businessName, selectedPlan);
      router.push('/login');
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="space-y-8">
      <div className="text-left">
        <h1 className="text-title text-2xl font-bold">
          {t('registerBusinessTitle')}
        </h1>
        <p className="text-text text-sm">{t('registerBusinessMesaage')}</p>
      </div>

      <FormField
        name="businessName"
        label={t('businessName')}
        type="text"
        placeholder="Enter your business name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col border ${selectedPlan?.name === plan.name ? 'border-primary' : ''}`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="text-3xl font-bold">
                {plan.price}
                <span className="text-base font-normal">{plan.suffix}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start">
                    <Check className="text-secondary mt-[2px] h-5 w-5 flex-shrink-0" />
                    <span className="ml-2 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex-none">
              <ButtonConfirmPlan
                type="button"
                onClick={() => setSelectedPlan(plan)}
                className={`w-full ${selectedPlan?.name === plan.name ? 'bg-secondary' : ''}`}
                variant={
                  selectedPlan?.name === plan.name ? 'secondary' : 'default'
                }
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <ButtonConfirmRegister
          type="submit"
          disabled={!businessName || !selectedPlan}
          className={`w-full ${!businessName || !selectedPlan ? 'bg-gray-400' : 'bg-primary'}`}
        />
      </div>
    </Form.Root>
  );
};
