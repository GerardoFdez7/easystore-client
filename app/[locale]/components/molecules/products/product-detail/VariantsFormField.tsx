import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import ButtonAddVariant from '@atoms/products/product-detail/ButtonAddVariant';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useProductCreation } from '@lib/contexts/ProductCreationContext';
import { Trash2, Plus, Boxes, Archive, RotateCcw } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@shadcn/ui/alert-dialog';
import type { Variant } from '@lib/types/product';
import EmptyState from '@molecules/shared/EmptyState';
import {
  useSoftDeleteVariant,
  useRestoreVariant,
  useDeleteVariant,
} from '@hooks/domains/products/variant';
import { formatPriceWithCommasAndDots } from '@lib/utils/input-formatters';

interface VariantsFormFieldProps {
  productId: string;
}

export default function VariantsFormField({
  productId,
}: VariantsFormFieldProps) {
  const { control } = useFormContext();
  const router = useRouter();
  const t = useTranslations('Products');
  const tVariant = useTranslations('Variant');
  const { variantsDraft, removeVariantDraft } = useProductCreation();

  const { handleSoftDelete, loading: archiveLoading } = useSoftDeleteVariant();
  const { handleRestore, loading: restoreLoading } = useRestoreVariant();
  const { handleDelete, loading: deleteLoading } = useDeleteVariant();

  const [selectedVariant, setSelectedVariant] = useState<{
    id: string;
    action: 'archive' | 'restore' | 'delete';
  } | null>(null);

  // Determine if we're creating a new product
  const isNewProduct =
    productId === 'new' ||
    (typeof window !== 'undefined' &&
      window.location.pathname.includes('/products/new'));

  const handleRowClick = (variantId: string, isDraft: boolean) => {
    if (isDraft) {
      // For draft variants, we could implement edit functionality later
      return;
    }
    router.push(`/products/${productId}/${variantId}`);
  };

  const handleDeleteDraft = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    removeVariantDraft(index);
  };

  const handleAddVariant = () => {
    if (isNewProduct) {
      router.push('/products/new/add');
    } else {
      router.push(`/products/${productId}/new/add`);
    }
  };

  const handleArchiveClick = (
    e: React.MouseEvent,
    variantId: string,
    isArchived: boolean,
  ) => {
    e.stopPropagation();
    setSelectedVariant({
      id: variantId,
      action: isArchived ? 'restore' : 'archive',
    });
  };

  const handleDeleteClick = (e: React.MouseEvent, variantId: string) => {
    e.stopPropagation();
    setSelectedVariant({
      id: variantId,
      action: 'delete',
    });
  };

  const handleConfirmAction = async () => {
    if (!selectedVariant) return;

    const { id, action } = selectedVariant;

    try {
      if (action === 'archive') {
        await handleSoftDelete(id, productId);
      } else if (action === 'restore') {
        await handleRestore(id, productId);
      } else if (action === 'delete') {
        await handleDelete(id, productId);
      }
      setSelectedVariant(null);
    } catch (_error) {
      // Error handled by error handler
    }
  };

  const handleConfirmActionClick = () => {
    void handleConfirmAction();
  };

  const handleCancelAction = () => {
    setSelectedVariant(null);
  };

  const isActionLoading = archiveLoading || restoreLoading || deleteLoading;

  // Count active variants to prevent deleting the last one
  const getActiveVariantsCount = (variants: Variant[]) => {
    return variants.filter((v) => !v.isArchived).length;
  };

  return (
    <>
      <FormField
        control={control}
        name="variants"
        render={({ field }) => {
          const existingVariants = field.value || [];
          const actualHasVariants = isNewProduct
            ? variantsDraft.length > 0
            : existingVariants.length > 0;
          const actualVariantCount = isNewProduct
            ? variantsDraft.length
            : existingVariants.length;

          return (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                {t('variants')}
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {/* Hide ButtonAddVariant when variant count reaches 20 or no variants exist */}
                  {actualVariantCount <= 20 && actualHasVariants && (
                    <div className="flex sm:justify-end">
                      <ButtonAddVariant productId={productId} />
                    </div>
                  )}

                  {/* Replace empty state with EmptyState component */}
                  {!actualHasVariants ? (
                    <EmptyState
                      icon={Boxes}
                      title={t('noVariantsTitle')}
                      description={t('noVariantsDescription')}
                      buttonText={t('createFirstVariant')}
                      onButtonClick={handleAddVariant}
                      buttonIcon={Plus}
                    />
                  ) : (
                    /* Hide variants table when no variants exist */
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-background">
                          <TableHead>{t('variants')}</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>{t('price')}</TableHead>
                          <TableHead>{t('condition')}</TableHead>
                          <TableHead>{t('actions')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isNewProduct
                          ? variantsDraft.map((variant, index) => (
                              <TableRow
                                key={`draft-${index}`}
                                className="transition-colors"
                              >
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 overflow-hidden rounded-lg">
                                      <Image
                                        src={
                                          variant.variantCover &&
                                          variant.variantCover.trim() !== ''
                                            ? variant.variantCover
                                            : '/default.webp'
                                        }
                                        alt={
                                          variant.attributes?.[0]?.value ||
                                          'Variant Image'
                                        }
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <span>
                                        {variant.attributes?.[0]?.key}:{' '}
                                        {variant.attributes?.[0]?.value}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>{variant.codes.sku}</TableCell>
                                <TableCell>
                                  {process.env.NEXT_PUBLIC_DEFAULT_CURRENCY}
                                  {formatPriceWithCommasAndDots(variant.price)}
                                </TableCell>
                                <TableCell>{variant.condition}</TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      handleDeleteDraft(e, index);
                                    }}
                                    className="hover:bg-destructive/10 hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          : /* Show saved variants for existing products */
                            (existingVariants as Variant[]).map(
                              (variant: Variant) => {
                                const isArchived = variant.isArchived ?? false;
                                const activeVariantsCount =
                                  getActiveVariantsCount(
                                    existingVariants as Variant[],
                                  );
                                const isLastActiveVariant =
                                  !isArchived && activeVariantsCount <= 1;

                                return (
                                  <TableRow
                                    key={variant.id}
                                    className={`cursor-pointer transition-colors ${
                                      isArchived ? 'opacity-30' : ''
                                    }`}
                                    onClick={() => {
                                      handleRowClick(variant.id, false);
                                    }}
                                  >
                                    <TableCell>
                                      <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 overflow-hidden rounded-lg">
                                          <Image
                                            src={
                                              variant.variantCover &&
                                              variant.variantCover.trim() !== ''
                                                ? variant.variantCover
                                                : '/default.webp'
                                            }
                                            alt={
                                              variant.attributes[0]?.value ||
                                              'Variant Image'
                                            }
                                            width={40}
                                            height={40}
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                        <span>
                                          {variant.attributes[0]?.key}:{' '}
                                          {variant.attributes[0]?.value}
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell>{variant.sku}</TableCell>
                                    <TableCell>
                                      {process.env.NEXT_PUBLIC_DEFAULT_CURRENCY}
                                      {formatPriceWithCommasAndDots(
                                        variant.price,
                                      )}
                                    </TableCell>
                                    <TableCell>{variant.condition}</TableCell>
                                    <TableCell>
                                      <div
                                        onClick={(e) => {
                                          e.stopPropagation();
                                        }}
                                      >
                                        {isArchived ? (
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                  handleArchiveClick(
                                                    e,
                                                    variant.id,
                                                    true,
                                                  );
                                                }}
                                                disabled={isActionLoading}
                                                className="hover:bg-primary/10 hover:text-primary"
                                              >
                                                <RotateCcw className="h-4 w-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              {tVariant('restoreVariant')}
                                            </TooltipContent>
                                          </Tooltip>
                                        ) : (
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                  handleArchiveClick(
                                                    e,
                                                    variant.id,
                                                    false,
                                                  );
                                                }}
                                                disabled={isActionLoading}
                                                className="hover:bg-warning/10 hover:text-warning"
                                              >
                                                <Archive className="h-4 w-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              {tVariant('archiveVariant')}
                                            </TooltipContent>
                                          </Tooltip>
                                        )}

                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="icon"
                                              onClick={(e) => {
                                                handleDeleteClick(
                                                  e,
                                                  variant.id,
                                                );
                                              }}
                                              disabled={
                                                isLastActiveVariant ||
                                                isActionLoading
                                              }
                                              className="hover:bg-destructive/10 hover:text-destructive"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            {isLastActiveVariant
                                              ? tVariant(
                                                  'cannotDeleteLastVariantTooltip',
                                                )
                                              : tVariant('deleteVariant')}
                                          </TooltipContent>
                                        </Tooltip>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                );
                              },
                            )}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* Confirmation Dialog */}
      {selectedVariant && (
        <AlertDialog
          open={selectedVariant !== null}
          onOpenChange={(open) => {
            if (!open) {
              handleCancelAction();
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {selectedVariant.action === 'archive' &&
                  tVariant('archiveVariant')}
                {selectedVariant.action === 'restore' &&
                  tVariant('restoreVariant')}
                {selectedVariant.action === 'delete' &&
                  tVariant('deleteVariant')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {selectedVariant.action === 'archive' &&
                  tVariant('archiveVariantDescription')}
                {selectedVariant.action === 'delete' &&
                  tVariant('deleteVariantDescription')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={handleCancelAction}
                disabled={archiveLoading || restoreLoading || deleteLoading}
              >
                {t('cancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmActionClick}
                disabled={archiveLoading || restoreLoading || deleteLoading}
                className={
                  selectedVariant.action === 'delete'
                    ? 'bg-destructive hover:bg-destructive/90'
                    : ''
                }
              >
                {(archiveLoading || restoreLoading || deleteLoading) &&
                  t('processing')}
                {!archiveLoading &&
                  !restoreLoading &&
                  !deleteLoading &&
                  selectedVariant.action === 'archive' &&
                  tVariant('archiveVariant')}
                {!archiveLoading &&
                  !restoreLoading &&
                  !deleteLoading &&
                  selectedVariant.action === 'restore' &&
                  tVariant('restoreVariant')}
                {!archiveLoading &&
                  !restoreLoading &&
                  !deleteLoading &&
                  selectedVariant.action === 'delete' &&
                  tVariant('deleteVariant')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
