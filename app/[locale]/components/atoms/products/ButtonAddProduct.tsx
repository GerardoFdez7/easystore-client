import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';

export default function ButtonAddProduct() {
  const t = useTranslations('Products');

  return (
    <Button className="text-title hover:bg-title border-title border-2 bg-transparent hover:text-white dark:hover:bg-white dark:hover:text-black">
      {t('addProduct')}
    </Button>
  );
}
