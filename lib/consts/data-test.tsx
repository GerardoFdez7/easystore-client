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
    name: 'Electronics',
    description: 'All electronic devices and accessories',
    subCategories: [
      {
        id: '2',
        name: 'Computers',
        description: 'Laptops, Desktops, and Peripherals',
        subCategories: [
          {
            id: '3',
            name: 'Laptops',
            description: 'Portable computing devices',
            subCategories: [
              {
                id: '4',
                name: 'Gaming Laptops',
                description: 'High-performance laptops for gaming',
              },
              {
                id: '5',
                name: 'Ultrabooks',
                description: 'Thin and light laptops',
              },
            ],
          },
          {
            id: '6',
            name: 'Desktops',
            description: 'Stationary computing devices',
          },
          {
            id: '7',
            name: 'Peripherals',
            description: 'Keyboards, Mice, Monitors, etc.',
            subCategories: [
              {
                id: '8',
                name: 'Monitors',
                description: 'Display screens',
              },
              {
                id: '9',
                name: 'Keyboards',
                description: 'Input devices for typing',
              },
            ],
          },
        ],
      },
      {
        id: '10',
        name: 'Smartphones',
        description: 'Mobile communication devices',
        subCategories: [
          {
            id: '11',
            name: 'Android Phones',
            description: 'Smartphones running Android OS',
          },
          {
            id: '12',
            name: 'iOS Phones',
            description: 'Smartphones running iOS',
          },
        ],
      },
      {
        id: '13',
        name: 'Cameras',
        description: 'Devices for capturing images and videos',
      },
    ],
  },
];
