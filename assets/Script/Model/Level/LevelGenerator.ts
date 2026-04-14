import type { LevelConfigData, LevelMode, LevelObstacle, LevelCollectTarget, LevelGrid } from './LevelConfig';
import { CELL_TYPE, CELL_BASENUM } from '../ConstValue';

/**
 * 棋盘形状模板，每个模板定义一个 9x9 的 mask。
 * '1' = 可用格子, '0' = 不可用格子。
 */
interface BoardTemplate {
  name: string;
  mask: string[];
}

const BOARD_TEMPLATES: BoardTemplate[] = [
  {
    name: '完整方形',
    mask: [
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111'
    ]
  },
  {
    name: '圆角方形',
    mask: [
      '011111110',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '011111110'
    ]
  },
  {
    name: '菱形',
    mask: [
      '000010000',
      '000111000',
      '001111100',
      '011111110',
      '111111111',
      '011111110',
      '001111100',
      '000111000',
      '000010000'
    ]
  },
  {
    name: '猫脸',
    mask: [
      '110000011',
      '111000111',
      '111101111',
      '111111111',
      '111111111',
      '111111111',
      '011111110',
      '001111100',
      '000111000'
    ]
  },
  {
    name: '鱼骨',
    mask: [
      '010000010',
      '111010111',
      '010111010',
      '000111000',
      '111111111',
      '000111000',
      '010111010',
      '111010111',
      '010000010'
    ]
  },
  {
    name: '爪印',
    mask: [
      '010010010',
      '111011101',
      '010010010',
      '000000000',
      '001111100',
      '011111110',
      '011111110',
      '001111100',
      '000111000'
    ]
  },
  {
    name: '十字',
    mask: [
      '000111000',
      '000111000',
      '000111000',
      '111111111',
      '111111111',
      '111111111',
      '000111000',
      '000111000',
      '000111000'
    ]
  },
  {
    name: 'H形',
    mask: [
      '111000111',
      '111000111',
      '111000111',
      '111111111',
      '111111111',
      '111111111',
      '111000111',
      '111000111',
      '111000111'
    ]
  },
  {
    name: '大圆',
    mask: [
      '001111100',
      '011111110',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '011111110',
      '001111100'
    ]
  },
  {
    name: '双翼',
    mask: [
      '111000111',
      '111000111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '011111110',
      '001111100'
    ]
  },
  {
    name: '蝴蝶结',
    mask: [
      '110000011',
      '111000111',
      '011101110',
      '001111100',
      '000111000',
      '001111100',
      '011101110',
      '111000111',
      '110000011'
    ]
  },
  {
    name: '框形',
    mask: [
      '111111111',
      '100000001',
      '101111101',
      '101000101',
      '101010101',
      '101000101',
      '101111101',
      '100000001',
      '111111111'
    ]
  }
];

/**
 * 关卡名称主题池：每个难度段有一组猫咪主题名称。
 * 程序化关卡按序循环使用。
 */
const LEVEL_NAME_POOLS: string[][] = [
  // 难度段 1: 21-40 (入门+)
  [
    '猫咪阁楼', '暖阳窗台', '沙发王国', '猫薄荷园', '鱼罐头工厂',
    '毛线球山', '纸袋探险', '猫粮仓库', '猫咪书房', '月光花园',
    '猫咪浴室', '蝴蝶追逐', '猫咪厨房', '午后猫梦', '猫咪露台',
    '猫爪按摩', '鱼市场大冒险', '猫咪运动会', '雪夜猫窝', '阳光猫塔'
  ],
  // 难度段 2: 41-70 (进阶+)
  [
    '屋顶星空', '猫咪迷宫', '鱼骨项链', '猫咪图书馆', '暗夜猫影',
    '铃铛之路', '猫咪剧场', '树上猫居', '猫咪博物馆', '红线迷局',
    '猫咪列车', '深海猫鱼', '猫咪公园', '月下猫会', '猫咪侦探社',
    '秘密猫洞', '猫咪画廊', '风车猫舍', '猫咪音乐会', '猫咪灯塔',
    '樱花猫道', '猫咪大桥', '猫咪温泉', '极光猫原', '猫咪星球',
    '猫咪小镇', '深夜鱼摊', '猫咪糕点屋', '猫咪魔法阵', '猫咪银河'
  ],
  // 难度段 3: 71+ (高手/专家)
  [
    '猫王决斗场', '黑猫城堡', '猫咪天空之城', '九命传说', '彩虹猫梦',
    '猫咪地下城', '暴风猫塔', '猫咪炼金术', '时间猫沙漏', '猫咪异世界',
    '冰雪猫宫', '猫咪龙宫', '猫咪试炼塔', '暗影猫之森', '猫咪终末之旅',
    '喵星最终战', '猫咪永恒回廊', '猫咪神殿深处', '金色猫王之座', '猫咪无限回廊'
  ]
];

/**
 * 基于确定性哈希的伪随机生成器。
 * 同一个 levelId 总是产出相同的关卡配置（可复现）。
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pick<T>(arr: T[]): T {
    return arr[this.nextInt(0, arr.length - 1)];
  }

  shuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

/**
 * 关卡程序化生成器。
 * 
 * 设计原则：
 * - 同一 levelId 永远生成同一关卡（确定性随机）
 * - 难度随关卡 ID 平滑递增
 * - 棋盘形状丰富多变
 * - 障碍物和收集目标逐步引入
 * - 步数/时间模式交替出现
 */
export class LevelGenerator {

  /**
   * 根据 levelId 生成一个关卡配置。
   * levelId 从 21 开始调用（1-20 为手工关卡）。
   */
  static generate(levelId: number): LevelConfigData {
    const rng = new SeededRandom(levelId * 7919 + 104729);

    const difficulty = this.calcDifficulty(levelId);
    const mode = this.pickMode(levelId, rng);
    const template = this.pickTemplate(levelId, rng);
    const name = this.pickName(levelId);
    const grid: LevelGrid = { rows: 9, cols: 9 };
    const cellCount = this.countCells(template.mask);

    const steps = mode === 'steps' ? this.calcSteps(difficulty, cellCount, rng) : undefined;
    const time = mode === 'time' ? this.calcTime(difficulty, cellCount, rng) : undefined;
    const target = this.calcTarget(difficulty, cellCount, rng);
    const obstacles = this.generateObstacles(levelId, difficulty, template.mask, rng);
    const collectTargets = this.generateCollectTargets(levelId, difficulty, rng);
    const starsRequired = this.calcStarsRequired(levelId);
    const starFormula = this.buildStarFormula(target, mode);

    return {
      id: levelId,
      name,
      mode,
      steps,
      time,
      target,
      grid,
      mask: template.mask,
      obstacles: obstacles.length > 0 ? obstacles : undefined,
      collectTargets: collectTargets.length > 0 ? collectTargets : undefined,
      unlock: { starsRequired },
      starFormula
    };
  }

  /**
   * 计算难度系数（0-1 之间，平滑递增趋近于 1）。
   */
  private static calcDifficulty(levelId: number): number {
    const adjusted = Math.max(0, levelId - 20);
    return 1 - 1 / (1 + adjusted * 0.02);
  }

  /**
   * 步数/时间模式选择。
   * 大致 70% 步数模式、30% 时间模式，随关卡交替。
   */
  private static pickMode(levelId: number, rng: SeededRandom): LevelMode {
    if (levelId % 5 === 0) return 'time';
    if (rng.next() < 0.25) return 'time';
    return 'steps';
  }

  /**
   * 选择棋盘模板。前 30 关倾向简单形状，后面更多异形。
   */
  private static pickTemplate(levelId: number, rng: SeededRandom): BoardTemplate {
    if (levelId <= 30) {
      const simpleTemplates = BOARD_TEMPLATES.slice(0, 3);
      return rng.pick(simpleTemplates);
    }
    if (levelId <= 50) {
      const midTemplates = BOARD_TEMPLATES.slice(0, 7);
      return rng.pick(midTemplates);
    }
    return rng.pick(BOARD_TEMPLATES);
  }

  /**
   * 生成关卡名称。
   */
  private static pickName(levelId: number): string {
    const adjusted = levelId - 21;
    let poolIndex: number;
    if (adjusted < 20) poolIndex = 0;
    else if (adjusted < 50) poolIndex = 1;
    else poolIndex = 2;

    const pool = LEVEL_NAME_POOLS[poolIndex];
    return pool[adjusted % pool.length];
  }

  /**
   * 计算步数限制。
   * 基础步数随难度降低，但保证最低可玩性。
   */
  private static calcSteps(difficulty: number, cellCount: number, rng: SeededRandom): number {
    const base = Math.round(28 - difficulty * 12);
    const variance = rng.nextInt(-2, 2);
    const cellFactor = cellCount < 60 ? 2 : 0;
    return Math.max(10, base + variance + cellFactor);
  }

  /**
   * 计算时间限制（秒）。
   */
  private static calcTime(difficulty: number, cellCount: number, rng: SeededRandom): number {
    const base = Math.round(120 - difficulty * 40);
    const variance = rng.nextInt(-5, 5);
    const cellFactor = cellCount < 60 ? 10 : 0;
    return Math.max(45, base + variance + cellFactor);
  }

  /**
   * 计算目标分数。
   */
  private static calcTarget(difficulty: number, cellCount: number, rng: SeededRandom): number {
    const base = 400 + Math.round(difficulty * 2500);
    const variance = rng.nextInt(-50, 100);
    return Math.max(300, Math.round((base + variance) / 50) * 50);
  }

  /**
   * 计算解锁所需星数。
   * 前 20 关手工设置（最高 56 星），21 关起按线性增长。
   */
  private static calcStarsRequired(levelId: number): number {
    if (levelId <= 20) return 0;
    return 56 + (levelId - 20) * 3;
  }

  /**
   * 生成障碍物配置。
   * 关卡 30+ 开始出现 ice，40+ 出现 chain，55+ 出现 crate。
   * 障碍物数量随难度增加。
   */
  private static generateObstacles(
    levelId: number,
    difficulty: number,
    mask: string[],
    rng: SeededRandom
  ): LevelObstacle[] {
    const obstacles: LevelObstacle[] = [];

    if (levelId < 30) return obstacles;

    const validPositions = this.getValidPositions(mask);

    if (levelId >= 30) {
      const iceCount = Math.min(
        Math.floor(difficulty * 8) + rng.nextInt(1, 3),
        Math.floor(validPositions.length * 0.15)
      );
      if (iceCount > 0) {
        const shuffled = rng.shuffle(validPositions);
        const icePositions = shuffled.slice(0, iceCount);
        obstacles.push({
          type: 'ice',
          hp: rng.next() > 0.6 ? 2 : 1,
          positions: icePositions
        });
      }
    }

    if (levelId >= 40) {
      const remaining = this.getValidPositions(mask).filter(
        (p) => !obstacles.some((o) => o.positions.some((op) => op[0] === p[0] && op[1] === p[1]))
      );
      const chainCount = Math.min(
        Math.floor(difficulty * 5) + rng.nextInt(0, 2),
        Math.floor(remaining.length * 0.1)
      );
      if (chainCount > 0) {
        const shuffled = rng.shuffle(remaining);
        obstacles.push({
          type: 'chain',
          positions: shuffled.slice(0, chainCount)
        });
      }
    }

    if (levelId >= 55) {
      const allUsed = obstacles.flatMap((o) => o.positions);
      const remaining = this.getValidPositions(mask).filter(
        (p) => !allUsed.some((op) => op[0] === p[0] && op[1] === p[1])
      );
      const crateCount = Math.min(
        Math.floor(difficulty * 4) + rng.nextInt(0, 1),
        Math.floor(remaining.length * 0.08)
      );
      if (crateCount > 0) {
        const shuffled = rng.shuffle(remaining);
        obstacles.push({
          type: 'crate',
          hp: 1,
          positions: shuffled.slice(0, crateCount)
        });
      }
    }

    return obstacles;
  }

  /**
   * 生成收集目标。
   * 关卡 35+ 开始出现收集目标。
   */
  private static generateCollectTargets(
    levelId: number,
    difficulty: number,
    rng: SeededRandom
  ): LevelCollectTarget[] {
    if (levelId < 35) return [];
    if (rng.next() < 0.4) return [];

    const typeCount = rng.nextInt(1, Math.min(2, Math.floor(difficulty * 3) + 1));
    const allTypes = [CELL_TYPE.A, CELL_TYPE.B, CELL_TYPE.C, CELL_TYPE.D, CELL_TYPE.E, CELL_TYPE.F];
    const shuffled = rng.shuffle(allTypes);

    const targets: LevelCollectTarget[] = [];
    for (let i = 0; i < typeCount; i++) {
      const baseCount = 8 + Math.round(difficulty * 20);
      const count = baseCount + rng.nextInt(-3, 5);
      targets.push({
        cellType: shuffled[i],
        count: Math.max(5, count)
      });
    }

    return targets;
  }

  /**
   * 构建星级公式字符串。
   */
  private static buildStarFormula(target: number, mode: LevelMode): string {
    const star3 = Math.round(target * 2.1);
    const star2 = Math.round(target * 1.5);
    const star1 = target;
    return `score >= ${star3} ? 3 : score >= ${star2} ? 2 : score >= ${star1} ? 1 : 0`;
  }

  /**
   * 统计 mask 中可用格子数量。
   */
  private static countCells(mask: string[]): number {
    let count = 0;
    for (const row of mask) {
      for (const ch of row) {
        if (ch === '1') count++;
      }
    }
    return count;
  }

  /**
   * 获取 mask 中所有可用格子的坐标 [x, y]（1-indexed）。
   */
  private static getValidPositions(mask: string[]): number[][] {
    const positions: number[][] = [];
    for (let r = 0; r < mask.length; r++) {
      for (let c = 0; c < mask[r].length; c++) {
        if (mask[r][c] === '1') {
          positions.push([c + 1, r + 1]);
        }
      }
    }
    return positions;
  }
}
