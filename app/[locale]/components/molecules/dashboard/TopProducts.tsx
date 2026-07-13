import { Card, CardContent, CardHeader } from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';
import type { TopProduct } from '@hooks/domains/dashboard';
import Image from 'next/image';

interface TopProductsProps {
  topProducts: TopProduct[];
}

export default function TopProducts({ topProducts }: TopProductsProps) {
  const t = useTranslations('Dashboard');
  const currency = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'Q';

  return (
    <section className="py-10">
      <h1 className="text-title mb-4 text-2xl font-bold">{t('topProducts')}</h1>
      <Card className="mb-8">
        <CardHeader></CardHeader>
        <CardContent>
          {topProducts.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <span className="text-muted-foreground">
                {t('noTopProductsFound')}
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4 @min-7xl:grid-cols-5">
              {topProducts.map((product) => (
                <div
                  key={product.variantId}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-muted mb-2 flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg">
                    {(product.variantCover ?? product.productCover) ? (
                      <Image
                        src={product.variantCover ?? product.productCover ?? ''}
                        alt={product.productName}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        {t('noImage')}
                      </span>
                    )}
                  </div>
                  <h4 className="text-foreground mb-1 text-xs font-medium">
                    {product.productName}
                  </h4>
                  <p className="text-secondary mb-1 text-xs font-medium">
                    {currency}
                    {product.variantPrice.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {product.totalQuantitySold} {t('sold')}
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
