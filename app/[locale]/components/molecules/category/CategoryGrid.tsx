'use client';

import CategoryCard from '@molecules/category/CategoryCard';

const MOCK = [
  { name: 'Tecnología', imageUrl: '/laptop.webp', count: 10 },
  { name: 'Computers', imageUrl: '/laptop.webp', count: 7 },
  { name: 'Gaming', imageUrl: '/laptop.webp', count: 4 },
  { name: 'School', imageUrl: '/laptop.webp', count: 6 },
  { name: 'Home & Garden', imageUrl: '/laptop.webp', count: 12 },
  { name: 'Mobile', imageUrl: '/laptop.webp', count: 9 },
  { name: 'Fashion', imageUrl: '/laptop.webp', count: 15 },
  { name: 'Books & Media', imageUrl: '/laptop.webp', count: 3 },
];

export default function CategoryGrid() {
  return (
    <div className="grid w-full [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))] gap-4">
      {MOCK.map((c) => (
        <CategoryCard key={c.name} {...c} />
      ))}
    </div>
  );
}
