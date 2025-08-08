'use client';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';

export default function DimensionsRow({ t }: { t: (k: string) => string }) {
  return (
    <section className="space-y-2">
      <h3 className="text-foreground/90 text-sm font-semibold">
        {t('dimension')}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="height" className="text-foreground/80 text-xs">
            {t('height')}
          </Label>
          <Input
            id="height"
            name="height"
            className="bg-white"
            placeholder={t('heightPlaceholder')}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="width" className="text-foreground/80 text-xs">
            {t('width')}
          </Label>
          <Input
            id="width"
            name="width"
            className="bg-white"
            placeholder={t('widthPlaceholder')}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="length" className="text-foreground/80 text-xs">
            {t('length')}
          </Label>
          <Input
            id="length"
            name="length"
            className="bg-white"
            placeholder={t('lengthPlaceholder')}
          />
        </div>
      </div>
    </section>
  );
}
