import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';

export default function OrderBillingAddress() {
  const t = useTranslations('Orders');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('billingAddress')}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        {t('sameAsShipping')}
      </CardContent>
    </Card>
  );
}
