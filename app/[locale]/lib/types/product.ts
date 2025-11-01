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
  price: number;
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

export type ProductType = 'PHYSICAL' | 'DIGITAL';
