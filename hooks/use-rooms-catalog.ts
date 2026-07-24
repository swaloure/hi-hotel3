'use client';

import { useEffect, useState } from 'react';
import {
  isRoomsSheetConfigured,
  loadRoomsCatalog,
  type CatalogRoom,
  type City,
} from '@/lib/data/rooms-catalog';

type CatalogState = {
  rooms: CatalogRoom[];
  isLoading: boolean;
  hasError: boolean;
};

export function useRoomsCatalog(city: City): CatalogState {
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
    return { rooms: [], isLoading: false, hasError: true };
  }

  return {
    rooms: hasError ? [] : (remoteRooms ?? []).filter((room) => room.city === city),
    isLoading: remoteRooms === null,
    hasError,
  };
}
