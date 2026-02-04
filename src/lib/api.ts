import { appConfig } from '@config/app.config';
import type { AppData } from './types';

const BASE_URL = 'https://api.appmetadata.com/api/v1/apple';

function getApiKey(): string {
  return appConfig.apiKey || import.meta.env.APP_METADATA_API_KEY || '';
}

function buildUrl(path: string): string {
  const url = new URL(`${BASE_URL}${path}`);
  const apiKey = getApiKey();
  if (apiKey) {
    url.searchParams.set('api_key', apiKey);
  }
  return url.toString();
}

export async function getAppMetadata(appId: string): Promise<AppData> {
  const url = buildUrl(`/apps/${appId}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch app metadata: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return json.data as AppData;
}

export function getArtworkUrl(appData: AppData, size: 60 | 100 | 512 = 512): string {
  const key = `r${size}` as keyof typeof appData.artwork;
  const url = appData.artwork[key]?.url ?? appData.artwork.r512?.url ?? '';
  return url.replace(/\/\d+x\d+bb\./, `/${size}x${size}bb.`);
}
