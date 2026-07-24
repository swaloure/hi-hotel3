export const spreadsheetId = process.env.NEXT_PUBLIC_ROOMS_SPREADSHEET_ID?.trim()
  || '10QNm-K9ZDH3R4bxn5r5uY2tfR5TAEB1B2O-LLyIQc4w';

export function buildPublicSheetCsvUrl(sheetName: string, range = 'A1') {
  const params = new URLSearchParams({
    tqx: 'out:csv',
    sheet: sheetName,
    range,
  });
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/gviz/tq?${params}`;
}
