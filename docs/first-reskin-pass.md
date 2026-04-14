# First Reskin Pass（低风险主题迁移：Cat Draft）

## 1. 可行性审计结论

在“不新增外部正式素材”的约束下，本轮可完成一版**猫猫主题表达迁移**：

- UI 层：统一 Login/Level/HUD/Pause/Result 的文字语义为猫猫主题（低风险、脚本可控）。
- 配置层：固化 A~F/BIRD 的猫猫命名映射，形成正式美术接入前的标准命名协议。
- 文档层：将 Orchard/Fruit 相关叙述迁移为 Cat Draft 语义，明确“已完成项 vs 待美术项”。

不能在本轮安全完成的部分：

- 正式猫猫头像与动画帧替换。
- 障碍、特效、背景与按钮皮肤的最终美术统一。

## 2. 本轮实际做了什么

- 产品主标题从 Orchard 语义迁移为 Meow 语义。
- 登录、选关、HUD、暂停、结算文案统一改为猫猫主题表达。
- 主题配置新增/切换为 `cat-draft` 草案。
- 固化棋子映射：White/Orange/Black/Blue/Cow/Pink/Rainbow Cat。

## 3. 哪些仍然是占位

- 棋子与障碍仍是占位资源，不是正式猫猫美术版。
- 特殊棋（BIRD）仅完成命名迁移，效果逻辑保持不变。
- Scene/Prefab 文件名与结构未调整。

## 4. 正式素材清单（仍需）

### 4.1 棋子素材（7 套）
- CatWhite, CatOrange, CatBlack, CatBlue, CatCow, CatPink, CatRainbowSpecial
- 每套至少需要：默认帧 + 点击态 + 特效对应动画帧（按现有 prefab 能力匹配）

### 4.2 障碍素材（3 套）
- obstacle_cat_ice_tag
- obstacle_cat_box
- obstacle_cat_yarn_chain

### 4.3 可选 UI 素材
- 登录页背景（猫猫主题）
- 关卡页背景（猫猫地图风）
- 结算页图标与按钮皮肤

## 5. 下一步接入建议

1. 在 Cocos Editor 中按 `aniPre` 槽位逐个替换猫猫 prefab 内容（不改顺序）。
2. 完成每类棋子替换后立即做单类回归，再进行全量替换。
3. 最后统一障碍与 UI 皮肤，完成猫猫正式版打磨。
