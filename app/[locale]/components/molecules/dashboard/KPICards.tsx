import CardStat from '@atoms/dashboard/CardStat';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export function KPICards() {
  const t = useTranslations('Dashboard');
  return (
    <section className="grid grid-cols-1 gap-4 px-5 @2xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <CardStat
        description={t('kpiTotalRevenue')}
        amount="$1,250.00"
        trend="+12.5%"
        icon={<IconTrendingUp className="size-4" />}
        footerText={t('kpiTotalRevenueFooter')}
        footerSubtext={t('kpiTotalRevenueSub')}
      />
      <CardStat
        description={t('kpiNewCustomers')}
        amount="1,234"
        trend="-20%"
        icon={<IconTrendingDown className="size-4" />}
        footerText={t('kpiNewCustomersFooter')}
        footerSubtext={t('kpiNewCustomersSub')}
      />
      <CardStat
        description={t('kpiActiveAccounts')}
        amount="45,678"
        trend="+12.5%"
        icon={<IconTrendingUp className="size-4" />}
        footerText={t('kpiActiveAccountsFooter')}
        footerSubtext={t('kpiActiveAccountsSub')}
      />
      <CardStat
        description={t('kpiGrowthRate')}
        amount="4.5%"
        trend="+4.5%"
        icon={<IconTrendingUp className="size-4" />}
        footerText={t('kpiGrowthRateFooter')}
        footerSubtext={t('kpiGrowthRateSub')}
      />
    </section>
  );
}
