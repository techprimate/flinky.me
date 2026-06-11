import { appConfig } from "@config/app.config";
import { getAppMetadata } from "./api";
import type { AppData } from "./types";

let cachedData: AppData | null = null;

/**
 * Fetches app metadata at build time.
 *
 * There is intentionally no fallback: if the metadata API is unavailable the
 * error propagates and fails the build, so the previous good deployment stays
 * live instead of shipping a placeholder page. `getAppMetadata` already retries
 * to ride out transient API blips before we give up.
 */
export async function fetchAppData(): Promise<AppData> {
  if (cachedData) return cachedData;

  cachedData = await getAppMetadata(appConfig.appId);
  return cachedData;
}
