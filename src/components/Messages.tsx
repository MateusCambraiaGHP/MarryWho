import { useRef, useState, type FormEvent } from 'react';
import { messages } from '../content/messages';
import { whatsappNumber } from '../content/contact';
import { useClipboard } from '../hooks/useClipboard';
import { buildGuestMessage } from '../lib/messages';
import { buildWhatsAppUrl } from '../lib/rsvp';
import { SectionHeading } from './SectionHeading';

type FormValues = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
};

type FieldErrors = Partial<Record<'name' | 'message' | 'consent', string>>;

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
  consent: false,
};

export function Messages() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState('');
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const { status, copy } = useClipboard();

  const updateValue = <Key extends keyof FormValues>(key: Key, value: FormValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (key in errors) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[key as keyof FieldErrors];
        return nextErrors;
      });
    }
  };

  const validate = (): FieldErrors => {
    const nextErrors: FieldErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = 'Informe seu nome.';
    }

    if (!values.message.trim()) {
      nextErrors.message = 'Escreva o seu recado.';
    }

    if (!values.consent) {
      nextErrors.consent = 'É preciso aceitar o aviso de privacidade.';
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    const builtSummary = buildGuestMessage({
      name: values.name,
      email: values.email,
      message: values.message,
    });
    const url = buildWhatsAppUrl(whatsappNumber, builtSummary);

    setSummary(builtSummary);
    setWhatsAppUrl(url ?? '');
    setSubmitted(true);

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const copyStatusMessage =
    status === 'copied'
      ? 'Recado copiado.'
      : status === 'failed'
        ? 'Não foi possível copiar automaticamente. Selecione o recado e copie manualmente.'
        : '';

  return (
    <section className="section rsvp messages" id="recados" aria-labelledby="messages-title">
      <div className="container">
        <SectionHeading eyebrow={messages.eyebrow} title={messages.heading} titleId="messages-title" />
        <p className="section-heading__subtitle">{messages.subtitle}</p>

        <div className="messages__letter">
          {messages.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="messages__signature">{messages.signature}</p>
        </div>

        {submitted ? (
          <div className="rsvp__success">
            <h3 className="rsvp__success-title">{messages.successTitle}</h3>
            <p>{messages.successNote}</p>
            <pre className="rsvp__summary">{summary}</pre>
            <div className="rsvp__success-actions">
              {whatsAppUrl ? (
                <>
                  <a
                    className="button button--gold"
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir o WhatsApp novamente
                  </a>
                  <button
                    className="button button--ghost"
                    type="button"
                    onClick={() => void copy(summary)}
                  >
                    Copiar recado
                  </button>
                </>
              ) : (
                <button
                  className="button button--gold"
                  type="button"
                  onClick={() => void copy(summary)}
                >
                  Copiar recado
                </button>
              )}
            </div>
            <p className="rsvp__copy-status" role="status" aria-live="polite">
              {copyStatusMessage}
            </p>
            <button className="link-button" type="button" onClick={() => setSubmitted(false)}>
              Escrever outro recado
            </button>
          </div>
        ) : (
          <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
            {Object.keys(errors).length > 0 ? (
              <div className="form-error-summary" role="alert" tabIndex={-1} ref={errorSummaryRef}>
                Revise os campos destacados abaixo antes de enviar.
              </div>
            ) : null}

            <div className="field-row">
              <div className="field">
                <label className="field__label" htmlFor="message-name">
                  {messages.nameLabel}
                </label>
                <input
                  className={`field__input${errors.name ? ' has-error' : ''}`}
                  id="message-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => updateValue('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'message-name-error' : undefined}
                />
                {errors.name ? (
                  <p className="field__error" id="message-name-error" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="message-email">
                  {messages.emailLabel} <span className="field__optional">{messages.emailOptional}</span>
                </label>
                <input
                  className="field__input"
                  id="message-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => updateValue('email', event.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="message-body">
                {messages.messageLabel}
              </label>
              <textarea
                className={`field__input field__textarea${errors.message ? ' has-error' : ''}`}
                id="message-body"
                name="message"
                rows={6}
                placeholder={messages.messagePlaceholder}
                value={values.message}
                onChange={(event) => updateValue('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-body-error' : undefined}
              />
              {errors.message ? (
                <p className="field__error" id="message-body-error" role="alert">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="field field--consent">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => updateValue('consent', event.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'message-consent-error' : undefined}
                />
                <span>{messages.privacyNotice}</span>
              </label>
              {errors.consent ? (
                <p className="field__error" id="message-consent-error" role="alert">
                  {errors.consent}
                </p>
              ) : null}
            </div>

            <button className="button button--gold button--full" type="submit">
              {messages.submitLabel}
            </button>
            <p className="rsvp__note">{messages.formNote}</p>
          </form>
        )}
      </div>
    </section>
  );
}
