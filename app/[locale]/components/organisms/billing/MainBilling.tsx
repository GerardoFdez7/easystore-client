'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import BillingMethodCard, {
  BillingCardState,
  BillingMethodId,
} from '@molecules/billing/BillingMethodCard';
import CardPaymentModal from '@molecules/billing/CardPaymentModal';
import PayPalModal from '@molecules/billing/PayPalModal';
import CashPaymentModal from '@molecules/billing/CashPaymentModal';
import BankTransferModal from '@molecules/billing/BankTransferModal';
import CODModal from '@molecules/billing/CODModal';
import InstallmentsModal from '@molecules/billing/InstallmentsModal';

type MethodRow = {
  id: BillingMethodId;
  enabled: boolean;
  configured: boolean;
};

export default function MainBilling() {
  const t = useTranslations('Billing');

  const [activeModal, setActiveModal] = useState<BillingMethodId | null>(null);

  const [methods, setMethods] = useState<Record<BillingMethodId, MethodRow>>({
    cards: { id: 'cards', enabled: true, configured: false },
    cash: { id: 'cash', enabled: true, configured: false },
    bank_transfer: { id: 'bank_transfer', enabled: false, configured: false },
    paypal: { id: 'paypal', enabled: true, configured: false },
    cod: { id: 'cod', enabled: false, configured: false },
    installments: { id: 'installments', enabled: false, configured: false },
  });

  const list = useMemo(() => Object.values(methods), [methods]);

  const onToggle = (id: BillingMethodId, next: boolean) => {
    setMethods((prev) => ({
      ...prev,
      [id]: { ...prev[id], enabled: next },
    }));
  };

  const onManage = (id: BillingMethodId) => {
    setActiveModal(id);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <main className="flex w-full flex-col gap-6 px-2 sm:px-4 xl:mx-auto">
      <h2 className="text-text text-sm sm:text-lg">{t('subtitle')}</h2>

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

      {/* Modals */}
      <CardPaymentModal
        open={activeModal === 'cards'}
        onOpenChange={(open) => !open && closeModal()}
        onSaved={() =>
          setMethods((prev) => ({
            ...prev,
            cards: { ...prev.cards, configured: true },
          }))
        }
      />
      <PayPalModal
        open={activeModal === 'paypal'}
        onOpenChange={(open) => !open && closeModal()}
        onSaved={() =>
          setMethods((prev) => ({
            ...prev,
            paypal: { ...prev.paypal, configured: true },
          }))
        }
      />
      <CashPaymentModal
        open={activeModal === 'cash'}
        onOpenChange={(open) => !open && closeModal()}
        onSaved={() =>
          setMethods((prev) => ({
            ...prev,
            cash: { ...prev.cash, configured: true },
          }))
        }
      />
      <BankTransferModal
        open={activeModal === 'bank_transfer'}
        onOpenChange={(open) => !open && closeModal()}
        onSaved={() =>
          setMethods((prev) => ({
            ...prev,
            bank_transfer: { ...prev.bank_transfer, configured: true },
          }))
        }
      />
      <CODModal
        open={activeModal === 'cod'}
        onOpenChange={(open) => !open && closeModal()}
        onSaved={() =>
          setMethods((prev) => ({
            ...prev,
            cod: { ...prev.cod, configured: true },
          }))
        }
      />
      <InstallmentsModal
        open={activeModal === 'installments'}
        onOpenChange={(open) => !open && closeModal()}
        onSaved={() =>
          setMethods((prev) => ({
            ...prev,
            installments: { ...prev.installments, configured: true },
          }))
        }
      />
    </main>
  );
}
