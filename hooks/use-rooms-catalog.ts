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
    let retryTimer: number | undefined;

    if (!isRoomsSheetConfigured) return;

    const loadCatalog = () => {
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
          retryTimer = window.setTimeout(loadCatalog, 30_000);
        });
    };

    loadCatalog();

    return () => {
      cancelled = true;
      if (retryTimer) window.clearTimeout(retryTimer);
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
