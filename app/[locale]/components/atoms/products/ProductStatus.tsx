import { Badge } from '@shadcn/ui/badge';
import { Product } from '@lib/consts/products';
import { useTranslations } from 'next-intl';

export default function ProductStatus({ product }: { product: Product }) {
  const t = useTranslations('Products');
  return (
    <Badge
      variant="outline"
      className={`${
        product.isArchived
          ? 'border-blue-200 bg-blue-500/10 text-blue-600 dark:border-blue-800 dark:text-blue-300'
          : 'border-green-200 bg-green-500/10 text-green-600 dark:border-green-800 dark:text-green-300'
      }`}
    >
      {product.isArchived ? t('archived') : t('active')}
    </Badge>
  );
}
