'use client';

import WelcomeDashboard from '@atoms/dashboard/WelcomeDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import { KPICards } from '@molecules/dashboard/KPICards';
import { ChartTotalSales } from '@molecules/dashboard/ChartTotalSales';
import TopProducts from '@molecules/dashboard/TopProducts';
import SalesOverview from '@molecules/dashboard/SalesOverview';
import KPICardsSkeleton from '@molecules/dashboard/KPICardsSkeleton';
import ChartTotalSalesSkeleton from '@molecules/dashboard/ChartTotalSalesSkeleton';
import SalesOverviewSkeleton from '@molecules/dashboard/SalesOverviewSkeleton';
import TopProductsSkeleton from '@molecules/dashboard/TopProductsSkeleton';
import EmptyState from '@molecules/shared/EmptyState';
import { useLocale, useTranslations } from 'next-intl';
import { useDashboard } from '@hooks/domains/dashboard';
import { CircleAlert, RotateCcw, ShoppingCart } from 'lucide-react';

export default function MainDashboard() {
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  const { dashboardData, loading, error, invalidData, refetch } =
    useDashboard();

  return (
    <SidebarLayout title={t('dashboard')}>
      <WelcomeDashboard />
      {loading && !dashboardData ? (
        <div className="px-page gap-section flex flex-col">
          <KPICardsSkeleton />
          <div className="gap-section flex flex-col">
            <ChartTotalSalesSkeleton />
            <SalesOverviewSkeleton />
            <TopProductsSkeleton />
          </div>
        </div>
      ) : error || invalidData || !dashboardData ? (
        <EmptyState
          icon={CircleAlert}
          title={t('loadErrorTitle')}
          description={t('loadErrorDescription')}
          buttonText={t('retry')}
          buttonIcon={RotateCcw}
          onButtonClick={() => void refetch()}
        />
      ) : dashboardData.summary.totalOrders === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title={t('noOrdersTitle')}
          description={t('noOrdersDescription')}
        />
      ) : (
        <div className="px-page gap-section flex flex-col">
          <KPICards summary={dashboardData.summary} locale={locale} />
          <div className="gap-section flex flex-col">
            <ChartTotalSales
              ordersTimeline={dashboardData.ordersTimeline}
              totalRevenue={dashboardData.summary.totalRevenue}
              locale={locale}
            />
            <SalesOverview
              recentOrders={dashboardData.recentOrders}
              locale={locale}
            />
            <TopProducts
              topProducts={dashboardData.topProducts}
              locale={locale}
            />
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}
