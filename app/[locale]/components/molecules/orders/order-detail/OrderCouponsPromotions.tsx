import Coupon from '@atoms/orders/order-detail/Coupon';
import Promotion from '@atoms/orders/order-detail/Promotion';
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
        <div className="space-y-2">
          <span className="text-muted-foreground text-sm">{t('coupons')}</span>
          <Coupon code="SAVE10" description="10% off" />
          <Coupon code="SAVE20" description="20% off" />
        </div>

        <div className="space-y-2">
          <span className="text-muted-foreground text-sm">
            {t('promotions')}
          </span>
          <Promotion title="Free Shipping Promotion" />
          <Promotion title="Buy One Get One Free" />
        </div>
      </CardContent>
    </Card>
  );
}
