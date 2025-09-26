'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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

// Mock useVariant hook for testing purposes
function useVariant(props: MainVariantProps) {
  const form = useForm({
    defaultValues: {
      productId: props.productId,
      variantId: props.variantId,
      isNew: props.isNew,
      price: '',
      condition: '',
      attributes: [],
      height: '',
      width: '',
      length: '',
      sku: '',
      upc: '',
      ean: '',
      isbn: '',
      barcode: '',
      personalizationOptions: [],
      installmentPayments: [],
      warranties: [],
      isArchived: false,
    },
  });

  const handleSubmit = (data: unknown) => {
    console.log('Form submitted:', data);
  };

  const loading = false;

  return { form, handleSubmit, loading };
}

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
  const { form, handleSubmit, loading } = useVariant({
    productId,
    variantId,
    isNew,
  });
  return (
    <main className="mx-4 sm:mx-auto">
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(handleSubmit)(e);
            }}
            className="space-y-6"
          >
            <MediaUploader multiple={true} />
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
