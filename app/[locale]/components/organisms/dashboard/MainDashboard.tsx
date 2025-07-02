'use client';

import WelcomeDashboard from '@atoms/dashboard/WelcomeDashboard';
import TabDashboard from '@molecules/dashboard/TabDashboard';
import { SiteHeader } from '@atoms/shared/SiteHeader';

import {
  SidebarInset,
  SidebarProvider,
} from 'app/[locale]/components/shadcn/ui/sidebar';

import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { KPICards } from '@molecules/dashboard/KPICards';
import { ChartTotalSales } from '@molecules/dashboard/ChartTotalSales';
import TopProducts from '@molecules/dashboard/TopProducts';
import CustomerSatisfaction from '@molecules/dashboard/CustomerSatisfaction';
import Reviews from '@molecules/dashboard/Reviews';
import SalesOverview from '@molecules/dashboard/SalesOverview';
import { useTranslations } from 'next-intl';

export default function MainDashboard() {
  const t = useTranslations('Dashboard');

  return (
    <main className="pt-22 2xl:m-5">
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <SiderbarDashboard />
        <SidebarInset>
          <SiteHeader title={t('dashboard')} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <WelcomeDashboard />
                <KPICards />
                <TabDashboard />
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
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
