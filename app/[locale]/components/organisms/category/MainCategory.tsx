'use client';

import WelcomeCategory from '@atoms/category/WelcomeCategory';
import SearchCategory from '@atoms/category/SearchCategory';
import CategoryGrid from '@molecules/category/CategoryGrid';
import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { useTranslations } from 'next-intl';

export default function MainCategory() {
  const t = useTranslations('Category');

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
          <SiteHeader title={t('category')} />
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <WelcomeCategory />
              <SearchCategory />
            </div>
            <CategoryGrid />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
