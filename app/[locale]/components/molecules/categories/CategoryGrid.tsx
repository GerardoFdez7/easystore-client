'use client';

import { useMemo } from 'react';
import CategoryCard from '@molecules/categories/CategoryCard';
import { useRouter, useParams } from 'next/navigation';
import { useCategories } from '@hooks/domains/category/useCategories';

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

  const { items, loading } = useCategories({
    page,
    limit,
    name: query,
  });

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
              key={c.name}
              name={c.name}
              cover={c.cover ?? '/laptop.webp'}
              count={c.count}
              href={
                locale
                  ? `/${locale}/categories/${c.name}`
                  : `/categories/${c.name}`
              }
              onEdit={() => goEdit(c.name)}
            />
          ))}
    </div>
  );
}
