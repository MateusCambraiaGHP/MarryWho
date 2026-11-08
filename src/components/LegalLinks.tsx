import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { legal, type LegalDocument } from '../content/legal';

type LegalKey = keyof typeof legal;

const triggers: { key: LegalKey; label: string }[] = [
  { key: 'privacy', label: 'Política de privacidade' },
  { key: 'disclaimer', label: 'Aviso legal' },
];

export function LegalLinks() {
  const [active, setActive] = useState<LegalKey | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = active !== null;
  const document_: LegalDocument | null = active ? legal[active] : null;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen) {
      document.documentElement.classList.add('modal-open');

      if (!dialog.open) {
        dialog.showModal();
      }

      const panel = dialog.querySelector<HTMLElement>('.modal__panel');

      if (panel) {
        panel.scrollTop = 0;
      }

      return;
    }

    if (dialog.open) {
      dialog.close();
    }
    document.documentElement.classList.remove('modal-open');
  }, [isOpen]);

  const close = () => setActive(null);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      close();
    }
  };

  return (
    <div className="footer__legal">
      {triggers.map((trigger, index) => (
        <span className="footer__legal-item" key={trigger.key}>
          {index > 0 ? (
            <span className="footer__legal-separator" aria-hidden="true">
              ·
            </span>
          ) : null}
          <button
            className="footer__legal-link"
            type="button"
            onClick={() => setActive(trigger.key)}
          >
            {trigger.label}
          </button>
        </span>
      ))}

      <dialog
        className="modal legal"
        ref={dialogRef}
        aria-labelledby="legal-title"
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={close}
        onClick={handleBackdropClick}
      >
        {document_ ? (
          <div className="modal__panel legal__panel">
            <button
              className="modal__close"
              type="button"
              onClick={close}
              aria-label="Fechar"
            >
              <span aria-hidden="true">×</span>
            </button>

            <h2 className="legal__title" id="legal-title">
              {document_.title}
            </h2>
            <p className="legal__updated">{document_.updated}</p>

            {document_.sections.map((section) => (
              <section className="legal__section" key={section.heading}>
                <h3 className="legal__heading">{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p className="legal__text" key={paragraph.slice(0, 32)}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
