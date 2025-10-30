/** Inventory-specific utilities */

/**
 * Normalize a warehouse name coming from slug-like text into a readable form
 * Example: "central-warehouse" -> "central warehouse"
 */
export function normalizeWarehouseName(name?: string): string | undefined {
  if (!name) return name;
  return name.split('-').join(' ').trim().toLowerCase();
}
