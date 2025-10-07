import { CategorySummary } from '@hooks/domains/category/useCategories';

export const mockCategories: CategorySummary[] = [
  {
    id: '1',
    name: 'Electronics',
    cover: '/laptop.webp',
    count: 25,
  },
  {
    id: '2',
    name: 'Clothing',
    cover: '/portrait_image.webp',
    count: 18,
  },
  {
    id: '3',
    name: 'Home & Garden',
    cover: '/default.webp',
    count: 12,
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    cover: '/phone.webp',
    count: 8,
  },
  {
    id: '5',
    name: 'Books & Media',
    cover: '/laptop.webp',
    count: 15,
  },
  {
    id: '6',
    name: 'Automotive',
    cover: '/default.webp',
    count: 6,
  },
];

export const mockEmptyCategories: CategorySummary[] = [];
