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
import { toast } from 'sonner';

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
  description: string;
  cover: string;
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
        subCategoryIds: (category.subCategories ?? [])
          .filter(Boolean)
          .map((sc: unknown) => (sc as { id?: string })?.id)
          .filter(Boolean) as string[],
      });
      void form.trigger();
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
  //Media
  React.useEffect(() => {
    form.register('cover' as const, { shouldUnregister: false });
    form.register('subCategoryIds' as const, { shouldUnregister: false });
  }, [form]);

  type UnknownRecord = Record<PropertyKey, unknown>;

  const isRecord = (v: unknown): v is UnknownRecord =>
    typeof v === 'object' && v !== null;

  const hasKey = <K extends PropertyKey>(
    obj: UnknownRecord,
    key: K,
  ): obj is UnknownRecord & Record<K, unknown> => key in obj;

  const hasUrl = (v: unknown): v is { url: string } =>
    isRecord(v) && hasKey(v, 'url') && typeof v.url === 'string';

  const hasUrls = (v: unknown): v is { urls: string[] } =>
    isRecord(v) &&
    hasKey(v, 'urls') &&
    Array.isArray(v.urls) &&
    v.urls.every((x): x is string => typeof x === 'string');

  const isStringArray = (v: unknown): v is string[] =>
    Array.isArray(v) && v.every((x): x is string => typeof x === 'string');

  const hasCover = (v: unknown): v is { cover: string } =>
    isRecord(v) && hasKey(v, 'cover') && typeof v.cover === 'string';

  const t = tKey;
  const { register, watch, setValue, getValues, formState } = form;
  const disableSave = isSubmitting || loadingCat || !formState.isValid;

  // Ensure RHF tracks the virtual field
  React.useEffect(() => {
    form.register('subCategoryIds' as const, { shouldUnregister: false });
  }, [form]);

  const selectedIdsRaw = watch('subCategoryIds') as string[] | undefined;
  const selectedIds = selectedIdsRaw ?? EmptyIDS;

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

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 md:py-6 lg:px-8 2xl:m-5">
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={onSubmit} className="mx-auto max-w-4xl space-y-6">
            <MediaUploader
              multiple={false}
              initialMedia={form.getValues('cover') || null}
              onMediaProcessed={async (out) => {
                let url = '';

                if (!out) {
                  form.setValue('cover', '', {
                    shouldDirty: true,
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                  await form.trigger('cover');
                  return;
                }

                if (typeof out === 'string') url = out;
                else if (isStringArray(out)) url = out[0] ?? '';
                else if (hasUrl(out)) url = out.url;
                else if (hasUrls(out)) url = out.urls[0] ?? '';
                else if (hasCover(out)) url = out.cover;

                form.setValue('cover', url, {
                  shouldDirty: true,
                  shouldValidate: true,
                  shouldTouch: true,
                });
                await form.trigger('cover');
              }}
              onUploadError={(msg) =>
                toast.error(String(msg ?? 'Upload failed'))
              }
            />

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
              {formState.errors.title?.message && (
                <p className="text-destructive mt-1 text-xs">
                  {String(formState.errors.title.message)}
                </p>
              )}
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
              {formState.errors.description?.message && (
                <p className="text-destructive mt-1 text-xs">
                  {String(formState.errors.description.message)}
                </p>
              )}
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
