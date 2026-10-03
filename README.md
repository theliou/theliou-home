# 栗鸥 Lio · 个人主页

纯静态个人主页。**站点本身没有构建步骤、没有框架、没有 npm 依赖**，直接双击 `index.html` 就能看。

线上：**https://liujiahao.me/**

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
| `site.css` | — | 全站唯一样式表（手写） |
| `assets/fonts.css` | — | 字体声明（由脚本生成，勿手改） |

## 设计上的几个决定

- **背景只有一张照片**（`assets/hero-sky-clean.jpg`）。首页和五个内页共用它，靠不同的裁切位置、缩放和镜像做出差异 —— 一个文件全站只下载一次。原图中间印着一句英文，已用周围天空像素修补掉。
- **字体自托管**，不依赖 Google Fonts（原因和做法见下一节）。
- **动效只有三处**，而且全都不依赖 JS：首页的入场序列、海鸥的飞行姿态、以及三处滚动驱动效果（阅读进度线、滚动惊飞的海鸥、顶栏滚动变色）。
- 所有动效都尊重 `prefers-reduced-motion`，且写了降级：不支持滚动驱动动画的浏览器上，顶栏退回"跟随滚动"，页面完全可用。
- 海鸥的点击互动是首页彩蛋，键盘也能触发。

## 字体为什么自托管

原本走 Google Fonts 的 CDN。问题有两个，而且第二个是致命的：

1. 那份 CSS 有 **337 KB 且是渲染阻塞的**；
2. `fonts.gstatic.com` 在国内经常连不上 —— 一旦连不上，全站掉回系统字体，**Fraunces 的 "Lio" 和 Noto Serif SC 的标题全部失效，设计意图直接丢掉**。

现在改成：用 Google Fonts 的 `text=` 接口，**只按本站实际用到的 308 个字符**生成子集，存到自己的域名下。

| | 之前 | 现在 |
| --- | --- | --- |
| 字体 CSS | 337 KB（外部、阻塞） | **10.8 KB（本地）** |
| 字体文件 | 15 个（跨域） | **6 个，共 180 KB** |
| 外部依赖 | fonts.googleapis.com + fonts.gstatic.com | **无** |

**内容大改之后要重新生成**（新增很多字时，不在子集里的字会掉回系统字体）：

```bash
node tools/build-fonts.mjs
```

## 部署

已连接 Cloudflare Workers 的 Git 集成：**推送到 `main` 就自动重新部署**（约 1 分钟）。

手动部署也可以用仓库根目录的 `wrangler.jsonc`：

```bash
npx wrangler deploy
```

`.assetsignore` 列出了**不部署**的文件（README、`docs/`、开发工具、备用背景图，以及三个还没接入菜单的页面 —— 它们内容还是占位文案，不部署就不会被访客撞见）。

⚠️ `.assetsignore` 按**文件系统**过滤，和 `.gitignore` 无关：本地存在的东西只要没在它里面列出，就会一起上传。

## 开发工具（部署时被 `.assetsignore` 排除）

| 文件 | 用途 |
| --- | --- |
| `tools/build-fonts.mjs` | 生成 `assets/fonts/` 与 `assets/fonts.css`（内容大改后重跑） |
| `og-card.html` | 分享卡模板。渲染成 1200×630 再转 JPEG，输出到 `assets/og-cover.jpg` |
| `_icon32.html` / `_icon180.html` | favicon 与 iOS 图标的生成源（输出 PNG） |
| `_gulltest.html` | 海鸥扇翅的 8 相位分解图，调飞行姿态时用 |

## 说明

`skills/` 目录（第三方 skill 原文存档）和开发截图**没有提交进仓库**：前者版权归各原作者，只作本地参考；后者体积大且不属于站点。
