import { appConfig } from "@config/app.config";
import type { AppData } from "./types";

const BASE_URL = "https://api.appmetadata.com/api/v1/apple";

function getApiKey(): string {
  return appConfig.apiKey || import.meta.env.APP_METADATA_API_KEY || "";
}

function buildUrl(path: string): string {
  const url = new URL(`${BASE_URL}${path}`);
  const apiKey = getApiKey();
  if (apiKey) {
    url.searchParams.set("api_key", apiKey);
  }
  return url.toString();
}

/** Normalize API response to handle different field names from App Store APIs. */
function normalizeAppData(raw: Record<string, unknown>): AppData {
  const data = raw as AppData & Record<string, unknown>;
  return {
    ...data,
    privacyPolicyUrl:
      data.privacyPolicyUrl ??
      data.privacyPolicyURL ??
      (data as Record<string, unknown>).privacy_policy_url ??
      undefined,
    termsOfServiceUrl:
      data.termsOfServiceUrl ??
      data.termsOfServiceURL ??
      (data as Record<string, unknown>).terms_of_service_url ??
      undefined,
    sellerUrl:
      data.sellerUrl ??
      data.sellerURL ??
      (data as Record<string, unknown>).seller_url ??
      undefined,
  } as AppData;
}

const MAX_ATTEMPTS = 4;
const RETRY_BASE_DELAY_MS = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** A non-OK response that should not be retried (e.g. 404 for an unknown app). */
class NonRetryableHttpError extends Error {}

/** Retry on network errors and 5xx/429 responses; other 4xx fail fast. */
function isRetryable(status: number): boolean {
  return status === 429 || status >= 500;
}

export async function getAppMetadata(appId: string): Promise<AppData> {
  const url = buildUrl(`/apps/${appId}`);

  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        return normalizeAppData(json.data ?? json);
      }
      const message = `Failed to fetch app metadata: ${response.status} ${response.statusText}`;
      if (!isRetryable(response.status)) {
        throw new NonRetryableHttpError(message);
      }
      lastError = new Error(message);
    } catch (error) {
      // 4xx responses are a permanent misconfiguration — fail immediately.
      if (error instanceof NonRetryableHttpError) throw error;
      // Network/parse failures are transient; rethrow only on the final attempt.
      lastError = error;
      if (attempt >= MAX_ATTEMPTS) throw error;
    }

    const delay = RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
    console.warn(
      `App metadata fetch attempt ${attempt}/${MAX_ATTEMPTS} failed, retrying in ${delay}ms:`,
      lastError instanceof Error ? lastError.message : lastError,
    );
    await sleep(delay);
  }

  // Unreachable: the loop either returns data or throws on the final attempt.
  throw lastError;
}

export function getArtworkUrl(
  appData: AppData,
  size: 60 | 100 | 512 = 512,
): string {
  const key = `r${size}` as keyof typeof appData.artwork;
  const url = appData.artwork[key]?.url ?? appData.artwork.r512?.url ?? "";
  return url.replace(/\/\d+x\d+bb\./, `/${size}x${size}bb.`);
}
