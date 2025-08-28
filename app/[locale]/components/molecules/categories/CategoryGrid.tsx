'use client';

import { useEffect, useState } from 'react';
import CategoryCard from '@molecules/categories/CategoryCard';
import { getCategoryList, type CategorySummary } from '@lib/data/categories';
import { useRouter, useParams } from 'next/navigation';

export default function CategoryGrid() {
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

  const goEdit = (id: string) => {
    router.push(locale ? `/${locale}/categories/${id}` : `/categories/${id}`);
  };

  return (
    <div className="grid w-full [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))] gap-4">
      {items.map((c) => (
        <CategoryCard
          key={c.id}
          name={c.name}
          imageUrl={c.imageUrl}
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
