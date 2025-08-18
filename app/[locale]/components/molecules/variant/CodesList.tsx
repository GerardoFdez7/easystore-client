'use client';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';

const fields = ['sku', 'barcode', 'upc', 'ean', 'isbn'] as const;

export default function CodesList({ t }: { t: (k: string) => string }) {
  return (
    <section className="space-y-3">
      <h3 className="text-foreground/90 text-sm font-semibold">{t('codes')}</h3>

      <div className="space-y-3">
        {fields.map((f) => (
          <div key={f} className="space-y-1.5">
            <Label htmlFor={f} className="text-foreground/80 text-xs">
              {t(f)}
            </Label>
            <Input
              id={f}
              name={f}
              className="h-9 w-full bg-white text-sm"
              placeholder={t(`${f}Placeholder`)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
