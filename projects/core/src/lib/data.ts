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
  cardText: string[];
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
    cardImage: 'assets/images/work/deck.jpg',
    cardText: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
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
    cardImage: 'assets/images/work/deck.jpg',
    cardText: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
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
    cardImage: 'assets/images/work/deck.jpg',
    cardText: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
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
    cardImage: 'assets/images/work/deck.jpg',
    cardText: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
    icon: 'tree'
  }
];

export enum Pages {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  CONTACT = 'contact'
}

export interface Testimonial {
  name: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Kacy Sommers',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    name: 'Savanna McCarthy',
    content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'Joni Blue',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'Emmylou Bee',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
];

export enum Filters {
  CLEANING = 'cleaning',
  PAINTING = 'painting',
  LANDSCAPING = 'landscaping',
  COMMERCIAL = 'commercial',
  RESIDENTIAL = 'residential'
}

export interface ImageModel {
  _id: string,
  url: string;
  tag?: Filters;
}

export interface BeforeAfterModel {
  _id: string;
  beforeUrl: string;
  afterUrl: string;
}

export interface PhotosResponse {
  error: Error;
  images: ImageModel[];
  total: number;
}

export interface BeforeAfterResponse {
  error: Error;
  images: BeforeAfterModel[];
}

export enum ModalTemplates {
  QUOTE = 'quote'
}


export interface ContactFormResponse {
  success: boolean;
  error: Error;
}
