'use client';

import { useEffect, useMemo, useState } from 'react';
import CategoryCard from '@molecules/categories/CategoryCard';
import { getCategoryList, type CategorySummary } from '@lib/data/categories';
import { useRouter, useParams } from 'next/navigation';

type Props = {
  query?: string;
};

const normalize = (s: string) =>
  s
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim() ?? '';

export default function CategoryGrid({ query = '' }: Props) {
  const [items, setItems] = useState<CategorySummary[]>([]);
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;

  useEffect(() => {
    let mounted = true;

    void (async () => {
      try {
        const data = await getCategoryList();
        if (mounted) setItems(data);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

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
      {filtered.map((c) => (
        <CategoryCard
          key={c.id}
          name={c.name}
          imageUrl={c.cover}
          count={c.count}
          href={
            locale ? `/${locale}/categories/${c.id}` : `/categories/${c.id}`
          }
          onEdit={() => goEdit(c.id)}
        />
      ))}
    </div>
  );
}
