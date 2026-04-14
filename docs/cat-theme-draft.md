# 猫猫消消乐 - 猫咪主题配置文档

## 1) 主题概述

猫猫消消乐使用 6 种真实猫咪品种作为游戏棋子，搭配金色喵星人作为特殊棋子。

## 2) 猫咪品种映射

`ThemeConfig.ts` 中 `CAT_MATCH_THEME_CONFIG` 定义了完整映射：

| CELL_TYPE | 猫咪品种 | 逻辑名 | 建议 Prefab 名 | skinKey |
|-----------|---------|--------|---------------|---------|
| A (1) | 橘猫 | cat_orange_tabby | CatOrangeTabby | cats/orange_tabby |
| B (2) | 英短蓝猫 | cat_british_shorthair | CatBritishShorthair | cats/british_shorthair |
| C (3) | 布偶猫 | cat_ragdoll | CatRagdoll | cats/ragdoll |
| D (4) | 暹罗猫 | cat_siamese | CatSiamese | cats/siamese |
| E (5) | 三花猫 | cat_calico | CatCalico | cats/calico |
| F (6) | 黑猫 | cat_black | CatBlack | cats/black |
| BIRD (7) | 金色喵星人 | cat_golden_special | CatGoldenSpecial | cats/golden_special |

## 3) 障碍物主题

| 障碍类型 | 猫咪主题名称 | 建议资源名 |
|---------|-------------|-----------|
| ice | 冰冻鱼骨 | obstacle_frozen_fishbone |
| crate | 纸箱子 | obstacle_cardboard_box |
| chain | 毛线球 | obstacle_yarn_ball |

## 4) 美术资源接入步骤（Cocos Editor）

1. 为 7 类棋子制作并导入正式猫咪 SpriteFrame / 动画帧
2. 在不改 `aniPre` 索引的前提下，替换每个槽位引用的 prefab 内容
3. 按障碍类型替换视觉资源（ice/crate/chain）
4. 回归验证：交换、消除、连锁、特殊棋、结算流程

## 5) 配色方案

CellView 中使用的占位 tint 颜色（正式美术替换后可移除）：

| 猫咪品种 | RGB 色值 | 色彩说明 |
|---------|---------|---------|
| 橘猫 | (255, 165, 80) | 暖橘色 |
| 英短蓝猫 | (140, 160, 200) | 蓝灰色 |
| 布偶猫 | (240, 235, 255) | 淡雅白 |
| 暹罗猫 | (210, 180, 140) | 奶茶色 |
| 三花猫 | (255, 200, 150) | 暖杏色 |
| 黑猫 | (80, 80, 90) | 深灰黑 |
| 金色喵星人 | (255, 215, 0) | 金色 |
