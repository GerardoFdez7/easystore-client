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
  // Aplica apariencia deshabilitada siempre que el método esté apagado
  // Apply disabled appearance when the method is turned off
  const disabledLook = !enabled;

  return (
    <Card
      className={cn(
        'bg-card relative overflow-hidden rounded-2xl border p-6 transition-shadow',
        'hover:shadow-md',
        'flex h-full flex-col',
        disabledLook && 'opacity-60 grayscale',
      )}
    >
      <div className="absolute top-4 right-4">
        <Switch
          aria-label={`toggle-${id}`}
          checked={enabled}
          onCheckedChange={onToggle}
        />
      </div>

      <div className="mb-6 flex w-full justify-center">
        {!enabled ? (
          <span className="bg-muted text-secondary-foreground inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
            {t('disabled')}
          </span>
        ) : state === 'pending' ? (
          <span className="bg-warning/20 text-warning inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
            {t('pendingSetup')}
          </span>
        ) : null}
      </div>
      <CardContent className="flex flex-1 flex-col items-center gap-4 p-0">
        <div className="bg-muted/60 flex h-16 w-16 items-center justify-center rounded-full">
          {iconById[id]}
        </div>

        <div className="text-center">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-muted-foreground mt-1 max-w-60 text-xs">
            {description}
          </p>
        </div>

        <Button
          className="mt-auto w-full max-w-60"
          size="sm"
          variant="outline"
          onClick={onManage}
        >
          {t('manageSettings')}
        </Button>
      </CardContent>
    </Card>
  );
}
