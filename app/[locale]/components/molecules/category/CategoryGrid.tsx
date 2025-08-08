'use client';

import CategoryCard from '@molecules/category/CategoryCard';

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 8 }).map((_, idx) => (
        <CategoryCard key={idx} />
      ))}
    </div>
  );
}
