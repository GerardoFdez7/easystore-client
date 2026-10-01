import { nameToSlug } from '@lib/utils/path-utils';

export interface CategoryLookupNode {
  id: string;
  name: string;
  subCategories?: CategoryLookupNode[];
}

function createCategoryIdMap(
  categories: CategoryLookupNode[],
  getKeys: (category: CategoryLookupNode) => string[],
): Map<string, string> {
  const categoryIds = new Map<string, string>();

  const addCategory = (category: CategoryLookupNode) => {
    for (const key of getKeys(category)) {
      categoryIds.set(key, category.id);
    }

    for (const subcategory of category.subCategories ?? []) {
      addCategory(subcategory);
    }
  };

  for (const category of categories) {
    addCategory(category);
  }

  return categoryIds;
}

export function createCategoryPathIdMap(
  categories: CategoryLookupNode[],
): Map<string, string> {
  return createCategoryIdMap(categories, (category) => {
    const lowercaseName = category.name.toLowerCase();
    return [lowercaseName, lowercaseName.replace(/\s+/g, '-')];
  });
}

export function createCategorySlugIdMap(
  categories: CategoryLookupNode[],
): Map<string, string> {
  return createCategoryIdMap(categories, (category) => [
    nameToSlug(category.name),
    category.name.toLowerCase(),
  ]);
}
