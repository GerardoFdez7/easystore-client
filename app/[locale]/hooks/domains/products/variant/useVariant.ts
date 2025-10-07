import React from 'react';
import { useForm } from 'react-hook-form';
import { useVariantFromProducts } from '@lib/contexts/ProductsContext';
import { useUpdateVariant } from './useUpdateVariant';

interface UseVariantProps {
  productId: string;
  variantId?: string;
  isNew: boolean;
}

type VariantFormData = {
  productId: string;
  variantId?: string;
  isNew: boolean;
  price: string;
  condition: string;
  attributes: Array<{ key: string; value: string }>;
  dimensions: {
    height: string;
    width: string;
    length: string;
  };
  weight: string;
  codes: {
    sku: string;
    upc: string;
    ean: string;
    isbn: string;
    barcode: string;
  };
  personalizationOptions: string[];
  installmentPayments: Array<{
    months: number;
    interestRate: number;
  }>;
  warranties: Array<{
    months: number;
    coverage: string;
    instructions: string;
  }>;
  variantCover: string;
  variantMedia: string[];
  isArchived: boolean;
};

export function useVariant({ productId, variantId, isNew }: UseVariantProps) {
  // Get variant data from the products context
  const {
    variant,
    product,
    loading: contextLoading,
    error: contextError,
  } = useVariantFromProducts(variantId || '');

  // Initialize update variant hook if not new
  const updateVariantHook = useUpdateVariant(variantId, productId);

  // Create form with default values based on context data
  const form = useForm<VariantFormData>({
    defaultValues: {
      productId,
      variantId,
      isNew,
      price: variant?.price?.toString() || '',
      condition: variant?.condition || '',
      attributes:
        variant?.attributes?.map((attr) => ({
          key: attr.key,
          value: attr.value,
        })) || [],
      dimensions: {
        height: variant?.dimension?.height?.toString() || '',
        width: variant?.dimension?.width?.toString() || '',
        length: variant?.dimension?.length?.toString() || '',
      },
      weight: variant?.weight?.toString() || '',
      codes: {
        sku: variant?.sku || '',
        upc: variant?.upc || '',
        ean: variant?.ean || '',
        isbn: variant?.isbn || '',
        barcode: variant?.barcode || '',
      },
      personalizationOptions: variant?.personalizationOptions || [],
      installmentPayments:
        variant?.installmentPayments?.map((payment) => ({
          months: payment.months,
          interestRate: payment.interestRate,
        })) || [],
      warranties:
        variant?.warranties?.map((warranty) => ({
          months: warranty.months,
          coverage: warranty.coverage,
          instructions: warranty.instructions,
        })) || [],
      variantCover: variant?.variantCover || '',
      variantMedia: variant?.variantMedia?.map((media) => media.url) || [],
      isArchived: variant?.isArchived || false,
    },
  });

  // Reset form when variant data changes
  React.useEffect(() => {
    if (variant && !isNew) {
      form.reset({
        productId,
        variantId,
        isNew,
        price: variant.price?.toString() || '',
        condition: variant.condition || '',
        attributes:
          variant.attributes?.map((attr) => ({
            key: attr.key,
            value: attr.value,
          })) || [],
        dimensions: {
          height: variant.dimension?.height?.toString() || '',
          width: variant.dimension?.width?.toString() || '',
          length: variant.dimension?.length?.toString() || '',
        },
        weight: variant.weight?.toString() || '',
        codes: {
          sku: variant.sku || '',
          upc: variant.upc || '',
          ean: variant.ean || '',
          isbn: variant.isbn || '',
          barcode: variant.barcode || '',
        },
        personalizationOptions: variant.personalizationOptions || [],
        installmentPayments:
          variant.installmentPayments?.map((payment) => ({
            months: payment.months,
            interestRate: payment.interestRate,
          })) || [],
        warranties:
          variant.warranties?.map((warranty) => ({
            months: warranty.months,
            coverage: warranty.coverage,
            instructions: warranty.instructions,
          })) || [],
        variantCover: variant.variantCover || '',
        variantMedia: variant.variantMedia?.map((media) => media.url) || [],
        isArchived: variant.isArchived || false,
      });
    }
  }, [variant, isNew, form, productId, variantId]);

  const handleSubmit = async (data: VariantFormData) => {
    try {
      if (isNew) {
        // Handle new variant creation
        console.log('Creating new variant:', data);
        // Implement creation logic here
      } else if (updateVariantHook) {
        // Handle variant update
        console.log('Updating variant:', data);
        // Use updateVariantHook.updateVariant(data);
      }
    } catch (error) {
      console.error('Error saving variant:', error);
    }
  };

  const loading = contextLoading || (updateVariantHook?.loading ?? false);
  const error = contextError || updateVariantHook?.error;

  return {
    form,
    handleSubmit,
    loading,
    error,
    variant,
    product,
  };
}
