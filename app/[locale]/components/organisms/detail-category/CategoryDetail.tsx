'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Input from '@atoms/shared/OutsideInput';
import { Textarea } from '@shadcn/ui/textarea';
import { Button } from '@shadcn/ui/button';
import ProductPicker, {
  type Product,
} from '@molecules/detail-category/ProductPicker';
import { cn } from 'utils';

type CategoryDTO = {
  id: string;
  title: string;
  description: string;
  products: Product[];
};

async function fetchCategory(id: string): Promise<CategoryDTO | null> {
  await new Promise((r) => setTimeout(r, 400));
  if (id === 'new') return null;
  return {
    id,
    title: 'Office & Workspace',
    description:
      'Products and accessories for productive home and office environments.',
    products: [
      {
        id: 'p1',
        name: 'Ergo Chair',
        imageUrl: '/laptop.webp',
        status: 'active',
        selected: true,
      },
      {
        id: 'p2',
        name: 'Standing Desk',
        imageUrl: '/laptop.webp',
        status: 'active',
        selected: true,
      },
      {
        id: 'p3',
        name: 'Monitor 27"',
        imageUrl: '/laptop.webp',
        status: 'inactive',
        selected: false,
      },
      {
        id: 'p4',
        name: 'LED Desk Lamp',
        imageUrl: '/laptop.webp',
        status: 'active',
        selected: false,
      },
    ],
  };
}

async function saveCategory(payload: {
  id?: string;
  title: string;
  description: string;
  productIds: string[];
}) {
  await new Promise((r) => setTimeout(r, 600));
  return payload.id ?? 'new-id-123';
}

export default function CategoryDetail({ id }: { id: string }) {
  const t = useTranslations('CategoryDetail');
  const router = useRouter();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      try {
        setLoading(true);
        const data = await fetchCategory(id);
        if (!mounted) return;
        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setProducts(data.products);
        } else {
          setTitle('');
          setDescription('');
          setProducts(
            [
              'Keyboard',
              'Mouse',
              'Headset',
              'USB Hub',
              'Webcam',
              'Ergo Chair',
              'RGB Lamp',
            ].map((name, i) => ({
              id: `temp-${i}`,
              name,
              imageUrl: '/laptop.webp',
              status: i % 3 === 0 ? 'inactive' : 'active',
              selected: false,
            })),
          );
        }
      } finally {
        setLoading(false);
      }
    })(); // <- marcamos la promesa con `void`
    return () => {
      mounted = false;
    };
  }, [id]);

  const selectedIds = useMemo(
    () => products.filter((p) => p.selected).map((p) => p.id),
    [products],
  );

  const onToggleSelect = (pid: string, val: boolean) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === pid ? { ...p, selected: val } : p)),
    );
  };

  const onRemove = (pid: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== pid));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // si no necesitas usar el id resultante, no lo guardes
      await saveCategory({
        id: isNew ? undefined : id,
        title,
        description,
        productIds: selectedIds,
      });
      router.push('/category');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="mx-auto w-full max-w-[980px] px-5 pb-12">
      {/* Title */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-[#64748b]">
          {t('title')}
        </label>
        <Input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder={t('titlePlaceholder')}
          className="bg-white"
          disabled={loading}
        />
      </div>

      {/* Description */}
      <div className="mb-8">
        <label className="mb-1 block text-sm font-medium text-[#64748b]">
          {t('description')}
        </label>
        <Textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          placeholder={t('descriptionPlaceholder')}
          className="min-h-[120px] bg-white"
          disabled={loading}
        />
      </div>

      {/* Products box */}
      <div
        className={cn(
          'rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200',
          loading && 'opacity-70',
        )}
      >
        <h3 className="mb-3 text-center text-sm font-medium text-[#64748b]">
          {t('products')}
        </h3>

        <ProductPicker
          items={products}
          onToggleSelect={onToggleSelect}
          onRemove={onRemove}
          disabled={loading}
          onExplore={() => alert('Explore clicked')}
          onOrderChange={(order) => console.log('order:', order)}
          onSearch={(q) => console.log('search:', q)}
          onShowMore={() => alert('Show more')}
        />
      </div>

      {/* Footer actions */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <Button variant="outline" onClick={handleCancel} disabled={saving}>
          {t('cancel')}
        </Button>
        <Button
          className="bg-black text-white hover:bg-black/90"
          onClick={() => void handleSave()}
          disabled={saving || loading || !title.trim()}
        >
          {isNew ? t('create') : t('save')}
        </Button>
      </div>
    </div>
  );
}
