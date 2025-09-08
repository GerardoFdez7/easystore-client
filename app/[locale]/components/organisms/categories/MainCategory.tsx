'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { useState } from 'react';

import SearchBar from '@atoms/shared/Search';
import CategoryGrid from '@molecules/categories/CategoryGrid';
import CategoryTree from '@molecules/categories/CategoryTree';
import { useSearch } from '@hooks/useSearch';

const withLocale = (locale: string | undefined, path: string) =>
  locale ? `/${locale}${path}` : path;

export default function MainCategory() {
  const [q, setQ] = useState('');
  const t = useTranslations('Category');
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;
  const newHref = withLocale(locale, '/categories/new');

  const useCategorySearch = () => useSearch((text) => setQ(text), 500);

  return (
    <main className="2xl:m-5">
      <section className="mx-auto grid w-full max-w-screen-2xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_18rem] lg:px-8">
        <div className="flex flex-col gap-4">
          <Button
            asChild
            className="text-accent bg-title hover:bg-accent-foreground self-end rounded-full"
          >
            <Link href={newHref}>
              <Plus className="mr-2 h-4 w-4" />
              {t('addCategory')}
            </Link>
          </Button>
          <SearchBar
            placeholder={t('searchPlaceholder')}
            useSearch={useCategorySearch}
          />
          <CategoryGrid query={q} />
        </div>

        <aside className="hidden lg:block">
          <CategoryTree />
        </aside>
      </section>
    </main>
  );
}
