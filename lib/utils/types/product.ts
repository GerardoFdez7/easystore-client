export type Sustainability = {
  certification: string;
  recycledPercentage: number;
};

export type Category = {
  categoryId: string;
  categoryName: string;
};

export type Variant = {
  id: string;
  price: number;
  attributes: Attribute[];
  condition: string;
  variantCover?: string;
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
