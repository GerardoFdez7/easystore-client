'use client';

import { z } from 'zod';
import { useTranslations } from 'next-intl';

/**
 * Shared category form validation schema
 * Consolidates validation logic used by both create and update hooks
 */
export function buildCategorySchema(
  t: ReturnType<typeof useTranslations>,
  isUpdate = false,
) {
  const baseSchema = {
    name: z
      .string()
      .trim()
      .min(1, { message: t('nameRequired') })
      .max(100, { message: t('nameTooLong', { max: 100 }) }),
    description: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => {
          // If empty or undefined, it's valid (optional field)
          if (!value || value.length === 0) return true;
          // If provided, must be at least 10 characters
          return value.length >= 10;
        },
        { message: t('descriptionTooShort', { min: 10 }) },
      )
      .refine(
        (value) => {
          // If empty or undefined, it's valid (optional field)
          if (!value || value.length === 0) return true;
          // If provided, must not exceed 200 characters
          return value.length <= 200;
        },
        { message: t('descriptionTooLong', { max: 200 }) },
      ),
    cover: z
      .string()
      .trim()
      .refine(
        (v) => {
          // Allow empty string for removal (updates only)
          if (isUpdate && v === '') return true;
          // For creation or non-empty values, require minimum length
          return v.length >= 1;
        },
        { message: t('coverRequired') },
      )
      .refine(
        (v) => {
          // Skip URL validation for empty strings (removal case)
          if (v === '') return true;
          return v.startsWith('/') || /^https?:\/\//i.test(v);
        },
        { message: t('invalidUrl') },
      ),
    subCategoryIds: z.array(z.string()).default([]).optional(),
  };

  // For updates, make all fields optional except validation constraints
  if (isUpdate) {
    return z.object({
      name: baseSchema.name.optional(),
      description: baseSchema.description,
      cover: baseSchema.cover.optional(),
      subCategoryIds: baseSchema.subCategoryIds,
    });
  }

  return z.object(baseSchema);
}

export type CategoryFormValues = z.infer<
  ReturnType<typeof buildCategorySchema>
>;

/**
 * Default form configuration for category forms
 */
export const defaultFormConfig = {
  mode: 'onChange' as const,
  reValidateMode: 'onChange' as const,
  criteriaMode: 'all' as const,
};

/**
 * Default form values for category forms
 */
export const defaultCategoryFormValues: CategoryFormValues = {
  name: '',
  description: '',
  cover: '',
  subCategoryIds: [],
};
