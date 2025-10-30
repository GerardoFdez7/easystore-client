'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
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
import { useVariantForm } from '@hooks/domains/products/variant';
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
  const { form, handleSubmit, isSubmitting, hasChanges } = useVariantForm({
    productId,
    variantId,
    isNew,
    isNewProduct,
  });

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

  return (
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
  );
}
