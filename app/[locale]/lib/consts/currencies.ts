import { CurrencyCodes } from '@graphql/generated';

/** Supported currency codes, derived from the GraphQL schema enum. */
export const CURRENCY_CODES: string[] = Object.values(CurrencyCodes).sort();
