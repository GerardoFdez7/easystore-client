'use client';

import VariantsFormField from '@molecules/products/product-detail/VariantsFormField';
import SustainabilityFormField from '@molecules/products/product-detail/SustainabilityFormField';
import NameFormField from '@molecules/products/product-detail/NameFormField';
import BrandManufacturerFormField from '@molecules/products/product-detail/BrandManufacturerFormField';
import ShortLongDescriptionFormField from '@molecules/products/product-detail/ShortLongDescriptionFormField';
import TypeProductFormField from '@molecules/products/product-detail/TypeProductFormField';
import MediaFormField from '@molecules/products/product-detail/MediaFormField';
import { Form } from '@shadcn/ui/form';
import TagsFormField from '@molecules/products/product-detail/TagsFormField';
import CategoryFormField from '@molecules/products/product-detail/CategoryFormField';
import SaveButton from '@atoms/shared/SaveButton';
import Options from '@molecules/shared/Options';
import { useProductForm } from '@hooks/domains/products';
import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';
import {
  useSoftDeleteProduct,
  useRestoreProduct,
  useDeleteProduct,
} from '@hooks/domains/products';
import { useState } from 'react';

interface MainProductDetailProps {
  param: string;
  isNew: boolean;
}

export default function MainProductDetail({
  param,
  isNew,
}: MainProductDetailProps) {
  const t = useTranslations('Products');
  const [hasMediaUploaded, setHasMediaUploaded] = useState(false);
  const { form, handleSubmit, isSubmitting, hasChanges, product } =
    useProductForm({
      productId: param,
      isNew,
    });

  const { handleSoftDelete, loading: archiveLoading } = useSoftDeleteProduct();
  const { handleRestore, loading: restoreLoading } = useRestoreProduct();
  const { handleDelete, loading: deleteLoading } = useDeleteProduct();

  const handleArchive = async () => {
    await handleSoftDelete(param);
  };

  const handleRestoreAction = async () => {
    await handleRestore(param);
  };

  const handleDeleteAction = async () => {
    await handleDelete(param);
  };

  const isArchived = product?.isArchived ?? false;

  const customOptions = isArchived
    ? [
        {
          id: 'restore',
          label: t('restoreProduct'),
          icon: RotateCcw,
          onClick: handleRestoreAction,
          disabled: restoreLoading,
        },
      ]
    : [];

  return (
    <main className="mx-4 flex max-w-screen-md justify-center lg:mx-auto lg:w-full">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit(handleSubmit)(e);
          }}
          className="w-full space-y-6"
        >
          {/* Main Content */}
          <Options
            options={customOptions}
            showArchive={!isArchived}
            onArchive={handleArchive}
            archiveTitle={t('archive')}
            archiveDescription={t('archiveDescriptionSingle')}
            showDelete={true}
            onDelete={handleDeleteAction}
            deleteTitle={t('deleteProduct')}
            deleteDescription={t('deleteDescriptionSingle')}
            disabled={archiveLoading || restoreLoading || deleteLoading}
          />
          <MediaFormField
            isSubmitting={isSubmitting}
            onMediaUploaded={setHasMediaUploaded}
          />
          <div className="w-full space-y-6 sm:flex sm:flex-row sm:gap-6">
            <NameFormField />
            <TypeProductFormField />
          </div>
          <ShortLongDescriptionFormField />
          <VariantsFormField productId={param} />
          <CategoryFormField name="categories" />
          <TagsFormField />
          <BrandManufacturerFormField />
          <SustainabilityFormField />

          <div className="flex justify-end">
            <SaveButton
              type="submit"
              loading={isSubmitting}
              disabled={
                isNew
                  ? isSubmitting || !hasMediaUploaded
                  : !hasChanges || isSubmitting
              }
              size="lg"
              translationKey={isNew ? 'add' : 'save'}
            />
          </div>
        </form>
      </Form>
    </main>
  );
}
