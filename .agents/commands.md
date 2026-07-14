# 命令与依赖约定

## 包管理器

本仓库唯一使用 pnpm，并通过 `pnpm@10.33.0` 与 `pnpm-lock.yaml` 固定工具和依赖。不得运行 `npm install`、`npm update` 或生成新的 `package-lock.json`。

## 常用命令

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm lint
pnpm build
pnpm docs:dev
pnpm docs:build
```

- `pnpm dev` 通过根目录 `index.html` 启动 Vite 浏览器演示。
- `pnpm build` 会清理 `dist/` 和 `types/`，重新输出 JavaScript 包与声明文件。
- `pnpm check`、`pnpm lint`、`pnpm format:check` 分别负责类型、代码质量和格式检查。
- 当前没有自动化测试。不得把类型检查或构建成功表述为“测试通过”。
- 提交前的 Husky 钩子会运行 `lint-staged`，对暂存的代码、文档和配置执行 ESLint 或 Prettier。

安装依赖、启动开发服务、构建和格式化都可能改变本机状态；执行前应说明命令和预期影响。
