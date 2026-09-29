import { Badge } from '@shadcn/ui/badge';
import { Product } from '@graphql/generated';
import { useTranslations } from 'next-intl';

export default function ProductStatus({ product }: { product: Product }) {
  const t = useTranslations('Products');
  return (
    <Badge
      variant="outline"
      className={`${
        product.isArchived
          ? 'border-border bg-muted text-muted-foreground dark:border-border dark:text-muted-foreground'
          : 'border-border bg-secondary/10 text-secondary dark:border-border dark:text-secondary'
      }`}
    >
      {product.isArchived ? t('archivedSingle') : t('active')}
    </Badge>
  );
}
