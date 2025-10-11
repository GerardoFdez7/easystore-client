import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function ButtonAddProduct() {
  const t = useTranslations('Products');
  const router = useRouter();

  return (
    <Button
      className="text-title hover:bg-title border-title border-2 bg-transparent hover:text-white dark:hover:bg-white dark:hover:text-black"
      onClick={() => router.push('/products/new')}
    >
      {t('addProduct')}
    </Button>
  );
}
