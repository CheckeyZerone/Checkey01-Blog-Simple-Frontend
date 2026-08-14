---
project: checkey01-blog-simple-frontend
branch: main
remote: https://github.com/CheckeyZerone/Checkey01-Blog-Simple-Frontend.git
current_phase: 2
current_task: T2
status: in_progress
last_log: 2026-08-14
---

# 学习计划与开发日志

本文件是项目唯一的「状态 + 交接」文档，同时服务两类读者：

- **你自己**：学习路线、每日任务、报错速查
- **另一台电脑的 Codex**：开工前必须读「当前状态」和「开发日志」，按「Codex 操作协议」继续任务

## 当前状态

| 字段       | 值                                                                  |
| ---------- | ------------------------------------------------------------------- |
| 项目       | checkey01-blog-simple-frontend（本文件所在仓库）                    |
| 分支       | main                                                                |
| 远程仓库   | https://github.com/CheckeyZerone/Checkey01-Blog-Simple-Frontend.git |
| 当前阶段   | 2（首页文章列表）                                                   |
| 当前任务   | T2                                                                  |
| 最近完成   | T1 环境搭建（2026-08-14）                                           |
| 最后提交   | feat: 初始化项目                                                    |
| 未提交改动 | 无（每次收工必须提交推送）                                          |

**下一步要做**：完成任务 T2（见下方任务清单），完成标志：浏览器首页显示「我的博客」和 3 篇文章。

## 关键决策（不要擅自更改）

- 技术栈：Vite + Vue 3 + TypeScript + Vue Router，以 `.vue` 单文件组件为主，不用 JSX
- 文章内容用 Markdown 文件管理，数据模型为 `Article` 接口
- 暂不引入 Pinia、单元测试
- 安装依赖遇到 ERESOLVE 版本冲突时，用 `npm install --legacy-peer-deps`

## Codex 操作协议

### 开工（每次开始任务前）

1. 读取本文件「当前状态」和「开发日志」
2. 运行 `git status`、`git log --oneline -5`，对照文档确认一致
3. 检查任务涉及的现有文件是否如文档所述
4. 一致 → 直接执行当前任务；不一致 → 以实际代码为准，先修正文档，再向用户说明差异
5. 只做「下一步要做」的任务，不顺手重构、不扩大范围

### 收工（每个任务完成后）

1. 验证「完成标志」：启动 `npm run dev`，按任务卡的验收步骤检查
2. 更新文首「当前状态」（阶段、任务、未提交改动）
3. 在「开发日志」末尾追加条目（格式见下）
4. 提交并推送：`git add .` → `git commit -m "描述本次改动"` → `git push`
5. 向用户汇报：完成了什么、下一步是什么

### 冲突与异常

- `git pull` 冲突：不要强制覆盖或删除任何内容，停下来询问用户
- 文档与代码矛盾：以实际代码为准，修正文档
- 命令报错：先对照「报错速查」，解决不了就停下来说明

## 跨电脑切换流程

换电脑前（收工协议已覆盖）：保证「当前状态」已更新、日志已追加、代码已 push。

新电脑继续：

1. `git clone` 或 `git pull`
2. `npm install`（报 ERESOLVE 用 `--legacy-peer-deps`）
3. 打开本文件，看「当前状态」和「开发日志」
4. 对 Codex 说：继续项目，按 LEARNING_PLAN.md 的当前任务往下做
5. 项目路径以实际 clone 位置为准

## 任务清单

> 任务编号固定，日志和交接时引用编号（如「已完成 T1」「正在做 T2」）。

### T1 环境搭建 ✅（2026-08-14 完成）

- [x] create-vue 创建项目（TS + Router + Linter + Prettier）
- [x] 安装依赖
- [x] Git 仓库初始化并推送 GitHub

验证证据：`git log --oneline` 包含 `feat: 初始化项目`；`npm run dev` 能打开页面；GitHub 仓库存在。

### T2 首页文章列表 🔄（当前任务）

**目标**：首页用数据渲染文章列表。

**涉及文件**：

- 新建 `src/data/articles.ts`（Article 接口 + 3 篇示例文章）
- 新建 `src/views/HomeView.vue`（`v-for` 渲染标题/日期/摘要）
- 修改 `src/router/index.ts`（添加 `/` → HomeView）
- 修改 `src/App.vue`（替换为 `<RouterView />`）

**完成标志**：`npm run dev` 后首页显示「我的博客」+ 3 篇文章；`npm run lint` 不新增错误。

**本任务概念**：`interface`、`v-for`、`{{ }}`、`RouterView`。

### T3 文章详情页（预计 2~3 天）

**目标**：点击文章进入详情页，Markdown 渲染 + 代码高亮。

**涉及**：安装 `markdown-it` + `highlight.js`；路由 `/post/:slug`；详情页组件；列表加跳转。

**完成标志**：首页 → 详情页 → 正文排版正常、代码高亮。

### T4 组件拆分与列表优化（预计 2 天）

**目标**：抽取 `PostCard.vue`（学习 props/emits），按日期倒序，显示阅读时间。

**完成标志**：列表页由卡片组件构成，可复用。

### T5 frontmatter 与标签（预计 2~3 天）

**目标**：文章用 frontmatter 管理元数据（gray-matter），标签页按标签过滤。

**完成标志**：点标签看到对应文章列表。

### T6 布局与样式（预计 4~6 天）

**目标**：Header/Footer、卡片与详情排版、手机适配。

**完成标志**：整体像个正常博客。

### 后续（可选）

搜索、暗色模式、部署上线、评论功能。

## 开发日志

> 每天收工追加一条，固定格式：

```
### 日期（第 N 天）
- 任务编号：T?
- 今天做了什么：
- 学到了什么：
- 遇到的问题：
- 遗留事项：
- 下一步：
```

### 2026-08-14（第 1 天）— T1 完成

- 任务编号：T1
- 今天做了什么：创建 Vue3 + TS 项目，安装依赖，初始化 Git 并推送 GitHub
- 学到了什么：Vite 项目结构、npm install / npm run dev、git add/commit/push
- 遇到的问题：vite 命令找不到（未装依赖）；ERESOLVE 版本冲突（用 `--legacy-peer-deps` 解决）
- 遗留事项：无
- 下一步：T2 首页文章列表

## 报错速查

| 报错                                         | 原因         | 解决                             |
| -------------------------------------------- | ------------ | -------------------------------- |
| `'vite' 不是内部或外部命令`                  | 依赖未安装   | `npm install`                    |
| `ERESOLVE unable to resolve dependency tree` | 依赖版本冲突 | `npm install --legacy-peer-deps` |
| `src refspec main does not match any`        | 还没有提交   | 先 `git add .` + `git commit`    |
