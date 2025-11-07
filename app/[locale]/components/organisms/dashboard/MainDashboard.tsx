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
import { useTranslations } from 'next-intl';
import useDriverTour from '../../hooks/useDriverTour';

export default function MainDashboard() {
  const t = useTranslations('Dashboard');
  // Hook para mostrar el tour (sólo la primera vez)
  useDriverTour();

  return (
    <SidebarLayout title={t('dashboard')}>
      <WelcomeDashboard />
      <KPICards />
      {/* <TabDashboard /> */}
      <div className="px-5">
        {/* Total Sales */}
        <ChartTotalSales />

        {/* Sales Overview */}
        <SalesOverview />

        {/* Top Products */}
        <TopProducts />

        {/* Customer satisfaction */}
        <CustomerSatisfaction />

        {/* Reviews */}
        <Reviews />
      </div>
    </SidebarLayout>
  );
}
