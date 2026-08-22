---
project: checkey01-blog-simple-frontend
branch: main
remote: https://github.com/CheckeyZerone/Checkey01-Blog-Simple-Frontend.git
current_phase: 7
current_task: T-D5
status: next
last_log: 2026-08-22
---

# 学习计划与开发日志

本文件是项目唯一的「状态 + 交接」入口，同时服务两类读者：

- **你自己**：学习路线、每日任务、报错速查
- **另一台电脑的 Codex**：开工前必须读「当前状态」和「开发日志」，按「Codex 操作协议」继续任务

> 任务详情已拆分到 `tasks/` 目录：本文件只保留状态、索引、决策、日志与速查。开工时只读「当前任务」对应的任务卡，控制上下文消耗。

## 当前状态

| 字段       | 值                                                                  |
| ---------- | ------------------------------------------------------------------- |
| 项目       | checkey01-blog-simple-frontend（本文件所在仓库）                    |
| 分支       | main                                                                |
| 远程仓库   | https://github.com/CheckeyZerone/Checkey01-Blog-Simple-Frontend.git |
| 当前阶段   | 7（设计稿落地 · 蔚蓝档案主题，T-D 系列）                            |
| 当前任务   | T-D5（文章内容页，见 [任务索引](#任务索引)）                        |
| 最近完成   | T-D4 首页改造（2026-08-22）                                         |
| 最后提交   | 首页改造（`feat(home): 首页改造...`，见提交历史）                  |
| 未提交改动 | 无                                                                  |

**下一步要做**：开始任务 T-D5（文章内容页：白卡片、返回、上一篇/下一篇）。任务详情见 `tasks/blue-archive/README.md` 与 `tasks/blue-archive/05-文章内容页.md`。

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
- **任务管理拆文件**：`LEARNING_PLAN.md` 只做状态/索引/日志/速查；任务卡按文件存放在 `tasks/`（含 `blue-archive/` 子目录），开工只读当前任务卡，避免过度消耗 token
- **当前优先事项**：T-D 系列（设计稿落地）优先推进；T7/T8/T9 保留在任务索引，按数据解耦原则写好代码后可无缝衔接
- **每步强制审查**：每个任务完成后按 `tasks/README.md` 通用审查清单验收（type-check / lint / build / 目测 / 死链 / 垃圾清理 / 复用性），发现问题当场修复，不留屎山
- **数据与页面解耦**：文章、相册、友链、关于我各自独立数据文件 + 类型接口，页面只从统一入口取数；后端就绪后只换数据源实现，页面不动
- **旧标签页彻底改造**：不做新旧两套页面，标签页直接改造成新的文章列表页；相册图片先用占位符；搜索框先只做 UI，等文章相关功能完成后再实现
- **相册后置、复用性前置**：相册页 / 图片内容页 / 相册检索最后实现，但 AlbumCard、分页组件、标签筛选条等公共件前期先设计好，相册阶段只是组合复用

## Codex 操作协议

### 开工（每次开始任务前）

1. 读取本文件「当前状态」和「开发日志」
2. 运行 `git status`、`git log --oneline -5`，对照文档确认一致
3. 读取 `tasks/README.md` 通用审查清单 + 「当前任务」对应的任务卡；没有必要时不读其他任务卡
4. 检查任务涉及的现有文件是否如文档所述
5. 一致 → 直接执行当前任务；不一致 → 以实际代码为准，先修正文档，再向用户说明差异
6. 只做「下一步要做」的任务，不顺手重构、不扩大范围

### 收工（每个任务完成后）

1. 验证「完成标志」：启动 `npm run dev`，按任务卡的验收步骤检查
2. 过 `tasks/README.md` 通用审查清单，发现问题当场修复
3. 更新文首「当前状态」（阶段、任务、未提交改动）
4. 在「开发日志」末尾追加条目（格式见下）
5. 提交（`git add .` → `git commit -m "描述本次改动"`）；是否推送按用户要求
6. 向用户汇报：完成了什么、下一步是什么

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

## 任务索引

> 任务编号固定，日志和交接时引用编号（如「已完成 T1」「正在做 T-D3」）。详细步骤都在对应任务卡里，本文件只放索引与完成状态。

| 编号 | 任务 | 状态 | 任务卡 |
| --- | --- | --- | --- |
| T1 | 环境搭建 | ✅ 2026-08-14 | （并入日志） |
| T2 | 首页文章列表 | ✅ 2026-08-14 | （并入日志） |
| T3 | 文章详情页 | ✅ 2026-08-17 | （并入日志） |
| T4 | 组件拆分与列表优化 | ✅ 2026-08-17 | （并入日志） |
| T5 | frontmatter 与标签 | ✅ 2026-08-18 | （并入日志） |
| T6 | 布局与样式（6.1~6.3） | ✅ 2026-08-18 | （并入日志） |
| T6.4 | 友情链接页面 | ✅ 2026-08-18 | （并入日志） |
| T6.5 | 关于我页面 | ✅ 2026-08-19 | （并入日志） |
| T-D1 | 起点整理 | ✅ 2026-08-20 | [01-起点整理.md](tasks/blue-archive/01-起点整理.md) |
| T-D2 | 全局设计系统 | ✅ 2026-08-21 | [02-全局设计系统.md](tasks/blue-archive/02-全局设计系统.md) |
| T-D3 | 文章列表页（替换旧标签页） | ✅ 2026-08-22 | [03-文章列表页.md](tasks/blue-archive/03-文章列表页.md) |
| T-D4 | 首页改造 | ✅ 2026-08-22 | [04-首页改造.md](tasks/blue-archive/04-首页改造.md) |
| T-D5 | 文章内容页 | 待做（优先） | [05-文章内容页.md](tasks/blue-archive/05-文章内容页.md) |
| T-D6 | 友链页改造 | 待做 | [06-友链页改造.md](tasks/blue-archive/06-友链页改造.md) |
| T-D7 | 搜索功能 | 待做（文章相关完成后） | [07-搜索功能.md](tasks/blue-archive/07-搜索功能.md) |
| T-D8 | 相册数据与相册页 | 待做（后置） | [08-相册数据与相册页.md](tasks/blue-archive/08-相册数据与相册页.md) |
| T-D9 | 图片内容页 | 待做（后置） | [09-图片内容页.md](tasks/blue-archive/09-图片内容页.md) |
| T-D10 | 收尾审查与文档 | 待做 | [10-收尾审查与文档.md](tasks/blue-archive/10-收尾审查与文档.md) |
| T7 | 前端服务层与 API 契约 | 待做（T-D 系列后或穿插） | [T7-前端服务层与API契约.md](tasks/T7-前端服务层与API契约.md) |
| T8 | 文章数据迁移 | 待做（依赖后端接口） | [T8-文章数据迁移.md](tasks/T8-文章数据迁移.md) |
| T9 | 管理后台前端 | 待做（依赖后端管理 API） | [T9-管理后台前端.md](tasks/T9-管理后台前端.md) |

**T-D 系列总说明**：设计稿在 `checkey01-blog-web-design` 文件夹（本仓库外）；四点总原则（数据解耦 / 每步审查 / 旧标签页彻底改造 / 相册后置复用性前置）、任务顺序、待定决策，见 `tasks/blue-archive/README.md`。

### 后续（可选）

评论、登录、后台发文（基于 FastAPI + 数据库）、搜索（已排入 T-D7）、暗色模式、部署上线。

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
- 遇到的问题：gray-matter 在浏览器运行时缺 Buffer（`ReferenceError: Buffer is not defined`）；用 buffer polyfill 解决运行时后，又出现 TypeScript 类型报错（问题 #1，见「问题记录」）
- 遗留事项：问题 #1 未解决；HomeViews 里注释掉的旧 `<ul>` 代码可后续删除；`HomeViews.vue` 文件名与计划不一致
- 下一步：解决「问题记录」#1，然后验证 T5 完成标志（点标签看到对应文章列表）

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

### 2026-08-19（第 12 天）— T6.5 完成

- 任务编号：T6.5
- 今天做了什么：新增关于我页面——`AboutView.vue`、`/about` 路由、导航"关于我"入口
- 学到了什么：新页面与路由、静态内容组织
- 遇到的问题：无
- 遗留事项：关于页内容后续可改为 Markdown 管理
- 下一步：T7 前端服务层与 API 契约

### 2026-08-20（第 13 天）— 设计稿落地规划 + 任务管理拆文件

- 任务编号：T-D 系列
- 今天做了什么：把设计稿（蔚蓝档案主题）落地规划写入 `tasks/blue-archive/`（README + T-D1~T-D10 共 10 张任务卡）；任务详情从 `LEARNING_PLAN.md` 拆出到 `tasks/` 目录（README + T7/T8/T9 卡片），主文档改为状态 + 索引 + 日志 + 速查；记录用户四条总原则（数据解耦 / 每步审查 / 旧标签页彻底改造 / 相册后置复用性前置）
- 学到了什么：用「拆分文件」管理任务控制上下文消耗；主文档只保留唯一状态
- 遇到的问题：apply_patch 一次调用不支持同文件先删后建，需分两次执行
- 遗留事项：半成品已按要求提交（`247c56c feat: 暂存设计稿改版半成品`）；空壳文件仍待 T-D1 删除
- 下一步：T-D1 起点整理（复核已提交半成品，删除空壳，提交干净检查点）

### 2026-08-20 — T-D1 完成（起点整理）

- 任务编号：T-D1
- 今天做了什么：删除空壳组件 `AlbumCard.vue` / `CardList.vue`（均未被引用）；保留 `albums.ts` 作为相册模型起点；核对 `PostCard` 用到的 CSS 变量（`--text-info` / `--main-blue` / `--light-blue` / `--border`）已在 `src/assets/main.css` 定义；`npm run type-check` / `lint` / `build` 全部通过；dev server 下首页、`/posts/:slug`、标签、友链、关于我路由均正常
- 学到了什么：提交粒度（一个任务一个 commit）、工作区清理
- 遇到的问题：应用内浏览器输出通道未能正常返回截图，本次改用代码 + 构建 + 路由检查替代目测
- 遗留事项：导航「文章」指向的 `/posts` 只有 `/posts/:slug` 详情路由，文章列表页待 T-D3 实现（按计划优先）
- 下一步：T-D2 全局设计系统

### 2026-08-21（第 14 天）— T-D2 完成

- 任务编号：T-D2
- 今天做了什么：全局设计系统落地——`src/assets/main.css` 新增设计令牌（`--radius-card` / `--shadow-card` / `--shadow-card-hover` / `--tag-border` / `--btn-radius` 等）与公共类（`.card` / `.btn` / `.tag` / `.pagination`）；卡片 hover 上浮、点击微缩；`prefers-reduced-motion` 动效降级
- 学到了什么：设计令牌集中管理、公共样式与组件 scoped 样式分工（外壳进全局、组件内只留布局）、CSS 自定义属性覆盖
- 遇到的问题：组件类与全局类的关系需明确（PostCard 删掉 scoped 外壳样式后必须挂全局 `.card`，否则视觉回归）
- 遗留事项：首页仍为旧布局，待 T-D4 改造
- 下一步：T-D3 文章列表页

### 2026-08-22（第 15 天）— T-D3 完成

- 任务编号：T-D3
- 今天做了什么：新建 `PostsView.vue`（标签筛选 + 置顶大卡 + 双列网格 + 分页 + 空状态）、`TagFilterBar.vue`、`PaginationBar.vue`；`PostCard.vue` 支持 featured（通栏 + 黄色五角星徽标，样式对齐设计稿）；路由注册 `/posts` 与 `/posts/:slug`，`/tags`、`/tags/:tag` 重定向到 `/posts`（带 query）；删除旧 `TagsView` / `TagPostsView`；全站标签链接改为 `/posts?tag=xxx`；`Article` 增加 `featured` 字段支持手动置顶（`src/contents/hello-blog.md` 开启 `featured: true`），首页排序同步置顶优先
- 学到了什么：路由 query（`route.query.tag`）、组件 props/emits、分页 slice、`Number(boolean)` 置顶优先排序；置顶=手动字段而非排序位置；设计稿为准核对 HTML 类名（`ba-star` 是黄色图标而非文字胶囊）
- 遇到的问题：`Frontmatter` 类型缺 `featured` 导致 TS 报错（补 `featured?: boolean`）；组件单字名 `Pagination` 触发 ESLint 多单词规则（改名 `PaginationBar`）；`Math.ceil(list.length) / PAGE_SIZE` 括号位置错误导致翻页页数错误；`path: 'posts'` 少了前导斜杠会拼成 `/posts/posts`
- 遗留事项：首页仍为纵向列表（T-D4 改三列网格，且首页置顶卡不应横跨整行，需把「显示星标」与「通栏」拆开）；`PostView` 标签行间距待 T-D5 细调；`PostsView` 的 `class="container"` 无对应样式可清理
- 下一步：T-D4 首页改造

### 2026-08-22（第 15 天）— 备案号配置化

- 任务编号：T-D4 前置小改动（未纳入任务索引）
- 今天做了什么：ICP 与公安备案号改为配置文件管理——新增 `src/config/site.example.ts`（模板，随仓库提交）与 `src/config/site.local.ts`（真实备案号，被 git 忽略）；`.gitignore` 增加 `*.local.ts`；`AppFooter.vue` 从 `site.local` 读取备案号，任一留空时用 `v-if` 隐藏对应链接
- 学到了什么：隐私/环境相关数据用被忽略的本地配置文件保存；example 文件作为模板提交，供新环境复制
- 遇到的问题：`site.local.ts` 被忽略后，新环境缺失会导致编译报错，需先复制 example 文件
- 下一步：T-D4 首页改造

### 2026-08-22（第 15 天）— T-D4 完成

- 任务编号：T-D4
- 今天做了什么：完成首页改造并提交（`feat(home): 首页改造——最新文章/相册占位/精选友链`）——Hero 对齐设计稿并复用全局按钮样式；首页新增最新文章三列网格（首篇星标优先）；`PostCard` 把「星标展示」与「通栏 wide」拆成独立 props；新增 `AlbumCard` 占位组件并在首页渲染最新相册；底部新增精选友链接条（最多 3 条）并跳转 `/links`；标签悬停动效抽取为 CSS 变量（`style(tag)` 提交）
- 学到了什么：最新文章用排序后 `slice(0, 3)` 取前三条；三档响应式网格用 `repeat(3, minmax(0, 1fr))` → 2 列 → 1 列；公共组件先在首页消费，可提前验证复用性
- 遇到的问题：无
- 遗留事项：相册区「进入相册 →」仍是占位链接，待 T-D8 相册页完成后接入；首页置顶卡只显示星标、不再强制横跨整行
- 下一步：T-D5 文章内容页

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
| `Property 'featured' does not exist on type 'Frontmatter'` | frontmatter 类型没声明新字段 | 在 `src/utils/frontmatter.ts` 的 `Frontmatter` 接口补 `featured?: boolean` |
| `Component name "Pagination" should always be multi-word` | Vue 组件名须至少两个单词 | 改名如 `PaginationBar.vue`，同步更新引用处 |
| `Each *.vue file can contain at most one <script> block` | 文件里出现两个 `<script>` | 一个 `.vue` 文件只保留一个 `<script setup>`，检查是否粘贴重复 |
