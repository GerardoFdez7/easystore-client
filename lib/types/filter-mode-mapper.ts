import { ProductFilterMode } from '@graphql/generated';

export type FilterType = 'All' | 'Actives' | 'Archived';

/**
 * Maps FilterType to ProductFilterMode enum
 * @param filterType - The filter type from the UI component
 * @returns The corresponding ProductFilterMode enum value
 */
export function mapFilterTypeToProductFilterMode(
  filterType: FilterType,
): ProductFilterMode {
  switch (filterType) {
    case 'All':
      return ProductFilterMode.All;
    case 'Actives':
      return ProductFilterMode.Actives;
    case 'Archived':
      return ProductFilterMode.Archives;
    default:
      return ProductFilterMode.All;
  }
}

/**
 * Maps ProductFilterMode enum to FilterType
 * @param filterMode - The ProductFilterMode enum value
 * @returns The corresponding FilterType for the UI component
 */
export function mapProductFilterModeToFilterType(
  filterMode: ProductFilterMode,
): FilterType {
  switch (filterMode) {
    case ProductFilterMode.All:
      return 'All';
    case ProductFilterMode.Actives:
      return 'Actives';
    case ProductFilterMode.Archives:
      return 'Archived';
    default:
      return 'All';
  }
}
