import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl } from './rsvp';

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me link with an encoded message', () => {
    const url = buildWhatsAppUrl('5511999999999', 'Olá\nMundo & cia');

    expect(url).toBe('https://wa.me/5511999999999?text=Ol%C3%A1%0AMundo%20%26%20cia');
  });

  it('strips formatting from the phone number', () => {
    expect(buildWhatsAppUrl('(11) 99999-9999', 'Oi')).toBe('https://wa.me/5511999999999?text=Oi');
  });

  it('encodes a multi-line message without losing line breaks', () => {
    const url = buildWhatsAppUrl('5511999999999', 'Recado para Lorenna & Bruno\n\nParabéns!');

    expect(url).toContain('https://wa.me/5511999999999?text=');
    expect(url).toContain('%0A');
    expect(url).toContain('Parab%C3%A9ns');
  });

  it('returns null when no WhatsApp number is configured', () => {
    expect(buildWhatsAppUrl(null, 'Oi')).toBeNull();
    expect(buildWhatsAppUrl('', 'Oi')).toBeNull();
    expect(buildWhatsAppUrl('(  )', 'Oi')).toBeNull();
  });
});
