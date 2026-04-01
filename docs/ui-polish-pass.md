# UI Polish Pass（第八轮）

## 1) 审计结论：最影响产品感的旧痕迹

1. 页面标题语气不统一：Login/Level/Game/Result 使用了不同风格词汇。  
2. 关卡页缺少“页面级”标题层，像纯技术列表。  
3. 占位水果 tint 可见，但特殊棋（BIRD）与普通黄系棋子辨识度风险偏高。  
4. 仍有少量旧 demo 文本在 scene 资产中（部分已由脚本隐藏，不建议高风险手改 scene JSON）。

## 2) 本轮低风险可清理项（已做）

- 统一产品表达为 `Lucky Pop · Orchard` 主标题体系。  
- Login 增加主题主标题 + 副标题，强化第一眼品牌感。  
- Level Select 增加页面级标题与副标题，减少“开发列表感”。  
- HUD 增加统一 stage label（Orchard Run），与暂停/结算语气统一。  
- 调整 BIRD 占位色为高对比色，降低与黄系棋子混淆风险。

## 3) 仍保留的问题（诚实边界）

- 棋子仍是动物造型，仅做色彩占位。  
- 障碍和特效仍是旧资源风格。  
- 若要真正完成水果美术版，必须替换 prefab 的 SpriteFrame 与对应动画素材。

## 4) 需要正式素材或 Editor 手工处理的事项

1. 7 套正式水果棋子 prefab 素材与动画帧。  
2. 障碍（ice/crate/chain）视觉资源。  
3. Login/Level/Result 背景和按钮皮肤统一。  
4. 在 Cocos Editor 中替换 aniPre 槽位引用，保持索引顺序不变。

## 5) 本轮定位

本轮是产品化 polish 与一致性提升，不是正式美术换皮完成版。
