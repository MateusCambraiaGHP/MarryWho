import { rsvp } from '../content/rsvp';
import { SectionHeading } from './SectionHeading';

export function Rsvp() {
  return (
    <section className="section rsvp" id="presenca" aria-labelledby="rsvp-title">
      <div className="container">
        <SectionHeading eyebrow="Contamos com você" title={rsvp.heading} titleId="rsvp-title" />

        <p className="rsvp__intro">{rsvp.intro}</p>

        <div className="rsvp__cta">
          <a
            className="button button--gold"
            href={rsvp.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {rsvp.ctaLabel}
          </a>
          <p className="rsvp__cta-note">{rsvp.note}</p>
        </div>
      </div>
    </section>
  );
}
