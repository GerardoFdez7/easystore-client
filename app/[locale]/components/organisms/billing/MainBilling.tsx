'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import BillingMethodCard, {
  BillingCardState,
  BillingMethodId,
} from '@molecules/billing/BillingMethodCard';

type MethodRow = {
  id: BillingMethodId;
  enabled: boolean;
  configured: boolean;
};

export default function MainBilling() {
  const t = useTranslations('Billing');
  const router = useRouter();

  // Estado local (cámbialo luego por tu fetch/GraphQL)
  const [methods, setMethods] = useState<Record<BillingMethodId, MethodRow>>({
    cards: { id: 'cards', enabled: true, configured: true },
    cash: { id: 'cash', enabled: true, configured: true },
    bank_transfer: { id: 'bank_transfer', enabled: false, configured: false },
    paypal: { id: 'paypal', enabled: true, configured: true },
    cod: { id: 'cod', enabled: false, configured: false },
    installments: { id: 'installments', enabled: false, configured: false },
  });

  const list = useMemo(() => Object.values(methods), [methods]);

  const onToggle = (id: BillingMethodId, next: boolean) => {
    setMethods((prev) => ({
      ...prev,
      [id]: { ...prev[id], enabled: next },
    }));
    // TODO: persistir estado (mutation) si aplica
  };

  const onManage = (id: BillingMethodId) => {
    router.push(`/billing/${id}`); // ajusta la ruta a tu convención
  };

  return (
    <main className="flex w-full flex-col gap-6 px-2 sm:px-4 xl:mx-auto">
      <section className="text-muted-foreground text-sm">
        {t('subtitle')}
      </section>

      <section
        aria-label={t('gridAria')}
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        {list.map((m) => {
          const cardState: BillingCardState = m.configured
            ? 'configured'
            : 'pending';

          return (
            <BillingMethodCard
              key={m.id}
              id={m.id}
              title={t(`methods.${m.id}.title`)}
              description={t(`methods.${m.id}.description`)}
              state={cardState}
              enabled={m.enabled}
              onToggle={(next) => onToggle(m.id, next)}
              onManage={() => onManage(m.id)}
            />
          );
        })}
      </section>
    </main>
  );
}
