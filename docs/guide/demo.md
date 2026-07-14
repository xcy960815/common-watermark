# 本地演示

仓库提供不依赖 Vue 或 React 的 Vite 演示页，用于验证最基础的浏览器行为。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的本地地址后，可以：

1. 查看默认水印覆盖效果。
2. 点击“移除水印”，确认覆盖层和监听器可清理。
3. 点击“恢复水印”，确认同一容器可以重新创建水印。

演示页面位于根目录 `index.html`，入口和样式位于 `src/main.ts`、`src/main.css`。它直接使用水印模块，避免依赖 Vue 示例掩盖库本身的运行边界。
