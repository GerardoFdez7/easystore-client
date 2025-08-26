export interface Product {
  __typename?: 'Product';
  id: string;
  name: string;
  brand?: string | null;
  cover: string;
  longDescription?: string | null;
  manufacturer?: string | null;
  isArchived: boolean;
  productType: string;
  shortDescription: string;
  tags?: Array<string> | null;
  categories?: Array<{
    __typename?: 'ProductCategory';
    categoryId: string;
  }> | null;
  media?: Array<{
    __typename?: 'Media';
    mediaType: string;
    position: number;
    productId?: string | null;
    url: string;
    variantId?: string | null;
  }> | null;
  sustainabilities?: Array<{
    __typename?: 'Sustainability';
    certification: string;
    recycledPercentage: number;
  }> | null;
  variants?: Array<{
    __typename?: 'Variant';
    barcode?: string | null;
    ean?: string | null;
    isbn?: string | null;
    personalizationOptions?: Array<string> | null;
    price: number;
    sku?: string | null;
    upc?: string | null;
    variantCover?: string | null;
    weight?: number | null;
    attributes: Array<{
      __typename?: 'Attribute';
      key: string;
      value: string;
    }>;
    dimension?: {
      __typename?: 'Dimension';
      height: number;
      length: number;
      width: number;
    } | null;
    installmentPayments?: Array<{
      __typename?: 'Installment';
      interestRate: number;
      months: number;
    }> | null;
    variantMedia?: Array<{
      __typename?: 'Media';
      position: number;
      productId?: string | null;
      url: string;
      variantId?: string | null;
    }> | null;
    warranties?: Array<{
      __typename?: 'Warranty';
      coverage: string;
      instructions: string;
      months: number;
    }> | null;
  }> | null;
}
