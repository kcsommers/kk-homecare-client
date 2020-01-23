export enum JobTypes {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial'
}

export enum Services {
  CLEANING = 'cleaning',
  WALLPAPERING = 'wallpapering',
  LANDSCAPING = 'landscaping',
  PAINTING = 'painting'
}

export interface Service {
  name: Services;
  description: string;
  bullets: string[];
  cardImage: string;
  icon: string;
}

export const services: Service[] = [
  {
    name: Services.CLEANING,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    bullets: [
      'Lorem ipsum dolor sit amet',
      'consectetur adipiscing elit',
      'sed do eiusmod tempor incididunt',
      'ut labore et dolore magna aliqua'
    ],
    cardImage: 'assets/images/deck.jpg',
    icon: 'broom'
  },
  {
    name: Services.PAINTING,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    bullets: [
      'Lorem ipsum dolor sit amet',
      'consectetur adipiscing elit',
      'sed do eiusmod tempor incididunt',
      'ut labore et dolore magna aliqua'
    ],
    cardImage: 'assets/images/deck.jpg',
    icon: 'paint-roller'
  },
  {
    name: Services.WALLPAPERING,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    bullets: [
      'Lorem ipsum dolor sit amet',
      'consectetur adipiscing elit',
      'sed do eiusmod tempor incididunt',
      'ut labore et dolore magna aliqua'
    ],
    cardImage: 'assets/images/deck.jpg',
    icon: 'chess-board'
  },
  {
    name: Services.LANDSCAPING,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    bullets: [
      'Lorem ipsum dolor sit amet',
      'consectetur adipiscing elit',
      'sed do eiusmod tempor incididunt',
      'ut labore et dolore magna aliqua'
    ],
    cardImage: 'assets/images/deck.jpg',
    icon: 'tree'
  }
];

export enum Pages {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  CONTACT = 'contact'
}
