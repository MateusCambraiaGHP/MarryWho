import { useEffect, useMemo, useState } from 'react';
import { toDataURL } from 'qrcode';
import { fallbackQrImageSrc, pix } from '../content/pix';
import { useClipboard } from '../hooks/useClipboard';
import { formatBRL } from '../lib/currency';
import { buildPixPayload } from '../lib/pix';

type CopiedField = 'qr' | 'code';

type QrState =
  | { status: 'loading'; dataUrl: null }
  | { status: 'ready'; dataUrl: string }
  | { status: 'error'; dataUrl: null };

export function PixPanel({ amount, giftName }: { amount: number; giftName: string }) {
  const [copiedField, setCopiedField] = useState<CopiedField | null>(null);
  const [qrState, setQrState] = useState<QrState>({ status: 'loading', dataUrl: null });
  const { status, copy } = useClipboard();

  const payload = useMemo(() => {
    try {
      return buildPixPayload(amount);
    } catch {
      return null;
    }
  }, [amount]);

  useEffect(() => {
    if (!payload) {
      return;
    }

    let isCurrent = true;
    setQrState({ status: 'loading', dataUrl: null });

    const debounceTimer = window.setTimeout(() => {
      void toDataURL(payload, {
        errorCorrectionLevel: 'M',
        margin: 1,
        width: 512,
        color: {
          dark: '#0E0C0B',
          light: '#FFFFFF',
        },
      })
        .then((dataUrl) => {
          if (isCurrent) {
            setQrState({ status: 'ready', dataUrl });
          }
        })
        .catch(() => {
          if (isCurrent) {
            setQrState({ status: 'error', dataUrl: null });
          }
        });
    }, 250);

    return () => {
      isCurrent = false;
      window.clearTimeout(debounceTimer);
    };
  }, [payload]);

  if (!payload) {
    return (
      <p className="pix__pending">
        Não foi possível gerar o código deste presente. Tente novamente mais tarde.
      </p>
    );
  }

  const copyField = (field: CopiedField) => {
    setCopiedField(field);
    void copy(payload);
  };

  const statusMessage =
    status === 'copied' && copiedField === 'qr'
      ? 'Código do QR copiado.'
      : status === 'copied' && copiedField === 'code'
        ? 'Código copia e cola copiado.'
        : status === 'failed'
          ? 'Não foi possível copiar automaticamente. Selecione o código abaixo e copie manualmente.'
          : '';

  return (
    <div className="pix">
      <h3 className="pix__title">Presentear com PIX</h3>
      <p className="pix__gift">{giftName}</p>

      <p className="pix__amount">
        <span className="pix__amount-label">Valor do presente</span>
        <strong>{formatBRL(amount)}</strong>
      </p>

      <p className="pix__amount-note">{pix.giftNote}</p>

      <div className="pix__qr-card">
        <div className="pix__qr" aria-busy={qrState.status === 'loading'}>
          {qrState.status === 'ready' ? (
            <img
              src={qrState.dataUrl}
              alt={`QR code PIX de ${formatBRL(amount)} para ${giftName}`}
              width={512}
              height={512}
              decoding="async"
            />
          ) : qrState.status === 'loading' ? (
            <p className="pix__qr-loading">Gerando QR code…</p>
          ) : (
            <img
              src={fallbackQrImageSrc}
              alt={pix.fallbackQrAlt}
              width={250}
              height={250}
              decoding="async"
            />
          )}
        </div>

        {qrState.status === 'error' ? (
          <div className="pix__qr-message">
            <p>{pix.qrGenerationErrorMessage}</p>
            <p>{pix.fallbackQrNote}</p>
          </div>
        ) : null}

        <button
          className="button button--ghost button--small"
          type="button"
          onClick={() => copyField('qr')}
        >
          Copiar código do QR
        </button>
      </div>

      <div className="pix__code-block">
        <h4 className="pix__subtitle">{pix.copyLabel}</h4>
        <pre className="pix__code">
          <code>{payload}</code>
        </pre>
        <div className="pix__actions">
          <button className="button button--gold" type="button" onClick={() => copyField('code')}>
            Copiar código
          </button>
        </div>
      </div>

      <p className="pix__status" role="status" aria-live="polite">
        {statusMessage}
      </p>

      <ol className="pix__instructions">
        {pix.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>

      <p className="pix__note">{pix.tellCoupleNote}</p>
    </div>
  );
}
