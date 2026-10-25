import { useEffect, useRef, type MouseEvent } from 'react';
import type { Gift } from '../lib/gifts';
import { giftCategories } from '../lib/gifts';
import { formatBRL } from '../lib/currency';
import { assetUrl } from '../lib/asset';
import { PixPanel } from './PixPanel';
import { SmartImage } from './SmartImage';

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

export function GiftModal({ gift, onClose }: { gift: Gift | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (gift) {
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
  }, [gift]);

  const selectedCategory = gift
    ? (giftCategories.find((category) => category.id === gift.category)?.label ?? '')
    : '';

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      className="modal"
      ref={dialogRef}
      aria-labelledby="gift-modal-title"
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      {gift ? (
        <div className="modal__panel">
          <button
            className="modal__close"
            type="button"
            onClick={onClose}
            aria-label="Fechar painel do presente"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="modal__gift">
            <SmartImage
              className="modal__thumb"
              src={assetUrl(gift.image)}
              alt={`Foto de ${gift.name}`}
              width={208}
              height={208}
              fallbackText={initialsFor(gift.name)}
              loading="eager"
            />
            <div className="modal__identity">
              <p className="tag">{selectedCategory}</p>
              <h2 className="modal__title" id="gift-modal-title">
                {gift.name}
              </h2>
              <p className="modal__price">{formatBRL(gift.price)}</p>
            </div>
          </div>

          <PixPanel amount={gift.price} giftName={gift.name} />
        </div>
      ) : null}
    </dialog>
  );
}
