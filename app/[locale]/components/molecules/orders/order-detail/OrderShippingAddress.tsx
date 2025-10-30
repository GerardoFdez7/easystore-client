import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';

export default function OrderShippingAddress() {
  const t = useTranslations('Orders');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('shippingAddress')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <div className="font-medium">Sophia Clark</div>
        <div className="text-muted-foreground">123 Maple Street</div>
        <div className="text-muted-foreground">Anytown, CA 91234</div>
        <div className="text-muted-foreground">United States</div>
      </CardContent>
    </Card>
  );
}
