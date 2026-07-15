import type { Room } from '@/lib/data/hotels';
import type { SiteLanguage } from '@/lib/i18n/language';

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

const spreadsheetId = process.env.NEXT_PUBLIC_ROOMS_SPREADSHEET_ID?.trim() ?? '';
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY?.trim() ?? '';
const sheetRange = process.env.NEXT_PUBLIC_ROOMS_SHEET_RANGE?.trim() || 'rooms!A1:AJ';

let catalogRequest: Promise<CatalogRoom[]> | null = null;

export const isRoomsSheetConfigured = Boolean(spreadsheetId && apiKey);

export function getLocalRooms(city: City, rooms: Room[]): CatalogRoom[] {
  return rooms.map((room, index) => ({
    id: room.id,
    city,
    name: room.name,
    description: room.description,
    bedType: room.bedType,
    amenities: {
      ru: room.amenities,
      kz: room.amenities,
      en: room.amenities,
    },
    badge: { ru: '', kz: '', en: '' },
    area: room.area,
    maxGuests: room.maxGuests,
    price: room.price,
    currency: '₸',
    images: room.images,
    sortOrder: index + 1,
  }));
}

export async function loadRoomsCatalog(): Promise<CatalogRoom[]> {
  if (!isRoomsSheetConfigured) return [];

  if (!catalogRequest) {
    catalogRequest = fetch(buildSheetsUrl(), { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Google Sheets request failed: ${response.status}`);
        return response.json() as Promise<SheetsValuesResponse>;
      })
      .then((payload) => parseSheetValues(payload.values ?? []))
      .catch((error) => {
        catalogRequest = null;
        throw error;
      });
  }

  return catalogRequest;
}

function buildSheetsUrl() {
  const range = encodeURIComponent(sheetRange);
  const params = new URLSearchParams({
    key: apiKey,
    majorDimension: 'ROWS',
    valueRenderOption: 'UNFORMATTED_VALUE',
  });

  return `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${range}?${params}`;
}

export function parseSheetValues(values: SheetsValuesResponse['values']): CatalogRoom[] {
  if (!values || values.length < 2) return [];

  const headers = values[0].map((value) => normalizeHeader(String(value ?? '')));
  const rows = values.slice(1);

  return rows
    .map((row, index) => parseRoomRow(headers, row, index))
    .filter((room): room is CatalogRoom => room !== null)
    .sort((left, right) => left.sortOrder - right.sortOrder || left.name.ru.localeCompare(right.name.ru, 'ru'));
}

function parseRoomRow(
  headers: string[],
  row: Array<string | number | boolean>,
  index: number,
): CatalogRoom | null {
  const cells = new Map(headers.map((header, cellIndex) => [header, String(row[cellIndex] ?? '').trim()]));
  const get = (...keys: string[]) => keys.map((key) => cells.get(normalizeHeader(key)) ?? '').find(Boolean) ?? '';

  const city = normalizeCity(get('city', 'город'));
  const nameRu = get('name_ru', 'name', 'название');
  const active = get('active', 'активен');

  if (!city || !nameRu || !isActive(active)) return null;

  const name = localized(
    nameRu,
    get('name_kz', 'название_kz'),
    get('name_en', 'название_en'),
  );
  const description = localized(
    get('description_ru', 'description', 'описание'),
    get('description_kz', 'описание_kz'),
    get('description_en', 'описание_en'),
  );
  const bedType = localized(
    get('bed_type_ru', 'bed_type', 'кровать'),
    get('bed_type_kz', 'кровать_kz'),
    get('bed_type_en', 'кровать_en'),
  );
  const badge = localized(
    get('badge_ru', 'badge', 'метка'),
    get('badge_kz', 'метка_kz'),
    get('badge_en', 'метка_en'),
  );

  const amenitiesRu = splitList(get('amenities_ru', 'amenities', 'удобства'));
  const amenitiesKz = splitList(get('amenities_kz', 'удобства_kz'));
  const amenitiesEn = splitList(get('amenities_en', 'удобства_en'));
  const images = Array.from({ length: 10 }, (_, photoIndex) => get(`photo${photoIndex + 1}`, `фото${photoIndex + 1}`))
    .filter(isPublicImageUrl);

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
    area: parseNumber(get('area_m2', 'area', 'площадь', 'квадраты')),
    maxGuests: Math.max(1, Math.round(parseNumber(get('max_guests', 'guests', 'гости')) || 1)),
    price: Math.max(0, parseNumber(get('price', 'цена'))),
    currency: get('currency', 'валюта') || '₸',
    images,
    sortOrder: parseNumber(get('sort_order', 'порядок')) || index + 1,
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
  return value.trim().toLowerCase().replace(/[\s-]+/g, '_');
}

function normalizeCity(value: string): City | null {
  const normalized = value.trim().toLowerCase();
  if (['almaty', 'алматы'].includes(normalized)) return 'almaty';
  if (['astana', 'астана'].includes(normalized)) return 'astana';
  return null;
}

function isActive(value: string) {
  if (!value) return true;
  return !['0', 'false', 'no', 'нет', 'off', 'inactive'].includes(value.trim().toLowerCase());
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

function isPublicImageUrl(value: string) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, '-')
    .replace(/^-|-$/g, '') || 'room';
}
