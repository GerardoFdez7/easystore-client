import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';

export default function ButtonAddProduct() {
  const t = useTranslations('Products');

  return (
    <Button className="hover:bg-foreground rounded-xl bg-black px-6 text-white dark:hover:bg-[#423f3d]">
      {t('addProduct')}
    </Button>
  );
}
