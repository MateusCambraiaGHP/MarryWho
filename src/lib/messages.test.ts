import { describe, expect, it } from 'vitest';
import { buildGuestMessage } from './messages';
import { buildWhatsAppUrl } from './rsvp';

describe('buildGuestMessage', () => {
  it('includes name, email and message', () => {
    const summary = buildGuestMessage({
      name: '  Ana  ',
      email: ' ana@example.com ',
      message: ' Felicidades! ',
    });

    expect(summary).toBe(
      ['Recado para Lorenna & Bruno', '', 'Nome: Ana', 'E-mail: ana@example.com', '', 'Felicidades!'].join(
        '\n',
      ),
    );
  });

  it('omits the e-mail line when it is empty', () => {
    const summary = buildGuestMessage({ name: 'Ana', email: '', message: 'Parabéns!' });

    expect(summary).not.toContain('E-mail:');
    expect(summary.endsWith('Parabéns!')).toBe(true);
  });
});

describe('guest message WhatsApp link', () => {
  it('points to the couple WhatsApp number with the encoded message', () => {
    const url = buildWhatsAppUrl('351967195639', 'Recado para Lorenna & Bruno');

    expect(url).toContain('https://wa.me/351967195639?text=');
    expect(url).toContain(encodeURIComponent('Recado para Lorenna & Bruno'));
  });
});
