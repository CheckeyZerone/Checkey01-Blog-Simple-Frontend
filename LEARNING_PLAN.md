---
project: checkey01-blog-simple-frontend
branch: main
remote: https://github.com/CheckeyZerone/Checkey01-Blog-Simple-Frontend.git
current_phase: 6
current_task: T7
status: in_progress
last_log: 2026-08-18
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
| 当前阶段   | 6（FastAPI 后端）                                                   |
| 当前任务   | T7                                                                  |
| 最近完成   | T6 布局与样式（2026-08-18）                                         |
| 最后提交   | feat: T6.3 响应式适配                                              |
| 未提交改动 | 无（每次收工必须提交推送）                                          |

**下一步要做**：开始任务 T7——前端服务层 + 前后端 API 契约（后端实现另作打算，不写在本仓库）。

## 问题记录

### #1（已解决 2026-08-18）gray-matter 缺 Buffer 引发的类型报错

- **出现位置**：`src/utils/buffer-polyfill.ts`（`globalThis.Buffer = Buffer` 这一行）
- **背景**：gray-matter 在浏览器运行时依赖 Node 的 `Buffer`，浏览器没有，所以用 `buffer` 包补了 polyfill；运行时能生效，但 TypeScript 不允许直接给 `globalThis` 挂新属性，导致类型检查/构建不通过
- **解决状态**：✅ 已解决（2026-08-18）。采用根治方案：新增 `src/utils/frontmatter.ts`（`yaml` 解析），`articles.ts` 改用 `parseFrontMatter`，删除 `buffer-polyfill.ts`，卸载 `gray-matter` 和 `buffer`；`npm run type-check` 已通过
- **候选修法（二选一）**：
  - 快速修（保留 gray-matter）：在 `buffer-polyfill.ts` 里先把 globalThis 转成可加键的类型，再挂 Buffer；并在 `src/main.ts` 顶部加 `import './utils/buffer-polyfill'`
  - 根治（推荐）：卸载 `gray-matter` 和 `buffer`，改用浏览器原生兼容的 `yaml` 包 + 自写 `src/utils/frontmatter.ts` 解析 frontmatter，删除 polyfill 相关文件
- **验证方式**：`npm run type-check` 和 `npm run build` 通过；`npm run dev` 后首页显示 3 篇文章、点标签能筛选

## 关键决策（不要擅自更改）

- 技术栈：Vite + Vue 3 + TypeScript + Vue Router，以 `.vue` 单文件组件为主，不用 JSX
- 文章内容用 Markdown 文件管理，数据模型为 `Article` 接口
- frontmatter 解析：`yaml` 包 + 自写 `src/utils/frontmatter.ts`（浏览器原生兼容，不依赖 Node Buffer；不要再用 gray-matter）
- Markdown 渲染方案：markdown-it（v15）+ highlight.js（github 主题）+ markdown-it-texmath（KaTeX 公式，`$...$` / `$$...$$`）+ DOMPurify 清洗（`USE_PROFILES: { html, mathMl, svg }`）；渲染入口统一在 `src/utils/markdown.ts`
- markdown-it-texmath 无官方类型声明，项目内用 `src/markdown-it-texmath.d.ts` 补充
- 暂不引入 Pinia、单元测试
- 安装依赖遇到 ERESOLVE 版本冲突时，用 `npm install --legacy-peer-deps`
- 项目边界：本仓库只做**前端**和**前后端 API 交互层**（服务层 + 接口契约）；后端实现（FastAPI 服务端、数据库等）另行规划，**不写进本仓库**。前端页面只通过 `src/api/articles.ts` 服务层取数据
- 内容管理渐进迁移：当前路线 A（Markdown + Git）→ 后端基本功能就绪后路线 B（管理后台 + API）。前端统一走 `src/api/` 服务层，数据源切换只改一处开关

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

### T5 frontmatter 与标签 ✅（2026-08-18 完成）

**目标**：文章用 frontmatter 管理元数据（yaml 解析），标签页按标签过滤。

**完成标志**：点标签看到对应文章列表。

### T6 布局与样式 ✅（2026-08-18 完成）

**目标**：Header/Footer、卡片与详情排版、手机适配。

进度：

- [x] T6.1 布局骨架与备案信息（2026-08-18）
- [x] T6.2 全局样式与文章排版（2026-08-18）
- [x] T6.3 响应式（手机端适配，2026-08-18）

**完成标志**：整体像个正常博客。

### T6.4 友情链接页面 ✅（2026-08-18 完成）

**目标**：新增"友情链接"页面，展示友链信息（站名、链接、简介、可选头像），支持以后互换友链。

**涉及**：

- 新建 `src/views/LinksView.vue`，路由 `/links`，Header 导航加"友链"入口
- 数据先用简单数组文件（如 `src/data/links.ts`），后续可走服务层（与文章一致）
- 样式复用现有卡片风格，手机端正常显示

**完成标志**：`/links` 页面展示友链列表，导航可进入，桌面和手机均正常。

**本任务概念**：新页面与路由、列表渲染、数据文件组织。

> 说明：纯前端功能，不依赖后端，可安排在 T7 之后或随时插入。

### T6.5 关于我页面（补充任务，待做）

**目标**：新增"关于我"页面，展示个人简介等内容。

**涉及**：

- 新建 `src/views/AboutView.vue`，路由 `/about`，Header 导航加"关于"入口
- 内容先用静态文本，后续可改为 Markdown 文件管理
- 样式与现有页面一致，手机端正常显示

**完成标志**：`/about` 页面正常展示，导航可进入，桌面和手机均正常。

**本任务概念**：新页面与路由、静态内容组织。

> 说明：纯前端功能，不依赖后端，可随时做。

### T7 前端服务层与 API 契约 🔄（当前任务，预计 2~3 天）

**目标**：做好前端的数据服务层和前后端 API 契约，让数据源可以随时从"本地数据"切换为"后端接口"（后端实现另作打算，不写在本仓库）。

**前置条件**：前端先加 `src/api/articles.ts` 服务层——页面只调用 `getArticles()` / `getArticle(slug)`，不直接访问本地数据。

**涉及**：

- 新建 `src/api/types.ts`：契约类型（`Article` / `ArticleSummary` / `ArticleInput`）
- 新建 `src/api/source.ts`：数据源接口 `ArticleSource`（读操作 + 写操作占位）
- 新建 `src/api/local-source.ts`：路线 A 实现（读本地 `src/contents`）
- 新建 `src/api/remote-source.ts`：路线 B 实现（`fetch('/api/v1/...')`，先写好框架）
- 新建 `src/api/articles.ts`：对外唯一入口 + 切换开关（默认 `localSource`）
- 页面（首页 / 详情 / 标签）全部改走服务层并异步化，不再直接访问本地数据
- 配置 `vite.config.ts` 开发代理 `/api` → `http://localhost:8000`（为对接预留）
- 把接口契约（端点 + 请求/响应字段）记录清楚，供"另作打算"的后端仓库实现

**完成标志**：页面全部通过服务层取数；从路线 A 切到路线 B 只需改 `src/api/articles.ts` 的开关一处；接口契约已明确记录。

**本任务概念**：REST API、前后端契约、服务层（数据源切换）、开发代理（跨域）。

### T8 文章数据迁移（预计 1~2 天）

**目标**：所有文章从前端本地数据迁移到后端 `content/` 目录。

> 注：依赖"另作打算"的后端仓库提供接口后再执行；本仓库只负责前端的切换。

**涉及**：

- 把示例文章转成 `content/*.md`（frontmatter 写 title / date / tags）
- 删除前端 `src/data/articles.ts` 中的示例数据（保留 `Article` 接口，或移动到共享契约位置）
- 前端列表、详情、标签全部改走服务层

**完成标志**：前端不再包含任何本地文章数据；增删文章只需修改后端 Markdown 文件。

**本任务概念**：数据与视图分离、前后端契约（`Article` 字段结构）。

### T9 管理后台前端（补充任务，待做；依赖后端管理 API）

**目标**：提供网页内容管理：登录、文章列表、新建 / 编辑 / 删除。

**涉及**：

- 路由：`/admin/login`、`/admin`（文章管理列表）、`/admin/new`、`/admin/edit/:slug`，与访客页面分开
- 在 `src/api/remote-source.ts` 补齐写操作：`login()` / `createArticle()` / `updateArticle()` / `deleteArticle()`
- 登录态：token 存 localStorage，请求带 `Authorization: Bearer <token>`
- 表单：标题、日期、标签、摘要、正文（Markdown）

**完成标志**：登录后可新建 / 编辑 / 删除文章，访客页面同步更新。

> 前置：后端管理 API（另作打算的仓库）就绪；本任务在 T7 服务层完成后再做。

### 后续（可选）

评论、登录、后台发文（基于 FastAPI + 数据库）、搜索、暗色模式、部署上线。

## 渐进迁移方案（内容管理 A → B）

**原则**：接口固定、双实现、一个开关。页面只依赖 `src/api/articles.ts`，不直接碰数据源。

| 阶段 | 前端状态 | 内容管理方式 |
| --- | --- | --- |
| A（现在） | 服务层走 `localSource`，页面全部走服务层（异步化） | 改 Markdown + Git 提交 |
| A+（后端基础接口就绪） | 开关切到 `remoteSource`，读接口来自后端；后台页面做登录 + 文章管理 | 后端读写，前端管理页操作 |
| B（完全迁移） | 删除本地 `src/contents/` 与 `local-source.ts`，只保留 `remoteSource` | 后台为唯一写入口 |

**切换方式**：改 `src/api/articles.ts` 里的 `source`（或环境变量 `VITE_USE_REMOTE`）。

**迁移检查点**：每个阶段完成时运行 `npm run dev`，确认首页 / 详情 / 标签 /（后台）正常后再继续。

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

### 2026-08-18（第 6 天）— 问题 #1 解决，T5 继续

- 任务编号：T5
- 今天做了什么：根治 gray-matter 的 Buffer 问题——新增 `src/utils/frontmatter.ts`（`yaml` 解析 frontmatter），`articles.ts` 改用 `parseFrontMatter`，删除 `buffer-polyfill.ts`，卸载 `gray-matter` 和 `buffer`
- 学到了什么：浏览器不能直接跑 Node 专用库；TypeScript 6 把正则捕获组类型定为 `string | undefined`，需要显式判断后再用；`yaml` 库浏览器原生兼容
- 遇到的问题：`frontmatter.ts` 里 `parse(yamlText)` 报 `string | undefined`（用 `yamlText === undefined` 守卫解决）
- 遗留事项：T5 完成标志待验证（点标签看到对应文章列表）；HomeViews 注释掉的旧代码、`HomeViews.vue` 文件名与计划不一致等旧事项
- 下一步：验证 T5 完成标志，完成后推进 T6 布局与样式

### 2026-08-18（第 7 天）— T5 完成（验收通过）

- 任务编号：T5
- 今天做了什么：验证 T5 完成标志——首页点文章标签能进入对应标签筛选列表，验收通过
- 学到了什么：T5 全流程串联（frontmatter → 数据加载 → 标签页路由 → 卡片/详情页入口 → 事件冒泡控制）
- 遇到的问题：无（验收通过）
- 遗留事项：HomeViews 注释掉的旧代码、`HomeViews.vue` 文件名与计划不一致等旧事项
- 下一步：T6 布局与样式

### 2026-08-18（第 8 天）— T6.1 完成

- 任务编号：T6
- 今天做了什么：布局骨架——新建 AppHeader（导航：首页/标签）和 AppFooter（版权 + ICP 备案链接 + 公安备案图标链接），App.vue 改为 Header/main/Footer 三段式布局（min-height:100vh + flex:1 粘底页脚），index.html 更新标题和语言
- 学到了什么：flex 布局（space-between/center）、粘底页脚（min-height:100vh + flex:1）、内容容器（max-width + margin auto）、备案信息合规展示要求
- 遇到的问题：`max-height`/`min-height` 写反导致文章页页脚异常；`min-width` 误写导致内容区过宽
- 遗留事项：备案号为占位符，上线前必须替换真实备案号
- 下一步：T6.2 文章排版

### 2026-08-18（第 9 天）— T6.2 完成

- 任务编号：T6
- 今天做了什么：新建 src/assets/main.css 全局样式（CSS 变量、正文/标题/代码块/引用排版），main.ts 引入；修正文件夹命名 asserts → assets
- 学到了什么：全局样式 vs 作用域样式、CSS 变量（:root + var()）、em/rem 单位选择、line-height 行高
- 遇到的问题：无
- 遗留事项：备案号占位符；HomeViews 旧注释代码、`HomeViews.vue` 文件名与计划不一致等旧事项
- 下一步：T6.3 响应式（手机端适配）

### 2026-08-18（第 10 天）— T6 完成

- 任务编号：T6
- 今天做了什么：T6.3 响应式——main.css / AppHeader / App.vue 增加 `@media (max-width: 640px)` 手机适配，修正 min-height/max-width 笔误，桌面和手机模拟均正常显示，T6 验收通过
- 学到了什么：媒体查询 `@media`、设备模拟调试（F12 + Ctrl+Shift+M）、移动端间距与字号调整
- 遇到的问题：无
- 遗留事项：备案号占位符需上线前替换；HomeViews 旧注释代码、`HomeViews.vue` 文件名与计划不一致等旧事项
- 下一步：T7 FastAPI 最小后端（先加 src/api/articles.ts 服务层）

### 2026-08-18（第 11 天）— T6.4 完成

- 任务编号：T6.4
- 今天做了什么：新增友情链接页面——`src/data/links.ts`（FriendLink 数据）、`LinksView.vue`（卡片列表）、`/links` 路由、导航"友链"入口
- 学到了什么：新页面路由注册、列表渲染、数据文件组织、外链安全属性（rel="noopener noreferrer"）
- 遇到的问题：无
- 遗留事项：示例友链待替换为真实友链
- 下一步：T6.5 关于我页面 / T7 前端服务层与 API 契约

## 报错速查

| 报错                                         | 原因         | 解决                             |
| -------------------------------------------- | ------------ | -------------------------------- |
| `'vite' 不是内部或外部命令`                  | 依赖未安装   | `npm install`                    |
| `ERESOLVE unable to resolve dependency tree` | 依赖版本冲突 | `npm install --legacy-peer-deps` |
| 浏览器报 `ReferenceError: Buffer is not defined`（gray-matter） | 浏览器里用了 Node 专用库 | 改用 `yaml` 解析 frontmatter，不引入 gray-matter |
| `src refspec main does not match any`        | 还没有提交   | 先 `git add .` + `git commit`    |
| `plugin.apply is not a function`             | markdown-it 插件导入后不是函数（CJS 产物） | 换用导出干净的插件（如 markdown-it-texmath） |
| `TS7016 Could not find a declaration file`   | 包无类型声明 | 项目内补 `.d.ts`（如 `src/markdown-it-texmath.d.ts`） |
| `'MarkdownIt' cannot be used as a value`     | 值/类型导入混淆 | 默认导入构造函数，`import type` 导入实例类型 |
| `Property 'push' does not exist on type 'RouteLocationNormalizedLoaded'` | 把 `useRoute()` 当 `useRouter()` 用 | `route` 只读当前地址；跳转用 `useRouter()` 的 `router.push()` |
