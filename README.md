# Checkey01 Blog Simple Frontend

基于 Vue 3 的个人博客前端项目，文章内容使用 Markdown 文件管理。当前处于学习开发阶段，按 [LEARNING_PLAN.md](LEARNING_PLAN.md) 逐步推进。

## 技术栈

- [Vite](https://vite.dev/) —— 构建工具
- [Vue 3](https://vuejs.org/) —— 组合式 API（`<script setup>`）
- [TypeScript](https://www.typescriptlang.org/) —— 类型安全
- [Vue Router](https://router.vuejs.org/) —— 页面路由
- ESLint / oxlint + Prettier —— 代码检查与格式化

## 快速开始

需要 Node.js 22 或更高版本。

```sh
npm install
npm run dev
```

浏览器打开 <http://localhost:5173/>。

## 常用命令

| 命令              | 作用                    |
| ----------------- | ----------------------- |
| `npm run dev`     | 启动开发服务器          |
| `npm run build`   | 类型检查 + 构建生产版本 |
| `npm run preview` | 本地预览构建结果        |
| `npm run lint`    | 代码检查                |
| `npm run format`  | 格式化代码              |

## 项目结构

```
src/
├── main.ts          # 程序入口
├── App.vue          # 根组件（路由出口）
├── data/
│   └── articles.ts  # 文章数据（当前为示例数据）
├── views/           # 页面组件
├── components/      # 复用组件
└── router/
    └── index.ts     # 路由配置
```

## 文章内容

当前文章数据放在 `src/data/articles.ts`，字段结构由其中的 `Article` 接口定义（slug、title、date、tags、excerpt、content）。

后续计划改为 Markdown 文件管理：文章正文存 `.md` 文件，日期和标签等元数据写在文件开头的 frontmatter 里，再用 `markdown-it` 渲染。

## 学习与协作

- [LEARNING_PLAN.md](LEARNING_PLAN.md) —— 学习路线、每日日志、跨电脑交接文档（Codex 开工前必读）
- AGENTS.md —— Codex 协作规则

## 常见问题

| 问题                             | 解决                                |
| -------------------------------- | ----------------------------------- |
| 报错 `'vite' 不是内部或外部命令` | 先执行 `npm install`                |
| npm 报 `ERESOLVE` 版本冲突       | 用 `npm install --legacy-peer-deps` |
