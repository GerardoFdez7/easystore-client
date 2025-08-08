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

          {/* Contenido */}
          <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* Título de la vista de detalle */}
            <div className="px-5">
              <WelcomeDetailCategory />
            </div>

            {/* Formulario de detalle */}
            <DetailCategory id={id} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
