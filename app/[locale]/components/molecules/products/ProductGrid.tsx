import { ProductCard } from '@atoms/products/ProductCard';

interface MediaItem {
  id: string;
  url: string;
  position: number;
  mediaType: 'IMAGE' | 'VIDEO';
}

interface Product {
  id: string;
  name: string;
  status: string;
  inventory: number;
  category: string;
  cover: string;
  media?: MediaItem[];
}

interface ProductGridProps {
  products: Product[];
  selectedProducts?: string[];
  onSelectProduct?: (productId: string, checked: boolean) => void;
}

export function ProductGrid({
  products,
  selectedProducts,
  onSelectProduct,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedProducts?.includes(product.id)}
          onSelect={(checked) => onSelectProduct?.(product.id, checked)}
        />
      ))}
    </div>
  );
}
