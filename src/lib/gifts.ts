export type GiftCategoryId =
  | 'cama-mesa-banho'
  | 'cozinha'
  | 'decoracao'
  | 'eletrodomesticos'
  | 'eletroportateis'
  | 'lua-de-mel'
  | 'moveis'
  | 'personalizados';

export type Gift = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: GiftCategoryId;
  isQuota: boolean;
};

export type GiftSort = 'az' | 'menor-preco' | 'maior-preco';

export type GiftFilter = GiftCategoryId | 'todas';

export const GIFTS_PAGE_SIZE = 20;

export const giftCategories: { id: GiftFilter; label: string }[] = [
  { id: 'todas', label: 'Todos' },
  { id: 'cama-mesa-banho', label: 'Cama, mesa e banho' },
  { id: 'cozinha', label: 'Cozinha' },
  { id: 'decoracao', label: 'Decoração' },
  { id: 'eletrodomesticos', label: 'Eletrodomésticos' },
  { id: 'eletroportateis', label: 'Eletroportáteis' },
  { id: 'lua-de-mel', label: 'Lua de mel e cotas' },
  { id: 'moveis', label: 'Móveis' },
  { id: 'personalizados', label: 'Presentes personalizados' },
];

export const giftSortOptions: { id: GiftSort; label: string }[] = [
  { id: 'az', label: 'A-Z' },
  { id: 'menor-preco', label: 'Menor preço' },
  { id: 'maior-preco', label: 'Maior preço' },
];

const quotaMarkers = [
  'cota:',
  'patrocine',
  'fundo',
  'fundos',
  'pix da',
  'presente sem erro',
  'um pouquinho de cada um',
  'uma ajudinha',
  'ajude o noivo',
  'kit sobrevivencia',
  'terapia preventiva',
];

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function isQuotaGift(name: string): boolean {
  const normalizedName = normalizeText(name);
  return quotaMarkers.some((marker) => normalizedName.startsWith(marker));
}

export function filterGifts(gifts: Gift[], category: GiftFilter): Gift[] {
  if (category === 'todas') {
    return gifts;
  }

  return gifts.filter((gift) => gift.category === category);
}

const nameCollator = new Intl.Collator('pt-BR', { sensitivity: 'base' });

export function sortGifts(gifts: Gift[], sort: GiftSort): Gift[] {
  const sorted = [...gifts];

  if (sort === 'az') {
    sorted.sort((first, second) => nameCollator.compare(first.name, second.name));
    return sorted;
  }

  sorted.sort((first, second) => {
    const priceDifference = sort === 'menor-preco' ? first.price - second.price : second.price - first.price;
    return priceDifference !== 0 ? priceDifference : nameCollator.compare(first.name, second.name);
  });

  return sorted;
}

export function paginateGifts(gifts: Gift[], visibleCount: number): Gift[] {
  return gifts.slice(0, Math.max(0, visibleCount));
}
