export type SiteLanguage = 'ru' | 'kz' | 'en';

export type LocalizedCopy = Record<SiteLanguage, string>;

export function resolveLanguage(language: string): SiteLanguage {
  const normalized = language.toLowerCase();

  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('kz') || normalized.startsWith('kk')) return 'kz';

  return 'ru';
}

export function localize(copy: LocalizedCopy, language: SiteLanguage): string {
  return copy[language];
}
