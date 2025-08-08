'use client';
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
}: {
  t: (k: string) => string;
  condition: Condition;
  setCondition: (c: Condition) => void;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <Label htmlFor="price" className="text-foreground/80 text-xs">
          {t('price')}
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          className="bg-white"
          placeholder={t('pricePlaceholder')}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="condition" className="text-foreground/80 text-xs">
          {t('condition')}
        </Label>
        <Select
          value={condition}
          onValueChange={(v) => setCondition(v as Condition)}
        >
          <SelectTrigger id="condition" className="bg-white">
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
    </section>
  );
}
