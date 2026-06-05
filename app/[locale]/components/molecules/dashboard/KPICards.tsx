import CardStat from '@atoms/dashboard/CardStat';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import type { DashboardSummary } from '@hooks/domains/dashboard';
import { useTranslations } from 'next-intl';

interface KPICardsProps {
  summary?: DashboardSummary;
}

export function KPICards({ summary }: KPICardsProps) {
  const t = useTranslations('Dashboard');
  const currency = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'Q';

  if (!summary) {
    return null;
  }

  // Calculate percentage of completed orders
  const completionRate =
    summary.totalOrders > 0
      ? ((summary.completedOrders / summary.totalOrders) * 100).toFixed(1)
      : '0';

  // Calculate percentage of cancelled orders
  const cancellationRate =
    summary.totalOrders > 0
      ? ((summary.cancelledOrders / summary.totalOrders) * 100).toFixed(1)
      : '0';

  const cancellationRateNum = parseFloat(cancellationRate);

  return (
    <section className="grid grid-cols-1 gap-4 px-5 @2xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <CardStat
        description={t('sales')}
        amount={`${currency}${summary.totalRevenue.toLocaleString()}`}
        trend={`${summary.totalOrders} ${t('ordersLabel')}`}
        icon={<IconTrendingUp className="size-4" />}
        footerText={`${currency}${summary.averageOrderValue.toFixed(2)} ${t('avgOrderValue')}`}
        footerSubtext={`${summary.completedOrders} ${t('completedOrders')}`}
      />
      <CardStat
        description={t('customers')}
        amount={summary.uniqueCustomers.toLocaleString()}
        trend={`${completionRate}% ${t('completion')}`}
        icon={<IconTrendingUp className="size-4" />}
        footerText={`${summary.processingOrders} ${t('processing')}`}
        footerSubtext={`${summary.confirmedOrders} ${t('confirmed')}`}
      />
      <CardStat
        description={t('orders')}
        amount={summary.totalOrders.toLocaleString()}
        trend={`${summary.shippedOrders} ${t('shipped')}`}
        icon={<IconTrendingUp className="size-4" />}
        footerText={`${summary.completedOrders} ${t('completed')}`}
        footerSubtext={`${summary.cancelledOrders} ${t('cancelled')}`}
      />
      <CardStat
        description={t('averageOrderValue')}
        amount={`${currency}${summary.averageOrderValue.toFixed(2)}`}
        trend={
          cancellationRateNum > 5
            ? `-${cancellationRate}%`
            : `+${completionRate}%`
        }
        icon={
          cancellationRateNum > 5 ? (
            <IconTrendingDown className="size-4" />
          ) : (
            <IconTrendingUp className="size-4" />
          )
        }
        footerText={`${completionRate}% ${t('orderCompletionRate')}`}
        footerSubtext={`${summary.completedOrders} ${t('completedOrders')}`}
      />
    </section>
  );
}
