export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalDocument = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export const legal = {
  privacy: {
    title: 'Política de privacidade',
    updated: 'Atualizada em 8 de novembro de 2026',
    sections: [
      {
        heading: 'Quem somos',
        paragraphs: [
          'Este é um site pessoal, feito para compartilhar o casamento de Lorenna Millard Souza e Bruno com família e amigos. Não é uma loja, não vende produtos e não possui fins comerciais.',
        ],
      },
      {
        heading: 'Quais dados coletamos',
        paragraphs: [
          'O site não possui cadastro, banco de dados nem servidor próprio para receber formulários. Os dados que você digita nas áreas de confirmação de presença e de recados (nome, e-mail opcional e mensagem) permanecem apenas no seu navegador enquanto a página está aberta.',
          'Esses dados só saem do seu dispositivo se você tocar no botão de envio: nesse momento o site abre o WhatsApp com a mensagem pronta. A conversa e o conteúdo enviado passam a ser tratados pelo WhatsApp, conforme as políticas dele.',
        ],
      },
      {
        heading: 'Cookies e armazenamento local',
        paragraphs: [
          'Não utilizamos cookies, pixels de rastreamento, ferramentas de analytics ou publicidade. Também não gravamos informações no armazenamento local do seu navegador.',
          'Caso qualquer um desses recursos seja adicionado no futuro, esta política será atualizada antes do uso.',
        ],
      },
      {
        heading: 'PIX',
        paragraphs: [
          'O QR code e o código copia e cola do PIX são gerados no próprio navegador, com o valor do presente escolhido. Nenhum dado é enviado para servidores nossos durante essa geração. O pagamento acontece dentro do aplicativo do seu banco.',
        ],
      },
      {
        heading: 'Pagamento com cartão de crédito',
        paragraphs: [
          'A opção de cartão de crédito direciona você para o site do Casar.com, plataforma onde a lista de presentes está publicada. Os dados de pagamento são informados e tratados diretamente por essa plataforma, não por nós. Recomendamos ler a política de privacidade do Casar.com antes de concluir a compra.',
        ],
      },
      {
        heading: 'Hospedagem e dados técnicos',
        paragraphs: [
          'O site é hospedado em serviços de terceiros (Render e GitHub Pages). Esses provedores podem registrar dados técnicos de acesso, como endereço IP e tipo de navegador, em logs de segurança e desempenho. Não temos acesso a esses registros para identificar visitantes e não os utilizamos para qualquer outra finalidade.',
        ],
      },
      {
        heading: 'Seus direitos',
        paragraphs: [
          'Como não mantemos dados armazenados, não há cadastro para consultar ou excluir. Ainda assim, se você tiver dúvidas ou quiser solicitar alguma informação sobre privacidade, fale com os noivos pelo WhatsApp +55 31 98262-5111. Atenderemos dentro de um prazo razoável, conforme a Lei Geral de Proteção de Dados (LGPD).',
        ],
      },
      {
        heading: 'Alterações nesta política',
        paragraphs: [
          'Se esta política mudar, a data de atualização acima será revisada. O uso contínuo do site após uma alteração indica concordância com a versão vigente.',
        ],
      },
    ],
  },
  disclaimer: {
    title: 'Aviso legal',
    updated: 'Atualizado em 8 de novembro de 2026',
    sections: [
      {
        heading: 'Natureza do site',
        paragraphs: [
          'Este site é pessoal, sem fins comerciais, e foi criado para compartilhar informações sobre o casamento de Lorenna e Bruno. Ele não é um site oficial do Casar.com nem de qualquer outra empresa mencionada.',
        ],
      },
      {
        heading: 'Lista de presentes e valores',
        paragraphs: [
          'A lista de presentes e os valores exibidos foram reproduzidos da lista oficial publicada no Casar.com em 8 de novembro de 2026. Preços e disponibilidade podem mudar sem aviso. Em caso de divergência, prevalecem as informações da plataforma Casar.com.',
        ],
      },
      {
        heading: 'Pagamento por PIX',
        paragraphs: [
          'O PIX é gerado no navegador com o valor do presente e vai diretamente para a conta da noiva, sem intermediação de gateway ou de terceiros. Antes de finalizar, confira no aplicativo do seu banco o nome do recebedor e o valor. Não temos acesso aos dados bancários informados por você.',
        ],
      },
      {
        heading: 'Pagamento com cartão de crédito',
        paragraphs: [
          'A opção de cartão de crédito leva a uma plataforma de terceiros (Casar.com). Essa modalidade está sujeita a taxas e encargos da plataforma, de modo que o valor recebido pelos noivos pode ser menor que o valor pago. Aprovação, cobrança, estorno e suporte são de responsabilidade da plataforma.',
        ],
      },
      {
        heading: 'Confirmação de presença e recados',
        paragraphs: [
          'A confirmação de presença e os recados são enviados pelo próprio convidado por meio do WhatsApp. O site apenas monta a mensagem; nada é enviado automaticamente e nenhum dado é armazenado por nós.',
        ],
      },
      {
        heading: 'Limitação de responsabilidade',
        paragraphs: [
          'O site é fornecido "como está". Não nos responsabilizamos por indisponibilidade temporária, falhas de conexão, erros de serviços de terceiros, uso indevido do conteúdo ou danos decorrentes do acesso. Ao usar o site, você concorda com este aviso.',
        ],
      },
      {
        heading: 'Contato',
        paragraphs: [
          'Em caso de dúvidas, fale com os noivos pelo WhatsApp +55 31 98262-5111.',
        ],
      },
    ],
  },
} satisfies Record<'privacy' | 'disclaimer', LegalDocument>;
