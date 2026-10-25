import type { Gift } from '../lib/gifts';
import { isQuotaGift } from '../lib/gifts';

type GiftSeed = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Gift['category'];
};

const giftSeeds: GiftSeed[] = [
  { id: '217270952', name: "2 Passagens Aéreas para a Lua de Mel", price: 5308.94, image: 'img/gifts/217270952.jpg', category: 'lua-de-mel' },
  { id: '217270943', name: "Adega de Vinhos Climatizada", price: 1789.70, image: 'img/gifts/217270943.jpg', category: 'eletrodomesticos' },
  { id: '220144159', name: "Ajude o noivo a bancar seus hobbies", price: 456.64, image: 'img/gifts/220144159.png', category: 'personalizados' },
  { id: '221087790', name: "Alexa echo dot", price: 203.80, image: 'img/gifts/221087790.png', category: 'eletroportateis' },
  { id: '217270947', name: "Aluguel de Carro para a Lua de Mel", price: 1120.47, image: 'img/gifts/217270947.jpg', category: 'lua-de-mel' },
  { id: '217270886', name: "Aparelho de Fondue Preto", price: 215.55, image: 'img/gifts/217270886.jpg', category: 'cozinha' },
  { id: '217270949', name: "Ar Condicionado Split Inverter 12000 BTUs", price: 2811.99, image: 'img/gifts/217270949.jpg', category: 'eletrodomesticos' },
  { id: '217270909', name: "Aspirador de Pó Vertical", price: 278.44, image: 'img/gifts/217270909.jpg', category: 'eletroportateis' },
  { id: '217270929', name: "Batedeira Planetária", price: 498.02, image: 'img/gifts/217270929.jpg', category: 'eletroportateis' },
  { id: '217270914', name: "Churrasqueira Elétrica", price: 488.08, image: 'img/gifts/217270914.jpg', category: 'eletroportateis' },
  { id: '217270924', name: "Conjunto 2 Cadeiras Estofadas cor Areia", price: 268.11, image: 'img/gifts/217270924.jpg', category: 'moveis' },
  { id: '220133466', name: "Cooktop 5 Bocas a Gás Electrolux Mesa de Vidro Efficient Grade de Aço Fosco", price: 1121.41, image: 'img/gifts/220133466.jpg', category: 'eletrodomesticos' },
  { id: '220143227', name: "COTA: Acabamento de luxo - Ajude a transformar nosso projeto em obra de arte", price: 3331.10, image: 'img/gifts/220143227.png', category: 'lua-de-mel' },
  { id: '220143103', name: "COTA: o primeiro tijolinho - Toda obra começa com um pequeno investimento", price: 132.38, image: 'img/gifts/220143103.png', category: 'lua-de-mel' },
  { id: '217270888', name: "Decanter Vidro 1,25ml", price: 183.38, image: 'img/gifts/217270888.jpg', category: 'cozinha' },
  { id: '217270921', name: "Decoração", price: 528.53, image: 'img/gifts/217270921.jpg', category: 'decoracao' },
  { id: '220133672', name: "Depurador de Ar 60 cm Luz LED e Filtragem Dupla Inox DE6SS Electrolux", price: 725.85, image: 'img/gifts/220133672.jpg', category: 'eletrodomesticos' },
  { id: '217270905', name: "Espelho Redondo 40 cm com Alça em Couro", price: 332.54, image: 'img/gifts/217270905.jpg', category: 'decoracao' },
  { id: '217270881', name: "Ferro de Passar 2 em 1 Sem Fio Oster", price: 143.26, image: 'img/gifts/217270881.png', category: 'eletroportateis' },
  { id: '217270938', name: "Forno a Gás de Embutir Electrolux Efficient com 80 Litros", price: 3582.73, image: 'img/gifts/217270938.png', category: 'eletrodomesticos' },
  { id: '217270911', name: "Forno Elétrico 46 litros", price: 524.35, image: 'img/gifts/217270911.jpg', category: 'eletrodomesticos' },
  { id: '217270884', name: "Frigideira Antiaderente", price: 269.63, image: 'img/gifts/217270884.png', category: 'cozinha' },
  { id: '217270907', name: "Fritadeira Air Fryer", price: 626.29, image: 'img/gifts/217270907.png', category: 'eletroportateis' },
  { id: '220143832', name: "Fundo para boletos surpresa", price: 1133.50, image: 'img/gifts/220143832.png', category: 'lua-de-mel' },
  { id: '220143943', name: "Fundo para os engenheiros tirarem férias", price: 3331.10, image: 'img/gifts/220143943.png', category: 'lua-de-mel' },
  { id: '220143938', name: "Fundos para não surtar com a reforma", price: 2232.30, image: 'img/gifts/220143938.png', category: 'lua-de-mel' },
  { id: '217270878', name: "Geladeira Electrolux Inverse Inverter 488 L. Cor: Inox", price: 4538.68, image: 'img/gifts/217270878.jpg', category: 'cozinha' },
  { id: '217270919', name: "Home Theater Wireless", price: 964.86, image: 'img/gifts/217270919.jpg', category: 'eletroportateis' },
  { id: '217270918', name: "Jogo de Facas com Suporte em Madeira - 7 peças", price: 553.89, image: 'img/gifts/217270918.jpg', category: 'cozinha' },
  { id: '217270879', name: "Jogo de Facas tramontina", price: 308.19, image: 'img/gifts/217270879.jpg', category: 'cozinha' },
  { id: '217270936', name: "Jogo de Panelas Preto - 5 Peças", price: 1043.83, image: 'img/gifts/217270936.jpg', category: 'cozinha' },
  { id: '217270892', name: "Jogo de Taças de Cristal - 6 Peças", price: 273.53, image: 'img/gifts/217270892.jpg', category: 'cozinha' },
  { id: '217270900', name: "Jogo de Taças para Sobremesa - 8 peças", price: 295.39, image: 'img/gifts/217270900.jpg', category: 'cozinha' },
  { id: '217270901', name: "Jogo de Xícaras para Café com Pires - 12 peças", price: 296.83, image: 'img/gifts/217270901.jpg', category: 'cozinha' },
  { id: '217270927', name: "Jogo Edredom Casal Cinza - 3 Peças", price: 692.83, image: 'img/gifts/217270927.jpg', category: 'cama-mesa-banho' },
  { id: '217270887', name: "Jogo Toalha de Banho Azul - 4 Peças", price: 289.38, image: 'img/gifts/217270887.jpg', category: 'cama-mesa-banho' },
  { id: '220134998', name: "Kit ferramentas", price: 429.83, image: 'img/gifts/220134998.jpg', category: 'personalizados' },
  { id: '220145626', name: "Kit sobrevivência para os dias de TPM", price: 187.32, image: 'img/gifts/220145626.jpg', category: 'personalizados' },
  { id: '221086403', name: "Liquidificador Ninja Kitchen 3 em 1 Processador e Triturador", price: 2111.43, image: 'img/gifts/221086403.png', category: 'eletroportateis' },
  { id: '217270880', name: "Lixeira Inox 3 litros", price: 99.41, image: 'img/gifts/217270880.png', category: 'cozinha' },
  { id: '217270916', name: "Máquina de Café Expresso", price: 510.02, image: 'img/gifts/217270916.jpg', category: 'eletroportateis' },
  { id: '221087506', name: "Máquina de lavar e secar", price: 3880.50, image: 'img/gifts/221087506.png', category: 'eletrodomesticos' },
  { id: '220133684', name: "Máquina de Lavar Frontal Electrolux 12kg Cinza Ônix Inverter com Água Quente", price: 3549.76, image: 'img/gifts/220133684.jpg', category: 'eletrodomesticos' },
  { id: '217270939', name: "Mesa de Jantar Redonda", price: 1231.03, image: 'img/gifts/217270939.jpg', category: 'moveis' },
  { id: '220133455', name: "Micro-ondas Electrolux 23L cor Inox Efficient", price: 747.82, image: 'img/gifts/220133455.jpg', category: 'eletrodomesticos' },
  { id: '217270908', name: "Mixer 3 em 1 Vermelho", price: 269.66, image: 'img/gifts/217270908.jpg', category: 'eletroportateis' },
  { id: '220134759', name: "Multiprocessador Britânia 5 Em 1 Bmp2000 1300w Cor Prateado", price: 530.84, image: 'img/gifts/220134759.jpg', category: 'eletroportateis' },
  { id: '217270885', name: "Panela de Arroz Elétrica Electrolux", price: 297.09, image: 'img/gifts/217270885.png', category: 'eletroportateis' },
  { id: '217270955', name: "Patrocine a lua de mel dos noivos", price: 16857.33, image: 'img/gifts/217270955.png', category: 'lua-de-mel' },
  { id: '217270910', name: "Pipoqueira Elétrica sem Óleo", price: 285.75, image: 'img/gifts/217270910.jpg', category: 'eletroportateis' },
  { id: '220143641', name: "Pix da paz interior da noiva", price: 430.27, image: 'img/gifts/220143641.png', category: 'lua-de-mel' },
  { id: '220144205', name: "Presente sem erro: deixe os noivos escolherem!", price: 584.10, image: 'img/gifts/220144205.png', category: 'personalizados' },
  { id: '220145174', name: "Primeiro churrasco na casa nova", price: 317.78, image: 'img/gifts/220145174.jpg', category: 'personalizados' },
  { id: '217270923', name: "Processador de Alimentos Preto - 800W", price: 490.99, image: 'img/gifts/217270923.jpg', category: 'eletroportateis' },
  { id: '221087258', name: "Roupa de cama - casal", price: 220.17, image: 'img/gifts/221087258.png', category: 'cama-mesa-banho' },
  { id: '217270944', name: "Smart TV LED 40 Polegadas", price: 2009.08, image: 'img/gifts/217270944.jpg', category: 'eletrodomesticos' },
  { id: '220133776', name: "Smart TV LG OLED evo AI 4K C6 55 polegadas 2026", price: 6313.92, image: 'img/gifts/220133776.jpg', category: 'eletrodomesticos' },
  { id: '217270950', name: "Sofá Estofado Grafite 3 lugares", price: 3690.96, image: 'img/gifts/217270950.jpg', category: 'moveis' },
  { id: '220143703', name: "Terapia preventiva da noiva", price: 297.20, image: 'img/gifts/220143703.png', category: 'lua-de-mel' },
  { id: '220145855', name: "Um jantar para celebrar nossas conquistas", price: 242.26, image: 'img/gifts/220145855.jpg', category: 'personalizados' },
  { id: '217270903', name: "Um passeio especial durante a lua de mel", price: 666.50, image: 'img/gifts/217270903.jpg', category: 'lua-de-mel' },
  { id: '220144009', name: "Um pouquinho de cada um constrói o nosso sonho!", price: 110.40, image: 'img/gifts/220144009.png', category: 'lua-de-mel' },
  { id: '220135466', name: "Uma ajudinha para os móveis planejados", price: 3331.10, image: 'img/gifts/220135466.jpg', category: 'lua-de-mel' },
  { id: '217270915', name: "Vale Sessão de Massagem para o Casal", price: 495.39, image: 'img/gifts/217270915.jpg', category: 'lua-de-mel' },
  { id: '220134675', name: "Xiaomi Robot Vacuum H50 Pro", price: 3833.31, image: 'img/gifts/220134675.jpg', category: 'eletroportateis' },
];

export const gifts: Gift[] = giftSeeds.map((gift) => ({
  ...gift,
  isQuota: isQuotaGift(gift.name),
}));
