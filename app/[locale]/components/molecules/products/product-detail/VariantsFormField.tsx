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
import type { Variant } from '@lib/utils/types/product';

interface VariantsFormFieldProps {
  productId: string;
}

export default function VariantsFormField({
  productId,
}: VariantsFormFieldProps) {
  const { control } = useFormContext();
  const router = useRouter();
  const t = useTranslations('Products');

  const handleRowClick = (variantId: string) => {
    router.push(`/products/${productId}/variant/${variantId}`);
  };

  return (
    <section className="w-full">
      <FormField
        control={control}
        name="variants"
        render={({ field: { value: variants = [] } }) => (
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
                    <TableHead className="text-title text-center">
                      {t('variants')}
                    </TableHead>
                    <TableHead className="text-title text-left">
                      {t('price')}
                    </TableHead>
                    <TableHead className="text-title text-left">
                      {t('condition')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variants.length > 0 ? (
                    variants.map((variant: Variant) => (
                      <TableRow
                        key={variant.id}
                        className="cursor-pointer transition-colors"
                        onClick={() => handleRowClick(variant.id)}
                      >
                        <TableCell className="pl-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-lg">
                              <Image
                                src={variant.variantCover ?? '/default.webp'}
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
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
        )}
      />
    </section>
  );
}
