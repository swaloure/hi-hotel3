import { parseCsv } from '@/lib/data/csv';
import {
  buildPublicSheetCsvUrl,
  googleSheetsApiKey,
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

const ranges: Record<LegalCity, Record<LegalPageKind, string>> = {
  almaty: {
    privacy: process.env.NEXT_PUBLIC_ALMATY_PRIVACY_SHEET_RANGE?.trim() || "'Политика Алматы'!A1",
    offer: process.env.NEXT_PUBLIC_ALMATY_OFFER_SHEET_RANGE?.trim() || "'Оферта Алматы'!A1",
  },
  astana: {
    privacy: process.env.NEXT_PUBLIC_ASTANA_PRIVACY_SHEET_RANGE?.trim() || "'Политика Астана'!A1",
    offer: process.env.NEXT_PUBLIC_ASTANA_OFFER_SHEET_RANGE?.trim() || "'Оферта Астана'!A1",
  },
};

const requests = new Map<string, Promise<string>>();

export const isLegalSheetConfigured = Boolean(spreadsheetId);

export function loadLegalContent(city: LegalCity, kind: LegalPageKind): Promise<string> {
  if (!isLegalSheetConfigured) return Promise.resolve('');

  const documentKey = `${city}-${kind}`;
  const existingRequest = requests.get(documentKey);
  if (existingRequest) return existingRequest;

  const request = fetch(
    googleSheetsApiKey
      ? buildSheetsApiUrl(ranges[city][kind])
      : buildPublicSheetCsvUrl(legalSheetNames[city][kind]),
    { cache: 'no-store' },
  )
    .then(async (response) => {
      if (!response.ok) throw new Error(`Google Sheets request failed for ${documentKey}: ${response.status}`);

      if (googleSheetsApiKey) {
        const payload = await response.json() as SheetsValuesResponse;
        return parseLegalCell(payload.values);
      }

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

function buildSheetsApiUrl(rangeName: string) {
  const range = encodeURIComponent(rangeName);
  const params = new URLSearchParams({
    key: googleSheetsApiKey,
    majorDimension: 'ROWS',
    valueRenderOption: 'FORMATTED_VALUE',
  });

  return `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${range}?${params}`;
}
