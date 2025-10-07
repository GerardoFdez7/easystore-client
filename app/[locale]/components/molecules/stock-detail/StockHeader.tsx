'use client';

import { Badge } from '@shadcn/ui/badge';
import { useTranslations } from 'next-intl';

type VariantAttribute = { key: string; value: string };

type Props = {
  productName?: string;
  sku?: string;
  attributes?: VariantAttribute[];
  warehouseName?: string;

  colorValue?: string;
};

export default function StockHeader({
  productName,
  sku,
  attributes = [],
  warehouseName,
  colorValue,
}: Props) {
  const t = useTranslations('StockDetail');

  const hasAttrs = attributes && attributes.length > 0;
  const attrsLine = hasAttrs
    ? attributes.map((a) => `${a.key}: ${a.value}`).join(' · ')
    : '';
  const skuLine = (sku ?? '').trim();
  const fallbackLine = (colorValue ?? '').trim();
  const variantLine = attrsLine || skuLine || fallbackLine;

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">
        {productName ? (
          <span className="block">
            <span className="text-foreground">{productName}</span>
            {sku && (
              <span className="text-muted-foreground ml-2 text-sm">
                [{sku}]
              </span>
            )}
          </span>
        ) : (
          <span className="text-foreground">{variantLine}</span>
        )}
      </h2>

      {hasAttrs && (
        <div className="flex flex-wrap gap-2">
          {attributes.map((attr, i) => (
            <Badge key={`${attr.key}-${attr.value}-${i}`} variant="outline">
              {attr.key}: {attr.value}
            </Badge>
          ))}
        </div>
      )}

      <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        {warehouseName && (
          <span>
            <span className="font-medium">{t('warehouse')}:</span>{' '}
            <span className="text-foreground text-transform: capitalize">
              {warehouseName}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
