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

export async function getAppMetadata(appId: string): Promise<AppData> {
  const url = buildUrl(`/apps/${appId}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch app metadata: ${response.status} ${response.statusText}`,
    );
  }
  const json = await response.json();
  return normalizeAppData(json.data ?? json);
}

export function getArtworkUrl(
  appData: AppData,
  size: 60 | 100 | 512 = 512,
): string {
  const key = `r${size}` as keyof typeof appData.artwork;
  const url = appData.artwork[key]?.url ?? appData.artwork.r512?.url ?? "";
  return url.replace(/\/\d+x\d+bb\./, `/${size}x${size}bb.`);
}
