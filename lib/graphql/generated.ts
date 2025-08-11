import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export enum AccountTypeEnum {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE',
  Tenant = 'TENANT',
}

export type AddStockToWarehouseInput = {
  estimatedReplenishmentDate?: InputMaybe<Scalars['DateTime']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  productLocation?: InputMaybe<Scalars['String']['input']>;
  qtyAvailable: Scalars['Int']['input'];
  qtyReserved?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AddVariantToProductInput = {
  attributes: Array<CreateAttributeInput>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<ConditionEnum>;
  dimension?: InputMaybe<CreateDimensionInput>;
  ean?: InputMaybe<Scalars['String']['input']>;
  installmentPayments?: InputMaybe<Array<CreateInstallmentInput>>;
  isbn?: InputMaybe<Scalars['String']['input']>;
  personalizationOptions?: InputMaybe<Array<Scalars['String']['input']>>;
  price: Scalars['Float']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  upc?: InputMaybe<Scalars['String']['input']>;
  variantCover?: InputMaybe<Scalars['String']['input']>;
  variantMedia?: InputMaybe<Array<CreateMediaInput>>;
  warranties?: InputMaybe<Array<CreateWarrantyInput>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type AddressType = {
  __typename?: 'AddressType';
  addressLine1: Scalars['String']['output'];
  addressLine2: Scalars['String']['output'];
  addressType: AddressTypeEnum;
  city: Scalars['String']['output'];
  countryId: Scalars['ID']['output'];
  deliveryNum: Scalars['String']['output'];
  name: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
};

/** Types of addresses */
export enum AddressTypeEnum {
  Billing = 'BILLING',
  Shipping = 'SHIPPING',
  Warehouse = 'WAREHOUSE',
}

export type AddressesType = {
  __typename?: 'AddressesType';
  addresses: Array<AddressType>;
};

export type Attribute = {
  __typename?: 'Attribute';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AuthIdentity = {
  __typename?: 'AuthIdentity';
  accountType: AccountTypeEnum;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  failedAttempts: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lockedUntil?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type AuthenticationInput = {
  accountType: AccountTypeEnum;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  cover: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subCategories: Array<Category>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ConditionEnum {
  New = 'NEW',
  Refurbished = 'REFURBISHED',
  Used = 'USED',
}

export type CreateAddressInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  addressType: AddressTypeEnum;
  city: Scalars['String']['input'];
  countryId: Scalars['ID']['input'];
  deliveryNum?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAttributeInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  cover?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  subCategories?: InputMaybe<Array<CreateCategoryInput>>;
};

export type CreateDimensionInput = {
  height: Scalars['Float']['input'];
  length: Scalars['Float']['input'];
  width: Scalars['Float']['input'];
};

export type CreateInstallmentInput = {
  interestRate: Scalars['Float']['input'];
  months: Scalars['Int']['input'];
};

export type CreateMediaInput = {
  mediaType: MediaTypeEnum;
  position: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type CreateProductCategoryInput = {
  categoryId: Scalars['ID']['input'];
};

export type CreateProductInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<CreateProductCategoryInput>>;
  cover?: InputMaybe<Scalars['String']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Array<CreateMediaInput>>;
  name: Scalars['String']['input'];
  productType?: InputMaybe<TypeEnum>;
  shortDescription: Scalars['String']['input'];
  sustainabilities?: InputMaybe<Array<CreateSustainabilityInput>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  variants: Array<AddVariantToProductInput>;
};

export type CreateSustainabilityInput = {
  certification: Scalars['String']['input'];
  recycledPercentage: Scalars['Float']['input'];
};

export type CreateVariantInput = {
  attributes: Array<CreateAttributeInput>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<ConditionEnum>;
  dimension?: InputMaybe<CreateDimensionInput>;
  ean?: InputMaybe<Scalars['String']['input']>;
  installmentPayments?: InputMaybe<Array<CreateInstallmentInput>>;
  isbn?: InputMaybe<Scalars['String']['input']>;
  personalizationOptions?: InputMaybe<Array<Scalars['String']['input']>>;
  price: Scalars['Float']['input'];
  productId: Scalars['ID']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  upc?: InputMaybe<Scalars['String']['input']>;
  variantCover?: InputMaybe<Scalars['String']['input']>;
  variantMedia?: InputMaybe<Array<CreateMediaInput>>;
  warranties?: InputMaybe<Array<CreateWarrantyInput>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateWarehouseInput = {
  addressId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateWarrantyInput = {
  coverage: Scalars['String']['input'];
  instructions: Scalars['String']['input'];
  months: Scalars['Float']['input'];
};

export type Dimension = {
  __typename?: 'Dimension';
  height: Scalars['Float']['output'];
  length: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
};

export type ForgotPasswordInput = {
  accountType: AccountTypeEnum;
  email: Scalars['String']['input'];
};

export type Installment = {
  __typename?: 'Installment';
  interestRate: Scalars['Float']['output'];
  months: Scalars['Int']['output'];
};

export type Media = {
  __typename?: 'Media';
  mediaType: MediaTypeEnum;
  position: Scalars['Int']['output'];
  productId?: Maybe<Scalars['ID']['output']>;
  url: Scalars['String']['output'];
  variantId?: Maybe<Scalars['ID']['output']>;
};

export enum MediaTypeEnum {
  Image = 'IMAGE',
  Video = 'VIDEO',
}

export type Mutation = {
  __typename?: 'Mutation';
  addStockToWarehouse: Warehouse;
  addVariant: Product;
  archiveVariant: Product;
  createAddress: AddressType;
  createCategory: Category;
  createProduct: Product;
  createWarehouse: Warehouse;
  deleteAddress: AddressType;
  deleteCategory: Category;
  deleteWarehouse: Warehouse;
  forgotPassword: Response;
  hardDeleteProduct: Product;
  login: Response;
  logout: Response;
  register: AuthIdentity;
  removeStockFromWarehouse: Warehouse;
  removeVariant: Product;
  restoreProduct: Product;
  restoreVariant: Product;
  softDeleteProduct: Product;
  updateAddress: AddressType;
  updateCategory: Category;
  updatePassword: Response;
  updateProduct: Product;
  updateStockInWarehouse: Warehouse;
  updateVariant: Product;
  updateWarehouse: Warehouse;
};

export type MutationAddStockToWarehouseArgs = {
  input: AddStockToWarehouseInput;
  reason?: InputMaybe<Scalars['String']['input']>;
  variantId: Scalars['ID']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type MutationAddVariantArgs = {
  input: CreateVariantInput;
};

export type MutationArchiveVariantArgs = {
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
};

export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreateWarehouseArgs = {
  input: CreateWarehouseInput;
};

export type MutationDeleteAddressArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteWarehouseArgs = {
  id: Scalars['ID']['input'];
};

export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};

export type MutationHardDeleteProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  input: AuthenticationInput;
};

export type MutationRegisterArgs = {
  input: AuthenticationInput;
};

export type MutationRemoveStockFromWarehouseArgs = {
  reason?: InputMaybe<Scalars['String']['input']>;
  stockId: Scalars['ID']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type MutationRemoveVariantArgs = {
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
};

export type MutationRestoreProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationRestoreVariantArgs = {
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
};

export type MutationSoftDeleteProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdateAddressArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAddressInput;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCategoryInput;
};

export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars['String']['input'];
  input: UpdateProductInput;
};

export type MutationUpdateStockInWarehouseArgs = {
  input: UpdateStockInWarehouseInput;
  reason?: InputMaybe<Scalars['String']['input']>;
  stockId: Scalars['ID']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type MutationUpdateVariantArgs = {
  id: Scalars['String']['input'];
  input: UpdateVariantInput;
  productId: Scalars['String']['input'];
};

export type MutationUpdateWarehouseArgs = {
  id: Scalars['ID']['input'];
  input: UpdateWarehouseInput;
};

export type PaginatedCategoriesType = {
  __typename?: 'PaginatedCategoriesType';
  categories: Array<Category>;
  hasMore: Scalars['Boolean']['output'];
  total: Scalars['Int']['output'];
};

export type PaginatedProductsType = {
  __typename?: 'PaginatedProductsType';
  hasMore: Scalars['Boolean']['output'];
  products: Array<Product>;
  total: Scalars['Int']['output'];
};

export type PaginatedStockMovementsType = {
  __typename?: 'PaginatedStockMovementsType';
  hasMore: Scalars['Boolean']['output'];
  stockMovements: Array<StockMovement>;
  total: Scalars['Int']['output'];
};

export type PaginatedWarehousesType = {
  __typename?: 'PaginatedWarehousesType';
  hasMore: Scalars['Boolean']['output'];
  total: Scalars['Int']['output'];
  warehouses: Array<Warehouse>;
};

export type Product = {
  __typename?: 'Product';
  brand?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<ProductCategory>>;
  cover: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  isArchived: Scalars['Boolean']['output'];
  longDescription?: Maybe<Scalars['String']['output']>;
  manufacturer?: Maybe<Scalars['String']['output']>;
  media?: Maybe<Array<Media>>;
  name: Scalars['String']['output'];
  productType: TypeEnum;
  shortDescription: Scalars['String']['output'];
  sustainabilities?: Maybe<Array<Sustainability>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
  variants?: Maybe<Array<Variant>>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  categoryId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAddressById: AddressType;
  getAllAddresses: AddressesType;
  getAllCategories: PaginatedCategoriesType;
  getAllProducts: PaginatedProductsType;
  getAllStockMovements: PaginatedStockMovementsType;
  getAllWarehouses: PaginatedWarehousesType;
  getCategoryById: Category;
  getProductById: Product;
  getWarehouseById: Warehouse;
  validateToken: Response;
};

export type QueryGetAddressByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetAllAddressesArgs = {
  addressType?: InputMaybe<AddressTypeEnum>;
};

export type QueryGetAllCategoriesArgs = {
  includeSubcategories?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type QueryGetAllProductsArgs = {
  categoriesIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  includeSoftDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  type?: InputMaybe<TypeEnum>;
};

export type QueryGetAllStockMovementsArgs = {
  createdById?: InputMaybe<Scalars['ID']['input']>;
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  variantId?: InputMaybe<Scalars['ID']['input']>;
  warehouseId: Scalars['ID']['input'];
};

export type QueryGetAllWarehousesArgs = {
  addressId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  lowStockThreshold?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  variantId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryGetCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetProductByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetWarehouseByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum SortBy {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT',
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type StockMovement = {
  __typename?: 'StockMovement';
  deltaQty: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  occurredAt: Scalars['DateTime']['output'];
  reason: Scalars['String']['output'];
  warehouseId: Scalars['ID']['output'];
};

export type StockPerWarehouse = {
  __typename?: 'StockPerWarehouse';
  estimatedReplenishmentDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  productLocation?: Maybe<Scalars['String']['output']>;
  qtyAvailable: Scalars['Int']['output'];
  qtyReserved: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  warehouseId: Scalars['ID']['output'];
};

export type Sustainability = {
  __typename?: 'Sustainability';
  certification: Scalars['String']['output'];
  recycledPercentage: Scalars['Float']['output'];
};

export enum TypeEnum {
  Digital = 'DIGITAL',
  Physical = 'PHYSICAL',
}

export type UpdateAddressInput = {
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  addressType?: InputMaybe<AddressTypeEnum>;
  city?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  deliveryNum?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAttributeInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  cover?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  subCategories?: InputMaybe<Array<UpdateCategoryInput>>;
};

export type UpdateDimensionInput = {
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateInstallmentInput = {
  interestRate?: InputMaybe<Scalars['Float']['input']>;
  months?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateMediaInput = {
  mediaType?: InputMaybe<MediaTypeEnum>;
  position?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type UpdateProductCategoryInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateProductInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<UpdateProductCategoryInput>>;
  cover?: InputMaybe<Scalars['String']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Array<UpdateMediaInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  productType?: InputMaybe<TypeEnum>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  sustainabilities?: InputMaybe<Array<UpdateSustainabilityInput>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateStockInWarehouseInput = {
  estimatedReplenishmentDate?: InputMaybe<Scalars['DateTime']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  productLocation?: InputMaybe<Scalars['String']['input']>;
  qtyAvailable?: InputMaybe<Scalars['Int']['input']>;
  qtyReserved?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateSustainabilityInput = {
  certification?: InputMaybe<Scalars['String']['input']>;
  recycledPercentage?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateVariantInput = {
  attributes?: InputMaybe<Array<UpdateAttributeInput>>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<ConditionEnum>;
  dimension?: InputMaybe<UpdateDimensionInput>;
  ean?: InputMaybe<Scalars['String']['input']>;
  installmentPayments?: InputMaybe<Array<UpdateInstallmentInput>>;
  isbn?: InputMaybe<Scalars['String']['input']>;
  personalizationOptions?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  upc?: InputMaybe<Scalars['String']['input']>;
  variantCover?: InputMaybe<Scalars['String']['input']>;
  variantMedia?: InputMaybe<Array<UpdateMediaInput>>;
  warranties?: InputMaybe<Array<UpdateWarrantyInput>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateWarehouseInput = {
  addressId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWarrantyInput = {
  coverage?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  months?: InputMaybe<Scalars['Float']['input']>;
};

export type Variant = {
  __typename?: 'Variant';
  attributes: Array<Attribute>;
  barcode?: Maybe<Scalars['String']['output']>;
  condition: ConditionEnum;
  dimension?: Maybe<Dimension>;
  ean?: Maybe<Scalars['String']['output']>;
  installmentPayments?: Maybe<Array<Installment>>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  isbn?: Maybe<Scalars['String']['output']>;
  personalizationOptions?: Maybe<Array<Scalars['String']['output']>>;
  price: Scalars['Float']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  upc?: Maybe<Scalars['String']['output']>;
  variantCover?: Maybe<Scalars['String']['output']>;
  variantMedia?: Maybe<Array<Media>>;
  warranties?: Maybe<Array<Warranty>>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type Warehouse = {
  __typename?: 'Warehouse';
  addressId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  stockPerWarehouses: Array<StockPerWarehouse>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Warranty = {
  __typename?: 'Warranty';
  coverage: Scalars['String']['output'];
  instructions: Scalars['String']['output'];
  months: Scalars['Float']['output'];
};

export type CreateAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;

export type CreateAddressMutation = {
  __typename?: 'Mutation';
  createAddress: {
    __typename?: 'AddressType';
    addressLine1: string;
    addressLine2: string;
    addressType: AddressTypeEnum;
    city: string;
    countryId: string;
    deliveryNum: string;
    name: string;
    postalCode: string;
  };
};

export type UpdateAddressMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateAddressInput;
}>;

export type UpdateAddressMutation = {
  __typename?: 'Mutation';
  updateAddress: {
    __typename?: 'AddressType';
    addressLine1: string;
    addressLine2: string;
    addressType: AddressTypeEnum;
    city: string;
    countryId: string;
    deliveryNum: string;
    name: string;
    postalCode: string;
  };
};

export type DeleteAddressMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteAddressMutation = {
  __typename?: 'Mutation';
  deleteAddress: {
    __typename?: 'AddressType';
    addressLine1: string;
    addressLine2: string;
    addressType: AddressTypeEnum;
    city: string;
    countryId: string;
    deliveryNum: string;
    name: string;
    postalCode: string;
  };
};

export type FindAddressByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type FindAddressByIdQuery = {
  __typename?: 'Query';
  getAddressById: {
    __typename?: 'AddressType';
    addressLine1: string;
    addressLine2: string;
    addressType: AddressTypeEnum;
    city: string;
    countryId: string;
    deliveryNum: string;
    name: string;
    postalCode: string;
  };
};

export type FindAllAddressesQueryVariables = Exact<{
  addressType?: InputMaybe<AddressTypeEnum>;
}>;

export type FindAllAddressesQuery = {
  __typename?: 'Query';
  getAllAddresses: {
    __typename?: 'AddressesType';
    addresses: Array<{
      __typename?: 'AddressType';
      addressLine1: string;
      addressLine2: string;
      addressType: AddressTypeEnum;
      city: string;
      countryId: string;
      deliveryNum: string;
      name: string;
      postalCode: string;
    }>;
  };
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  accountType: AccountTypeEnum;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'AuthIdentity';
    email: string;
    accountType: AccountTypeEnum;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  accountType: AccountTypeEnum;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'Response'; success: boolean; message: string };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  accountType: AccountTypeEnum;
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: {
    __typename?: 'Response';
    success: boolean;
    message: string;
  };
};

export type UpdatePasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type UpdatePasswordMutation = {
  __typename?: 'Mutation';
  updatePassword: {
    __typename?: 'Response';
    success: boolean;
    message: string;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: 'Mutation';
  logout: { __typename?: 'Response'; success: boolean; message: string };
};

export type ValidateTokenQueryVariables = Exact<{ [key: string]: never }>;

export type ValidateTokenQuery = {
  __typename?: 'Query';
  validateToken: { __typename?: 'Response'; success: boolean; message: string };
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'Category';
    name: string;
    description: string;
    cover: string;
    updatedAt: any;
    createdAt: any;
    subCategories: Array<{
      __typename?: 'Category';
      cover: string;
      createdAt: any;
      description: string;
      name: string;
      updatedAt: any;
      subCategories: Array<{
        __typename?: 'Category';
        cover: string;
        createdAt: any;
        description: string;
        name: string;
        updatedAt: any;
      }>;
    }>;
  };
};

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateCategoryInput;
}>;

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  updateCategory: {
    __typename?: 'Category';
    name: string;
    description: string;
    cover: string;
    createdAt: any;
    subCategories: Array<{
      __typename?: 'Category';
      name: string;
      description: string;
      cover: string;
    }>;
  };
};

export type DeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteMutation = {
  __typename?: 'Mutation';
  deleteCategory: {
    __typename?: 'Category';
    name: string;
    description: string;
  };
};

export type FindCategoryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type FindCategoryByIdQuery = {
  __typename?: 'Query';
  getCategoryById: {
    __typename?: 'Category';
    name: string;
    description: string;
    cover: string;
    updatedAt: any;
    createdAt: any;
    subCategories: Array<{
      __typename?: 'Category';
      name: string;
      description: string;
      cover: string;
      createdAt: any;
      updatedAt: any;
      subCategories: Array<{
        __typename?: 'Category';
        name: string;
        description: string;
        cover: string;
        createdAt: any;
        updatedAt: any;
        subCategories: Array<{
          __typename?: 'Category';
          cover: string;
          createdAt: any;
          description: string;
          name: string;
          updatedAt: any;
        }>;
      }>;
    }>;
  };
};

export type FindAllCategoriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
}>;

export type FindAllCategoriesQuery = {
  __typename?: 'Query';
  getAllCategories: {
    __typename?: 'PaginatedCategoriesType';
    total: number;
    hasMore: boolean;
    categories: Array<{
      __typename?: 'Category';
      name: string;
      description: string;
      cover: string;
      updatedAt: any;
      createdAt: any;
      subCategories: Array<{
        __typename?: 'Category';
        name: string;
        description: string;
        cover: string;
        createdAt: any;
        updatedAt: any;
        subCategories: Array<{
          __typename?: 'Category';
          name: string;
          description: string;
          cover: string;
          createdAt: any;
          updatedAt: any;
          subCategories: Array<{
            __typename?: 'Category';
            cover: string;
            createdAt: any;
            description: string;
            name: string;
            updatedAt: any;
          }>;
        }>;
      }>;
    }>;
  };
};

export type FindAllMovementsQueryVariables = Exact<{
  warehouseId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  variantId?: InputMaybe<Scalars['ID']['input']>;
  createdById?: InputMaybe<Scalars['ID']['input']>;
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
}>;

export type FindAllMovementsQuery = {
  __typename?: 'Query';
  getAllStockMovements: {
    __typename?: 'PaginatedStockMovementsType';
    total: number;
    hasMore: boolean;
    stockMovements: Array<{
      __typename?: 'StockMovement';
      id: string;
      warehouseId: string;
      deltaQty: number;
      reason: string;
      occurredAt: any;
    }>;
  };
};

export type AddStockToWarehouseMutationVariables = Exact<{
  warehouseId: Scalars['ID']['input'];
  variantId: Scalars['ID']['input'];
  input: AddStockToWarehouseInput;
  reason?: InputMaybe<Scalars['String']['input']>;
}>;

export type AddStockToWarehouseMutation = {
  __typename?: 'Mutation';
  addStockToWarehouse: {
    __typename?: 'Warehouse';
    id: string;
    name: string;
    addressId: string;
    createdAt: any;
    updatedAt: any;
    stockPerWarehouses: Array<{
      __typename?: 'StockPerWarehouse';
      id: string;
      warehouseId: string;
      qtyAvailable: number;
      qtyReserved: number;
      lotNumber?: string | null;
      serialNumbers?: Array<string> | null;
      productLocation?: string | null;
      estimatedReplenishmentDate?: any | null;
    }>;
  };
};

export type UpdateStockInWarehouseMutationVariables = Exact<{
  warehouseId: Scalars['ID']['input'];
  stockId: Scalars['ID']['input'];
  input: UpdateStockInWarehouseInput;
  reason?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateStockInWarehouseMutation = {
  __typename?: 'Mutation';
  updateStockInWarehouse: {
    __typename?: 'Warehouse';
    id: string;
    name: string;
    addressId: string;
    createdAt: any;
    updatedAt: any;
    stockPerWarehouses: Array<{
      __typename?: 'StockPerWarehouse';
      id: string;
      warehouseId: string;
      qtyAvailable: number;
      qtyReserved: number;
      lotNumber?: string | null;
      serialNumbers?: Array<string> | null;
      productLocation?: string | null;
      estimatedReplenishmentDate?: any | null;
    }>;
  };
};

export type RemoveStockFromWarehouseMutationVariables = Exact<{
  warehouseId: Scalars['ID']['input'];
  stockId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;

export type RemoveStockFromWarehouseMutation = {
  __typename?: 'Mutation';
  removeStockFromWarehouse: {
    __typename?: 'Warehouse';
    id: string;
    name: string;
    addressId: string;
    createdAt: any;
    updatedAt: any;
    stockPerWarehouses: Array<{
      __typename?: 'StockPerWarehouse';
      id: string;
      warehouseId: string;
      qtyAvailable: number;
      qtyReserved: number;
      lotNumber?: string | null;
      serialNumbers?: Array<string> | null;
      productLocation?: string | null;
      estimatedReplenishmentDate?: any | null;
    }>;
  };
};

export type CreateWarehouseMutationVariables = Exact<{
  input: CreateWarehouseInput;
}>;

export type CreateWarehouseMutation = {
  __typename?: 'Mutation';
  createWarehouse: {
    __typename?: 'Warehouse';
    id: string;
    name: string;
    addressId: string;
    createdAt: any;
    updatedAt: any;
    stockPerWarehouses: Array<{
      __typename?: 'StockPerWarehouse';
      id: string;
      warehouseId: string;
      qtyAvailable: number;
      qtyReserved: number;
      lotNumber?: string | null;
      serialNumbers?: Array<string> | null;
      productLocation?: string | null;
      estimatedReplenishmentDate?: any | null;
    }>;
  };
};

export type UpdateWarehouseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateWarehouseInput;
}>;

export type UpdateWarehouseMutation = {
  __typename?: 'Mutation';
  updateWarehouse: {
    __typename?: 'Warehouse';
    id: string;
    name: string;
    addressId: string;
    createdAt: any;
    updatedAt: any;
    stockPerWarehouses: Array<{
      __typename?: 'StockPerWarehouse';
      id: string;
      warehouseId: string;
      qtyAvailable: number;
      qtyReserved: number;
      lotNumber?: string | null;
      serialNumbers?: Array<string> | null;
      productLocation?: string | null;
      estimatedReplenishmentDate?: any | null;
    }>;
  };
};

export type DeleteWarehouseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteWarehouseMutation = {
  __typename?: 'Mutation';
  deleteWarehouse: {
    __typename?: 'Warehouse';
    id: string;
    name: string;
    addressId: string;
    createdAt: any;
    updatedAt: any;
    stockPerWarehouses: Array<{
      __typename?: 'StockPerWarehouse';
      id: string;
      warehouseId: string;
      qtyAvailable: number;
      qtyReserved: number;
      lotNumber?: string | null;
      serialNumbers?: Array<string> | null;
      productLocation?: string | null;
      estimatedReplenishmentDate?: any | null;
    }>;
  };
};

export type FindWarehouseByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type FindWarehouseByIdQuery = {
  __typename?: 'Query';
  getWarehouseById: {
    __typename?: 'Warehouse';
    id: string;
    name: string;
    addressId: string;
    createdAt: any;
    updatedAt: any;
    stockPerWarehouses: Array<{
      __typename?: 'StockPerWarehouse';
      id: string;
      warehouseId: string;
      qtyAvailable: number;
      qtyReserved: number;
      lotNumber?: string | null;
      serialNumbers?: Array<string> | null;
      productLocation?: string | null;
      estimatedReplenishmentDate?: any | null;
    }>;
  };
};

export type FindAllWarehousesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  addressId?: InputMaybe<Scalars['ID']['input']>;
  variantId?: InputMaybe<Scalars['ID']['input']>;
  lowStockThreshold?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
}>;

export type FindAllWarehousesQuery = {
  __typename?: 'Query';
  getAllWarehouses: {
    __typename?: 'PaginatedWarehousesType';
    total: number;
    hasMore: boolean;
    warehouses: Array<{
      __typename?: 'Warehouse';
      id: string;
      name: string;
      addressId: string;
      createdAt: any;
      updatedAt: any;
      stockPerWarehouses: Array<{
        __typename?: 'StockPerWarehouse';
        id: string;
        warehouseId: string;
        qtyAvailable: number;
        qtyReserved: number;
        lotNumber?: string | null;
        serialNumbers?: Array<string> | null;
        productLocation?: string | null;
        estimatedReplenishmentDate?: any | null;
      }>;
    }>;
  };
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: {
    __typename?: 'Product';
    name: string;
    shortDescription: string;
    longDescription?: string | null;
    productType: TypeEnum;
    cover: string;
    tags?: Array<string> | null;
    brand?: string | null;
    manufacturer?: string | null;
    createdAt: any;
    updatedAt: any;
    isArchived: boolean;
    variants?: Array<{
      __typename?: 'Variant';
      price: number;
      weight?: number | null;
      variantCover?: string | null;
      upc?: string | null;
      sku?: string | null;
      personalizationOptions?: Array<string> | null;
      isbn?: string | null;
      ean?: string | null;
      condition: ConditionEnum;
      barcode?: string | null;
      attributes: Array<{
        __typename?: 'Attribute';
        key: string;
        value: string;
      }>;
      installmentPayments?: Array<{
        __typename?: 'Installment';
        months: number;
        interestRate: number;
      }> | null;
      dimension?: {
        __typename?: 'Dimension';
        width: number;
        length: number;
        height: number;
      } | null;
      warranties?: Array<{
        __typename?: 'Warranty';
        instructions: string;
        months: number;
        coverage: string;
      }> | null;
      variantMedia?: Array<{
        __typename?: 'Media';
        variantId?: string | null;
        url: string;
        productId?: string | null;
        position: number;
        mediaType: MediaTypeEnum;
      }> | null;
    }> | null;
    sustainabilities?: Array<{
      __typename?: 'Sustainability';
      recycledPercentage: number;
      certification: string;
    }> | null;
    media?: Array<{
      __typename?: 'Media';
      url: string;
      productId?: string | null;
      position: number;
      mediaType: MediaTypeEnum;
      variantId?: string | null;
    }> | null;
    categories?: Array<{
      __typename?: 'ProductCategory';
      categoryId: string;
    }> | null;
  };
};

export type UpdateMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateProductInput;
}>;

export type UpdateMutation = {
  __typename?: 'Mutation';
  updateProduct: {
    __typename?: 'Product';
    brand?: string | null;
    cover: string;
    createdAt: any;
    isArchived: boolean;
    longDescription?: string | null;
    manufacturer?: string | null;
    name: string;
    productType: TypeEnum;
    shortDescription: string;
    tags?: Array<string> | null;
    updatedAt: any;
    categories?: Array<{
      __typename?: 'ProductCategory';
      categoryId: string;
    }> | null;
    media?: Array<{
      __typename?: 'Media';
      mediaType: MediaTypeEnum;
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
      condition: ConditionEnum;
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
        mediaType: MediaTypeEnum;
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
  };
};

export type SoftDeleteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type SoftDeleteMutation = {
  __typename?: 'Mutation';
  softDeleteProduct: {
    __typename?: 'Product';
    name: string;
    isArchived: boolean;
  };
};

export type RestoreMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type RestoreMutation = {
  __typename?: 'Mutation';
  restoreProduct: { __typename?: 'Product'; name: string; isArchived: boolean };
};

export type HardDeleteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type HardDeleteMutation = {
  __typename?: 'Mutation';
  hardDeleteProduct: { __typename?: 'Product'; name: string };
};

export type FindProductByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type FindProductByIdQuery = {
  __typename?: 'Query';
  getProductById: {
    __typename?: 'Product';
    name: string;
    shortDescription: string;
    longDescription?: string | null;
    cover: string;
    brand?: string | null;
    manufacturer?: string | null;
    tags?: Array<string> | null;
    updatedAt: any;
    createdAt: any;
    productType: TypeEnum;
    isArchived: boolean;
    media?: Array<{
      __typename?: 'Media';
      mediaType: MediaTypeEnum;
      position: number;
      url: string;
    }> | null;
    categories?: Array<{
      __typename?: 'ProductCategory';
      categoryId: string;
    }> | null;
    variants?: Array<{
      __typename?: 'Variant';
      price: number;
      condition: ConditionEnum;
      weight?: number | null;
      sku?: string | null;
      ean?: string | null;
      upc?: string | null;
      isbn?: string | null;
      barcode?: string | null;
      variantCover?: string | null;
      personalizationOptions?: Array<string> | null;
      attributes: Array<{
        __typename?: 'Attribute';
        key: string;
        value: string;
      }>;
      dimension?: {
        __typename?: 'Dimension';
        height: number;
        width: number;
        length: number;
      } | null;
      variantMedia?: Array<{
        __typename?: 'Media';
        mediaType: MediaTypeEnum;
        url: string;
        position: number;
        variantId?: string | null;
        productId?: string | null;
      }> | null;
      warranties?: Array<{
        __typename?: 'Warranty';
        coverage: string;
        instructions: string;
        months: number;
      }> | null;
      installmentPayments?: Array<{
        __typename?: 'Installment';
        interestRate: number;
        months: number;
      }> | null;
    }> | null;
    sustainabilities?: Array<{
      __typename?: 'Sustainability';
      certification: string;
      recycledPercentage: number;
    }> | null;
  };
};

export type FindAllProductsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  categoriesIds?: InputMaybe<
    Array<Scalars['Int']['input']> | Scalars['Int']['input']
  >;
  type?: InputMaybe<TypeEnum>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  includeSoftDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;

export type FindAllProductsQuery = {
  __typename?: 'Query';
  getAllProducts: {
    __typename?: 'PaginatedProductsType';
    total: number;
    products: Array<{
      __typename?: 'Product';
      name: string;
      brand?: string | null;
      cover: string;
      createdAt: any;
      longDescription?: string | null;
      manufacturer?: string | null;
      isArchived: boolean;
      productType: TypeEnum;
      shortDescription: string;
      tags?: Array<string> | null;
      updatedAt: any;
      categories?: Array<{
        __typename?: 'ProductCategory';
        categoryId: string;
      }> | null;
      media?: Array<{
        __typename?: 'Media';
        mediaType: MediaTypeEnum;
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
        condition: ConditionEnum;
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
          mediaType: MediaTypeEnum;
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
    }>;
  };
};

export type AddVariantToProductMutationVariables = Exact<{
  input: CreateVariantInput;
}>;

export type AddVariantToProductMutation = {
  __typename?: 'Mutation';
  addVariant: {
    __typename?: 'Product';
    variants?: Array<{
      __typename?: 'Variant';
      price: number;
      condition: ConditionEnum;
      attributes: Array<{
        __typename?: 'Attribute';
        key: string;
        value: string;
      }>;
    }> | null;
  };
};

export type UpdateVariantInProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  input: UpdateVariantInput;
}>;

export type UpdateVariantInProductMutation = {
  __typename?: 'Mutation';
  updateVariant: {
    __typename?: 'Product';
    variants?: Array<{
      __typename?: 'Variant';
      barcode?: string | null;
      condition: ConditionEnum;
      weight?: number | null;
      ean?: string | null;
      isbn?: string | null;
      personalizationOptions?: Array<string> | null;
      price: number;
      sku?: string | null;
      upc?: string | null;
      variantCover?: string | null;
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
        mediaType: MediaTypeEnum;
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
  };
};

export type ArchiveVariantOfProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
}>;

export type ArchiveVariantOfProductMutation = {
  __typename?: 'Mutation';
  archiveVariant: {
    __typename?: 'Product';
    variants?: Array<{
      __typename?: 'Variant';
      isArchived?: boolean | null;
    }> | null;
  };
};

export type RestoreVariantOfProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
}>;

export type RestoreVariantOfProductMutation = {
  __typename?: 'Mutation';
  restoreVariant: {
    __typename?: 'Product';
    variants?: Array<{
      __typename?: 'Variant';
      isArchived?: boolean | null;
    }> | null;
  };
};

export type RemoveVariantfromProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
}>;

export type RemoveVariantfromProductMutation = {
  __typename?: 'Mutation';
  removeVariant: {
    __typename?: 'Product';
    variants?: Array<{ __typename?: 'Variant'; sku?: string | null }> | null;
  };
};

export const CreateAddressDocument = gql`
  mutation createAddress($input: CreateAddressInput!) {
    createAddress(input: $input) {
      addressLine1
      addressLine2
      addressType
      city
      countryId
      deliveryNum
      name
      postalCode
    }
  }
`;
export type CreateAddressMutationFn = Apollo.MutationFunction<
  CreateAddressMutation,
  CreateAddressMutationVariables
>;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >(CreateAddressDocument, options);
}
export type CreateAddressMutationHookResult = ReturnType<
  typeof useCreateAddressMutation
>;
export type CreateAddressMutationResult =
  Apollo.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = Apollo.BaseMutationOptions<
  CreateAddressMutation,
  CreateAddressMutationVariables
>;
export const UpdateAddressDocument = gql`
  mutation updateAddress($id: ID!, $input: UpdateAddressInput!) {
    updateAddress(id: $id, input: $input) {
      addressLine1
      addressLine2
      addressType
      city
      countryId
      deliveryNum
      name
      postalCode
    }
  }
`;
export type UpdateAddressMutationFn = Apollo.MutationFunction<
  UpdateAddressMutation,
  UpdateAddressMutationVariables
>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAddressMutation,
    UpdateAddressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAddressMutation,
    UpdateAddressMutationVariables
  >(UpdateAddressDocument, options);
}
export type UpdateAddressMutationHookResult = ReturnType<
  typeof useUpdateAddressMutation
>;
export type UpdateAddressMutationResult =
  Apollo.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<
  UpdateAddressMutation,
  UpdateAddressMutationVariables
>;
export const DeleteAddressDocument = gql`
  mutation deleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      addressLine1
      addressLine2
      addressType
      city
      countryId
      deliveryNum
      name
      postalCode
    }
  }
`;
export type DeleteAddressMutationFn = Apollo.MutationFunction<
  DeleteAddressMutation,
  DeleteAddressMutationVariables
>;

/**
 * __useDeleteAddressMutation__
 *
 * To run a mutation, you first call `useDeleteAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressMutation, { data, loading, error }] = useDeleteAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAddressMutation,
    DeleteAddressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteAddressMutation,
    DeleteAddressMutationVariables
  >(DeleteAddressDocument, options);
}
export type DeleteAddressMutationHookResult = ReturnType<
  typeof useDeleteAddressMutation
>;
export type DeleteAddressMutationResult =
  Apollo.MutationResult<DeleteAddressMutation>;
export type DeleteAddressMutationOptions = Apollo.BaseMutationOptions<
  DeleteAddressMutation,
  DeleteAddressMutationVariables
>;
export const FindAddressByIdDocument = gql`
  query findAddressById($id: ID!) {
    getAddressById(id: $id) {
      addressLine1
      addressLine2
      addressType
      city
      countryId
      deliveryNum
      name
      postalCode
    }
  }
`;

/**
 * __useFindAddressByIdQuery__
 *
 * To run a query within a React component, call `useFindAddressByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAddressByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAddressByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindAddressByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindAddressByIdQuery,
    FindAddressByIdQueryVariables
  > &
    (
      | { variables: FindAddressByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAddressByIdQuery, FindAddressByIdQueryVariables>(
    FindAddressByIdDocument,
    options,
  );
}
export function useFindAddressByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAddressByIdQuery,
    FindAddressByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindAddressByIdQuery,
    FindAddressByIdQueryVariables
  >(FindAddressByIdDocument, options);
}
export function useFindAddressByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FindAddressByIdQuery,
        FindAddressByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FindAddressByIdQuery,
    FindAddressByIdQueryVariables
  >(FindAddressByIdDocument, options);
}
export type FindAddressByIdQueryHookResult = ReturnType<
  typeof useFindAddressByIdQuery
>;
export type FindAddressByIdLazyQueryHookResult = ReturnType<
  typeof useFindAddressByIdLazyQuery
>;
export type FindAddressByIdSuspenseQueryHookResult = ReturnType<
  typeof useFindAddressByIdSuspenseQuery
>;
export type FindAddressByIdQueryResult = Apollo.QueryResult<
  FindAddressByIdQuery,
  FindAddressByIdQueryVariables
>;
export const FindAllAddressesDocument = gql`
  query findAllAddresses($addressType: AddressTypeEnum) {
    getAllAddresses(addressType: $addressType) {
      addresses {
        addressLine1
        addressLine2
        addressType
        city
        countryId
        deliveryNum
        name
        postalCode
      }
    }
  }
`;

/**
 * __useFindAllAddressesQuery__
 *
 * To run a query within a React component, call `useFindAllAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllAddressesQuery({
 *   variables: {
 *      addressType: // value for 'addressType'
 *   },
 * });
 */
export function useFindAllAddressesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindAllAddressesQuery,
    FindAllAddressesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAllAddressesQuery, FindAllAddressesQueryVariables>(
    FindAllAddressesDocument,
    options,
  );
}
export function useFindAllAddressesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllAddressesQuery,
    FindAllAddressesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindAllAddressesQuery,
    FindAllAddressesQueryVariables
  >(FindAllAddressesDocument, options);
}
export function useFindAllAddressesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FindAllAddressesQuery,
        FindAllAddressesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FindAllAddressesQuery,
    FindAllAddressesQueryVariables
  >(FindAllAddressesDocument, options);
}
export type FindAllAddressesQueryHookResult = ReturnType<
  typeof useFindAllAddressesQuery
>;
export type FindAllAddressesLazyQueryHookResult = ReturnType<
  typeof useFindAllAddressesLazyQuery
>;
export type FindAllAddressesSuspenseQueryHookResult = ReturnType<
  typeof useFindAllAddressesSuspenseQuery
>;
export type FindAllAddressesQueryResult = Apollo.QueryResult<
  FindAllAddressesQuery,
  FindAllAddressesQueryVariables
>;
export const RegisterDocument = gql`
  mutation register(
    $email: String!
    $password: String!
    $accountType: AccountTypeEnum!
  ) {
    register(
      input: { email: $email, password: $password, accountType: $accountType }
    ) {
      email
      accountType
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      accountType: // value for 'accountType'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LoginDocument = gql`
  mutation login(
    $email: String!
    $password: String!
    $accountType: AccountTypeEnum!
  ) {
    login(
      input: { email: $email, password: $password, accountType: $accountType }
    ) {
      success
      message
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      accountType: // value for 'accountType'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation forgotPassword($email: String!, $accountType: AccountTypeEnum!) {
    forgotPassword(input: { email: $email, accountType: $accountType }) {
      success
      message
    }
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      accountType: // value for 'accountType'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
  Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const UpdatePasswordDocument = gql`
  mutation updatePassword($token: String!, $password: String!) {
    updatePassword(input: { token: $token, password: $password }) {
      success
      message
    }
  }
`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdatePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >(UpdatePasswordDocument, options);
}
export type UpdatePasswordMutationHookResult = ReturnType<
  typeof useUpdatePasswordMutation
>;
export type UpdatePasswordMutationResult =
  Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;
export const LogoutDocument = gql`
  mutation logout {
    logout {
      success
      message
    }
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const ValidateTokenDocument = gql`
  query validateToken {
    validateToken {
      success
      message
    }
  }
`;

/**
 * __useValidateTokenQuery__
 *
 * To run a query within a React component, call `useValidateTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidateTokenQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ValidateTokenQuery,
    ValidateTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(
    ValidateTokenDocument,
    options,
  );
}
export function useValidateTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ValidateTokenQuery,
    ValidateTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(
    ValidateTokenDocument,
    options,
  );
}
export function useValidateTokenSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ValidateTokenQuery,
        ValidateTokenQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ValidateTokenQuery,
    ValidateTokenQueryVariables
  >(ValidateTokenDocument, options);
}
export type ValidateTokenQueryHookResult = ReturnType<
  typeof useValidateTokenQuery
>;
export type ValidateTokenLazyQueryHookResult = ReturnType<
  typeof useValidateTokenLazyQuery
>;
export type ValidateTokenSuspenseQueryHookResult = ReturnType<
  typeof useValidateTokenSuspenseQuery
>;
export type ValidateTokenQueryResult = Apollo.QueryResult<
  ValidateTokenQuery,
  ValidateTokenQueryVariables
>;
export const CreateCategoryDocument = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      name
      description
      cover
      updatedAt
      createdAt
      subCategories {
        cover
        createdAt
        description
        name
        subCategories {
          cover
          createdAt
          description
          name
          updatedAt
        }
        updatedAt
      }
    }
  }
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, options);
}
export type CreateCategoryMutationHookResult = ReturnType<
  typeof useCreateCategoryMutation
>;
export type CreateCategoryMutationResult =
  Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export const UpdateCategoryDocument = gql`
  mutation updateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      name
      description
      cover
      createdAt
      subCategories {
        name
        description
        cover
      }
    }
  }
`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationHookResult = ReturnType<
  typeof useUpdateCategoryMutation
>;
export type UpdateCategoryMutationResult =
  Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
export const DeleteDocument = gql`
  mutation delete($id: ID!) {
    deleteCategory(id: $id) {
      name
      description
    }
  }
`;
export type DeleteMutationFn = Apollo.MutationFunction<
  DeleteMutation,
  DeleteMutationVariables
>;

/**
 * __useDeleteMutation__
 *
 * To run a mutation, you first call `useDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutation, { data, loading, error }] = useDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteMutation,
    DeleteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteMutation, DeleteMutationVariables>(
    DeleteDocument,
    options,
  );
}
export type DeleteMutationHookResult = ReturnType<typeof useDeleteMutation>;
export type DeleteMutationResult = Apollo.MutationResult<DeleteMutation>;
export type DeleteMutationOptions = Apollo.BaseMutationOptions<
  DeleteMutation,
  DeleteMutationVariables
>;
export const FindCategoryByIdDocument = gql`
  query findCategoryById($id: ID!) {
    getCategoryById(id: $id) {
      name
      description
      cover
      updatedAt
      createdAt
      subCategories {
        name
        description
        cover
        createdAt
        subCategories {
          name
          description
          cover
          createdAt
          subCategories {
            cover
            createdAt
            description
            name
            updatedAt
          }
          updatedAt
        }
        updatedAt
      }
    }
  }
`;

/**
 * __useFindCategoryByIdQuery__
 *
 * To run a query within a React component, call `useFindCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindCategoryByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindCategoryByIdQuery,
    FindCategoryByIdQueryVariables
  > &
    (
      | { variables: FindCategoryByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindCategoryByIdQuery, FindCategoryByIdQueryVariables>(
    FindCategoryByIdDocument,
    options,
  );
}
export function useFindCategoryByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindCategoryByIdQuery,
    FindCategoryByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindCategoryByIdQuery,
    FindCategoryByIdQueryVariables
  >(FindCategoryByIdDocument, options);
}
export function useFindCategoryByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FindCategoryByIdQuery,
        FindCategoryByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FindCategoryByIdQuery,
    FindCategoryByIdQueryVariables
  >(FindCategoryByIdDocument, options);
}
export type FindCategoryByIdQueryHookResult = ReturnType<
  typeof useFindCategoryByIdQuery
>;
export type FindCategoryByIdLazyQueryHookResult = ReturnType<
  typeof useFindCategoryByIdLazyQuery
>;
export type FindCategoryByIdSuspenseQueryHookResult = ReturnType<
  typeof useFindCategoryByIdSuspenseQuery
>;
export type FindCategoryByIdQueryResult = Apollo.QueryResult<
  FindCategoryByIdQuery,
  FindCategoryByIdQueryVariables
>;
export const FindAllCategoriesDocument = gql`
  query findAllCategories(
    $page: Int = 1
    $limit: Int = 25
    $name: String = ""
    $parentId: ID = ""
    $sortBy: SortBy = CREATED_AT
    $sortOrder: SortOrder = DESC
  ) {
    getAllCategories(
      page: $page
      limit: $limit
      name: $name
      parentId: $parentId
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      categories {
        name
        description
        cover
        updatedAt
        createdAt
        subCategories {
          name
          description
          cover
          createdAt
          subCategories {
            name
            description
            cover
            createdAt
            subCategories {
              cover
              createdAt
              description
              name
              updatedAt
            }
            updatedAt
          }
          updatedAt
        }
      }
      total
      hasMore
    }
  }
`;

/**
 * __useFindAllCategoriesQuery__
 *
 * To run a query within a React component, call `useFindAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCategoriesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      name: // value for 'name'
 *      parentId: // value for 'parentId'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useFindAllCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >(FindAllCategoriesDocument, options);
}
export function useFindAllCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >(FindAllCategoriesDocument, options);
}
export function useFindAllCategoriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FindAllCategoriesQuery,
        FindAllCategoriesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >(FindAllCategoriesDocument, options);
}
export type FindAllCategoriesQueryHookResult = ReturnType<
  typeof useFindAllCategoriesQuery
>;
export type FindAllCategoriesLazyQueryHookResult = ReturnType<
  typeof useFindAllCategoriesLazyQuery
>;
export type FindAllCategoriesSuspenseQueryHookResult = ReturnType<
  typeof useFindAllCategoriesSuspenseQuery
>;
export type FindAllCategoriesQueryResult = Apollo.QueryResult<
  FindAllCategoriesQuery,
  FindAllCategoriesQueryVariables
>;
export const FindAllMovementsDocument = gql`
  query findAllMovements(
    $warehouseId: ID!
    $page: Int = 1
    $limit: Int = 10
    $variantId: ID
    $createdById: ID
    $dateFrom: DateTime
    $dateTo: DateTime
    $includeDeleted: Boolean = false
    $sortBy: SortBy
    $sortOrder: SortOrder
  ) {
    getAllStockMovements(
      warehouseId: $warehouseId
      page: $page
      limit: $limit
      variantId: $variantId
      createdById: $createdById
      dateFrom: $dateFrom
      dateTo: $dateTo
      includeDeleted: $includeDeleted
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      stockMovements {
        id
        warehouseId
        deltaQty
        reason
        occurredAt
      }
      total
      hasMore
    }
  }
`;

/**
 * __useFindAllMovementsQuery__
 *
 * To run a query within a React component, call `useFindAllMovementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllMovementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllMovementsQuery({
 *   variables: {
 *      warehouseId: // value for 'warehouseId'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      variantId: // value for 'variantId'
 *      createdById: // value for 'createdById'
 *      dateFrom: // value for 'dateFrom'
 *      dateTo: // value for 'dateTo'
 *      includeDeleted: // value for 'includeDeleted'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useFindAllMovementsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindAllMovementsQuery,
    FindAllMovementsQueryVariables
  > &
    (
      | { variables: FindAllMovementsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAllMovementsQuery, FindAllMovementsQueryVariables>(
    FindAllMovementsDocument,
    options,
  );
}
export function useFindAllMovementsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllMovementsQuery,
    FindAllMovementsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindAllMovementsQuery,
    FindAllMovementsQueryVariables
  >(FindAllMovementsDocument, options);
}
export function useFindAllMovementsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FindAllMovementsQuery,
        FindAllMovementsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FindAllMovementsQuery,
    FindAllMovementsQueryVariables
  >(FindAllMovementsDocument, options);
}
export type FindAllMovementsQueryHookResult = ReturnType<
  typeof useFindAllMovementsQuery
>;
export type FindAllMovementsLazyQueryHookResult = ReturnType<
  typeof useFindAllMovementsLazyQuery
>;
export type FindAllMovementsSuspenseQueryHookResult = ReturnType<
  typeof useFindAllMovementsSuspenseQuery
>;
export type FindAllMovementsQueryResult = Apollo.QueryResult<
  FindAllMovementsQuery,
  FindAllMovementsQueryVariables
>;
export const AddStockToWarehouseDocument = gql`
  mutation addStockToWarehouse(
    $warehouseId: ID!
    $variantId: ID!
    $input: AddStockToWarehouseInput!
    $reason: String
  ) {
    addStockToWarehouse(
      warehouseId: $warehouseId
      variantId: $variantId
      input: $input
      reason: $reason
    ) {
      id
      name
      addressId
      createdAt
      updatedAt
      stockPerWarehouses {
        id
        warehouseId
        qtyAvailable
        qtyReserved
        lotNumber
        serialNumbers
        productLocation
        estimatedReplenishmentDate
      }
    }
  }
`;
export type AddStockToWarehouseMutationFn = Apollo.MutationFunction<
  AddStockToWarehouseMutation,
  AddStockToWarehouseMutationVariables
>;

/**
 * __useAddStockToWarehouseMutation__
 *
 * To run a mutation, you first call `useAddStockToWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStockToWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStockToWarehouseMutation, { data, loading, error }] = useAddStockToWarehouseMutation({
 *   variables: {
 *      warehouseId: // value for 'warehouseId'
 *      variantId: // value for 'variantId'
 *      input: // value for 'input'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useAddStockToWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddStockToWarehouseMutation,
    AddStockToWarehouseMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddStockToWarehouseMutation,
    AddStockToWarehouseMutationVariables
  >(AddStockToWarehouseDocument, options);
}
export type AddStockToWarehouseMutationHookResult = ReturnType<
  typeof useAddStockToWarehouseMutation
>;
export type AddStockToWarehouseMutationResult =
  Apollo.MutationResult<AddStockToWarehouseMutation>;
export type AddStockToWarehouseMutationOptions = Apollo.BaseMutationOptions<
  AddStockToWarehouseMutation,
  AddStockToWarehouseMutationVariables
>;
export const UpdateStockInWarehouseDocument = gql`
  mutation updateStockInWarehouse(
    $warehouseId: ID!
    $stockId: ID!
    $input: UpdateStockInWarehouseInput!
    $reason: String
  ) {
    updateStockInWarehouse(
      warehouseId: $warehouseId
      stockId: $stockId
      input: $input
      reason: $reason
    ) {
      id
      name
      addressId
      createdAt
      updatedAt
      stockPerWarehouses {
        id
        warehouseId
        qtyAvailable
        qtyReserved
        lotNumber
        serialNumbers
        productLocation
        estimatedReplenishmentDate
      }
    }
  }
`;
export type UpdateStockInWarehouseMutationFn = Apollo.MutationFunction<
  UpdateStockInWarehouseMutation,
  UpdateStockInWarehouseMutationVariables
>;

/**
 * __useUpdateStockInWarehouseMutation__
 *
 * To run a mutation, you first call `useUpdateStockInWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStockInWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStockInWarehouseMutation, { data, loading, error }] = useUpdateStockInWarehouseMutation({
 *   variables: {
 *      warehouseId: // value for 'warehouseId'
 *      stockId: // value for 'stockId'
 *      input: // value for 'input'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useUpdateStockInWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateStockInWarehouseMutation,
    UpdateStockInWarehouseMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateStockInWarehouseMutation,
    UpdateStockInWarehouseMutationVariables
  >(UpdateStockInWarehouseDocument, options);
}
export type UpdateStockInWarehouseMutationHookResult = ReturnType<
  typeof useUpdateStockInWarehouseMutation
>;
export type UpdateStockInWarehouseMutationResult =
  Apollo.MutationResult<UpdateStockInWarehouseMutation>;
export type UpdateStockInWarehouseMutationOptions = Apollo.BaseMutationOptions<
  UpdateStockInWarehouseMutation,
  UpdateStockInWarehouseMutationVariables
>;
export const RemoveStockFromWarehouseDocument = gql`
  mutation removeStockFromWarehouse(
    $warehouseId: ID!
    $stockId: ID!
    $reason: String
  ) {
    removeStockFromWarehouse(
      warehouseId: $warehouseId
      stockId: $stockId
      reason: $reason
    ) {
      id
      name
      addressId
      createdAt
      updatedAt
      stockPerWarehouses {
        id
        warehouseId
        qtyAvailable
        qtyReserved
        lotNumber
        serialNumbers
        productLocation
        estimatedReplenishmentDate
      }
    }
  }
`;
export type RemoveStockFromWarehouseMutationFn = Apollo.MutationFunction<
  RemoveStockFromWarehouseMutation,
  RemoveStockFromWarehouseMutationVariables
>;

/**
 * __useRemoveStockFromWarehouseMutation__
 *
 * To run a mutation, you first call `useRemoveStockFromWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStockFromWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStockFromWarehouseMutation, { data, loading, error }] = useRemoveStockFromWarehouseMutation({
 *   variables: {
 *      warehouseId: // value for 'warehouseId'
 *      stockId: // value for 'stockId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRemoveStockFromWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveStockFromWarehouseMutation,
    RemoveStockFromWarehouseMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveStockFromWarehouseMutation,
    RemoveStockFromWarehouseMutationVariables
  >(RemoveStockFromWarehouseDocument, options);
}
export type RemoveStockFromWarehouseMutationHookResult = ReturnType<
  typeof useRemoveStockFromWarehouseMutation
>;
export type RemoveStockFromWarehouseMutationResult =
  Apollo.MutationResult<RemoveStockFromWarehouseMutation>;
export type RemoveStockFromWarehouseMutationOptions =
  Apollo.BaseMutationOptions<
    RemoveStockFromWarehouseMutation,
    RemoveStockFromWarehouseMutationVariables
  >;
export const CreateWarehouseDocument = gql`
  mutation createWarehouse($input: CreateWarehouseInput!) {
    createWarehouse(input: $input) {
      id
      name
      addressId
      createdAt
      updatedAt
      stockPerWarehouses {
        id
        warehouseId
        qtyAvailable
        qtyReserved
        lotNumber
        serialNumbers
        productLocation
        estimatedReplenishmentDate
      }
    }
  }
`;
export type CreateWarehouseMutationFn = Apollo.MutationFunction<
  CreateWarehouseMutation,
  CreateWarehouseMutationVariables
>;

/**
 * __useCreateWarehouseMutation__
 *
 * To run a mutation, you first call `useCreateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWarehouseMutation, { data, loading, error }] = useCreateWarehouseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateWarehouseMutation,
    CreateWarehouseMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateWarehouseMutation,
    CreateWarehouseMutationVariables
  >(CreateWarehouseDocument, options);
}
export type CreateWarehouseMutationHookResult = ReturnType<
  typeof useCreateWarehouseMutation
>;
export type CreateWarehouseMutationResult =
  Apollo.MutationResult<CreateWarehouseMutation>;
export type CreateWarehouseMutationOptions = Apollo.BaseMutationOptions<
  CreateWarehouseMutation,
  CreateWarehouseMutationVariables
>;
export const UpdateWarehouseDocument = gql`
  mutation updateWarehouse($id: ID!, $input: UpdateWarehouseInput!) {
    updateWarehouse(id: $id, input: $input) {
      id
      name
      addressId
      createdAt
      updatedAt
      stockPerWarehouses {
        id
        warehouseId
        qtyAvailable
        qtyReserved
        lotNumber
        serialNumbers
        productLocation
        estimatedReplenishmentDate
      }
    }
  }
`;
export type UpdateWarehouseMutationFn = Apollo.MutationFunction<
  UpdateWarehouseMutation,
  UpdateWarehouseMutationVariables
>;

/**
 * __useUpdateWarehouseMutation__
 *
 * To run a mutation, you first call `useUpdateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWarehouseMutation, { data, loading, error }] = useUpdateWarehouseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateWarehouseMutation,
    UpdateWarehouseMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateWarehouseMutation,
    UpdateWarehouseMutationVariables
  >(UpdateWarehouseDocument, options);
}
export type UpdateWarehouseMutationHookResult = ReturnType<
  typeof useUpdateWarehouseMutation
>;
export type UpdateWarehouseMutationResult =
  Apollo.MutationResult<UpdateWarehouseMutation>;
export type UpdateWarehouseMutationOptions = Apollo.BaseMutationOptions<
  UpdateWarehouseMutation,
  UpdateWarehouseMutationVariables
>;
export const DeleteWarehouseDocument = gql`
  mutation deleteWarehouse($id: ID!) {
    deleteWarehouse(id: $id) {
      id
      name
      addressId
      createdAt
      updatedAt
      stockPerWarehouses {
        id
        warehouseId
        qtyAvailable
        qtyReserved
        lotNumber
        serialNumbers
        productLocation
        estimatedReplenishmentDate
      }
    }
  }
`;
export type DeleteWarehouseMutationFn = Apollo.MutationFunction<
  DeleteWarehouseMutation,
  DeleteWarehouseMutationVariables
>;

/**
 * __useDeleteWarehouseMutation__
 *
 * To run a mutation, you first call `useDeleteWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWarehouseMutation, { data, loading, error }] = useDeleteWarehouseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteWarehouseMutation,
    DeleteWarehouseMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteWarehouseMutation,
    DeleteWarehouseMutationVariables
  >(DeleteWarehouseDocument, options);
}
export type DeleteWarehouseMutationHookResult = ReturnType<
  typeof useDeleteWarehouseMutation
>;
export type DeleteWarehouseMutationResult =
  Apollo.MutationResult<DeleteWarehouseMutation>;
export type DeleteWarehouseMutationOptions = Apollo.BaseMutationOptions<
  DeleteWarehouseMutation,
  DeleteWarehouseMutationVariables
>;
export const FindWarehouseByIdDocument = gql`
  query findWarehouseById($id: ID!) {
    getWarehouseById(id: $id) {
      id
      name
      addressId
      createdAt
      updatedAt
      stockPerWarehouses {
        id
        warehouseId
        qtyAvailable
        qtyReserved
        lotNumber
        serialNumbers
        productLocation
        estimatedReplenishmentDate
      }
    }
  }
`;

/**
 * __useFindWarehouseByIdQuery__
 *
 * To run a query within a React component, call `useFindWarehouseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindWarehouseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindWarehouseByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindWarehouseByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindWarehouseByIdQuery,
    FindWarehouseByIdQueryVariables
  > &
    (
      | { variables: FindWarehouseByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindWarehouseByIdQuery,
    FindWarehouseByIdQueryVariables
  >(FindWarehouseByIdDocument, options);
}
export function useFindWarehouseByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindWarehouseByIdQuery,
    FindWarehouseByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindWarehouseByIdQuery,
    FindWarehouseByIdQueryVariables
  >(FindWarehouseByIdDocument, options);
}
export function useFindWarehouseByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FindWarehouseByIdQuery,
        FindWarehouseByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FindWarehouseByIdQuery,
    FindWarehouseByIdQueryVariables
  >(FindWarehouseByIdDocument, options);
}
export type FindWarehouseByIdQueryHookResult = ReturnType<
  typeof useFindWarehouseByIdQuery
>;
export type FindWarehouseByIdLazyQueryHookResult = ReturnType<
  typeof useFindWarehouseByIdLazyQuery
>;
export type FindWarehouseByIdSuspenseQueryHookResult = ReturnType<
  typeof useFindWarehouseByIdSuspenseQuery
>;
export type FindWarehouseByIdQueryResult = Apollo.QueryResult<
  FindWarehouseByIdQuery,
  FindWarehouseByIdQueryVariables
>;
export const FindAllWarehousesDocument = gql`
  query findAllWarehouses(
    $page: Int = 1
    $limit: Int = 10
    $name: String
    $addressId: ID
    $variantId: ID
    $lowStockThreshold: Int
    $sortBy: SortBy
    $sortOrder: SortOrder
  ) {
    getAllWarehouses(
      page: $page
      limit: $limit
      name: $name
      addressId: $addressId
      variantId: $variantId
      lowStockThreshold: $lowStockThreshold
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      warehouses {
        id
        name
        addressId
        createdAt
        updatedAt
        stockPerWarehouses {
          id
          warehouseId
          qtyAvailable
          qtyReserved
          lotNumber
          serialNumbers
          productLocation
          estimatedReplenishmentDate
        }
      }
      total
      hasMore
    }
  }
`;

/**
 * __useFindAllWarehousesQuery__
 *
 * To run a query within a React component, call `useFindAllWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllWarehousesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      name: // value for 'name'
 *      addressId: // value for 'addressId'
 *      variantId: // value for 'variantId'
 *      lowStockThreshold: // value for 'lowStockThreshold'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useFindAllWarehousesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindAllWarehousesQuery,
    FindAllWarehousesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindAllWarehousesQuery,
    FindAllWarehousesQueryVariables
  >(FindAllWarehousesDocument, options);
}
export function useFindAllWarehousesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllWarehousesQuery,
    FindAllWarehousesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindAllWarehousesQuery,
    FindAllWarehousesQueryVariables
  >(FindAllWarehousesDocument, options);
}
export function useFindAllWarehousesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FindAllWarehousesQuery,
        FindAllWarehousesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FindAllWarehousesQuery,
    FindAllWarehousesQueryVariables
  >(FindAllWarehousesDocument, options);
}
export type FindAllWarehousesQueryHookResult = ReturnType<
  typeof useFindAllWarehousesQuery
>;
export type FindAllWarehousesLazyQueryHookResult = ReturnType<
  typeof useFindAllWarehousesLazyQuery
>;
export type FindAllWarehousesSuspenseQueryHookResult = ReturnType<
  typeof useFindAllWarehousesSuspenseQuery
>;
export type FindAllWarehousesQueryResult = Apollo.QueryResult<
  FindAllWarehousesQuery,
  FindAllWarehousesQueryVariables
>;
export const CreateProductDocument = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      name
      shortDescription
      longDescription
      productType
      cover
      tags
      brand
      manufacturer
      variants {
        attributes {
          key
          value
        }
        price
        weight
        variantCover
        upc
        sku
        personalizationOptions
        isbn
        installmentPayments {
          months
          interestRate
        }
        ean
        dimension {
          width
          length
          height
        }
        condition
        barcode
        warranties {
          instructions
          months
          coverage
        }
        variantMedia {
          variantId
          url
          productId
          position
          mediaType
        }
      }
      createdAt
      updatedAt
      sustainabilities {
        recycledPercentage
        certification
      }
      isArchived
      media {
        url
        productId
        position
        mediaType
        variantId
      }
      categories {
        categoryId
      }
    }
  }
`;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult =
  Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const UpdateDocument = gql`
  mutation update($id: String!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      brand
      categories {
        categoryId
      }
      cover
      createdAt
      isArchived
      longDescription
      manufacturer
      media {
        mediaType
        position
        productId
        url
        variantId
      }
      name
      productType
      shortDescription
      sustainabilities {
        certification
        recycledPercentage
      }
      tags
      updatedAt
      variants {
        attributes {
          key
          value
        }
        barcode
        condition
        dimension {
          height
          length
          width
        }
        ean
        installmentPayments {
          interestRate
          months
        }
        isbn
        personalizationOptions
        price
        sku
        upc
        variantCover
        variantMedia {
          mediaType
          position
          productId
          url
          variantId
        }
        warranties {
          coverage
          instructions
          months
        }
        weight
      }
    }
  }
`;
export type UpdateMutationFn = Apollo.MutationFunction<
  UpdateMutation,
  UpdateMutationVariables
>;

/**
 * __useUpdateMutation__
 *
 * To run a mutation, you first call `useUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMutation, { data, loading, error }] = useUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMutation,
    UpdateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateMutation, UpdateMutationVariables>(
    UpdateDocument,
    options,
  );
}
export type UpdateMutationHookResult = ReturnType<typeof useUpdateMutation>;
export type UpdateMutationResult = Apollo.MutationResult<UpdateMutation>;
export type UpdateMutationOptions = Apollo.BaseMutationOptions<
  UpdateMutation,
  UpdateMutationVariables
>;
export const SoftDeleteDocument = gql`
  mutation softDelete($id: String!) {
    softDeleteProduct(id: $id) {
      name
      isArchived
    }
  }
`;
export type SoftDeleteMutationFn = Apollo.MutationFunction<
  SoftDeleteMutation,
  SoftDeleteMutationVariables
>;

/**
 * __useSoftDeleteMutation__
 *
 * To run a mutation, you first call `useSoftDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteMutation, { data, loading, error }] = useSoftDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SoftDeleteMutation,
    SoftDeleteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SoftDeleteMutation, SoftDeleteMutationVariables>(
    SoftDeleteDocument,
    options,
  );
}
export type SoftDeleteMutationHookResult = ReturnType<
  typeof useSoftDeleteMutation
>;
export type SoftDeleteMutationResult =
  Apollo.MutationResult<SoftDeleteMutation>;
export type SoftDeleteMutationOptions = Apollo.BaseMutationOptions<
  SoftDeleteMutation,
  SoftDeleteMutationVariables
>;
export const RestoreDocument = gql`
  mutation restore($id: String!) {
    restoreProduct(id: $id) {
      name
      isArchived
    }
  }
`;
export type RestoreMutationFn = Apollo.MutationFunction<
  RestoreMutation,
  RestoreMutationVariables
>;

/**
 * __useRestoreMutation__
 *
 * To run a mutation, you first call `useRestoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreMutation, { data, loading, error }] = useRestoreMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RestoreMutation,
    RestoreMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RestoreMutation, RestoreMutationVariables>(
    RestoreDocument,
    options,
  );
}
export type RestoreMutationHookResult = ReturnType<typeof useRestoreMutation>;
export type RestoreMutationResult = Apollo.MutationResult<RestoreMutation>;
export type RestoreMutationOptions = Apollo.BaseMutationOptions<
  RestoreMutation,
  RestoreMutationVariables
>;
export const HardDeleteDocument = gql`
  mutation hardDelete($id: String!) {
    hardDeleteProduct(id: $id) {
      name
    }
  }
`;
export type HardDeleteMutationFn = Apollo.MutationFunction<
  HardDeleteMutation,
  HardDeleteMutationVariables
>;

/**
 * __useHardDeleteMutation__
 *
 * To run a mutation, you first call `useHardDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHardDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hardDeleteMutation, { data, loading, error }] = useHardDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHardDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    HardDeleteMutation,
    HardDeleteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<HardDeleteMutation, HardDeleteMutationVariables>(
    HardDeleteDocument,
    options,
  );
}
export type HardDeleteMutationHookResult = ReturnType<
  typeof useHardDeleteMutation
>;
export type HardDeleteMutationResult =
  Apollo.MutationResult<HardDeleteMutation>;
export type HardDeleteMutationOptions = Apollo.BaseMutationOptions<
  HardDeleteMutation,
  HardDeleteMutationVariables
>;
export const FindProductByIdDocument = gql`
  query findProductById($id: String!) {
    getProductById(id: $id) {
      name
      shortDescription
      longDescription
      cover
      brand
      manufacturer
      tags
      media {
        mediaType
        position
        url
      }
      categories {
        categoryId
      }
      variants {
        price
        condition
        attributes {
          key
          value
        }
        weight
        dimension {
          height
          width
          length
        }
        sku
        ean
        upc
        isbn
        barcode
        variantCover
        variantMedia {
          mediaType
          url
          position
          variantId
          productId
        }
        warranties {
          coverage
          instructions
          months
        }
        installmentPayments {
          interestRate
          months
        }
        personalizationOptions
      }
      sustainabilities {
        certification
        recycledPercentage
      }
      updatedAt
      createdAt
      productType
      isArchived
    }
  }
`;

/**
 * __useFindProductByIdQuery__
 *
 * To run a query within a React component, call `useFindProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProductByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindProductByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProductByIdQuery,
    FindProductByIdQueryVariables
  > &
    (
      | { variables: FindProductByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindProductByIdQuery, FindProductByIdQueryVariables>(
    FindProductByIdDocument,
    options,
  );
}
export function useFindProductByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProductByIdQuery,
    FindProductByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProductByIdQuery,
    FindProductByIdQueryVariables
  >(FindProductByIdDocument, options);
}
export function useFindProductByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FindProductByIdQuery,
        FindProductByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FindProductByIdQuery,
    FindProductByIdQueryVariables
  >(FindProductByIdDocument, options);
}
export type FindProductByIdQueryHookResult = ReturnType<
  typeof useFindProductByIdQuery
>;
export type FindProductByIdLazyQueryHookResult = ReturnType<
  typeof useFindProductByIdLazyQuery
>;
export type FindProductByIdSuspenseQueryHookResult = ReturnType<
  typeof useFindProductByIdSuspenseQuery
>;
export type FindProductByIdQueryResult = Apollo.QueryResult<
  FindProductByIdQuery,
  FindProductByIdQueryVariables
>;
export const FindAllProductsDocument = gql`
  query findAllProducts(
    $page: Float = 1
    $limit: Float = 10
    $categoriesIds: [Int!] = []
    $type: TypeEnum = PHYSICAL
    $sortBy: SortBy = NAME
    $sortOrder: SortOrder = ASC
    $includeSoftDeleted: Boolean = false
    $name: String = ""
  ) {
    getAllProducts(
      page: $page
      limit: $limit
      categoriesIds: $categoriesIds
      type: $type
      sortBy: $sortBy
      sortOrder: $sortOrder
      includeSoftDeleted: $includeSoftDeleted
      name: $name
    ) {
      products {
        name
        brand
        categories {
          categoryId
        }
        cover
        createdAt
        longDescription
        manufacturer
        media {
          mediaType
          position
          productId
          url
          variantId
        }
        isArchived
        productType
        shortDescription
        sustainabilities {
          certification
          recycledPercentage
        }
        tags
        updatedAt
        variants {
          attributes {
            key
            value
          }
          barcode
          condition
          dimension {
            height
            length
            width
          }
          ean
          installmentPayments {
            interestRate
            months
          }
          isbn
          personalizationOptions
          price
          sku
          upc
          variantCover
          variantMedia {
            mediaType
            position
            productId
            url
            variantId
          }
          warranties {
            coverage
            instructions
            months
          }
          weight
        }
      }
      total
    }
  }
`;

/**
 * __useFindAllProductsQuery__
 *
 * To run a query within a React component, call `useFindAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllProductsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      categoriesIds: // value for 'categoriesIds'
 *      type: // value for 'type'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      includeSoftDeleted: // value for 'includeSoftDeleted'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFindAllProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindAllProductsQuery,
    FindAllProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAllProductsQuery, FindAllProductsQueryVariables>(
    FindAllProductsDocument,
    options,
  );
}
export function useFindAllProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllProductsQuery,
    FindAllProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindAllProductsQuery,
    FindAllProductsQueryVariables
  >(FindAllProductsDocument, options);
}
export function useFindAllProductsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        FindAllProductsQuery,
        FindAllProductsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FindAllProductsQuery,
    FindAllProductsQueryVariables
  >(FindAllProductsDocument, options);
}
export type FindAllProductsQueryHookResult = ReturnType<
  typeof useFindAllProductsQuery
>;
export type FindAllProductsLazyQueryHookResult = ReturnType<
  typeof useFindAllProductsLazyQuery
>;
export type FindAllProductsSuspenseQueryHookResult = ReturnType<
  typeof useFindAllProductsSuspenseQuery
>;
export type FindAllProductsQueryResult = Apollo.QueryResult<
  FindAllProductsQuery,
  FindAllProductsQueryVariables
>;
export const AddVariantToProductDocument = gql`
  mutation addVariantToProduct($input: CreateVariantInput!) {
    addVariant(input: $input) {
      variants {
        price
        condition
        attributes {
          key
          value
        }
      }
    }
  }
`;
export type AddVariantToProductMutationFn = Apollo.MutationFunction<
  AddVariantToProductMutation,
  AddVariantToProductMutationVariables
>;

/**
 * __useAddVariantToProductMutation__
 *
 * To run a mutation, you first call `useAddVariantToProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVariantToProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVariantToProductMutation, { data, loading, error }] = useAddVariantToProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddVariantToProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddVariantToProductMutation,
    AddVariantToProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddVariantToProductMutation,
    AddVariantToProductMutationVariables
  >(AddVariantToProductDocument, options);
}
export type AddVariantToProductMutationHookResult = ReturnType<
  typeof useAddVariantToProductMutation
>;
export type AddVariantToProductMutationResult =
  Apollo.MutationResult<AddVariantToProductMutation>;
export type AddVariantToProductMutationOptions = Apollo.BaseMutationOptions<
  AddVariantToProductMutation,
  AddVariantToProductMutationVariables
>;
export const UpdateVariantInProductDocument = gql`
  mutation updateVariantInProduct(
    $id: String!
    $productId: String!
    $input: UpdateVariantInput!
  ) {
    updateVariant(id: $id, productId: $productId, input: $input) {
      variants {
        attributes {
          key
          value
        }
        barcode
        condition
        weight
        dimension {
          height
          length
          width
        }
        ean
        installmentPayments {
          interestRate
          months
        }
        isbn
        personalizationOptions
        price
        sku
        upc
        variantCover
        variantMedia {
          mediaType
          position
          productId
          url
          variantId
        }
        warranties {
          coverage
          instructions
          months
        }
      }
    }
  }
`;
export type UpdateVariantInProductMutationFn = Apollo.MutationFunction<
  UpdateVariantInProductMutation,
  UpdateVariantInProductMutationVariables
>;

/**
 * __useUpdateVariantInProductMutation__
 *
 * To run a mutation, you first call `useUpdateVariantInProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVariantInProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVariantInProductMutation, { data, loading, error }] = useUpdateVariantInProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      productId: // value for 'productId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVariantInProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateVariantInProductMutation,
    UpdateVariantInProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateVariantInProductMutation,
    UpdateVariantInProductMutationVariables
  >(UpdateVariantInProductDocument, options);
}
export type UpdateVariantInProductMutationHookResult = ReturnType<
  typeof useUpdateVariantInProductMutation
>;
export type UpdateVariantInProductMutationResult =
  Apollo.MutationResult<UpdateVariantInProductMutation>;
export type UpdateVariantInProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateVariantInProductMutation,
  UpdateVariantInProductMutationVariables
>;
export const ArchiveVariantOfProductDocument = gql`
  mutation archiveVariantOfProduct($id: String!, $productId: String!) {
    archiveVariant(id: $id, productId: $productId) {
      variants {
        isArchived
      }
    }
  }
`;
export type ArchiveVariantOfProductMutationFn = Apollo.MutationFunction<
  ArchiveVariantOfProductMutation,
  ArchiveVariantOfProductMutationVariables
>;

/**
 * __useArchiveVariantOfProductMutation__
 *
 * To run a mutation, you first call `useArchiveVariantOfProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveVariantOfProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveVariantOfProductMutation, { data, loading, error }] = useArchiveVariantOfProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useArchiveVariantOfProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ArchiveVariantOfProductMutation,
    ArchiveVariantOfProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ArchiveVariantOfProductMutation,
    ArchiveVariantOfProductMutationVariables
  >(ArchiveVariantOfProductDocument, options);
}
export type ArchiveVariantOfProductMutationHookResult = ReturnType<
  typeof useArchiveVariantOfProductMutation
>;
export type ArchiveVariantOfProductMutationResult =
  Apollo.MutationResult<ArchiveVariantOfProductMutation>;
export type ArchiveVariantOfProductMutationOptions = Apollo.BaseMutationOptions<
  ArchiveVariantOfProductMutation,
  ArchiveVariantOfProductMutationVariables
>;
export const RestoreVariantOfProductDocument = gql`
  mutation restoreVariantOfProduct($id: String!, $productId: String!) {
    restoreVariant(id: $id, productId: $productId) {
      variants {
        isArchived
      }
    }
  }
`;
export type RestoreVariantOfProductMutationFn = Apollo.MutationFunction<
  RestoreVariantOfProductMutation,
  RestoreVariantOfProductMutationVariables
>;

/**
 * __useRestoreVariantOfProductMutation__
 *
 * To run a mutation, you first call `useRestoreVariantOfProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreVariantOfProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreVariantOfProductMutation, { data, loading, error }] = useRestoreVariantOfProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRestoreVariantOfProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RestoreVariantOfProductMutation,
    RestoreVariantOfProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RestoreVariantOfProductMutation,
    RestoreVariantOfProductMutationVariables
  >(RestoreVariantOfProductDocument, options);
}
export type RestoreVariantOfProductMutationHookResult = ReturnType<
  typeof useRestoreVariantOfProductMutation
>;
export type RestoreVariantOfProductMutationResult =
  Apollo.MutationResult<RestoreVariantOfProductMutation>;
export type RestoreVariantOfProductMutationOptions = Apollo.BaseMutationOptions<
  RestoreVariantOfProductMutation,
  RestoreVariantOfProductMutationVariables
>;
export const RemoveVariantfromProductDocument = gql`
  mutation removeVariantfromProduct($id: String!, $productId: String!) {
    removeVariant(id: $id, productId: $productId) {
      variants {
        sku
      }
    }
  }
`;
export type RemoveVariantfromProductMutationFn = Apollo.MutationFunction<
  RemoveVariantfromProductMutation,
  RemoveVariantfromProductMutationVariables
>;

/**
 * __useRemoveVariantfromProductMutation__
 *
 * To run a mutation, you first call `useRemoveVariantfromProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveVariantfromProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeVariantfromProductMutation, { data, loading, error }] = useRemoveVariantfromProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveVariantfromProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveVariantfromProductMutation,
    RemoveVariantfromProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveVariantfromProductMutation,
    RemoveVariantfromProductMutationVariables
  >(RemoveVariantfromProductDocument, options);
}
export type RemoveVariantfromProductMutationHookResult = ReturnType<
  typeof useRemoveVariantfromProductMutation
>;
export type RemoveVariantfromProductMutationResult =
  Apollo.MutationResult<RemoveVariantfromProductMutation>;
export type RemoveVariantfromProductMutationOptions =
  Apollo.BaseMutationOptions<
    RemoveVariantfromProductMutation,
    RemoveVariantfromProductMutationVariables
  >;
