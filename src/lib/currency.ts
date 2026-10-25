export const minimumContribution = 5;

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const amountInputFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatBRL(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;
  return brlFormatter.format(safeValue).replace(/\u00A0/g, ' ');
}

export function formatAmountInputValue(value: number): string {
  return amountInputFormatter.format(roundCurrency(value));
}

export function formatAmountForClipboard(value: number): string {
  return roundCurrency(value).toFixed(2).replace('.', ',');
}

export function parseAmountInput(rawValue: string): number | null {
  if (rawValue.includes('-')) {
    return null;
  }

  const digitsAndSeparators = rawValue.replace(/[^\d.,]/g, '');
  if (!/\d/.test(digitsAndSeparators)) {
    return null;
  }

  let normalized: string;

  if (digitsAndSeparators.includes(',')) {
    normalized = digitsAndSeparators.replace(/\./g, '').replace(',', '.');
  } else {
    const parts = digitsAndSeparators.split('.');
    const looksLikeDecimal = parts.length === 2 && parts[1].length > 0 && parts[1].length <= 2;
    normalized = looksLikeDecimal ? digitsAndSeparators : digitsAndSeparators.replace(/\./g, '');
  }

  const value = Number(normalized);
  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return roundCurrency(value);
}

export function clampAmount(value: number): number {
  return Math.max(minimumContribution, roundCurrency(value));
}

export function computeFractionAmount(price: number, factor: number): number {
  return clampAmount(price * factor);
}
