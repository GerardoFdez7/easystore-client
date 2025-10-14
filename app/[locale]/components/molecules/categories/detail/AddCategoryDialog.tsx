'use client';

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { CategoryFormValues } from '@hooks/domains/category';
import { Plus } from 'lucide-react';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import { Button } from '@shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/ui/dialog';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@shadcn/ui/form';
import { Separator } from '@shadcn/ui/separator';
import FormActions from '@molecules/shared/FormActions';
import MediaUploader from '@organisms/shared/MediaUploader';
import type { MultipleMediaUploaderRef } from '@molecules/shared/MultipleMediaUploader';
import type { ProcessedData } from '@lib/types/media';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  buildCategorySchema,
  defaultCategoryFormValues,
  defaultFormConfig,
} from '@hooks/domains/category/categoryValidation';

// Type for new category data that matches CategoryPicker expectations
export type NewCategoryData = {
  name: string;
  cover?: string;
  description?: string;
};

interface AddCategoryDialogProps {
  parentId?: string;
  onSuccess?: (category: CategoryFormValues) => void;
  onAdd?: (category: NewCategoryData) => void;
  trigger?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AddCategoryDialog({
  onAdd,
  trigger,
  className,
  children,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: AddCategoryDialogProps) {
  const t = useTranslations('CategoryDetail');

  // State management
  const [internalOpen, setInternalOpen] = useState(false);
  const [hasMediaChanges, setHasMediaChanges] = useState(false);

  // Refs
  const mediaUploaderRef = useRef<MultipleMediaUploaderRef>(null);

  // Computed values
  const open = useMemo(() => {
    return externalOpen !== undefined ? externalOpen : internalOpen;
  }, [externalOpen, internalOpen]);

  const setOpen = useMemo(() => {
    return externalOnOpenChange || setInternalOpen;
  }, [externalOnOpenChange]);

  // Form setup
  const schema = useMemo(() => buildCategorySchema(t, false), [t]);
  const localForm = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultCategoryFormValues,
    },
    ...defaultFormConfig,
  });

  const {
    formState: { isDirty, errors },
    watch,
    setValue,
    getValues,
    reset,
  } = localForm;

  // Watch values
  const effectiveInitialMedia = watch('cover') || null;

  // Event handlers
  const handleMediaProcessed = useCallback(
    async (processedData?: ProcessedData | null) => {
      if (processedData?.cover) {
        setValue('cover', processedData.cover, { shouldDirty: true });
        setHasMediaChanges(true);
      }
    },
    [setValue],
  );

  const handleMediaChange = useCallback(() => {
    setHasMediaChanges(true);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      const formValues = getValues();
      if (onAdd) {
        const newCategoryData: NewCategoryData = {
          name: formValues.name || '',
          cover: formValues.cover,
          description: formValues.description,
        };
        onAdd(newCategoryData);
      }
      setOpen(false);
      reset();
      setHasMediaChanges(false);
    } catch (_error) {
      // Error handling is managed by the error registry
    }
  }, [getValues, onAdd, setOpen, reset]);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      if (!newOpen) {
        reset();
        setHasMediaChanges(false);
      }
    },
    [setOpen, reset],
  );

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSave = useCallback(() => {
    void onSubmit();
  }, [onSubmit]);

  // Computed values for accessibility and UI
  const canSave = useMemo(() => {
    return isDirty || hasMediaChanges;
  }, [isDirty, hasMediaChanges]);

  const defaultTrigger = useMemo(
    () => (
      <Button className={className} aria-label={t('addCategory')}>
        <Plus className="h-4 w-4" aria-hidden="true" />
        {t('addCategory')}
      </Button>
    ),
    [className, t],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px]"
        aria-describedby="add-category-description"
      >
        <DialogHeader>
          <DialogTitle id="add-category-title">{t('addCategory')}</DialogTitle>
          <DialogDescription id="add-category-description">
            {t('addCategoryDescription')}
          </DialogDescription>
        </DialogHeader>

        <Separator role="separator" aria-hidden="true" />

        <Form {...localForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void onSubmit();
            }}
            className="space-y-6"
            role="form"
            aria-labelledby="add-category-title"
            aria-describedby="add-category-description"
          >
            {/* Cover Image Section */}
            <section>
              <FormField
                control={localForm.control}
                name="cover"
                render={() => (
                  <FormItem>
                    <FormLabel
                      htmlFor="cover-upload"
                      className="text-sm font-medium"
                    >
                      {t('cover')}
                    </FormLabel>
                    <FormControl>
                      <MediaUploader
                        ref={mediaUploaderRef}
                        alwaysEditing={true}
                        initialMedia={effectiveInitialMedia}
                        onMediaProcessed={handleMediaProcessed}
                        onMediaChange={handleMediaChange}
                        acceptedFileTypes={[
                          'image/jpeg',
                          'image/png',
                          'image/webp',
                        ]}
                        aria-describedby="cover-error"
                      />
                    </FormControl>
                    <FormMessage id="cover-error" />
                  </FormItem>
                )}
              />
            </section>

            {/* Category Name Section */}
            <section>
              <FormField
                control={localForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="category-name"
                      className="text-sm font-medium"
                    >
                      {t('name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="category-name"
                        placeholder={t('namePlaceholder')}
                        {...field}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby="name-error"
                      />
                    </FormControl>
                    <FormMessage id="name-error" />
                  </FormItem>
                )}
              />
            </section>

            {/* Category Description Section */}
            <section>
              <FormField
                control={localForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="category-description"
                      className="text-sm font-medium"
                    >
                      {t('description')}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="category-description"
                        placeholder={t('descriptionPlaceholder')}
                        maxLength={200}
                        {...field}
                        aria-describedby="description-error"
                        className="h-53 sm:h-auto"
                      />
                    </FormControl>
                    <FormMessage id="description-error" />
                  </FormItem>
                )}
              />
            </section>
          </form>
        </Form>

        {/* Actions Section */}
        <footer className="flex justify-end">
          <FormActions
            onCancel={handleCancel}
            disabled={!canSave}
            cancelText="cancel"
            saveText="add"
            saveButtonProps={{
              onClick: handleSave,
              type: 'button',
              'aria-describedby': 'save-button-status',
            }}
          />
        </footer>

        {/* Screen reader status */}
        <div
          id="save-button-status"
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {!canSave}
        </div>
      </DialogContent>
    </Dialog>
  );
}
