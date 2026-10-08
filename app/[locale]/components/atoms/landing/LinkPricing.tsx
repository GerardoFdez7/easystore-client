import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@shadcn/ui/button';

export default function LinkPricing() {
  const t = useTranslations('Landing');
  return (
    <Button
      asChild
      variant="ghost"
      size="auto"
      className="text-title text-2xl font-medium"
    >
      <Link href="#plans">{t('pricing')}</Link>
    </Button>
  );
}
