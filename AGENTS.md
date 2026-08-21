# 项目规则（Codex 与协作者通用）

本仓库使用 `LEARNING_PLAN.md` 作为唯一的状态与交接文档。

## 开始任务前

1. 先读 `LEARNING_PLAN.md` 的「当前状态」「Codex 操作协议」「开发日志」
2. 运行 `git status` 验证仓库状态
3. 只做「当前任务」（下一步要做），不扩大范围

## 完成任务后

1. 验证完成标志
2. 更新「当前状态」和「开发日志」
3. 提交并推送（git add / commit / push）

## 冲突处理

- 文档与代码不一致：以代码为准，并修正文档
- git 冲突：不强制覆盖，询问用户

## 打包发布协议

- 版本号唯一来源：`package.json` 的 `version` 字段。打包输出目录固定为 `release/<version>/`（`release/` 已在 `.gitignore` 中忽略，打包产物一律不入库）
- 修改版本号必须征得用户同意：每次打包前先向用户确认新版本号，得到确认后才改 `package.json` 并立即打包；不得自行递增或猜测版本号
- 打包统一使用 `npm run release`（自动读取 `version` 生成输出目录，见 `scripts/release.mjs`）；不要手动拼 `--outDir`，避免版本与目录不一致
- 日常开发验证仍用 `npm run build`（默认输出 `dist/`）；发布包一律通过 `npm run release` 产出
- 打包完成后必须自检，缺一不可：
  1. `npm run type-check`、`npm run lint`、`npm run build` 全部通过
  2. `release/<version>/` 存在且非空，`index.html` 引用的资源文件都存在
  3. 用 `vite preview --outDir release/<version>` 启动后：首页与路由（如 `/posts`）可访问，静态资源无 404，未配置 `site.local.ts` 时备案信息处无占位符残留
  4. 发现问题当场修复并重新打包，不留半成品产物
- 自检通过后向用户汇报产物路径与自检结果，必须等用户明确确认后才算任务完成
