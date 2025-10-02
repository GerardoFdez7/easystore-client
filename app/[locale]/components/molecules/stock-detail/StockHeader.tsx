'use client';

import { useTranslations } from 'next-intl';

type Props = {
  colorValue: string;
  productName: string;
  warehouseName?: string;
};

export default function StockHeader({
  colorValue,
  productName,
  warehouseName,
}: Props) {
  const t = useTranslations('StockDetail');

  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight">
        {t('color')}: <span className="text-foreground">{colorValue}</span>
      </h2>
      <div className="text-muted-foreground text-sm">{productName}</div>
      {!!warehouseName && (
        <div className="text-muted-foreground text-sm">
          {t('warehouse')}:{' '}
          <span className="text-foreground">{warehouseName}</span>
        </div>
      )}
    </div>
  );
}
