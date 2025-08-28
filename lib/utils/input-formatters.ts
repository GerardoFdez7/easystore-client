/**
 * Utility functions for formatting input values
 */

/**
 * Formats a numeric input value to ensure it has a decimal point
 * Adds '.0' to the end if the value is a whole number without a decimal point
 * @param value - The input value to format
 * @returns The formatted value with decimal point if needed
 */
export const formatDecimalInput = (value: string): string => {
  if (value && !isNaN(Number(value)) && value.indexOf('.') === -1) {
    return `${value}.0`;
  }
  return value;
};

/**
 * Sanitizes decimal input by removing non-numeric characters except decimal point
 * @param value - The input value to sanitize
 * @returns The sanitized value containing only numbers and decimal point
 */
export const sanitizeDecimalInput = (value: string): string => {
  return value.replace(/[^0-9.]/g, '');
};

/**
 * Sanitizes numeric input by removing all non-numeric characters
 * @param value - The input value to sanitize
 * @returns The sanitized value containing only numbers
 */
export const sanitizeNumericInput = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Combined handler for decimal input onChange events
 * @param value - The input value
 * @param setValue - Function to set the sanitized value
 */
export const handleDecimalInputChange = (
  value: string,
  setValue: (value: string) => void,
): void => {
  const sanitizedValue = sanitizeDecimalInput(value);
  setValue(sanitizedValue);
};

/**
 * Combined handler for decimal input onBlur events
 * @param value - The input value
 * @param setValue - Function to set the formatted value
 */
export const handleDecimalInputBlur = (
  value: string,
  setValue: (value: string) => void,
): void => {
  const formattedValue = formatDecimalInput(value);
  setValue(formattedValue);
};
