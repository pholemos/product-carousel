
export interface Product {
  title: string;
  imgLink: string;
  shop: string;
  country: string;
  affiliateLink?: string; // Optional if provided in JSON
}

export type SupportedRegion = 'UK' | 'USA' | 'Spain' | 'Germany' | 'Global';

export interface FilterConfig {
  region: SupportedRegion;
  allowedCountries: string[];
}
