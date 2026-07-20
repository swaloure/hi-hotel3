'use client';

import { useEffect, useState } from 'react';
import {
  isLegalSheetConfigured,
  loadLegalContent,
  type LegalCity,
  type LegalPageKind,
} from '@/lib/data/legal-content';

type LegalContentState = {
  content: string;
  isLoading: boolean;
  hasError: boolean;
};

export function useLegalContent(city: LegalCity, kind: LegalPageKind): LegalContentState {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(isLegalSheetConfigured);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!isLegalSheetConfigured) return;

    loadLegalContent(city, kind)
      .then((value) => {
        if (cancelled) return;
        setContent(value);
        setHasError(false);
      })
      .catch((error) => {
        console.error(`Unable to load ${city} ${kind} content from Google Sheets.`, error);
        if (cancelled) return;
        setContent('');
        setHasError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [city, kind]);

  return { content, isLoading, hasError };
}
