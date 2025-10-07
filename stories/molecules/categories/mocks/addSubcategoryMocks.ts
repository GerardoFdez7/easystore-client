import { CategoryItem } from '@molecules/categories/detail/AddSubcategory';

export const mockCatalogItems: CategoryItem[] = [
  {
    id: '1',
    name: 'Electronics',
    cover: '/laptop.webp',
    count: 25,
    status: 'active',
  },
  {
    id: '2',
    name: 'Clothing & Fashion',
    cover: '/portrait_image.webp',
    count: 18,
    status: 'active',
  },
  {
    id: '3',
    name: 'Home & Garden',
    cover: '/default.webp',
    count: 12,
    status: 'active',
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    cover: '/phone.webp',
    count: 8,
    status: 'active',
  },
  {
    id: '5',
    name: 'Books & Media',
    cover: '/laptop.webp',
    count: 15,
    status: 'active',
  },
  {
    id: '6',
    name: 'Automotive',
    cover: '/default.webp',
    count: 6,
    status: 'inactive',
  },
  {
    id: '7',
    name: 'Health & Beauty',
    cover: '/portrait_image.webp',
    count: 22,
    status: 'active',
  },
  {
    id: '8',
    name: 'Toys & Games',
    cover: '/phone.webp',
    count: 14,
    status: 'active',
  },
  {
    id: '9',
    name: 'Food & Beverages',
    cover: '/default.webp',
    count: 9,
    status: 'active',
  },
  {
    id: '10',
    name: 'Pet Supplies',
    cover: '/laptop.webp',
    count: 7,
    status: 'active',
  },
];

export const mockEmptyCatalog: CategoryItem[] = [];

export const mockLargeCatalog: CategoryItem[] = [
  ...mockCatalogItems,
  {
    id: '11',
    name: 'Art & Crafts',
    cover: '/portrait_image.webp',
    count: 11,
    status: 'active',
  },
  {
    id: '12',
    name: 'Musical Instruments',
    cover: '/phone.webp',
    count: 5,
    status: 'active',
  },
  {
    id: '13',
    name: 'Office Supplies',
    cover: '/default.webp',
    count: 16,
    status: 'active',
  },
  {
    id: '14',
    name: 'Travel & Luggage',
    cover: '/laptop.webp',
    count: 13,
    status: 'active',
  },
  {
    id: '15',
    name: 'Jewelry & Accessories',
    cover: '/portrait_image.webp',
    count: 19,
    status: 'active',
  },
];
