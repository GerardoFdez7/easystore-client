import { Tag, Ticket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';

export default function OrderCouponsPromotions() {
  const t = useTranslations('Orders');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('couponsAndPromotions')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-muted-foreground mb-2 text-sm">
            {t('coupons')}
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3">
            <Tag className="text-secondary h-4 w-4" />
            <span className="text-secondary text-sm font-medium">
              SAVE10 10% off
            </span>
          </div>
        </div>

        <div>
          <div className="text-muted-foreground mb-2 text-sm">
            {t('promotions')}
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-cyan-50 p-3">
            <Ticket className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              Free Shipping Promotion
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
