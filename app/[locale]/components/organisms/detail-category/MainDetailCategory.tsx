'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import { Button } from '@shadcn/ui/button';
import MediaUploader from '@organisms/shared/MediaUploader';

import CategoryPicker from '@molecules/detail-category/CategoryPicker';
import type { CategoryItem as PickerItem } from '@molecules/detail-category/CategoryPicker';
import type { CategoryItem as CatalogItem } from '@molecules/detail-category/AddSubcategory';

import useCategory from '@hooks/domains/category/useCategory';
import { useCategories } from '@hooks/domains/category/useCategories';
import { useCreateCategory } from '@hooks/domains/category/useCreateCategory';
import { useUpdateCategory } from '@hooks/domains/category/useUpdateCategory';

const EmptyIDS: string[] = [];

type SubCatLite = {
  id: string;
  name?: string;
  cover?: string;
  subCategories?: unknown[];
};

type CategoryFormShape = {
  title: string;
  description?: string;
  cover?: string;
  // UI keeps ids; hooks map to GraphQL `subCategories`
  subCategoryIds?: string[];
};

export default function MainDetailCategory({ id }: { id: string }) {
  return id === 'new' ? <CreateScreen /> : <EditScreen id={id} />;
}

function CreateScreen() {
  const t = useTranslations('CategoryDetail');
  const { locale } = useParams<{ locale?: string }>() ?? {};
  const router = useRouter();

  const { form, handleSubmit, isSubmitting } = useCreateCategory();

  const { items: catalog, loading: loadingCatalog } =
    useCategories<CatalogItem>(
      { page: 1, limit: 200 },
      {
        select: (list) =>
          list.map((c) => ({
            id: c.id,
            name: c.name,
            cover: c.cover && c.cover.trim() ? c.cover : '/laptop.webp',
            count: Array.isArray(c.subCategories) ? c.subCategories.length : 0,
          })),
      },
    );

  return (
    <CategoryFormView
      tKey={t}
      locale={locale}
      form={form}
      onSubmit={(e) => {
        e?.preventDefault();
        void handleSubmit(e);
      }}
      isSubmitting={isSubmitting}
      loadingCat={false}
      isNew
      catalog={catalog}
      loadingCatalog={loadingCatalog}
      childrenFallback={[]}
      onCancel={() => router.back()}
    />
  );
}

function EditScreen({ id }: { id: string }) {
  const t = useTranslations('CategoryDetail');
  const { locale } = useParams<{ locale?: string }>() ?? {};
  const router = useRouter();

  const { category, loading: loadingCat } = useCategory(id);
  const { form, handleSubmit, isSubmitting } = useUpdateCategory({ id });

  useEffect(() => {
    if (category) {
      form.reset({
        title: category.name ?? '',
        description: category.description ?? '',
        cover:
          category.cover && category.cover.trim()
            ? category.cover
            : '/laptop.webp',
        // Keep ids in form state; hooks will map to nested input
        subCategoryIds: (category.subCategories ?? [])
          .filter(Boolean)
          .map((sc: unknown) => (sc as { id?: string })?.id)
          .filter(Boolean) as string[],
      });
    }
  }, [category, form]);

  const { items: catalog, loading: loadingCatalog } =
    useCategories<CatalogItem>(
      { page: 1, limit: 200 },
      {
        select: (list) =>
          list
            .filter((c) => c.id !== id)
            .map((c) => ({
              id: c.id,
              name: c.name,
              cover: c.cover ?? '',
              count: Array.isArray(c.subCategories)
                ? c.subCategories.length
                : 0,
            })),
      },
    );

  const children: ReadonlyArray<SubCatLite> =
    (category?.subCategories as ReadonlyArray<SubCatLite> | undefined) ?? [];

  return (
    <CategoryFormView
      tKey={t}
      locale={locale}
      form={form}
      onSubmit={(e) => {
        e?.preventDefault();
        void handleSubmit(e);
      }}
      isSubmitting={isSubmitting}
      loadingCat={loadingCat}
      isNew={false}
      catalog={catalog}
      loadingCatalog={loadingCatalog}
      childrenFallback={children}
      onCancel={() => router.back()}
    />
  );
}

function CategoryFormView({
  tKey,
  // locale,
  form,
  onSubmit,
  isSubmitting,
  loadingCat,
  isNew,
  catalog,
  loadingCatalog,
  childrenFallback,
  onCancel,
}: {
  tKey: ReturnType<typeof useTranslations>;
  locale?: string;
  form: UseFormReturn<CategoryFormShape>;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  loadingCat: boolean;
  isNew: boolean;
  catalog: CatalogItem[];
  loadingCatalog: boolean;
  childrenFallback: ReadonlyArray<SubCatLite>;
  onCancel: () => void;
}) {
  const t = tKey;
  const { register, watch, setValue, getValues } = form;

  // Ensure RHF tracks the virtual field
  React.useEffect(() => {
    form.register('subCategoryIds' as const, { shouldUnregister: false });
  }, [form]);

  const selectedIdsRaw = watch('subCategoryIds') as string[] | undefined;
  const selectedIds = selectedIdsRaw ?? EmptyIDS;
  // const selectedIdsKey = useMemo(() => selectedIds.join('|'), [selectedIds]);

  const selectedItems: PickerItem[] = useMemo(() => {
    const byId = new Map(catalog.map((c) => [c.id, c]));
    const childById = new Map(childrenFallback.map((c) => [c.id, c]));

    return selectedIds.map<PickerItem>((sid) => {
      const base = byId.get(sid);
      const fb = childById.get(sid);

      const cover =
        (base?.cover && base.cover.trim()) ||
        (fb?.cover && fb.cover.trim()) ||
        '/laptop.webp';

      const sc = fb?.subCategories;
      const countFromFallback = Array.isArray(sc) ? sc.length : undefined;

      const countFromCatalog =
        typeof base?.count === 'number' ? base.count : undefined;

      return {
        id: sid,
        name: base?.name ?? fb?.name ?? '—',
        cover,
        count: countFromCatalog ?? countFromFallback ?? 0,
      };
    });
  }, [catalog, childrenFallback, selectedIds]);

  const disableSave =
    isSubmitting || loadingCat || (watch('title')?.trim().length ?? 0) === 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 md:py-6 lg:px-8 2xl:m-5">
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={onSubmit} className="mx-auto max-w-4xl space-y-6">
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
                disabled={loadingCat}
                className="h-12 bg-white"
                {...register('title')}
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
                disabled={loadingCat}
                className="min-h-[120px] bg-white"
                {...register('description')}
              />
            </div>

            <section className="mt-2 rounded-lg p-3 shadow-sm sm:p-4">
              <h3 className="text-text mb-3 text-center text-sm font-medium">
                {t('categories')}
              </h3>
              <CategoryPicker
                items={selectedItems}
                catalog={catalog}
                onAdd={(ids) => {
                  const current = new Set<string>(
                    (getValues('subCategoryIds') ?? []) as string[],
                  );
                  ids.forEach((x) => current.add(x));
                  setValue('subCategoryIds', Array.from(current), {
                    shouldDirty: true,
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                }}
                onRemove={(rid) =>
                  setValue(
                    'subCategoryIds',
                    (getValues('subCategoryIds') ?? []).filter(
                      (x: string) => x !== rid,
                    ),
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    },
                  )
                }
                disabled={loadingCat || isSubmitting || loadingCatalog}
              />
            </section>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
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
