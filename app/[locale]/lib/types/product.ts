import {
  ProductSortBy as GeneratedProductSortBy,
  TypeEnum,
  type Product as GeneratedProduct,
} from '@graphql/generated';

export type Sustainability = {
  certification: string;
  recycledPercentage: number;
};

export type Category = {
  categoryId: string;
  categoryName: string;
  categoryDescription?: string;
  categoryCover: string;
};

export type Variant = {
  id: string;
  /** Amount in the currency of the variant's product. */
  price: string;
  sku: string;
  attributes: Attribute[];
  condition: string;
  variantCover?: string;
  isArchived?: boolean;
};

export type Attribute = {
  key: string;
  value: string;
};

export type UploadResult = {
  url: string;
  timestamp: Date;
  status: 'success' | 'error';
  message?: string;
};

export const ProductType = TypeEnum;
export type ProductType = TypeEnum;

export const ProductSortBy = GeneratedProductSortBy;
export type ProductSortBy = GeneratedProductSortBy;

export type ProductListItem = GeneratedProduct;

export type ProductStatusSummary = Pick<GeneratedProduct, 'isArchived'>;
