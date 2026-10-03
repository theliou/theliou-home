---
title: 个人主页设计能力清单（人的 skill）
核对时间: 2026
---

# 一、能力清单

## 必须会

| 能力 | 定义 | 可照抄的数值 |
| --- | --- | --- |
| 排版 / 字号阶梯 | 用固定比例生成整套字号，不随手挑数 | 正文 16px；比例 1.25 或 1.333 → 13/16/20/25/31/39/49；全站不超过 5–6 档 |
| 行高与行长 | 行高与每行字符数决定阅读疲劳度 | 正文 1.5–1.7、标题 1.1–1.2；英文 45–75 字符（`max-width:65ch`），中文 ≤ 40 字/行；字越大行高倍数越小 |
| 间距系统 | 用倍数网格代替目测拖拽 | 8pt 网格：4/8/12/16/24/32/48/64/96；区内边距 < 区间距，靠"一大一小"形成分组 |
| 视觉层级 | 3 秒内让人知道先看什么 | 每屏 1 个主角；尺寸差 ≥1.5 倍 + 字重差 ≥200 + 灰度差组合；弱化次要内容，而不是把主角加粗成黑块 |
| 色彩与对比度 | 颜色只负责强调，可读性优先 | 60-30-10；全站 3–6 色。正文对比 ≥4.5:1，≥24px 大字或 ≥18.5px 粗体 ≥3:1，图标边框 ≥3:1；灰阶掺一点主色相 |
| 响应式 | 一套内容在三档宽度都成立 | 正文容器 640–800px；断点 640/768/1024/1280；触控热区 ≥24×24px（重要按钮 44×44） |
| 内容结构 | 先定信息再看版式 | 首屏一句"你是谁 + 做什么 + 凭什么"；全页 4–6 个 section，每个 3–5 条要点 |
| 一致性 | 相同元素长得一样 | 圆角 2 档、阴影 2–3 档；按钮/链接/hover 全站统一 |
| 性能底线 | 好看但不卡不跳 | 图片 WebP + 固定宽高比；字体 2 个字重 + `swap`；LCP <2.5s、CLS <0.1 |

## 加分项

- 动效：只用 transform/opacity，150–300ms，缓动 `cubic-bezier(.4,0,.2,1)`，位移 ≤24px，尊重 `prefers-reduced-motion`
- 暗色模式：语义色 token（`--bg/--surface/--text/--accent`），正文对比 ≥7:1，近黑替代纯黑
- 插画 / 3D：只在首屏或 About 用一次，必须给静态降级图
- Bento grid：圆角间距统一，子项按 1×1、2×1、2×2 排，移动端一列回退；单色系 + 大字排版靠字重、字距（大标题 -0.02em）与留白撑气场
- 设计 token：把字号、间距、颜色写成 CSS 变量（`--space-4:16px`、`--text-muted`），这是"设计系统"落到代码的最小可用形态，改一处全站一致

# 二、资源

**学习材料**

- [Refactoring UI](https://refactoringui.com/) — 开发者视角的设计策略书，"用策略不用天赋"，目录即本清单大纲
- [Laws of UX](https://lawsofux.com/) — 30+ 交互定律（Miller、Fitts、Von Restorff），定义可直接引用
- [Material 3 — Grids & spacing](https://m3.material.io/foundations/layout/grids-spacing/spacing) — 8dp/4dp 网格权威出处
- [Apple HIG — Typography](https://developer.apple.com/design/human-interface-guidelines/typography) — 系统字号阶梯基线
- [MDN — CSS styling basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics) — 盒模型到层叠的入门教程
- [WCAG 2.2 对比度（最小值）](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — 4.5:1 / 3:1 与"大字"定义原文
- [WCAG 2.2 目标尺寸](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) — 24×24px 热区规范
- [The 8-Point Grid](https://spec.fm/specifics/8-pt-grid) — 为什么用 8 的倍数、4pt 基线网格配文字

**工具**

- [Typescale](https://typescale.com/) — 生成字号阶梯并导出 CSS
- [Realtime Colors](https://www.realtimecolors.com/) — 配色/字体铺到真实页面预览，自带对比度提示与 Tailwind 导出
- [Fontpair](https://fontpair.co/) — 标题+正文成对的 Google Fonts 推荐
- [Coolors](https://coolors.co/) — 调配色方案并导出
- [Google Fonts](https://fonts.google.com/) — 免费可变字体库

**灵感站**

- [Awwwards](https://www.awwwards.com/) — 获奖站点，附评审维度，高标准参照
- [Recent（原 godly.website）](https://recent.design/) — 高质量网页截图流，快速建立现代感基准
- [One Page Love](https://onepagelove.com/) — 单页库，先看 [Personal](https://onepagelove.com/genre/personal)、[Portfolio](https://onepagelove.com/genre/portfolio)，再抄 [Minimal](https://onepagelove.com/style/minimal) / [Typographic](https://onepagelove.com/style/typographic)

# 三、10 条避坑

1. 不用"蓝紫渐变 + 发光卡片 + 玻璃拟态"三件套——最典型的"一眼 AI"特征，换中性底 + 1 个强调色即可
2. 正文不占满屏：1920px 上一行 150 字符没法读，容器锁 640–800px
3. 超过两行的文字不居中，长段落一律左对齐
4. 不用 emoji 当图标，换同一线宽、16/20/24px 的一套线性图标
5. 不留 lorem ipsum、"Your Name"、示例头像，宁可少一个 section
6. 不给每个元素都加边框和阴影，层级优先用间距与底色差
7. 不只靠字号表达层级，标题也不必 700+，配合灰度（正文 #6B7280）+ 留白
8. 不做全屏背景视频、首屏自动播放、鼠标跟随特效
9. 不只做桌面端：360–414px 逐屏检查字号、溢出与热区
10. 不删聚焦态与可访问性：Tab 焦点环、图片 `alt`、正文 4.5:1，这是最便宜的专业感

> 顺序：定内容 → 定字号阶梯与 8pt 间距 → 定 3–6 色并校验对比度 → 双端排版 → 最后加动效/暗色。
