'use client';

import { useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import type { DocumentNode } from 'graphql';
import {
  UpdateCategoryDocument,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from '@graphql/generated';
import {
  buildCategorySchema,
  CategoryFormValues,
  defaultFormConfig,
  defaultCategoryFormValues,
} from './categoryValidation';

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
}: UpdateHookOptions) {
  const t = useTranslations('CategoryDetail');
  const router = useRouter();
  const { locale } = (useParams<{ locale?: string }>() ?? {}) as {
    locale?: string;
  };

  const schema = useMemo(() => buildCategorySchema(t, true), [t]);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultCategoryFormValues,
      ...defaultValues,
    },
    ...defaultFormConfig,
  });

  const [mutateUpdate, updateState] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, {});

  const _submit = form.handleSubmit(async (values) => {
    // Normalize base updates for the parent category
    const baseInput = {
      name: values.name?.trim(),
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

    try {
      const p = runUpdate();

      toast.promise(p, {
        success: t('saveSuccess'),
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

  /** Update multiple fields with validation - for media hook compatibility */
  const updateMultipleFields = async (
    fieldsToUpdate: Record<string, unknown>,
  ) => {
    if (!id) {
      throw new Error('Category ID is required');
    }

    const validatedFields: Record<string, unknown> = {};
    const validationErrors: string[] = [];

    // Validate ALL fields first before making any update
    for (const [fieldName, fieldValue] of Object.entries(fieldsToUpdate)) {
      try {
        switch (fieldName) {
          case 'name':
            if (fieldValue !== undefined) {
              const parsed = schema.shape.name.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Name: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                validatedFields.name = parsed.data;
              }
            }
            break;

          case 'description':
            if (fieldValue !== undefined) {
              const parsed = schema.shape.description.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Description: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                validatedFields.description = parsed.data;
              }
            }
            break;

          case 'cover':
            if (fieldValue !== undefined) {
              const parsed = schema.shape.cover.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Cover: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                validatedFields.cover = parsed.data;
              }
            }
            break;

          default:
            // For unknown fields, just pass them through
            validatedFields[fieldName] = fieldValue;
            break;
        }
      } catch (_error) {
        validationErrors.push(`${fieldName}: Validation error`);
      }
    }

    // If ANY validation failed, return all errors and don't update anything
    if (validationErrors.length > 0) {
      return {
        success: false,
        error: validationErrors.join(', '),
      };
    }

    // All validations passed - make API call
    try {
      const input = {
        ...(validatedFields.name !== undefined
          ? { name: String(validatedFields.name).trim() }
          : {}),
        ...(validatedFields.description !== undefined
          ? { description: String(validatedFields.description).trim() }
          : {}),
        ...(validatedFields.cover !== undefined
          ? { cover: String(validatedFields.cover).trim() }
          : {}),
      };

      await mutateUpdate({ variables: { id, input } });

      toast.success(t('saveSuccess'));
    } catch (_e) {}
  };

  return {
    form,
    handleSubmit,
    isSubmitting: updateState.loading,
    actions: {
      updateMultipleFields,
    },
  };
}
