'use client';
import * as React from 'react';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';

export type Installment = { months: string; interestRate: string };

export default function InstallmentPayments({
  t,
  installment,
  setInstallment,
}: {
  t: (k: string) => string;
  installment: Installment;
  setInstallment: (fn: (prev: Installment) => Installment) => void;
}) {
  const set = (k: keyof Installment, v: string) =>
    setInstallment((p) => ({ ...p, [k]: v }));

  return (
    <section className="space-y-2">
      <h3 className="text-foreground/90 text-sm font-semibold">
        {t('installmentPayments')}
      </h3>

      {/* 2 columnas, compacto y alineado */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="min-w-0 space-y-1">
          <Label htmlFor="months" className="text-foreground/80 text-xs">
            {t('months')}
          </Label>
          <Input
            id="months"
            inputMode="numeric"
            type="text"
            className="h-9 bg-white text-sm"
            placeholder={t('monthsPlaceholder')}
            value={installment.months}
            onChange={(e) => set('months', e.target.value.replace(/\D/g, ''))}
          />
        </div>

        <div className="min-w-0 space-y-1">
          <Label htmlFor="interestRate" className="text-foreground/80 text-xs">
            {t('interestRate')}
          </Label>
          <div className="relative">
            <span className="bg-muted text-foreground/80 pointer-events-none absolute inset-y-0 right-2 my-1 flex items-center rounded px-1.5 text-[11px]">
              %
            </span>
            <Input
              id="interestRate"
              inputMode="decimal"
              type="text"
              className="h-9 bg-white pr-9 text-sm"
              placeholder={t('interestRatePlaceholder')}
              value={installment.interestRate}
              onChange={(e) =>
                set('interestRate', e.target.value.replace(/[^0-9.]/g, ''))
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
