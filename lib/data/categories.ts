import raw from './categories.json';

export type Product = {
  id: string;
  name: string;
  cover: string;
  status: 'active' | 'inactive';
};

export type Category = {
  id: string;
  name: string;
  cover: string;
  description: string;
  products: Product[];
};

// Para evitar mutar el JSON importado
const DB: Category[] = (raw as Category[]).map((c) => ({ ...c }));

export type CategorySummary = {
  id: string;
  name: string;
  cover: string;
  count: number;
};

// lib/data/category-tree.ts
export type CategoryNode = { label: string; children?: CategoryNode[] };

export const categoryTree: CategoryNode[] = [
  {
    label: 'Electronics',
    children: [
      {
        label: 'Computers',
        children: [
          {
            label: 'Laptops',
            children: [
              { label: 'Gaming' },
              { label: 'Ultrabooks' },
              { label: 'Workstations' },
            ],
          },
          {
            label: 'Desktops',
            children: [
              { label: 'All-in-One' },
              { label: 'Mini PC' },
              { label: 'Towers' },
            ],
          },
          {
            label: 'Accessories',
            children: [
              { label: 'Keyboards' },
              { label: 'Mice' },
              { label: 'Monitors' },
            ],
          },
        ],
      },
      {
        label: 'Mobile Phones',
        children: [
          {
            label: 'Smartphones',
            children: [
              { label: 'Android' },
              { label: 'iOS' },
              { label: 'Foldables' },
            ],
          },
          {
            label: 'Wearables',
            children: [{ label: 'Smartwatches' }, { label: 'Fitness Bands' }],
          },
          {
            label: 'Accessories',
            children: [
              { label: 'Cases' },
              { label: 'Chargers' },
              { label: 'Cables' },
            ],
          },
        ],
      },
      {
        label: 'Audio & Video',
        children: [
          { label: 'Headphones' },
          { label: 'Speakers' },
          {
            label: 'TV',
            children: [{ label: 'LED' }, { label: 'OLED' }, { label: 'QLED' }],
          },
        ],
      },
    ],
  },
  {
    label: 'Fashion',
    children: [
      {
        label: 'Women',
        children: [
          { label: 'Dresses' },
          { label: 'Tops' },
          {
            label: 'Shoes',
            children: [
              { label: 'Heels' },
              { label: 'Sneakers' },
              { label: 'Boots' },
            ],
          },
        ],
      },
      {
        label: 'Men',
        children: [
          { label: 'Shirts' },
          { label: 'Pants' },
          {
            label: 'Shoes',
            children: [
              { label: 'Sneakers' },
              { label: 'Formal' },
              { label: 'Boots' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Home & Garden',
    children: [
      {
        label: 'Furniture',
        children: [
          {
            label: 'Living Room',
            children: [
              { label: 'Sofas' },
              { label: 'Coffee Tables' },
              { label: 'TV Stands' },
            ],
          },
          {
            label: 'Bedroom',
            children: [
              { label: 'Beds' },
              { label: 'Wardrobes' },
              { label: 'Nightstands' },
            ],
          },
          {
            label: 'Office',
            children: [{ label: 'Desks' }, { label: 'Chairs' }],
          },
        ],
      },
      {
        label: 'Garden',
        children: [
          { label: 'Plants' },
          { label: 'Tools' },
          { label: 'Outdoor Furniture' },
        ],
      },
      {
        label: 'Kitchen',
        children: [
          { label: 'Appliances' },
          { label: 'Cookware' },
          { label: 'Storage' },
        ],
      },
    ],
  },
  {
    label: 'Sports & Outdoors',
    children: [
      {
        label: 'Fitness',
        children: [
          { label: 'Weights' },
          { label: 'Cardio' },
          { label: 'Accessories' },
        ],
      },
      {
        label: 'Outdoor',
        children: [
          {
            label: 'Camping',
            children: [
              { label: 'Tents' },
              { label: 'Sleeping Bags' },
              { label: 'Stoves' },
            ],
          },
          { label: 'Cycling' },
          { label: 'Hiking' },
        ],
      },
    ],
  },
  {
    label: 'Books & Media',
    children: [
      {
        label: 'Books',
        children: [
          { label: 'Fiction' },
          { label: 'Non-Fiction' },
          { label: 'Kids' },
        ],
      },
      { label: 'Music' },
      { label: 'Movies' },
    ],
  },
  {
    label: 'Toys & Games',
    children: [
      { label: 'Building' },
      { label: 'Educational' },
      { label: 'Board Games' },
    ],
  },
  {
    label: 'Health & Beauty',
    children: [
      {
        label: 'Skincare',
        children: [
          { label: 'Cleansers' },
          { label: 'Moisturizers' },
          { label: 'Serums' },
        ],
      },
      { label: 'Haircare' },
      { label: 'Makeup' },
    ],
  },
];

// Lista para el grid
export async function getCategoryList(): Promise<CategorySummary[]> {
  return DB.map((c) => ({
    id: c.id,
    name: c.name,
    cover: c.cover,
    count: c.products.length,
  }));
}

// helper consistente con creación (quita tildes, min, guiones)
const slugifyEs = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // separa por guiones
    .replace(/^-+|-+$/g, ''); // limpia extremos

// --- NUEVO ---
// Detalle por slug (con fallback si el slug es realmente un id)
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const key = decodeURIComponent(slug);

  // 1) Si el "slug" resulta ser un id válido, reutiliza la función existente
  const byId = await getCategoryById(key);
  if (byId) return byId;

  // 2) Buscar por slug generado desde el name
  const found = DB.find((c) => slugifyEs(c.name) === key);
  return found ? structuredClone(found) : null;
}

// Detalle por id
export async function getCategoryById(id: string): Promise<Category | null> {
  const found = DB.find((c) => c.id === id);
  return found ? structuredClone(found) : null;
}

// Crear/actualizar (mock)
export async function upsertCategory(input: {
  id?: string;
  name: string;
  description: string;
  productIds: string[];
}): Promise<string> {
  if (input.id) {
    const idx = DB.findIndex((c) => c.id === input.id);
    if (idx >= 0) {
      const old = DB[idx];
      DB[idx] = {
        ...old,
        name: input.name,
        description: input.description,
        products: old.products.map((p) => ({
          ...p,
          status: input.productIds.includes(p.id) ? 'active' : p.status,
        })),
      };
      return input.id;
    }
  }
  // crear
  const newId = input.id ?? input.name.toLowerCase().replace(/\s+/g, '-');
  DB.push({
    id: newId,
    name: input.name,
    cover: '/laptop.webp',
    description: input.description,
    products: input.productIds.map((id) => ({
      id,
      name: `Product ${id}`,
      cover: '/laptop.webp',
      status: 'active',
    })),
  });
  return newId;
}
