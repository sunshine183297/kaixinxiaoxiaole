export const APP_DISPLAY_NAME = '猫猫消消乐';
export const APP_THEME_TAGLINE = '超萌猫咪三消游戏';
export const APP_BRAND_TITLE = APP_DISPLAY_NAME;

export const UI_TEXT = {
  login: {
    heroTitle: APP_BRAND_TITLE,
    heroSubtitle: '消除猫咪，收集爱心'
  },
  level: {
    pageTitle: '关卡选择',
    pageSubtitle: '选择你的冒险之旅',
    lockedSuffix: '未解锁',
    stepUnit: ' 步',
    timeUnit: '秒',
    levelPrefix: '第'
  },
  hud: {
    score: '分数',
    steps: '步数',
    time: '时间',
    stageLabel: '猫猫冒险'
  },
  pause: {
    title: '游戏暂停',
    volume: '音量',
    volumeCurrentPrefix: '当前：',
    home: '返回关卡',
    continue: '继续游戏'
  },
  result: {
    backToLevels: '返回关卡',
    nextLevel: '下一关',
    win: '过关啦！',
    lose: '再试一次',
    titlePrefix: APP_BRAND_TITLE
  }
} as const;
