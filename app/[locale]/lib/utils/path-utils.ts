/**
 * Utility functions for handling path resolution and slug conversion
 * Generic utilities that can be used for categories, products, or any other entities
 */

/**
 * Converts a name to a URL-friendly slug
 * Handles edge cases like apostrophes, special characters, and diacritics
 * Preserves commonly used special characters like &, +, %, etc.
 * @param name - The name to convert
 * @returns A URL-friendly slug
 */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s'&+%$@!()[\]{}.,-]/g, '') // Preserve common special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();
}

/**
 * Converts a slug back to a formatted name
 * @param slug - The slug to convert
 * @returns A formatted name
 */
export function slugToName(slug: string): string {
  // First decode any URL-encoded characters (like %26 -> &)
  const decodedSlug = decodeURIComponent(slug);

  return decodedSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Creates a hierarchical path from an array of names
 * @param names - Array of names in hierarchical order
 * @returns A URL path string
 */
export function createHierarchicalPath(names: string[]): string {
  return names.map(nameToSlug).join('/');
}

/**
 * Parses a hierarchical path into individual slugs
 * @param path - The path string
 * @returns Array of slugs
 */
export function parseHierarchicalPath(path: string): string[] {
  return path.split('/').filter(Boolean);
}

// Calculate current category path depth from URL
export const getCurrentPathDepth = (): number => {
  if (typeof window === 'undefined') return 0;

  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const categoryPathSegments = pathSegments.slice(2); // Remove locale and 'categories'

  return categoryPathSegments.length;
};
