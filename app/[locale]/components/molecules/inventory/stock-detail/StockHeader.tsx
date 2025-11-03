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
  colorValue: _colorValue,
}: Props) {
  const t = useTranslations('StockDetail');

  const hasAttrs = attributes && attributes.length > 0;

  return (
    <header className="flex w-full flex-col items-center justify-center space-y-2">
      {/* SKU + Warehouse (what makes stock unique) */}
      <div className="flex w-full flex-col items-center justify-center text-center sm:flex-row sm:items-start sm:justify-between sm:text-start">
        {/* Left column: All product fields */}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          {/* SKU */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl">
              {sku && (
                <>
                  <span className="font-medium">SKU:</span>{' '}
                  <span className="text-muted-foreground">[{sku}]</span>
                </>
              )}
            </h1>
          </div>

          {/* Product attributes */}
          {hasAttrs && (
            <div className="flex flex-wrap gap-2">
              {attributes.map((attr, i) => (
                <Badge
                  key={`${attr.key}-${attr.value}-${i}`}
                  variant="outline"
                  className="text-sm font-light"
                >
                  {attr.key}: {attr.value}
                </Badge>
              ))}
            </div>
          )}

          {/* Product name */}
          {productName && (
            <div className="text-lg">
              <span className="font-medium">
                <span className="font-medium">{t('product')}:</span>{' '}
                <span className="text-muted-foreground font-light">
                  {productName}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Right column: Warehouse */}
        {warehouseName && (
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-xl">
              <span className="font-medium">{t('warehouse')}:</span>{' '}
              <span className="text-muted-foreground capitalize">
                {warehouseName}
              </span>
            </h1>
          </div>
        )}
      </div>
    </header>
  );
}
