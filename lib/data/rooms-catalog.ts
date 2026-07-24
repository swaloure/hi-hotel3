import type { SiteLanguage } from '@/lib/i18n/language';
import { parseCsv } from '@/lib/data/csv';
import {
  buildPublicSheetCsvUrl,
  googleSheetsApiKey,
  spreadsheetId,
} from '@/lib/data/sheets-config';

export type City = 'almaty' | 'astana';

type LocalizedText = Record<SiteLanguage, string>;
type LocalizedList = Record<SiteLanguage, string[]>;

export interface CatalogRoom {
  id: string;
  city: City;
  name: LocalizedText;
  description: LocalizedText;
  bedType: LocalizedText;
  amenities: LocalizedList;
  badge: LocalizedText;
  area: number;
  maxGuests: number;
  price: number;
  currency: string;
  images: string[];
  sortOrder: number;
}

type SheetsValuesResponse = {
  values?: Array<Array<string | number | boolean>>;
};

const almatySheetRange = process.env.NEXT_PUBLIC_ALMATY_ROOMS_SHEET_RANGE?.trim() || "'Алматы'!A1:AC";
const astanaSheetRange = process.env.NEXT_PUBLIC_ASTANA_ROOMS_SHEET_RANGE?.trim() || "'Астана'!A1:AC";

let catalogRequest: Promise<CatalogRoom[]> | null = null;

export const isRoomsSheetConfigured = Boolean(spreadsheetId);

export async function loadRoomsCatalog(): Promise<CatalogRoom[]> {
  if (!isRoomsSheetConfigured) return [];

  if (!catalogRequest) {
    catalogRequest = Promise.all([
      fetchSheetRange(almatySheetRange, 'Алматы', 'almaty'),
      fetchSheetRange(astanaSheetRange, 'Астана', 'astana'),
    ])
      .then(([almatyRooms, astanaRooms]) => [...almatyRooms, ...astanaRooms])
      .catch((error) => {
        catalogRequest = null;
        throw error;
      });
  }

  return catalogRequest;
}

async function fetchSheetRange(rangeName: string, sheetName: string, city: City) {
  const response = await fetch(
    googleSheetsApiKey ? buildSheetsApiUrl(rangeName) : buildPublicSheetCsvUrl(sheetName, 'A1:AC'),
    { cache: 'no-store' },
  );
  if (!response.ok) throw new Error(`Google Sheets request failed for ${city}: ${response.status}`);

  if (googleSheetsApiKey) {
    const payload = await response.json() as SheetsValuesResponse;
    return parseSheetValues(payload.values ?? [], city);
  }

  return parseSheetValues(parseCsv(await response.text()), city);
}

function buildSheetsApiUrl(rangeName: string) {
  const range = encodeURIComponent(rangeName);
  const params = new URLSearchParams({
    key: googleSheetsApiKey,
    majorDimension: 'ROWS',
    valueRenderOption: 'UNFORMATTED_VALUE',
  });

  return `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${range}?${params}`;
}

export function parseSheetValues(values: SheetsValuesResponse['values'], defaultCity?: City): CatalogRoom[] {
  if (!values || values.length < 2) return [];

  const headers = values[0].map((value) => normalizeHeader(String(value ?? '')));
  const rows = values.slice(1);

  return rows
    .map((row, index) => parseRoomRow(headers, row, index, defaultCity))
    .filter((room): room is CatalogRoom => room !== null)
    .sort((left, right) => left.sortOrder - right.sortOrder || left.name.ru.localeCompare(right.name.ru, 'ru'));
}

function parseRoomRow(
  headers: string[],
  row: Array<string | number | boolean>,
  index: number,
  defaultCity?: City,
): CatalogRoom | null {
  const cells = new Map(headers.map((header, cellIndex) => [header, String(row[cellIndex] ?? '').trim()]));
  const get = (...keys: string[]) => keys.map((key) => cells.get(normalizeHeader(key)) ?? '').find(Boolean) ?? '';

  const city = defaultCity ?? normalizeCity(get('city', 'город'));
  const nameRu = get(
    'name_ru',
    'name',
    'название',
    'название_номера',
    'название номера (русский)',
  );

  if (!city || !nameRu) return null;

  const name = localized(
    nameRu,
    get('name_kz', 'название_kz', 'название номера (казахский)'),
    get('name_en', 'название_en', 'название номера (английский)'),
  );
  const description = localized(
    get('description_ru', 'description', 'описание', 'описание_номера', 'описание номера (русский)'),
    get('description_kz', 'описание_kz', 'описание номера (казахский)'),
    get('description_en', 'описание_en', 'описание номера (английский)'),
  );
  const bedType = localized(
    get('bed_type_ru', 'bed_type', 'кровать', 'тип_кровати', 'тип кровати (русский)'),
    get('bed_type_kz', 'кровать_kz', 'тип кровати (казахский)'),
    get('bed_type_en', 'кровать_en', 'тип кровати (английский)'),
  );
  const badge = localized(
    get('badge_ru', 'badge', 'метка', 'ярлык', 'ярлык (русский)'),
    get('badge_kz', 'метка_kz', 'ярлык (казахский)'),
    get('badge_en', 'метка_en', 'ярлык (английский)'),
  );

  const amenitiesRu = splitList(get(
    'amenities_ru',
    'amenities',
    'удобства',
    'удобства_через_запятую',
    'удобства через запятую (русский)',
  ));
  const amenitiesKz = splitList(get('amenities_kz', 'удобства_kz', 'удобства через запятую (казахский)'));
  const amenitiesEn = splitList(get('amenities_en', 'удобства_en', 'удобства через запятую (английский)'));
  const images = Array.from(
    { length: 10 },
    (_, photoIndex) => get(`photo${photoIndex + 1}`, `фото${photoIndex + 1}`, `фото_${photoIndex + 1}`),
  )
    .map(normalizeImageUrl)
    .filter(Boolean);

  return {
    id: get('id') || `${city}-${slugify(nameRu)}-${index + 1}`,
    city,
    name,
    description,
    bedType,
    badge,
    amenities: {
      ru: amenitiesRu,
      kz: amenitiesKz.length ? amenitiesKz : amenitiesRu,
      en: amenitiesEn.length ? amenitiesEn : amenitiesRu,
    },
    area: parseNumber(get('area_m2', 'area', 'площадь', 'квадраты', 'площадь_м²')),
    maxGuests: Math.max(1, Math.round(parseNumber(get('max_guests', 'guests', 'гости', 'количество_гостей')) || 1)),
    price: Math.max(0, parseNumber(get('price', 'цена', 'цена_за_ночь'))),
    currency: get('currency', 'валюта') || '₸',
    images,
    sortOrder: index + 1,
  };
}

function localized(ru: string, kz: string, en: string): LocalizedText {
  return {
    ru,
    kz: kz || ru,
    en: en || ru,
  };
}

function normalizeHeader(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '_')
    .replace(/^_|_$/g, '');
}

function normalizeCity(value: string): City | null {
  const normalized = value.trim().toLowerCase();
  if (['almaty', 'алматы'].includes(normalized)) return 'almaty';
  if (['astana', 'астана'].includes(normalized)) return 'astana';
  return null;
}

function splitList(value: string) {
  return value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseNumber(value: string) {
  const normalized = value.replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, '');
  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

export function normalizeImageUrl(value: string) {
  if (!value) return '';

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';

    const driveFileMatch = url.hostname === 'drive.google.com'
      ? url.pathname.match(/^\/file\/d\/([^/]+)/)
      : null;
    const driveFileId = driveFileMatch?.[1]
      || (url.hostname === 'drive.google.com' ? url.searchParams.get('id') : null);

    if (driveFileId) {
      return `https://lh3.googleusercontent.com/d/${encodeURIComponent(driveFileId)}=w1600`;
    }

    return url.toString();
  } catch {
    return '';
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, '-')
    .replace(/^-|-$/g, '') || 'room';
}
