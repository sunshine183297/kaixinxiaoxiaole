import { sys } from 'cc';
import { STORAGE_KEYS } from '../../Utils/StorageKeyConst';

export class LevelSession {
  static getSelectedLevelId(defaultId: number = 1): number {
    const raw = sys.localStorage.getItem(STORAGE_KEYS.selectedLevelId);
    const parsed = raw ? Number(raw) : NaN;
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return defaultId;
    }
    const normalized = Math.floor(parsed);
    if (normalized <= 0) {
      return defaultId;
    }
    return normalized;
  }

  static setSelectedLevelId(levelId: number): void {
    const normalized = Math.max(1, Math.floor(levelId));
    sys.localStorage.setItem(STORAGE_KEYS.selectedLevelId, String(normalized));
  }
}
