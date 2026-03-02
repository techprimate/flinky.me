export interface DeveloperInfo {
  id: number;
  name: string;
  storeUrl: string;
}

export interface RatingInfo {
  average: number;
  count: number;
}

export interface Screenshot {
  url: string;
}

export interface ScreenshotSets {
  iphone: Screenshot[];
  ipad: Screenshot[];
}

export interface ArtworkSet {
  r60?: { url: string };
  r100?: { url: string };
  r512?: { url: string };
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AppData {
  id: number;
  bundleId: string;
  name: string;
  description: string;
  genres: string[];
  languages: string[];
  price: number;
  releaseNotes: string;
  version: string;
  storeUrl: string;
  developer: DeveloperInfo;
  artwork: ArtworkSet;
  screenshots: ScreenshotSets;
  userRating: RatingInfo;
  /** Privacy policy URL from App Store API. */
  privacyPolicyUrl?: string;
  /** Terms of service / EULA URL from App Store API. */
  termsOfServiceUrl?: string;
  /** Developer/seller website from App Store API. */
  sellerUrl?: string;
}
