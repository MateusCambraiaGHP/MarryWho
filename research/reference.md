# Reference research — noivos.casar.com/lorenna-e-bruno-2027-04-25

Scraped 2026-10-25 from a desktop Chrome session. Source is an AngularJS SPA served by
Casar.com. This file records what the reference site contains so the rebuild does not need
to re-scrape. Gift data lives in `research/gifts-raw.txt`.

## 1. Information architecture

Single scroll page ("one page layout") with anchor nav + hamburger menu:

| Anchor | Section |
|---|---|
| `#home` | hero photo + name + date + countdown + welcome letter |
| `#o-casal` | couple story + 4 photos |
| `#cerimonia` | ceremony text, address, Google Maps embed |
| `#presentes` | gift list intro + PIX note + sortable/filterable gift grid + cart |
| `#rsvp` | attendance form |
| `#recados` | guestbook form (**explicitly OUT OF SCOPE for our rebuild**) |

Desktop nav is a fixed white bar: Home · O casal · Cerimônia · Lista de presentes ·
Confirme sua presença · Recados. Mobile collapses to hamburger. Top-right has Casar.com
branding (drop it — not our site).

## 2. Content (verbatim copy available for reuse)

### Hero
- H1: `LORENNA E BRUNO`
- Subtitle: `25 DE ABRIL DE 2027`
- Full-bleed photo, white Cinzel uppercase title centered, dark scrim.
- Hero image: `https://cdn-assets-legacy.casar.com/thumb/autoxautox1xx96,1008,6307,3563/dados/sitenoivos/wed1588950/custom/tema48_img_color_master_6aa3fc84332cb1789131908.jpg`

### Countdown
Label `CONTAGEM REGRESSIVA`, four blocks: days / hours / minutes / seconds, two-digit
zero-padded, unit labels `DIAS`, `HORAS`, `MINUTOS`, `SEGUNDOS`. Target 2027-04-25 16:00
America/Sao_Paulo.

### Welcome letter
Heading: `Sejam bem-vindos ao nosso cantinho!` (5 paragraphs, ends "Lorenna & Bruno ♡").
Full text captured in the scrape transcript; reuse verbatim.

### O casal
Heading `O CASAL`, subtitle `A nossa história de amor… ♡`, 8 paragraphs ending
"Lorenna & Bruno 💍". Photos (use these four):
- `.../paginas/50azu_1791646528.jpg` (1000x667)
- `.../paginas/fNWI4_1791645922.jpg` (1000x667)
- `.../paginas/LmpV0_1789133063.jpg` (617x324)
- `.../paginas/CXzF2_1791646642.jpg` (1000x647)
Base: `https://cdn-assets-legacy.casar.com/dados/sitenoivos/wed1588950/paginas/`

### Cerimônia
Text: ceremony on 25/04/2027 at 16h, asks guests to be punctual.
Address: `Av. dos Trompetes, 47 - Estâncias Imperiais, Contagem - MG, 32065-260`.
Reference site embeds Google Maps with an API key — we must NOT reuse that key (house
rule: credentials). Use a keyless link/embed (`https://maps.google.com/maps?q=<address>&output=embed`)
or an outbound "Abrir no Maps" link.

### Lista de presentes
Two intro paragraphs, then a PIX paragraph ("...contribuir diretamente ... através do PIX:")
followed by the raw phone key `31992762312`, then a closing paragraph.

Controls on reference: `Ordenar lista por:` select (`A-Z`, `Menor preço`, `Maior preço`),
cart counter, `Ver mais presentes` (loads 20 at a time from 65), gift cards showing image
(208x208), name, price in `R$ 1.234,56`, `Presentear` button.

Reference flow on `Presentear`: adds to cart → checkout with credit card / PayPal.
**Our flow replaces this entirely** — see §4.

### RSVP
Fields: nome completo (required), vai ao evento? (sim/não radios), quantidade de adultos
(select 1–10), quantidade de crianças (0–10), e-mail (required), telefone, observações,
LGPD consent checkbox. Reference sends confirmation by e-mail (SendGrid on their side).

### Footer
Reference footer is Casar.com branding + Facebook like button. Ours: couple monogram,
date, PIX block, discreet "feito com amor" line.

## 3. Design tokens captured from the reference

- Headings: `Cinzel` (serif, uppercase, letter-spaced) — 32px h1/h2 desktop.
- Body: `Lato`, 300/400/700, color `#404951` on white.
- Script accent: `Dancing Script` 700 (used for small decorative lines).
- Primary button: bg `#B6D5C0` (sage), white bold 16px text.
- Photos are the visual anchor; heavy white space between sections.

Our target diverges deliberately: **dark mode as the default/primary theme**, warmer and
more "wedding" than the reference, denser but still airy card grid, larger type for
accessibility, and a fireworks-on-arrival moment.

## 4. Gift → PIX flow (our replacement for the reference cart)

1. Guest clicks `Presentear` on a gift card.
2. Modal opens: gift name + image, "Valor do presente" defaulting to the gift price, with a
   free numeric field so the guest can send more or less, plus quick chips
   (`Valor do presente`, `+R$ 50`, `+R$ 100`, custom).
3. On confirm, render a PIX QR code plus the "copia e cola" EMV payload for
   `31992762312` with `transactionAmount` = chosen value and a static txid.
4. Copy button + "Abrir app do banco" (deep-link attempt) + fallback instructions.
5. No payment gateway, no server call, no PIX API. Payload is built in the browser from the
   key + value (static BR Code, non-registered). Nothing is stored or transmitted.

## 5. Constraints given by the owner

- Hardcoded for Lorena & Bruno only. Same 65 gifts. No CMS, no DB.
- Portuguese (pt-BR) copy only.
- No payment integration, no PIX API, no e-mail/SendGrid sending.
- Recados (guestbook) section removed.
- React. Dark mode. More styled/"pretty" and more accessible than the reference.
- Fireworks animation when the guest arrives.
- Security matters (static site, no secrets in the repo, no third-party API keys).

## 6. Gift data

`research/gifts-raw.txt` — 65 rows, pipe-separated:
`id|nome|preco|img|categoria`.
Image resolution:
- rows where `img` starts with `casamento/` →
  `https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/<img>`
- otherwise →
  `https://cdn-assets-legacy.casar.com/thumb/208x208x1/dados/sitenoivos/wed1588950/presentes/<img>`

Category ids seen: 1 (cama/mesa/banho), 2 (cozinha/utensílios), 3 (decoração), 4 (linha
branca / eletrodomésticos grandes), 5 (eletroportáteis), 6 (lua de mel / cotas),
8 (móveis), empty (cotas e presentes personalizados).
