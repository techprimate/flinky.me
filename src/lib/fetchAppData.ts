import { appConfig } from '@config/app.config';
import { getAppMetadata } from './api';
import type { AppData } from './types';

let cachedData: AppData | null = null;

export async function fetchAppData(): Promise<AppData> {
  if (cachedData) return cachedData;

  try {
    cachedData = await getAppMetadata(appConfig.appId);
    return cachedData;
  } catch (error) {
    console.error('Failed to fetch app data:', error);
    throw error;
  }
}
