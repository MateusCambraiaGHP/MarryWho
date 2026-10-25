export type GuestMessageInput = {
  name: string;
  email: string;
  message: string;
};

export function buildGuestMessage(input: GuestMessageInput): string {
  const lines = ['Recado para Lorenna & Bruno', '', `Nome: ${input.name.trim()}`];

  if (input.email.trim()) {
    lines.push(`E-mail: ${input.email.trim()}`);
  }

  lines.push('', input.message.trim());

  return lines.join('\n');
}
