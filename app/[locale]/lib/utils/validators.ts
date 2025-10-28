/** Common validation helpers */

/** UUID v7 regex pattern */
export const uuidV7Regex =
  /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/;

/** Returns true if the given string is a valid UUID v7 */
export function isUuidV7(value?: string | null): boolean {
  return typeof value === 'string' ? uuidV7Regex.test(value) : false;
}
