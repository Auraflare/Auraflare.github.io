import fs from 'node:fs';
import path from 'node:path';
import { pluginSass } from '@rsbuild/plugin-sass';
import { defineConfig } from '@rspress/core';
import remarkGithub from 'remark-github';
import { pluginChangelog } from 'rspress-plugin-changelog';
import type { ChangelogPluginOptions } from 'rspress-plugin-changelog';
import pluginSitemap from 'rspress-plugin-sitemap';

const generateChangelogParams = (items: Omit<ChangelogPluginOptions['items'][number], 'type'>[]) =>
  items.map<ChangelogPluginOptions['items'][number]>((item) => ({
    type: 'github-releases',
    templatePath: './changelog.handlebars',
    ...item,
  }));

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: '⛅ Auraflare',
  description: 'Cloudflare® 资源集成解决方案',
  icon: 'https://avatars.githubusercontent.com/u/190900859?s=200&v=4',
  logo: 'https://avatars.githubusercontent.com/u/190900859?s=80&v=4',
  logoText: 'Auraflare',
  // logo: {
  //   light: '/rspress-light-logo.png',
  //   dark: '/rspress-dark-logo.png',
  // },
  head: [
    ['link', { ref: 'preconnect', href: '//ipolyfill.edge-byted.com' }],
    ['link', { ref: 'dns-prefetch', href: '//ipolyfill.edge-byted.com' }],
    ['script', { src: '//ipolyfill.edge-byted.com/0.0.25/polyfill.min.js', crossorigin: '' }],
  ],
  themeConfig: {
    lastUpdated: true,
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/Auraflare' },
      {
        icon: {
          svg: fs.readFileSync(path.join(__dirname, 'docs', 'public', 'telegram.svg'), 'utf-8'),
        },
        mode: 'link',
        content: 'https://t.me/GetSomeFries',
      },
    ],
  },
  builderConfig: {
    plugins: [pluginSass()],
    resolve: {
      alias: {
        'rspress/theme': '@rspress/core/theme',
      },
    },
  },
  markdown: {
    remarkPlugins: [[remarkGithub]],
  },
  plugins: [
    pluginSitemap({
      domain: 'https://Auraflare.github.io',
    }),
    pluginChangelog({
      addSidebar: false,
      fetchOnDev: false,
      items: generateChangelogParams([
        {
          title: '🇩 (D)DNS',
          routePath: 'dns',
          repo: 'Auraflare/DNS',
        },
        {
          title: '1️⃣ 1.1.1.1 + WARP',
          routePath: '1.1.1.1',
          repo: 'Auraflare/1.1.1.1',
        },
      ]),
    }),
  ],
});
