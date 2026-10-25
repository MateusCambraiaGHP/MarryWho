export const ceremony = {
  heading: 'CERIMÔNIA',
  dateLabel: 'Domingo, 25 de abril de 2027',
  timeLabel: '16h',
  intro:
    'Gostaríamos muito de contar com a presença de todos vocês no momento em que nossa união será abençoada diante de Deus. A cerimônia será rápida e começará pontualmente, por isso pedimos que cheguem com alguns minutos de antecedência.',
  punctualityNote: 'Pedimos, por favor, pontualidade: a cerimônia começa às 16h.',
  address: {
    street: 'Av. dos Trompetes, 47',
    district: 'Estâncias Imperiais',
    city: 'Contagem – MG, 32065-260',
    full: 'Av. dos Trompetes, 47 – Estâncias Imperiais, Contagem – MG, 32065-260',
  },
};

const mapsQuery = encodeURIComponent(
  'Av. dos Trompetes, 47, Estâncias Imperiais, Contagem - MG, 32065-260',
);

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const mapsEmbedLink = `https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`;
