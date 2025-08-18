'use client';
import * as React from 'react';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import type { Condition } from '@lib/utils/types/variant';

export default function PriceConditionRow({
  t,
  condition,
  setCondition,
  price,
  setPrice,
  currency = 'Q',
}: {
  t: (k: string) => string;
  condition: Condition;
  setCondition: (c: Condition) => void;
  price: string | number;
  setPrice: (v: string) => void;
  currency?: string;
}) {
  const onPriceChange = (v: string) => {
    const cleaned = v.replace(/,/g, '.').replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    const normalized =
      parts.length <= 2 ? cleaned : `${parts[0]}.${parts.slice(1).join('')}`;
    setPrice(normalized);
  };

  const onPriceBlur = () => {
    if (price === '' || price === null || price === undefined) return;
    const n = Number(price);
    if (!Number.isNaN(n)) setPrice(n.toFixed(2));
  };

  return (
    <section className="w-full">
      {/* ancho y centrado */}
      <div className="mx-auto w-full max-w-[640px]">
        {/* MÁS ESPACIO: gap-x-8 entre columnas y gap-y-6 entre filas */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* PRICE */}
          <div className="min-w-0 space-y-2">
            <Label htmlFor="price" className="text-foreground/80 text-xs">
              {t('price')}
            </Label>

            <div className="relative">
              <span className="bg-muted text-foreground/80 pointer-events-none absolute inset-y-0 right-2 my-1 flex items-center rounded px-1.5 text-[11px]">
                {currency}
              </span>

              <Input
                id="price"
                name="price"
                type="text"
                inputMode="decimal"
                className="h-9 w-full [appearance:textfield] rounded-md bg-white pr-10 text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder={t('pricePlaceholder')}
                value={String(price ?? '')}
                onChange={(e) => onPriceChange(e.target.value)}
                onBlur={onPriceBlur}
              />
            </div>
          </div>

          {/* CONDITION */}
          <div className="min-w-0 space-y-2">
            <Label htmlFor="condition" className="text-foreground/80 text-xs">
              {t('condition')}
            </Label>
            <Select
              value={condition}
              onValueChange={(v) => setCondition(v as Condition)}
            >
              <SelectTrigger
                id="condition"
                className="h-9 w-full rounded-md bg-white text-sm"
              >
                <SelectValue placeholder={t('selectCondition')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">{t('conditionNew')}</SelectItem>
                <SelectItem value="USED">{t('conditionUsed')}</SelectItem>
                <SelectItem value="REFURBISHED">
                  {t('conditionRefurbished')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
