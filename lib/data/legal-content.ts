import { parseCsv } from '@/lib/data/csv';
import {
  buildPublicCsvUrl,
  googleSheetsApiKey,
  sheetGids,
  spreadsheetId,
} from '@/lib/data/sheets-config';

export type LegalPageKind = 'privacy' | 'offer';

type SheetsValuesResponse = {
  values?: Array<Array<string | number | boolean>>;
};

const ranges: Record<LegalPageKind, string> = {
  privacy: process.env.NEXT_PUBLIC_PRIVACY_SHEET_RANGE?.trim() || "'Политика конфиденциальности'!A1",
  offer: process.env.NEXT_PUBLIC_OFFER_SHEET_RANGE?.trim() || "'Публичная оферта'!A1",
};

const requests = new Map<LegalPageKind, Promise<string>>();

export const isLegalSheetConfigured = Boolean(spreadsheetId && sheetGids.privacy && sheetGids.offer);

export function loadLegalContent(kind: LegalPageKind): Promise<string> {
  if (!isLegalSheetConfigured) return Promise.resolve('');

  const existingRequest = requests.get(kind);
  if (existingRequest) return existingRequest;

  const request = fetch(
    googleSheetsApiKey ? buildSheetsApiUrl(ranges[kind]) : buildPublicCsvUrl(sheetGids[kind]),
    { cache: 'no-store' },
  )
    .then(async (response) => {
      if (!response.ok) throw new Error(`Google Sheets request failed for ${kind}: ${response.status}`);

      if (googleSheetsApiKey) {
        const payload = await response.json() as SheetsValuesResponse;
        return parseLegalCell(payload.values);
      }

      return parseLegalCell(parseCsv(await response.text()));
    })
    .catch((error) => {
      requests.delete(kind);
      throw error;
    });

  requests.set(kind, request);
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
