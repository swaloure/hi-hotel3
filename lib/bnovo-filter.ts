export type BookingCity = 'almaty' | 'astana';

export const BNOVO_UID = 'a8395a9c-768d-4038-ae49-cf4072d9dcb4';

export const BNOVO_ROOM_FILTERS = {
  almaty: {
    onlyrooms: '551521,551494',
    firstroom: '551521',
  },
  astana: {
    onlyrooms: '551530',
    firstroom: '551530',
  },
} as const;

export function enforceBnovoBookingUrl(rawUrl: string, city: BookingCity): string {
  let url: URL;

  try {
    url = new URL(rawUrl, 'https://reservationsteps.ru');
  } catch {
    return rawUrl;
  }

  if (
    url.hostname !== 'reservationsteps.ru'
    || url.pathname !== `/rooms/index/${BNOVO_UID}`
  ) {
    return rawUrl;
  }

  const filter = BNOVO_ROOM_FILTERS[city];
  url.searchParams.set('onlyrooms', filter.onlyrooms);
  url.searchParams.set('firstroom', filter.firstroom);

  return url.toString();
}

export function enforceBnovoSignalFilter(data: unknown, city: BookingCity): boolean {
  if (!data || typeof data !== 'object') return false;

  const signal = data as { event?: unknown; params?: unknown };
  if (signal.event !== 'bnovowidget_signal') return false;

  if (!signal.params || typeof signal.params !== 'object') {
    signal.params = {};
  }

  const params = signal.params as Record<string, unknown>;
  const filter = BNOVO_ROOM_FILTERS[city];
  params.onlyrooms = filter.onlyrooms;
  params.firstroom = filter.firstroom;

  return true;
}
