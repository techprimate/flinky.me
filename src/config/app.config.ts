import type { FAQItem, Feature } from "@lib/types";

export interface AppConfig {
  apiKey: string;
  appId: string;
  features: Feature[];
  faqs: FAQItem[];
  links: {
    privacy: string;
    terms: string;
    website: string;
    /** Public GitHub repo URL. Shown in footer when set. */
    github: string;
  };
}

export const appConfig: AppConfig = {
  apiKey: "",
  appId: "6748324734",

  features: [],
  faqs: [],
  links: {
    privacy: "",
    terms: "",
    website: "https://techprimate.com",
    github: "https://github.com/techprimate/flinky.me",
  },
};
