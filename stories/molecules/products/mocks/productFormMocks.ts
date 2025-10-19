export const mockProductFormData = {
  name: 'Wireless Bluetooth Headphones',
  brand: 'AudioTech',
  manufacturer: 'AudioTech Industries Inc.',
  shortDescription:
    'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
  longDescription:
    'Experience unparalleled audio quality with our premium wireless Bluetooth headphones. Featuring advanced active noise cancellation technology, these headphones deliver crystal-clear sound in any environment. With up to 30 hours of battery life on a single charge, you can enjoy your favorite music, podcasts, and calls all day long. The ergonomic design ensures maximum comfort during extended listening sessions, while the premium materials guarantee durability and style.',
  categories: [
    { categoryId: 'electronics', categoryName: 'Electronics' },
    { categoryId: 'audio', categoryName: 'Audio & Video' },
  ],
  tags: ['wireless', 'bluetooth', 'headphones', 'noise-cancelling', 'audio'],
  productType: 'Physical',
  cover: '/default.webp',
  media: ['/default.webp', '/default.webp'],
  isSustainable: true,
  sustainabilityDescription:
    'Made with 50% recycled plastics and eco-friendly packaging. Our manufacturing process reduces carbon emissions by 40% compared to traditional methods.',
  variants: [],
};

export const mockEmptyProductFormData = {
  name: '',
  brand: '',
  manufacturer: '',
  shortDescription: '',
  longDescription: '',
  categories: [],
  tags: [],
  productType: 'Physical',
  cover: '',
  media: [],
  isSustainable: false,
  sustainabilityDescription: '',
  variants: [],
};

export const mockDigitalProductFormData = {
  name: 'Premium Photo Editing Software License',
  brand: 'PhotoPro',
  manufacturer: 'PhotoPro Software Ltd.',
  shortDescription:
    'Professional-grade photo editing software with AI features',
  longDescription:
    'Transform your photos with our cutting-edge AI-powered editing software. Features include advanced color correction, object removal, background replacement, and intelligent enhancement tools. Perfect for professional photographers and creative enthusiasts.',
  categories: [
    { categoryId: 'software', categoryName: 'Software' },
    { categoryId: 'digital', categoryName: 'Digital Products' },
  ],
  tags: ['software', 'photo-editing', 'digital', 'license', 'ai'],
  productType: 'Digital',
  cover: '/default.webp',
  media: [],
  isSustainable: true,
  sustainabilityDescription:
    'Digital product with zero physical waste. Cloud-based with energy-efficient servers powered by renewable energy.',
  variants: [],
};

export const mockCategories = [
  { categoryId: 'electronics', categoryName: 'Electronics' },
  { categoryId: 'audio', categoryName: 'Audio & Video' },
  { categoryId: 'wearables', categoryName: 'Wearables' },
  { categoryId: 'accessories', categoryName: 'Accessories' },
  { categoryId: 'software', categoryName: 'Software' },
  { categoryId: 'digital', categoryName: 'Digital Products' },
  { categoryId: 'computers', categoryName: 'Computers' },
  { categoryId: 'gaming', categoryName: 'Gaming' },
];

export const mockTags = [
  'wireless',
  'bluetooth',
  'headphones',
  'noise-cancelling',
  'audio',
  'premium',
  'portable',
  'rechargeable',
  'eco-friendly',
  'sustainable',
];
