# PIX — real data (from C:\Users\mateu\Downloads\Qrcode.pdf)

Source PDF: "Bradesco - QR Code Pix", 250x250 JPEG embedded (extracted to
`research/pix-qr-original.jpg`).
Decoded with jsQR. The QR is a **static** BR Code with **no amount** (`txid ***`),
so the value cannot live in the payload — the payer types it in the bank app.

## Copia e cola (verbatim, 209 chars)

```
00020126580014BR.GOV.BCB.PIX0136a4a3c787-96ad-4b1b-8c6e-589d082451845204000053039865802BR5921LORENNA MILLARD SOUZA6014BELO HORIZONTE62070503***63045FB2
```

Decoded fields:
- 00 Payload Format Indicator: `01`
- 26 Merchant Account Info: `0014BR.GOV.BCB.PIX` / `0136` + key `a4a3c787-96ad-4b1b-8c6e-589d08245184` (UUID, chave aleatória)
- 52 Merchant Category Code: `0000`
- 53 Currency: `986` (BRL)
- 58 Country: `BR`
- 59 Merchant Name: `LORENNA MILLARD SOUZA`
- 60 City: `BELO HORIZONTE`
- 62 Additional Data: `05` + `03` `***` (txid empty/static)
- 63 CRC16: `5FB2`

## Consequences for the app

- There is **no phone-number PIX key**. Do not use `31992762312` anywhere.
- The QR image (`research/pix-qr-original.jpg`) and the string above are the
  single source of truth. Both ship as-is; the QR is not regenerated in the browser.
- Because there is no amount in the payload, the gift flow shows a **suggested
  amount** (default = gift price, adjustable: cheio / metade / um quarto / livre,
  min R$ 5) with a "copiar valor" button, and the instruction to type that value in
  the bank app after scanning.
- No WhatsApp destination number is known yet. RSVP config must accept a nullable
  number: when it is `null`, the primary action is "copiar resumo"; when set, the
  primary action opens `wa.me/<number>` with the summary pre-filled.
