import { useState } from 'react';
import { couple } from '../content/couple';
import { navigationItems } from '../content/navigation';

type ShareStatus = 'idle' | 'shared' | 'copied' | 'failed';

export function Footer() {
  const [shareStatus, setShareStatus] = useState<ShareStatus>('idle');

  const shareSite = async () => {
    const shareData = {
      title: `${couple.displayName} — ${couple.dateLabel}`,
      text: 'Vem celebrar com a gente!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareStatus('shared');
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus('copied');
    } catch {
      setShareStatus('failed');
    }
  };

  const shareStatusMessage =
    shareStatus === 'shared'
      ? 'Compartilhamento enviado.'
      : shareStatus === 'copied'
        ? 'Link copiado.'
        : '';

  return (
    <footer className="footer" id="rodape">
      <div className="container footer__inner">
        <p className="footer__monogram">{couple.monogram}</p>
        <p className="footer__date">{couple.dateLabel}</p>
        <span className="footer__rule" aria-hidden="true" />

        <div className="footer__pix">
          <p className="footer__pix-title">Presenteie por PIX</p>
          <p className="footer__pix-text">
            Escolha um presente e contribua com o valor que quiser, direto pelo aplicativo do seu
            banco.
          </p>
          <a className="button button--ghost button--small" href="#presentes">
            Ver lista de presentes
          </a>
        </div>

        <nav className="footer__nav" aria-label="Atalhos do rodapé">
          <ul>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.fullLabel}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__share">
          <button className="button button--gold" type="button" onClick={shareSite}>
            Compartilhar site
          </button>
          <p className="footer__status" role="status" aria-live="polite">
            {shareStatusMessage}
          </p>
          {shareStatus === 'failed' ? (
            <p className="footer__share-fallback">
              Copie o link: <code>{window.location.href}</code>
            </p>
          ) : null}
        </div>

        <p className="footer__made">
          feito com amor <span aria-hidden="true">♡</span>
        </p>
      </div>
    </footer>
  );
}
