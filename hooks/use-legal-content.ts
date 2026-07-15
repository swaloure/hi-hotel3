'use client';

import { useEffect, useState } from 'react';
import {
  isLegalSheetConfigured,
  loadLegalContent,
  type LegalPageKind,
} from '@/lib/data/legal-content';

type LegalContentState = {
  content: string;
  isLoading: boolean;
  hasError: boolean;
};

export function useLegalContent(kind: LegalPageKind): LegalContentState {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(isLegalSheetConfigured);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!isLegalSheetConfigured) return;

    loadLegalContent(kind)
      .then((value) => {
        if (cancelled) return;
        setContent(value);
        setHasError(false);
      })
      .catch((error) => {
        console.error(`Unable to load ${kind} content from Google Sheets.`, error);
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
  }, [kind]);

  return { content, isLoading, hasError };
}
