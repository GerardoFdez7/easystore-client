export const products = [
  {
    id: '1',
    name: 'Phone',
    status: 'Active',
    inventory: 150,
    category: 'Home & Kitchen',
    cover: '/phone.webp',
    media: [
      {
        id: 'media_001',
        url: '/default.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
      {
        id: 'media_002',
        url: '/phone.webp',
        position: 2,
        mediaType: 'IMAGE' as const,
      },
    ],
  },
  {
    id: '2',
    name: 'Eco-Friendly Water Bottle',
    status: 'Active',
    inventory: 150,
    category: 'Home & Kitchen',
    cover: '/default.webp',
    media: [
      {
        id: 'media_003',
        url: '/phone.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
    ],
  },
  {
    id: '3',
    name: 'Eco-Friendly Water Bottle',
    status: 'Active',
    inventory: 150,
    category: 'Home & Kitchen',
    cover: '/phone.webp',
    media: [
      {
        id: 'media_004',
        url: '/default.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
      {
        id: 'media_005',
        url: '/phone.webp',
        position: 2,
        mediaType: 'IMAGE' as const,
      },
      {
        id: 'media_006',
        url: '/default.webp',
        position: 3,
        mediaType: 'IMAGE' as const,
      },
    ],
  },
  {
    id: '4',
    name: 'Eco-Friendly Water Bottle',
    status: 'Active',
    inventory: 150,
    category: 'Home & Kitchen',
    cover: '/default.webp',
    // No media - only cover will be shown
  },
  {
    id: '5',
    name: 'Eco-Friendly Water Bottle',
    status: 'Active',
    inventory: 150,
    category: 'Home & Kitchen',
    cover: '/phone.webp',
    media: [
      {
        id: 'media_007',
        url: '/default.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
      {
        id: 'media_008',
        url: '/phone.webp',
        position: 2,
        mediaType: 'IMAGE' as const,
      },
    ],
  },
  {
    id: '6',
    name: 'Eco-Friendly Water Bottle',
    status: 'Active',
    inventory: 150,
    category: 'Home & Kitchen',
    cover: '/default.webp',
    media: [
      {
        id: 'media_009',
        url: '/phone.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
      {
        id: 'media_010',
        url: 'https://example.com/video.mp4',
        position: 2,
        mediaType: 'VIDEO' as const, // This will be filtered out
      },
    ],
  },
  {
    id: '7',
    name: 'Eco-Friendly Water Bottle',
    status: 'Active',
    inventory: 150,
    category: 'Home & Kitchen',
    cover: '/phone.webp',
    // No media - only cover will be shown
  },
];

export const categoryOptions = [
  {
    id: '1',
    name: 'Ultrabooks',
    description: 'Thin and light laptops',
    cover: 'https://easystore.com/default-cover.jpg',
    subCategories: [],
  },
  {
    id: '2',
    name: 'Gaming Laptops',
    description: 'High-performance laptops for gaming',
    cover: 'https://easystore.com/default-cover.jpg',
    subCategories: [],
  },
  {
    id: '3',
    name: 'Laptops',
    description: 'Portable computing devices',
    cover: 'https://easystore.com/default-cover.jpg',
    subCategories: [
      {
        id: '4',
        name: 'Gaming Laptops',
        description: 'High-performance laptops for gaming',
        cover: 'https://easystore.com/default-cover.jpg',
        subCategories: [],
      },
      {
        id: '5',
        name: 'Ultrabooks',
        description: 'Thin and light laptops',
        cover: 'https://easystore.com/default-cover.jpg',
        subCategories: [],
      },
    ],
  },
  {
    id: '6',
    name: 'Computers',
    description: 'Laptops, Desktops, and Peripherals',
    cover: 'https://easystore.com/default-cover.jpg',
    subCategories: [
      {
        id: '7',
        name: 'Laptops',
        description: 'Portable computing devices',
        cover: 'https://easystore.com/default-cover.jpg',
        subCategories: [
          {
            id: '8',
            name: 'Gaming Laptops',
            description: 'High-performance laptops for gaming',
            cover: 'https://easystore.com/default-cover.jpg',
            subCategories: [],
          },
          {
            id: '9',
            name: 'Ultrabooks',
            description: 'Thin and light laptops',
            cover: 'https://easystore.com/default-cover.jpg',
            subCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: '10',
    name: 'Electronics',
    description: 'All electronic devices and accessories',
    cover: 'https://easystore.com/default-cover.jpg',
    subCategories: [
      {
        id: '11',
        name: 'Computers',
        description: 'Laptops, Desktops, and Peripherals',
        cover: 'https://easystore.com/default-cover.jpg',
        subCategories: [
          {
            id: '12',
            name: 'Laptops',
            description: 'Portable computing devices',
            cover: 'https://easystore.com/default-cover.jpg',
            subCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: '13',
    name: 'Categoría de prueba',
    description: 'Descripción de la categoría',
    cover: 'https://ejemplo.com/cover.jpg',
    subCategories: [],
  },
];
