'use client';

import WelcomeDashboard from '@atoms/dashboard/WelcomeDashboard';
// import TabDashboard from '@molecules/dashboard/TabDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import { KPICards } from '@molecules/dashboard/KPICards';
import { ChartTotalSales } from '@molecules/dashboard/ChartTotalSales';
import TopProducts from '@molecules/dashboard/TopProducts';
import CustomerSatisfaction from '@molecules/dashboard/CustomerSatisfaction';
import Reviews from '@molecules/dashboard/Reviews';
import SalesOverview from '@molecules/dashboard/SalesOverview';
import KPICardsSkeleton from '@molecules/dashboard/KPICardsSkeleton';
import ChartTotalSalesSkeleton from '@molecules/dashboard/ChartTotalSalesSkeleton';
import SalesOverviewSkeleton from '@molecules/dashboard/SalesOverviewSkeleton';
import TopProductsSkeleton from '@molecules/dashboard/TopProductsSkeleton';
import EmptyState from '@molecules/shared/EmptyState';
import { useTranslations } from 'next-intl';
import { useDashboard } from '@hooks/domains/dashboard';
import { Plus, ShoppingCart } from 'lucide-react';

export default function MainDashboard() {
  const t = useTranslations('Dashboard');
  const { dashboardData, loading, error } = useDashboard({ skip: false });

  // Check if there's an error (no orders found)
  if (error) {
    return (
      <SidebarLayout title={t('dashboard')}>
        <EmptyState
          icon={ShoppingCart}
          title={t('noOrdersTitle')}
          description={t('noOrdersDescription')}
          buttonText={t('createOrder')}
          buttonIcon={Plus}
          onButtonClick={() => {}}
        />
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout title={t('dashboard')}>
      <WelcomeDashboard />
      {loading ? (
        <>
          <KPICardsSkeleton />
          <div className="px-5">
            <ChartTotalSalesSkeleton />
            <SalesOverviewSkeleton />
            <TopProductsSkeleton />
          </div>
        </>
      ) : (
        <>
          <KPICards summary={dashboardData?.summary} />
          {/* <TabDashboard /> */}
          <div className="px-5">
            {/* Total Sales */}
            <ChartTotalSales
              ordersTimeline={dashboardData?.ordersTimeline ?? []}
              totalRevenue={dashboardData?.summary.totalRevenue ?? 0}
            />

            {/* Sales Overview */}
            <SalesOverview recentOrders={dashboardData?.recentOrders ?? []} />

            {/* Top Products */}
            <TopProducts topProducts={dashboardData?.topProducts ?? []} />

            {/* Customer satisfaction */}
            <CustomerSatisfaction />

            {/* Reviews */}
            <Reviews />
          </div>
        </>
      )}
    </SidebarLayout>
  );
}
