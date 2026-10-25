import { describe, expect, it } from 'vitest';
import { buildPixPayload, computePixCrc16, formatPixAmount } from './pix';

const originalPayload =
  '00020126580014BR.GOV.BCB.PIX0136a4a3c787-96ad-4b1b-8c6e-589d082451845204000053039865802BR5921LORENNA MILLARD SOUZA6014BELO HORIZONTE62070503***63045FB2';

function referenceCrc16(payload: string): string {
  let crc = 0xffff;

  for (let index = 0; index < payload.length; index += 1) {
    crc ^= payload.charCodeAt(index) << 8;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) !== 0 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function readTlv(payload: string, startIndex = 0) {
  const id = payload.slice(startIndex, startIndex + 2);
  const lengthCode = payload.slice(startIndex + 2, startIndex + 4);
  const length = Number(lengthCode);
  const value = payload.slice(startIndex + 4, startIndex + 4 + length);

  return {
    id,
    lengthCode,
    value,
    nextIndex: startIndex + 4 + length,
  };
}

function findField(payload: string, fieldId: string) {
  let index = 0;

  while (index < payload.length - 4) {
    const field = readTlv(payload, index);

    if (field.id === fieldId) {
      return field;
    }

    if (field.id === '63') {
      break;
    }

    index = field.nextIndex;
  }

  return null;
}

function expectValidCrc(payload: string) {
  expect(payload.slice(-4)).toBe(referenceCrc16(payload.slice(0, -4)));
}

describe('buildPixPayload', () => {
  it('rebuilds the original static payload byte for byte when there is no amount', () => {
    const payload = buildPixPayload();

    expect(payload).toBe(originalPayload);
    expect(payload).toHaveLength(151);
    expect(payload.endsWith('63045FB2')).toBe(true);
    expectValidCrc(payload);
  });

  it('adds field 54 in the correct position with a valid TLV length and CRC', () => {
    const payload = buildPixPayload(123.45);
    const amountField = findField(payload, '54');
    const amountIndex = payload.indexOf('5406123.45');
    const currencyIndex = payload.indexOf('5303986');
    const countryIndex = payload.indexOf('5802BR');

    expect(amountField).toEqual({
      id: '54',
      lengthCode: '06',
      value: '123.45',
      nextIndex: expect.any(Number),
    });
    expect(amountIndex).toBeGreaterThan(currencyIndex);
    expect(amountIndex).toBeLessThan(countryIndex);
    expectValidCrc(payload);
  });

  it('matches an independently assembled payload for a known amount', () => {
    const payloadWithoutCrc = originalPayload.slice(0, -4);
    const withAmount = payloadWithoutCrc.replace('5303986', '53039865406123.45');
    const expected = `${withAmount}${referenceCrc16(withAmount)}`;

    expect(buildPixPayload(123.45)).toBe(expected);
  });

  it('serializes the minimum contribution as 5.00', () => {
    const payload = buildPixPayload(5);
    const amountField = findField(payload, '54');

    expect(amountField?.value).toBe('5.00');
    expect(amountField?.lengthCode).toBe('04');
    expect(payload).toContain('54045.00');
    expectValidCrc(payload);
  });

  it('rounds to cents and serializes with a dot and two decimals', () => {
    expect(formatPixAmount(123.456)).toBe('123.46');
    expect(formatPixAmount(5308.9)).toBe('5308.90');
    expect(findField(buildPixPayload(5308.9), '54')?.value).toBe('5308.90');
  });

  it('omits the amount field for empty, null, undefined and zero values', () => {
    for (const amount of [undefined, null, 0]) {
      const payload = buildPixPayload(amount);

      expect(findField(payload, '54')).toBeNull();
      expect(payload).toBe(originalPayload);
    }
  });

  it('rejects NaN, negative and non-finite amounts', () => {
    expect(() => buildPixPayload(Number.NaN)).toThrow(RangeError);
    expect(() => buildPixPayload(-1)).toThrow(RangeError);
    expect(() => buildPixPayload(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });

  it('rejects amounts that exceed the 13-character PIX field limit', () => {
    expect(() => buildPixPayload(10_000_000_000)).toThrow(RangeError);
  });

  it('keeps every original merchant field untouched', () => {
    const payload = buildPixPayload(150);

    expect(payload).toContain(
      '0014BR.GOV.BCB.PIX0136a4a3c787-96ad-4b1b-8c6e-589d08245184',
    );
    expect(payload).toContain('52040000');
    expect(payload).toContain('5303986');
    expect(payload).toContain('5802BR');
    expect(payload).toContain('5921LORENNA MILLARD SOUZA');
    expect(payload).toContain('6014BELO HORIZONTE');
    expect(payload).toContain('62070503***');
  });
});

describe('computePixCrc16', () => {
  it('computes the original payload CRC', () => {
    expect(computePixCrc16(originalPayload.slice(0, -4))).toBe('5FB2');
  });
});

describe('formatPixAmount', () => {
  it('returns null for values that must not produce an amount field', () => {
    expect(formatPixAmount(undefined)).toBeNull();
    expect(formatPixAmount(null)).toBeNull();
    expect(formatPixAmount(0)).toBeNull();
  });
});

