import { nameToSlug } from './path-utils';

/**
 * Builds the inventory detail path using warehouse name and optional variant SKU.
 * Ensures no trailing underscore when SKU is missing.
 * Example: /inventory/warehouse-name_sku-123 or /inventory/warehouse-name
 */
export function buildInventoryPath(warehouseName: string, variantSku?: string) {
  const wh = nameToSlug(warehouseName || '');
  const sku = variantSku ? nameToSlug(variantSku) : '';
  return `/inventory/${wh}${sku ? `_${sku}` : ''}`;
}

/**
 * Parses a `warehouse_sku` segment safely into its parts.
 * Accepts values without underscore.
 */
export function parseWarehouseSku(segment: string): {
  warehouse: string;
  sku?: string;
} {
  if (!segment) return { warehouse: '' };
  const idx = segment.indexOf('_');
  if (idx === -1) return { warehouse: segment };
  const warehouse = segment.slice(0, idx);
  const sku = segment.slice(idx + 1) || undefined;
  return { warehouse, sku };
}
