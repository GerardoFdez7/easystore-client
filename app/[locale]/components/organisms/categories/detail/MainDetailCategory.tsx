'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import { Field, FieldLabel, FieldError } from '@shadcn/ui/field';
import MediaUploader from '@organisms/shared/MediaUploader';
import CategoryPicker, {
  type CategoryItem,
} from '@molecules/categories/detail/CategoryPicker';
import SaveButton from '@atoms/shared/SaveButton';
import type { MultipleMediaUploaderRef } from '@molecules/shared/MultipleMediaUploader';
import type { ProcessedData } from '@lib/types/media';

interface MainDetailCategoryProps {
  categoryId?: string;
  isNew?: boolean;
  initialData?: CategoryFormData;
  catalog?: CategoryItem[];
  onSave?: (data: CategoryFormData) => Promise<void>;
}

type CategoryFormData = {
  name: string;
  description: string;
  cover: string;
  subcategories: CategoryItem[];
};

export default function MainDetailCategory({
  isNew = false,
  initialData,
  catalog = [],
  onSave,
}: MainDetailCategoryProps) {
  const t = useTranslations('CategoryDetail');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMediaChanges, setHasMediaChanges] = useState(false);
  const mediaUploaderRef = useRef<MultipleMediaUploaderRef>(null);

  // Initialize form with default values
  const form = useForm<CategoryFormData>({
    defaultValues: {
      name: '',
      description: '',
      cover: '',
      subcategories: [],
    },
  });

  const {
    formState: { isDirty, errors },
    watch,
    setValue,
    reset,
  } = form;

  // Watch form values for real-time updates
  const subcategories = watch('subcategories');

  // Handle media upload success
  const handleMediaProcessed = async (processedData?: ProcessedData) => {
    if (processedData?.urls && processedData.urls.length > 0) {
      setValue('cover', processedData.urls[0], { shouldDirty: true });
      setHasMediaChanges(false);
    }
  };

  // Handle media changes
  const handleMediaChange = (hasChanges: boolean) => {
    setHasMediaChanges(hasChanges);
  };

  // Handle adding subcategories
  const handleAddSubcategories = (ids: string[]) => {
    const newSubcategories = ids
      .map((id) => catalog.find((item) => item.id === id))
      .filter((item): item is CategoryItem => Boolean(item));

    setValue('subcategories', [...subcategories, ...newSubcategories], {
      shouldDirty: true,
    });
  };

  // Handle removing subcategory
  const handleRemoveSubcategory = (id: string) => {
    const updatedSubcategories = subcategories.filter((item) => item.id !== id);
    setValue('subcategories', updatedSubcategories, { shouldDirty: true });
  };

  // Form submission handler
  const onSubmit = async (formData: CategoryFormData) => {
    if (!isDirty && !hasMediaChanges) return;

    setIsSubmitting(true);
    try {
      // First, trigger media upload if there are media changes
      if (hasMediaChanges && mediaUploaderRef.current) {
        await new Promise<void>((resolve) => {
          const mediaUploader = mediaUploaderRef.current;
          if (mediaUploader) {
            mediaUploader.handleDoneWrapper();
            setTimeout(resolve, 1000);
          } else {
            resolve();
          }
        });
      }

      // Call the onSave callback if provided
      if (onSave) {
        await onSave(formData);
        reset(formData);
        setHasMediaChanges(false);
      }
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when initial data changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <main className="mx-4 md:mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
        role="form"
        aria-label={isNew ? t('addCategory') : t('editCategory')}
      >
        {/* Cover Image */}
        <Field>
          <FieldLabel htmlFor="cover-upload">{t('cover')}</FieldLabel>
          <MediaUploader
            ref={mediaUploaderRef}
            multiple={false}
            alwaysEditing={true}
            initialMedia={watch('cover') || null}
            onMediaProcessed={handleMediaProcessed}
            onMediaChange={handleMediaChange}
            acceptedFileTypes={['image/*']}
            aria-describedby="cover-error"
          />
          <FieldError id="cover-error">
            {!watch('cover') && errors.cover?.message}
          </FieldError>
        </Field>

        {/* Category Name */}
        <Field>
          <FieldLabel htmlFor="category-name">{t('name')}</FieldLabel>
          <Input
            id="category-name"
            placeholder={t('namePlaceholder')}
            {...form.register('name', {
              required: t('nameRequired'),
              maxLength: {
                value: 100,
                message: t('nameTooLong', { max: 100 }),
              },
            })}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby="name-error"
          />
          <FieldError id="name-error">{errors.name?.message}</FieldError>
        </Field>

        {/* Category Description */}
        <Field>
          <FieldLabel htmlFor="category-description">
            {t('description')}
          </FieldLabel>
          <Textarea
            id="category-description"
            placeholder={t('descriptionPlaceholder')}
            maxLength={200}
            {...form.register('description', {
              maxLength: {
                value: 200,
                message: t('descriptionTooLong', { max: 200 }),
              },
              minLength: {
                value: 10,
                message: t('descriptionTooShort', { min: 10 }),
              },
            })}
            aria-invalid={errors.description ? 'true' : 'false'}
            aria-describedby="description-error"
          />
          <FieldError id="description-error">
            {errors.description?.message}
          </FieldError>
        </Field>

        {/* Subcategories */}
        <Field>
          <FieldLabel>{t('subcategories')}</FieldLabel>
          <CategoryPicker
            items={subcategories}
            catalog={catalog}
            disabled={isSubmitting}
            onAdd={handleAddSubcategories}
            onRemove={handleRemoveSubcategory}
          />
        </Field>

        {/* Save Button */}
        <div className="flex justify-end">
          <SaveButton
            type="submit"
            loading={isSubmitting}
            disabled={(!isDirty && !hasMediaChanges) || isSubmitting}
            size="lg"
            translationKey={isNew ? 'create' : 'save'}
            aria-describedby="save-button-status"
          />
        </div>

        {/* Screen reader status for save button */}
        <div id="save-button-status" className="sr-only" aria-live="polite">
          {isSubmitting && 'Saving category...'}
          {!isDirty && !hasMediaChanges && 'No changes to save'}
        </div>
      </form>
    </main>
  );
}
