---
project: checkey01-blog-simple-frontend
branch: main
remote: https://github.com/CheckeyZerone/Checkey01-Blog-Simple-Frontend.git
current_phase: 3
current_task: T5
status: in_progress
last_log: 2026-08-17
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
| 当前阶段   | 3（文章详情页）                                                     |
| 当前任务   | T5                                                                  |
| 最近完成   | T4 组件拆分与列表优化（2026-08-17）                                 |
| 最后提交   | feat: 抽取 PostCard 组件，列表按日期倒序并显示阅读时间              |
| 未提交改动 | 无（每次收工必须提交推送）                                          |

**下一步要做**：先解决「未解决问题」#1（TypeScript 类型报错），再完成任务 T5（完成标志：点标签看到对应文章列表）。

## 未解决问题

### #1 T5 阻塞：TypeScript 报错 `Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature`

- **出现位置**：`src/utils/buffer-polyfill.ts`（`globalThis.Buffer = Buffer` 这一行）
- **背景**：gray-matter 在浏览器运行时依赖 Node 的 `Buffer`，浏览器没有，所以用 `buffer` 包补了 polyfill；运行时能生效，但 TypeScript 不允许直接给 `globalThis` 挂新属性，导致类型检查/构建不通过
- **当前状态**：⚠️ `src/main.ts` 还没有 `import './utils/buffer-polyfill'`，补丁未接线，首页仍可能空白
- **候选修法（二选一）**：
  - 快速修（保留 gray-matter）：在 `buffer-polyfill.ts` 里先把 globalThis 转成可加键的类型，再挂 Buffer；并在 `src/main.ts` 顶部加 `import './utils/buffer-polyfill'`
  - 根治（推荐）：卸载 `gray-matter` 和 `buffer`，改用浏览器原生兼容的 `yaml` 包 + 自写 `src/utils/frontmatter.ts` 解析 frontmatter，删除 polyfill 相关文件
- **验证方式**：`npm run type-check` 和 `npm run build` 通过；`npm run dev` 后首页显示 3 篇文章、点标签能筛选

## 关键决策（不要擅自更改）

- 技术栈：Vite + Vue 3 + TypeScript + Vue Router，以 `.vue` 单文件组件为主，不用 JSX
- 文章内容用 Markdown 文件管理，数据模型为 `Article` 接口
- Markdown 渲染方案：markdown-it（v15）+ highlight.js（github 主题）+ markdown-it-texmath（KaTeX 公式，`$...$` / `$$...$$`）+ DOMPurify 清洗（`USE_PROFILES: { html, mathMl, svg }`）；渲染入口统一在 `src/utils/markdown.ts`
- markdown-it-texmath 无官方类型声明，项目内用 `src/markdown-it-texmath.d.ts` 补充
- 暂不引入 Pinia、单元测试
- 安装依赖遇到 ERESOLVE 版本冲突时，用 `npm install --legacy-peer-deps`
- 后续计划引入 FastAPI 后端（见 T7 / T8）；前端页面只通过 `src/api/articles.ts` 服务层取数据

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

### T2 首页文章列表 ✅（2026-08-14 完成）

**目标**：首页用数据渲染文章列表。

**涉及文件**：

- 新建 `src/data/articles.ts`（Article 接口 + 3 篇示例文章）
- 新建 `src/views/HomeViews.vue`（`v-for` 渲染标题/日期/摘要）
- 修改 `src/router/index.ts`（添加 `/` → HomeViews）
- 修改 `src/App.vue`（替换为 `<RouterView />`）

**完成标志**：`npm run dev` 后首页显示「我的博客」+ 3 篇文章；`npm run lint` 不新增错误。

**本任务概念**：`interface`、`v-for`、`{{ }}`、`RouterView`。

### T3 文章详情页 ✅（2026-08-17 完成）

**目标**：点击文章进入详情页，Markdown 渲染 + 代码高亮 + LaTeX 公式。

**涉及**：

- 安装 `markdown-it` + `highlight.js` + `katex` + `markdown-it-texmath` + `dompurify`
- 新建 `src/utils/markdown.ts`（渲染 + 高亮 + 公式 + 清洗）、`src/views/PostView.vue`、`src/markdown-it-texmath.d.ts`
- 修改 `src/router/index.ts`（`/post/:slug`）、`src/views/HomeViews.vue`（列表跳转）、`src/data/articles.ts`（测试内容）

**完成标志**：首页 → 详情页 → 正文排版正常、代码高亮、公式渲染；`npm run type-check` / `npm run lint` 无错误。

**本任务概念**：`computed`、`useRoute()`、`v-html`、`RouterLink`、`:key`、scoped 与 `:deep()`、回调函数、markdown-it 插件机制。

### T4 组件拆分与列表优化 ✅（2026-08-17 完成）

**目标**：抽取 `PostCard.vue`（学习 props/emits），按日期倒序，显示阅读时间。

**涉及**：

- 新建 `src/components/PostCard.vue`（props 接收文章、emits 通知父组件、computed 计算阅读时间）
- 修改 `src/views/HomeViews.vue`（`sortedArticles` 按日期倒序、`<PostCard>` 渲染、`@select` 跳转）

**完成标志**：列表页由卡片组件构成，可复用；首页顺序为 `blog-plan` → `markdown-notes` → `hello-vue`，卡片显示阅读时间；`npm run type-check` / `npm run lint` 无错误。

**本任务概念**：组件化、props（父 → 子）、emits（子 → 父）、`defineProps` / `defineEmits`、`sort` + `localeCompare`、flex 布局（`gap`）、CSS `transition`。

### T5 frontmatter 与标签 🔄（进行中，被「未解决问题」#1 阻塞）

**目标**：文章用 frontmatter 管理元数据（gray-matter），标签页按标签过滤。

**完成标志**：点标签看到对应文章列表。

### T6 布局与样式（预计 4~6 天）

**目标**：Header/Footer、卡片与详情排版、手机适配。

**完成标志**：整体像个正常博客。

### T7 FastAPI 最小后端（预计 3~5 天）

**目标**：用 FastAPI 提供文章接口，前端数据来自后端。

**前置条件**：前端先加 `src/api/articles.ts` 服务层——页面只调用 `getArticles()` / `getArticle(slug)`，不直接访问本地数据。

**涉及**：

- 新建独立后端目录（如 `G:\blog-together\checkey01-blog-backend\`），不要和已有项目混用
- 安装 `fastapi` + `uvicorn`
- `main.py` 提供 `GET /api/articles`（列表）和 `GET /api/articles/{slug}`（详情）
- 后端从 `content/` 目录读取 `.md` 文件并解析 frontmatter
- 前端 `vite.config.ts` 配置代理 `/api` → `http://localhost:8000`
- 前端 `src/api/articles.ts` 改用 `fetch('/api/articles')`

**完成标志**：后端 `uvicorn main:app --reload` 与前端 `npm run dev` 同时运行时，首页文章列表来自 FastAPI。

**本任务概念**：REST API、JSON、Pydantic 模型、开发代理（跨域）。

### T8 文章数据迁移（预计 1~2 天）

**目标**：所有文章从前端本地数据迁移到后端 `content/` 目录。

**涉及**：

- 把示例文章转成 `content/*.md`（frontmatter 写 title / date / tags）
- 删除前端 `src/data/articles.ts` 中的示例数据（保留 `Article` 接口，或移动到共享契约位置）
- 前端列表、详情、标签全部改走服务层

**完成标志**：前端不再包含任何本地文章数据；增删文章只需修改后端 Markdown 文件。

**本任务概念**：数据与视图分离、前后端契约（`Article` 字段结构）。

### 后续（可选）

评论、登录、后台发文（基于 FastAPI + 数据库）、搜索、暗色模式、部署上线。

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

### 2026-08-14（第 2 天）— T2 完成

- 任务编号：T2
- 今天做了什么：创建 `src/data/articles.ts`（Article 接口 + 3 篇示例文章）、首页列表页、首页路由、`App.vue` 改为路由出口，并提交 `feat: 首页显示文章列表`
- 学到了什么：`v-for` 循环、模板插值 `{{ }}`、`<script setup>` 引入数据、`RouterView` 路由出口
- 遇到的问题：未记录
- 遗留事项：`HomeViews.vue` 文件名与计划（HomeView.vue）不一致，不影响运行，后续可统一
- 下一步：T3 文章详情页

### 2026-08-17（第 3 天）— T3 完成

- 任务编号：T3
- 今天做了什么：安装 markdown-it + highlight.js + katex + markdown-it-texmath + dompurify；新建 `src/utils/markdown.ts`（渲染 + 高亮 + 公式 + 清洗）、详情页 `PostView.vue`、类型声明 `src/markdown-it-texmath.d.ts`；路由加 `/post/:slug`；首页列表加跳转；文章内容加入代码块与公式测试
- 学到了什么：markdown-it 配置与默认导入（v15 命名导出是纯类型，TS1485）；highlight.js 的 `hljs.highlight().value` 与 CSS 主题；KaTeX/texmath 插件挂载；动态路由 `useRoute()`、`find()`；`v-html` 与 scoped `:deep()`；回调函数
- 遇到的问题：npm ERESOLVE（`--legacy-peer-deps` 解决）；`@vscode/markdown-it-katex` 是 CJS 产物导致 `plugin.apply is not a function`（换用 markdown-it-texmath 解决）；markdown-it-texmath 无类型声明（补 `.d.ts` 解决）；旧 dev server 缓存导致跳转失败（重启解决）
- 遗留事项：`HomeViews.vue` 文件名与计划不一致；正文美元金额 `$` 与公式分隔符冲突需用 `\$` 转义；KaTeX 输出经 DOMPurify 会去掉 `<eq>`/`<eqn>` 外壳（不影响显示）
- 下一步：T4 组件拆分与列表优化

### 2026-08-17（第 4 天）— T4 完成

- 任务编号：T4
- 今天做了什么：新建 `src/components/PostCard.vue`（props 收文章、emits 发 select、computed 算阅读时间），首页改用卡片组件渲染并按日期倒序排序
- 学到了什么：组件拆分与单向数据流（父传子用 props，子通知父用 emits）、`defineProps` / `defineEmits` 的类型写法、`sort` + `localeCompare` 排序、flex 容器（`flex-direction: column` + `gap`）、CSS `transition` 过渡
- 遇到的问题：误把 `useRoute` 当 `useRouter` 用（`route.push` 不存在，跳转要用 `router.push`）；`emint` 拼写错误；`.post-list` 样式写了但模板没包容器导致不生效
- 遗留事项：HomeViews 里有注释掉的旧 `<ul>` 代码（可后续删除）；`HomeViews.vue` 文件名与计划不一致
- 下一步：T5 frontmatter 与标签

### 2026-08-17（第 5 天）— T5 进行中（被问题 #1 阻塞）

- 任务编号：T5
- 今天做了什么：创建 3 个 Markdown 文章文件（`src/contents/`，带 frontmatter）；`articles.ts` 改为从 Markdown 读取；新增标签页 `TagsView` / `TagPostsView`；路由、卡片、详情页接上标签；修好标签筛选遍历对象和 `.tags` 样式笔误
- 学到了什么：`import.meta.glob` 批量导入、gray-matter 解析 frontmatter、动态路由参数 `useRoute`、`@click.stop` 阻止事件冒泡、`flex-wrap` + `gap` 排版
- 遇到的问题：gray-matter 在浏览器运行时缺 Buffer（`ReferenceError: Buffer is not defined`）；用 buffer polyfill 解决运行时后，又出现 TypeScript 类型报错（问题 #1，见「未解决问题」）
- 遗留事项：问题 #1 未解决；HomeViews 里注释掉的旧 `<ul>` 代码可后续删除；`HomeViews.vue` 文件名与计划不一致
- 下一步：解决「未解决问题」#1，然后验证 T5 完成标志（点标签看到对应文章列表）

## 报错速查

| 报错                                         | 原因         | 解决                             |
| -------------------------------------------- | ------------ | -------------------------------- |
| `'vite' 不是内部或外部命令`                  | 依赖未安装   | `npm install`                    |
| `ERESOLVE unable to resolve dependency tree` | 依赖版本冲突 | `npm install --legacy-peer-deps` |
| `src refspec main does not match any`        | 还没有提交   | 先 `git add .` + `git commit`    |
| `plugin.apply is not a function`             | markdown-it 插件导入后不是函数（CJS 产物） | 换用导出干净的插件（如 markdown-it-texmath） |
| `TS7016 Could not find a declaration file`   | 包无类型声明 | 项目内补 `.d.ts`（如 `src/markdown-it-texmath.d.ts`） |
| `'MarkdownIt' cannot be used as a value`     | 值/类型导入混淆 | 默认导入构造函数，`import type` 导入实例类型 |
| `Property 'push' does not exist on type 'RouteLocationNormalizedLoaded'` | 把 `useRoute()` 当 `useRouter()` 用 | `route` 只读当前地址；跳转用 `useRouter()` 的 `router.push()` |
