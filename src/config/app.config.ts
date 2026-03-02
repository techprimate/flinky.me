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

  features: [
    {
      icon: "🔗",
      title: "Instant QR Codes",
      description: "Turn any link into a scannable QR code in seconds.",
    },
    {
      icon: "🔒",
      title: "Private by Design",
      description:
        "All data stays on your device. No accounts or cloud sync required.",
    },
    {
      icon: "📱",
      title: "Native iOS",
      description:
        "Built for iPhone and iPad with a clean, intuitive interface.",
    },
  ],
  faqs: [
    {
      question: "Is it free?",
      answer:
        "Yes, the app is completely free with no ads or in-app purchases.",
    },
    {
      question: "Does it work offline?",
      answer:
        "Yes, you can generate and view QR codes without an internet connection.",
    },
    {
      question: "Is my data shared?",
      answer:
        "No. All data stays on your device. We don't collect or transmit any personal information.",
    },
  ],
  links: {
    privacy: "",
    terms: "",
    website: "https://techprimate.com",
    github: "https://github.com/techprimate/flinky.me",
  },
};
