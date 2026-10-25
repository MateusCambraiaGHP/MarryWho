export type StoryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type StoryChapter = {
  id: string;
  indexLabel: string;
  title: string;
  paragraphs: string[];
  photo: StoryPhoto;
};

export const story = {
  heading: 'O CASAL',
  subtitle: 'A nossa história de amor… ♡',
  closing: 'Com todo o nosso amor,',
  signature: 'Lorenna & Bruno 💍',
};

export const storyPhotos: StoryPhoto[] = [
  {
    src: 'img/casal-01.jpg',
    alt: 'Lorenna sorrindo de perto enquanto Bruno segura o seu rosto',
    width: 1000,
    height: 667,
  },
  {
    src: 'img/casal-02.jpg',
    alt: 'Lorenna e Bruno abraçados em um deck de madeira diante das montanhas',
    width: 1000,
    height: 667,
  },
  {
    src: 'img/casal-03.jpg',
    alt: 'Fonte de água em um jardim com palmeiras, no espaço onde a cerimônia será realizada',
    width: 617,
    height: 324,
  },
  {
    src: 'img/casal-04.jpg',
    alt: 'Lorenna e Bruno caminhando de mãos dadas entre palmeiras e montanhas',
    width: 1000,
    height: 647,
  },
];

export const storyChapters: StoryChapter[] = [
  {
    id: 'comeco',
    indexLabel: 'Capítulo 01',
    title: 'O começo',
    paragraphs: [
      'Quem diria que, em meio a projetos, cálculos e sonhos da faculdade de Engenharia Civil, encontraríamos um ao outro e começaríamos a construir a história mais bonita das nossas vidas?',
      'No dia 25 de julho de 2019, demos início à nossa história de amor. Desde então, foram tantos momentos, sonhos compartilhados, conquistas e desafios que nos trouxeram até aqui. E, se existe algo que a vida me ensinou ao seu lado, é que o amor vai muito além dos dias felizes. É também ter alguém que segura a nossa mão quando o mundo parece desabar, que nos acolhe nas dores mais profundas e que nos lembra, mesmo nos dias difíceis, que não precisamos enfrentar tudo sozinhos.',
    ],
    photo: storyPhotos[0],
  },
  {
    id: 'pedido',
    indexLabel: 'Capítulo 02',
    title: 'O pedido',
    paragraphs: [
      'Ao longo dessa caminhada, descobri em você muito mais do que o amor da minha vida: encontrei meu companheiro, meu porto seguro e a pessoa com quem quero dividir todos os capítulos da minha história.',
      'Cinco anos depois daquele primeiro sim ao nosso namoro, em 25 de julho de 2024, veio o pedido que transformou nossos sonhos em planos para o futuro. E agora, chegou a hora de dar mais um passo nessa história que escolhemos construir juntos.',
    ],
    photo: storyPhotos[1],
  },
  {
    id: 'nosso-sim',
    indexLabel: 'Capítulo 03',
    title: 'O nosso sim',
    paragraphs: [
      'No dia 25 de abril de 2027, diremos o nosso tão esperado “sim”, cercados pelas pessoas que amamos, para celebrar não apenas o início de um casamento, mas todo o caminho que nos trouxe até aqui.',
    ],
    photo: storyPhotos[2],
  },
  {
    id: 'para-sempre',
    indexLabel: 'Capítulo 04',
    title: 'O nosso para sempre',
    paragraphs: [
      'Estamos preparando cada detalhe com muito amor e carinho, para que esse dia seja tão especial quanto tudo o que vivemos até agora. Afinal, o nosso maior sonho é olhar ao redor e encontrar cada um de vocês fazendo parte desse momento.',
      'Mal podemos esperar para viver esse sonho ao lado de vocês e começar, juntos, o capítulo mais lindo da nossa história: o nosso para sempre.',
    ],
    photo: storyPhotos[3],
  },
];
