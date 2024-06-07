import { defineConfig } from "vitepress";
import { docsAuto } from "./generateNavs";
import { pagefindPlugin } from "vitepress-plugin-pagefind";

const { sideBar, navBar } = docsAuto();
console.log(sideBar, navBar, "999999999999999");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [pagefindPlugin()],
  },
  title: "Gruguy 在线文档",
  lang: "zh-CN",
  description:
    "开发一个基于nuxt + vite + vue3 + pinia + typescript 的简单博客，后台使用express + mongodb",
  head: [
    ["meta", { name: "author", content: "少林寺驻北固山办事处大神父王喇嘛" }],
    ["meta", { name: "keywords", content: "Vitepress-Template," }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js",
      },
    ],
  ],
  outDir: "./dist",
  srcDir: "./markdown",
  lastUpdated: true,
  themeConfig: {
    logo: "/icon.png",
    outline: {
      level: [2, 4], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: "当前页大纲", // 文字显示
    },

    // editLink: {
    //   text: "为此页提供修改建议",
    //   pattern: "https://gitee.com/dotnetmoyu/Vitepress-Template",
    // },
    search: {
      provider: "local",

      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Gruguy",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    nav: [{ text: "首页", link: "index.md" }, ...navBar],
    sidebar: sideBar,
  },
});
