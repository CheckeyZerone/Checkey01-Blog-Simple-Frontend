# T7 前端服务层与 API 契约

> 状态：待做（预计 2~3 天）。设计稿落地（T-D 系列）按数据解耦原则写代码后，本任务可无缝衔接或穿插执行。

**目标**：做好前端的数据服务层和前后端 API 契约，让数据源可以随时从「本地数据」切换为「后端接口」。后端实现另行规划，不写在本仓库。

**前置条件**：前端先加 `src/api/articles.ts` 服务层——页面只调用 `getArticles()` / `getArticle(slug)`，不直接访问本地数据。

**涉及文件**：

- 新建 `src/api/types.ts`：契约类型（`Article` / `ArticleSummary` / `ArticleInput`）
- 新建 `src/api/source.ts`：数据源接口 `ArticleSource`（读操作 + 写操作占位）
- 新建 `src/api/local-source.ts`：路线 A 实现（读本地 `src/contents`）
- 新建 `src/api/remote-source.ts`：路线 B 实现（`fetch('/api/v1/...')`，先写好框架）
- 新建 `src/api/articles.ts`：对外唯一入口 + 切换开关（默认 `localSource`）
- 页面（首页 / 详情 / 标签）全部改走服务层并异步化，不再直接访问本地数据
- 配置 `vite.config.ts` 开发代理 `/api` → `http://localhost:8000`（为对接预留）
- 把接口契约（端点 + 请求/响应字段）记录清楚，供后端仓库实现

**步骤**：

1. 定义契约类型，先与现有 `src/data/articles.ts` 字段对齐（slug / title / date / tags / excerpt / content）
2. 定义 `ArticleSource` 接口
3. 实现 `local-source.ts`：把现有读取逻辑搬进来
4. 实现 `remote-source.ts`：先写 `fetch` 框架与错误处理，后端未就绪时不用
5. 页面改造：首页 / 详情 / 标签全部异步取数
6. 配置 Vite 代理
7. 记录 API 契约

**完成标志**：页面全部通过服务层取数；从路线 A 切到路线 B 只改 `src/api/articles.ts` 的开关一处；接口契约已明确记录。

**审查重点**：通用清单 + 旧 `import { articles } from '@/data/articles'` 全部移除。

**本任务概念**：REST API、前后端契约、服务层（数据源切换）、开发代理（跨域）。
