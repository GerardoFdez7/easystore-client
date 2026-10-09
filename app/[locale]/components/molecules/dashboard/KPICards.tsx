import { useTranslations } from 'next-intl';
import CardStat from '@atoms/dashboard/CardStat';
import type { DashboardSummary } from '@hooks/domains/dashboard';
import { formatMoney } from '@lib/utils/money';

interface KPICardsProps {
  summary?: DashboardSummary;
  locale: string;
}

export function KPICards({ summary, locale }: KPICardsProps) {
  const t = useTranslations('Dashboard');

  if (!summary) return null;

  const formatCount = (value: number) =>
    new Intl.NumberFormat(locale).format(value);

  return (
    <section
      aria-label={t('keyMetrics')}
      className="gap-card grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
    >
      <CardStat
        description={t('sales')}
        amount={formatMoney(summary.totalRevenue, locale)}
        footerText={`${formatCount(summary.totalOrders)} ${t('ordersLabel')}`}
      />
      <CardStat
        description={t('customers')}
        amount={formatCount(summary.uniqueCustomers)}
        footerText={`${formatCount(summary.completedOrders)} ${t('completedOrders')}`}
      />
      <CardStat
        description={t('orders')}
        amount={formatCount(summary.totalOrders)}
        footerText={`${formatCount(summary.processingOrders)} ${t('processing')}`}
        footerSubtext={`${formatCount(summary.cancelledOrders)} ${t('cancelled')}`}
      />
      <CardStat
        description={t('averageOrderValue')}
        amount={formatMoney(summary.averageOrderValue, locale)}
        footerText={`${formatCount(summary.completedOrders)} ${t('completedOrders')}`}
      />
    </section>
  );
}
