'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import { Button } from '@shadcn/ui/button';
import MediaUploader from '@organisms/shared/MediaUploader';

import CategoryPicker, {
  type CategoryItem,
} from '@molecules/detail-category/CategoryPicker';

import {
  getCategoryByName,
  getCategoryList,
  upsertCategory,
} from '@lib/data/categories';

type FormValues = {
  title: string;
  description: string;
  subCategoryIds: string[];
};

export default function MainDetailCategory({ name }: { name: string }) {
  const t = useTranslations('CategoryDetail');
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;

  const isNew = name === 'new';

  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      subCategoryIds: [],
    },
  });

  const { register, setValue, handleSubmit, watch } = form;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  // catálogo para elegir subcategorías y las actualmente seleccionadas
  const [catalog, setCatalog] = useState<CategoryItem[]>([]);
  const [selected, setSelected] = useState<CategoryItem[]>([]);

  // helpers para navegación
  const backToList = React.useCallback(() => {
    router.push(locale ? `/${locale}/categories` : `/categories`);
  }, [router, locale]);

  // 1) Cargar la categoría (por slug/id)
  useEffect(() => {
    let mounted = true;
    const loadCategory = async () => {
      try {
        setLoading(true);

        if (name !== 'new') {
          const data = await getCategoryByName(name);
          if (!mounted) return;

          if (!data) {
            backToList();
            return;
          }
          setCategoryId(data.id);
          setValue('title', data.name ?? '');
          setValue('description', data.description ?? '');
        } else {
          setCategoryId(undefined);
          setValue('title', '');
          setValue('description', '');
          setSelected([]);
          setValue('subCategoryIds', []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void loadCategory();
    return () => {
      mounted = false;
    };
  }, [name, backToList, setValue]); // ← deps correctas

  // 2) Cargar catálogo cuando cambia la categoría actual
  useEffect(() => {
    let mounted = true;
    const loadCatalog = async () => {
      const list = await getCategoryList();
      if (!mounted) return;

      const filtered = list.filter((c) => !categoryId || c.id !== categoryId);
      setCatalog(
        filtered.map((c) => ({
          id: c.id,
          name: c.name,
          cover: c.cover,
          count: c.count,
          selected: false,
        })),
      );
    };
    void loadCatalog();
    return () => {
      mounted = false;
    };
  }, [categoryId]); // ← sólo depende de categoryId

  // Acciones del picker
  const onAddCategories = (ids: string[]) =>
    setSelected((prev) => {
      const already = new Set(prev.map((p) => p.id));
      const toAdd = catalog.filter(
        (c) => ids.includes(c.id) && !already.has(c.id),
      );
      return [...prev, ...toAdd];
    });

  const onRemoveCategory = (id: string) =>
    setSelected((prev) => prev.filter((c) => c.id !== id));

  const submit = async (data: FormValues) => {
    setSaving(true);
    try {
      // En el mock solo persistimos name/description; subCategoryIds queda listo para cuando extiendas el backend
      await upsertCategory({
        id: isNew ? undefined : categoryId,
        name: data.title.trim(),
        description: data.description.trim(),
      });
      backToList();
    } finally {
      setSaving(false);
    }
  };

  const disableSave =
    saving || loading || (watch('title')?.trim().length ?? 0) === 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 md:py-6 lg:px-8 2xl:m-5">
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit(submit)(e);
            }}
            className="mx-auto max-w-4xl space-y-6"
          >
            <MediaUploader />
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="text-text block text-sm font-medium"
              >
                {t('title')}
              </label>
              <Input
                id="title"
                placeholder={t('titlePlaceholder')}
                disabled={loading}
                className="h-12 bg-white"
                {...register('title', { required: true })}
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
                placeholder={t('descriptionPlaceholder')}
                disabled={loading}
                className="min-h-[120px] bg-white"
                {...register('description')}
              />
            </div>

            {/* Subcategorías */}
            <section className="mt-2 rounded-lg p-3 shadow-sm sm:p-4">
              <h3 className="text-text mb-3 text-center text-sm font-medium">
                {t('categories')}
              </h3>
              <CategoryPicker
                items={selected}
                catalog={catalog}
                onAdd={onAddCategories}
                onRemove={onRemoveCategory}
                disabled={loading}
              />
            </section>

            {/* Botones */}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                disabled={disableSave}
                className="text-accent bg-title hover:bg-accent-foreground w-full sm:w-auto"
              >
                {isNew ? t('create') : t('save')}
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </main>
  );
}
