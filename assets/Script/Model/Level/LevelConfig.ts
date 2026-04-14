import { JsonAsset, resources } from 'cc';
import { LevelGenerator } from './LevelGenerator';

export type LevelMode = 'steps' | 'time';

export interface LevelUnlockRule {
  starsRequired: number;
}

export interface LevelGrid {
  rows: number;
  cols: number;
}

export type LevelObstacleType = 'ice' | 'chain' | 'crate';

export interface LevelObstacle {
  type: LevelObstacleType;
  hp?: number;
  positions: number[][];
}

export interface LevelCollectTarget {
  cellType: number;
  count: number;
}

export interface LevelConfigData {
  id: number;
  name: string;
  mode: LevelMode;
  steps?: number;
  time?: number;
  target: number;
  grid: LevelGrid;
  mask: string[];
  obstacles?: LevelObstacle[];
  collectTargets?: LevelCollectTarget[];
  unlock: LevelUnlockRule;
  starFormula: string;
}

export interface LevelConfigFile {
  version: number;
  levels: LevelConfigData[];
}

export class LevelConfig {
  data: LevelConfigData;
  private maskGrid: boolean[][];

  constructor(data: LevelConfigData) {
    this.data = data;
    this.maskGrid = LevelConfig.buildMask(data.grid.rows, data.grid.cols, data.mask);
  }

  static buildMask(rows: number, cols: number, mask: string[]): boolean[][] {
    const grid: boolean[][] = [];
    for (let r = 0; r < rows; r++) {
      const rowStr = mask[r] || '';
      grid[r + 1] = [];
      for (let c = 0; c < cols; c++) {
        grid[r + 1][c + 1] = rowStr[c] === '1';
      }
    }
    return grid;
  }

  isCellEnabled(x: number, y: number): boolean {
    if (!this.maskGrid[y] || typeof this.maskGrid[y][x] === 'undefined') {
      return false;
    }
    return this.maskGrid[y][x];
  }

  getMaskGrid(): boolean[][] {
    return this.maskGrid;
  }
}

/**
 * 手工关卡的最大 ID。超过此值的关卡由 LevelGenerator 程序化生成。
 */
const HANDCRAFTED_MAX_ID = 20;

/**
 * 关卡选择列表一次渲染的最大条数。
 * LevelSelectController 每次加载一页，滚动到底部再加载下一页。
 */
export const LEVEL_PAGE_SIZE = 20;

export class LevelConfigService {
  private static cache: LevelConfig[] | null = null;
  private static generatedCache: Map<number, LevelConfig> = new Map();

  static async loadAll(): Promise<LevelConfig[]> {
    if (this.cache) return this.cache;

    const data = await new Promise<LevelConfigFile>((resolve, reject) => {
      resources.load('levels', JsonAsset, (err, asset) => {
        if (err || !asset) {
          reject(err);
          return;
        }
        resolve(asset.json as LevelConfigFile);
      });
    });

    this.cache = (data.levels || []).map((level) => new LevelConfig(level));
    return this.cache;
  }

  /**
   * 获取指定 ID 的关卡配置。
   * 1-20 关从 levels.json 手工配置中读取；
   * 21+ 关由 LevelGenerator 程序化生成（结果缓存）。
   */
  static async getById(levelId: number): Promise<LevelConfig | null> {
    if (levelId <= HANDCRAFTED_MAX_ID) {
      const levels = await this.loadAll();
      return levels.find((level) => level.data.id === levelId) || null;
    }

    if (this.generatedCache.has(levelId)) {
      return this.generatedCache.get(levelId)!;
    }

    const data = LevelGenerator.generate(levelId);
    const config = new LevelConfig(data);
    this.generatedCache.set(levelId, config);
    return config;
  }

  /**
   * 加载指定范围的关卡列表（用于分页展示）。
   * 手工关卡从 JSON 加载，程序化关卡按需生成。
   */
  static async getRange(startId: number, count: number): Promise<LevelConfig[]> {
    const result: LevelConfig[] = [];
    for (let i = 0; i < count; i++) {
      const id = startId + i;
      const config = await this.getById(id);
      if (config) {
        result.push(config);
      }
    }
    return result;
  }

  /**
   * 获取手工关卡总数。
   */
  static getHandcraftedMaxId(): number {
    return HANDCRAFTED_MAX_ID;
  }

  /**
   * 判断指定 ID 是否为程序化生成的关卡。
   */
  static isGenerated(levelId: number): boolean {
    return levelId > HANDCRAFTED_MAX_ID;
  }
}
