import type { Money, MoneyInput } from '@graphql/generated';

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

/** Whether the string is a plain non-negative decimal such as "12", "12." or "12.50". */
export const isDecimalString = (value: string): boolean =>
  /^\d+\.?\d*$/.test(value.trim());

/** Builds the GraphQL MoneyInput from a decimal string and its currency. */
export const toMoneyInput = (amount: string, currency: string): MoneyInput => ({
  amount: normalizeDecimal(amount),
  currency,
});

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
