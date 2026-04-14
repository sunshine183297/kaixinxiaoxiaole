import { CELL_TYPE } from '../Model/ConstValue';

export type ThemeName = 'default' | 'fruit-draft' | 'cat-match';

export interface CellThemeBinding {
  cellType: number;
  logicName: string;
  /**
   * GridView.aniPre 中对应的预制体槽位（与 cellType 一致）。
   * 该绑定主要在 Cocos Editor 的 Game.scene 里维护，请勿随意改顺序。
   */
  prefabSlot: number;
  /**
   * 后续换皮时可使用的建议资源 key（用于命名约定，不会被运行时代码直接加载）。
   */
  skinKey: string;
  /**
   * 建议预制体命名（未来创建新主题资源时参考）。
   */
  suggestedPrefabName: string;
  /**
   * 给策划/美术看的可读名称。
   */
  displayName: string;
  /**
   * 占位说明。
   */
  comment: string;
}

export interface ThemeConfig {
  themeName: ThemeName;
  /**
   * CELL_TYPE 到视觉语义的映射。
   * 注意：不改变 CELL_TYPE 编号，只做"说明层"配置。
   */
  cellBindings: CellThemeBinding[];
}

export interface ObstacleThemeBinding {
  obstacleType: 'ice' | 'crate' | 'chain';
  skinKey: string;
  displayName: string;
  suggestedResourceName: string;
  comment: string;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  themeName: 'default',
  cellBindings: [
    {
      cellType: CELL_TYPE.A,
      logicName: 'cell_a',
      prefabSlot: CELL_TYPE.A,
      skinKey: 'animals/bear',
      suggestedPrefabName: 'Bear',
      displayName: 'Bear',
      comment: 'Default animal theme placeholder.'
    },
    {
      cellType: CELL_TYPE.B,
      logicName: 'cell_b',
      prefabSlot: CELL_TYPE.B,
      skinKey: 'animals/cat',
      suggestedPrefabName: 'Cat',
      displayName: 'Cat',
      comment: 'Default animal theme placeholder.'
    },
    {
      cellType: CELL_TYPE.C,
      logicName: 'cell_c',
      prefabSlot: CELL_TYPE.C,
      skinKey: 'animals/fox',
      suggestedPrefabName: 'Fox',
      displayName: 'Fox',
      comment: 'Default animal theme placeholder.'
    },
    {
      cellType: CELL_TYPE.D,
      logicName: 'cell_d',
      prefabSlot: CELL_TYPE.D,
      skinKey: 'animals/chicken',
      suggestedPrefabName: 'Chicken',
      displayName: 'Chicken',
      comment: 'Default animal theme placeholder.'
    },
    {
      cellType: CELL_TYPE.E,
      logicName: 'cell_e',
      prefabSlot: CELL_TYPE.E,
      skinKey: 'animals/frog',
      suggestedPrefabName: 'Frog',
      displayName: 'Frog',
      comment: 'Default animal theme placeholder.'
    },
    {
      cellType: CELL_TYPE.F,
      logicName: 'cell_f',
      prefabSlot: CELL_TYPE.F,
      skinKey: 'animals/horse',
      suggestedPrefabName: 'Horse',
      displayName: 'Horse',
      comment: 'Default animal theme placeholder.'
    },
    {
      cellType: CELL_TYPE.BIRD,
      logicName: 'bird_special',
      prefabSlot: CELL_TYPE.BIRD,
      skinKey: 'animals/bird',
      suggestedPrefabName: 'Bird',
      displayName: 'Bird',
      comment: 'Default special-piece placeholder.'
    }
  ]
};

export const CAT_MATCH_THEME_CONFIG: ThemeConfig = {
  themeName: 'cat-match',
  cellBindings: [
    {
      cellType: CELL_TYPE.A,
      logicName: 'cat_orange_tabby',
      prefabSlot: CELL_TYPE.A,
      skinKey: 'cats/orange_tabby',
      suggestedPrefabName: 'CatOrangeTabby',
      displayName: '橘猫',
      comment: '猫猫消消乐 - 橘猫（经典橘色虎斑）'
    },
    {
      cellType: CELL_TYPE.B,
      logicName: 'cat_british_shorthair',
      prefabSlot: CELL_TYPE.B,
      skinKey: 'cats/british_shorthair',
      suggestedPrefabName: 'CatBritishShorthair',
      displayName: '英短蓝猫',
      comment: '猫猫消消乐 - 英国短毛蓝猫'
    },
    {
      cellType: CELL_TYPE.C,
      logicName: 'cat_ragdoll',
      prefabSlot: CELL_TYPE.C,
      skinKey: 'cats/ragdoll',
      suggestedPrefabName: 'CatRagdoll',
      displayName: '布偶猫',
      comment: '猫猫消消乐 - 布偶猫（蓝眼白毛）'
    },
    {
      cellType: CELL_TYPE.D,
      logicName: 'cat_siamese',
      prefabSlot: CELL_TYPE.D,
      skinKey: 'cats/siamese',
      suggestedPrefabName: 'CatSiamese',
      displayName: '暹罗猫',
      comment: '猫猫消消乐 - 暹罗猫（深色面罩）'
    },
    {
      cellType: CELL_TYPE.E,
      logicName: 'cat_calico',
      prefabSlot: CELL_TYPE.E,
      skinKey: 'cats/calico',
      suggestedPrefabName: 'CatCalico',
      displayName: '三花猫',
      comment: '猫猫消消乐 - 三花猫（黑白橘三色）'
    },
    {
      cellType: CELL_TYPE.F,
      logicName: 'cat_black',
      prefabSlot: CELL_TYPE.F,
      skinKey: 'cats/black',
      suggestedPrefabName: 'CatBlack',
      displayName: '黑猫',
      comment: '猫猫消消乐 - 黑猫（神秘酷猫）'
    },
    {
      cellType: CELL_TYPE.BIRD,
      logicName: 'cat_golden_special',
      prefabSlot: CELL_TYPE.BIRD,
      skinKey: 'cats/golden_special',
      suggestedPrefabName: 'CatGoldenSpecial',
      displayName: '金色喵星人',
      comment: '猫猫消消乐 - 特殊棋子：金色彩虹猫'
    }
  ]
};

export const CAT_OBSTACLE_CONFIG: ObstacleThemeBinding[] = [
  {
    obstacleType: 'ice',
    skinKey: 'cats/obstacles/frozen_fishbone',
    displayName: '冰冻鱼骨',
    suggestedResourceName: 'obstacle_frozen_fishbone',
    comment: '猫猫消消乐障碍物 - 冰冻的鱼骨头'
  },
  {
    obstacleType: 'crate',
    skinKey: 'cats/obstacles/cardboard_box',
    displayName: '纸箱子',
    suggestedResourceName: 'obstacle_cardboard_box',
    comment: '猫猫消消乐障碍物 - 猫咪最爱的纸箱'
  },
  {
    obstacleType: 'chain',
    skinKey: 'cats/obstacles/yarn_ball',
    displayName: '毛线球',
    suggestedResourceName: 'obstacle_yarn_ball',
    comment: '猫猫消消乐障碍物 - 缠绕的毛线球'
  }
];

export const ACTIVE_THEME_CONFIG: ThemeConfig = CAT_MATCH_THEME_CONFIG;

export function getCellThemeBinding(cellType: number): CellThemeBinding | null {
  const binding = ACTIVE_THEME_CONFIG.cellBindings.find((item) => item.cellType === cellType);
  return binding || null;
}
