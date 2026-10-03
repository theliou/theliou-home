# Web 前端设计 Skill 合集

> 收集范围：网上公开的、能直接拿来用的「前端 / 视觉设计类 AI Skill」（SKILL.md 形态）＋ 人类设计师公认的 Web 设计能力清单。
> 目标场景：**开发者技术作品集 · 极简黑白大字排版 · 纯静态站 · Cloudflare 部署 · 想加留言功能**。
> 原文已离线保存到 `skills/` 目录，见 [skills/INDEX.md](skills/INDEX.md)。所有内容均为第三方公开作品，版权归原作者。

---

## 0. 结论先看（TL;DR）

| 阶段 | 用哪个 skill | 为什么 |
| --- | --- | --- |
| 定方向、生成设计 | [Anthropic `frontend-design`](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | 唯一一个把「如何不做出 AI 味」写成硬规则的官方 skill，含两遍自查流程 |
| 上线前自检 | [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md) | 100+ 条可勾选的工程细节（焦点、动画、表单、图片、性能） |
| 走个人主页流程 | [SpaceZephyr/personal-site-builder](https://github.com/SpaceZephyr/personal-site-builder) | 输入规范 + 验收门禁最完整，产出就是纯静态站，天然适配 Cloudflare |
| 找风格模板 | [shengjidaguai-china/personal-homepage-skill](https://github.com/shengjidaguai-china/personal-homepage-skill) | 18 套风格预览 + 1 套 Hero 视频模板，中文场景，含 DESIGN_REVIEW 验收清单 |
| 想加炫技动效 | [github/awesome-copilot · premium-frontend-ui](https://github.com/github/awesome-copilot/blob/main/skills/premium-frontend-ui/SKILL.md) | 满幅 Hero、滚动编排、磁吸交互；**与上面克制路线互斥，只能局部借用** |

**⚠️ 一个必须提前知道的冲突**：Anthropic 官方 `frontend-design` 明确把「近黑背景 + 单一亮色点缀」列为 5 类 AI 味之一，把 `#0B0B0B / #111` 这种"假黑"列为万能模板特征。你选的「极简黑白 + 大字」正好踩在这条线上——不是不能做，而是**必须做出取舍和细节差异**（详见第 7 节）。

---

## 1. 第一梯队：通用前端设计 Skill

### 1.1 Anthropic `frontend-design`（官方 · 首选）

- 仓库：[anthropics/skills](https://github.com/anthropics/skills) → `skills/frontend-design/SKILL.md`（9.4 KB）
- 离线原文：`skills/anthropic-frontend-design/SKILL.md`

**它解决什么**：让 AI 产出的视觉设计「不像模板默认值」。把自己定位成一家以"每个客户都有独特视觉身份"著称的设计工作室的设计主管。

**核心流程（两遍法）**：
1. 用户没点明主题 → 自己提出「主题 + 受众 + 页面首要任务」并确认。
2. 先出**设计计划**：配色（4–6 个命名 hex）、字体（字族与角色）、布局（一句话描述 + ASCII 线框 + 对齐方式）、原则。
3. **对着 brief 自查**：哪一部分"换成同类页面也成立"，就推翻重做，并说明改了什么、为什么。
4. 确认差异化之后才写代码。写 CSS 时注意选择器特异性互相抵消（尤其 `.section` 与 `.cta` 这类，padding/margin 最常出问题）。

**硬规则（可直接抄）**：

| 维度 | 规则 |
| --- | --- |
| 字体数量 | 全页 1–2 个字族；用两个必须明显不同 |
| 字体选择 | 不要用你"在任何项目里都会顺手拿"的默认字体族 |
| 字号体系 | 按 *The Elements of Typographic Style* 建立清晰的字阶，字重/字宽/字距都要有意图 |
| 正文行长 | 默认 < 80 字符；衬线可略长，且行高比无衬线再大一点 |
| 标题排版 | 标题本身就是设计元素，不是内容的"中立传送带" |
| 序列编号 | `01 / 02 / 03` **只在内容真是序列**（步骤、时间线）时才用 |
| 结构装饰 | 边框、分隔线、眉标、编号必须**编码信息**，不做纯装饰 |
| 动效 | 非用户触发的动效要极少；**整页一次编排的入场** 远好于「每节 fade-slide-up + 每卡片 hover」 |
| 克制 | "大胆只花在一处"，其余保持安静；像出门前照镜子摘掉一件配饰 |
| 质量底线 | 移动端自适应、键盘焦点可见、尊重 `prefers-reduced-motion`、对比度可访问、配色和谐 |

**明令禁止的三种排版套路**（生成感最强）：
- 标题里只把**一个词**变成斜体/加粗/换色；
- 标签用**全大写**；
- 内容上方加**多余的排版小标签**。

**5 类"一眼 AI"特征清单**（用来对照自己的方案）：
1. 奶油色底（近 `#F4F1EA`）+ 高对比衬线标题 + 陶土色点缀（近 `#D97757` —— 正好是 Claude 自己的品牌橙，所以在用户 project 上出现就是明显的"AI 指纹"）；
2. 近黑底 + 单一亮荧光绿或朱红点缀；
3. 报刊风：发丝线分隔、零圆角、密集多栏；
4. SaaS 卡片套件：所有内容切成同样的圆角卡片、所有层级同一个圆角、每张卡下面同一种柔和灰阴影 `rgba(0,0,0,.1)`、用渐变做装饰；
5. 万能外壳：每个标题上方都有 tracked-out 全大写眉标；`A · B · C` 中点串；`WORD — 片段` 空格破折号；`#0B0B0B / #111` 假黑冒充纯黑；小数据用等宽字体；链接和按钮末尾加 `→`。

> 关键判据：这些特征**在某些 brief 下是合法的**，问题在于它们是"默认"而不是"选择"，且**与主题无关地出现**。brief 明确要求的方向永远优先。

**写作部分**（很多人忽略，但对个人主页的"关于我"极其有用）：文案是设计内容不是装饰；主动语态；CTA 说清结果（"Save changes" 而非 "Submit"）；同一动作全流程同名；错误不道歉、不含糊；空状态是行动邀请；语气口语化、句子大小写、无废话，每个文字元素只干一件事。

- 个人主页适配度：**★★★★★（首选）**

### 1.2 Vercel Web Interface Guidelines（评审型 · 上线自检）

- 原文：[command.md](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)；JetBrains 收录版：[路径](https://github.com/JetBrains/skills/tree/main/vercel-labs-web-design-guidelines)
- 离线原文：`skills/vercel-web-interface-guidelines.md`
- 定位：**不生成设计，只审已有代码**，逐条输出 `file:line`。

可直接当 checklist 的关键条目：
- **焦点**：必须可见；禁止只写 `outline-none`；用 `:focus-visible`；粘性头/尾不能遮住获焦元素。
- **动画**：只动 `transform` / `opacity`；**禁止 `transition: all`**；必须响应 `prefers-reduced-motion`；自动播放 > 5s 要给暂停控件。
- **排版**：用 `…` 而不是 `...`；弯引号；`10&nbsp;MB` 不换行；数字列用 `tabular-nums`；标题 `text-wrap: balance`。
- **布局**：长文本 `truncate / line-clamp / break-words`；flex 子项加 `min-w-0`；处理空状态。
- **表单**：`autocomplete` + `name` + 正确的 `type/inputmode`；**禁止阻止粘贴**；错误就近显示并聚焦第一个错误。
- **图片**：显式 `width/height`；首屏图 `fetchpriority="high"`。
- **性能**：> 50 项列表虚拟化；渲染期禁止读布局。
- **交互**：破坏性操作要确认或可撤销；状态写进 URL。
- **反模式 flag 清单**：`user-scalable=no`、阻止 `onPaste`、`div onClick` 做导航、大数组 `.map()` 不虚拟化、无 label/无 `aria-label`、硬编码日期、无理由 `autoFocus`、该用视频却用 GIF、只有手势没有键盘替代。
- 个人主页适配度：**★★★★★（作为验收清单）**

### 1.3 GitHub `awesome-copilot` 的两个设计 skill

**[premium-frontend-ui](https://github.com/github/awesome-copilot/blob/main/skills/premium-frontend-ui/SKILL.md)**（离线：`skills/github-premium-frontend-ui/SKILL.md`）
- 禁白屏，必须预加载入场；Hero 用 `100vh / 100dvh` 满幅，标题按词/字符拆 `span`；导航随滚动方向显隐；GSAP ScrollTrigger 做固定容器、横转纵、视差；磁吸按钮、`lerp` 光标。
- 数值：标题 `clamp()` 到 `12vw`，正文 ≥ 16–18px；噪点用 `mix-blend-mode: overlay` 透明度 0.02–0.05；`backdrop-filter: blur()` + 极细半透明边框；重效果包在 `@media (hover:hover) and (pointer:fine)` 里。

**[web-design-reviewer](https://github.com/github/awesome-copilot/blob/main/skills/web-design-reviewer/SKILL.md)**（离线：`skills/github-web-design-reviewer/SKILL.md`）
- 截图 + DOM 巡检后回到源码修；视口 375 / 768 / 1280 / 1920；溢出、重叠、移动端不可用、对比度不足、无焦点态 = High；同一问题修 > 3 次必须停下来问用户；一次只修一个问题并复验。

> ⚠️ `premium-frontend-ui` 的"满幅 + 磁吸 + 预加载"与 Anthropic 的"克制 + 摘掉一件配饰"是**两条互斥路线**。全都要 = 又一种 AI 味。选一条当主线。

### 1.4 JetBrains `frontend-design`（旧版副本）

- [JetBrains/skills · frontend-design](https://github.com/JetBrains/skills/blob/main/frontend-design/SKILL.md)（离线：`skills/jetbrains-frontend-design/SKILL.md`）
- frontmatter 自标 `author: Anthropic`，实际是 Anthropic **旧版**的逐字副本（4.6 KB vs 新版 9.4 KB），缺少 hex 阈值、5 类清单、80 字符行长与两遍自查。
- 仍然值得抄的独有内容：**字体黑名单**（禁 Inter / Roboto / Arial / 系统字体，点名 Space Grotesk 已成新套路）、禁白底紫渐变、"对比色 > 均匀配色"、"独特展示体 + 精致正文体"、每次生成不得收敛到同一个风格。

### 1.5 shadcn/ui 官方 skill（工程型，非审美）

- [skills.mdx](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/(root)/skills.mdx)（`npx skills add shadcn/ui`）
- 靠 `components.json` 激活，用 `shadcn info --json` 注入框架/别名/图标库/已装组件信息，强制组件组合规则（表单用 `FieldGroup`、选项用 `ToggleGroup`、只用语义色），生成前先 `shadcn docs/search`。
- 适合用 React + Tailwind 做站时使用；纯静态 HTML 用不上。

### 1.6 Anthropic skills 仓库里其它相关 skill

| Skill | 作用 | 可复用点 |
| --- | --- | --- |
| `canvas-design` | 生成海报/艺术 PNG-PDF | 先写 1–2 词"运动名" + 4–6 段设计哲学再动手；成品 90% 视觉 10% 文字；文字禁溢出/重叠且必须留边距；定稿只精修不加元素 |
| `algorithmic-art` | p5.js 生成艺术 | 必须设 `randomSeed/noiseSeed`（同种子同结果）；必须从 `templates/viewer.html` 原样起步，只改算法与参数控件 |
| `brand-guidelines` | Anthropic 自有品牌规范 | Dark `#141413` / Light `#faf9f5` / 灰 `#b0aea5`·`#e8e6dc`；橙 `#d97757`、蓝 `#6a9bcc`、绿 `#788c5d`；标题 Poppins / 正文 Lora（回退 Arial、Georgia）——注意 `#d97757` 正是 `frontend-design` 点名的 AI 味信号，别照抄 |
| `theme-factory` | 10 套预设主题（Ocean Depths … Midnight Galaxy） | 先展示让用户选，再套用；**与 frontend-design 的"禁模板默认"冲突**，只在自己没风格主张时用 |
| `web-artifacts-builder` | React 18 + Vite + Tailwind + shadcn/ui 打成单文件 HTML | 禁令：避免过度居中、紫渐变、统一圆角、Inter —— 与 frontend-design 一致 |
| `webapp-testing` | Playwright 自动化 | 先跑 `--help` 再调脚本、不要先读源码；动态页先等 `networkidle` 再查 DOM |

### 1.7 共识与分歧（跨 skill 总结）

**共识**：
1. 禁 Inter / Roboto / Arial / 系统字体，禁白底紫渐变；
2. 只动 `transform` / `opacity`，禁 `transition: all`，尊重 reduced motion；
3. 动效少而精，一次编排优于散点效果；
4. 无障碍是底线：焦点可见、`aria-label`、图片 alt + 尺寸、键盘可用；
5. 文案是设计内容：主动语态、按钮具体、错误给下一步；
6. 风格不得跨项目/跨次收敛到同一个默认。

**分歧**：
1. **审美**：Anthropic 要克制；旧版与 `premium-frontend-ui` 要满幅 + 预加载 + 磁吸（后者会造出另一种 AI 味）；
2. **字体**：新版"1–2 族且明显不同" vs 旧版"必须独特展示体配对"；
3. **预设主题**：`theme-factory` / 品牌规范要求严格套用 vs `frontend-design` / Vercel 禁模板默认；
4. **定位**：生成好看 vs 代码合规；
5. **粒度**：Vercel 细到 `min-w-0` / `tabular-nums`，Anthropic 只到"< 80 字符 / 4–6 hex"。

---

## 2. 个人主页 / 作品集专用 Skill

### 2.1 [shengjidaguai-china/personal-homepage-skill](https://github.com/shengjidaguai-china/personal-homepage-skill)（中文 · 推荐）

- **输入**：身份、受众、目标、项目、联系方式、可选视觉参考。缺项只做"诚实占位"，**绝不编造指标与评价**。
- **产出**：`SKILL.md` 只做模式路由；主页模式产出连续响应式站，可选**单文件 HTML**（内嵌编辑/导出/本地保存）、React + Tailwind 骨架或完整模板；另有独立的 16:9 HTML PPT 模式。
- **独特**：18 套风格预览 + 1 套完整 Hero 视频模板（合称"19"）；`scripts/find-template.mjs` 用中文检索词查 `assets/template-index.json` 选模板；**参考优先**，用户没指定才替其选型。
- **验收清单** `DESIGN_REVIEW.md`：身份/证据/CTA 清晰、CJK 字体回退、移动端不依赖 hover、二维码不裁切且保留留白、reduced-motion 有降级、无横向溢出；`npm run check` 校验文档引用与模板索引。
- 适配度：**高**。想要"能双击打开的便携 HTML"和中文排版细节，这个是首选。

### 2.2 [SpaceZephyr/personal-site-builder](https://github.com/SpaceZephyr/personal-site-builder)（中文 · 流程范本）

- **输入**（`references/intake.md`）：最小四项 = 简历/自我介绍、一个社交或作品地址、网站用途、希望访客做的一个动作；再渐进追问（目标 → 受众 → 主行动 → 3 件代表作 → 你的角色与结果 → 不能公开什么 → 谁多久更新一次）。**能自己读的先读**（简历/GitHub/博客），遇到登录墙立即停止。
- **产出**：纯静态 HTML/CSS/JS，每页独立 `index.html`，共用 `site.css` + `nav.js`，**不用 CDN / 框架 / 构建**，可直接部署 Cloudflare Pages / Vercel / GitHub Pages。
- **独特**：双轴架构（网站目标 × 内容深度 L1 单页名片 / L2 证明页 / L3 内容系统）；风格三路径（采样参考站的 computed style / 用品牌 DESIGN.md / 6 套内置风格），**只改 `:root` 变量**；`delivery-checklist.md` 覆盖五档宽度 360/390/768/1280/1440、对比度 ≥ 4.5:1、公开信息逐项确认、授权后才部署并回访生产 URL。
- 适配度：**高**。你的技术栈（纯静态 + Cloudflare）与它完全一致，建议直接照抄它的流程与验收门禁。

### 2.3 [debgotwired/website-builder-skill](https://github.com/debgotwired/website-builder-skill)（英文 · 模板最多）

- 输入：职业 + 亮/暗偏好，可导入 LinkedIn PDF、简历、Twitter。
- 产出：从 `clean-and-personal` 模板库改造为整站，附 Vercel 部署指引。
- 独特：**61 个模板分 6 类**（核心 01–10、2026 趋势 Bento/玻璃拟态/Y2K/粗野主义、职业作品集 22–30、版式创新 31–40、目的驱动 41–50、高端 51–61）；先推荐 2–3 套再对话式改色改字体。
- 适配度：**中高**。选型快，但缺内容质量与验收规则。

### 2.4 [prPMDev/my-portfolio-kit](https://github.com/prPMDev/my-portfolio-kit)（英文 · 文案与合规）

- 不是模板，而是一组 Claude Code 技能：builder 侧 `/setup` `/content-strategist` `/story-adapter` `/anonymizer` `/portfolio-copywriter` `/website-expert` `/update`；评估侧 `/voice-guardian` `/web-content-optimizer` `/quality-check`。
- 独特：**builder voice**（写"交付了什么"而不是"负责了什么"）+ 内建匿名化（保护涉密工作内容同时保留影响力）。
- 适配度：**中高**。文案环节可复用，视觉最弱。

### 2.5 [ArthurZakirov/ProofStack · reader-first-portfolio-architecture](https://github.com/ArthurZakirov/ProofStack/tree/main/skills/reader-first-portfolio-architecture)（英文 · 信息架构）

- 产出信息架构规范与首页顺序：Hero 一句话权威 → Guides（直接列标题与状态）→ Tools → Results & Track Record → 评价 → 联系方式。
- 独特：把通用栏目改成"读者收益"（Blog → Guides、Projects → Tools、Resume → Results）；禁止没有内容的 "Explore more" 卡片，禁止把价值藏在 Tab 后面。
- 适配度：**中**。不生成页面，但能治好"作品集 = 缩略图墙"的通病。

### 2.6 [Jane-xiaoer/feishu-portfolio-launch](https://github.com/Jane-xiaoer/feishu-portfolio-launch)（中文 · 数据源驱动）

- 输入：飞书多维表格链接 + 风格 + DNS 确认；需 lark-cli / Node 18 / Python 3 / gh。
- 产出：瀑布流 + 分类筛选 + 点击播放的作品集站；`refresh.py` + GitHub Actions **每 12h 刷新飞书临时链接**；一键上 GitHub Pages，可绑自定义域名。
- 适配度：**中**。作品都存飞书时价值极高，否则不适用。

### 2.7 [CoderWanFeng/wanfeng-skills · personal-website-builder](https://github.com/CoderWanFeng/wanfeng-skills/tree/main/skills/personal-website-builder)（中文 · 工程化最扎实）

- 输入：5 轮对话，每轮只问 1 个（类型 → 技术栈 → 基础信息 → 目录 → 确认，必须等用户明确说"确认"）。
- 产出：按类型 init 生成 Hexo/Butterfly 博客、VitePress 知识库、Vue3 导航站、纯 HTML 作品集、单文件 HTML 简历，并自动起本地预览。
- 独特：`validate-path.sh` 拒绝系统目录、`pick-dirname.sh` 防覆盖、`placeholders.md` 单一权威占位符、`tests/smoke.sh` 端到端冒烟。
- 适配度：**中高**。以后想从单页升级成博客/知识库时用它。

### 2.8 这些 skill 的共性套路（可直接执行的 7 步）

1. **定边界**：新建还是改造？给谁看？看完要他做的**一个**动作是什么？——这一步不问颜色和字体。
2. **收资料**：能自己读的先读（简历 / GitHub / 博客）；每轮只问 1 个最卡住的问题；回一份「已证实 / 待确认 / 缺失 / 建议补」清单，用户确认后再往下。
3. **定层级**：目标（求职 · 作品集 · 介绍 · 记录 · 获客）× 内容深度（L1 单页名片 / L2 首页+详情 / L3 内容系统）；资料不够就降级，**不造空栏目**。
4. **定风格**：先索要参考链接或截图，提取"气质"（配色/字体/圆角/间距），**只改设计变量**，不克隆 Logo、文案、插画与独创版式；没有参考才从模板库挑 2–3 套并给出明确推荐。
5. **生成**：首屏必须有「姓名/称呼 + 定位 + 唯一主行动」；作品写清 问题 → 我的角色 → 做法 → 结果；社交链接注明"在这里能看到什么"；用真图。
6. **自查**：360 / 390 / 768 / 1280 / 1440 五档；无横向滚动与重叠；最长标题不溢出；对比度 ≥ 4.5:1；键盘可达；alt 完整；reduced-motion 降级；亮暗双主题可读；无 TODO / 虚构数字 / 测试链接。
7. **交付部署**：本地预览确认 → 授权后才发布（并列出将公开的联系方式）→ **访问生产 URL 复核**，而不是只看部署命令成功。

### 2.9 动手前必须备好的信息清单

- **定位**：姓名/常用称呼、一句话身份、目标岗位与求职状态、现居城市（精度自定）
- **受众与目标**：主要给谁看、看完要做的**一个**动作（投递 / 联系 / 订阅 / 购买）
- **公开边界**：公开邮箱/微信/渠道；明确**不公开**项（住址、私人电话、客户材料、保密项目）
- **证据**：3 件代表作或经历，各配 问题 / 我的角色 / 做法 / 结果；可验证数字（用户量、Star、粉丝、阅读量，注明口径）
- **社交与内容**：各平台主页 URL + 能够展示的东西 + "在这里能看到什么"；3–5 篇代表作链接
- **资产**：头像/工作照、项目截图或 Demo、视频、二维码（不裁切）
- **视觉参考**（强烈建议）：1–2 个喜欢的网站链接或截图，并说明具体喜欢哪一点
- **运维**：站点语言、是否已有域名、部署平台偏好、以后谁以什么频率更新

---

## 3. 人类设计师的 Web 设计能力清单（硬指标版）

> 完整版见同目录 [personal-homepage-design-skill-checklist.md](personal-homepage-design-skill-checklist.md)。下面只留最可执行的数值。

### 3.1 必须会

| 能力 | 可照抄的数值 |
| --- | --- |
| 字号阶梯 | 正文 16px；比例 1.25 或 1.333 → 13/16/20/25/31/39/49；全站 ≤ 5–6 档 |
| 行高与行长 | 正文 1.5–1.7、标题 1.1–1.2；英文 45–75 字符（`max-width: 65ch`），中文 ≤ 40 字/行；字越大行高倍数越小 |
| 间距系统 | 8pt 网格：4/8/12/16/24/32/48/64/96；**区内边距 < 区间距**，靠"一大一小"形成分组 |
| 视觉层级 | 每屏 1 个主角；尺寸差 ≥ 1.5 倍 + 字重差 ≥ 200 + 灰度差组合；弱化次要内容，而不是把主角加粗成黑块 |
| 色彩 | 60-30-10，全站 3–6 色；正文对比 ≥ 4.5:1，≥ 24px 大字或 ≥ 18.5px 粗体 ≥ 3:1，图标/边框 ≥ 3:1；灰阶掺一点主色相 |
| 响应式 | 正文容器 640–800px；断点 640/768/1024/1280；触控热区 ≥ 24×24px（重要按钮 44×44） |
| 内容结构 | 首屏一句"你是谁 + 做什么 + 凭什么"；全页 4–6 个 section，每个 3–5 条要点 |
| 一致性 | 圆角 2 档、阴影 2–3 档；按钮/链接/hover 全站统一 |
| 性能底线 | 图片 WebP + 固定宽高比；字体 2 个字重 + `swap`；LCP < 2.5s、CLS < 0.1 |

### 3.2 加分项

- **动效**：只用 `transform`/`opacity`，150–300ms，缓动 `cubic-bezier(.4,0,.2,1)`，位移 ≤ 24px，尊重 `prefers-reduced-motion`。
- **暗色模式**：语义色 token（`--bg/--surface/--text/--accent`），正文对比 ≥ 7:1，近黑替代纯黑。
- **设计 token**：把字号、间距、颜色写成 CSS 变量（`--space-4: 16px`、`--text-muted`）——这是"设计系统"落到代码的最小可用形态，改一处全站一致。
- **Bento grid**：圆角与间距统一，子项按 1×1 / 2×1 / 2×2 排，移动端回退成一列。**单色系 + 大字排版**靠字重、字距（大标题 `-0.02em`）与留白撑气场——正好是你的路线。

### 3.3 资源清单

**学习**：[Refactoring UI](https://refactoringui.com/)（开发者视角的设计策略书，目录≈本节大纲）· [Laws of UX](https://lawsofux.com/) · [Material 3 Grids & spacing](https://m3.material.io/foundations/layout/grids-spacing/spacing) · [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography) · [WCAG 2.2 对比度](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [WCAG 2.2 目标尺寸](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · [The 8-Point Grid](https://spec.fm/specifics/8-pt-grid)

**工具**：[Typescale](https://typescale.com/)（字号阶梯导出 CSS）· [Realtime Colors](https://www.realtimecolors.com/)（配色+字体铺到真实页面，带对比度提示与 Tailwind 导出）· [Fontpair](https://fontpair.co/) · [Coolors](https://coolors.co/) · [Google Fonts](https://fonts.google.com/)

**灵感站**：[Awwwards](https://www.awwwards.com/) · [Recent（原 godly.website）](https://recent.design/) · [One Page Love](https://onepagelove.com/)（重点看 [Personal](https://onepagelove.com/genre/personal)、[Portfolio](https://onepagelove.com/genre/portfolio)、[Minimal](https://onepagelove.com/style/minimal)、[Typographic](https://onepagelove.com/style/typographic)）

### 3.4 10 条避坑

1. 不用"蓝紫渐变 + 发光卡片 + 玻璃拟态"三件套——最典型的"一眼 AI"。
2. 正文不占满屏：1920px 上一行 150 字符没法读，容器锁 640–800px。
3. 超过两行的文字不居中，长段落一律左对齐。
4. 不用 emoji 当图标，换同一线宽、16/20/24px 的一套线性图标。
5. 不留 lorem ipsum、"Your Name"、示例头像；宁可少一个 section。
6. 不给每个元素都加边框和阴影，层级优先用间距与底色差。
7. 不只靠字号表达层级；标题不必 700+，配合灰度（次要文字 `#6B7280`）+ 留白。
8. 不做全屏背景视频、首屏自动播放、鼠标跟随特效（除非你只保留这一个"大胆点"）。
9. 不只做桌面端：360–414px 逐屏检查字号、溢出与热区。
10. 不删聚焦态与可访问性：Tab 焦点环、图片 `alt`、正文 4.5:1——最便宜的专业感。

> 推荐顺序：**定内容 → 定字号阶梯与 8pt 间距 → 定 3–6 色并校验对比度 → 双端排版 → 最后才加动效/暗色**。

---

## 4. Cloudflare 部署 + 留言功能方案

### 4.1 部署方式（2026 年现状：别新建 Pages 项目）

Cloudflare 官方现在在 [Pages 文档首行](https://developers.cloudflare.com/pages/) 挂了提示：**新项目请直接用 Workers**。Pages 没有下线、没有更名，但进入"维护 + 迁移"状态，官方给了[迁移指南](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)。

| 方式 | 机制 | 免费额度 | 关键限制 |
| --- | --- | --- | --- |
| Pages 直传 | `wrangler pages deploy <dir>` 或控制台拖拽 zip | 动态请求计入 Workers 免费额度 | 拖拽仅 1000 文件（Wrangler 2 万）、单文件 25 MiB；**直传项目无法事后切 Git 集成**；**拖拽部署不支持 `functions/` 目录** |
| Pages 连 Git | 推分支自动构建 + 预览部署 | 500 次构建/月、单次 20 分钟 | 最省心，但绑定 Git 平台 |
| **Workers Static Assets**（推荐） | `wrangler deploy` + `assets.directory` | **静态资源请求免费且不限量**，Worker 脚本 10 万请求/天 | 需 `wrangler.jsonc`；SPA/404 行为**必须显式配置** `not_found_handling` |

自定义域名：控制台一键接入，自动签发/续期 Universal SSL。**裸域（`example.com`）要求域名 NS 托管在 Cloudflare**；子域可用 CNAME。注意差异：Pages 支持 NS 不在 Cloudflare 的域名（走 CNAME），**Workers 不支持**。

### 4.2 留言方案对比

| 方案 | 前置条件 | 后端 | 数据在哪 | 垃圾防护 | 难度 |
| --- | --- | --- | --- | --- | --- |
| **giscus**（首选） | 公开 GitHub 仓库 + 开 Discussions + 装 giscus App | 无 | GitHub Discussions | GitHub 账号门槛 + moderation（可先审后显） | **1** |
| utterances | 同上，用 Issues | 无 | GitHub Issues | 同上（更弱） | 1 |
| Waline | 需 Node 服务端 + 数据库 | 有 | 自选 | 内置 Akismet、审核 | 3 |
| Workers + D1 自写 | CF 账号 + Wrangler + D1 | 有 | 自己的 D1 | 需自己接 Turnstile + 限流 | 3–4 |
| Twikoo / Cusdis / Supabase | 各自需 Mongo/Postgres 或外部项目 | 有 | 外部 | 部分内置 | 3 |

- **Waline 的 Cloudflare 路径要打折扣**：官方[部署文档](https://waline.js.org/guide/deploy/)只有 Vercel / Netlify / Railway / Zeabur / CloudBase / 阿里云 / 百度 CFC / 独立 VPS，**没有 Cloudflare 官方条目**，仓库也无 CF 适配包，目前只有社区方案（如 [Waline_On_Worker](https://github.com/lsy-404/Waline_On_Worker)）。

### 4.3 推荐结论

**首选 giscus。** 对"开发者作品集 + Cloudflare + 零运维"它几乎是完美解：静态站**零改造**，无数据库、无限流、无冷启动、无 CORS，维护成本≈0。前提只是"你有公开仓库并愿意让访客用 GitHub 登录"——对技术受众来说这甚至是加分项。垃圾评论、审核、隐私全部由 GitHub 承担。

**备选：Workers Static Assets + D1 最小留言 API**（只有当你需要"访客无需 GitHub 账号也能留言"时才做）。官方有可直接照抄的教程：[Build a Comments API](https://developers.cloudflare.com/d1/tutorials/build-a-comments-api/)。要点：
- `wrangler d1 create` 建库并绑定 `DB`；
- schema 只要 `comments(id, author, body, post_slug, status, created_at)`，并**给 `post_slug` 建索引**（D1 按扫描行数计费，索引直接省钱）；
- `GET /api/comments?slug=` 用 `DB.prepare(...).bind(slug)` 参数化查询；`POST` 校验长度后写入并默认 `status='pending'`。

**不推荐**把 Waline/Twikoo 架到 Cloudflare 当首选：多一个运行时、多一个数据库，换来的表情/邮件通知对个人主页收益很小。

### 4.4 注意事项

1. **CORS**：自写 API 不要 `cors()` 全放开，白名单自己的域名；同域部署干脆不需要。
2. **限流**：`ratelimits` 绑定是**每个 Cloudflare 节点本地计数**，跨节点不精确，属"防刷"而非精确计费；文档不建议用 IP 作 key。**该绑定是 Workers 独有，Pages 不支持**——这又是选 Workers 的理由。
3. **人机校验**：Turnstile secret 只放服务端 secret；Turnstile 免费版**无限次验证、最多 20 个 widget**。
4. **D1 免费额度**：500 万行读/天、10 万行写/天、5GB；**一次 INSERT 会因索引额外计 1 行写**；超额**直接报错**而不是降级。
5. **部署方式会变**：纯静态时拖拽即可；**一旦要加 API，拖拽不再支持 `functions/`**，必须改用 Wrangler（或迁到 Workers 配 `main` + `assets.directory`）。
6. **Pages → Workers 迁移残留**：`_worker.js` 要移出静态目录或写进 `.assetsignore`；Workers 默认**静态优先**，需 `run_worker_first` 才反转。
7. **额度熔断**：用 `run_worker_first` 时，超出免费请求量会返回 429 而**不回退到静态资源**——线上要把匹配模式收窄。

---

## 5. 给你的个人主页落地方案

你的约束：**开发者技术作品集 · 极简黑白 + 大字排版 · 纯静态 · Cloudflare 部署 · 想要留言功能**。

### 5.1 先说风险：你的风格正好踩在 AI 味清单上

Anthropic 官方清单里的第 2 条（近黑底 + 单一荧光/朱红点缀）和第 5 条（`#0B0B0B / #111` 假黑、小数据等宽体、全大写眉标、链接加 `→`）几乎就是"极简黑白大字"的默认写法。所以这个风格**能做，但必须做出差异**：

| 别这么做 | 改成 |
| --- | --- |
| `#0B0B0B`/`#111` 当黑 | 真黑 `#000`，或明确有倾向的深色（如冷调 `#0C0F14`），并在注释里说明理由 |
| 每个标题上方一行 tracked-out 全大写小标签 | 直接删掉；需要分组就用**真实的年份 / 阶段名**当结构信息 |
| 小标签用等宽字体 | 等宽只在**代码、版本号、技术栈**这类真数据上用 |
| 链接/按钮结尾加 `→` | 去掉箭头；用下划线粗细或字重变化表达可点 |
| 装饰性 `01 / 02 / 03` | 你的经历/项目本身是时间序列时才编号，否则不编 |
| 樱花奶油底 `#F4F1EA` + 陶土色 `#D97757` | 纯白 `#FFFFFF` 或极浅冷灰 `#FAFAFA`；强调色就**用黑本身** |

**"大胆只花一处"**：把它花在**首屏那行大字**上（超大字号 + 紧行高 + 精确字距），其余部分保持安静、克制、无装饰。这比"到处加动效"高级得多。

### 5.2 两套可直接用的设计 token

**方案 A · 浅色排版至上（推荐）**——杂志感，黑白对比靠字号与留白，不靠颜色。

**方案 B · 暗色高对比**——把 `--bg` 换成 `#000000`、`--fg` 换成 `#FAFAFA`、`--line` 换成 `#222`，其余不变；**不要**配荧光绿/朱红强调色。

```css
:root{
  /* 色彩：全部中性，强调色就是"黑" */
  --bg:#FFFFFF;  --surface:#FAFAFA;
  --fg:#0A0A0A;  --fg-muted:#6F6F6F;   /* 次要文字靠灰度，不靠加粗 */
  --line:#E5E5E5;
  --accent:#0A0A0A;

  /* 字体：避开 Inter / Roboto / Arial / 系统字体 / Space Grotesk */
  --font-display:"Fraunces","Noto Serif SC",Georgia,serif;
  --font-body:"IBM Plex Sans","Noto Sans SC",sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;

  /* 字号阶梯：比例 ≈1.25，全站只用这几档 */
  --step--1:.875rem; --step-0:1rem;  --step-1:1.25rem; --step-2:1.5625rem;
  --step-3:1.9375rem; --step-4:2.4375rem; --step-5:3.0625rem;

  /* 间距：8pt 网格 */
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-6:24px; --space-8:32px; --space-12:48px; --space-16:64px; --space-24:96px;

  /* 度量 */
  --measure:65ch;      /* 英文行长 ≤75 字符；中文段落另设 max-width:38em */
  --container:720px;   /* 正文容器 640–800px，禁止通栏 */
  --radius:2px;        /* 只留一档圆角，或干脆 0 */
}

/* 首屏大字：唯一的"大胆点" */
.hero h1{
  font-family:var(--font-display);
  font-size:clamp(2.5rem,8vw,6rem);
  line-height:.98;             /* 大字行高要比正文小 */
  letter-spacing:-.03em;       /* ⚠️ 仅对拉丁字母；纯中文标题改 0 或 -.005em */
  text-wrap:balance;           /* Vercel 规则：标题用 balance */
  font-weight:600;
}
h2{ font-size:var(--step-3); line-height:1.15; letter-spacing:-.01em; }
body{ font-size:var(--step-0); line-height:1.65; color:var(--fg); background:var(--bg); }
p{ max-width:var(--measure); }
:focus-visible{ outline:2px solid var(--accent); outline-offset:2px; }  /* 焦点态必须有 */
@media (prefers-reduced-motion:reduce){ *{ animation:none!important; transition:none!important; } }
```

**中东文字无关但对你很关键的两条 CJK 细节**：
1. **负字距只给拉丁字母**。中文标题收紧字距会把字挤在一起，中文标题用 `letter-spacing: 0` 到 `-0.005em` 之间。
2. **中文字体文件极大**（Noto Sans SC 全量 10MB+）。用 Google Fonts（自动按 unicode-range 切片）或 fontsource 做子集；`font-display: swap`；只加载 2 个字重。否则首屏 LCP 直接崩——这是"大字排版"最容易被忽略的坑。

### 5.3 页面结构（5 个 section 足够）

1. **Hero**：姓名 + 一句话身份 + **唯一主行动**（Email 或 GitHub，只放一个主按钮，其余做成弱化链接）。大字只花在这里。
2. **Selected Work**：3 件（不是 10 件），每件写清 **问题 → 我的角色 → 做法 → 结果**，带可验证数字（Star、用户量、性能提升，注明口径）。用真图。
3. **About / Stack**：短。技术栈用等宽字体（这是等宽唯一的正当用途），但不堆成徽章墙。
4. **Writing**（可选）：3–5 篇代表作链接；没有就不放，**不造空栏目**。
5. **Guestbook / Contact**：留言区 + 联系方式（注意只放你愿意公开的）。

### 5.4 你的部署 + 留言最小路径

```
纯静态 HTML/CSS/JS（无构建）
  └─ wrangler.jsonc: { "assets": { "directory": "./public" } }   ← Workers Static Assets
  └─ npx wrangler deploy                                          ← 静态请求免费不限量
  └─ 留言：giscus（GitHub Discussions），把 <script> 贴进页面即可，零后端
```
- 想要"任何人不用 GitHub 账号也能留言" → 换成 Workers + D1 自写 API（见第 4 章，官方教程可照抄）。
- 上线前拿第 1.2 节的 Vercel 清单过一遍 + 第 3.4 节的 10 条避坑。

### 5.5 建议的下一步（三选一，告诉我哪个）

1. **直接产出原型**：我按方案 A 生成一个单文件 `index.html`（响应式、含 giscus 占位、可直接双击预览），你再基于真实内容改。
2. **先比风格**：我出 2–3 套方案（配色 / 字体 / ASCII 线框）给你选，选定再写代码。
3. **先给资料**：你把姓名、一句话身份、3 个项目（问题/角色/做法/结果）、联系方式发我，我按真实内容生成——这是所有个人主页 skill 共同的第一步，效果远好于先写代码后填空。

---

## 6. 附录：社区 Skill 合集与目录（扩充选装清单）

> 这一节是"还能装什么"。主表来自中英文各合集仓库（[datawhalechina/ai-skills-for-everyone](https://github.com/datawhalechina/ai-skills-for-everyone)、[Pupok462/awesome-claude-code-skills](https://github.com/Pupok462/awesome-claude-code-skills)、[enhansome/enhansome-claude-code-skills](https://github.com/enhansome/enhansome-claude-code-skills)、[The-Gabri/design-skills](https://github.com/The-Gabri/design-skills)、[ranbot-ai/awesome-skills](https://github.com/ranbot-ai/awesome-skills)、[ezra-y/awesome-claude-ui-armory](https://github.com/ezra-y/awesome-claude-ui-armory)、[Myparjna/myparjna-skills](https://github.com/Myparjna/myparjna-skills)）。
> ⚠️ 标注 ★ 的小仓库条目来自合集 README 的转述，未逐个核验；`ui-ux-pro-max` 的归属在不同合集里相互矛盾（有的标 Official，有的指向 skills.sh/nextlevelbuilder），**存疑**。

### 6.1 值得关注的选装 skill

| Skill | 来源 | 作用 | 类型 | 推荐 |
| --- | --- | --- | --- | --- |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | 不像 AI 默认模板 | 视觉设计 | ★★★★★ |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) | 100+ 条最佳实践审 UI | 评审 | ★★★★★ |
| `web-artifacts-builder` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | React+TS+Vite+Tailwind+shadcn 脚手架 → 单文件 HTML | 前端实现 | ★★★★ |
| `theme-factory` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/theme-factory) | 10 套预设主题一键换肤 | 设计系统 | ★★★★ |
| `canvas-design` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/canvas-design) | 海报/视觉稿 PNG·PDF，内置 30+ 字体 | 视觉设计 | ★★★★ |
| `frontend-ui-engineering` | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/tree/main/skills/frontend-ui-engineering) | 组件结构、状态、空态/错误态、可访问性 | 前端实现 | ★★★★ |
| `frontend-dev` | [MiniMax-AI/skills](https://github.com/MiniMax-AI/skills/tree/main/skills/frontend-dev) | 高视觉首页/营销页 + 本地媒体资产 | 视觉+动效 | ★★★★ |
| `ui-ux-pro-max` | [skills.sh/nextlevelbuilder](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) | 50+ 风格、161 配色、57 字体对、99 条 UX 规则 | 设计系统 | ★★★★（归属存疑） |
| `emilkowalski/skill` | [skills.sh](https://skills.sh/emilkowalski/skill) | 交互/动效品味（Emil Kowalski） | 动效 | ★★★★ |
| `make-interfaces-feel-better` | [skills.sh](https://skills.sh/jakubkrehel/make-interfaces-feel-better) | 圆角/阴影/间距/对齐的细节打磨 | 视觉设计 | ★★★★ |
| `frontend-design-ultra` | [Myparjna/myparjna-skills](https://github.com/Myparjna/myparjna-skills) | 中文"前端设计总监"：38 文件、按页面形态分流工作流 | 设计系统 | ★★★★ |
| `online-fonts-icons` | [Myparjna/myparjna-skills](https://github.com/Myparjna/myparjna-skills) | **45 款中文字体 CDN** + 5 套图标库 | 设计系统 | ★★★★ |
| 70 套风格化 skill（`apple-liquid-glass`、`material-3`、`linear`、`stripe`、`neo-brutalism`、`bauhaus`…） | [The-Gabri/design-skills CATALOG](https://github.com/The-Gabri/design-skills/blob/main/CATALOG.md) | 每个含 `SKILL.md`+`demo.html`，按风格直接出页面 | 视觉设计 | ★★★★ |
| `tailwind-design-system` | [wshobson/agents](https://skills.sh/wshobson/agents/tailwind-design-system) | CSS-first 设计系统 + OKLCH 色彩 | 设计系统 | ★★★ |
| `web-accessibility` | [supercent-io/skills-template](https://skills.sh/supercent-io/skills-template/web-accessibility) | 对比度、键盘、语义结构审查 | 评审 | ★★★ |
| `remotion-best-practices` | [remotion-dev/skills](https://github.com/remotion-dev/skills) | 用 React 生成视频 | 动效 | ★★★★ |
| `anti-ui-slop` / `tasteful-ui-skill` / `web-design` | [ezra-y/awesome-claude-ui-armory](https://github.com/ezra-y/awesome-claude-ui-armory)、[ranbot-ai](https://github.com/ranbot-ai/awesome-skills) | 反「AI 味」、先探索视觉方向 | 视觉设计 | ★★★ |
| `taste-skill` / `getdesign` / `design-system-stack` | [ezra-y 索引](https://github.com/ezra-y/awesome-claude-ui-armory) | URL → 截图+DOM → 提取设计 tokens / taste DNA | 评审/设计系统 | ★★★ |
| `ui-setup` / `ui-page` / `ui-update` | [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills/blob/main/skills/ui-setup/SKILL.md) | StyleSeed UI/UX 包：初始搭建、出页、更新 | 前端实现 | ★★★ |

### 6.2 社区公认「最值得装」的 5 个

1. **`anthropics/skills@frontend-design`** —— 唯一被中英文所有合集同时放在第一档的 skill。
2. **`vercel-labs/agent-skills@web-design-guidelines`** —— 唯一能当"UI 评审员"的高频项，补上生成类 skill 缺的自检能力。
3. **`theme-factory` + `canvas-design`** —— 换肤成本极低、见效最快。
4. **`shadcn/ui@shadcn` + `tailwindcss` / `tailwind-design-system`** —— 组件与样式底座（用 React 时）。
5. **工程或评审二选一**：`addyosmani/agent-skills@frontend-ui-engineering`（真实项目接线）或 `taste-skill`（URL → 设计 DNA 的闭环评审）。

### 6.3 中文社区 vs 英文社区的差异

- **选品口径**：datawhale 只收 4 个前端/设计 skill，全部来自知名大仓库，按「最省心 / 进阶 / 可改造 / 高级视觉补充」分槽位；英文合集按场景分栏（设计·UI / 前端开发 / 动效 / 无障碍 / 分组合集），并大量收录 ⭐1–⭐800 的小仓库与 skills.sh 市集条目。
- **安装方式**：中文侧重"把 `SKILL.md` 复制到 Agent 可读位置"+ 核对 license/风险；英文全是 `npx skills add owner/repo@skill` 一键装，并给"必装 > 强推 > 好用 > 可选"四级标签。
- **覆盖面**：中文设计类几乎只覆盖"生成一个网页"；设计系统、评审、动效、无障碍基本空白。英文已细分到设计 token、无障碍审计、动效、品牌，甚至有 iOS/SwiftUI 专区。
- **中文独有**：`harmony-os-ux-guide`（鸿蒙 163 篇官方 UX 规范）、`online-fonts-icons`（中文字体/图标 CDN）、`frontend-design-ultra`（38 文件工作流）——英文合集没有同类项。
- **最大共识**：`frontend-design` 是唯一被所有合集放在第一档的 skill；中英文都强调"避免 AI 模板感"。

### 6.4 本次调研未取到的部分（如实说明）

- `ranbot-ai/awesome-skills` 的完整 `skills/` 清单：目录 API 多次超时，只拿回 A–`ap` 段 446 条。
- GitHub API 后续触发限流（HTTP 403），部分路径未核验。
- Tailwind v4 官方 skill 仅有[讨论页](https://github.com/tailwindlabs/tailwindcss/discussions/19594)线索，仓库无 `skills/` 目录，未取到原文。
- 本机 `raw.githubusercontent.com` DNS 解析失败；`land-book.com`、`coolors.co` 返回 403；`practicaltypography.com`、`web.dev/learn/design` 抓取超时。所有原文均经 `gh-proxy.com` 代理或 GitHub `contents` API 取得。

---

*搜集时间：2026-10-03。报告与离线原文仅供学习参考，所有 skill 版权归原作者所有；使用前请自行确认各仓库 license。*
