import { ProductCard } from '@atoms/products/ProductCard';
import ProductCardSkeleton from '@atoms/products/ProductCardSkeleton';
import { Product } from '@graphql/generated';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  isLoadingMore?: boolean;
  limit?: number;
}

export function ProductGrid({
  products,
  loading = false,
  isLoadingMore = false,
  limit = 25,
}: ProductGridProps) {
  const skeletonItems = Array.from({ length: limit }, (_, i) => (
    <ProductCardSkeleton key={`skeleton-${Date.now()}-${i}`} />
  ));

  if (loading && !isLoadingMore) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {skeletonItems}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {isLoadingMore && skeletonItems}
    </div>
  );
}
