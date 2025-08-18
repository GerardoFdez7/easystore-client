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

      {/* 2 columnas; textarea a lo ancho */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="min-w-0 space-y-1">
          <Label htmlFor="wMonths" className="text-foreground/80 text-xs">
            {t('warrantyMonths')}
          </Label>
          <Input
            id="wMonths"
            inputMode="numeric"
            type="text"
            className="h-9 bg-white text-sm"
            placeholder={t('warrantyMonthsPlaceholder')}
            value={warranty.months}
            onChange={(e) => set('months', e.target.value.replace(/\D/g, ''))}
          />
        </div>

        <div className="min-w-0 space-y-1">
          <Label htmlFor="wCoverage" className="text-foreground/80 text-xs">
            {t('warrantyCoverage')}
          </Label>
          <Input
            id="wCoverage"
            className="h-9 bg-white text-sm"
            placeholder={t('warrantyCoveragePlaceholder')}
            value={warranty.coverage}
            onChange={(e) => set('coverage', e.target.value)}
          />
        </div>

        <div className="min-w-0 space-y-1 sm:col-span-2">
          <Label htmlFor="wInstr" className="text-foreground/80 text-xs">
            {t('warrantyInstructions')}
          </Label>
          <Textarea
            id="wInstr"
            className="min-h-24 bg-white text-sm"
            placeholder={t('warrantyInstructionsPlaceholder')}
            value={warranty.instructions}
            onChange={(e) => set('instructions', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
