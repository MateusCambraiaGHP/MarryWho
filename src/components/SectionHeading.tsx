export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  titleId,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  titleId: string;
}) {
  return (
    <header className="section-heading">
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2 className="section-heading__title" id={titleId}>
        {title}
      </h2>
      <span className="section-heading__rule" aria-hidden="true" />
      {subtitle ? <p className="section-heading__subtitle">{subtitle}</p> : null}
    </header>
  );
}
