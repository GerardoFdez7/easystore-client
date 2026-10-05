import { z } from 'zod';
import { CurrencyCodes } from '@graphql/generated';

type Translate = (key: string) => string;

const isDomainLabel = (label: string) =>
  label.length > 0 &&
  label.length <= 63 &&
  !label.startsWith('-') &&
  !label.endsWith('-') &&
  /^[a-z0-9-]+$/.test(label);

const isValidDomain = (value: string) => {
  const labels = value.toLowerCase().split('.');
  return (
    value.length <= 253 &&
    labels.length >= 2 &&
    labels.every(isDomainLabel) &&
    /^[a-z]{2,63}$/.test(labels[labels.length - 1] ?? '')
  );
};

/** Optional text field: empty is allowed (it clears the value), otherwise `rule` applies. */
const optional = (rule: (value: string) => boolean, message: string) =>
  z
    .string()
    .trim()
    .refine((value) => value === '' || rule(value), { message });

/**
 * Mirrors the store entity's value objects in easystore-services:
 * Name (2-100), LongDescription (20-2000), Domain, Media (URL) and Currency.
 */
export const buildStoreSchema = (t: Translate) =>
  z.object({
    name: optional(
      (value) => value.length >= 2 && value.length <= 100,
      t('nameLength'),
    ),
    description: optional(
      (value) => value.length >= 20 && value.length <= 2000,
      t('descriptionLength'),
    ),
    domain: optional(isValidDomain, t('domainInvalid')),
    currency: z.enum(CurrencyCodes),
    logo: optional((value) => URL.canParse(value), t('logoInvalid')),
  });

export type StoreFormValues = z.infer<ReturnType<typeof buildStoreSchema>>;
