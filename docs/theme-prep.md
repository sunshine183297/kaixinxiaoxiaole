# Theme Preparation（Cat Draft）

## 背景

项目当前进入“猫猫主题迁移准备版”：

- 不改变玩法逻辑与关卡数据。
- 不改变 `CELL_TYPE` 与 `aniPre` 顺序。
- 先统一命名、文案与配置，再等待正式猫猫美术资源接入。

## 主题配置状态

`assets/Script/Utils/ThemeConfig.ts` 当前包含：

- `DEFAULT_THEME_CONFIG`：历史默认占位（动物）
- `FRUIT_THEME_CONFIG`：历史水果草案（保留为兼容参考）
- `CAT_THEME_CONFIG`：当前猫猫草案（推荐）
- `CAT_OBSTACLE_DRAFT`：障碍物猫猫命名草案
- `ACTIVE_THEME_CONFIG`：当前指向 `CAT_THEME_CONFIG`

## CELL_TYPE 映射（cat-draft）

| CELL_TYPE | 语义 | logicName | skinKey | suggestedPrefabName |
|---|---|---|---|---|
| A | White Cat | `cat_white` | `cats/white` | `CatWhite` |
| B | Orange Cat | `cat_orange` | `cats/orange` | `CatOrange` |
| C | Black Cat | `cat_black` | `cats/black` | `CatBlack` |
| D | Blue Cat | `cat_blue` | `cats/blue` | `CatBlue` |
| E | Cow Cat | `cat_cow` | `cats/cow` | `CatCow` |
| F | Pink Cat | `cat_pink` | `cats/pink` | `CatPink` |
| BIRD | Rainbow Cat | `cat_rainbow_special` | `cats/rainbow` | `CatRainbowSpecial` |

## 障碍命名草案（不改现有加载逻辑）

| obstacleType | displayName | skinKey | suggestedResourceName |
|---|---|---|---|
| ice | Frozen Cat Tag | `cats/obstacles/ice_tag` | `obstacle_cat_ice_tag` |
| crate | Cardboard Box | `cats/obstacles/cardboard_box` | `obstacle_cat_box` |
| chain | Yarn Chain | `cats/obstacles/yarn_chain` | `obstacle_cat_yarn_chain` |

> 注意：当前 `CellView` 仍按 `obstacles/ice|crate|chain` 加载；本轮仅做命名与文档准备，不做渲染逻辑改造。

## 正式素材接入建议

- 建议路径：`assets/resources/cats/<cat-name>/...`
- 建议 key：`cats/<cat-name>`
- 建议命名：`CatWhite`, `CatOrange`, `CatBlack`, `CatBlue`, `CatCow`, `CatPink`, `CatRainbowSpecial`

## 风险分层

- **低风险项**：文案替换、主题配置映射、命名规范、文档迁移。
- **中风险项**：prefab 资源替换（需 Editor 手工回归）。
- **高风险项**：改动 `GameModel`、`levels.json`、`aniPre` 索引与 scene 结构（本轮禁止）。
