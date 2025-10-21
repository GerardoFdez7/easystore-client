import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useProductCreation } from '@contexts/ProductCreationContext';
import { Plus } from 'lucide-react';

export default function ButtonAddProduct() {
  const t = useTranslations('Products');
  const router = useRouter();
  const { clearAllDrafts } = useProductCreation();

  const handleAddProduct = () => {
    clearAllDrafts();
    router.push('/products/new');
  };

  return (
    <Button
      className="mt-4 text-sm sm:text-[16px]"
      variant="title"
      onClick={handleAddProduct}
    >
      <Plus className="h-4 w-4" />
      {t('addProduct')}
    </Button>
  );
}
