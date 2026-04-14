# 猫猫消消乐

使用 **Cocos Creator 3.8.6** + **TypeScript** 开发的三消小游戏，目标平台为**微信小游戏**。

六种可爱猫咪品种（橘猫、英短蓝猫、布偶猫、暹罗猫、三花猫、黑猫）作为消除棋子，搭配金色喵星人特殊道具，带来超萌的消除体验！

---

## 游戏特色

- **猫咪主题**：6 种猫咪品种 + 1 个金色特殊棋子
- **经典三消玩法**：交换相邻棋子，三个及以上相同猫咪即可消除
- **特殊技能**：四连产生直线消除、L/T 型产生范围消除、五连产生全屏消除
- **关卡系统**：20 个精心设计的关卡，支持步数限制和时间限制两种模式
- **障碍机制**：冰冻鱼骨、纸箱子、毛线球等猫咪主题障碍物
- **星级评价**：每关最高三星评价，解锁后续关卡
- **微信小游戏**：适配微信小游戏平台，支持分享、震动反馈

---

## 环境要求

- **Cocos Creator**：3.8.6（请使用同版本打开，避免资源/序列化格式差异）
- **操作系统**：Windows / macOS
- **微信开发者工具**：最新稳定版（用于小游戏调试和上传）

---

## 快速开始

### 本地开发

1. 安装并启动 **Cocos Creator 3.8.6**
2. 在 Creator 中选择 **打开项目（Open Project）**，选择本仓库根目录
3. 打开场景：`assets/Scene/Login.scene`（游戏入口）
4. 点击编辑器顶部 **预览（Preview）** 进行调试

### 场景流转

```
Login.scene → Level.scene → Game.scene
  登录页面     关卡选择     游戏主场景
```

- `LoginController` 预加载关卡选择场景，切换到 `Level.scene`
- `LevelSelectController` 展示关卡列表，选择关卡后进入 `Game.scene`
- `GameController` 初始化游戏模型，驱动棋盘渲染与交互

### 微信小游戏构建

1. 在 Creator 中打开：**项目（Project） → 构建发布（Build）**
2. 选择平台：**微信小游戏（WeChat Mini Game）**
3. 填写 AppID（在 `build-templates/wechatgame/project.config.json` 中配置）
4. 点击**构建（Build）**
5. 用**微信开发者工具**打开构建产出目录进行调试和上传

---

## 目录结构

```
├── assets/
│   ├── Scene/              # 场景文件
│   │   ├── Login.scene     # 登录页
│   │   ├── Level.scene     # 关卡选择
│   │   └── Game.scene      # 游戏主场景
│   ├── Script/
│   │   ├── Controller/     # 控制器（登录、关卡选择、游戏）
│   │   ├── Model/          # 数据模型（游戏逻辑、关卡配置、进度存储）
│   │   ├── View/           # 视图（棋盘、棋子、特效）
│   │   └── Utils/          # 工具类（微信兼容、主题配置、音频等）
│   ├── Prefabs/            # 预制体（猫咪棋子、特效）
│   ├── Music/              # 音效与 BGM
│   ├── Texture/            # 贴图资源
│   └── resources/          # 运行时加载资源（关卡 JSON、UI 图标）
├── build-templates/
│   └── wechatgame/         # 微信小游戏构建模板
│       ├── game.json       # 小游戏全局配置
│       └── project.config.json  # 微信项目配置
├── settings/               # Cocos Creator 项目设置
└── package.json            # 项目元数据
```

---

## 猫咪棋子对照表

| 类型 | 猫咪品种 | 代表色 | 说明 |
|------|---------|--------|------|
| A | 橘猫 | 暖橘色 | 经典橘色虎斑 |
| B | 英短蓝猫 | 蓝灰色 | 英国短毛蓝猫 |
| C | 布偶猫 | 淡雅白 | 蓝眼白毛 |
| D | 暹罗猫 | 奶茶色 | 深色面罩 |
| E | 三花猫 | 暖杏色 | 黑白橘三色 |
| F | 黑猫 | 深灰黑 | 神秘酷猫 |
| 特殊 | 金色喵星人 | 金色 | 五连特殊棋子 |

---

## 微信小游戏上线清单

- [ ] 在[微信公众平台](https://mp.weixin.qq.com/)注册小游戏账号并获取 AppID
- [ ] 将 AppID 填入 `build-templates/wechatgame/project.config.json` 的 `appid` 字段
- [ ] 准备猫咪主题美术资源替换占位预制体
- [ ] 在 Cocos Creator 中构建微信小游戏包
- [ ] 使用微信开发者工具调试并上传
- [ ] 提交微信审核

---

## 技术栈

- **引擎**：Cocos Creator 3.8.6
- **语言**：TypeScript（严格模式）
- **目标平台**：微信小游戏、Web
- **设计分辨率**：640 × 1136（竖屏）

---

## 更新记录

- 2026/04 改版为猫猫消消乐主题，适配微信小游戏平台
- 2025/12 升级到 Cocos Creator 3.8.6，改用 TypeScript
- 2019/01 升级到 Cocos Creator v2.0.7
- 2018/07 增加音效
- 2018/01 升级到 Cocos Creator v1.8.1
