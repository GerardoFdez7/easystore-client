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
  UpdateCategoryDocument,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
  FindAllCategoriesDocument,
} from '@graphql/generated';

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

type UpdateHookOptions = {
  id: string;
  // Needed to compute attach/detach diff
  initialChildIds?: string[];
  defaultValues?: Partial<CategoryFormValues>;
  redirectTo?: string;
  onSuccess?: (opts: { id: string }) => void;
  extraRefetchQueries?: ReadonlyArray<{
    query: DocumentNode;
    variables?: Record<string, unknown>;
  }>;
};

export function useUpdateCategory({
  id,
  initialChildIds = [],
  defaultValues,
  redirectTo,
  onSuccess,
  extraRefetchQueries = [],
}: UpdateHookOptions) {
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

  const [mutateUpdate, updateState] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, {
    refetchQueries: [
      { query: FindAllCategoriesDocument },
      ...extraRefetchQueries,
    ],
    awaitRefetchQueries: true,
  });

  const _submit = form.handleSubmit(async (values) => {
    // Normalize base updates for the parent category
    const baseInput = {
      name: values.title.trim(),
      ...(values.description?.trim() !== undefined
        ? { description: values.description?.trim() }
        : {}),
      ...(values.cover?.trim() !== undefined
        ? { cover: values.cover?.trim() }
        : {}),
    } satisfies UpdateCategoryMutationVariables['input'];

    // Compute children diff
    const nextIds = new Set<string>(
      Array.isArray(values.subCategoryIds) ? values.subCategoryIds : [],
    );
    const prevIds = new Set<string>(initialChildIds ?? []);
    const toAttach = [...nextIds].filter((x) => !prevIds.has(x));
    const toDetach = [...prevIds].filter((x) => !nextIds.has(x));

    const runUpdate = async () => {
      await mutateUpdate({ variables: { id, input: baseInput } }); // base
      if (toAttach.length + toDetach.length > 0) {
        await Promise.all([
          ...toAttach.map((childId) =>
            mutateUpdate({
              variables: { id: childId, input: { parentId: id } },
            }),
          ),
          ...toDetach.map((childId) =>
            mutateUpdate({
              variables: { id: childId, input: { parentId: null } },
            }),
          ),
        ]);
      }
    };

    const handleGqlError = (e: unknown) => {
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

      return msg;
    };

    try {
      const p = runUpdate();

      toast.promise(p, {
        success: t('saveSuccess'),
        error: (e: unknown) => handleGqlError(e),
      });

      await p;

      setTimeout(() => {
        if (onSuccess) onSuccess({ id });
        else
          router.push(
            redirectTo ?? (locale ? `/${locale}/categories` : '/categories'),
          );
      }, 0);
    } catch {}
  });

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    void _submit();
  };

  return { form, handleSubmit, isSubmitting: updateState.loading };
}
