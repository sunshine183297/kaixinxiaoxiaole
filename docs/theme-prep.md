# Theme Prep（换皮准备说明）

本文件用于说明：在不改核心玩法逻辑的前提下，如何安全替换三消棋子主题（例如动物 -> 水果）。

## 1. 当前绑定关系（关键结论）

- 逻辑层 `CELL_TYPE` 定义在 `assets/Script/Model/ConstValue.ts`，编号语义保持不变：`A~F` 为普通棋子，`BIRD` 为特殊棋子。  
- 运行时显示主要由 `GridView.aniPre[type]` 决定，`type` 来自 `CellModel.type`。也就是说，**棋子类型 -> 预制体** 的实际绑定依赖 `aniPre` 数组索引。  
- `aniPre` 数组本身的引用关系主要由 Cocos Editor 在 `assets/Scene/Game.scene` 中维护（非纯代码动态绑定）。

## 2. 主题配置文件（代码准备层）

`assets/Script/Utils/ThemeConfig.ts` 当前包含：

- `DEFAULT_THEME_CONFIG`：当前动物主题说明映射。  
- `FRUIT_THEME_CONFIG`：水果主题命名草案（仅规范，不会自动启用）。  
- `FRUIT_OBSTACLE_DRAFT`：障碍（ice/crate/chain）水果风格占位命名。  

> 以上均是“配置与规范层”，不会改变现有运行行为，也不会替换真实资源。

## 3. 动物主题 -> 水果主题映射表（草案）

| CELL_TYPE | 当前语义 | 水果草案 displayName | logicName | skinKey | suggestedPrefabName |
|---|---|---|---|---|---|
| A | 普通棋子 A | Apple | `fruit_apple` | `fruits/apple` | `FruitApple` |
| B | 普通棋子 B | Banana | `fruit_banana` | `fruits/banana` | `FruitBanana` |
| C | 普通棋子 C | Grape | `fruit_grape` | `fruits/grape` | `FruitGrape` |
| D | 普通棋子 D | Orange | `fruit_orange` | `fruits/orange` | `FruitOrange` |
| E | 普通棋子 E | Watermelon | `fruit_watermelon` | `fruits/watermelon` | `FruitWatermelon` |
| F | 普通棋子 F | Blueberry | `fruit_blueberry` | `fruits/blueberry` | `FruitBlueberry` |
| BIRD | 特殊棋子 | Rainbow Fruit | `fruit_rainbow` | `fruits/rainbow` | `FruitRainbowSpecial` |

## 4. 障碍主题占位（草案）

| obstacleType | displayName | skinKey | suggestedResourceName |
|---|---|---|---|
| ice | Jelly Ice | `fruits/obstacles/ice_jelly` | `obstacle_ice_jelly` |
| crate | Wooden Crate | `fruits/obstacles/wood_crate` | `obstacle_wood_crate` |
| chain | Vine Chain | `fruits/obstacles/vine_chain` | `obstacle_vine_chain` |

> 注意：当前 `CellView` 仍按 `obstacles/ice|crate|chain` 加载，暂不改逻辑。

## 5. 命名规范建议（给美术/策划/开发）

### 图片与 SpriteFrame
- 建议路径：`assets/resources/fruits/<fruit-name>/...`
- 建议 key：`fruits/<fruit-name>`

### Prefab
- 建议命名：`FruitApple`, `FruitBanana`, `FruitGrape`, `FruitOrange`, `FruitWatermelon`, `FruitBlueberry`, `FruitRainbowSpecial`

### 动画片段
- 保持与现有逻辑兼容：`click`, `line`, `column`, `wrap`, `effect`（如适用）

## 6. 在 Cocos Editor 中的最小替换步骤

1. **不改 `CELL_TYPE` 编号与语义**。  
2. 复制现有动物 Prefab，创建水果版 Prefab，仅替换 Sprite/Animation 资源。  
3. 在 `Game.scene` 的 `GridView` 组件中，按原索引顺序替换 `aniPre` 引用（`1..7` 槽位不变）。  
4. 障碍如需换皮，替换 `assets/resources/obstacles/*` 对应素材（或后续再引入按主题路径加载）。

## 7. 替换后最小验证清单

- 棋盘正常生成，6 种普通棋子 + 1 种特殊棋可正常显示。  
- 交换、三消、连锁、下落行为与替换前一致。  
- 特殊效果（line/column/wrap/bird）动画名称与播放结果正常。  
- 关卡流程仍为 `Login -> Level -> Game`。  
- 无 `GridView: Invalid type` 异常日志。

## 8. 风险提示（必须注意）

- **高风险项**：改 `aniPre` 索引顺序、改 `CELL_TYPE` 编号、改 `GameModel` 消除逻辑。  
- **中风险项**：改 Prefab 内动画片段名导致播放失败。  
- **低风险项**：仅替换贴图、替换预制体外观、维护 `ThemeConfig.ts` 文档映射。

## 9. 适合在 Editor 手工处理的部分

- `Game.scene` 中 `GridView.aniPre` 的预制体引用替换。  
- 各棋子 Prefab 内 SpriteFrame、AnimationClip 的资源替换。  

这些部分建议在 Cocos Editor 可视化操作，不建议通过脚本批量硬改 scene JSON。
