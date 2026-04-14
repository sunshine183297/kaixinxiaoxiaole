export const APP_DISPLAY_NAME = 'Lucky Pop';
export const APP_THEME_TAGLINE = 'Cat Draft Prototype';
export const APP_BRAND_TITLE = `${APP_DISPLAY_NAME} · Meow`;

export const UI_TEXT = {
  login: {
    heroTitle: APP_BRAND_TITLE,
    heroSubtitle: 'Match, Meow, Celebrate'
  },
  level: {
    pageTitle: 'Kitty Map',
    pageSubtitle: 'Choose Your Next Meow Stage',
    lockedSuffix: 'Locked',
    stepUnit: ' moves',
    timeUnit: 's',
    levelPrefix: 'Lv.'
  },
  hud: {
    score: 'Meow Score',
    steps: 'Moves',
    time: 'Time',
    stageLabel: 'Kitty Run'
  },
  pause: {
    title: 'Meow Paused',
    volume: 'Volume',
    volumeCurrentPrefix: 'Current: ',
    home: 'Back to Kitty Map',
    continue: 'Keep Meowing'
  },
  result: {
    backToLevels: 'Kitty Map',
    nextLevel: 'Next Meow Stage',
    win: 'Meow Complete',
    lose: 'Meow Failed',
    titlePrefix: APP_BRAND_TITLE
  }
} as const;
