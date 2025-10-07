import { FindCategoriesTreeDocument } from '@graphql/generated';

// Mock data for successful breadcrumb navigation
export const mockCategoryBreadcrumbSuccess = [
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {},
    },
    result: {
      data: {
        getAllCategories: {
          categories: [
            {
              id: '1',
              name: 'Electronics',
              slug: 'electronics',
              parentId: null,
              subCategories: [
                {
                  id: '11',
                  name: 'Computers',
                  slug: 'computers',
                  parentId: '1',
                  subCategories: [
                    {
                      id: '111',
                      name: 'Laptops',
                      slug: 'laptops',
                      parentId: '11',
                      subCategories: [],
                    },
                    {
                      id: '112',
                      name: 'Desktops',
                      slug: 'desktops',
                      parentId: '11',
                      subCategories: [],
                    },
                    {
                      id: '113',
                      name: 'Accessories',
                      slug: 'accessories',
                      parentId: '11',
                      subCategories: [
                        {
                          id: '1131',
                          name: 'Keyboards',
                          slug: 'keyboards',
                          parentId: '113',
                          subCategories: [],
                        },
                        {
                          id: '1132',
                          name: 'Mice',
                          slug: 'mice',
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
                  slug: 'mobile-phones',
                  parentId: '1',
                  subCategories: [
                    {
                      id: '121',
                      name: 'Smartphones',
                      slug: 'smartphones',
                      parentId: '12',
                      subCategories: [],
                    },
                    {
                      id: '122',
                      name: 'Feature Phones',
                      slug: 'feature-phones',
                      parentId: '12',
                      subCategories: [],
                    },
                  ],
                },
                {
                  id: '13',
                  name: 'Audio & Video',
                  slug: 'audio-video',
                  parentId: '1',
                  subCategories: [],
                },
              ],
            },
            {
              id: '2',
              name: 'Clothing',
              slug: 'clothing',
              parentId: null,
              subCategories: [
                {
                  id: '21',
                  name: "Men's Clothing",
                  slug: 'mens-clothing',
                  parentId: '2',
                  subCategories: [
                    {
                      id: '211',
                      name: 'Shirts',
                      slug: 'shirts',
                      parentId: '21',
                      subCategories: [],
                    },
                    {
                      id: '212',
                      name: 'Pants',
                      slug: 'pants',
                      parentId: '21',
                      subCategories: [],
                    },
                  ],
                },
                {
                  id: '22',
                  name: "Women's Clothing",
                  slug: 'womens-clothing',
                  parentId: '2',
                  subCategories: [
                    {
                      id: '221',
                      name: 'Dresses',
                      slug: 'dresses',
                      parentId: '22',
                      subCategories: [],
                    },
                    {
                      id: '222',
                      name: 'Tops',
                      slug: 'tops',
                      parentId: '22',
                      subCategories: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  },
];

// Mock data for loading state
export const mockCategoryBreadcrumbLoading = [
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {},
    },
    result: {
      loading: true,
    },
    delay: 1000,
  },
];

// Mock data for error state
export const mockCategoryBreadcrumbError = [
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {},
    },
    error: new Error('Failed to fetch categories'),
  },
];
