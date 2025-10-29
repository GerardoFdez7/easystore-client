import React from 'react';
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
import { Trash2, Plus, Boxes } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import type { Variant } from '@lib/types/product';
import EmptyState from '@molecules/shared/EmptyState';

interface VariantsFormFieldProps {
  productId: string;
}

export default function VariantsFormField({
  productId,
}: VariantsFormFieldProps) {
  const { control } = useFormContext();
  const router = useRouter();
  const t = useTranslations('Products');
  const { variantsDraft, removeVariantDraft } = useProductCreation();

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

  return (
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
                {/* Hide ButtonAddVariant when variant count reaches 30 or no variants exist */}
                {actualVariantCount < 30 && actualHasVariants && (
                  <div className="sm:justify-end">
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
                      <TableRow>
                        <TableHead>{t('variants')}</TableHead>
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
                              <TableCell>${variant.price.toFixed(2)}</TableCell>
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
                            (variant: Variant) => (
                              <TableRow
                                key={variant.id}
                                className="cursor-pointer transition-colors"
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
                                <TableCell>{variant.price}</TableCell>
                                <TableCell>{variant.condition}</TableCell>
                              </TableRow>
                            ),
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
  );
}
