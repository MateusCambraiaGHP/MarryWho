import { describe, expect, it } from 'vitest';
import { buildRsvpSummary, buildWhatsAppUrl, type RsvpInput } from './rsvp';

const fullAnswer: RsvpInput = {
  name: 'Maria Silva',
  attending: true,
  adults: 2,
  children: 1,
  email: 'maria@example.com',
  phone: '(31) 99999-0000',
  notes: 'Sem restrições alimentares',
};

describe('buildRsvpSummary', () => {
  it('builds a complete summary for a guest who is attending', () => {
    expect(buildRsvpSummary(fullAnswer)).toBe(
      [
        'Confirmação de presença — Lorenna & Bruno',
        '',
        'Nome: Maria Silva',
        'Presença: Sim',
        'Adultos: 2',
        'Crianças: 1',
        'E-mail: maria@example.com',
        'Telefone: (31) 99999-0000',
        'Observações: Sem restrições alimentares',
      ].join('\n'),
    );
  });

  it('records zero adults and children when the guest is not attending', () => {
    const summary = buildRsvpSummary({
      ...fullAnswer,
      attending: false,
      adults: 1,
      children: 0,
    });

    expect(summary).toContain('Presença: Não');
    expect(summary).toContain('Adultos: 0');
    expect(summary).toContain('Crianças: 0');
  });

  it('omits optional fields that were left blank', () => {
    const summary = buildRsvpSummary({
      ...fullAnswer,
      phone: '   ',
      notes: '',
      children: 0,
    });

    expect(summary).not.toContain('Telefone');
    expect(summary).not.toContain('Observações');
    expect(summary).toContain('Crianças: 0');
  });

  it('does not end with a trailing newline', () => {
    expect(buildRsvpSummary(fullAnswer).endsWith('\n')).toBe(false);
  });
});

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me link with an encoded message', () => {
    const url = buildWhatsAppUrl('5511999999999', 'Olá\nMundo & cia');

    expect(url).toBe('https://wa.me/5511999999999?text=Ol%C3%A1%0AMundo%20%26%20cia');
  });

  it('strips formatting from the phone number', () => {
    expect(buildWhatsAppUrl('(11) 99999-9999', 'Oi')).toBe('https://wa.me/5511999999999?text=Oi');
  });

  it('encodes the whole summary without losing line breaks', () => {
    const url = buildWhatsAppUrl('5511999999999', buildRsvpSummary(fullAnswer));

    expect(url).toContain('https://wa.me/5511999999999?text=');
    expect(url).toContain('%0A');
    expect(url).toContain('Confirma%C3%A7%C3%A3o%20de%20presen%C3%A7a');
  });

  it('returns null when no WhatsApp number is configured', () => {
    expect(buildWhatsAppUrl(null, 'Oi')).toBeNull();
    expect(buildWhatsAppUrl('', 'Oi')).toBeNull();
    expect(buildWhatsAppUrl('(  )', 'Oi')).toBeNull();
  });
});
