export interface Product {
  __typename?: 'Product';
  id: string;
  name: string;
  brand?: string | null;
  cover: string;
  media?: Array<{
    url: string;
    mediaType: 'IMAGE' | 'VIDEO';
    position: number;
  }> | null;
  isArchived: boolean;
  variants?: Array<{
    sku?: string | null;
    price: number;
    barcode?: string | null;
    condition: string;
    ean?: string | null;
    isbn?: string | null;
    personalizationOptions?: string[] | null;
    upc?: string | null;
    variantCover?: string | null;
    weight?: number | null;
  }> | null;
  categories?: Array<{
    categoryId: string;
  }> | null;
}
