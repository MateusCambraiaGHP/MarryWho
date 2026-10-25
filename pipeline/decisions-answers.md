# Decision Answers — MarryWho

Registro cru das decisões respondidas pelo usuário (formato da convenção de decision memory).
Guardrails dobra isto em `.agents/memory/decisions.md`.

---

## 2026-10-25 — Confirmação de presença sem servidor

- **Question:** Com site estático, sem backend e sem envio de e-mail, para onde vai a confirmação de presença?
- **Options:** WhatsApp pré-preenchido (wa.me) | mailto | remover a seção | Google Forms
- **Chosen:** WhatsApp pré-preenchido para 31992762312 (mesmo número da chave PIX), com "copiar resumo" como fallback e aviso de que é preciso tocar em enviar no WhatsApp.
- **Why:** Sem servidor nem e-mail, o WhatsApp entrega a confirmação nas mãos do casal sem dependência de terceiros.
- **Principle:** Sem backend, a entrega de informação ao casal acontece pelo canal que o convidado já usa (WhatsApp), com cópia manual como fallback.
- **Scope:** Feature #7 Confirmação de presença
- **Reversible:** yes
- **Confidence:** high

## 2026-10-25 — Valor do presente pode ser parcial

- **Question:** O convidado pode ajustar o valor do presente? Como funcionam os presentes de cota?
- **Options:** valor fixo por item | valor livre para todos | livre, com chips de fração
- **Chosen:** Valor inicial = preço do presente, com chips "valor cheio / metade / um quarto" e campo numérico livre. Sem máximo, mínimo R$ 5. Presentes de cota apresentados como "contribua com o valor que quiser".
- **Why:** O objetivo é que quem não pode pagar o presente inteiro contribua com parte.
- **Principle:** Em lista de presentes PIX, o valor é sempre ajustável para baixo — presente não é compra.
- **Scope:** Feature #6 Presentear via PIX, Feature #5 Lista de presentes
- **Reversible:** yes
- **Confidence:** high

## 2026-10-25 — Sem rastreio de progresso ou pagamento

- **Question:** O site mostra quanto já foi arrecadado por presente ou confirma que o PIX foi pago?
- **Options:** progresso por presente | status de pago | nenhum dos dois
- **Chosen:** Nenhum dos dois — sem progresso, sem verificação de pagamento, sem limite máximo.
- **Why:** Não há backend nem API do PIX; prometer progresso seria mentira.
- **Principle:** Não exibir estado que o sistema não pode saber.
- **Scope:** Feature #5, Feature #6
- **Reversible:** yes (exigiria backend)
- **Confidence:** high

## 2026-10-25 — Atribuição do presente via nota discreta

- **Question:** Como o casal descobre quem presenteou o quê?
- **Options:** WhatsApp pós-PIX | txid com nome do presente | nada | nota discreta
- **Chosen:** Nota discreta abaixo do código pedindo que o convidado avise Lorenna ou Bruno. Sem link de WhatsApp do presente e sem codificar o presente no txid.
- **Why:** Menos atrito no fluxo de pagamento; o casal se contenta com a nota.
- **Principle:** O fluxo de pagamento fica curto; atribuição é conversa, não etapa de checkout.
- **Scope:** Feature #6
- **Reversible:** yes
- **Confidence:** high

## 2026-10-25 — Imagens próprias no repositório

- **Question:** Usar as imagens do site de referência por link ou baixá-las para o repositório?
- **Options:** hotlink do CDN | baixar e otimizar | placeholders
- **Chosen:** Baixar para o repositório e otimizar: capa, 4 fotos do casal e 65 miniaturas de presentes.
- **Why:** O site não pode quebrar se a plataforma de origem mudar ou sair do ar.
- **Principle:** Site entregue pronto não depende de CDN de terceiro para conteúdo próprio.
- **Scope:** Features #3, #5, #1
- **Reversible:** yes
- **Confidence:** high

## 2026-10-25 — Fogo de artifício contido

- **Question:** Com que frequência e com que intensidade o fogo de artifício de chegada aparece?
- **Options:** a cada carregamento | uma vez por sessão | uma vez por visitante (localStorage)
- **Chosen:** Uma vez por sessão (somente memória), ~4s, dispensável por toque/Esc, não aparece com `prefers-reduced-motion`.
- **Why:** É boas-vindas, não obstáculo; repetição cansa e animação ignorada prejudica acessibilidade.
- **Principle:** Momento de encanto é curto, dispensável e respeita preferência de movimento reduzido.
- **Scope:** Feature #2
- **Reversible:** yes
- **Confidence:** high

## 2026-10-25 — Lista de presentes completa com controles

- **Question:** A lista de 65 presentes mantém filtro, ordenação e carregamento gradual como na referência?
- **Options:** tudo (categorias + 3 ordenações + ver mais de 20) | só categorias | grade única
- **Chosen:** Tudo — chips de categoria, ordenação A-Z / menor preço / maior preço, "ver mais" em blocos de 20.
- **Why:** 65 itens sem controles viram uma parede difícil de navegar em celular.
- **Principle:** Listas longas ganham filtro, ordenação e carregamento gradual.
- **Scope:** Feature #5
- **Reversible:** yes
- **Confidence:** high

## 2026-10-25 — Publicação no GitHub Pages

- **Question:** Onde o site publicado vai viver?
- **Options:** Netlify/Vercel | GitHub Pages | sem deploy
- **Chosen:** GitHub Pages, repositório MateusCambraiaGHP/MarryWho; build precisa funcionar com o caminho base do Pages.
- **Why:** Já existe o repositório e o público do site é estático.
- **Principle:** Hospedagem estática gratuita acoplada ao repositório do projeto.
- **Scope:** entrega/publicação (todas as features)
- **Reversible:** yes
- **Confidence:** high

## 2026-10-25 — Grafia do nome

- **Question:** "Lorena" ou "Lorenna"?
- **Options:** Lorena | Lorenna
- **Chosen:** Lorenna (como no site de referência).
- **Why:** É a grafia usada pela própria página do casal.
- **Principle:** Nome do casal segue a fonte oficial, não o texto do pedido.
- **Scope:** todo o conteúdo do site
- **Reversible:** yes
- **Confidence:** high
