import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type TouchEvent,
} from 'react';
import type { StoryPhoto } from '../content/story';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { assetUrl } from '../lib/asset';
import { SmartImage } from './SmartImage';

function Chevron({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d={direction === 'previous' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StoryGallery({ photos }: { photos: StoryPhoto[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isOpen = openIndex !== null;

  const centerCard = useCallback(
    (target: number) => {
      const track = trackRef.current;
      const next = Math.max(0, Math.min(photos.length - 1, target));
      const item = track?.children[next] as HTMLElement | undefined;

      if (!track || !item) {
        return;
      }

      track.scrollTo({
        left: item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [photos.length, prefersReducedMotion],
  );

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    let frame = 0;

    const updateActive = () => {
      frame = 0;

      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        const element = child as HTMLElement;
        const distance = Math.abs(element.offsetLeft + element.offsetWidth / 2 - center);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nearest = index;
        }
      });

      setActiveIndex((current) => (current === nearest ? current : nearest));
    };

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    track.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      track.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [photos]);

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

      return;
    }

    if (dialog.open) {
      dialog.close();
    }
    document.documentElement.classList.remove('modal-open');
  }, [isOpen]);

  const closeLightbox = () => setOpenIndex(null);

  const stepLightbox = (direction: -1 | 1) => {
    setOpenIndex((current) => {
      if (current === null) {
        return current;
      }

      return (current + direction + photos.length) % photos.length;
    });
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      closeLightbox();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDialogElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDialogElement>) => {
    const start = touchStartX.current;
    touchStartX.current = null;

    if (start === null) {
      return;
    }

    const delta = (event.changedTouches[0]?.clientX ?? start) - start;

    if (Math.abs(delta) >= 48) {
      stepLightbox(delta < 0 ? 1 : -1);
    }
  };

  const activePhoto = openIndex === null ? null : photos[openIndex];

  return (
    <section className="story-gallery" aria-labelledby="story-gallery-title">
      <div className="story-gallery__head">
        <div>
          <p className="story-gallery__eyebrow">Ensaio</p>
          <h3 className="story-gallery__title" id="story-gallery-title">
            Nosso ensaio na Vila Relicário
          </h3>
        </div>
        <div className="story-gallery__nav">
          <button
            className="story-gallery__button"
            type="button"
            onClick={() => centerCard(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Foto anterior"
          >
            <Chevron direction="previous" />
          </button>
          <span className="story-gallery__counter" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <button
            className="story-gallery__button"
            type="button"
            onClick={() => centerCard(activeIndex + 1)}
            disabled={activeIndex === photos.length - 1}
            aria-label="Próxima foto"
          >
            <Chevron direction="next" />
          </button>
        </div>
      </div>

      <ul
        className="story-gallery__track"
        ref={trackRef}
        tabIndex={0}
        aria-label="Fotos do ensaio de Lorenna e Bruno"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            centerCard(activeIndex + 1);
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            centerCard(activeIndex - 1);
          } else if (event.key === 'Home') {
            event.preventDefault();
            centerCard(0);
          } else if (event.key === 'End') {
            event.preventDefault();
            centerCard(photos.length - 1);
          }
        }}
      >
        {photos.map((photo, index) => (
          <li
            className={`story-gallery__item${index === activeIndex ? ' is-active' : ''}`}
            key={photo.src}
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          >
            <button
              className="story-gallery__open"
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ampliar foto ${index + 1} de ${photos.length}`}
            >
              <SmartImage
                className="story-gallery__photo"
                src={assetUrl(photo.src)}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading={index < 4 ? 'eager' : 'lazy'}
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        className="lightbox"
        ref={dialogRef}
        aria-label="Fotos do ensaio de Lorenna e Bruno"
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault();
          closeLightbox();
        }}
        onClose={closeLightbox}
        onClick={handleBackdropClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            stepLightbox(1);
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            stepLightbox(-1);
          }
        }}
      >
        {activePhoto ? (
          <div className="lightbox__panel">
            <button
              className="lightbox__close"
              type="button"
              onClick={closeLightbox}
              aria-label="Fechar galeria"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="lightbox__stage">
              <img
                className="lightbox__image"
                src={assetUrl(activePhoto.src)}
                alt={activePhoto.alt}
                width={activePhoto.width}
                height={activePhoto.height}
              />
            </div>

            <div className="lightbox__bar">
              <button
                className="lightbox__button"
                type="button"
                onClick={() => stepLightbox(-1)}
                aria-label="Foto anterior"
              >
                <Chevron direction="previous" />
              </button>
              <span className="lightbox__counter" aria-live="polite">
                {String((openIndex ?? 0) + 1).padStart(2, '0')} /{' '}
                {String(photos.length).padStart(2, '0')}
              </span>
              <button
                className="lightbox__button"
                type="button"
                onClick={() => stepLightbox(1)}
                aria-label="Próxima foto"
              >
                <Chevron direction="next" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
