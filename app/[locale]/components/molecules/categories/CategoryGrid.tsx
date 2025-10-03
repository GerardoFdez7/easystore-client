'use client';

import { useMemo, useState } from 'react';
import CategoryCard from '@molecules/categories/CategoryCard';
import { useRouter, useParams } from 'next/navigation';
import { useDeleteCategory } from '@hooks/domains/category';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@shadcn/ui/alert-dialog';
import { useTranslations } from 'next-intl';
import { CategorySummary } from '@hooks/domains/category/useCategories';

type Props = {
  categories: CategorySummary[];
  loading: boolean;
  query?: string;
  parentPath?: string; // For nested navigation like "electronics/computers"
  limit?: number;
};

const normalize = (s: string) =>
  s
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim() ?? '';

export default function CategoryGrid({
  categories,
  loading,
  query = '',
  parentPath = '',
  limit = 25,
}: Props) {
  const router = useRouter();
  const params = useParams<{ locale?: string; path?: string[] }>();
  const locale = params?.locale;
  const t = useTranslations('Category');

  const { remove, loading: deleting } = useDeleteCategory();

  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  const askDelete = (id: string) => {
    setTargetId(id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!targetId) return;
    await remove(targetId);
    setOpen(false);
    setTargetId(null);
  };

  const qn = normalize(query);
  const filtered = useMemo(() => {
    if (!qn) return categories;
    return categories.filter((c) => normalize(c.name).includes(qn));
  }, [categories, qn]);

  const goEdit = (id: string) => {
    router.push(locale ? `/${locale}/categories/${id}` : `/categories/${id}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    const newPath = parentPath ? `${parentPath}/${categorySlug}` : categorySlug;

    const href = locale
      ? `/${locale}/categories/${newPath}`
      : `/categories/${newPath}`;

    router.push(href);
  };

  return (
    <div className="grid w-full [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] gap-4">
      {loading && filtered.length === 0
        ? Array.from({ length: limit }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="bg-muted h-32 w-full animate-pulse rounded-md"
            />
          ))
        : filtered.map((c) => (
            <CategoryCard
              key={c.id}
              name={c.name}
              cover={c.cover}
              count={c.count}
              href="#"
              onClick={() => handleCategoryClick(c.name)}
              onEdit={() => goEdit(c.id)}
              onDelete={() => askDelete(c.id)}
            />
          ))}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void confirmDelete()}
              disabled={deleting}
              className="text-accent bg-title hover:bg-accent-foreground"
            >
              {deleting ? t('deleting') : t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
