/**
 * Centralized local storage keys for release-readiness.
 * Keep keys stable to avoid breaking existing player progress/settings.
 */
export const STORAGE_KEYS = {
  selectedLevelId: 'selectedLevelId',
  levelProgress: 'levelProgress',
  volume: 'volume'
} as const;
