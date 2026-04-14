# Cat Theme Draft（第十一轮：猫猫主题切换准备版）

## 1) 目标与边界

本轮目标是将产品表达从 Orchard/Fruit 草案切换为 Cat/Meow 方向，且保持低风险：

- 不改核心玩法逻辑（尤其不改 `GameModel.ts`）
- 不改关卡数据（不改 `levels.json`）
- 不改 `CELL_TYPE` 编号、语义、`aniPre` 顺序
- 不改 scene/prefab 文件名与场景流转链路
- 不接入正式猫猫美术资源，仅完成命名与文案迁移准备

## 2) 本轮已落地的猫猫命名映射

`ThemeConfig.ts` 已固化草案映射（仅命名规范，不改变运行时玩法逻辑）：

- A → White Cat
- B → Orange Cat
- C → Black Cat
- D → Blue Cat
- E → Cow Cat
- F → Pink Cat
- BIRD → Rainbow Cat

并新增 cat-draft 资源命名建议：

- `cats/white`, `cats/orange`, `cats/black`, `cats/blue`, `cats/cow`, `cats/pink`, `cats/rainbow`
- 建议 prefab 名：`CatWhite` ~ `CatRainbowSpecial`

## 3) 当前仍是“草案占位”的部分

- 棋子图形仍为旧占位视觉（非正式猫猫头像）
- 障碍仍加载 `obstacles/ice|crate|chain` 旧路径
- 特殊棋仅改命名语义，效果表现与逻辑未变化

## 4) 正式猫猫美术接入时的手工步骤（Cocos Editor）

1. 为 7 类棋子制作并导入正式猫猫 SpriteFrame / 动画帧。
2. 在不改 `aniPre` 索引的前提下，替换每个槽位引用的 prefab 内容。
3. 按障碍类型替换视觉资源（ice/crate/chain）。
4. 回归验证：交换、消除、连锁、特殊棋、结算流程。

## 5) 风险控制建议

- 先替换静态帧，再替换动画帧，分批回归。
- 保留当前草案配置作为 fallback，避免一次性大改导致难回滚。
- 若美术命名与文档命名不一致，先统一命名再接入，避免资源漂移。
