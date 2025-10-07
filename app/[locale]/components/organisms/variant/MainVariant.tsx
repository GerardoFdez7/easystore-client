'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import MediaUploader from '@organisms/shared/MediaUploader';
import PriceConditionFormField from '@molecules/variant/PriceConditionFormField';
import AttributesFormField from '@molecules/variant/AttributesFormField';
import DimensionsRow from '@molecules/variant/DimensionRowFormField';
import CodesListFormField from '@molecules/variant/CodesListFormField';
import PersonalizationOptionsFormField from '@molecules/variant/PersonalizationOptionsFormField';
import InstallmentPaymentFormField from '@molecules/variant/InstallmentPaymentFormField';
import WarrantyFormField from '@molecules/variant/WarrantyFormField';
import SaveButton from '@atoms/shared/SaveButton';
import { useVariant } from '@hooks/domains/products/variant';

interface MainVariantProps {
  productId: string;
  variantId?: string;
  isNew: boolean;
}

export default function MainVariant({
  productId,
  variantId,
  isNew,
}: MainVariantProps) {
  const { form, handleSubmit, loading, variant } = useVariant({
    productId,
    variantId,
    isNew,
  });

  return (
    <main className="mx-4 flex max-w-screen-md justify-center lg:mx-auto lg:w-full">
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(handleSubmit)(e);
            }}
            className="space-y-6"
          >
            <MediaUploader
              multiple={true}
              initialMedia={
                variant?.variantMedia?.map((media) => media.url) || []
              }
            />
            <PriceConditionFormField />
            <AttributesFormField />
            <DimensionsRow />
            <CodesListFormField />
            <PersonalizationOptionsFormField />
            <InstallmentPaymentFormField />
            <WarrantyFormField />
            <div className="flex justify-end">
              <SaveButton type="submit" loading={loading} size="lg" />
            </div>
          </form>
        </Form>
      </FormProvider>
    </main>
  );
}
