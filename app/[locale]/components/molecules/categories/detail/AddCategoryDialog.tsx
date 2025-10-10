'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
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
import { CategoryFormValues } from '@hooks/domains/category';
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
  const [internalOpen, setInternalOpen] = useState(false);
  const [hasMediaChanges, setHasMediaChanges] = useState(false);
  const mediaUploaderRef = useRef<MultipleMediaUploaderRef>(null);

  // Use external open state if provided, otherwise use internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  // Create local form for 'local' mode
  const schema = useMemo(() => buildCategorySchema(t, false), [t]);
  const localForm = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultCategoryFormValues,
    },
    ...defaultFormConfig,
  });

  // Media handling
  const handleMediaProcessed = async (processedData?: ProcessedData | null) => {
    if (processedData?.cover) {
      localForm.setValue('cover', processedData.cover, { shouldDirty: true });
      setHasMediaChanges(true);
    }
  };

  const handleMediaChange = () => {
    setHasMediaChanges(true);
  };

  const effectiveInitialMedia = localForm.watch('cover') || null;

  const onSubmit = async () => {
    try {
      // Local mode - call onAdd with form values
      const formValues = localForm.getValues();
      if (onAdd) {
        // Transform CategoryFormValues to NewCategoryData
        const newCategoryData: NewCategoryData = {
          name: formValues.name || '',
          cover: formValues.cover,
          description: formValues.description,
        };
        onAdd(newCategoryData);
      }
      setOpen(false);
      localForm.reset();
      setHasMediaChanges(false);
    } catch (_error) {}
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form when dialog closes
      localForm.reset();
      setHasMediaChanges(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || trigger || (
          <Button className={className}>
            <Plus className="h-4 w-4" />
            {t('addCategory')}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t('addCategory')}</DialogTitle>
          <DialogDescription>{t('addCategoryDescription')}</DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...localForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void onSubmit();
            }}
            className="space-y-6"
          >
            {/* Cover Image */}
            <FormField
              control={localForm.control}
              name="cover"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
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

            {/* Category Name */}
            <FormField
              control={localForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    {t('name')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('namePlaceholder')}
                      {...field}
                      aria-describedby="name-error"
                    />
                  </FormControl>
                  <FormMessage id="name-error" />
                </FormItem>
              )}
            />

            {/* Category Description */}
            <FormField
              control={localForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    {t('description')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
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
          </form>
        </Form>

        {/* Actions at the bottom-right */}
        <div className="flex justify-end">
          <FormActions
            onCancel={() => setOpen(false)}
            disabled={!hasMediaChanges}
            cancelText="cancel"
            saveText={'add'}
            saveButtonProps={{
              onClick: () => {
                void onSubmit();
              },
              type: 'submit',
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
