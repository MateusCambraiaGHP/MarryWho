export type NavigationItem = {
  id: string;
  label: string;
  fullLabel: string;
};

export const navigationItems: NavigationItem[] = [
  { id: 'inicio', label: 'Início', fullLabel: 'Início' },
  { id: 'o-casal', label: 'O casal', fullLabel: 'O casal' },
  { id: 'cerimonia', label: 'Cerimônia', fullLabel: 'Cerimônia' },
  { id: 'presentes', label: 'Presentes', fullLabel: 'Lista de presentes' },
  { id: 'presenca', label: 'Presença', fullLabel: 'Confirme sua presença' },
  { id: 'recados', label: 'Recados', fullLabel: 'Deixe seu recado' },
];
