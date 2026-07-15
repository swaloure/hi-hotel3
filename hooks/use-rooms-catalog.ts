'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Room } from '@/lib/data/hotels';
import {
  getLocalRooms,
  isRoomsSheetConfigured,
  loadRoomsCatalog,
  type CatalogRoom,
  type City,
} from '@/lib/data/rooms-catalog';

type CatalogState = {
  rooms: CatalogRoom[];
  isLoading: boolean;
  hasError: boolean;
  source: 'sheet' | 'local';
};

export function useRoomsCatalog(city: City, localRooms: Room[]): CatalogState {
  const fallbackRooms = useMemo(() => getLocalRooms(city, localRooms), [city, localRooms]);
  const [remoteRooms, setRemoteRooms] = useState<CatalogRoom[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!isRoomsSheetConfigured) return;

    loadRoomsCatalog()
      .then((rooms) => {
        if (cancelled) return;
        setRemoteRooms(rooms);
        setHasError(false);
      })
      .catch((error) => {
        console.error('Unable to load rooms catalog from Google Sheets.', error);
        if (cancelled) return;
        setRemoteRooms([]);
        setHasError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!isRoomsSheetConfigured) {
    return { rooms: fallbackRooms, isLoading: false, hasError: false, source: 'local' };
  }

  return {
    rooms: hasError
      ? fallbackRooms
      : (remoteRooms ?? []).filter((room) => room.city === city),
    isLoading: remoteRooms === null,
    hasError,
    source: 'sheet',
  };
}
