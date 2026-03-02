import { appConfig } from "@config/app.config";
import { getAppMetadata } from "./api";
import type { AppData } from "./types";

let cachedData: AppData | null = null;

/** Fallback app data used when API fails, so the site can still build. */
function getFallbackData(): AppData {
  return {
    id: 0,
    bundleId: "",
    name: "App",
    description: "Unable to load app metadata. Please try again later.",
    genres: [],
    languages: [],
    price: 0,
    releaseNotes: "",
    version: "0.0.0",
    storeUrl: "#",
    developer: { id: 0, name: "Developer", storeUrl: "#" },
    artwork: {},
    screenshots: { iphone: [], ipad: [] },
    userRating: { average: 0, count: 0 },
  };
}

export async function fetchAppData(): Promise<AppData> {
  if (cachedData) return cachedData;

  try {
    cachedData = await getAppMetadata(appConfig.appId);
    return cachedData;
  } catch (error) {
    console.error("Failed to fetch app data:", error);
    cachedData = getFallbackData();
    return cachedData;
  }
}
