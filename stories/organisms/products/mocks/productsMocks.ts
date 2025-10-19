import { MediaTypeEnum, TypeEnum, ConditionEnum } from '@graphql/generated';

const mockDate = new Date('2024-01-15T10:00:00Z');

export const mockProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    brand: 'AudioTech',
    manufacturer: 'AudioTech Industries Inc.',
    cover: '/phone.webp',
    media: [
      {
        id: 'media_001',
        url: '/phone.webp',
        position: 1,
        mediaType: MediaTypeEnum.Image,
      },
      {
        id: 'media_002',
        url: '/default.webp',
        position: 2,
        mediaType: MediaTypeEnum.Image,
      },
    ],
    categories: [
      { categoryId: 'electronics', categoryName: 'Electronics' },
      { categoryId: 'audio', categoryName: 'Audio & Video' },
    ],
    tags: ['wireless', 'bluetooth', 'headphones', 'noise-cancelling', 'audio'],
    variants: [
      {
        id: 'variant_001',
        sku: 'WH-BLK-001',
        price: 199.99,
        condition: ConditionEnum.New,
        attributes: [{ key: 'Color', value: 'Black' }],
      },
      {
        id: 'variant_002',
        sku: 'WH-WHT-001',
        price: 199.99,
        condition: ConditionEnum.New,
        attributes: [{ key: 'Color', value: 'White' }],
      },
    ],
    status: 'Active',
    isArchived: false,
    productType: TypeEnum.Physical,
    shortDescription:
      'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    longDescription:
      'Experience unparalleled audio quality with our premium wireless Bluetooth headphones. Featuring advanced active noise cancellation technology, these headphones deliver crystal-clear sound in any environment.',
    createdAt: mockDate,
    updatedAt: mockDate,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    brand: 'TechGear',
    manufacturer: 'TechGear Ltd.',
    cover: '/default.webp',
    media: [
      {
        id: 'media_003',
        url: '/default.webp',
        position: 1,
        mediaType: MediaTypeEnum.Image,
      },
    ],
    categories: [{ categoryId: 'wearables', categoryName: 'Wearables' }],
    tags: ['smartwatch', 'fitness', 'bluetooth', 'health'],
    variants: [
      {
        id: 'variant_003',
        sku: 'SW-SIL-001',
        price: 299.99,
        condition: ConditionEnum.New,
        attributes: [{ key: 'Color', value: 'Silver' }],
      },
      {
        id: 'variant_004',
        sku: 'SW-BLK-001',
        price: 299.99,
        condition: ConditionEnum.New,
        attributes: [{ key: 'Color', value: 'Black' }],
      },
    ],
    status: 'Active',
    isArchived: false,
    productType: TypeEnum.Physical,
    shortDescription: 'Advanced fitness tracker with heart rate monitor',
    createdAt: mockDate,
    updatedAt: mockDate,
  },
  {
    id: '3',
    name: 'Ergonomic Laptop Stand',
    brand: 'ErgoDesk',
    manufacturer: 'ErgoDesk Co.',
    cover: '/laptop.webp',
    media: [
      {
        id: 'media_004',
        url: '/laptop.webp',
        position: 1,
        mediaType: MediaTypeEnum.Image,
      },
    ],
    categories: [{ categoryId: 'accessories', categoryName: 'Accessories' }],
    tags: ['ergonomic', 'desk', 'aluminum', 'portable'],
    variants: [
      {
        id: 'variant_005',
        sku: 'LS-ALU-001',
        price: 79.99,
        condition: ConditionEnum.New,
        attributes: [{ key: 'Material', value: 'Aluminum' }],
      },
    ],
    status: 'Active',
    isArchived: false,
    productType: TypeEnum.Physical,
    shortDescription: 'Adjustable aluminum stand for better posture',
    createdAt: mockDate,
    updatedAt: mockDate,
  },
  {
    id: '4',
    name: 'Premium Photo Editing Software',
    brand: 'PhotoPro',
    manufacturer: 'PhotoPro Software Ltd.',
    cover: '/default.webp',
    media: [],
    categories: [
      { categoryId: 'software', categoryName: 'Software' },
      { categoryId: 'digital', categoryName: 'Digital Products' },
    ],
    tags: ['software', 'photo-editing', 'digital', 'license', 'ai'],
    variants: [
      {
        id: 'variant_006',
        sku: 'PP-LIC-001',
        price: 149.99,
        condition: ConditionEnum.New,
        attributes: [{ key: 'License Type', value: 'Annual' }],
      },
    ],
    status: 'Active',
    isArchived: false,
    productType: TypeEnum.Digital,
    shortDescription: 'Professional-grade photo editing with AI features',
    createdAt: mockDate,
    updatedAt: mockDate,
  },
  {
    id: '5',
    name: 'Mechanical Gaming Keyboard',
    brand: 'GamePro',
    manufacturer: 'GamePro Electronics',
    cover: '/default.webp',
    media: [
      {
        id: 'media_005',
        url: '/default.webp',
        position: 1,
        mediaType: MediaTypeEnum.Image,
      },
    ],
    categories: [
      { categoryId: 'gaming', categoryName: 'Gaming' },
      { categoryId: 'accessories', categoryName: 'Accessories' },
    ],
    tags: ['gaming', 'mechanical', 'rgb', 'keyboard'],
    variants: [
      {
        id: 'variant_007',
        sku: 'KB-RGB-001',
        price: 129.99,
        condition: ConditionEnum.New,
        attributes: [{ key: 'Switch Type', value: 'Blue' }],
      },
    ],
    status: 'Active',
    isArchived: false,
    productType: TypeEnum.Physical,
    shortDescription: 'RGB mechanical keyboard with customizable switches',
    createdAt: mockDate,
    updatedAt: mockDate,
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    brand: 'TechGear',
    manufacturer: 'TechGear Ltd.',
    cover: '/default.webp',
    media: [],
    categories: [{ categoryId: 'accessories', categoryName: 'Accessories' }],
    tags: ['wireless', 'mouse', 'ergonomic'],
    variants: [
      {
        id: 'variant_008',
        sku: 'MS-WLS-001',
        price: 49.99,
        condition: ConditionEnum.New,
        attributes: [{ key: 'Color', value: 'Black' }],
      },
    ],
    status: 'Active',
    isArchived: true,
    productType: TypeEnum.Physical,
    shortDescription: 'Ergonomic wireless mouse with precision tracking',
    createdAt: mockDate,
    updatedAt: mockDate,
  },
];

export const mockEmptyProducts: never[] = [];

export const mockSingleProduct = mockProducts[0];

export const mockArchivedProducts = mockProducts.filter((p) => p.isArchived);

export const mockActiveProducts = mockProducts.filter((p) => !p.isArchived);
