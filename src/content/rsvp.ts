import { whatsappNumber } from './contact';

type RsvpConfig = {
  heading: string;
  intro: string;
  whatsappNumber: string;
  privacyNotice: string;
  successNoteWhatsApp: string;
  successNoteCopy: string;
  formNoteWhatsApp: string;
  formNoteCopy: string;
};

export const rsvp: RsvpConfig = {
  heading: 'CONFIRME SUA PRESENÇA',
  intro:
    'Sua presença é o nosso maior presente. Preencha os dados abaixo e envie a confirmação para Lorenna ou Bruno — assim conseguimos organizar tudo com carinho.',
  whatsappNumber,
  privacyNotice:
    'Autorizo o uso dos meus dados apenas para a organização do casamento; este site não armazena nem compartilha o que eu digitar.',
  successNoteWhatsApp:
    'Obrigado pela confirmação! Toque em enviar no WhatsApp para que a mensagem chegue até Lorenna e Bruno.',
  successNoteCopy:
    'Obrigado pela confirmação! Copie o resumo abaixo e envie para Lorenna ou Bruno pelo WhatsApp.',
  formNoteWhatsApp:
    'A confirmação abre o WhatsApp com uma mensagem pronta. Você ainda precisa tocar em enviar no aplicativo.',
  formNoteCopy:
    'Ao continuar, você verá um resumo pronto para copiar e enviar para Lorenna ou Bruno pelo WhatsApp.',
};
