import { Checkbox } from '@shadcn/ui/checkbox';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  status: string;
  inventory: number;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

export function ProductCard({
  product,
  isSelected,
  onSelect,
}: ProductCardProps) {
  return (
    <div className="bg-card overflow-hidden rounded-lg border transition-shadow hover:shadow-md">
      <div className="relative">
        <div className="h-48 w-full overflow-hidden">
          <Image
            src={product.image || '/default.webp'}
            alt={product.name}
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute top-3 left-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            className="bg-white backdrop-blur-sm"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-title mb-3 text-[16px] font-medium">
          {product.name}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-foreground text-sm">Status:</span>
            <span className="text-foreground text-sm font-medium">
              {product.status}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground text-sm">Inventory:</span>
            <span className="text-foreground text-sm font-medium">
              {product.inventory}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground text-sm">Category:</span>
            <span className="text-foreground text-sm">{product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
