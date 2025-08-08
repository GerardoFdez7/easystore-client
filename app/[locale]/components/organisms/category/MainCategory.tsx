'use client';

import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { SiteHeader } from '@atoms/shared/SiteHeader';
import { useTranslations } from 'next-intl';

import WelcomeCategory from '@atoms/category/WelcomeCategory';
import SearchBar from '@atoms/category/SearchCategory';
import CategoryGrid from '@molecules/category/CategoryGrid';
import CategoryTree from '@molecules/category/CategoryTree';
import { Button } from '@shadcn/ui/button';
import { Plus } from 'lucide-react';

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

          <div className="flex flex-1">
            <div className="flex w-full flex-col gap-6 py-4 md:py-6">
              {/* Contenedor responsive con paddings controlados */}
              <div className="flex w-full flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-8 lg:px-8">
                {/* COLUMNA IZQUIERDA */}
                <section className="w-full lg:min-w-0 lg:flex-1">
                  {/* Título */}
                  <WelcomeCategory />

                  {/* Botón: debajo del título y siempre a la derecha */}
                  <div className="-mt-2 flex justify-end sm:-mt-1">
                    <Button
                      type="button"
                      className="rounded-full bg-black px-4 py-2 text-white hover:bg-black/90"
                      onClick={() => alert(t('addCategory'))}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {t('addCategory')}
                    </Button>
                  </div>

                  {/* Search: 100% de la columna */}
                  <div className="mt-4">
                    <SearchBar />
                  </div>

                  {/* Grid de categorías */}
                  <div className="mt-4">
                    <CategoryGrid />
                  </div>
                </section>

                {/* COLUMNA DERECHA: Árbol (oculto en < lg) */}
                <aside className="hidden w-full shrink-0 lg:block lg:w-72">
                  {/* mt para arrancar donde empieza el search en desktop */}
                  <div className="mt-10">
                    <CategoryTree />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
