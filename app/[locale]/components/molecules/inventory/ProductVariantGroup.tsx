'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { Badge } from '@shadcn/ui/badge';
import { Button } from '@shadcn/ui/button';
import { Package, ChevronRight } from 'lucide-react';

interface Variant {
  id: string;
  sku: string;
  attributes: Array<{
    key: string;
    value: string;
  }>;
}

interface ProductVariantGroupProps {
  productName: string;
  variants: Variant[];
  onVariantSelect: (
    variantId: string,
    sku: string,
    productName: string,
    attributes: Array<{ key: string; value: string }>,
  ) => void;
  selectedVariantId?: string;
}

const ProductVariantGroup: FC<ProductVariantGroupProps> = ({
  productName,
  variants,
  onVariantSelect,
  selectedVariantId,
}) => {
  const t = useTranslations('Inventory.AddStock');

  const formatVariantAttributes = (variant: Variant) => {
    return variant.attributes
      .map((attr) => `${attr.key}: ${attr.value}`)
      .join(', ');
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-title flex items-center gap-2 text-lg">
          <Package className="h-5 w-5" />
          {productName}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs">
            {t('variantCount', { count: variants.length })}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className={`hover:bg-muted/50 flex flex-col rounded-lg border p-3 transition-colors sm:flex-row sm:items-center sm:justify-between ${
              selectedVariantId === variant.id
                ? 'border-title bg-title/5'
                : 'border-border'
            }`}
          >
            <div className="flex-1">
              <p className="text-sm font-medium">
                {formatVariantAttributes(variant)}
              </p>
              {variant.sku && (
                <p className="text-muted-foreground text-xs">
                  SKU: {variant.sku}
                </p>
              )}
            </div>
            <Button
              variant={selectedVariantId === variant.id ? 'title' : 'outline'}
              size="sm"
              onClick={() =>
                onVariantSelect(
                  variant.id,
                  variant.sku,
                  productName,
                  variant.attributes,
                )
              }
              className="mt-2 ml-auto sm:mt-0 sm:ml-3"
            >
              {selectedVariantId === variant.id ? (
                t('selected')
              ) : (
                <>
                  {t('select')}
                  <ChevronRight className="h-3 w-3" />
                </>
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

ProductVariantGroup.displayName = 'ProductVariantGroup';

export default ProductVariantGroup;
