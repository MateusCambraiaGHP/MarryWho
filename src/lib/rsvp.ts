export type RsvpInput = {
  name: string;
  attending: boolean;
  adults: number;
  children: number;
  email: string;
  phone: string;
  notes: string;
};

export function buildRsvpSummary(input: RsvpInput): string {
  const lines = [
    'Confirmação de presença — Lorenna & Bruno',
    '',
    `Nome: ${input.name.trim()}`,
    `Presença: ${input.attending ? 'Sim' : 'Não'}`,
  ];

  lines.push(
    `Adultos: ${input.attending ? input.adults : 0}`,
    `Crianças: ${input.attending ? input.children : 0}`,
    `E-mail: ${input.email.trim()}`,
  );

  if (input.phone.trim()) {
    lines.push(`Telefone: ${input.phone.trim()}`);
  }

  if (input.notes.trim()) {
    lines.push(`Observações: ${input.notes.trim()}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(phone: string | null, message: string): string | null {
  const digits = phone?.replace(/\D/g, '') ?? '';
  if (!digits) {
    return null;
  }

  const internationalNumber = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
}
