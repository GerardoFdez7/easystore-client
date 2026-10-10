import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import {
  isMoneyAmount,
  normalizeDecimal,
  sumMoney,
} from '../../app/[locale]/lib/utils/money';

interface Vectors {
  normalize: [string, string][];
  allocate: { total: string; weights: number[]; expected: string[] }[];
  validAmounts: string[];
  invalidAmounts: string[];
}

// Identical copy of easystore-services/docs/monetary-test-vectors.json.
const vectors = JSON.parse(
  readFileSync(join(process.cwd(), 'docs/monetary-test-vectors.json'), 'utf8'),
) as Vectors;

// The client has no `round` or `allocate` helper yet; add those vectors here
// when one is introduced (docs/MONETARY-CONTRACT.md, "Arithmetic").
describe('shared monetary vectors', () => {
  for (const [input, expected] of vectors.normalize) {
    it(`normalizes ${input} to ${expected}`, () => {
      assert.equal(normalizeDecimal(input), expected);
    });
  }

  for (const amount of vectors.validAmounts) {
    it(`accepts ${amount}`, () => {
      assert.equal(isMoneyAmount(amount), true);
    });
  }

  for (const amount of vectors.invalidAmounts) {
    it(`rejects ${JSON.stringify(amount)}`, () => {
      assert.equal(isMoneyAmount(amount), false);
    });
  }

  // sumMoney must add allocated shares back to the exact total. Negative
  // totals are skipped: the dashboard never sums negative amounts.
  for (const { total, weights, expected } of vectors.allocate) {
    if (total.startsWith('-')) continue;
    it(`sums the shares of ${total} across ${weights} to the total`, () => {
      const sum = sumMoney(
        expected.map((amount) => ({ amount, currency: 'USD' })),
      );
      assert.equal(
        normalizeDecimal(sum?.amount ?? ''),
        normalizeDecimal(total),
      );
    });
  }

  it('returns null for mixed currencies and invalid amounts', () => {
    assert.equal(
      sumMoney([
        { amount: '1', currency: 'USD' },
        { amount: '1', currency: 'GTQ' },
      ]),
      null,
    );
    assert.equal(sumMoney([{ amount: '1.234', currency: 'USD' }]), null);
    assert.equal(sumMoney([]), null);
  });
});
