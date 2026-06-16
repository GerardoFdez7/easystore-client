import { useTranslations } from 'next-intl';

export default function OrderReturns() {
  const t = useTranslations('Orders');
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold">{t('returns')}</h3>
      <div className="text-muted-foreground rounded-lg border p-8 text-center">
        {t('noReturns')}
      </div>
    </div>
  );
}
