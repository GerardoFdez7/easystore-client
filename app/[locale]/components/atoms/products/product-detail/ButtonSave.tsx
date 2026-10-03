import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import { useRouter } from 'next/navigation';

export default function ButtonSave() {
  const router = useRouter();
  const t = useTranslations('Products');
  return (
    <Button
      type="submit"
      className="bg-title hover:bg-title/80"
      onClick={() => router.back()}
    >
      {t('saveChanges')}
    </Button>
  );
}
