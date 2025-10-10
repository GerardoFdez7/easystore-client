'use client';

import { useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import {
  CreateCategoryDocument,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  FindAllCategoriesDocument,
} from '@graphql/generated';
import {
  buildCategorySchema,
  CategoryFormValues,
  defaultFormConfig,
  defaultCategoryFormValues,
} from './categoryValidation';

type CreateHookOptions = {
  defaultValues?: Partial<CategoryFormValues>;
  parentId?: string;
  onSuccess?: () => void;
};

export function useCreateCategory({
  defaultValues,
  parentId,
  onSuccess,
}: CreateHookOptions = {}) {
  const t = useTranslations('CategoryDetail');
  const router = useRouter();
  const { locale } = (useParams<{ locale?: string }>() ?? {}) as {
    locale?: string;
  };

  // Use schema for creation (not update)
  const schema = useMemo(() => buildCategorySchema(t, false), [t]);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultCategoryFormValues,
      ...defaultValues,
    },
    ...defaultFormConfig,
  });

  const [mutateCreate, createState] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, {
    refetchQueries: [{ query: FindAllCategoriesDocument }],
    awaitRefetchQueries: true,
  });

  const _submit = form.handleSubmit(async (values) => {
    const input = {
      name: values.name?.trim() || '',
      description: values.description?.trim() || '',
      cover: values.cover?.trim() || '',
      ...(parentId ? { parentId } : {}),
    } satisfies CreateCategoryMutationVariables['input'];

    try {
      await mutateCreate({ variables: { input } });

      toast.success(t('createSuccess'));

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Always redirect to categories page after successful creation
      const categoriesPath = locale ? `/${locale}/categories` : '/categories';
      router.push(categoriesPath);
    } catch (_error) {}
  });

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    void _submit();
  };

  return {
    form,
    handleSubmit,
    isSubmitting: createState.loading,
  };
}
