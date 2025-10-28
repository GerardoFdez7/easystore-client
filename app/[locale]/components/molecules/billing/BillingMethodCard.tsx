'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';
import { Switch } from '@shadcn/ui/switch';
import { cn } from '@lib/utils';
import {
  CreditCard,
  Banknote,
  Landmark,
  Wallet,
  Truck,
  CircleDollarSign,
} from 'lucide-react';

export type BillingMethodId =
  | 'cards'
  | 'cash'
  | 'bank_transfer'
  | 'paypal'
  | 'cod'
  | 'installments';

export type BillingCardState = 'configured' | 'pending';

type Props = {
  id: BillingMethodId;
  title: string;
  description: string;
  state: BillingCardState;
  enabled: boolean;
  onToggle: (next: boolean) => void;
  onManage: () => void;
};

const iconById: Record<BillingMethodId, ReactNode> = {
  cards: <CreditCard className="h-7 w-7" aria-hidden="true" />,
  cash: <Banknote className="h-7 w-7" aria-hidden="true" />,
  bank_transfer: <Landmark className="h-7 w-7" aria-hidden="true" />,
  paypal: <Wallet className="h-7 w-7" aria-hidden="true" />,
  cod: <Truck className="h-7 w-7" aria-hidden="true" />,
  installments: <CircleDollarSign className="h-7 w-7" aria-hidden="true" />,
};

export default function BillingMethodCard({
  id,
  title,
  description,
  state,
  enabled,
  onToggle,
  onManage,
}: Props) {
  const t = useTranslations('Billing.MethodCard');
  const disabledLook = !enabled && state === 'pending';

  return (
    <Card
      className={cn(
        'bg-card relative overflow-hidden rounded-2xl border p-6 transition-shadow',
        'hover:shadow-md',
        disabledLook && 'opacity-60 grayscale',
      )}
    >
      {/* Toggle */}
      <div className="absolute top-4 right-4">
        <Switch
          aria-label={`toggle-${id}`}
          checked={enabled}
          onCheckedChange={onToggle}
        />
      </div>

      {/* Pill de estado */}
      <div className="mb-6">
        {state === 'configured' ? (
          <span className="bg-secondary/20 text-secondary-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
            {t('configured')}
          </span>
        ) : (
          <span className="bg-warning/20 text-warning inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
            {t('pendingSetup')}
          </span>
        )}
      </div>

      <CardContent className="flex flex-col items-center gap-4 p-0">
        {/* Icono circular */}
        <div className="bg-muted/60 flex h-16 w-16 items-center justify-center rounded-full">
          {iconById[id]}
        </div>

        {/* Título y desc */}
        <div className="text-center">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-muted-foreground mt-1 max-w-[240px] text-xs">
            {description}
          </p>
        </div>

        <Button
          className="mt-3 w-full max-w-[240px]"
          size="sm"
          variant="secondary"
          onClick={onManage}
        >
          {t('manageSettings')}
        </Button>
      </CardContent>
    </Card>
  );
}
