import { ProductCard } from '@atoms/products/ProductCard';
import { Product } from '@lib/consts/products';
import { useTranslations } from 'next-intl';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const t = useTranslations('Products');

  if (products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground text-sm sm:text-lg">
          {t('noProductsFound')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
