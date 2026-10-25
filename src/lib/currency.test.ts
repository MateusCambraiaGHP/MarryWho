import { describe, expect, it } from 'vitest';
import {
  clampAmount,
  computeFractionAmount,
  formatAmountForClipboard,
  formatAmountInputValue,
  formatBRL,
  minimumContribution,
  parseAmountInput,
  roundCurrency,
} from './currency';

describe('formatBRL', () => {
  it('formats values in Brazilian real with thousands and decimals', () => {
    expect(formatBRL(1234.56)).toBe('R$ 1.234,56');
    expect(formatBRL(5308.94)).toBe('R$ 5.308,94');
    expect(formatBRL(5)).toBe('R$ 5,00');
    expect(formatBRL(0)).toBe('R$ 0,00');
  });

  it('always uses two decimal places', () => {
    expect(formatBRL(99.9)).toBe('R$ 99,90');
  });
});

describe('PIX amount formatting', () => {
  it('formats the amount for the bank app with a comma and two decimals', () => {
    expect(formatAmountForClipboard(150)).toBe('150,00');
    expect(formatAmountForClipboard(1234.5)).toBe('1234,50');
    expect(formatAmountForClipboard(24.857)).toBe('24,86');
  });

  it('matches the value shown in the amount input', () => {
    expect(formatAmountForClipboard(99.9)).toBe(formatAmountInputValue(99.9));
  });

  it('formats the input with Brazilian thousands separators', () => {
    expect(formatAmountInputValue(1234.5)).toBe('1.234,50');
    expect(formatAmountInputValue(5)).toBe('5,00');
  });
});

describe('roundCurrency', () => {
  it('rounds to two decimal places', () => {
    expect(roundCurrency(24.8525)).toBe(24.85);
    expect(roundCurrency(24.8585)).toBe(24.86);
    expect(roundCurrency(10)).toBe(10);
  });
});

describe('parseAmountInput', () => {
  it('accepts Brazilian and plain decimal formats', () => {
    expect(parseAmountInput('R$ 1.234,56')).toBe(1234.56);
    expect(parseAmountInput('1234,56')).toBe(1234.56);
    expect(parseAmountInput('1234.56')).toBe(1234.56);
    expect(parseAmountInput('99,90')).toBe(99.9);
    expect(parseAmountInput(' 80 ')).toBe(80);
  });

  it('rejects empty, zero, negative and non-numeric input', () => {
    expect(parseAmountInput('')).toBeNull();
    expect(parseAmountInput('   ')).toBeNull();
    expect(parseAmountInput('R$')).toBeNull();
    expect(parseAmountInput('0')).toBeNull();
    expect(parseAmountInput('0,00')).toBeNull();
    expect(parseAmountInput('-10')).toBeNull();
    expect(parseAmountInput('abc')).toBeNull();
  });

  it('treats a dot with three digits as a thousands separator', () => {
    expect(parseAmountInput('1.234')).toBe(1234);
  });
});

describe('clampAmount', () => {
  it('never goes below the minimum contribution', () => {
    expect(minimumContribution).toBe(5);
    expect(clampAmount(3)).toBe(5);
    expect(clampAmount(0)).toBe(5);
    expect(clampAmount(12.345)).toBe(12.35);
  });
});

describe('computeFractionAmount', () => {
  it('calculates whole, half and quarter values', () => {
    expect(computeFractionAmount(100, 1)).toBe(100);
    expect(computeFractionAmount(100, 0.5)).toBe(50);
    expect(computeFractionAmount(100, 0.25)).toBe(25);
  });

  it('rounds the fraction to cents', () => {
    expect(computeFractionAmount(99.41, 0.25)).toBe(24.85);
  });

  it('clamps small fractions at the minimum contribution', () => {
    expect(computeFractionAmount(12, 0.25)).toBe(5);
    expect(computeFractionAmount(8, 0.5)).toBe(5);
  });
});
