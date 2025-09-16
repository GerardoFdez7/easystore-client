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
};

export type Attribute = {
  key: string;
  value: string;
};
