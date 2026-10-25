import { assetUrl } from '../lib/asset';

export type PixMerchant = {
  key: string;
  name: string;
  city: string;
  txid: string;
  mcc: string;
  currency: string;
  country: string;
};

export const pixMerchant: PixMerchant = {
  key: 'a4a3c787-96ad-4b1b-8c6e-589d08245184',
  name: 'LORENNA MILLARD SOUZA',
  city: 'BELO HORIZONTE',
  txid: '***',
  mcc: '0000',
  currency: '986',
  country: 'BR',
};

export const fallbackQrImageSrc = assetUrl('img/pix-qr.jpg');

export const pix = {
  merchant: pixMerchant,
  copyLabel: 'PIX copia e cola',
  giftNote:
    'O valor integral do presente já vai dentro do QR code e do código copia e cola. Confira no aplicativo do banco antes de finalizar.',
  instructions: [
    'Abra o aplicativo do seu banco e escolha pagar com PIX.',
    'Escaneie o QR code ou escolha “PIX copia e cola” e cole o código.',
    'Confira os dados de Lorenna Millard Souza e finalize o pagamento.',
  ],
  qrGenerationErrorMessage:
    'Não foi possível gerar o QR code agora. Use o código copia e cola abaixo, que já leva o valor do presente.',
  fallbackQrAlt: 'QR code PIX original em nome de Lorenna Millard Souza, sem valor embutido',
  fallbackQrNote:
    'Este é o QR code original, sem valor. Use o código copia e cola para levar o valor do presente ao aplicativo do banco.',
  tellCoupleNote: 'Depois de pagar, avise Lorenna ou Bruno que você presenteou. ♡',
};
