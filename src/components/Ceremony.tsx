import { ceremony, mapsEmbedLink, mapsLink } from '../content/ceremony';
import { SectionHeading } from './SectionHeading';

export function Ceremony() {
  return (
    <section className="section ceremony" id="cerimonia" aria-labelledby="ceremony-title">
      <div className="container">
        <SectionHeading eyebrow="O grande dia" title={ceremony.heading} titleId="ceremony-title" />

        <div className="ceremony__layout">
          <div className="ceremony__details">
            <div className="ceremony__when">
              <p className="ceremony__date">{ceremony.dateLabel}</p>
              <p className="ceremony__time">{ceremony.timeLabel}</p>
            </div>

            <p className="ceremony__intro">{ceremony.intro}</p>

            <div className="ceremony__address-block">
              <h3 className="ceremony__label">Onde será</h3>
              <address className="ceremony__address">
                <span>{ceremony.address.street}</span>
                <span>{ceremony.address.district}</span>
                <span>{ceremony.address.city}</span>
              </address>
            </div>

            <p className="ceremony__punctuality">{ceremony.punctualityNote}</p>

            <a className="button button--gold" href={mapsLink} target="_blank" rel="noopener noreferrer">
              Abrir no Maps
              <span className="button__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <div className="ceremony__map-block">
            <div className="ceremony__map">
              <iframe
                src={mapsEmbedLink}
                title="Mapa com a localização da cerimônia"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="ceremony__map-note">
              O mapa pode não carregar em alguns aparelhos. Se isso acontecer, toque em{' '}
              <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                Abrir no Maps
              </a>{' '}
              para ver o caminho.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
