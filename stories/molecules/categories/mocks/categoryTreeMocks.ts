import { CategoryTreeNode } from '@hooks/domains/category';
import {
  FindCategoriesTreeDocument,
  SortBy,
  SortOrder,
} from '@graphql/generated';

// Mock tree data with nested categories
export const mockCategoryTreeData: CategoryTreeNode[] = [
  {
    id: '1',
    name: 'Electronics',
    parentId: null,
    subCategories: [
      {
        id: '11',
        name: 'Computers',
        parentId: '1',
        subCategories: [
          {
            id: '111',
            name: 'Laptops',
            parentId: '11',
            subCategories: [],
          },
          {
            id: '112',
            name: 'Desktops',
            parentId: '11',
            subCategories: [],
          },
          {
            id: '113',
            name: 'Accessories',
            parentId: '11',
            subCategories: [
              {
                id: '1131',
                name: 'Keyboards',
                parentId: '113',
                subCategories: [],
              },
              {
                id: '1132',
                name: 'Mice',
                parentId: '113',
                subCategories: [],
              },
            ],
          },
        ],
      },
      {
        id: '12',
        name: 'Mobile Phones',
        parentId: '1',
        subCategories: [
          {
            id: '121',
            name: 'Smartphones',
            parentId: '12',
            subCategories: [],
          },
          {
            id: '122',
            name: 'Feature Phones',
            parentId: '12',
            subCategories: [],
          },
        ],
      },
      {
        id: '13',
        name: 'Audio & Video',
        parentId: '1',
        subCategories: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Clothing',
    parentId: null,
    subCategories: [
      {
        id: '21',
        name: "Men's Clothing",
        parentId: '2',
        subCategories: [
          {
            id: '211',
            name: 'Shirts',
            parentId: '21',
            subCategories: [],
          },
          {
            id: '212',
            name: 'Pants',
            parentId: '21',
            subCategories: [],
          },
        ],
      },
      {
        id: '22',
        name: "Women's Clothing",
        parentId: '2',
        subCategories: [
          {
            id: '221',
            name: 'Dresses',
            parentId: '22',
            subCategories: [],
          },
          {
            id: '222',
            name: 'Blouses',
            parentId: '22',
            subCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Home & Garden',
    parentId: null,
    subCategories: [
      {
        id: '31',
        name: 'Furniture',
        parentId: '3',
        subCategories: [],
      },
      {
        id: '32',
        name: 'Garden Tools',
        parentId: '3',
        subCategories: [],
      },
    ],
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    parentId: null,
    subCategories: [],
  },
];

// Convert CategoryTreeNode to GraphQL format for mocking
const convertToGqlFormat = (node: CategoryTreeNode): CategoryTreeNode => ({
  id: node.id,
  name: node.name,
  parentId: node.parentId,
  subCategories: node.subCategories?.map(convertToGqlFormat) || [],
});

// Mock for successful tree query
export const mockCategoryTreeSuccess = [
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Desc,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: mockCategoryTreeData.map(convertToGqlFormat),
        },
      },
    },
  },
];

// Mock for loading state
export const mockCategoryTreeLoading = [
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Desc,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: [],
        },
      },
    },
    delay: Infinity, // Simulate loading delay
  },
];

// Mock for empty state
export const mockCategoryTreeEmpty = [
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Desc,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: [],
        },
      },
    },
  },
];

// Mock for error state
export const mockCategoryTreeError = [
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Desc,
      },
    },
    error: new Error('Failed to load categories'),
  },
];
