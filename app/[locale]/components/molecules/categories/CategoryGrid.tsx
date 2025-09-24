'use client';

import { useMemo, useState } from 'react';
import CategoryCard from '@molecules/categories/CategoryCard';
import { useRouter, useParams } from 'next/navigation';
import { useCategories } from '@hooks/domains/category/useCategories';
import { useDeleteCategory } from '@hooks/domains/category/useDeleteCategory';
import {
  AlertDialog,
  // AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@shadcn/ui/alert-dialog';
import { useTranslations } from 'next-intl';

type Props = {
  query?: string;
  page?: number;
  limit?: number;
};

const normalize = (s: string) =>
  s
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim() ?? '';

export default function CategoryGrid({
  query = '',
  page = 1,
  limit = 25,
}: Props) {
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;
  const t = useTranslations('Category');

  const { items, loading } = useCategories({
    page,
    limit,
    name: query,
  });

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
    if (!qn) return items;
    return items.filter((c) => normalize(c.name).includes(qn));
  }, [items, qn]);

  const goEdit = (id: string) => {
    router.push(locale ? `/${locale}/categories/${id}` : `/categories/${id}`);
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
              cover={c.cover ?? '/laptop.webp'}
              count={c.count}
              href={
                locale ? `/${locale}/categories/${c.id}` : `/categories/${c.id}`
              }
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
