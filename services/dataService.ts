
import { Product, SupportedRegion } from '../types';
import { DATA_URL, REGION_MAPPING, FILTER_RULES } from '../constants';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch product list');
  }
  return response.json();
}

export function getUserRegion(): SupportedRegion {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const countryCode = locale.split('-')[1]?.toUpperCase() || 'US';
    return REGION_MAPPING[countryCode] || 'Global';
  } catch (error) {
    console.error('Error detecting locale:', error);
    return 'Global';
  }
}

export function filterProducts(products: Product[], region: SupportedRegion): Product[] {
  const allowedTags = FILTER_RULES[region];
  
  if (region === 'Global' || allowedTags.length === 0) {
    return products;
  }

  return products.filter(product => {
    const countryMatch = allowedTags.includes(product.country);
    const shopMatch = product.shop.toLowerCase().includes('aliexpress');
    
    // We want specifically the requested country (e.g. Amazon UK) or any Aliexpress
    return countryMatch || shopMatch;
  });
}
