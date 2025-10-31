'use client';

import React, { useState, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';
import { Form } from '@shadcn/ui/form';
import PriceConditionFormField from '@molecules/products/variant/PriceConditionFormField';
import AttributesFormField from '@molecules/products/variant/AttributesFormField';
import DimensionsRow from '@molecules/products/variant/DimensionRowFormField';
import WeightFormField from '@molecules/products/variant/WeightFormField';
import CodesListFormField from '@molecules/products/variant/CodesListFormField';
import PersonalizationOptionsFormField from '@molecules/products/variant/PersonalizationOptionsFormField';
import InstallmentPaymentFormField from '@molecules/products/variant/InstallmentPaymentFormField';
import WarrantyFormField from '@molecules/products/variant/WarrantyFormField';
import SaveButton from '@atoms/shared/SaveButton';
import Options from '@molecules/shared/Options';
import {
  useVariantForm,
  useSoftDeleteVariant,
  useRestoreVariant,
  useDeleteVariant,
} from '@hooks/domains/products/variant';
import MediaFormField from '@molecules/products/product-detail/MediaFormField';
import { useVariantFromProducts } from '@contexts/ProductsContext';
import { useProductCreation } from '@contexts/ProductCreationContext';
import { useGetProductById } from '@hooks/domains/products';
import { TypeEnum } from '@graphql/generated';

interface MainVariantProps {
  productId: string;
  variantId?: string;
  isNew: boolean;
  isNewProduct?: boolean;
}

export default function MainVariant({
  productId,
  variantId,
  isNew,
  isNewProduct = false,
}: MainVariantProps) {
  const t = useTranslations('Variant');
  const { form, handleSubmit, isSubmitting, hasChanges } = useVariantForm({
    productId,
    variantId,
    isNew,
    isNewProduct,
  });

  const { handleSoftDelete, loading: archiveLoading } = useSoftDeleteVariant();
  const { handleRestore, loading: restoreLoading } = useRestoreVariant();
  const { handleDelete, loading: deleteLoading } = useDeleteVariant();

  // Local state to manage archive status for immediate UI updates
  const [localIsArchived, setLocalIsArchived] = useState<boolean | null>(null);

  // Get product data to check product type
  // For existing products, use direct product fetch; for new variants, use context
  const { product: existingProduct } = useGetProductById(
    !isNewProduct ? productId : '',
  );
  const { product: contextProduct } = useVariantFromProducts(variantId || '');
  const { productDraft } = useProductCreation();

  // Determine if the product is digital
  // Priority: productDraft (new products) > existingProduct (existing products) > contextProduct (fallback)
  const isDigitalProduct = isNewProduct
    ? productDraft?.productType === TypeEnum.Digital
    : (existingProduct?.productType ?? contextProduct?.productType) ===
      TypeEnum.Digital;

  // Get variant data to check if archived
  const variant = contextProduct?.variants?.find((v) => v.id === variantId);

  // Use local state if available, otherwise use variant data
  const isArchived =
    localIsArchived !== null ? localIsArchived : (variant?.isArchived ?? false);

  // Sync local state with server data when variant changes
  useEffect(() => {
    if (variant?.isArchived !== undefined) {
      setLocalIsArchived(variant.isArchived);
    }
  }, [variant?.isArchived]);

  // Count active (non-archived) variants to prevent deleting the last one
  const activeVariantsCount =
    contextProduct?.variants?.filter((v) => !v.isArchived).length ?? 0;
  const isLastActiveVariant = activeVariantsCount <= 1;

  const handleArchive = async () => {
    if (!variantId) return;
    // Optimistically update UI
    setLocalIsArchived(true);
    try {
      await handleSoftDelete(variantId, productId);
    } catch (_error) {
      // Revert on error
      setLocalIsArchived(false);
    }
  };

  const handleRestoreAction = async () => {
    if (!variantId) return;
    // Optimistically update UI
    setLocalIsArchived(false);
    try {
      await handleRestore(variantId, productId);
    } catch (_error) {
      // Revert on error
      setLocalIsArchived(true);
    }
  };

  const handleDeleteAction = async () => {
    if (!variantId) return;
    await handleDelete(variantId, productId);
  };

  const customOptions = isArchived
    ? [
        {
          id: 'restore',
          label: t('restoreVariant'),
          icon: RotateCcw,
          onClick: handleRestoreAction,
          disabled: restoreLoading,
        },
      ]
    : [];

  return (
    <>
      {/* Options Menu */}
      {!isNew && (
        <Options
          options={customOptions}
          showArchive={!isArchived}
          onArchive={handleArchive}
          archiveTitle={t('archiveVariant')}
          archiveDescription={t('archiveVariantDescription')}
          archiveDisabledTooltip={archiveLoading ? t('archiving') : undefined}
          showDelete={!isLastActiveVariant}
          onDelete={handleDeleteAction}
          deleteTitle={t('deleteVariant')}
          deleteDescription={
            isLastActiveVariant
              ? t('cannotDeleteLastVariant')
              : t('deleteVariantDescription')
          }
          deleteDisabledTooltip={
            isLastActiveVariant
              ? t('cannotDeleteLastVariantTooltip')
              : deleteLoading
                ? t('deleting')
                : undefined
          }
          disabled={archiveLoading || restoreLoading}
        />
      )}
      {/* Main Content */}
      <main className="mx-4 flex max-w-screen-md justify-center lg:mx-auto lg:w-full">
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void form.handleSubmit(handleSubmit)(e);
              }}
              className="w-full space-y-6"
            >
              <MediaFormField
                coverFieldName="variantCover"
                mediaFieldName="variantMedia"
                isSubmitting={isSubmitting}
              />
              <PriceConditionFormField />
              <AttributesFormField />
              {!isDigitalProduct && (
                <>
                  <DimensionsRow />
                  <WeightFormField />
                </>
              )}
              <CodesListFormField />
              <PersonalizationOptionsFormField />
              <InstallmentPaymentFormField />
              <WarrantyFormField />
              <div className="flex justify-end">
                <SaveButton
                  type="submit"
                  loading={isSubmitting}
                  disabled={isNew ? isSubmitting : !hasChanges || isSubmitting}
                  size="lg"
                  translationKey={isNew ? 'add' : 'save'}
                />
              </div>
            </form>
          </Form>
        </FormProvider>
      </main>
    </>
  );
}
