export const spreadsheetId = process.env.NEXT_PUBLIC_ROOMS_SPREADSHEET_ID?.trim()
  || '1dm-cViDrqYlg7Sv0nKGmwEh_8DaFKDgAR5tFyPlkGSE';

export const googleSheetsApiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY?.trim() ?? '';

export const sheetGids = {
  almaty: process.env.NEXT_PUBLIC_ALMATY_ROOMS_SHEET_GID?.trim() || '0',
  astana: process.env.NEXT_PUBLIC_ASTANA_ROOMS_SHEET_GID?.trim() || '749187074',
  privacy: process.env.NEXT_PUBLIC_PRIVACY_SHEET_GID?.trim() || '1472099427',
  offer: process.env.NEXT_PUBLIC_OFFER_SHEET_GID?.trim() || '1934971466',
} as const;

export function buildPublicCsvUrl(gid: string) {
  const params = new URLSearchParams({ format: 'csv', gid });
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/export?${params}`;
}
