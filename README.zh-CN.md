# common-watermark

[![npm version](https://img.shields.io/npm/v/common-watermark.svg)](https://www.npmjs.com/package/common-watermark) [![npm downloads](https://img.shields.io/npm/dm/common-watermark.svg)](https://www.npmjs.com/package/common-watermark) [![CI](https://github.com/xcy960815/common-watermark/actions/workflows/ci.yml/badge.svg)](https://github.com/xcy960815/common-watermark/actions/workflows/ci.yml) [![license](https://img.shields.io/npm/l/common-watermark.svg)](https://opensource.org/licenses/MIT) [![GitHub issues](https://img.shields.io/github/issues/xcy960815/common-watermark.svg)](https://github.com/xcy960815/common-watermark/issues) [![GitHub stars](https://img.shields.io/github/stars/xcy960815/common-watermark.svg?style=social&label=Stars)](https://github.com/xcy960815/common-watermark)

[English README](./README.md)

- 文档站：[https://xcy960815.github.io/common-watermark/](https://xcy960815.github.io/common-watermark/)
- 仓库地址：[https://github.com/xcy960815/common-watermark](https://github.com/xcy960815/common-watermark)

`common-watermark` 是一个轻量、框架无关的浏览器端水印库。它通过 Canvas 生成平铺文字水印，并覆盖到指定的 DOM 容器上。

## 功能特性

- 提供普通 JavaScript API，可用于 JavaScript、TypeScript、Vue、React 等浏览器项目
- 支持多个容器独立使用水印
- 同一容器重复设置时自动清理旧实例并更新内容
- 容器或内容尺寸变化时自动更新水印覆盖范围
- 销毁时清理观察器、事件监听器、计时器和覆盖节点
- 内置 TypeScript 类型声明

## 安装

```bash
pnpm add common-watermark
```

```bash
npm install common-watermark
```

## 快速开始

```ts
import { watermark } from 'common-watermark';

const container = document.body;
watermark.setWatermark('仅供内部使用', container);

watermark.removeWatermark(container);
```

水印文本中的逗号或换行符都会分隔为多行：

```ts
watermark.setWatermark('内部资料\n请勿外传', document.body);
```

## 在框架中使用

### Vue

```ts
import { onMounted, onUnmounted } from 'vue';
import { watermark } from 'common-watermark';

onMounted(() => {
  watermark.setWatermark('仅供内部使用', document.body);
});

onUnmounted(() => {
  watermark.removeWatermark(document.body);
});
```

### React

```tsx
import { useEffect } from 'react';
import { watermark } from 'common-watermark';

export function App() {
  useEffect(() => {
    watermark.setWatermark('仅供内部使用', document.body);
    return () => watermark.removeWatermark(document.body);
  }, []);

  return <main>应用内容</main>;
}
```

## API

### `watermark.setWatermark(content, element)`

在 `element` 上添加水印。同一个元素再次调用时，会先清理旧水印，再按新内容创建。不同元素可以独立设置水印。

| 参数      | 类型          | 说明                               |
| --------- | ------------- | ---------------------------------- |
| `content` | `string`      | 水印文本；逗号和换行符可分隔多行。 |
| `element` | `HTMLElement` | 需要覆盖水印的目标容器。           |

### `watermark.removeWatermark(element)`

移除 `element` 上的水印，并清理该实例的观察器、事件监听器、计时器和覆盖节点。

| 参数      | 类型          | 说明                     |
| --------- | ------------- | ------------------------ |
| `element` | `HTMLElement` | 需要移除水印的目标容器。 |

## 浏览器与 SSR 说明

- 本库仅适用于浏览器环境；不要在纯 Node.js 运行时调用其 API。
- SSR 项目中可以导入本包，但只能在客户端生命周期调用 API。
- 水印图片使用 `data:` URL。站点 CSP 必须允许 `img-src data:`。
- 覆盖层不会拦截指针事件；升级版本后请在业务页面验证层级和尺寸表现。

## CDN / UMD 用法

```html
<script src="https://unpkg.com/common-watermark/dist/index.umd.min.js"></script>
<script>
  CommonWatermark.watermark.setWatermark('仅供内部使用', document.body);
</script>
```

## 构建产物

- `dist/index.esm.js`：供现代打包器使用的 ESM 版本
- `dist/index.umd.js`：供传统接入方式使用的 UMD 版本
- `dist/index.umd.min.js`：压缩后的 UMD 版本
- `types/index.d.ts`：打包后的 TypeScript 声明

## 本地开发

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm lint
pnpm build
pnpm docs:dev
```

## 项目结构

```text
src/
  core/watermark.ts  # 库入口、水印渲染与生命周期实现
  main.ts            # Vite 演示入口
  main.css           # Vite 演示样式
  types.ts           # 公共类型
index.html           # Vite 演示页面
docs/                # VitePress 文档
types/               # 构建生成的声明文件
```

## License

MIT
