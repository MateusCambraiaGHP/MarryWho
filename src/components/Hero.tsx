import { assetUrl } from '../lib/asset';
import { couple, heroImage, welcomeLetter } from '../content/couple';
import { Countdown } from './Countdown';

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__media">
        <img
          className="hero__image"
          src={assetUrl(heroImage.large)}
          srcSet={`${assetUrl(heroImage.small)} 540w, ${assetUrl(heroImage.large)} 1080w`}
          sizes="100vw"
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <span className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow">Vamos nos casar</p>
        <h1 className="hero__title" id="hero-title">
          {couple.bride} <span className="hero__amp">&amp;</span> {couple.groom}
        </h1>
        <p className="hero__date">
          {couple.dateShortLabel}
          <span className="hero__date-separator" aria-hidden="true">
            ·
          </span>
          {couple.timeLabel}
        </p>
        <Countdown />
      </div>
    </section>
  );
}

export function WelcomeLetter() {
  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <div className="container">
        <article className="letter">
          <p className="letter__ornament" aria-hidden="true">
            ♡
          </p>
          <h2 className="letter__title" id="welcome-title">
            {welcomeLetter.heading}
          </h2>
          {welcomeLetter.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <p className="letter__closing">{welcomeLetter.closing}</p>
          <p className="letter__signature">{welcomeLetter.signature}</p>
        </article>
      </div>
    </section>
  );
}
