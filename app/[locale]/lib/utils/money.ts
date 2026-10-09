import type { Money } from '@graphql/generated';

/**
 * Money amounts travel as exact Decimal strings (see the backend monetary
 * contract). They are never converted to `number`.
 */

/** Normalizes a decimal string: no leading/trailing zeros, no negative zero. */
export const normalizeDecimal = (value: string): string => {
  const trimmed = value.trim();
  const negative = trimmed.startsWith('-');
  const [intPart = '', fracPart = ''] = trimmed.replace(/^[+-]/, '').split('.');
  const integer = intPart.replace(/^0+(?=\d)/, '') || '0';
  const fraction = fracPart.replace(/0+$/, '');
  const unsigned = fraction ? `${integer}.${fraction}` : integer;
  return negative && unsigned !== '0' ? `-${unsigned}` : unsigned;
};

/** Whether the string is a non-negative amount with at most 2 decimals ("12", "12.", "12.5"). */
export const isDecimalString = (value: string): boolean =>
  /^\d+\.?\d{0,2}$/.test(value.trim());

/** Whether the amount is a valid decimal string greater than zero. */
export const isPositiveDecimal = (value: string): boolean =>
  isDecimalString(value) && /[1-9]/.test(value);

/**
 * Chart-only exception to the "never `number`" rule: charting libraries need a
 * numeric coordinate. Returns the amount in minor units (cents) as a safe
 * integer, or null when it is not a valid amount. Never display, store, or do
 * arithmetic with the result; render the original decimal string instead.
 */
export const toChartCoordinate = (amount: string): number | null => {
  if (!isDecimalString(amount) || amount.endsWith('.')) return null;

  const [whole, fraction = ''] = amount.trim().split('.');
  const cents = BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'));
  return cents > BigInt(Number.MAX_SAFE_INTEGER) ? null : Number(cents);
};

/**
 * Intl.NumberFormat (v3) formats exact decimal strings without rounding through
 * a float, but the bundled TS typings only declare `number | bigint`.
 */
const asIntlNumber = (amount: string) => amount as unknown as number;

const formatters = new Map<string, Intl.NumberFormat>();

const getFormatter = (currency: string, locale: string) => {
  const key = `${locale}:${currency}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    formatters.set(key, formatter);
  }
  return formatter;
};

/** Renders an amount with the symbol and precision of its ISO 4217 currency. */
export const formatMoney = (
  money: Pick<Money, 'amount' | 'currency'>,
  locale: string = 'en-US',
): string =>
  getFormatter(money.currency, locale).format(asIntlNumber(money.amount));

/** Renders an amount with grouping and the currency's decimals, no symbol. */
export const formatAmount = (
  amount: string,
  currency: string,
  locale: string = 'en-US',
): string =>
  getFormatter(currency, locale)
    .formatToParts(asIntlNumber(amount))
    .filter((part) => part.type !== 'currency' && part.type !== 'literal')
    .map((part) => part.value)
    .join('');
