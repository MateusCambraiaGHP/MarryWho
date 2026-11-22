export function buildWhatsAppUrl(phone: string | null, message: string): string | null {
  const digits = phone?.replace(/\D/g, '') ?? '';
  if (!digits) {
    return null;
  }

  const internationalNumber = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
}
