'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import { Button } from '@shadcn/ui/button';
import ProductPicker, {
  type Product,
} from '@molecules/detail-category/ProductPicker';
import { cn } from 'utils';
import { getCategoryBySlug, upsertCategory } from '@lib/data/categories';

type Props = {
  slug: string;
  onTitleChange?: (title: string) => void;
};
export default function FormCategoryDetail({ slug, onTitleChange }: Props) {
  const t = useTranslations('CategoryDetail');
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;
  const isNew = slug === 'new';

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [saving, setSaving] = useState(false);

  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

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
              cover: '/laptop.webp',
              status: i % 3 === 0 ? 'inactive' : 'active',
              selected: false,
            })),
          );
        } else {
          const data = await getCategoryBySlug(slug);
          if (!mounted) return;
          if (!data) {
            router.replace(locale ? `/${locale}/categories` : `/categories`);
            return;
          }
          setCategoryId(data.id);
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
  }, [slug, isNew, locale, router]);

  useEffect(() => {
    onTitleChange?.(title);
  }, [title, onTitleChange]);

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
        id: isNew ? undefined : categoryId,
        name: title,
        description,
        productIds: selectedIds,
      });
      router.push(locale ? `/${locale}/categories` : `/categories`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => router.back();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-6">
        <div className="space-y-1">
          <label
            htmlFor="title"
            className="text-text block text-sm font-medium"
          >
            {t('title')}
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('titlePlaceholder')}
            className="h-12 bg-white"
            disabled={loading}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="description"
            className="text-text block text-sm font-medium"
          >
            {t('description')}
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('descriptionPlaceholder')}
            className="min-h-[120px] bg-white"
            disabled={loading}
          />
        </div>
      </div>

      <div
        className={cn(
          'mt-6 rounded-lg p-3 shadow-sm ring-1 sm:p-4',
          loading && 'opacity-70',
        )}
      >
        <h3 className="text-text mb-3 text-center text-sm font-medium">
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

      <div className="mt-6 px-3 sm:mt-8 sm:px-4">
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={saving}
            className="w-full sm:w-auto"
          >
            {t('cancel')}
          </Button>
          <Button
            className="text-text w-full bg-black hover:bg-black/90 sm:w-auto"
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
