import { LevelCollectTarget, LevelConfigData, LevelMode } from './LevelConfig';

type CollectProgress = LevelCollectTarget & { collected: number };

export class LevelState {
  mode: LevelMode;
  stepsLeft: number;
  timeLeft: number;
  target: number;
  score: number;
  collectTargets: CollectProgress[];

  constructor(config: LevelConfigData) {
    this.mode = config.mode;
    this.stepsLeft = config.steps || 0;
    this.timeLeft = config.time || 0;
    this.target = config.target || 0;
    this.score = 0;
    this.collectTargets = (config.collectTargets || []).map((t) => ({
      cellType: t.cellType,
      count: t.count,
      collected: 0
    }));
  }

  addScore(points: number): void {
    this.score += Math.max(0, points);
  }

  useMove(): void {
    if (this.mode !== 'steps') return;
    if (this.stepsLeft > 0) {
      this.stepsLeft -= 1;
    }
  }

  tick(deltaSeconds: number): void {
    if (this.mode !== 'time') return;
    if (this.timeLeft > 0) {
      this.timeLeft = Math.max(0, this.timeLeft - deltaSeconds);
    }
  }

  /**
   * 判断是否过关。
   * 步数模式：必须步数用完后才结算（让玩家有机会拿更多分冲高星）。
   * 时间模式：达到目标分即刻过关。
   */
  isWin(): boolean {
    if (this.score < this.target) return false;
    if (this.collectTargets.length > 0) {
      if (!this.collectTargets.every((t) => t.collected >= t.count)) return false;
    }
    if (this.mode === 'steps' && this.stepsLeft > 0) return false;
    return true;
  }

  addCollected(cellType: number | undefined, amount: number): void {
    if (!cellType || amount <= 0) return;
    if (this.collectTargets.length === 0) return;
    for (const t of this.collectTargets) {
      if (t.cellType === cellType) {
        t.collected = Math.min(t.count, t.collected + amount);
      }
    }
  }

  getCollectDisplayText(): string {
    if (this.collectTargets.length === 0) return '';
    const catNames: Record<number, string> = {
      1: '橘猫', 2: '蓝猫', 3: '布偶', 4: '暹罗', 5: '三花', 6: '黑猫'
    };
    return this.collectTargets
      .map((t) => `${catNames[t.cellType] || `猫${t.cellType}`} ${t.collected}/${t.count}`)
      .join(' ');
  }

  isLose(): boolean {
    if (this.isWin()) return false;
    if (this.mode === 'steps') {
      return this.stepsLeft <= 0;
    }
    return this.timeLeft <= 0;
  }
}
