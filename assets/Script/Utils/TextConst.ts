export const APP_DISPLAY_NAME = 'Lucky Pop';
export const APP_THEME_TAGLINE = 'Orchard Prototype';
export const APP_BRAND_TITLE = `${APP_DISPLAY_NAME} · Orchard`;

export const UI_TEXT = {
  login: {
    heroTitle: APP_BRAND_TITLE,
    heroSubtitle: 'Match, Harvest, Celebrate'
  },
  level: {
    pageTitle: 'Orchard Map',
    pageSubtitle: 'Choose Your Next Harvest',
    lockedSuffix: 'Locked',
    stepUnit: ' moves',
    timeUnit: 's',
    levelPrefix: 'Lv.'
  },
  hud: {
    score: 'Harvest Score',
    steps: 'Moves',
    time: 'Time',
    stageLabel: 'Orchard Run'
  },
  pause: {
    title: 'Orchard Paused',
    volume: 'Volume',
    volumeCurrentPrefix: 'Current: ',
    home: 'Back to Orchard',
    continue: 'Keep Harvesting'
  },
  result: {
    backToLevels: 'Orchard Map',
    nextLevel: 'Next Orchard',
    win: 'Harvest Complete',
    lose: 'Harvest Failed',
    titlePrefix: APP_BRAND_TITLE
  }
} as const;
