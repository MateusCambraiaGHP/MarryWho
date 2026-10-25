import { describe, expect, it } from 'vitest';
import {
  GIFTS_PAGE_SIZE,
  filterGifts,
  isQuotaGift,
  paginateGifts,
  sortGifts,
  type Gift,
} from './gifts';

function makeGift(id: string, name: string, price: number, category: Gift['category'] = 'cozinha'): Gift {
  return { id, name, price, image: `img/gifts/${id}.jpg`, category, isQuota: isQuotaGift(name) };
}

const catalog: Gift[] = [
  makeGift('1', 'Batedeira Planetária', 498.02),
  makeGift('2', 'Adega de Vinhos Climatizada', 1789.7, 'eletrodomesticos'),
  makeGift('3', 'Ábaco de Madeira', 120, 'decoracao'),
  makeGift('4', 'COTA: o primeiro tijolinho', 132.38, 'lua-de-mel'),
  makeGift('5', 'Frigideira Antiaderente', 269.63),
];

describe('isQuotaGift', () => {
  it('detects every quota prefix used by the wedding list', () => {
    const quotaNames = [
      'COTA: Acabamento de luxo',
      'Patrocine a lua de mel dos noivos',
      'Fundo para boletos surpresa',
      'Fundos para não surtar com a reforma',
      'Pix da paz interior da noiva',
      'Presente sem erro: deixe os noivos escolherem!',
      'Um pouquinho de cada um constrói o nosso sonho!',
      'Uma ajudinha para os móveis planejados',
      'Ajude o noivo a bancar seus hobbies',
      'Kit sobrevivência para os dias de TPM',
      'Terapia preventiva da noiva',
      'Fundo para os engenheiros tirarem férias',
    ];

    for (const name of quotaNames) {
      expect(isQuotaGift(name), name).toBe(true);
    }
  });

  it('does not flag regular products', () => {
    expect(isQuotaGift('Batedeira Planetária')).toBe(false);
    expect(isQuotaGift('Jogo de Panelas Preto - 5 Peças')).toBe(false);
    expect(isQuotaGift('Smart TV LED 40 Polegadas')).toBe(false);
    expect(isQuotaGift('Primeiro churrasco na casa nova')).toBe(false);
  });

  it('ignores case and accents when detecting quotas', () => {
    expect(isQuotaGift('kit sobrevivencia para os dias de TPM')).toBe(true);
  });
});

describe('filterGifts', () => {
  it('keeps only gifts from the selected category', () => {
    const result = filterGifts(catalog, 'cozinha');

    expect(result.map((gift) => gift.id)).toEqual(['1', '5']);
  });

  it('returns every gift when the filter is "todas"', () => {
    expect(filterGifts(catalog, 'todas')).toHaveLength(catalog.length);
  });
});

describe('sortGifts', () => {
  it('sorts alphabetically in Portuguese, ignoring accents', () => {
    const result = sortGifts(catalog, 'az');

    expect(result.map((gift) => gift.name)).toEqual([
      'Ábaco de Madeira',
      'Adega de Vinhos Climatizada',
      'Batedeira Planetária',
      'COTA: o primeiro tijolinho',
      'Frigideira Antiaderente',
    ]);
  });

  it('sorts from the lowest price', () => {
    const result = sortGifts(catalog, 'menor-preco');

    expect(result.map((gift) => gift.price)).toEqual([120, 132.38, 269.63, 498.02, 1789.7]);
  });

  it('sorts from the highest price', () => {
    const result = sortGifts(catalog, 'maior-preco');

    expect(result.map((gift) => gift.price)).toEqual([1789.7, 498.02, 269.63, 132.38, 120]);
  });

  it('does not mutate the input array', () => {
    const original = [...catalog];
    sortGifts(catalog, 'maior-preco');

    expect(catalog).toEqual(original);
  });
});

describe('paginateGifts', () => {
  it('starts with the first twenty gifts', () => {
    const manyGifts = Array.from({ length: 45 }, (_, index) => makeGift(String(index), `Presente ${index}`, 10));

    expect(GIFTS_PAGE_SIZE).toBe(20);
    expect(paginateGifts(manyGifts, GIFTS_PAGE_SIZE)).toHaveLength(20);
    expect(paginateGifts(manyGifts, GIFTS_PAGE_SIZE * 2)).toHaveLength(40);
    expect(paginateGifts(manyGifts, GIFTS_PAGE_SIZE * 3)).toHaveLength(45);
  });

  it('handles a visible count beyond the list length', () => {
    expect(paginateGifts(catalog, 999)).toHaveLength(catalog.length);
  });
});

describe('filter, sort and pagination together', () => {
  it('keeps the category filter active while sorting and paginating', () => {
    const result = paginateGifts(sortGifts(filterGifts(catalog, 'cozinha'), 'maior-preco'), 1);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Batedeira Planetária');
  });
});
