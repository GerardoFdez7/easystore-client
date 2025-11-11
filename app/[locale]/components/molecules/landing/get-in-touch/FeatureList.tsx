'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const FeaturesList: React.FC = () => {
  const t = useTranslations('GetInTouch');

  const featureKeys = [
    'unlimitedProducts',
    'unlimitedWarehouses',
    'unlimitedEmployeeAccounts',
    'customSite',
    'prioritySupport',
    'completeAnalytics',
    'customDomain',
    'inventorySync',
    'aiContent',
  ] as const;

  return (
    <div className="space-y-4">
      {featureKeys.map((key) => (
        <div key={key} className="flex items-center gap-3">
          <div className="bg-secondary flex h-5 w-5 items-center justify-center rounded-full">
            <Check className="text-text h-3 w-3" />
          </div>
          <span className="text-foreground">{t(`features.${key}`)}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
