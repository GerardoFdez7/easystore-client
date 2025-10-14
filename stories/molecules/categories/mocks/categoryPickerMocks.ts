import { CategoryItem } from '@molecules/categories/detail/CategoryPicker';
import { CategoryItem as CatalogItem } from '@molecules/categories/detail/AddSubcategory';

export const mockCategoryItems: CategoryItem[] = [
  {
    id: '1',
    name: 'Electronics',
    cover: '/laptop.webp',
    description: 'All electronic devices and gadgets',
    tags: ['tech', 'gadgets', 'digital'],
    selected: false,
  },
  {
    id: '2',
    name: 'Clothing & Fashion',
    cover: '/portrait_image.webp',
    description: 'Trendy clothing and fashion accessories',
    tags: ['fashion', 'style', 'apparel'],
    selected: true,
  },
  {
    id: '3',
    name: 'Home & Garden',
    cover: '/default.webp',
    description: 'Everything for your home and garden needs',
    tags: ['home', 'garden', 'decor'],
    selected: false,
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    cover: '/phone.webp',
    description: 'Sports equipment and outdoor gear',
    tags: ['sports', 'outdoor', 'fitness'],
    selected: false,
  },
];

export const mockCategoryItemsWithLongNames: CategoryItem[] = [
  {
    id: '1',
    name: 'Super Ultra Mega Long Category Name That Should Truncate Properly',
    cover: '/laptop.webp',
    description:
      'This is a very long description that should also truncate properly when displayed in the component to test the layout behavior',
    tags: ['very-long-tag-name', 'another-extremely-long-tag', 'short'],
    selected: false,
  },
  {
    id: '2',
    name: 'Short',
    cover: '/portrait_image.webp',
    description: 'Short desc',
    tags: ['a'],
    selected: true,
  },
];

export const mockCategoryItemsNoDescription: CategoryItem[] = [
  {
    id: '1',
    name: 'Electronics',
    cover: '/laptop.webp',
    selected: false,
  },
  {
    id: '2',
    name: 'Clothing',
    cover: '/portrait_image.webp',
    selected: true,
  },
];

export const mockCategoryItemsNoTags: CategoryItem[] = [
  {
    id: '1',
    name: 'Electronics',
    cover: '/laptop.webp',
    description: 'All electronic devices and gadgets',
    selected: false,
  },
  {
    id: '2',
    name: 'Clothing',
    cover: '/portrait_image.webp',
    description: 'Trendy clothing and fashion accessories',
    selected: true,
  },
];

export const mockEmptyCategoryItems: CategoryItem[] = [];

export const mockCatalogForPicker: CatalogItem[] = [
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
    status: 'active',
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
];
