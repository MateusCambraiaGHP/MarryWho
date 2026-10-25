import { useCallback, useMemo, useRef, useState } from 'react';
import { gifts } from '../content/gifts';
import { giftsPage } from '../content/giftsPage';
import { assetUrl } from '../lib/asset';
import {
  GIFTS_PAGE_SIZE,
  filterGifts,
  giftCategories,
  giftSortOptions,
  paginateGifts,
  sortGifts,
  type Gift,
  type GiftFilter,
  type GiftSort,
} from '../lib/gifts';
import { formatBRL } from '../lib/currency';
import { SectionHeading } from './SectionHeading';
import { SmartImage } from './SmartImage';
import { GiftModal } from './GiftModal';

function initialsFor(name: string): string {
  return name
    .replace(/[^\p{L}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function Gifts() {
  const [category, setCategory] = useState<GiftFilter>('todas');
  const [sort, setSort] = useState<GiftSort>('az');
  const [visibleCount, setVisibleCount] = useState(GIFTS_PAGE_SIZE);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredGifts = useMemo(() => sortGifts(filterGifts(gifts, category), sort), [category, sort]);
  const visibleGifts = useMemo(() => paginateGifts(filteredGifts, visibleCount), [filteredGifts, visibleCount]);
  const remainingGifts = filteredGifts.length - visibleGifts.length;

  const handleCategoryChange = (nextCategory: GiftFilter) => {
    setCategory(nextCategory);
    setVisibleCount(GIFTS_PAGE_SIZE);
  };

  const openGift = (gift: Gift, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedGift(gift);
  };

  const closeGift = useCallback(() => {
    setSelectedGift(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const resultsAnnouncement = `${filteredGifts.length} ${
    filteredGifts.length === 1 ? 'presente encontrado' : 'presentes encontrados'
  }`;

  return (
    <section className="section gifts" id="presentes" aria-labelledby="gifts-title">
      <div className="container">
        <SectionHeading eyebrow={giftsPage.eyebrow} title={giftsPage.heading} titleId="gifts-title" />

        <div className="gifts__intro">
          {giftsPage.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}

          <div className="gifts__pix-note">
            <p>{giftsPage.pixNote}</p>
          </div>

          <p className="gifts__signature">{giftsPage.signature}</p>
        </div>

        <div className="gifts__controls">
          <div className="gifts__categories" role="group" aria-label="Filtrar presentes por categoria">
            {giftCategories.map((option) => (
              <button
                key={option.id}
                className="chip chip--category"
                type="button"
                aria-pressed={category === option.id}
                onClick={() => handleCategoryChange(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="gifts__sort">
            <label className="field__label" htmlFor="gift-sort">
              Ordenar por
            </label>
            <select
              className="field__select"
              id="gift-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as GiftSort)}
            >
              {giftSortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="gifts__meta">
          <p>
            Mostrando <strong>{visibleGifts.length}</strong> de <strong>{filteredGifts.length}</strong>{' '}
            presentes
          </p>
          <p className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
            {resultsAnnouncement}
          </p>
        </div>

        {filteredGifts.length === 0 ? (
          <div className="gifts__empty">
            <p>Nenhum presente encontrado nesta categoria.</p>
            <button
              className="button button--ghost"
              type="button"
              onClick={() => handleCategoryChange('todas')}
            >
              Mostrar todos os presentes
            </button>
          </div>
        ) : (
          <>
            <ul className="gift-grid">
              {visibleGifts.map((gift) => (
                <li key={gift.id}>
                  <article className="gift-card">
                    <div className="gift-card__media">
                      <SmartImage
                        className="gift-card__image"
                        src={assetUrl(gift.image)}
                        alt={`Foto de ${gift.name}`}
                        width={208}
                        height={208}
                        fallbackText={initialsFor(gift.name)}
                      />
                      <span className="tag gift-card__tag">
                        {giftCategories.find((option) => option.id === gift.category)?.label}
                      </span>
                    </div>
                    <div className="gift-card__body">
                      <h3 className="gift-card__name">{gift.name}</h3>
                      {gift.isQuota ? (
                        <p className="gift-card__quota">Contribua com o valor que quiser</p>
                      ) : (
                        <p className="gift-card__price">{formatBRL(gift.price)}</p>
                      )}
                      <button
                        className="button button--gold button--full"
                        type="button"
                        onClick={(event) => openGift(gift, event.currentTarget)}
                      >
                        Presentear
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            {remainingGifts > 0 ? (
              <div className="gifts__more">
                <button
                  className="button button--ghost"
                  type="button"
                  onClick={() => setVisibleCount((current) => current + GIFTS_PAGE_SIZE)}
                >
                  Ver mais presentes
                  <span className="button__count" aria-hidden="true">
                    +{Math.min(remainingGifts, GIFTS_PAGE_SIZE)}
                  </span>
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <GiftModal gift={selectedGift} onClose={closeGift} />
    </section>
  );
}
