export const spreadsheetId = process.env.NEXT_PUBLIC_ROOMS_SPREADSHEET_ID?.trim()
  || '1dm-cViDrqYlg7Sv0nKGmwEh_8DaFKDgAR5tFyPlkGSE';

export const googleSheetsApiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY?.trim() ?? '';

export const sheetGids = {
  almaty: process.env.NEXT_PUBLIC_ALMATY_ROOMS_SHEET_GID?.trim() || '0',
  astana: process.env.NEXT_PUBLIC_ASTANA_ROOMS_SHEET_GID?.trim() || '749187074',
} as const;

export function buildPublicCsvUrl(gid: string) {
  const params = new URLSearchParams({ format: 'csv', gid });
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/export?${params}`;
}

export function buildPublicSheetCsvUrl(sheetName: string, range = 'A1') {
  const params = new URLSearchParams({
    tqx: 'out:csv',
    sheet: sheetName,
    range,
  });
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/gviz/tq?${params}`;
}
