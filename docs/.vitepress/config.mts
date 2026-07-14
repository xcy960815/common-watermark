import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'common-watermark',
  description: '轻量、框架无关的浏览器端水印库。',
  base: '/common-watermark/',
  cleanUrls: true,
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/install' },
      { text: 'API', link: '/guide/api' },
      { text: '演示', link: '/guide/demo' },
      { text: 'GitHub', link: 'https://github.com/xcy960815/common-watermark' },
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '安装与快速开始', link: '/guide/install' },
          { text: 'API 说明', link: '/guide/api' },
          { text: '本地演示', link: '/guide/demo' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/xcy960815/common-watermark' }],
    footer: {
      message: '基于 MIT 协议发布。',
      copyright: 'Copyright © xcy960815',
    },
    outlineTitle: '本页目录',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
});
