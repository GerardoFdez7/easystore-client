'use client';

import { useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import type { DocumentNode } from 'graphql';

import {
  CreateCategoryDocument,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  UpdateCategoryDocument,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
  FindAllCategoriesDocument,
} from '@graphql/generated';

// Form schema
export type CategoryFormValues = z.infer<ReturnType<typeof buildSchema>>;

function buildSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    title: z
      .string()
      .trim()
      .min(1, { message: t('titleRequired') })
      .max(120, { message: t('titleTooLong', { max: 120 }) }),
    description: z
      .string()
      .trim()
      .max(1000, { message: t('descriptionTooLong', { max: 1000 }) })
      .min(10, { message: t('descriptionTooShort', { min: 10 }) }),
    cover: z
      .string()
      .trim()
      .min(1, { message: t('coverRequired') })
      .refine((v) => v.startsWith('/') || /^https?:\/\//i.test(v), {
        message: t('invalidUrl'),
      }),
    subCategoryIds: z.array(z.string()).default([]).optional(),
  });
}

type CreateHookOptions = {
  defaultValues?: Partial<CategoryFormValues>;
  redirectTo?: string;
  onSuccess?: (opts: { id?: string }) => void;
  extraRefetchQueries?: ReadonlyArray<{
    query: DocumentNode;
    variables?: Record<string, unknown>;
  }>;
};

export function useCreateCategory({
  defaultValues,
  redirectTo,
  onSuccess,
  extraRefetchQueries = [],
}: CreateHookOptions = {}) {
  const t = useTranslations('CategoryDetail');
  const router = useRouter();
  const { locale } = (useParams<{ locale?: string }>() ?? {}) as {
    locale?: string;
  };

  const schema = useMemo(() => buildSchema(t), [t]);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      cover: '',
      subCategoryIds: [],
      ...defaultValues,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const [mutateCreate, createState] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, {
    refetchQueries: [
      { query: FindAllCategoriesDocument },
      ...extraRefetchQueries,
    ],
    awaitRefetchQueries: true,
  });

  const [mutateUpdateChild] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument);

  const _submit = form.handleSubmit(async (values) => {
    const input = {
      name: values.title.trim(),
      description: values.description.trim(),
      cover: values.cover.trim(),
    } satisfies CreateCategoryMutationVariables['input'];

    try {
      const res = await mutateCreate({ variables: { input } });
      // @ts-expect-error: depends on your schema
      const newId: string | undefined = res.data?.createCategory?.id;

      // Attach children by setting their parentId to newId
      const ids = Array.isArray(values.subCategoryIds)
        ? values.subCategoryIds
        : [];
      if (newId && ids.length > 0) {
        await Promise.all(
          ids.map((childId) =>
            mutateUpdateChild({
              variables: { id: childId, input: { parentId: newId } },
            }),
          ),
        );
      }

      toast.success(t('createSuccess'));
      if (onSuccess) onSuccess({ id: newId });
      else
        router.push(
          redirectTo ?? (locale ? `/${locale}/categories` : '/categories'),
        );
    } catch (e) {
      const err = e as {
        graphQLErrors?: Array<{
          message?: string;
          path?: ReadonlyArray<string | number>;
        }>;
      };
      const msg = err?.graphQLErrors?.[0]?.message ?? 'Error';
      const path = err?.graphQLErrors?.[0]?.path as string[] | undefined;

      if (path?.includes('name') || /name|title/i.test(msg))
        form.setError('title', { type: 'server', message: msg });
      else if (path?.includes('description') || /description/i.test(msg))
        form.setError('description', { type: 'server', message: msg });
      else if (path?.includes('cover') || /cover|url/i.test(msg))
        form.setError('cover', { type: 'server', message: msg });
    }
  });

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    void _submit();
  };

  return { form, handleSubmit, isSubmitting: createState.loading };
}
