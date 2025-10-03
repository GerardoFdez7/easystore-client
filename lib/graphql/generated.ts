import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export enum AccountTypeEnum {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE',
  Tenant = 'TENANT'
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
  sku: Scalars['String']['input'];
  upc?: InputMaybe<Scalars['String']['input']>;
  variantCover?: InputMaybe<Scalars['String']['input']>;
  variantMedia?: InputMaybe<Array<CreateMediaInput>>;
  warranties?: InputMaybe<Array<CreateWarrantyInput>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type AddressType = {
  __typename?: 'AddressType';
  addressLine1: Scalars['String']['output'];
  addressLine2?: Maybe<Scalars['String']['output']>;
  addressType: AddressTypeEnum;
  city: Scalars['String']['output'];
  countryId: Scalars['String']['output'];
  deliveryInstructions?: Maybe<Scalars['String']['output']>;
  deliveryNum: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  stateId: Scalars['String']['output'];
};

/** Types of addresses */
export enum AddressTypeEnum {
  Billing = 'BILLING',
  Shipping = 'SHIPPING',
  Warehouse = 'WAREHOUSE'
}

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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  subCategories: Array<Category>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ConditionEnum {
  New = 'NEW',
  Refurbished = 'REFURBISHED',
  Used = 'USED'
}

export type CountryType = {
  __typename?: 'CountryType';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateAddressInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  addressType: AddressTypeEnum;
  city: Scalars['String']['input'];
  countryId: Scalars['String']['input'];
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryNum: Scalars['String']['input'];
  name: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  stateId: Scalars['String']['input'];
};

export type CreateAttributeInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  cover: Scalars['String']['input'];
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
  cover: Scalars['String']['input'];
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
  sku: Scalars['String']['input'];
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

export enum CurrencyCodes {
  Aed = 'AED',
  Afn = 'AFN',
  All = 'ALL',
  Amd = 'AMD',
  Ang = 'ANG',
  Aoa = 'AOA',
  Ars = 'ARS',
  Aud = 'AUD',
  Awg = 'AWG',
  Azn = 'AZN',
  Bam = 'BAM',
  Bbd = 'BBD',
  Bdt = 'BDT',
  Bgn = 'BGN',
  Bhd = 'BHD',
  Bif = 'BIF',
  Bmd = 'BMD',
  Bnd = 'BND',
  Bob = 'BOB',
  Bov = 'BOV',
  Brl = 'BRL',
  Bsd = 'BSD',
  Btn = 'BTN',
  Bwp = 'BWP',
  Byr = 'BYR',
  Bzd = 'BZD',
  Cad = 'CAD',
  Cdf = 'CDF',
  Che = 'CHE',
  Chf = 'CHF',
  Chw = 'CHW',
  Clf = 'CLF',
  Clp = 'CLP',
  Cny = 'CNY',
  Cop = 'COP',
  Cou = 'COU',
  Crc = 'CRC',
  Cuc = 'CUC',
  Cup = 'CUP',
  Cve = 'CVE',
  Czk = 'CZK',
  Djf = 'DJF',
  Dkk = 'DKK',
  Dop = 'DOP',
  Dzd = 'DZD',
  Egp = 'EGP',
  Ern = 'ERN',
  Etb = 'ETB',
  Eur = 'EUR',
  Fjd = 'FJD',
  Fkp = 'FKP',
  Gbp = 'GBP',
  Gel = 'GEL',
  Ghs = 'GHS',
  Gip = 'GIP',
  Gmd = 'GMD',
  Gnf = 'GNF',
  Gtq = 'GTQ',
  Gyd = 'GYD',
  Hkd = 'HKD',
  Hnl = 'HNL',
  Hrk = 'HRK',
  Htg = 'HTG',
  Huf = 'HUF',
  Idr = 'IDR',
  Ils = 'ILS',
  Inr = 'INR',
  Iqd = 'IQD',
  Irr = 'IRR',
  Isk = 'ISK',
  Jmd = 'JMD',
  Jod = 'JOD',
  Jpy = 'JPY',
  Kes = 'KES',
  Kgs = 'KGS',
  Khr = 'KHR',
  Kmf = 'KMF',
  Kpw = 'KPW',
  Krw = 'KRW',
  Kwd = 'KWD',
  Kyd = 'KYD',
  Kzt = 'KZT',
  Lak = 'LAK',
  Lbp = 'LBP',
  Lkr = 'LKR',
  Lrd = 'LRD',
  Lsl = 'LSL',
  Lyd = 'LYD',
  Mad = 'MAD',
  Mdl = 'MDL',
  Mga = 'MGA',
  Mkd = 'MKD',
  Mmk = 'MMK',
  Mnt = 'MNT',
  Mop = 'MOP',
  Mro = 'MRO',
  Mur = 'MUR',
  Mvr = 'MVR',
  Mwk = 'MWK',
  Mxn = 'MXN',
  Mxv = 'MXV',
  Myr = 'MYR',
  Mzn = 'MZN',
  Nad = 'NAD',
  Ngn = 'NGN',
  Nio = 'NIO',
  Nok = 'NOK',
  Npr = 'NPR',
  Nzd = 'NZD',
  Omr = 'OMR',
  Pab = 'PAB',
  Pen = 'PEN',
  Pgk = 'PGK',
  Php = 'PHP',
  Pkr = 'PKR',
  Pln = 'PLN',
  Pyg = 'PYG',
  Qar = 'QAR',
  Ron = 'RON',
  Rsd = 'RSD',
  Rub = 'RUB',
  Rwf = 'RWF',
  Sar = 'SAR',
  Sbd = 'SBD',
  Scr = 'SCR',
  Sdg = 'SDG',
  Sek = 'SEK',
  Sgd = 'SGD',
  Sll = 'SLL',
  Sos = 'SOS',
  Srd = 'SRD',
  Ssp = 'SSP',
  Std = 'STD',
  Svc = 'SVC',
  Syp = 'SYP',
  Szl = 'SZL',
  Thb = 'THB',
  Tjs = 'TJS',
  Tmt = 'TMT',
  Tnd = 'TND',
  Top = 'TOP',
  Try = 'TRY',
  Ttd = 'TTD',
  Twd = 'TWD',
  Tzs = 'TZS',
  Uah = 'UAH',
  Ugx = 'UGX',
  Usd = 'USD',
  Uyi = 'UYI',
  Uyu = 'UYU',
  Uzs = 'UZS',
  Vef = 'VEF',
  Vnd = 'VND',
  Vuv = 'VUV',
  Wst = 'WST',
  Xaf = 'XAF',
  Xcd = 'XCD',
  Xdr = 'XDR',
  Xof = 'XOF',
  Xpf = 'XPF',
  Xsu = 'XSU',
  Xua = 'XUA',
  Yer = 'YER',
  Zar = 'ZAR',
  Zmw = 'ZMW',
  Zwl = 'ZWL'
}

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

export type GetInTouchInput = {
  annualRevenue: Scalars['String']['input'];
  businessEmail: Scalars['String']['input'];
  businessPhone: Scalars['String']['input'];
  company: Scalars['String']['input'];
  country: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  isAgency: Scalars['String']['input'];
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
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

export type MediaAuthResponse = {
  __typename?: 'MediaAuthResponse';
  expire: Scalars['Float']['output'];
  publicKey: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export enum MediaTypeEnum {
  Image = 'IMAGE',
  Video = 'VIDEO'
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
  getInTouch: Response;
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
  updateTenant: Tenant;
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


export type MutationGetInTouchArgs = {
  input: GetInTouchInput;
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


export type MutationUpdateTenantArgs = {
  input: UpdateTenantInput;
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

export type PaginatedAddressesType = {
  __typename?: 'PaginatedAddressesType';
  addresses: Array<AddressType>;
  hasMore: Scalars['Boolean']['output'];
  total: Scalars['Int']['output'];
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
  id: Scalars['ID']['output'];
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
  categoryName?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAddressById: AddressType;
  getAllAddresses: PaginatedAddressesType;
  getAllCategories: PaginatedCategoriesType;
  getAllCountries: Array<CountryType>;
  getAllProducts: PaginatedProductsType;
  getAllStockMovements: PaginatedStockMovementsType;
  getAllWarehouses: PaginatedWarehousesType;
  getCategoryById: Category;
  getMediaUploadToken: MediaAuthResponse;
  getProductById: Product;
  getStatesByCountryId: Array<StateType>;
  getTenantById: Tenant;
  getWarehouseById: Warehouse;
  validateToken: Response;
};


export type QueryGetAddressByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAllAddressesArgs = {
  addressType?: InputMaybe<AddressTypeEnum>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
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
  categoriesIds?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  filters?: InputMaybe<StockPerWarehouseFilterInput>;
  includeAddresses?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  stockFilters?: InputMaybe<StockPerWarehouseFilterInput>;
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProductByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetStatesByCountryIdArgs = {
  countryId: Scalars['ID']['input'];
};


export type QueryGetWarehouseByIdArgs = {
  id: Scalars['ID']['input'];
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum SortBy {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StateType = {
  __typename?: 'StateType';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type StockMovement = {
  __typename?: 'StockMovement';
  deltaQty: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  occurredAt: Scalars['DateTime']['output'];
  productName?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  variantFirstAttribute?: Maybe<VariantAttribute>;
  variantSku?: Maybe<Scalars['String']['output']>;
  warehouseId: Scalars['ID']['output'];
};

export type StockPerWarehouse = {
  __typename?: 'StockPerWarehouse';
  estimatedReplenishmentDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  productLocation?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  qtyAvailable: Scalars['Int']['output'];
  qtyReserved: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  variantFirstAttribute?: Maybe<VariantAttribute>;
  variantId: Scalars['ID']['output'];
  variantSku?: Maybe<Scalars['String']['output']>;
  warehouseId: Scalars['ID']['output'];
};

export type StockPerWarehouseFilterInput = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  lowStockThreshold?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<StockPerWarehouseSortBy>;
  variantId?: InputMaybe<Scalars['String']['input']>;
};

export type StockPerWarehouseSortBy = {
  available?: InputMaybe<SortOrder>;
  replenishmentDate?: InputMaybe<SortOrder>;
  reserved?: InputMaybe<SortOrder>;
  variantFirstAttribute?: InputMaybe<SortOrder>;
};

export type Sustainability = {
  __typename?: 'Sustainability';
  certification: Scalars['String']['output'];
  recycledPercentage: Scalars['Float']['output'];
};

export type Tenant = {
  __typename?: 'Tenant';
  businessName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: CurrencyCodes;
  defaultBillingAddressId?: Maybe<Scalars['ID']['output']>;
  defaultPhoneNumberId?: Maybe<Scalars['ID']['output']>;
  defaultShippingAddressId?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  ownerName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum TypeEnum {
  Digital = 'DIGITAL',
  Physical = 'PHYSICAL'
}

export type UpdateAddressInput = {
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  addressType?: InputMaybe<AddressTypeEnum>;
  city?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryNum?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateTenantInput = {
  businessName?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<CurrencyCodes>;
  defaultBillingAddressId?: InputMaybe<Scalars['ID']['input']>;
  defaultPhoneNumberId?: InputMaybe<Scalars['ID']['input']>;
  defaultShippingAddressId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  ownerName?: InputMaybe<Scalars['String']['input']>;
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
  id: Scalars['ID']['output'];
  installmentPayments?: Maybe<Array<Installment>>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  isbn?: Maybe<Scalars['String']['output']>;
  personalizationOptions?: Maybe<Array<Scalars['String']['output']>>;
  price: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
  upc?: Maybe<Scalars['String']['output']>;
  variantCover?: Maybe<Scalars['String']['output']>;
  variantMedia?: Maybe<Array<Media>>;
  warranties?: Maybe<Array<Warranty>>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type VariantAttribute = {
  __typename?: 'VariantAttribute';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Warehouse = {
  __typename?: 'Warehouse';
  addressId: Scalars['ID']['output'];
  addressLine1?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
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
    id: string;
    addressLine1: string;
    addressLine2?: string | null;
    addressType: AddressTypeEnum;
    city: string;
    countryId: string;
    stateId: string;
    deliveryNum: string;
    name: string;
    postalCode: string;
    deliveryInstructions?: string | null;
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
    id: string;
    addressLine1: string;
    addressLine2?: string | null;
    addressType: AddressTypeEnum;
    city: string;
    countryId: string;
    stateId: string;
    deliveryNum: string;
    name: string;
    postalCode: string;
    deliveryInstructions?: string | null;
  };
};

export type DeleteAddressMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteAddressMutation = { __typename?: 'Mutation', deleteAddress: { __typename?: 'AddressType', id: string, name: string } };

export type FindAddressByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type FindAddressByIdQuery = {
  __typename?: 'Query';
  getAddressById: {
    __typename?: 'AddressType';
    id: string;
    addressLine1: string;
    addressLine2?: string | null;
    addressType: AddressTypeEnum;
    city: string;
    countryId: string;
    stateId: string;
    deliveryNum: string;
    name: string;
    postalCode: string;
    deliveryInstructions?: string | null;
  };
};

export type FindAllAddressesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  addressType?: InputMaybe<AddressTypeEnum>;
}>;

export type FindAllAddressesQuery = {
  __typename?: 'Query';
  getAllAddresses: {
    __typename?: 'PaginatedAddressesType';
    total: number;
    hasMore: boolean;
    addresses: Array<{
      __typename?: 'AddressType';
      id: string;
      addressLine1: string;
      addressLine2?: string | null;
      addressType: AddressTypeEnum;
      city: string;
      countryId: string;
      stateId: string;
      deliveryNum: string;
      name: string;
      postalCode: string;
      deliveryInstructions?: string | null;
    }>;
  };
};

export type FindAllAddressesQuery = { __typename?: 'Query', getAllAddresses: { __typename?: 'PaginatedAddressesType', total: number, hasMore: boolean, addresses: Array<{ __typename?: 'AddressType', id: string, addressLine1: string, addressLine2?: string | null, addressType: AddressTypeEnum, city: string, countryId: string, stateId: string, deliveryNum: string, name: string, postalCode: string, deliveryInstructions?: string | null }> } };

export type FindAllCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllCountriesQuery = { __typename?: 'Query', getAllCountries: Array<{ __typename?: 'CountryType', id: string, name: string, code: string }> };

export type FindStatesByCountryIdQueryVariables = Exact<{
  countryId: Scalars['ID']['input'];
}>;


export type FindStatesByCountryIdQuery = { __typename?: 'Query', getStatesByCountryId: Array<{ __typename?: 'StateType', id: string, name: string, code: string }> };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  accountType: AccountTypeEnum;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthIdentity', email: string, accountType: AccountTypeEnum } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  accountType: AccountTypeEnum;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Response', success: boolean, message: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  accountType: AccountTypeEnum;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'Response', success: boolean, message: string } };

export type UpdatePasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'Response', success: boolean, message: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Response', success: boolean, message: string } };

export type GetInTouchMutationVariables = Exact<{
  fullName: Scalars['String']['input'];
  businessEmail: Scalars['String']['input'];
  businessPhone: Scalars['String']['input'];
  company: Scalars['String']['input'];
  websiteUrl: Scalars['String']['input'];
  country: Scalars['String']['input'];
  annualRevenue: Scalars['String']['input'];
  isAgency: Scalars['String']['input'];
}>;


export type GetInTouchMutation = { __typename?: 'Mutation', getInTouch: { __typename?: 'Response', success: boolean, message: string } };

export type ValidateTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidateTokenQuery = { __typename?: 'Query', validateToken: { __typename?: 'Response', success: boolean, message: string } };

export type GetMediaTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMediaTokenQuery = { __typename?: 'Query', getMediaUploadToken: { __typename?: 'MediaAuthResponse', token: string, expire: number, signature: string, publicKey: string } };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'Category';
    id: string;
    name: string;
    description?: string | null;
    cover: string;
    subCategories: Array<{
      __typename?: 'Category';
      id: string;
      cover: string;
      description?: string | null;
      name: string;
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
    id: string;
    name: string;
    description?: string | null;
    cover: string;
    subCategories: Array<{
      __typename?: 'Category';
      id: string;
      name: string;
      description?: string | null;
      cover: string;
      subCategories: Array<{
        __typename?: 'Category';
        id: string;
        name: string;
        description?: string | null;
        cover: string;
      }>;
    }>;
  };
};

export type DeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteMutation = {
  __typename?: 'Mutation';
  deleteCategory: { __typename?: 'Category'; name: string };
};

export type FindCategoryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type FindCategoryByIdQuery = {
  __typename?: 'Query';
  getCategoryById: {
    __typename?: 'Category';
    id: string;
    name: string;
    description?: string | null;
    cover: string;
    updatedAt: any;
    createdAt: any;
    subCategories: Array<{
      __typename?: 'Category';
      id: string;
      name: string;
      description?: string | null;
      cover: string;
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
  includeSubcategories?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type FindAllCategoriesQuery = {
  __typename?: 'Query';
  getAllCategories: {
    __typename?: 'PaginatedCategoriesType';
    total: number;
    hasMore: boolean;
    categories: Array<{
      __typename?: 'Category';
      id: string;
      name: string;
      description?: string | null;
      cover: string;
      updatedAt: any;
      createdAt: any;
      parentId?: string | null;
      subCategories: Array<{
        __typename?: 'Category';
        id: string;
        parentId?: string | null;
        name: string;
        description?: string | null;
        cover: string;
        createdAt: any;
        updatedAt: any;
      }>;
    }>;
  };
};

export type FindCategoriesForPickerQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  includeSubcategories?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type FindCategoriesForPickerQuery = {
  __typename?: 'Query';
  getAllCategories: {
    __typename?: 'PaginatedCategoriesType';
    total: number;
    hasMore: boolean;
    categories: Array<{
      __typename?: 'Category';
      id: string;
      name: string;
      cover: string;
    }>;
  };
};

export type FindCategoriesTreeQueryVariables = Exact<{
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
}>;

export type FindCategoriesTreeQuery = {
  __typename?: 'Query';
  getAllCategories: {
    __typename?: 'PaginatedCategoriesType';
    categories: Array<{
      __typename?: 'Category';
      id: string;
      name: string;
      parentId?: string | null;
      subCategories: Array<{
        __typename?: 'Category';
        id: string;
        parentId?: string | null;
        name: string;
        subCategories: Array<{
          __typename?: 'Category';
          id: string;
          parentId?: string | null;
          name: string;
          subCategories: Array<{
            __typename?: 'Category';
            id: string;
            parentId?: string | null;
            name: string;
            subCategories: Array<{
              __typename?: 'Category';
              id: string;
              parentId?: string | null;
              name: string;
              subCategories: Array<{
                __typename?: 'Category';
                id: string;
                parentId?: string | null;
                name: string;
                subCategories: Array<{
                  __typename?: 'Category';
                  id: string;
                  parentId?: string | null;
                  name: string;
                  subCategories: Array<{
                    __typename?: 'Category';
                    id: string;
                    parentId?: string | null;
                    name: string;
                    subCategories: Array<{
                      __typename?: 'Category';
                      id: string;
                      parentId?: string | null;
                      name: string;
                      subCategories: Array<{
                        __typename?: 'Category';
                        id: string;
                        parentId?: string | null;
                        name: string;
                        subCategories: Array<{
                          __typename?: 'Category';
                          id: string;
                          parentId?: string | null;
                          name: string;
                        }>;
                      }>;
                    }>;
                  }>;
                }>;
              }>;
            }>;
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


export type FindAllMovementsQuery = { __typename?: 'Query', getAllStockMovements: { __typename?: 'PaginatedStockMovementsType', total: number, hasMore: boolean, stockMovements: Array<{ __typename?: 'StockMovement', id: string, warehouseId: string, deltaQty: number, reason: string, occurredAt: any }> } };

export type AddStockToWarehouseMutationVariables = Exact<{
  warehouseId: Scalars['ID']['input'];
  variantId: Scalars['ID']['input'];
  input: AddStockToWarehouseInput;
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddStockToWarehouseMutation = { __typename?: 'Mutation', addStockToWarehouse: { __typename?: 'Warehouse', id: string, name: string, createdAt: any, updatedAt: any, stockPerWarehouses: Array<{ __typename?: 'StockPerWarehouse', id: string, warehouseId: string, qtyAvailable: number, qtyReserved: number, lotNumber?: string | null, serialNumbers?: Array<string> | null, productLocation?: string | null, estimatedReplenishmentDate?: any | null, productName?: string | null, variantSku?: string | null, variantFirstAttribute?: { __typename?: 'VariantAttribute', key: string, value: string } | null }> } };

export type UpdateStockInWarehouseMutationVariables = Exact<{
  warehouseId: Scalars['ID']['input'];
  stockId: Scalars['ID']['input'];
  input: UpdateStockInWarehouseInput;
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateStockInWarehouseMutation = { __typename?: 'Mutation', updateStockInWarehouse: { __typename?: 'Warehouse', id: string, name: string, addressId: string, createdAt: any, updatedAt: any, stockPerWarehouses: Array<{ __typename?: 'StockPerWarehouse', id: string, warehouseId: string, qtyAvailable: number, qtyReserved: number, lotNumber?: string | null, serialNumbers?: Array<string> | null, productLocation?: string | null, estimatedReplenishmentDate?: any | null }> } };

export type RemoveStockFromWarehouseMutationVariables = Exact<{
  warehouseId: Scalars['ID']['input'];
  stockId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type RemoveStockFromWarehouseMutation = { __typename?: 'Mutation', removeStockFromWarehouse: { __typename?: 'Warehouse', id: string, name: string, addressId: string, createdAt: any, updatedAt: any, stockPerWarehouses: Array<{ __typename?: 'StockPerWarehouse', id: string, warehouseId: string, qtyAvailable: number, qtyReserved: number, lotNumber?: string | null, serialNumbers?: Array<string> | null, productLocation?: string | null, estimatedReplenishmentDate?: any | null }> } };

export type CreateWarehouseMutationVariables = Exact<{
  input: CreateWarehouseInput;
}>;


export type CreateWarehouseMutation = { __typename?: 'Mutation', createWarehouse: { __typename?: 'Warehouse', id: string, name: string, addressId: string, createdAt: any, updatedAt: any } };

export type UpdateWarehouseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateWarehouseInput;
}>;


export type UpdateWarehouseMutation = { __typename?: 'Mutation', updateWarehouse: { __typename?: 'Warehouse', id: string, name: string, addressId: string, createdAt: any, updatedAt: any } };

export type DeleteWarehouseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteWarehouseMutation = { __typename?: 'Mutation', deleteWarehouse: { __typename?: 'Warehouse', name: string } };

export type FindWarehouseByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindWarehouseByIdQuery = { __typename?: 'Query', getWarehouseById: { __typename?: 'Warehouse', id: string, name: string, stockPerWarehouses: Array<{ __typename?: 'StockPerWarehouse', id: string, warehouseId: string, qtyAvailable: number, qtyReserved: number, lotNumber?: string | null, serialNumbers?: Array<string> | null, productLocation?: string | null, estimatedReplenishmentDate?: any | null, variantSku?: string | null, productName?: string | null, variantFirstAttribute?: { __typename?: 'VariantAttribute', key: string, value: string } | null }> } };

export type FindInventoryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  addressId?: InputMaybe<Scalars['ID']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  includeAddresses?: InputMaybe<Scalars['Boolean']['input']>;
  filters?: InputMaybe<StockPerWarehouseFilterInput>;
}>;


export type FindInventoryQuery = { __typename?: 'Query', getAllWarehouses: { __typename?: 'PaginatedWarehousesType', total: number, hasMore: boolean, warehouses: Array<{ __typename?: 'Warehouse', id: string, name: string, createdAt: any, updatedAt: any, addressId: string, addressLine1?: string | null, city?: string | null, countryCode?: string | null, postalCode?: string | null, stockPerWarehouses: Array<{ __typename?: 'StockPerWarehouse', id: string, qtyAvailable: number, qtyReserved: number, lotNumber?: string | null, serialNumbers?: Array<string> | null, productLocation?: string | null, estimatedReplenishmentDate?: any | null, variantId: string, variantSku?: string | null, productName?: string | null, variantFirstAttribute?: { __typename?: 'VariantAttribute', key: string, value: string } | null }> }> } };

export type FindWarehousesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  addressId?: InputMaybe<Scalars['ID']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
}>;


export type FindWarehousesQuery = { __typename?: 'Query', getAllWarehouses: { __typename?: 'PaginatedWarehousesType', total: number, hasMore: boolean, warehouses: Array<{ __typename?: 'Warehouse', id: string, name: string, addressId: string, addressLine1?: string | null, city?: string | null, countryCode?: string | null, postalCode?: string | null }> } };

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
      sku: string;
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
      categoryName?: string | null;
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
      id: string;
      barcode?: string | null;
      condition: ConditionEnum;
      ean?: string | null;
      isbn?: string | null;
      personalizationOptions?: Array<string> | null;
      price: number;
      sku: string;
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


export type SoftDeleteMutation = { __typename?: 'Mutation', softDeleteProduct: { __typename?: 'Product', name: string, isArchived: boolean } };

export type RestoreMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RestoreMutation = { __typename?: 'Mutation', restoreProduct: { __typename?: 'Product', name: string, isArchived: boolean } };

export type HardDeleteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type HardDeleteMutation = { __typename?: 'Mutation', hardDeleteProduct: { __typename?: 'Product', name: string } };

export type FindProductByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type FindProductByIdQuery = {
  __typename?: 'Query';
  getProductById: {
    __typename?: 'Product';
    id: string;
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
      categoryName?: string | null;
    }> | null;
    variants?: Array<{
      __typename?: 'Variant';
      id: string;
      price: number;
      condition: ConditionEnum;
      weight?: number | null;
      sku: string;
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
  categoriesIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
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
    hasMore: boolean;
    products: Array<{
      __typename?: 'Product';
      id: string;
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
        categoryName?: string | null;
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
        sku: string;
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

export type FindAllVariantsToCreateStockQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  includeSoftDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;

export type FindAllVariantsToCreateStockQuery = {
  __typename?: 'Query';
  getAllProducts: {
    __typename?: 'PaginatedProductsType';
    total: number;
    hasMore: boolean;
    products: Array<{
      __typename?: 'Product';
      name: string;
      variants?: Array<{
        __typename?: 'Variant';
        id: string;
        sku: string;
        attributes: Array<{
          __typename?: 'Attribute';
          key: string;
          value: string;
        }>;
      }> | null;
    }>;
  };
};

export type AddVariantToProductMutationVariables = Exact<{
  input: CreateVariantInput;
}>;


export type AddVariantToProductMutation = { __typename?: 'Mutation', addVariant: { __typename?: 'Product', variants?: Array<{ __typename?: 'Variant', price: number, condition: ConditionEnum, attributes: Array<{ __typename?: 'Attribute', key: string, value: string }> }> | null } };

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
      sku: string;
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


export type ArchiveVariantOfProductMutation = { __typename?: 'Mutation', archiveVariant: { __typename?: 'Product', variants?: Array<{ __typename?: 'Variant', isArchived?: boolean | null }> | null } };

export type RestoreVariantOfProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
}>;


export type RestoreVariantOfProductMutation = { __typename?: 'Mutation', restoreVariant: { __typename?: 'Product', variants?: Array<{ __typename?: 'Variant', isArchived?: boolean | null }> | null } };

export type RemoveVariantfromProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
  productId: Scalars['String']['input'];
}>;

export type RemoveVariantfromProductMutation = {
  __typename?: 'Mutation';
  removeVariant: {
    __typename?: 'Product';
    variants?: Array<{ __typename?: 'Variant'; sku: string }> | null;
  };
};

export type UpdateTenantProfileMutationVariables = Exact<{
  input: UpdateTenantInput;
}>;


export type UpdateTenantProfileMutation = { __typename?: 'Mutation', updateTenant: { __typename?: 'Tenant', ownerName: string, email: string, businessName?: string | null, description?: string | null, domain?: string | null, logo?: string | null, defaultPhoneNumberId?: string | null } };

export type FindTenantProfileQueryVariables = Exact<{ [key: string]: never; }>;

export type FindTenantAuthInfoQueryVariables = Exact<{ [key: string]: never }>;

export type FindTenantAuthInfoQuery = {
  __typename?: 'Query';
  getTenantById: {
    __typename?: 'Tenant';
    ownerName: string;
    businessName?: string | null;
    logo?: string | null;
  };
};

export const CreateAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateAddressInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAddress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addressLine1' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addressLine2' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'addressType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'stateId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deliveryNum' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deliveryInstructions' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAddressMutation,
  CreateAddressMutationVariables
>;
export const UpdateAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateAddressInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAddress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addressLine1' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addressLine2' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'addressType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'stateId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deliveryNum' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deliveryInstructions' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateAddressMutation,
  UpdateAddressMutationVariables
>;
export const DeleteAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteAddress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteAddressMutation,
  DeleteAddressMutationVariables
>;
export const FindAddressByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findAddressById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAddressById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addressLine1' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addressLine2' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'addressType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'stateId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deliveryNum' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deliveryInstructions' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindAddressByIdQuery,
  FindAddressByIdQueryVariables
>;
export const FindAllAddressesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findAllAddresses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '1' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          defaultValue: { kind: 'StringValue', value: '', block: false },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'addressType' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'AddressTypeEnum' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllAddresses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'addressType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'addressType' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addressLine1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addressLine2' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addressType' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'countryId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stateId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deliveryNum' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postalCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deliveryInstructions' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindAllAddressesQuery,
  FindAllAddressesQueryVariables
>;
export const FindAllCountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findAllCountries' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllCountries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindAllCountriesQuery,
  FindAllCountriesQueryVariables
>;
export const FindStatesByCountryIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findStatesByCountryId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'countryId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getStatesByCountryId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'countryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'countryId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindStatesByCountryIdQuery,
  FindStatesByCountryIdQueryVariables
>;
export const RegisterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'register' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AccountTypeEnum' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accountType' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'accountType' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'accountType' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AccountTypeEnum' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accountType' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'accountType' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ForgotPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'forgotPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AccountTypeEnum' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'forgotPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accountType' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'accountType' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const UpdatePasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updatePassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'token' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'token' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'logout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'logout' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetInTouchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'getInTouch' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'fullName' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'businessEmail' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'businessPhone' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'company' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'websiteUrl' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'country' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'annualRevenue' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'isAgency' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getInTouch' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'fullName' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'fullName' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'businessEmail' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'businessEmail' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'businessPhone' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'businessPhone' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'company' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'company' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'websiteUrl' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'websiteUrl' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'country' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'country' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'annualRevenue' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'annualRevenue' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'isAgency' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'isAgency' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetInTouchMutation, GetInTouchMutationVariables>;
export const ValidateTokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'validateToken' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'validateToken' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ValidateTokenQuery, ValidateTokenQueryVariables>;
export const GetMediaTokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getMediaToken' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getMediaUploadToken' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expire' } },
                { kind: 'Field', name: { kind: 'Name', value: 'signature' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicKey' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMediaTokenQuery, GetMediaTokenQueryVariables>;
export const CreateCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateCategoryInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subCategories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export const UpdateCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateCategoryInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subCategories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subCategories' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cover' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
export const DeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'delete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteMutation, DeleteMutationVariables>;
export const FindCategoryByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findCategoryById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getCategoryById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subCategories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindCategoryByIdQuery,
  FindCategoryByIdQueryVariables
>;
export const FindAllCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findAllCategories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '1' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          defaultValue: { kind: 'StringValue', value: '', block: false },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'parentId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          defaultValue: { kind: 'NullValue' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortBy' } },
          defaultValue: { kind: 'EnumValue', value: 'NAME' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortOrder' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SortOrder' },
          },
          defaultValue: { kind: 'EnumValue', value: 'ASC' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'includeSubcategories' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'parentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'parentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortOrder' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortOrder' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeSubcategories' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'includeSubcategories' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'parentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subCategories' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'parentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cover' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindAllCategoriesQuery,
  FindAllCategoriesQueryVariables
>;
export const FindCategoriesForPickerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findCategoriesForPicker' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '1' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          defaultValue: { kind: 'StringValue', value: '', block: false },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'parentId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          defaultValue: { kind: 'NullValue' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortBy' } },
          defaultValue: { kind: 'EnumValue', value: 'NAME' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortOrder' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SortOrder' },
          },
          defaultValue: { kind: 'EnumValue', value: 'ASC' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'includeSubcategories' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'parentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'parentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortOrder' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortOrder' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeSubcategories' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'includeSubcategories' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindCategoriesForPickerQuery,
  FindCategoriesForPickerQueryVariables
>;
export const FindCategoriesTreeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findCategoriesTree' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortBy' } },
          defaultValue: { kind: 'EnumValue', value: 'NAME' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortOrder' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SortOrder' },
          },
          defaultValue: { kind: 'EnumValue', value: 'ASC' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortOrder' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortOrder' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'parentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subCategories' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'parentId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'subCategories' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'parentId' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'subCategories',
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'parentId',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'subCategories',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'parentId',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'name',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'subCategories',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'id',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'parentId',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'name',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'subCategories',
                                                      },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: {
                                                              kind: 'Name',
                                                              value: 'id',
                                                            },
                                                          },
                                                          {
                                                            kind: 'Field',
                                                            name: {
                                                              kind: 'Name',
                                                              value: 'parentId',
                                                            },
                                                          },
                                                          {
                                                            kind: 'Field',
                                                            name: {
                                                              kind: 'Name',
                                                              value: 'name',
                                                            },
                                                          },
                                                          {
                                                            kind: 'Field',
                                                            name: {
                                                              kind: 'Name',
                                                              value:
                                                                'subCategories',
                                                            },
                                                            selectionSet: {
                                                              kind: 'SelectionSet',
                                                              selections: [
                                                                {
                                                                  kind: 'Field',
                                                                  name: {
                                                                    kind: 'Name',
                                                                    value: 'id',
                                                                  },
                                                                },
                                                                {
                                                                  kind: 'Field',
                                                                  name: {
                                                                    kind: 'Name',
                                                                    value:
                                                                      'parentId',
                                                                  },
                                                                },
                                                                {
                                                                  kind: 'Field',
                                                                  name: {
                                                                    kind: 'Name',
                                                                    value:
                                                                      'name',
                                                                  },
                                                                },
                                                                {
                                                                  kind: 'Field',
                                                                  name: {
                                                                    kind: 'Name',
                                                                    value:
                                                                      'subCategories',
                                                                  },
                                                                  selectionSet:
                                                                    {
                                                                      kind: 'SelectionSet',
                                                                      selections:
                                                                        [
                                                                          {
                                                                            kind: 'Field',
                                                                            name: {
                                                                              kind: 'Name',
                                                                              value:
                                                                                'id',
                                                                            },
                                                                          },
                                                                          {
                                                                            kind: 'Field',
                                                                            name: {
                                                                              kind: 'Name',
                                                                              value:
                                                                                'parentId',
                                                                            },
                                                                          },
                                                                          {
                                                                            kind: 'Field',
                                                                            name: {
                                                                              kind: 'Name',
                                                                              value:
                                                                                'name',
                                                                            },
                                                                          },
                                                                          {
                                                                            kind: 'Field',
                                                                            name: {
                                                                              kind: 'Name',
                                                                              value:
                                                                                'subCategories',
                                                                            },
                                                                            selectionSet:
                                                                              {
                                                                                kind: 'SelectionSet',
                                                                                selections:
                                                                                  [
                                                                                    {
                                                                                      kind: 'Field',
                                                                                      name: {
                                                                                        kind: 'Name',
                                                                                        value:
                                                                                          'id',
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      kind: 'Field',
                                                                                      name: {
                                                                                        kind: 'Name',
                                                                                        value:
                                                                                          'parentId',
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      kind: 'Field',
                                                                                      name: {
                                                                                        kind: 'Name',
                                                                                        value:
                                                                                          'name',
                                                                                      },
                                                                                    },
                                                                                    {
                                                                                      kind: 'Field',
                                                                                      name: {
                                                                                        kind: 'Name',
                                                                                        value:
                                                                                          'subCategories',
                                                                                      },
                                                                                      selectionSet:
                                                                                        {
                                                                                          kind: 'SelectionSet',
                                                                                          selections:
                                                                                            [
                                                                                              {
                                                                                                kind: 'Field',
                                                                                                name: {
                                                                                                  kind: 'Name',
                                                                                                  value:
                                                                                                    'id',
                                                                                                },
                                                                                              },
                                                                                              {
                                                                                                kind: 'Field',
                                                                                                name: {
                                                                                                  kind: 'Name',
                                                                                                  value:
                                                                                                    'parentId',
                                                                                                },
                                                                                              },
                                                                                              {
                                                                                                kind: 'Field',
                                                                                                name: {
                                                                                                  kind: 'Name',
                                                                                                  value:
                                                                                                    'name',
                                                                                                },
                                                                                              },
                                                                                            ],
                                                                                        },
                                                                                    },
                                                                                  ],
                                                                              },
                                                                          },
                                                                        ],
                                                                    },
                                                                },
                                                              ],
                                                            },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindCategoriesTreeQuery,
  FindCategoriesTreeQueryVariables
>;
export const FindAllMovementsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findAllMovements' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'warehouseId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '1' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '10' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'variantId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createdById' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateFrom' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateTo' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'includeDeleted' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortBy' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortOrder' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SortOrder' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllStockMovements' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'warehouseId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'warehouseId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'variantId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'variantId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createdById' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createdById' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dateFrom' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dateFrom' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dateTo' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dateTo' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeDeleted' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'includeDeleted' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortOrder' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortOrder' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'stockMovements' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deltaQty' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'reason' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'occurredAt' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindAllMovementsQuery,
  FindAllMovementsQueryVariables
>;
export const AddStockToWarehouseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addStockToWarehouse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'warehouseId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'variantId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddStockToWarehouseInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reason' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addStockToWarehouse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'warehouseId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'warehouseId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'variantId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'variantId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reason' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reason' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'stockPerWarehouses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'qtyAvailable' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'qtyReserved' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lotNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'serialNumbers' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productLocation' },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'estimatedReplenishmentDate',
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantFirstAttribute' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'key' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantSku' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddStockToWarehouseMutation,
  AddStockToWarehouseMutationVariables
>;
export const UpdateStockInWarehouseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateStockInWarehouse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'warehouseId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'stockId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateStockInWarehouseInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reason' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateStockInWarehouse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'warehouseId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'warehouseId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'stockId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'stockId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reason' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reason' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'stockPerWarehouses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'qtyAvailable' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'qtyReserved' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lotNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'serialNumbers' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productLocation' },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'estimatedReplenishmentDate',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateStockInWarehouseMutation,
  UpdateStockInWarehouseMutationVariables
>;
export const RemoveStockFromWarehouseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'removeStockFromWarehouse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'warehouseId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'stockId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reason' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeStockFromWarehouse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'warehouseId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'warehouseId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'stockId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'stockId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reason' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reason' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'stockPerWarehouses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'qtyAvailable' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'qtyReserved' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lotNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'serialNumbers' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productLocation' },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'estimatedReplenishmentDate',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveStockFromWarehouseMutation,
  RemoveStockFromWarehouseMutationVariables
>;
export const CreateWarehouseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createWarehouse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateWarehouseInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createWarehouse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateWarehouseMutation,
  CreateWarehouseMutationVariables
>;
export const UpdateWarehouseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateWarehouse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateWarehouseInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateWarehouse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateWarehouseMutation,
  UpdateWarehouseMutationVariables
>;
export const DeleteWarehouseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteWarehouse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteWarehouse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteWarehouseMutation,
  DeleteWarehouseMutationVariables
>;
export const FindWarehouseByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findWarehouseById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getWarehouseById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'stockPerWarehouses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'qtyAvailable' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'qtyReserved' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lotNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'serialNumbers' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productLocation' },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'estimatedReplenishmentDate',
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantSku' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantFirstAttribute' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'key' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productName' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindWarehouseByIdQuery,
  FindWarehouseByIdQueryVariables
>;
export const FindInventoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findInventory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '1' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '10' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'addressId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortBy' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortOrder' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SortOrder' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllWarehouses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'addressId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'addressId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortOrder' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortOrder' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stockPerWarehouses' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'qtyAvailable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'qtyReserved' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'estimatedReplenishmentDate',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'variantFirstAttribute',
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'key' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'variantSku' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindInventoryQuery, FindInventoryQueryVariables>;
export const FindWarehousesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findWarehouses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '1' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '10' },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'addressId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortBy' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortOrder' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SortOrder' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllWarehouses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'addressId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'addressId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortOrder' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortOrder' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeAddresses' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addressId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addressLine1' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'countryCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postalCode' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindWarehousesQuery, FindWarehousesQueryVariables>;
export const CreateProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateProductInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shortDescription' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'longDescription' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'productType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                { kind: 'Field', name: { kind: 'Name', value: 'brand' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'manufacturer' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'attributes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'key' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantCover' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'upc' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalizationOptions' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'isbn' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'installmentPayments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'months' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interestRate' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'ean' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dimension' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'length' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'condition' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'barcode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warranties' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'instructions' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'months' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverage' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantMedia' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'variantId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'position' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mediaType' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sustainabilities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'recycledPercentage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'certification' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'media' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mediaType' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantId' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'categoryId' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const UpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'update' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateProductInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'brand' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'categoryId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'categoryName' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'longDescription' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'manufacturer' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'media' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mediaType' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantId' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'productType' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shortDescription' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sustainabilities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'certification' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'recycledPercentage' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'attributes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'key' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'barcode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'condition' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dimension' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'length' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'ean' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'installmentPayments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interestRate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'months' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'isbn' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalizationOptions' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'upc' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantCover' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantMedia' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mediaType' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'position' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'variantId' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warranties' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverage' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'instructions' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'months' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateMutation, UpdateMutationVariables>;
export const SoftDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'softDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'softDeleteProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SoftDeleteMutation, SoftDeleteMutationVariables>;
export const RestoreDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'restore' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'restoreProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RestoreMutation, RestoreMutationVariables>;
export const HardDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'hardDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'hardDeleteProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HardDeleteMutation, HardDeleteMutationVariables>;
export const FindProductByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findProductById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProductById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shortDescription' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'longDescription' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                { kind: 'Field', name: { kind: 'Name', value: 'brand' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'manufacturer' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'media' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mediaType' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'position' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'categoryId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'categoryName' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'condition' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'attributes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'key' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dimension' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'length' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'ean' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'upc' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isbn' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'barcode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantCover' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantMedia' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mediaType' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'position' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'variantId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productId' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warranties' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverage' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'instructions' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'months' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'installmentPayments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interestRate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'months' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalizationOptions' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sustainabilities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'certification' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'recycledPercentage' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'productType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindProductByIdQuery,
  FindProductByIdQueryVariables
>;
export const FindAllProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findAllProducts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          defaultValue: { kind: 'IntValue', value: '1' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          defaultValue: { kind: 'IntValue', value: '10' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'categoriesIds' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
          defaultValue: { kind: 'ListValue', values: [] },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'TypeEnum' },
          },
          defaultValue: { kind: 'EnumValue', value: 'PHYSICAL' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortBy' } },
          defaultValue: { kind: 'EnumValue', value: 'NAME' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortOrder' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SortOrder' },
          },
          defaultValue: { kind: 'EnumValue', value: 'ASC' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'includeSoftDeleted' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          defaultValue: { kind: 'StringValue', value: '', block: false },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllProducts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'categoriesIds' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'categoriesIds' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'type' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortOrder' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortOrder' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeSoftDeleted' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'includeSoftDeleted' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'brand' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'categories' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'categoryId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'categoryName' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'cover' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'longDescription' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'manufacturer' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'media' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mediaType' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'position' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'variantId' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isArchived' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productType' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shortDescription' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sustainabilities' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'certification' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'recycledPercentage',
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variants' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'attributes' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'key' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'barcode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'condition' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'dimension' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'length' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'width' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ean' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'installmentPayments',
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'interestRate',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'months' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isbn' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'personalizationOptions',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sku' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'upc' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'variantCover' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'variantMedia' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'mediaType' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'position' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'productId' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'variantId' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'warranties' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'coverage' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'instructions',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'months' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'weight' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindAllProductsQuery,
  FindAllProductsQueryVariables
>;
export const FindAllVariantsToCreateStockDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findAllVariantsToCreateStock' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          defaultValue: { kind: 'IntValue', value: '1' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          defaultValue: { kind: 'IntValue', value: '10' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortBy' } },
          defaultValue: { kind: 'EnumValue', value: 'NAME' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sortOrder' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SortOrder' },
          },
          defaultValue: { kind: 'EnumValue', value: 'ASC' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'includeSoftDeleted' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          defaultValue: { kind: 'StringValue', value: '', block: false },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllProducts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortOrder' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sortOrder' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeSoftDeleted' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'includeSoftDeleted' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variants' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'attributes' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'key' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sku' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindAllVariantsToCreateStockQuery,
  FindAllVariantsToCreateStockQueryVariables
>;
export const AddVariantToProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addVariantToProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateVariantInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addVariant' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'condition' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'attributes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'key' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddVariantToProductMutation,
  AddVariantToProductMutationVariables
>;
export const UpdateVariantInProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateVariantInProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'productId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateVariantInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateVariant' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'productId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'productId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'attributes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'key' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'barcode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'condition' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dimension' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'length' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'width' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'ean' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'installmentPayments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interestRate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'months' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'isbn' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalizationOptions' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'upc' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantCover' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'variantMedia' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mediaType' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'position' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'variantId' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warranties' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverage' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'instructions' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'months' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateVariantInProductMutation,
  UpdateVariantInProductMutationVariables
>;
export const ArchiveVariantOfProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'archiveVariantOfProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'productId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'archiveVariant' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'productId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'productId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isArchived' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ArchiveVariantOfProductMutation,
  ArchiveVariantOfProductMutationVariables
>;
export const RestoreVariantOfProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'restoreVariantOfProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'productId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'restoreVariant' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'productId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'productId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isArchived' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RestoreVariantOfProductMutation,
  RestoreVariantOfProductMutationVariables
>;
export const RemoveVariantfromProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'removeVariantfromProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'productId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeVariant' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'productId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'productId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveVariantfromProductMutation,
  RemoveVariantfromProductMutationVariables
>;
export const UpdateTenantProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateTenantProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateTenantInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateTenant' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ownerName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'businessName' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'defaultPhoneNumberId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateTenantProfileMutation,
  UpdateTenantProfileMutationVariables
>;
export const FindTenantProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findTenantProfile' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getTenantById' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ownerName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'businessName' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'defaultPhoneNumberId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindTenantProfileQuery,
  FindTenantProfileQueryVariables
>;
export const FindTenantAuthInfoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findTenantAuthInfo' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getTenantById' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ownerName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'businessName' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindTenantAuthInfoQuery,
  FindTenantAuthInfoQueryVariables
>;
