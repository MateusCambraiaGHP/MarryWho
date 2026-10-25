import { useRef, useState, type FormEvent } from 'react';
import { rsvp } from '../content/rsvp';
import { useClipboard } from '../hooks/useClipboard';
import { buildRsvpSummary, buildWhatsAppUrl } from '../lib/rsvp';
import { SectionHeading } from './SectionHeading';

type Attending = '' | 'sim' | 'nao';

type FormValues = {
  name: string;
  attending: Attending;
  adults: string;
  children: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
};

type FieldErrors = Partial<Record<'name' | 'attending' | 'email' | 'consent', string>>;

const initialValues: FormValues = {
  name: '',
  attending: '',
  adults: '1',
  children: '0',
  email: '',
  phone: '',
  notes: '',
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Rsvp() {
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
      nextErrors.name = 'Informe seu nome completo.';
    }

    if (!values.attending) {
      nextErrors.attending = 'Escolha se você vai comparecer.';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Informe seu e-mail.';
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Informe um e-mail válido.';
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

    const builtSummary = buildRsvpSummary({
      name: values.name,
      attending: values.attending === 'sim',
      adults: Number(values.adults),
      children: Number(values.children),
      email: values.email,
      phone: values.phone,
      notes: values.notes,
    });
    const url = buildWhatsAppUrl(rsvp.whatsappNumber, builtSummary);

    setSummary(builtSummary);
    setWhatsAppUrl(url ?? '');
    setSubmitted(true);

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const copyStatusMessage =
    status === 'copied'
      ? 'Resumo copiado.'
      : status === 'failed'
        ? 'Não foi possível copiar automaticamente. Selecione o resumo e copie manualmente.'
        : '';

  return (
    <section className="section rsvp" id="presenca" aria-labelledby="rsvp-title">
      <div className="container">
        <SectionHeading eyebrow="Contamos com você" title={rsvp.heading} titleId="rsvp-title" />

        <p className="rsvp__intro">{rsvp.intro}</p>

        {submitted ? (
          <div className="rsvp__success">
            <h3 className="rsvp__success-title">Confirmação pronta! 💛</h3>
            <p>{whatsAppUrl ? rsvp.successNoteWhatsApp : rsvp.successNoteCopy}</p>
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
                    Copiar resumo
                  </button>
                </>
              ) : (
                <button
                  className="button button--gold"
                  type="button"
                  onClick={() => void copy(summary)}
                >
                  Copiar resumo
                </button>
              )}
            </div>
            <p className="rsvp__copy-status" role="status" aria-live="polite">
              {copyStatusMessage}
            </p>
            <button className="link-button" type="button" onClick={() => setSubmitted(false)}>
              Corrigir resposta
            </button>
          </div>
        ) : (
          <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
            {Object.keys(errors).length > 0 ? (
              <div className="form-error-summary" role="alert" tabIndex={-1} ref={errorSummaryRef}>
                Revise os campos destacados abaixo antes de enviar.
              </div>
            ) : null}

            <div className="field">
              <label className="field__label" htmlFor="rsvp-name">
                Nome completo
              </label>
              <input
                className={`field__input${errors.name ? ' has-error' : ''}`}
                id="rsvp-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(event) => updateValue('name', event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
              />
              {errors.name ? (
                <p className="field__error" id="rsvp-name-error" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <fieldset className="field field--fieldset">
              <legend className="field__label">Você vai comparecer?</legend>
              <div className="radio-row">
                <label className="radio">
                  <input
                    type="radio"
                    name="attending"
                    value="sim"
                    checked={values.attending === 'sim'}
                    onChange={() => updateValue('attending', 'sim')}
                    aria-invalid={Boolean(errors.attending)}
                    aria-describedby={errors.attending ? 'rsvp-attending-error' : undefined}
                  />
                  <span>Sim, estarei lá</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="attending"
                    value="nao"
                    checked={values.attending === 'nao'}
                    onChange={() => updateValue('attending', 'nao')}
                    aria-invalid={Boolean(errors.attending)}
                    aria-describedby={errors.attending ? 'rsvp-attending-error' : undefined}
                  />
                  <span>Não vou conseguir ir</span>
                </label>
              </div>
              {errors.attending ? (
                <p className="field__error" id="rsvp-attending-error" role="alert">
                  {errors.attending}
                </p>
              ) : null}
            </fieldset>

            {values.attending === 'sim' ? (
              <div className="field-row">
                <div className="field">
                  <label className="field__label" htmlFor="rsvp-adults">
                    Quantidade de adultos
                  </label>
                  <select
                    className="field__select"
                    id="rsvp-adults"
                    name="adults"
                    value={values.adults}
                    onChange={(event) => updateValue('adults', event.target.value)}
                  >
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="rsvp-children">
                    Quantidade de crianças
                  </label>
                  <select
                    className="field__select"
                    id="rsvp-children"
                    name="children"
                    value={values.children}
                    onChange={(event) => updateValue('children', event.target.value)}
                  >
                    {Array.from({ length: 11 }, (_, index) => index).map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null}

            <div className="field-row">
              <div className="field">
                <label className="field__label" htmlFor="rsvp-email">
                  E-mail
                </label>
                <input
                  className={`field__input${errors.email ? ' has-error' : ''}`}
                  id="rsvp-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => updateValue('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'rsvp-email-error' : undefined}
                />
                {errors.email ? (
                  <p className="field__error" id="rsvp-email-error" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="rsvp-phone">
                  Telefone <span className="field__optional">(opcional)</span>
                </label>
                <input
                  className="field__input"
                  id="rsvp-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(event) => updateValue('phone', event.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="rsvp-notes">
                Observações <span className="field__optional">(opcional)</span>
              </label>
              <textarea
                className="field__input field__textarea"
                id="rsvp-notes"
                name="notes"
                rows={4}
                value={values.notes}
                onChange={(event) => updateValue('notes', event.target.value)}
              />
            </div>

            <div className="field field--consent">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => updateValue('consent', event.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'rsvp-consent-error' : undefined}
                />
                <span>{rsvp.privacyNotice}</span>
              </label>
              {errors.consent ? (
                <p className="field__error" id="rsvp-consent-error" role="alert">
                  {errors.consent}
                </p>
              ) : null}
            </div>

            <button className="button button--gold button--full" type="submit">
              {rsvp.whatsappNumber ? 'Enviar confirmação pelo WhatsApp' : 'Gerar resumo da confirmação'}
            </button>
            <p className="rsvp__note">
              {rsvp.whatsappNumber ? rsvp.formNoteWhatsApp : rsvp.formNoteCopy}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
