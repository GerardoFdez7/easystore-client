import { Button } from '@shadcn/ui/button';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface ButtonAddVariantProps {
  productId: string;
}

export default function ButtonAddVariant({ productId }: ButtonAddVariantProps) {
  const router = useRouter();
  const t = useTranslations('Products');

  const handleClick = () => {
    // If the product is new (not yet saved), navigate to the new variant page without a product ID
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
    <Button type="button" variant="title" size="sm" onClick={handleClick}>
      <Plus className="mr-2 h-4 w-4" />
      {t('addVariant')}
    </Button>
  );
}
