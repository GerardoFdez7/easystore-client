'use client';

import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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

  // Memoize schema for creation (not update)
  const schema = useMemo(() => buildCategorySchema(t, false), [t]);

  // Memoize form default values
  const formDefaultValues = useMemo(
    () => ({
      ...defaultCategoryFormValues,
      ...defaultValues,
    }),
    [defaultValues],
  );

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: formDefaultValues,
    ...defaultFormConfig,
  });

  const [mutateCreate, createState] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, {
    refetchQueries: [{ query: FindAllCategoriesDocument }],
    awaitRefetchQueries: true,
  });

  // Memoize submit handler to prevent unnecessary re-renders
  const _submit = useCallback(
    async (values: CategoryFormValues) => {
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

        // Redirect to parent path (categories page)
        router.back();
      } catch (_error) {
        // Error handling is managed globally by Apollo Client error handler
        // No additional error handling needed here
      }
    },
    [mutateCreate, parentId, t, onSuccess, router],
  );

  // Memoize form submit handler
  const handleSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      void form.handleSubmit(_submit)();
    },
    [form, _submit],
  );

  return {
    form,
    handleSubmit,
    isSubmitting: createState.loading,
  };
}
