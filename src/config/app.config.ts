import type { FAQItem, Feature } from '@lib/types';

export interface AppConfig {
  apiKey: string;
  appId: string;
  features: Feature[];
  faqs: FAQItem[];
  links: {
    privacy: string;
    terms: string;
    website: string;
  };
}

export const appConfig: AppConfig = {
  apiKey: '',
  appId: '6748324734',

  features: [],
  faqs: [],
  links: {
    privacy: '',
    terms: '',
    website: '',
  },
};
