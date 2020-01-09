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
}
