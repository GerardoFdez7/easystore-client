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
import { Trash2 } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import type { Variant } from '@lib/types/product';

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
    router.push(`/products/${productId}/variant/${variantId}`);
  };

  const handleDeleteDraft = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    removeVariantDraft(index);
  };

  return (
    <section className="w-full">
      <FormField
        control={control}
        name="variants"
        render={({ field: { value: variants = [] } }) => {
          // Combine saved variants with draft variants for new products
          const displayVariants = isNewProduct
            ? variantsDraft
            : (variants as Variant[]);
          const hasVariants = displayVariants.length > 0 || variants.length > 0;

          return (
            <FormItem>
              <div className="mb-4 flex items-center justify-between">
                <FormLabel className="text-lg font-semibold">
                  {t('variants')}
                </FormLabel>
                <ButtonAddVariant productId={productId} />
              </div>
              <FormControl>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-title text-center text-sm sm:text-[16px]">
                        {t('variants')}
                      </TableHead>
                      <TableHead className="text-title text-left text-sm sm:text-[16px]">
                        {t('price')}
                      </TableHead>
                      <TableHead className="text-title text-left text-sm sm:text-[16px]">
                        {t('condition')}
                      </TableHead>
                      {isNewProduct && (
                        <TableHead className="text-title text-center text-sm sm:text-[16px]">
                          {t('actions')}
                        </TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hasVariants ? (
                      <>
                        {/* Show draft variants for new products */}
                        {isNewProduct &&
                          variantsDraft.map((variant, index) => (
                            <TableRow
                              key={`draft-${index}`}
                              className="transition-colors"
                            >
                              <TableCell className="pl-5">
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
                                    <span className="text-foreground text-sm">
                                      {variant.attributes?.[0]?.key}:{' '}
                                      {variant.attributes?.[0]?.value}
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-foreground text-sm">
                                ${variant.price.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-foreground text-sm">
                                {variant.condition}
                              </TableCell>
                              <TableCell className="text-center">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    handleDeleteDraft(e, index);
                                  }}
                                  className="hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}

                        {/* Show saved variants for existing products */}
                        {!isNewProduct &&
                          (variants as Variant[]).map((variant: Variant) => (
                            <TableRow
                              key={variant.id}
                              className="cursor-pointer transition-colors"
                              onClick={() => {
                                handleRowClick(variant.id, false);
                              }}
                            >
                              <TableCell className="pl-5">
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
                                  <span className="text-foreground text-sm">
                                    {variant.attributes[0]?.key}:{' '}
                                    {variant.attributes[0]?.value}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-foreground text-sm">
                                {variant.price}
                              </TableCell>
                              <TableCell className="text-foreground text-sm">
                                {variant.condition}
                              </TableCell>
                            </TableRow>
                          ))}
                      </>
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={isNewProduct ? 4 : 3}
                          className="text-muted-foreground py-8 text-center"
                        >
                          {t('noVariants')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </section>
  );
}
