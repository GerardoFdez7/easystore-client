import { MoreHorizontal } from 'lucide-react';
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

interface MainOrderDetailProps {
  param?: string;
}

export default function MainOrderDetail({ param }: MainOrderDetailProps) {
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
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <CardTitle className="text-2xl">Order #{param}</CardTitle>
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
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
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
