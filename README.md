# common-watermark

[![npm version](https://img.shields.io/npm/v/common-watermark.svg)](https://www.npmjs.com/package/common-watermark) [![license](https://img.shields.io/npm/l/common-watermark.svg)](https://opensource.org/licenses/MIT) [![npm downloads](https://img.shields.io/npm/dm/common-watermark.svg)](https://www.npmjs.com/package/common-watermark) [![CI](https://github.com/xcy960815/common-watermark/actions/workflows/ci.yml/badge.svg)](https://github.com/xcy960815/common-watermark/actions/workflows/ci.yml) [![GitHub issues](https://img.shields.io/github/issues/xcy960815/common-watermark.svg)](https://github.com/xcy960815/common-watermark/issues) [![GitHub stars](https://img.shields.io/github/stars/xcy960815/common-watermark.svg?style=social&label=Stars)](https://github.com/xcy960815/common-watermark) [![GitHub forks](https://img.shields.io/github/forks/xcy960815/common-watermark.svg?style=social&label=Fork)](https://github.com/xcy960815/common-watermark)

`common-watermark` 是一个轻量、框架无关的浏览器端水印库。它通过 Canvas 生成平铺水印，并覆盖到指定 DOM 容器上。

- 支持原生 JavaScript、TypeScript、Vue、React 等浏览器项目
- 支持多个容器同时添加水印
- 支持同一容器更新水印内容与主动销毁
- 内置 TypeScript 类型声明

完整中文文档见 [common-watermark 文档站](https://xcy960815.github.io/common-watermark/)。

## 安装

```bash
pnpm add common-watermark
```

## 快速开始

```ts
import { watermark } from 'common-watermark';

const container = document.body;
watermark.setWatermark('仅供内部使用', container);

// 不再需要时清理监听器和覆盖层。
watermark.removeWatermark(container);
```

水印文本可使用逗号或换行符分成多行：

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

在 `element` 上添加水印。同一个元素再次调用会先清理旧水印，再按新内容创建；不同元素可以独立使用。

| 参数      | 类型          | 说明                               |
| --------- | ------------- | ---------------------------------- |
| `content` | `string`      | 水印文本；逗号或换行符可分隔多行。 |
| `element` | `HTMLElement` | 需要覆盖水印的容器。               |

### `watermark.removeWatermark(element)`

移除指定容器的水印，同时清理相关观察器、事件监听器和计时器。组件卸载或页面模块销毁时应调用此方法。

## 使用边界

- 本库仅适用于浏览器环境；不要在纯 Node.js 运行时调用水印方法。
- SSR 项目中可以保留导入，但只能在客户端生命周期调用 API。
- 水印通过 `data:` URL 作为背景图。若站点 CSP 限制 `img-src data:`，需先调整 CSP 策略。
- 覆盖层不会拦截鼠标和键盘交互，但其层级与尺寸策略属于可见行为；升级版本前请验证页面布局。

## 构建产物

- `dist/index.esm.js`：供现代打包器使用的 ESM 版本。
- `dist/index.umd.js`：供 UMD 或传统接入方式使用的版本。
- `dist/index.umd.min.js`：压缩后的 UMD 版本。
- `types/index.d.ts`：打包后的 TypeScript 声明。

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
  core/watermark.ts  # 水印实例、渲染与生命周期实现
  main.ts            # Vite 本地演示入口
  main.css           # 本地演示样式
  types.ts           # 公共类型
index.html           # Vite 本地演示页面
docs/                # VitePress 中文文档
types/               # Rollup 构建生成的声明文件
```

## License

[MIT](https://opensource.org/license/mit/)
