# common-watermark

[![npm version](https://img.shields.io/npm/v/common-watermark.svg)](https://www.npmjs.com/package/common-watermark) [![npm downloads](https://img.shields.io/npm/dm/common-watermark.svg)](https://www.npmjs.com/package/common-watermark) [![CI](https://github.com/xcy960815/common-watermark/actions/workflows/ci.yml/badge.svg)](https://github.com/xcy960815/common-watermark/actions/workflows/ci.yml) [![license](https://img.shields.io/npm/l/common-watermark.svg)](https://opensource.org/licenses/MIT) [![GitHub issues](https://img.shields.io/github/issues/xcy960815/common-watermark.svg)](https://github.com/xcy960815/common-watermark/issues) [![GitHub stars](https://img.shields.io/github/stars/xcy960815/common-watermark.svg?style=social&label=Stars)](https://github.com/xcy960815/common-watermark)

[中文文档](./README.zh-CN.md)

- Documentation: [https://xcy960815.github.io/common-watermark/](https://xcy960815.github.io/common-watermark/)
- Repository: [https://github.com/xcy960815/common-watermark](https://github.com/xcy960815/common-watermark)

`common-watermark` is a lightweight, framework-agnostic browser watermark library. It renders repeated text as a Canvas background and overlays it on a target DOM container.

## Features

- Plain JavaScript API for JavaScript, TypeScript, Vue, React, and other browser projects
- Independent instances for multiple containers
- Safe replacement when setting a watermark on the same container again
- Automatic overlay-size updates when the target or its content changes
- Cleanup for observers, listeners, timers, and the overlay node
- TypeScript declarations included

## Installation

```bash
pnpm add common-watermark
```

```bash
npm install common-watermark
```

## Quick Start

```ts
import { watermark } from 'common-watermark';

const container = document.body;
watermark.setWatermark('Internal use only', container);

watermark.removeWatermark(container);
```

Use either commas or line breaks to render a multi-line watermark:

```ts
watermark.setWatermark('Internal document\nDo not share', document.body);
```

## Using It in Frameworks

### Vue

```ts
import { onMounted, onUnmounted } from 'vue';
import { watermark } from 'common-watermark';

onMounted(() => {
  watermark.setWatermark('Internal use only', document.body);
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
    watermark.setWatermark('Internal use only', document.body);
    return () => watermark.removeWatermark(document.body);
  }, []);

  return <main>Application content</main>;
}
```

## API

### `watermark.setWatermark(content, element)`

Adds a watermark to `element`. Calling it again for the same element removes the previous instance before creating the new one. Different elements can have independent watermarks.

| Parameter | Type          | Description                                                   |
| --------- | ------------- | ------------------------------------------------------------- |
| `content` | `string`      | Watermark text. Commas and line breaks create separate lines. |
| `element` | `HTMLElement` | Container that receives the watermark overlay.                |

### `watermark.removeWatermark(element)`

Removes the watermark from `element` and cleans up its observers, event listeners, timers, and overlay node.

| Parameter | Type          | Description                                  |
| --------- | ------------- | -------------------------------------------- |
| `element` | `HTMLElement` | Container whose watermark should be removed. |

## Browser and SSR Notes

- This package is intended for browser environments. Do not call its API in a pure Node.js runtime.
- In SSR applications, importing the package is safe, but call the API only from a client-side lifecycle hook.
- Watermark images use a `data:` URL. Your Content Security Policy must allow `img-src data:`.
- The overlay does not intercept pointer events. Verify its visual layering and size in your application before upgrading.

## CDN / UMD Example

```html
<script src="https://unpkg.com/common-watermark/dist/index.umd.min.js"></script>
<script>
  CommonWatermark.watermark.setWatermark('Internal use only', document.body);
</script>
```

## Build Artifacts

- `dist/index.esm.js`: ESM bundle for modern bundlers
- `dist/index.umd.js`: UMD bundle for traditional integrations
- `dist/index.umd.min.js`: Minified UMD bundle
- `types/index.d.ts`: Bundled TypeScript declaration

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm lint
pnpm build
pnpm docs:dev
```

## Project Structure

```text
src/
  core/watermark.ts  # Library entry, rendering, and lifecycle logic
  main.ts            # Vite demo entry
  main.css           # Vite demo styles
  types.ts           # Public types
index.html           # Vite demo page
docs/                # VitePress documentation
types/               # Generated declaration bundle
```

## License

MIT
