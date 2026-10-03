# 栗鸥 Lio · 个人主页

一个纯静态的个人主页。**没有构建步骤、没有框架、没有 npm 依赖**，直接双击 `index.html` 就能看。

## 页面

| 文件 | 页面 | 说明 |
| --- | --- | --- |
| `index.html` | 首页 | 一屏不滚动：照片铺满 + 大字 + 可点击的海鸥 |
| `articles.html` | 文章 | 列表页（内容待填，结构已就绪） |
| `gallery.html` | 相册 | 照片网格（内容待填，结构已就绪） |
| `about.html` | 关于 | |
| `contact.html` | 联系 | |
| `projects.html` | 项目 | 页面已建好，暂未接入菜单 |
| `stack.html` | 技术栈 | 同上 |
| `guestbook.html` | 留言 | 同上（giscus 配置写在文件注释里） |
| `site.css` | — | 全站唯一样式表 |

## 设计上的几个决定

- **背景只有一张照片**（`assets/hero-sky-clean.jpg`）。首页和五个内页共用它，靠不同的裁切位置、缩放和镜像做出差异 —— 一个文件全站只下载一次。原图中间印着一句英文，已用周围天空像素修补掉。
- **字体**走 Google Fonts：Fraunces + IBM Plex Sans（拉丁）、Noto Sans SC / Noto Serif SC（中文）。
- **动效只有三处**，而且全都不依赖 JS：首页的入场序列、海鸥的飞行姿态、以及三处滚动驱动效果（阅读进度线、滚动惊飞的海鸥、顶栏滚动变色）。
- 所有动效都尊重 `prefers-reduced-motion`，且写了降级：不支持滚动驱动动画的浏览器上，顶栏退回"跟随滚动"，页面完全可用。
- 海鸥的点击互动是首页彩蛋，键盘也能触发。

## 部署到 Cloudflare

仓库根目录已经放了 `wrangler.jsonc`：

```bash
npx wrangler deploy
```

`assets.directory` 指向仓库根目录，`.assetsignore` 列出了**不部署**的文件（README、开发工具，以及三个还没接入菜单的页面 —— 它们内容还是占位文案，不部署就不会被访客撞见）。

自定义域名在 Cloudflare 控制台 Custom domains 里一键接入。

## 上线前要改的

全站有 12 处 `你的域名` 占位符（每个页面的 `og:url` 和 `og:image`）。

**这两个必须是绝对网址** —— 分享到微信 / QQ / X 时，平台爬虫解析不了相对路径，卡片会变成空白。上线前替换成真实域名。

## 开发工具（不影响站点，部署时被 `.assetsignore` 排除）

| 文件 | 用途 |
| --- | --- |
| `og-card.html` | 分享卡模板。渲染成 1200×630 再转 JPEG，输出到 `assets/og-cover.jpg` |
| `_icon32.html` / `_icon180.html` | favicon 与 iOS 图标的生成源（输出 PNG） |
| `_gulltest.html` | 海鸥扇翅的 8 相位分解图，调飞行姿态时用 |

## 说明

`skills/` 目录（第三方 skill 原文存档）和开发截图**没有提交进仓库**：前者版权归各原作者，只作本地参考；后者体积大且不属于站点。
