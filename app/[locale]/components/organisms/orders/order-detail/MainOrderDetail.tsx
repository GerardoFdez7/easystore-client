import { MoreHorizontal } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { Separator } from '@shadcn/ui/separator';
import OrderProgress from '@molecules/orders/order-detail/OrderProgress';
import OrderDetailsTable from '@molecules/orders/order-detail/OrderDetailsTable';
import OrderPayments from '@molecules/orders/order-detail/OrderPayments';
import OrderReturns from '@molecules/orders/order-detail/OrderReturns';
import OrderCustomer from '@molecules/orders/order-detail/OrderCustomer';
import OrderShippingAddress from '@molecules/orders/order-detail/OrderShippingAddress';
import OrderBillingAddress from '@molecules/orders/order-detail/OrderBillingAddress';
import OrderCouponsPromotions from '@molecules/orders/order-detail/OrderCouponsPromotions';
import OrderAudit from '@molecules/orders/order-detail/OrderAudit';
import SaveButton from '@atoms/shared/SaveButton';
import { useTranslations } from 'next-intl';

interface MainOrderDetailProps {
  param?: string;
}

export default function MainOrderDetail({ param }: MainOrderDetailProps) {
  const t = useTranslations('Orders');
  return (
    <div className="bg-background min-h-screen">
      <div className="p-4 md:p-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_320px]">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Order Progress Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  <CardTitle className="text-2xl">
                    {t('order')} #{param}
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <OrderProgress />
                <Separator />
                <OrderDetailsTable />
                <Separator />
                <OrderPayments />
                <Separator />
                <OrderReturns />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end">
              <SaveButton type="submit" size="lg" translationKey={'add'} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <OrderCustomer />
            <OrderShippingAddress />
            <OrderBillingAddress />
            <OrderCouponsPromotions />
            <OrderAudit />
          </div>
        </div>
      </div>
    </div>
  );
}
