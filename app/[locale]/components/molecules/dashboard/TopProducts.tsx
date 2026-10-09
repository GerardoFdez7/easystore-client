'use client';

import { useState } from 'react';
import { Card, CardContent } from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';
import type { TopProduct } from '@hooks/domains/dashboard';
import { formatMoney } from '@lib/utils/money';
import Image from 'next/image';

interface TopProductsProps {
  topProducts: TopProduct[];
  locale: string;
}

function ProductCover({ src, name }: { src: string | null; name: string }) {
  const t = useTranslations('Dashboard');
  const [failed, setFailed] = useState(false);

  return (
    <div className="bg-muted mb-3 flex h-32 w-40 max-w-full items-center justify-center overflow-hidden rounded-lg">
      {src && !failed ? (
        <Image
          src={src}
          alt=""
          width={160}
          height={128}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="text-muted-foreground px-2 text-center text-xs"
          role="img"
          aria-label={`${name}: ${t('noImage')}`}
        >
          {t('noImage')}
        </span>
      )}
    </div>
  );
}

export default function TopProducts({ topProducts, locale }: TopProductsProps) {
  const t = useTranslations('Dashboard');

  return (
    <section aria-labelledby="top-products-heading">
      <h2
        id="top-products-heading"
        className="text-title mb-4 text-xl font-semibold"
      >
        {t('topProducts')}
      </h2>
      <Card>
        <CardContent>
          {topProducts.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <span className="text-muted-foreground">
                {t('noTopProductsFound')}
              </span>
            </div>
          ) : (
            <div className="gap-card grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
              {topProducts.map((product) => (
                <div
                  key={product.variantId}
                  className="flex min-w-0 flex-col items-center text-center"
                >
                  <ProductCover
                    key={
                      product.variantCover ??
                      product.productCover ??
                      product.variantId
                    }
                    src={product.variantCover ?? product.productCover ?? null}
                    name={product.productName}
                  />
                  <h3 className="text-title mb-1 max-w-full text-sm font-medium wrap-break-word">
                    {product.productName}
                  </h3>
                  <p className="text-secondary mb-1 text-sm font-medium tabular-nums">
                    {formatMoney(product.variantPrice, locale)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {new Intl.NumberFormat(locale).format(
                      product.totalQuantitySold,
                    )}{' '}
                    {t('sold')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
