import { parseCsv } from '@/lib/data/csv';
import {
  buildPublicSheetCsvUrl,
  spreadsheetId,
} from '@/lib/data/sheets-config';

export type LegalPageKind = 'privacy' | 'offer';
export type LegalCity = 'almaty' | 'astana';

type SheetsValuesResponse = {
  values?: Array<Array<string | number | boolean>>;
};

export const legalSheetNames: Record<LegalCity, Record<LegalPageKind, string>> = {
  almaty: {
    privacy: 'Политика Алматы',
    offer: 'Оферта Алматы',
  },
  astana: {
    privacy: 'Политика Астана',
    offer: 'Оферта Астана',
  },
};

const requests = new Map<string, Promise<string>>();

export const isLegalSheetConfigured = Boolean(spreadsheetId);

export function loadLegalContent(city: LegalCity, kind: LegalPageKind): Promise<string> {
  if (!isLegalSheetConfigured) return Promise.resolve('');

  const documentKey = `${city}-${kind}`;
  const existingRequest = requests.get(documentKey);
  if (existingRequest) return existingRequest;

  const request = fetch(buildPublicSheetCsvUrl(legalSheetNames[city][kind]), { cache: 'no-store' })
    .then(async (response) => {
      if (!response.ok) throw new Error(`Google Sheets request failed for ${documentKey}: ${response.status}`);

      return parseLegalCell(parseCsv(await response.text()));
    })
    .catch((error) => {
      requests.delete(documentKey);
      throw error;
    });

  requests.set(documentKey, request);
  return request;
}

export function parseLegalCell(values: SheetsValuesResponse['values']): string {
  return String(values?.[0]?.[0] ?? '').trim();
}
