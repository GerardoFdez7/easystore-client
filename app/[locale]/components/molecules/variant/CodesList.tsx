'use client';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';

const fields = ['sku', 'barcode', 'upc', 'ean', 'isbn'] as const;

export default function CodesList({ t }: { t: (k: string) => string }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {fields.map((f) => (
        <div key={f} className="space-y-1.5">
          <Label htmlFor={f} className="text-foreground/80 text-xs">
            {t(f)}
          </Label>
          <Input
            id={f}
            name={f}
            className="bg-white"
            placeholder={t(`${f}Placeholder`)}
          />
        </div>
      ))}
    </section>
  );
}
