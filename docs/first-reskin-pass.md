# First Reskin Pass（低风险水果占位版）

## 1. 可行性审计结论

在“不新增外部素材”的约束下，可以做一版**可见但占位**的水果主题原型，方式如下：

- UI 层：通过文案与标题风格统一为果园主题（低风险、脚本可控）。  
- 棋子层：不改 prefab 结构与动画逻辑，仅对现有棋子 Sprite 施加按类型区分的颜色 tint（低风险、可逆）。  

不能在本轮安全完成的部分：

- 动物形象本体仍在现有 SpriteFrame/AnimationClip 里，无法在无新美术资源情况下真正替换为水果造型。  
- 特殊棋（BIRD）也只能做色彩占位，不能做正式水果特效外观。

## 2. 本轮实际做了什么

- 登录页动态增加主题标题：`Lucky Pop · Orchard Prototype`。  
- 关卡页标题文本统一加入 Orchard 标签。  
- HUD/暂停/结算等可见文案统一为果园语义（Harvest/Orchard）。  
- 对 A~F/BIRD 七类棋子添加颜色占位映射，使棋盘一眼可区分“水果化配色”。

## 3. 哪些仍然是占位

- 棋子图形仍是动物贴图，仅颜色变化。  
- 障碍（ice/crate/chain）仍沿用当前资源与表现。  
- 动画资产命名与逻辑未改（click/line/column/wrap/effect）。

## 4. 最小素材清单（正式美术版仍需）

### 4.1 棋子素材（7 套）
- FruitApple, FruitBanana, FruitGrape, FruitOrange, FruitWatermelon, FruitBlueberry, FruitRainbowSpecial  
- 每套至少需要：默认帧 + 点击态 + 线消/列消/包裹/特效对应动画帧（按现有 prefab 能力匹配）

### 4.2 障碍素材（3 套）
- obstacle_ice_jelly
- obstacle_wood_crate
- obstacle_vine_chain

### 4.3 可选 UI 素材
- 登录页背景（果园风）
- 关卡页背景（果园地图风）
- 结算页图标与按钮皮肤

## 5. 后续第二轮换皮建议

1. 在 Cocos Editor 里复制现有 7 个棋子 prefab，替换 SpriteFrame 与 AnimationClip。  
2. 保持 aniPre 槽位顺序不变，仅替换每个槽位的 prefab 引用。  
3. 回归验证：交换、连锁、特殊棋、结算流程。  
4. 最后再移除本轮 tint 占位（或保留为 fallback）。
