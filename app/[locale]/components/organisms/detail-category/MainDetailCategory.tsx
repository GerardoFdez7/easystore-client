'use client';

import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { SiteHeader } from '@atoms/shared/SiteHeader';
import DetailCategory from '@organisms/detail-category/CategoryDetail';
import WelcomeDetailCategory from '@atoms/detail-category/WelcomeDetailCategory';
import { useTranslations } from 'next-intl';

export default function MainDetailCategory({ id }: { id: string }) {
  const t = useTranslations('CategoryDetail');
  const isNew = id === 'new';

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
          <SiteHeader title={isNew ? t('addCategory') : t('editCategory')} />

          <div className="flex w-full flex-1 flex-col gap-6 py-4 md:py-6">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              {/* Título */}
              <div className="mb-2">
                <WelcomeDetailCategory />
              </div>

              {/* Form + listado */}
              <div className="mx-auto w-full max-w-7xl">
                <DetailCategory id={id} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
