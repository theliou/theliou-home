// 字体自托管构建脚本
// 用法：node tools/build-fonts.mjs
//
// 为什么需要它：
//   站点的字体原本走 Google Fonts 的 CDN。那个 CSS 是渲染阻塞的，而且
//   fonts.gstatic.com 在国内经常连不上 —— 一旦连不上，全站会掉回系统字体，
//   Fraunces 的 "Lio" 和 Noto Serif SC 的标题全部失效，设计意图直接丢掉。
//
// 做法：
//   1. 把 8 个页面里出现的字符全部收集起来（去掉注释，避免注释里的中文污染子集）
//   2. 用 Google Fonts 的 text= 接口，只请求这些字符 —— 它会返回一个
//      只含这些字形的 woff2，体积比完整字体小一两个数量级
//   3. 下载到 assets/fonts/，并生成 assets/fonts.css（本地路径）
//
// ⚠️ 内容大改之后（比如新增了很多字）需要重新跑一次，否则新字符会掉回系统字体。

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'assets', 'fonts');
const OUT_CSS = path.join(ROOT, 'assets', 'fonts.css');

const PAGES = [
  'index.html', 'articles.html', 'gallery.html', 'about.html',
  'contact.html', 'projects.html', 'stack.html', 'guestbook.html',
];

// 需要哪几个字重就写哪几行。多一个就多一份体积。
const FACES = [
  { key: 'fraunces-700',      query: 'Fraunces:opsz,wght@9..144,700', label: 'Fraunces 700（拉丁标题）' },
  { key: 'plex-400',          query: 'IBM+Plex+Sans:wght@400',        label: 'IBM Plex Sans 400（拉丁正文）' },
  { key: 'plex-500',          query: 'IBM+Plex+Sans:wght@500',        label: 'IBM Plex Sans 500（拉丁强调）' },
  { key: 'notosanssc-400',    query: 'Noto+Sans+SC:wght@400',         label: 'Noto Sans SC 400（中文正文）' },
  { key: 'notosanssc-500',    query: 'Noto+Sans+SC:wght@500',         label: 'Noto Sans SC 500（中文强调）' },
  { key: 'notoserifsc-700',   query: 'Noto+Serif+SC:wght@700',        label: 'Noto Serif SC 700（中文标题）' },
];

// 现代浏览器 UA —— 只有带上它，Google 才会返回 woff2 而不是 ttf
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

// ── 1. 收集字符 ────────────────────────────────────────────────
let html = '';
for (const p of PAGES) {
  const f = path.join(ROOT, p);
  if (fs.existsSync(f)) html += fs.readFileSync(f, 'utf8');
}
const stripped = html
  .replace(/<!--[\s\S]*?-->/g, ' ')      // 注释里的中文不算（否则白白撑大子集）
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]*>/g, ' ')              // 标签本身是 ASCII，保留属性文字
  .replace(/&[a-zA-Z]+;/g, ' ')
  .replace(/\s+/g, ' ');

const chars = [...new Set(stripped)].filter((c) => c !== ' ' && c.trim() !== '');
// 保险起见补上常见的拉丁/数字/标点，避免以后改文案缺字
const SAFETY = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~·—…「」『』（）《》、。，：；！？';
for (const c of SAFETY) if (!chars.includes(c)) chars.push(c);
chars.sort();

const text = chars.join('');
console.log('收集到 ' + chars.length + ' 个字符（含保险字符）');
console.log('text= 参数长度约 ' + encodeURIComponent(text).length + ' 字符');

fs.mkdirSync(OUT_DIR, { recursive: true });

// ── 2. 逐个字体请求并下载 ──────────────────────────────────────
const cssParts = [];
let totalBytes = 0;
const report = [];

for (const face of FACES) {
  const url = 'https://fonts.googleapis.com/css2?family=' + face.query +
              '&text=' + encodeURIComponent(text) + '&display=swap';
  let css;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    css = await r.text();
  } catch (e) {
    console.log('  [FAIL] ' + face.label + ' —— 样式请求失败: ' + e.message);
    report.push({ label: face.label, ok: false });
    continue;
  }

  // 取第一个 @font-face 里的字体地址。
  // ⚠️ 带 text= 参数时 Google 返回的是 "…/l/font?kit=xxx&skey=yyy" 这种地址，
  //    不带 .woff2 后缀 —— 所以不能拿后缀当判据。
  const m = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!m) {
    console.log('  [FAIL] ' + face.label + ' —— 返回的 CSS 里没有字体地址');
    console.log('         响应开头：' + css.slice(0, 300).replace(/\s+/g, ' '));
    report.push({ label: face.label, ok: false });
    continue;
  }

  const file = face.key + '.woff2';
  try {
    const fr = await fetch(m[1], { headers: { 'User-Agent': UA } });
    if (!fr.ok) throw new Error('HTTP ' + fr.status);
    const buf = Buffer.from(await fr.arrayBuffer());
    fs.writeFileSync(path.join(OUT_DIR, file), buf);
    totalBytes += buf.length;
    report.push({ label: face.label, ok: true, file, bytes: buf.length });
    console.log('  [OK]   ' + face.label.padEnd(24) + file.padEnd(22) + (buf.length / 1024).toFixed(1) + ' KB');
  } catch (e) {
    console.log('  [FAIL] ' + face.label + ' —— 下载失败: ' + e.message);
    report.push({ label: face.label, ok: false });
    continue;
  }

  // 从原 CSS 里抠出 font-family / font-weight / font-style / unicode-range
  const family = (css.match(/font-family:\s*'([^']+)'/) || [, face.query.split(':')[0]])[1];
  const weight = (css.match(/font-weight:\s*(\d+)/) || [, '400'])[1];
  const style = (css.match(/font-style:\s*(\w+)/) || [, 'normal'])[1];
  const urange = (css.match(/unicode-range:\s*([^;]+);/) || [, 'U+0000-10FFFF'])[1].trim();
  cssParts.push(
    '@font-face{\n' +
    '  font-family:"' + family + '";\n' +
    '  font-style:' + style + ';\n' +
    '  font-weight:' + weight + ';\n' +
    '  font-display:swap;\n' +
    '  src:url("fonts/' + file + '") format("woff2");\n' +
    '  unicode-range:' + urange + ';\n' +
    '}'
  );
}

// ── 3. 写出 CSS ────────────────────────────────────────────────
const header =
  '/* 字体自托管 —— 由 tools/build-fonts.mjs 生成，不要手改。\n' +
  '   内容大改（新增很多字）之后重新跑：node tools/build-fonts.mjs */\n\n';
fs.writeFileSync(OUT_CSS, header + cssParts.join('\n\n') + '\n');

console.log('');
console.log('字体文件: ' + report.filter((r) => r.ok).length + '/' + FACES.length + ' 个，共 ' +
            (totalBytes / 1024).toFixed(1) + ' KB');
console.log('CSS: ' + OUT_CSS.replace(ROOT + path.sep, '') + '（' +
            (fs.statSync(OUT_CSS).size / 1024).toFixed(1) + ' KB）');
