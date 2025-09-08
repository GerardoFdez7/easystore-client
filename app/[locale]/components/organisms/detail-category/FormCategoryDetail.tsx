'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import { Button } from '@shadcn/ui/button';

import CategoryPicker, {
  type CategoryItem,
} from '@molecules/detail-category/CategoryPicker';
import { cn } from 'utils';
import {
  getCategoryByName,
  upsertCategory,
  getCategoryList,
} from '@lib/data/categories';

type Props = {
  name: string;
  onTitleChange?: (title: string) => void;
};
export default function FormCategoryDetail({ name, onTitleChange }: Props) {
  const t = useTranslations('CategoryDetail');
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;
  const isNew = name === 'new';

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [catalog, setCatalog] = useState<CategoryItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
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
        } else {
          const data = await getCategoryByName(name);
          if (!mounted) return;
          if (!data) {
            router.replace(locale ? `/${locale}/categories` : `/categories`);
            return;
          }
          setCategoryId(data.id);
          setTitle(data.name);
          setDescription(data.description);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [name, isNew, locale, router]);

  useEffect(() => {
    onTitleChange?.(title);
  }, [title, onTitleChange]);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await getCategoryList();
      if (!mounted) return;

      const filtered = list.filter((c) => !categoryId || c.id !== categoryId);

      setCategories(
        filtered.map((c) => ({
          id: c.id,
          name: c.name,
          cover: c.cover,
          count: c.count,
          selected: false,
        })),
      );
    })();
    return () => {
      mounted = false;
    };
  }, [categoryId]); // se r

  // Cargar catálogo
  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await getCategoryList(); // [{id,name,cover,count}]
      if (!mounted) return;

      const filtered = list.filter((c) => !categoryId || c.id !== categoryId);

      // catálogo de dónde escoger (todas menos la actual)
      setCatalog(
        filtered.map((c) => ({
          id: c.id,
          name: c.name,
          cover: c.cover,
          count: c.count,
          selected: false,
        })),
      );

      // si estás editando y ya tienes subcategorías guardadas, aquí haces setCategories([...])
      // por ahora dejamos vacío:
      if (isNew) setCategories([]);
    })();
    return () => {
      mounted = false;
    };
  }, [categoryId, isNew]);

  const onAddCategories = (ids: string[]) =>
    setCategories((prev) => {
      const already = new Set(prev.map((p) => p.id));
      const toAdd = catalog.filter(
        (c) => ids.includes(c.id) && !already.has(c.id),
      );
      return [...prev, ...toAdd];
    });

  const onRemoveCategory = (cid: string) =>
    setCategories((prev) => prev.filter((c) => c.id !== cid));

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertCategory({
        id: isNew ? undefined : categoryId,
        name: title,
        description,
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
          'mt-6 rounded-lg p-3 shadow-sm sm:p-4',
          loading && 'opacity-70',
        )}
      >
        <h3 className="text-text mb-3 text-center text-sm font-medium">
          {t('categories')}
        </h3>
        <CategoryPicker
          items={categories}
          catalog={catalog}
          onAdd={onAddCategories}
          onRemove={onRemoveCategory}
          disabled={loading}
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
            className="text-accent bg-title hover:bg-accent-foreground w-full sm:w-auto"
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
