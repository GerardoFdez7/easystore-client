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
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lockedUntil?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Category = {
  __typename?: 'Category';
  cover: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subCategories: Array<Category>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum ConditionEnum {
  New = 'NEW',
  Refurbished = 'REFURBISHED',
  Used = 'USED',
}

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
  tenantId: Scalars['ID']['input'];
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
  tenantId: Scalars['ID']['input'];
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
  tenantId: Scalars['ID']['input'];
  upc?: InputMaybe<Scalars['String']['input']>;
  variantCover?: InputMaybe<Scalars['String']['input']>;
  variantMedia?: InputMaybe<Array<CreateMediaInput>>;
  warranties?: InputMaybe<Array<CreateWarrantyInput>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
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

export type Installment = {
  __typename?: 'Installment';
  interestRate: Scalars['Float']['output'];
  months: Scalars['Int']['output'];
};

export type LoginAuthInput = {
  accountType: AccountTypeEnum;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
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
  addVariant: Product;
  archiveVariant: Product;
  createCategory: Category;
  createProduct: Product;
  deleteCategory: Category;
  hardDeleteProduct: Product;
  login: LoginResponse;
  register: AuthIdentity;
  removeVariant: Product;
  restoreProduct: Product;
  restoreVariant: Product;
  softDeleteProduct: Product;
  updateCategory: Category;
  updateProduct: Product;
  updateVariant: Product;
};

export type MutationAddVariantArgs = {
  input: CreateVariantInput;
};

export type MutationArchiveVariantArgs = {
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
  tenantId: Scalars['ID']['input'];
};

export type MutationHardDeleteProductArgs = {
  id: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  input: LoginAuthInput;
};

export type MutationRegisterArgs = {
  input: RegisterAuthInput;
};

export type MutationRemoveVariantArgs = {
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type MutationRestoreProductArgs = {
  id: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type MutationRestoreVariantArgs = {
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type MutationSoftDeleteProductArgs = {
  id: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCategoryInput;
  tenantId: Scalars['ID']['input'];
};

export type MutationUpdateProductArgs = {
  id: Scalars['String']['input'];
  input: UpdateProductInput;
  tenantId: Scalars['String']['input'];
};

export type MutationUpdateVariantArgs = {
  id: Scalars['String']['input'];
  input: UpdateVariantInput;
  productId: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
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
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variants?: Maybe<Array<Variant>>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  categoryId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllCategories: PaginatedCategoriesType;
  getAllProducts: PaginatedProductsType;
  getCategoryById: Category;
  getProductById: Product;
};

export type QueryGetAllCategoriesArgs = {
  includeSubcategories?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  tenantId: Scalars['ID']['input'];
};

export type QueryGetAllProductsArgs = {
  categoriesIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  includeSoftDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  tenantId: Scalars['String']['input'];
  type?: InputMaybe<TypeEnum>;
};

export type QueryGetCategoryByIdArgs = {
  id: Scalars['ID']['input'];
  tenantId: Scalars['ID']['input'];
};

export type QueryGetProductByIdArgs = {
  id: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type RegisterAuthInput = {
  accountType: AccountTypeEnum;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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

export type Sustainability = {
  __typename?: 'Sustainability';
  certification: Scalars['String']['output'];
  recycledPercentage: Scalars['Float']['output'];
};

export enum TypeEnum {
  Digital = 'DIGITAL',
  Physical = 'PHYSICAL',
}

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

export type Warranty = {
  __typename?: 'Warranty';
  coverage: Scalars['String']['output'];
  instructions: Scalars['String']['output'];
  months: Scalars['Float']['output'];
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
  login: {
    __typename?: 'LoginResponse';
    accessToken: string;
    refreshToken: string;
  };
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
    tenantId: string;
    updatedAt: any;
    createdAt: any;
    subCategories: Array<{
      __typename?: 'Category';
      cover: string;
      createdAt: any;
      description: string;
      name: string;
      tenantId: string;
      updatedAt: any;
      subCategories: Array<{
        __typename?: 'Category';
        cover: string;
        createdAt: any;
        description: string;
        name: string;
        tenantId: string;
        updatedAt: any;
      }>;
    }>;
  };
};

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  tenantId: Scalars['ID']['input'];
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
  tenantId: Scalars['ID']['input'];
}>;

export type DeleteMutation = {
  __typename?: 'Mutation';
  deleteCategory: {
    __typename?: 'Category';
    name: string;
    description: string;
  };
};

export type FindByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  tenantId: Scalars['ID']['input'];
}>;

export type FindByIdQuery = {
  __typename?: 'Query';
  getCategoryById: {
    __typename?: 'Category';
    name: string;
    description: string;
    cover: string;
    tenantId: string;
    updatedAt: any;
    createdAt: any;
    subCategories: Array<{
      __typename?: 'Category';
      name: string;
      description: string;
      cover: string;
      createdAt: any;
      tenantId: string;
      updatedAt: any;
      subCategories: Array<{
        __typename?: 'Category';
        name: string;
        description: string;
        cover: string;
        createdAt: any;
        tenantId: string;
        updatedAt: any;
        subCategories: Array<{
          __typename?: 'Category';
          cover: string;
          createdAt: any;
          description: string;
          name: string;
          tenantId: string;
          updatedAt: any;
        }>;
      }>;
    }>;
  };
};

export type FindAllQueryVariables = Exact<{
  tenantId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
}>;

export type FindAllQuery = {
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
      tenantId: string;
      updatedAt: any;
      createdAt: any;
      subCategories: Array<{
        __typename?: 'Category';
        name: string;
        description: string;
        cover: string;
        createdAt: any;
        tenantId: string;
        updatedAt: any;
        subCategories: Array<{
          __typename?: 'Category';
          name: string;
          description: string;
          cover: string;
          createdAt: any;
          tenantId: string;
          updatedAt: any;
          subCategories: Array<{
            __typename?: 'Category';
            cover: string;
            createdAt: any;
            description: string;
            name: string;
            tenantId: string;
            updatedAt: any;
          }>;
        }>;
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
    tenantId: string;
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
  tenantId: Scalars['String']['input'];
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
    tenantId: string;
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
  tenantId: Scalars['String']['input'];
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
  tenantId: Scalars['String']['input'];
}>;

export type RestoreMutation = {
  __typename?: 'Mutation';
  restoreProduct: { __typename?: 'Product'; name: string; isArchived: boolean };
};

export type HardDeleteMutationVariables = Exact<{
  id: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
}>;

export type HardDeleteMutation = {
  __typename?: 'Mutation';
  hardDeleteProduct: { __typename?: 'Product'; name: string };
};

export type GetIdQueryVariables = Exact<{
  tenantId: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;

export type GetIdQuery = {
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
    tenantId: string;
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

export type GetAllQueryVariables = Exact<{
  tenantId: Scalars['String']['input'];
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

export type GetAllQuery = {
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
      tenantId: string;
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
  tenantId: Scalars['String']['input'];
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
  tenantId: Scalars['String']['input'];
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
  tenantId: Scalars['String']['input'];
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
  tenantId: Scalars['String']['input'];
}>;

export type RemoveVariantfromProductMutation = {
  __typename?: 'Mutation';
  removeVariant: {
    __typename?: 'Product';
    variants?: Array<{ __typename?: 'Variant'; sku?: string | null }> | null;
  };
};

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
      accessToken
      refreshToken
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
export const CreateCategoryDocument = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      name
      description
      cover
      tenantId
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
          tenantId
          updatedAt
        }
        tenantId
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
  mutation updateCategory(
    $id: ID!
    $tenantId: ID!
    $input: UpdateCategoryInput!
  ) {
    updateCategory(id: $id, tenantId: $tenantId, input: $input) {
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
 *      tenantId: // value for 'tenantId'
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
  mutation delete($id: ID!, $tenantId: ID!) {
    deleteCategory(id: $id, tenantId: $tenantId) {
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
 *      tenantId: // value for 'tenantId'
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
export const FindByIdDocument = gql`
  query findById($id: ID!, $tenantId: ID!) {
    getCategoryById(id: $id, tenantId: $tenantId) {
      name
      description
      cover
      tenantId
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
            tenantId
            updatedAt
          }
          tenantId
          updatedAt
        }
        tenantId
        updatedAt
      }
    }
  }
`;

/**
 * __useFindByIdQuery__
 *
 * To run a query within a React component, call `useFindByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      tenantId: // value for 'tenantId'
 *   },
 * });
 */
export function useFindByIdQuery(
  baseOptions: Apollo.QueryHookOptions<FindByIdQuery, FindByIdQueryVariables> &
    ({ variables: FindByIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindByIdQuery, FindByIdQueryVariables>(
    FindByIdDocument,
    options,
  );
}
export function useFindByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindByIdQuery,
    FindByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindByIdQuery, FindByIdQueryVariables>(
    FindByIdDocument,
    options,
  );
}
export function useFindByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<FindByIdQuery, FindByIdQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<FindByIdQuery, FindByIdQueryVariables>(
    FindByIdDocument,
    options,
  );
}
export type FindByIdQueryHookResult = ReturnType<typeof useFindByIdQuery>;
export type FindByIdLazyQueryHookResult = ReturnType<
  typeof useFindByIdLazyQuery
>;
export type FindByIdSuspenseQueryHookResult = ReturnType<
  typeof useFindByIdSuspenseQuery
>;
export type FindByIdQueryResult = Apollo.QueryResult<
  FindByIdQuery,
  FindByIdQueryVariables
>;
export const FindAllDocument = gql`
  query findAll(
    $tenantId: ID!
    $page: Int = 1
    $limit: Int = 25
    $name: String = ""
    $parentId: ID = ""
    $sortBy: SortBy = CREATED_AT
    $sortOrder: SortOrder = DESC
  ) {
    getAllCategories(
      tenantId: $tenantId
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
        tenantId
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
              tenantId
              updatedAt
            }
            tenantId
            updatedAt
          }
          tenantId
          updatedAt
        }
      }
      total
      hasMore
    }
  }
`;

/**
 * __useFindAllQuery__
 *
 * To run a query within a React component, call `useFindAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllQuery({
 *   variables: {
 *      tenantId: // value for 'tenantId'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      name: // value for 'name'
 *      parentId: // value for 'parentId'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useFindAllQuery(
  baseOptions: Apollo.QueryHookOptions<FindAllQuery, FindAllQueryVariables> &
    ({ variables: FindAllQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAllQuery, FindAllQueryVariables>(
    FindAllDocument,
    options,
  );
}
export function useFindAllLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllQuery,
    FindAllQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindAllQuery, FindAllQueryVariables>(
    FindAllDocument,
    options,
  );
}
export function useFindAllSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<FindAllQuery, FindAllQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<FindAllQuery, FindAllQueryVariables>(
    FindAllDocument,
    options,
  );
}
export type FindAllQueryHookResult = ReturnType<typeof useFindAllQuery>;
export type FindAllLazyQueryHookResult = ReturnType<typeof useFindAllLazyQuery>;
export type FindAllSuspenseQueryHookResult = ReturnType<
  typeof useFindAllSuspenseQuery
>;
export type FindAllQueryResult = Apollo.QueryResult<
  FindAllQuery,
  FindAllQueryVariables
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
      tenantId
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
  mutation update(
    $id: String!
    $tenantId: String!
    $input: UpdateProductInput!
  ) {
    updateProduct(id: $id, tenantId: $tenantId, input: $input) {
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
      tenantId
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
 *      tenantId: // value for 'tenantId'
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
  mutation softDelete($id: String!, $tenantId: String!) {
    softDeleteProduct(id: $id, tenantId: $tenantId) {
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
 *      tenantId: // value for 'tenantId'
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
  mutation restore($id: String!, $tenantId: String!) {
    restoreProduct(id: $id, tenantId: $tenantId) {
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
 *      tenantId: // value for 'tenantId'
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
  mutation hardDelete($id: String!, $tenantId: String!) {
    hardDeleteProduct(id: $id, tenantId: $tenantId) {
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
 *      tenantId: // value for 'tenantId'
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
export const GetIdDocument = gql`
  query getId($tenantId: String!, $id: String!) {
    getProductById(tenantId: $tenantId, id: $id) {
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
      tenantId
      productType
      isArchived
    }
  }
`;

/**
 * __useGetIdQuery__
 *
 * To run a query within a React component, call `useGetIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdQuery({
 *   variables: {
 *      tenantId: // value for 'tenantId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetIdQuery, GetIdQueryVariables> &
    ({ variables: GetIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetIdQuery, GetIdQueryVariables>(
    GetIdDocument,
    options,
  );
}
export function useGetIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetIdQuery, GetIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetIdQuery, GetIdQueryVariables>(
    GetIdDocument,
    options,
  );
}
export function useGetIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetIdQuery, GetIdQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetIdQuery, GetIdQueryVariables>(
    GetIdDocument,
    options,
  );
}
export type GetIdQueryHookResult = ReturnType<typeof useGetIdQuery>;
export type GetIdLazyQueryHookResult = ReturnType<typeof useGetIdLazyQuery>;
export type GetIdSuspenseQueryHookResult = ReturnType<
  typeof useGetIdSuspenseQuery
>;
export type GetIdQueryResult = Apollo.QueryResult<
  GetIdQuery,
  GetIdQueryVariables
>;
export const GetAllDocument = gql`
  query getAll(
    $tenantId: String!
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
      tenantId: $tenantId
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
        tenantId
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
 * __useGetAllQuery__
 *
 * To run a query within a React component, call `useGetAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllQuery({
 *   variables: {
 *      tenantId: // value for 'tenantId'
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
export function useGetAllQuery(
  baseOptions: Apollo.QueryHookOptions<GetAllQuery, GetAllQueryVariables> &
    ({ variables: GetAllQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllQuery, GetAllQueryVariables>(
    GetAllDocument,
    options,
  );
}
export function useGetAllLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllQuery, GetAllQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllQuery, GetAllQueryVariables>(
    GetAllDocument,
    options,
  );
}
export function useGetAllSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllQuery, GetAllQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllQuery, GetAllQueryVariables>(
    GetAllDocument,
    options,
  );
}
export type GetAllQueryHookResult = ReturnType<typeof useGetAllQuery>;
export type GetAllLazyQueryHookResult = ReturnType<typeof useGetAllLazyQuery>;
export type GetAllSuspenseQueryHookResult = ReturnType<
  typeof useGetAllSuspenseQuery
>;
export type GetAllQueryResult = Apollo.QueryResult<
  GetAllQuery,
  GetAllQueryVariables
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
    $tenantId: String!
    $input: UpdateVariantInput!
  ) {
    updateVariant(
      id: $id
      productId: $productId
      tenantId: $tenantId
      input: $input
    ) {
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
 *      tenantId: // value for 'tenantId'
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
  mutation archiveVariantOfProduct(
    $id: String!
    $productId: String!
    $tenantId: String!
  ) {
    archiveVariant(id: $id, productId: $productId, tenantId: $tenantId) {
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
 *      tenantId: // value for 'tenantId'
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
  mutation restoreVariantOfProduct(
    $id: String!
    $productId: String!
    $tenantId: String!
  ) {
    restoreVariant(id: $id, productId: $productId, tenantId: $tenantId) {
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
 *      tenantId: // value for 'tenantId'
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
  mutation removeVariantfromProduct(
    $id: String!
    $productId: String!
    $tenantId: String!
  ) {
    removeVariant(id: $id, productId: $productId, tenantId: $tenantId) {
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
 *      tenantId: // value for 'tenantId'
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
