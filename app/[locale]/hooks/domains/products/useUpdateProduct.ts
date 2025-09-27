'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  UpdateDocument,
  UpdateMutation,
  UpdateMutationVariables,
  UpdateProductInput,
  TypeEnum,
  FindAllProductsDocument,
  FindProductByIdDocument,
} from '@lib/graphql/generated';
import { useMutation } from '@apollo/client/react';

export type ProductUpdate = {
  name?: string;
  shortDescription?: string;
  longDescription?: string | null;
  brand?: string | null;
  manufacturer?: string | null;
  productType?: TypeEnum;
  cover?: string;
  tags?: string[] | null;
  categories?: Array<{ categoryId: string }>;
  media?: Array<{
    mediaType: string;
    position: number;
    url: string;
  }>;
  sustainabilities?: Array<{
    certification: string;
    recycledPercentage: number;
  }>;
};

/** Extract a human readable error message */
function pickMessage(body: unknown): string | undefined {
  if (typeof body === 'string') return body;
  if (body && typeof body === 'object') {
    const obj = body as Record<string, unknown>;
    for (const key of ['message', 'error', 'detail']) {
      const v = obj[key];
      if (typeof v === 'string' && v.trim()) return v;
    }
  }
  return undefined;
}

function errorToMessage(e: unknown, fallback: string): string {
  if (e instanceof Error) return e.message || fallback;
  return pickMessage(e) ?? (typeof e === 'string' ? e : fallback);
}

export function useUpdateProduct(productId: string) {
  const t = useTranslations('Products');

  const [updateProductMutation] = useMutation<
    UpdateMutation,
    UpdateMutationVariables
  >(UpdateDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    refetchQueries: [
      {
        query: FindAllProductsDocument,
      },
      {
        query: FindProductByIdDocument,
        variables: { id: productId },
      },
    ],
    awaitRefetchQueries: false,
  });

  /** Field validators */
  const validators = {
    name: z
      .string()
      .trim()
      .min(2, { message: t('nameTooShort') })
      .max(100, { message: t('nameTooLong') }),
    shortDescription: z
      .string()
      .trim()
      .min(10, { message: t('shortDescriptionTooShort') })
      .max(200, { message: t('shortDescriptionTooLong') }),
    longDescription: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || val.length >= 20, {
        message: t('longDescriptionTooShort'),
      })
      .refine((val) => !val || val.length <= 2000, {
        message: t('longDescriptionTooLong'),
      }),
    brand: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || val.length >= 1, {
        message: t('brandTooShort'),
      })
      .refine((val) => !val || val.length <= 100, {
        message: t('brandTooLong'),
      }),
    manufacturer: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || val.length >= 1, {
        message: t('manufacturerTooShort'),
      })
      .refine((val) => !val || val.length <= 100, {
        message: t('manufacturerTooLong'),
      }),
    cover: z.union([z.string(), z.null()]).refine(
      (val) => {
        if (val === null || val === '') return false;
        return z.string().url().safeParse(val).success;
      },
      {
        message: t('coverRequired'),
      },
    ),
    productType: z.enum(['PHYSICAL', 'DIGITAL'], {
      errorMap: () => ({ message: t('productTypeRequired') }),
    }),
    tags: z
      .array(
        z
          .string()
          .min(1, { message: t('tagMustBeNonEmpty') })
          .max(50, { message: t('tagTooLong') }),
      )
      .max(15, { message: t('tooManyTags') })
      .nullable()
      .optional(),
    sustainabilities: z
      .array(
        z.object({
          certification: z
            .string()
            .min(1, { message: t('certificationRequired') }),
          recycledPercentage: z
            .number()
            .min(0, { message: t('recycledPercentageMin') })
            .max(100, { message: t('recycledPercentageMax') }),
        }),
      )
      .optional(),
  };

  /** Generic updater using Apollo mutate + optimistic update */
  const updateProduct = async (patch: ProductUpdate) => {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    try {
      const result = await updateProductMutation({
        variables: {
          id: productId,
          input: patch as UpdateProductInput,
        },
      });

      return result.data?.updateProduct || null;
    } catch (e: unknown) {
      toast.error(t('updateErrorTitle'), {
        description: errorToMessage(e, t('unknownError')),
      });
      throw e;
    }
  };

  /** Individual field update actions */
  const updateName = async (name: string) => {
    const parsed = validators.name.safeParse(name);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const product = await updateProduct({ name: parsed.data });
      toast.success(t('savedChangesTitle'), {
        description: t('nameUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateShortDescription = async (shortDescription: string) => {
    const parsed = validators.shortDescription.safeParse(shortDescription);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const product = await updateProduct({ shortDescription: parsed.data });
      toast.success(t('savedChangesTitle'), {
        description: t('shortDescriptionUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateLongDescription = async (longDescription: string) => {
    const parsed = validators.longDescription.safeParse(longDescription);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const value = parsed.data?.trim() === '' ? null : parsed.data;
      const product = await updateProduct({
        longDescription: value === null ? null : value,
      });
      toast.success(t('savedChangesTitle'), {
        description: t('longDescriptionUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateBrand = async (brand: string) => {
    const parsed = validators.brand.safeParse(brand);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const value = parsed.data?.trim() === '' ? null : parsed.data;
      const product = await updateProduct({
        brand: value === null ? null : value,
      });
      toast.success(t('savedChangesTitle'), {
        description: t('brandUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateManufacturer = async (manufacturer: string) => {
    const parsed = validators.manufacturer.safeParse(manufacturer);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const value = parsed.data?.trim() === '' ? null : parsed.data;
      const product = await updateProduct({
        manufacturer: value === null ? null : value,
      });
      toast.success(t('savedChangesTitle'), {
        description: t('manufacturerUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateCover = async (cover: string | null) => {
    const parsed = validators.cover.safeParse(cover);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const product = await updateProduct({ cover: parsed.data || undefined });
      toast.success(t('savedChangesTitle'), {
        description: t('coverUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateTags = async (tags: string[] | null) => {
    const parsed = validators.tags.safeParse(tags);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const product = await updateProduct({ tags: parsed.data || undefined });
      toast.success(t('savedChangesTitle'), {
        description: t('tagsUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateCategories = async (
    categories: Array<{ categoryId: string }>,
  ) => {
    try {
      const product = await updateProduct({ categories });
      toast.success(t('savedChangesTitle'), {
        description: t('categoriesUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateMedia = async (
    media: Array<{
      mediaType: string;
      position: number;
      url: string;
    }>,
  ) => {
    try {
      const product = await updateProduct({ media });
      toast.success(t('savedChangesTitle'), {
        description: t('mediaUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateSustainabilities = async (
    sustainabilities: Array<{
      certification: string;
      recycledPercentage: number;
    }>,
  ) => {
    const parsed = validators.sustainabilities.safeParse(sustainabilities);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const product = await updateProduct({ sustainabilities: parsed.data });
      toast.success(t('savedChangesTitle'), {
        description: t('sustainabilitiesUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  const updateProductType = async (productType: string) => {
    const parsed = validators.productType.safeParse(productType);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || t('unknownError'),
      };
    }
    try {
      const product = await updateProduct({
        productType: parsed.data as TypeEnum,
      });
      toast.success(t('savedChangesTitle'), {
        description: t('productTypeUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  /** Update multiple fields with validation - all or nothing approach */
  const updateMultipleFields = async (
    fieldsToUpdate: Record<string, unknown>,
  ) => {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    const validatedFields: ProductUpdate = {};
    const validationErrors: string[] = [];

    // Validate ALL fields first before making any update
    for (const [fieldName, fieldValue] of Object.entries(fieldsToUpdate)) {
      try {
        switch (fieldName) {
          case 'name':
            if (fieldValue !== undefined) {
              const parsed = validators.name.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Name: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                validatedFields.name = parsed.data;
              }
            }
            break;

          case 'shortDescription':
            if (fieldValue !== undefined) {
              const parsed = validators.shortDescription.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Short Description: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                validatedFields.shortDescription = parsed.data;
              }
            }
            break;

          case 'longDescription':
            if (fieldValue !== undefined) {
              const parsed = validators.longDescription.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Long Description: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                const value = parsed.data?.trim() === '' ? null : parsed.data;
                validatedFields.longDescription = value === null ? null : value;
              }
            }
            break;

          case 'brand':
            if (fieldValue !== undefined) {
              const parsed = validators.brand.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Brand: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                const value = parsed.data?.trim() === '' ? null : parsed.data;
                validatedFields.brand = value === null ? null : value;
              }
            }
            break;

          case 'manufacturer':
            if (fieldValue !== undefined) {
              const parsed = validators.manufacturer.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Manufacturer: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                const value = parsed.data?.trim() === '' ? null : parsed.data;
                validatedFields.manufacturer = value === null ? null : value;
              }
            }
            break;

          case 'cover':
            if (fieldValue !== undefined) {
              const parsed = validators.cover.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Cover: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                validatedFields.cover = parsed.data || undefined;
              }
            }
            break;

          case 'tags':
            if (fieldValue !== undefined) {
              const parsed = validators.tags.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Tags: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                validatedFields.tags = parsed.data || undefined;
              }
            }
            break;

          case 'productType':
            if (fieldValue !== undefined) {
              const parsed = validators.productType.safeParse(fieldValue);
              if (!parsed.success) {
                validationErrors.push(
                  `Product Type: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                validatedFields.productType = parsed.data as TypeEnum;
              }
            }
            break;

          case 'categories':
            if (fieldValue !== undefined) {
              validatedFields.categories = fieldValue as Array<{
                categoryId: string;
              }>;
            }
            break;

          case 'media':
            if (fieldValue !== undefined) {
              validatedFields.media = fieldValue as Array<{
                mediaType: string;
                position: number;
                url: string;
              }>;
            }
            break;

          case 'sustainabilities':
            if (fieldValue !== undefined) {
              // Clean __typename from sustainabilities objects and ensure proper types
              const cleanedSustainabilities = (
                fieldValue as Array<{
                  certification: string;
                  recycledPercentage: number | string;
                  __typename?: string;
                }>
              ).map((sustainability) => ({
                certification: sustainability.certification,
                recycledPercentage: Number(sustainability.recycledPercentage),
              }));

              // Validate sustainabilities
              const parsed = validators.sustainabilities.safeParse(
                cleanedSustainabilities,
              );
              if (!parsed.success) {
                validationErrors.push(
                  `Sustainabilities: ${parsed.error.issues[0]?.message || 'Invalid'}`,
                );
              } else {
                validatedFields.sustainabilities = parsed.data;
              }
            }
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

    // All validations passed - make single API call
    try {
      const product = await updateProduct(validatedFields);
      toast.success(t('savedChangesTitle'), {
        description: t('productUpdated'),
      });
      return { success: true, data: product };
    } catch (e: unknown) {
      return {
        success: false,
        error: errorToMessage(e, t('unknownError')),
      };
    }
  };

  return {
    validators,
    actions: {
      updateProduct, // Generic update function
      updateMultipleFields, // New bulk update function
      updateName,
      updateShortDescription,
      updateLongDescription,
      updateBrand,
      updateManufacturer,
      updateCover,
      updateTags,
      updateCategories,
      updateMedia,
      updateSustainabilities,
      updateProductType,
    },
  };
}

export default useUpdateProduct;
