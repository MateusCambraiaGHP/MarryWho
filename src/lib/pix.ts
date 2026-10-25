import { pixMerchant, type PixMerchant } from '../content/pix';

export const minimumPixAmountLength = 4;
export const maximumPixAmountLength = 13;

function toTlv(id: string, value: string): string {
  if (value.length > 99) {
    throw new RangeError(`O campo ${id} do PIX excede 99 caracteres.`);
  }

  return `${id}${String(value.length).padStart(2, '0')}${value}`;
}

export function computePixCrc16(payload: string): string {
  let crc = 0xffff;

  for (const character of payload) {
    crc ^= character.charCodeAt(0) << 8;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) !== 0 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function formatPixAmount(amount: number | null | undefined): string | null {
  if (amount === null || amount === undefined || amount === 0) {
    return null;
  }

  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError('O valor do PIX precisa ser um número positivo.');
  }

  const amountInCents = Math.round(amount * 100);
  if (amountInCents === 0) {
    return null;
  }

  const serialized = (amountInCents / 100).toFixed(2);

  if (
    serialized.length < minimumPixAmountLength ||
    serialized.length > maximumPixAmountLength
  ) {
    throw new RangeError(
      `O valor do PIX precisa ter entre ${minimumPixAmountLength} e ${maximumPixAmountLength} caracteres.`,
    );
  }

  return serialized;
}

export function buildPixPayload(
  amount?: number | null,
  merchant: PixMerchant = pixMerchant,
): string {
  const amountField = formatPixAmount(amount);
  const merchantAccount = `${toTlv('00', 'BR.GOV.BCB.PIX')}${toTlv('01', merchant.key)}`;
  const additionalData = toTlv('05', merchant.txid);

  const payload = [
    toTlv('00', '01'),
    toTlv('26', merchantAccount),
    toTlv('52', merchant.mcc),
    toTlv('53', merchant.currency),
    amountField ? toTlv('54', amountField) : '',
    toTlv('58', merchant.country),
    toTlv('59', merchant.name),
    toTlv('60', merchant.city),
    toTlv('62', additionalData),
    '6304',
  ].join('');

  return `${payload}${computePixCrc16(payload)}`;
}
