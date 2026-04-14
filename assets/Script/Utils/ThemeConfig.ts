import { CELL_TYPE } from '../Model/ConstValue';

export type ThemeName = 'default' | 'fruit-draft' | 'cat-draft';

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
   * 占位说明，强调当前仅是草案配置。
   */
  comment: string;
}

export interface ThemeConfig {
  themeName: ThemeName;
  /**
   * CELL_TYPE 到视觉语义的映射。
   * 注意：不改变 CELL_TYPE 编号，只做“说明层”配置。
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
      comment: 'Default animal theme placeholder. Real art is already bound in current prefabs.'
    },
    {
      cellType: CELL_TYPE.B,
      logicName: 'cell_b',
      prefabSlot: CELL_TYPE.B,
      skinKey: 'animals/cat',
      suggestedPrefabName: 'Cat',
      displayName: 'Cat',
      comment: 'Default animal theme placeholder. Real art is already bound in current prefabs.'
    },
    {
      cellType: CELL_TYPE.C,
      logicName: 'cell_c',
      prefabSlot: CELL_TYPE.C,
      skinKey: 'animals/fox',
      suggestedPrefabName: 'Fox',
      displayName: 'Fox',
      comment: 'Default animal theme placeholder. Real art is already bound in current prefabs.'
    },
    {
      cellType: CELL_TYPE.D,
      logicName: 'cell_d',
      prefabSlot: CELL_TYPE.D,
      skinKey: 'animals/chicken',
      suggestedPrefabName: 'Chicken',
      displayName: 'Chicken',
      comment: 'Default animal theme placeholder. Real art is already bound in current prefabs.'
    },
    {
      cellType: CELL_TYPE.E,
      logicName: 'cell_e',
      prefabSlot: CELL_TYPE.E,
      skinKey: 'animals/frog',
      suggestedPrefabName: 'Frog',
      displayName: 'Frog',
      comment: 'Default animal theme placeholder. Real art is already bound in current prefabs.'
    },
    {
      cellType: CELL_TYPE.F,
      logicName: 'cell_f',
      prefabSlot: CELL_TYPE.F,
      skinKey: 'animals/horse',
      suggestedPrefabName: 'Horse',
      displayName: 'Horse',
      comment: 'Default animal theme placeholder. Real art is already bound in current prefabs.'
    },
    {
      cellType: CELL_TYPE.BIRD,
      logicName: 'bird_special',
      prefabSlot: CELL_TYPE.BIRD,
      skinKey: 'animals/bird',
      suggestedPrefabName: 'Bird',
      displayName: 'Bird',
      comment: 'Default special-piece placeholder. Effect behavior remains unchanged.'
    }
  ]
};

export const FRUIT_THEME_CONFIG: ThemeConfig = {
  themeName: 'fruit-draft',
  cellBindings: [
    {
      cellType: CELL_TYPE.A,
      logicName: 'fruit_apple',
      prefabSlot: CELL_TYPE.A,
      skinKey: 'fruits/apple',
      suggestedPrefabName: 'FruitApple',
      displayName: 'Apple',
      comment: 'Legacy draft only. Keep prefab slot and CELL_TYPE unchanged; replace visuals later in Editor.'
    },
    {
      cellType: CELL_TYPE.B,
      logicName: 'fruit_banana',
      prefabSlot: CELL_TYPE.B,
      skinKey: 'fruits/banana',
      suggestedPrefabName: 'FruitBanana',
      displayName: 'Banana',
      comment: 'Legacy draft only. Keep prefab slot and CELL_TYPE unchanged; replace visuals later in Editor.'
    },
    {
      cellType: CELL_TYPE.C,
      logicName: 'fruit_grape',
      prefabSlot: CELL_TYPE.C,
      skinKey: 'fruits/grape',
      suggestedPrefabName: 'FruitGrape',
      displayName: 'Grape',
      comment: 'Legacy draft only. Keep prefab slot and CELL_TYPE unchanged; replace visuals later in Editor.'
    },
    {
      cellType: CELL_TYPE.D,
      logicName: 'fruit_orange',
      prefabSlot: CELL_TYPE.D,
      skinKey: 'fruits/orange',
      suggestedPrefabName: 'FruitOrange',
      displayName: 'Orange',
      comment: 'Legacy draft only. Keep prefab slot and CELL_TYPE unchanged; replace visuals later in Editor.'
    },
    {
      cellType: CELL_TYPE.E,
      logicName: 'fruit_watermelon',
      prefabSlot: CELL_TYPE.E,
      skinKey: 'fruits/watermelon',
      suggestedPrefabName: 'FruitWatermelon',
      displayName: 'Watermelon',
      comment: 'Legacy draft only. Keep prefab slot and CELL_TYPE unchanged; replace visuals later in Editor.'
    },
    {
      cellType: CELL_TYPE.F,
      logicName: 'fruit_blueberry',
      prefabSlot: CELL_TYPE.F,
      skinKey: 'fruits/blueberry',
      suggestedPrefabName: 'FruitBlueberry',
      displayName: 'Blueberry',
      comment: 'Legacy draft only. Keep prefab slot and CELL_TYPE unchanged; replace visuals later in Editor.'
    },
    {
      cellType: CELL_TYPE.BIRD,
      logicName: 'fruit_rainbow',
      prefabSlot: CELL_TYPE.BIRD,
      skinKey: 'fruits/rainbow',
      suggestedPrefabName: 'FruitRainbowSpecial',
      displayName: 'Rainbow Fruit',
      comment: 'Legacy draft special-piece naming only. No change to special effect logic.'
    }
  ]
};

export const CAT_THEME_CONFIG: ThemeConfig = {
  themeName: 'cat-draft',
  cellBindings: [
    {
      cellType: CELL_TYPE.A,
      logicName: 'cat_white',
      prefabSlot: CELL_TYPE.A,
      skinKey: 'cats/white',
      suggestedPrefabName: 'CatWhite',
      displayName: 'White Cat',
      comment: 'Cat draft placeholder only. Keep prefab slot and CELL_TYPE unchanged; waiting for formal cat art.'
    },
    {
      cellType: CELL_TYPE.B,
      logicName: 'cat_orange',
      prefabSlot: CELL_TYPE.B,
      skinKey: 'cats/orange',
      suggestedPrefabName: 'CatOrange',
      displayName: 'Orange Cat',
      comment: 'Cat draft placeholder only. Keep prefab slot and CELL_TYPE unchanged; waiting for formal cat art.'
    },
    {
      cellType: CELL_TYPE.C,
      logicName: 'cat_black',
      prefabSlot: CELL_TYPE.C,
      skinKey: 'cats/black',
      suggestedPrefabName: 'CatBlack',
      displayName: 'Black Cat',
      comment: 'Cat draft placeholder only. Keep prefab slot and CELL_TYPE unchanged; waiting for formal cat art.'
    },
    {
      cellType: CELL_TYPE.D,
      logicName: 'cat_blue',
      prefabSlot: CELL_TYPE.D,
      skinKey: 'cats/blue',
      suggestedPrefabName: 'CatBlue',
      displayName: 'Blue Cat',
      comment: 'Cat draft placeholder only. Keep prefab slot and CELL_TYPE unchanged; waiting for formal cat art.'
    },
    {
      cellType: CELL_TYPE.E,
      logicName: 'cat_cow',
      prefabSlot: CELL_TYPE.E,
      skinKey: 'cats/cow',
      suggestedPrefabName: 'CatCow',
      displayName: 'Cow Cat',
      comment: 'Cat draft placeholder only. Keep prefab slot and CELL_TYPE unchanged; waiting for formal cat art.'
    },
    {
      cellType: CELL_TYPE.F,
      logicName: 'cat_pink',
      prefabSlot: CELL_TYPE.F,
      skinKey: 'cats/pink',
      suggestedPrefabName: 'CatPink',
      displayName: 'Pink Cat',
      comment: 'Cat draft placeholder only. Keep prefab slot and CELL_TYPE unchanged; waiting for formal cat art.'
    },
    {
      cellType: CELL_TYPE.BIRD,
      logicName: 'cat_rainbow_special',
      prefabSlot: CELL_TYPE.BIRD,
      skinKey: 'cats/rainbow',
      suggestedPrefabName: 'CatRainbowSpecial',
      displayName: 'Rainbow Cat',
      comment: 'Cat draft special-piece naming only. No change to special effect logic.'
    }
  ]
};

export const CAT_OBSTACLE_DRAFT: ObstacleThemeBinding[] = [
  {
    obstacleType: 'ice',
    skinKey: 'cats/obstacles/ice_tag',
    displayName: 'Frozen Cat Tag',
    suggestedResourceName: 'obstacle_cat_ice_tag',
    comment: 'Cat draft placeholder only. Current CellView still loads obstacles/ice.'
  },
  {
    obstacleType: 'crate',
    skinKey: 'cats/obstacles/cardboard_box',
    displayName: 'Cardboard Box',
    suggestedResourceName: 'obstacle_cat_box',
    comment: 'Cat draft placeholder only. Current CellView still loads obstacles/crate.'
  },
  {
    obstacleType: 'chain',
    skinKey: 'cats/obstacles/yarn_chain',
    displayName: 'Yarn Chain',
    suggestedResourceName: 'obstacle_cat_yarn_chain',
    comment: 'Cat draft placeholder only. Current CellView still loads obstacles/chain.'
  }
];

export const ACTIVE_THEME_CONFIG: ThemeConfig = CAT_THEME_CONFIG;

export function getCellThemeBinding(cellType: number): CellThemeBinding | null {
  const binding = ACTIVE_THEME_CONFIG.cellBindings.find((item) => item.cellType === cellType);
  return binding || null;
}
