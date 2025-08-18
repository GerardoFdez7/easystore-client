'use client';
import * as React from 'react';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';
import { Textarea } from '@shadcn/ui/textarea';

export type Warranty = {
  months: string;
  coverage: string;
  instructions: string;
};

export default function WarrantyFields({
  t,
  warranty,
  setWarranty,
}: {
  t: (k: string) => string;
  warranty: Warranty;
  setWarranty: (fn: (prev: Warranty) => Warranty) => void;
}) {
  const set = (k: keyof Warranty, v: string) =>
    setWarranty((p) => ({ ...p, [k]: v }));

  return (
    <section className="space-y-2">
      <h3 className="text-foreground/90 text-sm font-semibold">
        {t('warranties')}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="wMonths" className="text-foreground/80 text-xs">
            {t('warrantyMonths')}
          </Label>
          <Input
            id="wMonths"
            inputMode="numeric"
            type="text"
            value={warranty.months}
            onChange={(e) => set('months', e.target.value.replace(/\D/g, ''))}
            placeholder={t('warrantyMonthsPlaceholder')}
            className="h-9 bg-white text-sm"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="wCoverage" className="text-foreground/80 text-xs">
            {t('warrantyCoverage')}
          </Label>
          <Input
            id="wCoverage"
            value={warranty.coverage}
            onChange={(e) => set('coverage', e.target.value)}
            placeholder={t('warrantyCoveragePlaceholder')}
            className="h-9 bg-white text-sm"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-3">
          <Label htmlFor="wInstr" className="text-foreground/80 text-xs">
            {t('warrantyInstructions')}
          </Label>
          <Textarea
            id="wInstr"
            value={warranty.instructions}
            onChange={(e) => set('instructions', e.target.value)}
            placeholder={t('warrantyInstructionsPlaceholder')}
            className="min-h-24 bg-white"
          />
        </div>
      </div>
    </section>
  );
}
