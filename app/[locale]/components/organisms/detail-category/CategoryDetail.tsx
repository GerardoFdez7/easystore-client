'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Input from '@atoms/shared/OutsideInput';
import { Textarea } from '@shadcn/ui/textarea';
import { Button } from '@shadcn/ui/button';
import ProductPicker, {
  type Product,
} from '@molecules/detail-category/ProductPicker';
import { cn } from 'utils';
import { getCategoryById, upsertCategory } from '@lib/data/categories';

export default function CategoryDetail({ id }: { id: string }) {
  const t = useTranslations('CategoryDetail');
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;
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
        if (isNew) {
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
        } else {
          const data = await getCategoryById(id);
          if (!mounted) return;
          if (!data) {
            router.replace(locale ? `/${locale}/category` : `/category`);
            return;
          }
          setTitle(data.name);
          setDescription(data.description);
          setProducts(
            data.products.map((p) => ({
              ...p,
              selected: p.status === 'active',
            })),
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id, isNew, locale, router]);

  const selectedIds = useMemo(
    () => products.filter((p) => p.selected).map((p) => p.id),
    [products],
  );

  const onToggleSelect = (pid: string, val: boolean) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === pid ? { ...p, selected: val } : p)),
    );
  const onRemove = (pid: string) =>
    setProducts((prev) => prev.filter((p) => p.id !== pid));

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertCategory({
        id: isNew ? undefined : id,
        name: title,
        description,
        productIds: selectedIds,
      });
      router.push(locale ? `/${locale}/category` : `/category`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => router.back();

  return (
    <div className="w-full">
      {/* Bloque de inputs */}
      <div className="mx-auto w-full max-w-4xl">
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

        <div className="mb-6 sm:mb-8">
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
      </div>

      {/* Caja de productos */}
      <div
        className={cn(
          'mx-auto w-full max-w-4xl rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-200 sm:p-4',
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

      <div className="mt-6 sm:mt-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={saving}
            className="w-full sm:w-auto"
          >
            {t('cancel')}
          </Button>
          <Button
            className="w-full bg-black text-white hover:bg-black/90 sm:w-auto"
            onClick={() => void handleSave()}
            disabled={saving || loading || !title.trim()}
          >
            {isNew ? t('create') : t('save')}
          </Button>
        </div>
      </div>
    </div>
  );
}
