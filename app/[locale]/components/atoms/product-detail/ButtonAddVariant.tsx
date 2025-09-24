import { Button } from '@shadcn/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ButtonAddVariantProps {
  productId: string;
}

export default function ButtonAddVariant({ productId }: ButtonAddVariantProps) {
  const router = useRouter();

  const handleClick = () => {
    // Si productId es 'new' o la URL contiene '/products/new', ir a la ruta especial
    if (
      productId === 'new' ||
      window.location.pathname.includes('/products/new')
    ) {
      router.push('/products/new/variant/add');
    } else {
      router.push(`/products/${productId}/variant/add`);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="border-title text-title hover:bg-title hover:text-white dark:hover:bg-white dark:hover:text-black"
      onClick={handleClick}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add variant
    </Button>
  );
}
