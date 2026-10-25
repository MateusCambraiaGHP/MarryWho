# Lorenna & Bruno — site de casamento

Página única em português para o casamento de Lorenna e Bruno, em 25 de abril de 2027, às 16h
(horário de Brasília). O site é estático, sem backend, em modo escuro, e reúne capa com contagem
regressiva, história do casal, cerimônia, lista de 65 presentes com contribuição por PIX e
confirmação de presença.

## Requisitos

- Node.js 22 ou superior
- npm

## Rodar localmente

```bash
npm install
npm run dev
```

O Vite imprime a URL completa. Como o caminho base de desenvolvimento é `/MarryWho/`, abra a URL
exibida no terminal (normalmente `http://localhost:5173/MarryWho/`).

## Build, testes e tipos

```bash
npm run build      # typecheck + build de produção em dist/
npm test           # testes de lógica com Vitest
npm run typecheck  # apenas TypeScript
npm run preview    # serve o build local
```

Os testes cobrem apenas lógica pura: contagem regressiva, formatação de moeda pt-BR, cálculo de
frações com mínimo de R$ 5, filtro/ordenação/paginação de presentes, detecção de cotas, resumo de
RSVP e codificação do link de WhatsApp, além da formatação do valor PIX. Não há testes de DOM.

## Conteúdo editável

Todo o conteúdo fica em `src/content/`:

- `couple.ts` — nomes, data, horário, foto de capa e carta de boas-vindas.
- `story.ts` — capítulos da história e as quatro fotos do casal.
- `ceremony.ts` — endereço, textos e links do mapa.
- `gifts.ts` — os 65 presentes (nome, preço, imagem e categoria).
- `giftsPage.ts` — textos de introdução da lista.
- `pix.ts` — QR code, código copia e cola e instruções.
- `rsvp.ts` — número de WhatsApp opcional, textos de sucesso e aviso de privacidade.

### Trocar a data ou o horário

Em `src/content/couple.ts`, altere `weddingDateIso` e `weddingTimestamp`. O fuso é
`America/Sao_Paulo` (`-03:00`). Atualize também `dateLabel`, `dateShortLabel` e `timeLabel`, que são
os textos exibidos. A contagem regressiva usa `weddingTimestamp` e nunca mostra valores negativos.

### Configurar o WhatsApp do RSVP

Em `src/content/rsvp.ts`, o campo `whatsappNumber` aceita um número em formato internacional (só
dígitos, por exemplo `5531999999999`) ou `null`.

- Com um número: o envio abre `https://wa.me/<numero>` com o resumo preenchido.
- Com `null` (valor atual): o site não abre o WhatsApp; mostra o resumo com o botão principal
  **Copiar resumo** e instruções para enviar a Lorenna ou Bruno manualmente.

Nenhum dado do formulário é armazenado ou enviado para outro lugar.

## PIX: trocar o QR code e o copia e cola

O PIX é **estático** e **sem valor embutido**. O convidado escolhe o valor no site e digita esse
valor no aplicativo do banco ao pagar. Não existe chave PIX de telefone neste projeto.

Para atualizar os dados reais:

1. Substitua `public/img/pix-qr.jpg` pela imagem do QR code (a original do PDF está em
   `research/pix-qr-original.jpg`).
2. Atualize `copyPasteCode` em `src/content/pix.ts` com o código copia e cola exato do banco.
3. Se necessário, ajuste `qrAlt` e as instruções no mesmo arquivo.

Não é preciso gerar payload BR Code, instalar biblioteca de QR code ou alterar o valor do PIX no
código. O valor escolhido aparece no painel, pode ser copiado pelo botão **Copiar valor** e deve ser
digitado no aplicativo do banco.

## Assets

As imagens ficam em `public/img/`. Para baixar novamente capa, fotos do casal, miniaturas dos 65
presentes e as fontes self-hosted:

```bash
node scripts/fetch-assets.mjs
```

O script ignora arquivos já baixados, registra falhas individualmente e continua. As fontes são
self-hosted em `src/styles/fonts/`; o site não depende de CDN externo em tempo de execução.

## Deploy no GitHub Pages

O workflow em `.github/workflows/deploy.yml` roda `npm ci`, `npm test` e `npm run build`, e publica
`dist/` no GitHub Pages a cada push em `main`, no repositório `MateusCambraiaGHP/MarryWho`.

O build usa `base: '/MarryWho/'` por padrão. Para publicar em outro caminho, defina `VITE_BASE` no
ambiente antes do build:

```bash
VITE_BASE=/outro-caminho/ npm run build
```

`public/.nojekyll` evita o processamento Jekyll no Pages.

## Acessibilidade

O site inclui link de pular para o conteúdo, foco visível, diálogo nativo com foco contido, rótulos
e erros associados por `aria-describedby`, alvos de toque de pelo menos 44px, contraste AA ou
superior e respeito a `prefers-reduced-motion`. Com movimento reduzido, o fogo de artifício não roda
e a história do casal vira uma lista empilhada sem painel fixo.
