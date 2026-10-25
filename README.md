# Lorenna & Bruno — site de casamento

Página única em português para o casamento de Lorenna e Bruno, em 25 de abril de 2027, às 16h
(horário de Brasília). O site é estático, sem backend, em modo escuro, e reúne capa com contagem
regressiva, história do casal, cerimônia, lista de 65 presentes com pagamento por PIX, confirmação
de presença e recados. Não há banco de dados nem envio automático de mensagens: confirmações e
recados abrem o WhatsApp com o texto pronto.

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

Os testes cobrem apenas lógica pura: contagem regressiva, formatação de moeda pt-BR, filtro/ordenação/
paginação de presentes, detecção de cotas, payload PIX (CRC16 e campo de valor), resumo de RSVP,
recado e codificação dos links de WhatsApp. Não há testes de DOM.

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

### WhatsApp das confirmações e recados

O número fica em `src/content/contact.ts` (`whatsappNumber`, formato internacional só com dígitos).
O valor atual é `351967195639`. Confirmação de presença e recados usam o mesmo número: ao enviar, o
site abre `https://wa.me/<numero>` com a mensagem pronta e mantém um botão **Copiar** como
alternativa. Nada é enviado sem o convidado tocar em enviar no WhatsApp, e nenhum dado é armazenado.

## PIX: valor, QR code e copia e cola

O QR code é gerado no navegador com a biblioteca `qrcode`, a partir de um payload BR Code montado em
`src/lib/pix.ts` (CRC16 próprio, testado). O valor do presente entra no campo `54` do payload, então
o convidado paga o valor cheio já preenchido no aplicativo do banco.

- Recebedor, chave, cidade e txid: `src/content/pix.ts`.
- Textos do painel PIX: `src/content/pix.ts` (`pix`).
- Fallback caso a geração do QR falhe: `public/img/pix-qr.jpg`.

Se a chave PIX mudar, atualize `pixMerchant` em `src/content/pix.ts`; o QR e o copia e cola passam a
ser gerados com os novos dados automaticamente.

## Assets

As imagens ficam em `public/img/`. Para baixar novamente capa, fotos do casal, miniaturas dos 65
presentes e as fontes self-hosted:

```bash
node scripts/fetch-assets.mjs
```

O script ignora arquivos já baixados, registra falhas individualmente e continua. As fontes são
self-hosted em `src/styles/fonts/`; o site não depende de CDN externo em tempo de execução.

## Deploy no GitHub Pages

O site é publicado em https://mateuscambraiaghp.github.io/MarryWho/ a partir da branch `gh-pages` do
repositório `MateusCambraiaGHP/MarryWho` (o Pages serve o conteúdo da raiz dessa branch).

Para publicar uma atualização:

```bash
node scripts/publish-pages.mjs
```

O script roda `npm run build`, cria uma worktree temporária, gera a branch `gh-pages` com o conteúdo
de `dist/` e faz push force.

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
