# 项目地图

## 定位与边界

`common-watermark` 是浏览器端水印库，不包含后端、业务页面、路由、权限、菜单、请求层或缓存层。默认维护范围是水印渲染、生命周期、打包产物、类型声明、本地演示、用户文档和 VitePress 文档。

## 目录与真源

| 路径 | 职责 | 维护方式 |
| --- | --- | --- |
| `src/core/watermark.ts` | Rollup 库入口、水印渲染、实例与生命周期实现 | 直接维护；其导出即为公开 API |
| `src/types.ts` | 公共类型真源 | 直接维护，并由构建汇总到声明文件 |
| `src/main.ts`、`src/main.css` | Vite 本地浏览器演示入口与样式 | 仅用于本地演示，不进入库产物 |
| `index.html` | Vite 本地演示页面 | 直接维护 |
| `docs/` | VitePress 中文用户文档 | 面向使用者维护 |
| `.github/workflows/` | GitHub Actions 校验与 GitHub Pages 部署 | 按 CI 与文档发布边界维护 |
| `types/index.d.ts` | 发布给消费者的类型声明 | 由构建生成，不手工编辑 |
| `dist/` | JavaScript 打包产物 | 被忽略，不提交 |

## 构建链路

`src/core/watermark.ts` → Rollup 输出 ESM、UMD 与压缩 UMD 到 `dist/`；同一入口再经 `rollup-plugin-dts` 输出 `types/index.d.ts`。

`package.json` 定义发布入口和依赖，`rollup.config.js` 定义库构建，`tsconfig.build.json` 定义构建时 TypeScript 选项，`tsconfig.json` 负责静态检查。修改公共 API 时必须把这些文件视为同一交付链路。

## 文档归属

- `README.md`：中文使用入口、核心 API、开发命令和项目结构。
- `docs/`：中文的完整安装、API 与演示说明。
- `.agents/`：AI 可执行的项目规则，不承载设计历史。
