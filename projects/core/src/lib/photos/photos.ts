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
