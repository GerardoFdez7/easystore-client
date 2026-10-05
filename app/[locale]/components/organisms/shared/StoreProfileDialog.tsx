'use client';

import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shadcn/ui/form';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import SingleMediaUploader from '@molecules/shared/SingleMediaUploader';
import { useUnsavedChangesToast } from '@hooks/utils/useUnsavedChangesToast';
import { useDeferredUpload } from '@hooks/media/useDeferredUpload';
import { useUpdateStore } from '@hooks/domains/store/useUpdateStore';
import {
  buildStoreSchema,
  type StoreFormValues,
} from '@hooks/domains/store/storeValidation';
import { CURRENCY_CODES } from '@lib/consts/currencies';
import {
  DefaultAcceptedFileTypes,
  DefaultMaxImageSize,
  DefaultVideoSize,
} from '@lib/consts/media-uploader';
import type { ProcessedData } from '@lib/types/media';
import type { CurrentStore, StoreProfileDialogProps } from '@lib/types/store';

const LOGO_FILE_TYPES = DefaultAcceptedFileTypes.filter((type) =>
  type.startsWith('image/'),
);

const toFormValues = (store: CurrentStore): StoreFormValues => ({
  name: store.name ?? '',
  description: store.description ?? '',
  domain: store.domain ?? '',
  currency: store.currency,
  logo: store.logo ?? '',
});

/** Cleared optional fields are sent as null so the backend removes them. */
const orNull = (value: string) => (value === '' ? null : value);

function StoreProfileForm({ store }: { store: CurrentStore }) {
  const t = useTranslations('StoreProfile');
  const { updateStore, isUpdating } = useUpdateStore();
  const { uploadFile, isUploading } = useDeferredUpload(toast.error);
  // Logo picked but not uploaded yet: it goes to ImageKit only when saved.
  const [pendingLogo, setPendingLogo] = useState<File | null>(null);
  // Remounts the uploader so it drops a discarded or already saved preview.
  const [uploaderKey, setUploaderKey] = useState(0);

  const schema = useMemo(() => buildStoreSchema(t), [t]);
  const form = useForm<StoreFormValues>({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(store),
  });
  const { isDirty } = form.formState;

  const resetUploader = useCallback(() => {
    setPendingLogo(null);
    setUploaderKey((key) => key + 1);
  }, []);

  const handleCancel = useCallback(() => {
    form.reset(toFormValues(store));
    resetUploader();
  }, [form, store, resetUploader]);

  const handleSave = useCallback(
    () =>
      void form.handleSubmit(async (values) => {
        let logo = values.logo;
        if (pendingLogo) {
          const url = await uploadFile(pendingLogo);
          if (!url) return;
          logo = url;
        }
        const saved = await updateStore({
          name: orNull(values.name),
          description: orNull(values.description),
          domain: orNull(values.domain.toLowerCase()),
          currency: values.currency,
          logo: orNull(logo),
        });
        if (!saved.store) {
          if (saved.domainTaken) {
            form.setError('domain', { message: t('domainTaken') });
          }
          return;
        }
        form.reset(toFormValues(saved.store));
        resetUploader();
        toast.success(t('saved'));
      })(),
    [form, pendingLogo, uploadFile, updateStore, resetUploader, t],
  );

  useUnsavedChangesToast({
    id: 'store-profile-unsaved-changes',
    isDirty: isDirty || pendingLogo !== null,
    isSaving: isUploading || isUpdating,
    message: t('unsavedChanges'),
    saveLabel: t('save'),
    cancelLabel: t('cancel'),
    onSave: handleSave,
    onCancel: handleCancel,
  });

  const handleLogoProcessed = async (data?: ProcessedData | null) => {
    form.setValue('logo', data?.cover ?? '', {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="gap-card flex flex-col"
        noValidate
      >
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('logo')}</FormLabel>
              <FormControl>
                <SingleMediaUploader
                  key={uploaderKey}
                  alwaysEditing
                  reportRemoval
                  deferUpload
                  onFileChange={setPendingLogo}
                  dropZoneTitle={t('uploadLogo')}
                  transparentPreview
                  initialMedia={field.value || null}
                  onMediaProcessed={handleLogoProcessed}
                  onUploadError={(message) => toast.error(message)}
                  acceptedFileTypes={LOGO_FILE_TYPES}
                  maxImageSize={DefaultMaxImageSize}
                  maxVideoSize={DefaultVideoSize}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="gap-card grid grid-cols-1 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('namePlaceholder')}
                    aria-invalid={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('currency')}</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={!!fieldState.error}
                    >
                      <SelectValue placeholder={t('selectCurrency')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CURRENCY_CODES.map((code) => (
                      <SelectItem key={code} value={code}>
                        {code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="domain"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('domain')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('domainPlaceholder')}
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('description')}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t('descriptionPlaceholder')}
                  maxLength={2000}
                  className="min-h-24 resize-none"
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

/**
 * Dialog with every editable store attribute. Edits stay pending until saved
 * from the unsaved-changes toast; closing the dialog discards them.
 */
export default function StoreProfileDialog({
  store,
  children,
}: StoreProfileDialogProps) {
  const t = useTranslations('StoreProfile');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-h-screen overflow-y-auto sm:max-w-150"
        // Only the overlay click or the X button close it: the save/cancel toast lives
        // outside the dialog, so interacting with it must not count as "outside".
        onPointerDownOutside={(event) => {
          const onOverlay =
            event.target instanceof Element &&
            event.target.closest('[data-slot="dialog-overlay"]');
          if (!onOverlay) event.preventDefault();
        }}
        onFocusOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <StoreProfileForm store={store} />
      </DialogContent>
    </Dialog>
  );
}
