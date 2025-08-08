import raw from './categories.json';

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  status: 'active' | 'inactive';
};

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  products: Product[];
};

// Para evitar mutar el JSON importado
const DB: Category[] = (raw as Category[]).map((c) => ({ ...c }));

export type CategorySummary = {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
};

// Lista para el grid
export async function getCategoryList(): Promise<CategorySummary[]> {
  return DB.map((c) => ({
    id: c.id,
    name: c.name,
    imageUrl: c.imageUrl,
    count: c.products.length,
  }));
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
    imageUrl: '/laptop.webp',
    description: input.description,
    products: input.productIds.map((id) => ({
      id,
      name: `Product ${id}`,
      imageUrl: '/laptop.webp',
      status: 'active',
    })),
  });
  return newId;
}
