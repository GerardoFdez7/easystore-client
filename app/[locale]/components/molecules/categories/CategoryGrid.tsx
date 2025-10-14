'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDeleteCategory, CategorySummary } from '@hooks/domains/category';
import { nameToSlug } from '@lib/utils/path-utils';
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
import CategoryCard from '@molecules/categories/CategoryCard';
import CategoryCardSkeleton from '@molecules/categories/CategoryCardSkeleton';

interface CategoryGridProps {
  categories: CategorySummary[];
  loading: boolean;
  isLoadingMore?: boolean;
  query?: string;
  parentPath?: string; // For nested navigation
  limit?: number;
  hideCount?: boolean;
}

const normalize = (s: string) =>
  s
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim() ?? '';

export default function CategoryGrid({
  categories,
  loading,
  isLoadingMore = false,
  query = '',
  parentPath = '',
  limit = 25,
  hideCount = false,
}: CategoryGridProps) {
  const router = useRouter();
  const t = useTranslations('Category');

  const { remove, loading: deleting } = useDeleteCategory();

  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  const askDelete = useCallback((id: string) => {
    setTargetId(id);
    setOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!targetId) return;

    try {
      await remove(targetId);
    } finally {
      setOpen(false);
      setTargetId(null);
    }
  }, [targetId, remove]);

  const handleDialogClose = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTargetId(null);
    }
  }, []);

  const qn = normalize(query);
  const filtered = useMemo(() => {
    if (!qn) return categories;
    return categories.filter((c) => normalize(c.name).includes(qn));
  }, [categories, qn]);

  const goEdit = useCallback(
    (id: string) => {
      const categorySlug = nameToSlug(
        categories.find((c) => c.id === id)?.name || '',
      );
      const newPath = parentPath
        ? `${parentPath}/${categorySlug}`
        : categorySlug;
      router.push(`/categories/${newPath}?edit=true`);
    },
    [router, categories, parentPath],
  );

  const handleCategoryClick = useCallback(
    (categoryName: string) => {
      const categorySlug = nameToSlug(categoryName);
      const newPath = parentPath
        ? `${parentPath}/${categorySlug}`
        : categorySlug;
      const href = `/categories/${newPath}`;
      router.push(href);
    },
    [parentPath, router],
  );

  const getCategoryHref = useCallback(
    (categoryName: string) => {
      const categorySlug = nameToSlug(categoryName);
      const newPath = parentPath
        ? `${parentPath}/${categorySlug}`
        : categorySlug;
      return `/categories/${newPath}`;
    },
    [parentPath],
  );

  const skeletonItems = useMemo(
    () =>
      Array.from({ length: limit }, (_, i) => (
        <CategoryCardSkeleton key={`skeleton-${Date.now()}-${i}`} />
      )),
    [limit],
  );

  return (
    <>
      <section
        className="3xl:grid-cols-6 grid w-full grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        role="grid"
        aria-label="categories Grid"
        aria-busy={loading || isLoadingMore}
      >
        {loading && !isLoadingMore ? (
          skeletonItems
        ) : (
          <>
            {filtered.map((category, index) => (
              <CategoryCard
                key={`${category.id}-${index}`}
                name={category.name}
                cover={category.cover}
                count={category.count}
                href={getCategoryHref(category.name)}
                onClick={() => handleCategoryClick(category.name)}
                onEdit={() => goEdit(category.id)}
                onDelete={() => askDelete(category.id)}
                hideCount={hideCount}
              />
            ))}
            {isLoadingMore && skeletonItems}
          </>
        )}
      </section>

      <AlertDialog open={open} onOpenChange={handleDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} aria-label="cancel Delete">
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void confirmDelete()}
              disabled={deleting}
              className="bg-error hover:bg-error/90 text-white"
              aria-label={deleting ? 'deleting Category' : 'confirm Delete'}
            >
              {deleting ? t('deleting') : t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
