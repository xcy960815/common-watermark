---
layout: home

hero:
  name: common-watermark
  text: 浏览器端水印库
  tagline: 轻量、框架无关，为指定 DOM 容器提供可更新、可清理的平铺水印。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/install
    - theme: alt
      text: API 文档
      link: /guide/api

features:
  - title: 框架无关
    details: 可用于原生 JavaScript、TypeScript、Vue、React 等浏览器项目。
  - title: 实例隔离
    details: 多个容器分别管理水印、尺寸观察和销毁逻辑，互不影响。
  - title: 类型完整
    details: 发布包包含 TypeScript 声明，可直接获得公开 API 的类型提示。
---

## 为什么使用它

`common-watermark` 专注于一个小而明确的能力：为页面或局部容器添加不会拦截交互的平铺文字水印。

- 使用 Canvas 生成背景图，不额外依赖运行时框架。
- 同一个容器可更新内容，组件卸载时可完整清理。
- 在容器尺寸或内容变化后自动更新覆盖范围。

## 运行边界

- 仅在浏览器环境调用。
- SSR 中只应在客户端生命周期调用。
- 站点 CSP 需要允许 `img-src data:`，否则背景图片可能无法显示。

## 下一步

- [安装与快速开始](/guide/install)
- [API 说明](/guide/api)
- [本地演示](/guide/demo)
