# Scrum Cards — Site de Casamento Lorenna & Bruno

## Goal

**Goal:** Os convidados de Lorenna & Bruno têm uma única página de casamento — em português, modo escuro, bonita e rápida — onde leem a história do casal, encontram as informações da cerimônia e presenteiam por PIX em um único passo, com um código que já carrega o valor escolhido, sem carrinho, sem checkout, sem conta e sem instalar aplicativo.

**Success looks like:** Um convidado abre o link no celular, vê o fogo de artifício de chegada, percorre a história e a cerimônia, toca em "Presentear" em um presente, ajusta o valor (ou escolhe uma fração) e paga no aplicativo do banco pelo QR code ou pelo código copia-e-cola em menos de um minuto — inclusive quem só pode contribuir com parte do valor. O casal recebe o PIX e sabe que foi um presente de casamento. A página funciona só com teclado, tem contraste alto, respeita a preferência de movimento reduzido e é publicada sem nenhuma credencial no repositório e sem servidor.

**Out of scope:**
- Mural de recados.
- Carrinho e checkout.
- Gateway de pagamento e API do PIX (o código PIX é gerado no navegador, nada é enviado a lugar nenhum).
- Envio automático de e-mail (sem SendGrid ou similar).
- CMS, banco de dados, painel administrativo.
- Múltiplos casais / múltiplos eventos / configuração por cliente.
- Segundo idioma (pt-BR apenas).
- Controle de progresso de presentes ("arrecadado até agora", "faltam R$ X") e qualquer confirmação de que o PIX foi pago.
- Design responsivo além do necessário para celular e desktop comuns.

---

## Epic: Site de casamento Lorenna & Bruno

**Description:** Dar ao casal uma página própria, bonita e acessível que substitui o site de plataforma de presentes: apresenta o casal, informa a cerimônia e transforma a lista de presentes em contribuições por PIX feitas direto no aplicativo do banco do convidado.

**Tracking:** TODO (GitHub Milestone)

---

### Feature #1: Capa e contagem regressiva
**Tracking:** TODO (GitHub Issue)
**Parent Epic:** Site de casamento Lorenna & Bruno

**What it does:**
O convidado chega e vê imediatamente de quem é o casamento e quando ele acontece: foto de capa em tela cheia, "LORENNA E BRUNO", "25 DE ABRIL DE 2027", uma carta de boas-vindas e uma contagem regressiva até o horário da cerimônia. No topo existe uma navegação fixa com os atalhos das seções, que vira menu compacto no celular. É a base visual de todo o site: modo escuro, fontes e cores definidos aqui valem para todas as seções.

**Acceptance Criteria:**
- [ ] Ao abrir a página, o convidado vê a foto de capa, "LORENNA E BRUNO" e "25 DE ABRIL DE 2027" sem rolar a tela.
- [ ] A contagem regressiva mostra dias, horas, minutos e segundos com dois dígitos, atualiza sozinha e conta até 25/04/2027 às 16h (horário de Brasília).
- [ ] Depois do horário da cerimônia, a contagem não mostra números negativos — exibe uma mensagem de que o grande dia chegou.
- [ ] A carta de boas-vindas aparece na íntegra, em português, terminando com "Lorenna & Bruno ♡".
- [ ] A navegação leva a cada seção da página e destaca a seção em que o convidado está; no celular ela cabe em um menu que abre e fecha.
- [ ] Todo o texto é legível em modo escuro com contraste alto, e a página é navegável só com Tab, com foco sempre visível.
- [ ] Em tela pequena nada fica cortado nem exige rolagem horizontal.

**Technical Design:** *(a preencher pelo arquiteto)*

---

### Feature #2: Chegada com fogo de artifício
**Tracking:** TODO (GitHub Issue)
**Parent Epic:** Site de casamento Lorenna & Bruno

**What it does:**
Ao entrar no site, o convidado é recebido por uma comemoração curta de fogo de artifício sobre a capa, como se fosse a festa começando. É um momento de boas-vindas, não um obstáculo: dura poucos segundos, pode ser dispensado a qualquer momento e não aparece de novo na mesma visita. Quem configurou o aparelho para reduzir animações não vê o efeito — apenas a página normal.

**Acceptance Criteria:**
- [ ] Na primeira abertura da visita, o fogo de artifício aparece sobre a capa e termina sozinho em cerca de 4 segundos.
- [ ] Recarregar a página ou navegar entre seções na mesma sessão não repete o efeito.
- [ ] Um toque, clique ou Esc encerra o efeito imediatamente.
- [ ] Com a preferência do sistema por movimento reduzido ativada, o efeito não acontece (a capa aparece direto, sem atraso).
- [ ] O efeito não bloqueia a leitura, a rolagem nem o uso do teclado, e não causa rolagem horizontal.
- [ ] Enquanto o efeito acontece, o convidado ainda consegue ouvir o leitor de tela ler o conteúdo da capa.

**Technical Design:** *(a preencher pelo arquiteto)*

---

### Feature #3: Nossa história
**Tracking:** TODO (GitHub Issue)
**Parent Epic:** Site de casamento Lorenna & Bruno

**What it does:**
A seção "O CASAL" conta a história de Lorenna e Bruno com o texto original do site de referência e quatro fotos do casal, apresentadas com respiro e elegância no tema escuro. É a parte afetiva da página: o convidado entende quem está se casando antes de ver a lista de presentes.

**Acceptance Criteria:**
- [ ] A seção mostra o título "O CASAL", o subtítulo "A nossa história de amor… ♡" e o texto completo, terminando em "Lorenna & Bruno 💍".
- [ ] As quatro fotos do casal aparecem carregadas do próprio site (sem depender de site externo), com descrição alternativa em português em cada uma.
- [ ] No celular as fotos se reorganizam sem cortar rostos nem gerar rolagem horizontal.
- [ ] As fotos carregam de forma leve: nenhuma delas trava a leitura do texto enquanto baixa.
- [ ] Se uma foto falhar ao carregar, o espaço não quebra o layout e o texto continua legível.

**Technical Design:** *(a preencher pelo arquiteto)*

---

### Feature #4: Cerimônia e como chegar
**Tracking:** TODO (GitHub Issue)
**Parent Epic:** Site de casamento Lorenna & Bruno

**What it does:**
O convidado encontra data, horário e endereço da cerimônia, com um aviso para chegar no horário, e um mapa que mostra onde é o local. O mapa abre sem pedir chave de API e, se o mapa não carregar, ainda existe um caminho claro para abrir o endereço no aplicativo de mapas do celular.

**Acceptance Criteria:**
- [ ] A seção mostra que a cerimônia é em 25/04/2027, às 16h, com pedido de pontualidade.
- [ ] O endereço "Av. dos Trompetes, 47 – Estâncias Imperiais, Contagem – MG, 32065-260" aparece por extenso e selecionável.
- [ ] Existe um mapa do local visível na seção e um botão "Abrir no Maps" que leva ao endereço no aplicativo de mapas.
- [ ] O mapa funciona sem nenhuma chave de API e sem credencial no repositório.
- [ ] Se o mapa não carregar, o convidado ainda vê o endereço, o botão do Maps e uma orientação de como chegar.
- [ ] Texto, botões e link do mapa são alcançáveis por teclado e têm contraste alto.

**Technical Design:** *(a preencher pelo arquiteto)*

---

### Feature #5: Lista de presentes (65 itens)
**Tracking:** TODO (GitHub Issue)
**Parent Epic:** Site de casamento Lorenna & Bruno

**What it does:**
A lista completa com os 65 presentes, cada um com foto, nome e valor, organizada para o convidado achar o que procura sem rolar uma parede infinita. Ele pode filtrar por categoria (cama/mesa/banho, cozinha, decoração, eletrodomésticos, eletroportáteis, lua de mel e cotas, móveis, presentes personalizados), ordenar por A-Z, menor preço ou maior preço, e carregar mais presentes aos poucos. Os itens de cota aparecem como convite a contribuir com qualquer valor, não como um produto com preço fechado.

**Acceptance Criteria:**
- [ ] Os 65 presentes do site de referência aparecem com foto, nome e valor em reais no formato "R$ 1.234,56".
- [ ] O convidado vê 20 presentes por vez e um botão "Ver mais presentes" que carrega os próximos, até acabarem.
- [ ] Filtros de categoria mostram apenas os presentes da categoria escolhida e é possível voltar para "todos".
- [ ] A ordenação A-Z, menor preço e maior preço reorganiza a lista imediatamente, mantendo o filtro de categoria ativo.
- [ ] Presentes de cota (COTA, Patrocine, Fundo, Pix da, Presente sem erro, Um pouquinho de cada um) são apresentados como "contribua com o valor que quiser", sem preço fechado nem a palavra "comprar".
- [ ] Nenhum presente leva para loja externa, carrinho ou checkout.
- [ ] Quando um filtro não retorna nenhum presente, o convidado vê uma mensagem clara e um caminho para limpar o filtro.
- [ ] Todas as fotos vêm do próprio site, com descrição alternativa, e a grade reorganiza no celular sem rolagem horizontal.
- [ ] Filtros, ordenação e "ver mais" funcionam só com teclado e anunciam a mudança de resultado.

**Technical Design:** *(a preencher pelo arquiteto)*

---

### Feature #6: Presentear via PIX
**Tracking:** TODO (GitHub Issue)
**Parent Epic:** Site de casamento Lorenna & Bruno

**What it does:**
Ao tocar em "Presentear", o convidado escolhe quanto quer dar — o valor cheio do presente, metade, um quarto ou qualquer valor digitado — e recebe na hora um QR code PIX e o código copia-e-cola já com esse valor. Ele paga no aplicativo do banco, sem sair da página, sem criar conta e sem preencher dados de cartão. É o coração do site: o presente pode ser dividido, então ninguém deixa de presentear por não poder pagar o item inteiro.

**Acceptance Criteria:**
- [ ] Tocar em "Presentear" abre um painel com foto e nome do presente e um valor já preenchido com o preço do item.
- [ ] O convidado pode escolher valor cheio, metade ou um quarto do presente em um toque.
- [ ] O convidado pode digitar qualquer valor a partir de R$ 5, sem limite máximo, e o painel mostra o valor escolhido por extenso em reais antes de gerar o código.
- [ ] Para presentes de cota, o valor inicial é sugerido como contribuição livre e o texto convida a dar o quanto quiser.
- [ ] O QR code e o código copia-e-cola são gerados no próprio navegador com o valor escolhido e a chave PIX 31992762312; nenhum dado do convidado é enviado ou armazenado.
- [ ] O botão "Copiar código" copia o código e confirma visualmente que copiou; se a cópia for bloqueada pelo navegador, o convidado vê o código para copiar manualmente.
- [ ] O painel mostra instruções curtas de como pagar no aplicativo do banco e um botão opcional para tentar abrir o app do banco, com instrução alternativa caso não abra.
- [ ] Abaixo do código, uma nota discreta pede que o convidado avise Lorenna ou Bruno que presenteou. Não há link de WhatsApp nem qualquer verificação de pagamento nesta etapa.
- [ ] O convidado pode fechar o painel a qualquer momento com Esc, botão de fechar ou clique fora, e o foco volta para o presente de onde saiu.
- [ ] Valores inválidos (vazio, zero, letras) são recusados com mensagem clara e sem gerar código.
- [ ] O painel é navegável só por teclado e lido pelo leitor de tela na ordem certa.

**Technical Design:** *(a preencher pelo arquiteto)*

---

### Feature #7: Confirmação de presença
**Tracking:** TODO (GitHub Issue)
**Parent Epic:** Site de casamento Lorenna & Bruno

**What it does:**
O convidado confirma se vai à cerimônia informando nome, quantos adultos e crianças vêm, e-mail, telefone e observações, e aceitando o aviso de privacidade. Como o site não tem servidor, a confirmação é entregue ao casal como uma mensagem de WhatsApp já escrita, pronta para enviar — e, se o WhatsApp não abrir, ele copia o resumo e envia do jeito que preferir.

**Acceptance Criteria:**
- [ ] O formulário pede nome completo, se vai comparecer (sim/não), quantidade de adultos (1 a 10), quantidade de crianças (0 a 10), e-mail, telefone, observações e aceite do aviso de privacidade.
- [ ] Nome, resposta de presença e e-mail são obrigatórios; o convidado vê uma mensagem clara ao tentar enviar sem preenchê-los.
- [ ] Ao enviar, abre o WhatsApp com uma mensagem pronta para o número 31992762312 contendo nome, presença, adultos, crianças, e-mail, telefone e observações.
- [ ] Se o WhatsApp não abrir, o convidado vê o resumo em texto com um botão "Copiar resumo" e a confirmação visual de que copiou.
- [ ] Depois do envio, o convidado vê uma mensagem de agradecimento deixando claro que precisa tocar em enviar no WhatsApp para a confirmação chegar ao casal.
- [ ] Quem responde "não" não é obrigado a informar quantidade de adultos.
- [ ] Nenhum dado digitado é armazenado no navegador nem enviado a outro lugar além do WhatsApp que o convidado mesmo envia.
- [ ] O formulário inteiro funciona só com teclado, com rótulos associados aos campos, erros anunciados e contraste alto.

**Technical Design:** *(a preencher pelo arquiteto)*

---

### Feature #8: Rodapé e compartilhamento
**Tracking:** TODO (GitHub Issue)
**Parent Epic:** Site de casamento Lorenna & Bruno

**What it does:**
O fim da página fecha a experiência com o monograma do casal, a data, o lembrete do PIX e uma linha discreta "feito com amor", além de uma forma simples de o convidado compartilhar o site com quem também foi convidado. Nada de marca de plataforma.

**Acceptance Criteria:**
- [ ] O rodapé mostra o monograma do casal, "25 de abril de 2027", o lembrete de que é possível presentear por PIX com a chave 31992762312 e a linha "feito com amor".
- [ ] O rodapé não exibe nenhuma marca, logo ou link de plataforma de casamento.
- [ ] O convidado consegue compartilhar o link do site pelo compartilhamento nativo do celular; onde não houver, aparece a opção de copiar o link com confirmação visual.
- [ ] O link compartilhado abre a mesma página publicada, com todos os ativos carregando corretamente.
- [ ] Os atalhos do rodapé levam às seções da página e funcionam por teclado, com contraste alto.

**Technical Design:** *(a preencher pelo arquiteto)*
