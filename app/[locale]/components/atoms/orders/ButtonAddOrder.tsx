'use client';

import { Button } from '@shadcn/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function ButtonAddOrder() {
  const router = useRouter();
  const t = useTranslations('Orders');

  const handleClick = () => {
    router.push('/orders/new');
  };

  return (
    <Button
      onClick={handleClick}
      className="mt-4 text-sm sm:text-[16px]"
      variant="title"
    >
      <Plus className="h-4 w-4" />
      {t('createOrder')}
    </Button>
  );
}
