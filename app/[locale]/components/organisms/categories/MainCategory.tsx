'use client';

import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { SiteHeader } from '@atoms/shared/SiteHeader';
import { useTranslations } from 'next-intl';

import WelcomeCategory from '@atoms/categories/WelcomeCategory';
import SearchBar from '@atoms/shared/Search';
import CategoryGrid from '@molecules/categories/CategoryGrid';
import CategoryTree from '@molecules/categories/CategoryTree';
import { Button } from '@shadcn/ui/button';
import { Plus } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useSearch } from '@hooks/useSearch';

export default function MainCategory() {
  const t = useTranslations('Category');
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;
  const useCategorySearch = () =>
    useSearch((q) => {
      // aquí haces tu fetch / filtro / llamada a onSearch del estado superior
      // e.g. startTransition(() => refetch({ query: q }))
      console.log('search:', q);
    }, 500);

  const goToNew = () => {
    router.push(locale ? `/${locale}/categories/new` : `/categories/new`);
  };

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
          <SiteHeader title={t('welcomeCategory')} />

          <div className="flex flex-1">
            <div className="flex w-full flex-col gap-6 py-4 md:py-6">
              <div className="flex w-full flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-8 lg:px-8">
                <section className="w-full lg:min-w-0 lg:flex-1">
                  <WelcomeCategory />

                  <div className="-mt-2 flex justify-end sm:-mt-1">
                    <Button
                      type="button"
                      className="rounded-full bg-black px-4 py-2 text-white hover:bg-black/90"
                      onClick={goToNew}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {t('addCategory')}
                    </Button>
                  </div>

                  <div className="mt-4">
                    <SearchBar
                      placeholder={t('searchPlaceholder')}
                      useSearch={useCategorySearch}
                    />
                  </div>

                  <div className="mt-4">
                    <CategoryGrid />
                  </div>
                </section>

                <aside className="hidden w-full shrink-0 lg:block lg:w-72">
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
