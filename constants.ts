
import { FilterConfig, SupportedRegion } from './types';

export const DATA_URL = 'https://raw.githubusercontent.com/pholemos/youtube-carousel/refs/heads/main/Affiliate_List.json';

export const REGION_MAPPING: Record<string, SupportedRegion> = {
  'GB': 'UK',
  'US': 'USA',
  'ES': 'Spain',
  'DE': 'Germany',
};

export const FILTER_RULES: Record<SupportedRegion, string[]> = {
  'UK': ['UK', 'aliexpress'],
  'USA': ['USA', 'aliexpress'],
  'Spain': ['Spain', 'aliexpress'],
  'Germany': ['Germany', 'aliexpress'],
  'Global': [], // Empty means show all
};
