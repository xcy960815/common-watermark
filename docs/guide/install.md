# 安装与快速开始

## 安装

```bash
pnpm add common-watermark
```

## 添加水印

```ts
import { watermark } from 'common-watermark';

const container = document.body;
watermark.setWatermark('仅供内部使用', container);
```

文本中的逗号和换行符都会被识别为分行：

```ts
watermark.setWatermark('内部资料\n请勿外传', document.body);
```

## 在组件卸载时清理

水印会为容器维护观察器和尺寸检查。页面或组件不再使用该容器时，请主动清理：

```ts
watermark.removeWatermark(container);
```

## SSR 与 CSP

- 只在浏览器端生命周期调用 `setWatermark` 和 `removeWatermark`。
- 水印背景使用 `data:` URL；配置 CSP 时，确保 `img-src` 允许 `data:`。
