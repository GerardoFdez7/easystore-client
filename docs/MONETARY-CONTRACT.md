# Monetary contract (client)

Client implementation guide for the backend contract in
`easystore-services/docs/MONETARY-CONTRACT.md`. The backend file is canonical; if the
two disagree, the backend file wins and this file must be fixed.

## Rules

1. **Money is `{ amount, currency }`.** `amount` is a Decimal **string** (for example
   `"12.5"`), `currency` is an ISO 4217 code. Read both from GraphQL `Money` values (cart
   items, totals, dashboard). A variant's `price` is the exception, in both the API
   output and its inputs: it is only a Decimal amount, and its currency is the
   product's. Variants never carry or choose their own currency.
2. **Never use `number` for money.** Not for state, form values, props, transport, or
   arithmetic. Do not call `Number()`, `parseFloat()`, `toFixed()`, or `+` on an
   amount. `Money.amount` is typed `any` by codegen: treat it as `string` and narrow it
   at the boundary.
3. **Scale is always 2.** Inputs accept at most 2 fractional digits and never round
   silently. The backend remains authoritative and rejects anything else.
4. **Normalize before sending.** Use `normalizeDecimal(amount)`; it strips leading
   integer zeros, trailing fractional zeros, and negative zero (`"12.50"` is sent as
   `"12.5"`), and never emits exponent notation or a `+` sign. Do not hand-format
   amounts. Display shows two decimals; transport does not.
5. **Display with `Intl`.** Use `formatMoney` / `formatAmount`. They render amounts
   with the currency's symbol and exactly 2 decimals, from the decimal string, with
   no float round trip. Do not use `toLocaleString` on numbers or hardcode symbols
   or currency codes such as `Q`, `$`, or `GTQ`.
6. **Currency comes from data, never from config.** Use the value's own
   `price.currency` or the product's `currency` (or the product draft's). The store
   currency (`useStoreInfo().store.currency`) is only the default for a new product.
   No environment variable or constant holds a default currency.
7. **One currency per calculation.** Assert that currencies match before combining
   `Money` values; never add amounts of different currencies.
8. **Server is authoritative.** Never submit totals, taxes, or discounts; send ids and
   quantities. Client math is a preview; when the server responds, render the server's
   values without local adjustment.
9. **Rates are not money.** Tax, discount, and interest rates and other ratios are not
   `Money`; they have their own typed fields and may have more than 2 fractional
   digits. Plan prices and promotion values have no currency column yet, so they are
   not `Money` either.

## Supported currencies and scale

The client supports exactly the currencies the backend supports, currently **GTQ** and
**USD**. The list comes from the generated `CurrencyCodes` enum (`server/graphql/generated.ts`),
which codegen produces from the backend schema; never list supported codes by hand or in constants or components (use
`CurrencyCodes.Gtq`, not `'GTQ'`, where a typed value is needed). Story fixtures for
`Money` values may use literal codes.

To keep both sides in sync when the backend adds a currency, run `npm run gql`; the
currency select and every type update from the enum with no other client change. The
backend contract (`easystore-services/docs/MONETARY-CONTRACT.md`, "Adding a currency")
defines when and how a currency is added.

Every supported currency is priced with exactly 2 decimals. Never derive the number of
decimals from `Intl` or the currency; the helpers always format 2 decimals.

## Required building blocks

All money helpers live in `app/[locale]/lib/utils/money.ts`:

| Helper              | Purpose                                                   |
| ------------------- | --------------------------------------------------------- |
| `isDecimalString`   | Validates a non-negative decimal string (form validation) |
| `normalizeDecimal`  | Canonical transport form of a decimal string              |
| `formatMoney`       | Symbol + 2 decimals for a `Money` value                   |
| `formatAmount`      | Grouped 2-decimal amount without a symbol (for inputs)    |
| `toChartCoordinate` | Chart-only numeric coordinate (cents); never displayed    |

Add new helpers here; do not scatter money logic across components or hooks.

## Forms

- Money fields hold a decimal **string** in React Hook Form state and validate with
  `isDecimalString` in the Zod schema, plus the 2-decimal limit.
- The input sanitizer keeps only digits and one decimal separator and never converts
  the value to a number. Show the formatted value only while the field is not focused.
- The currency badge next to the price shows the form's selected currency.
- The currency is a required form field (`currency`). Never fall back to a guessed
  currency; submit stays blocked until one is selected.

## Arithmetic

The client does no money arithmetic today. When a feature needs it (for example cart
previews):

- Use one exact-decimal library (`decimal.js` first choice), added with explicit
  approval, behind helpers in `money.ts`. Never use `number` or BigInt cents ad hoc.
- Follow the backend rounding rules: half away from zero, round once at line/total
  boundaries, round each line then sum, and allocate remainders by the backend rule.
- Run the shared vectors from `easystore-services/docs/monetary-test-vectors.json`
  (normalize, round, allocate) against the helpers; copy the file into the client when
  the first arithmetic helper is added and keep it identical.
- Convert back to a normalized decimal string before the value leaves the helper.

## Currencies per product, store, and cart

- Currency belongs to the **product**. Every variant of a product is priced in the
  product's currency, so variants never carry or choose their own. The product form
  has a required currency select that defaults to the store currency once it loads;
  the value is part of the product form state and of the product draft.
- Variant inputs send only the amount (`price` is a normalized Decimal string).
  Variant forms show the product currency next to the price (`PriceConditionFormField`
  takes it as a prop). Read it from the product (or the product draft for a new
  product), never from the store or a constant.
- A variant's `price` is a plain Decimal string in both the API output and its inputs;
  it has no currency. Display it with `formatMoney({ amount: variant.price, currency })`,
  where `currency` is `product.currency` (or the product form's `currency` value for
  drafts). Never read a currency off a variant.
- The store currency can change at any time. Read it from the Apollo cache and refetch
  after a store update. It only supplies the default for a new product; changing it
  never reprices or restricts existing variants.
- Every dashboard monetary value is in the authenticated tenant's configured currency;
  render it with that currency and do not mix it with product currencies.
- Changing a product's currency is allowed in the UI and keeps every variant amount
  (no conversion). The server rejects it when orders already
  contain one of its variants in the current currency (`PRODUCT_CURRENCY_LOCKED`,
  `CONFLICT`); surface the localized error through the centralized error path.
- A cart holds one currency, set by its first item (an empty cart accepts any). The
  server rejects adding a variant whose product currency differs from the items already
  in the cart, and checkout rejects a line whose currency differs from the order's;
  surface those errors and do not combine totals of different currencies.
- Order lines snapshot price and currency on the server and never change; render them
  as returned.

## Stories and tests

Cover money behavior with executable assertions where risk warrants: normalization,
rejecting a third decimal, formatting for a non-USD currency, and the not-loaded
currency state. Fixtures follow the API shape: every product fixture has a `currency`,
variant `price` values (API outputs, inputs, and form values) are decimal strings such
as `'12.5'`, and `Money` fixtures (cart, totals) are `{ amount: '12.5', currency: 'USD' }`.
Never use numbers.

## Review checklist

- No `number`, `Number()`, `parseFloat()`, `toFixed()`, or float arithmetic on amounts.
- No hardcoded currency symbol, currency code, or default-currency env variable.
- Amounts are normalized with `normalizeDecimal`; display uses `formatMoney`/`formatAmount`.
- Currency is read from the product (or draft) or the `Money` value itself; the store
  currency only seeds a new product.
- No client-submitted totals, taxes, or discounts.
- Any combination of `Money` values asserts matching currencies.
