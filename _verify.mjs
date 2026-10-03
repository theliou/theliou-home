const BASE = 'https://theliou-home.2168387287.workers.dev';

// 必须能访问到（站点本体）
const expect200 = [
  '/',
  '/index.html',
  '/articles.html',
  '/gallery.html',
  '/about.html',
  '/contact.html',
  '/site.css',
  '/assets/hero-sky-clean.jpg',
  '/assets/og-cover.jpg',
  '/assets/favicon.svg',
  '/assets/favicon-32.png',
  '/assets/apple-touch-icon.png',
];

// 必须访问不到（仓库文件 / 开发工具 / 还没填内容的页面）
const expect404 = [
  '/projects.html',
  '/stack.html',
  '/guestbook.html',
  '/README.md',
  '/docs/',
  '/wrangler.jsonc',
  '/.gitignore',
  '/.assetsignore',
  '/.gitattributes',
  '/og-card.html',
  '/_gulltest.html',
  '/_icon32.html',
  '/_icon180.html',
  '/preview-desktop.png',
  '/preview-allpages.png',
  '/gull-flap.png',
  '/hero-variants.html',
  '/skills/',
];

async function probe(p, extra) {
  try {
    const r = await fetch(BASE + p, { redirect: 'manual' });
    const h = r.headers;
    return {
      status: r.status,
      info: [
        h.get('content-type') || '',
        h.get('content-length') ? h.get('content-length') + 'B' : '',
        extra ? (h.get('cache-control') || '') : '',
        extra ? (h.get('cf-cache-status') || '') : '',
      ].filter(Boolean).join('  '),
    };
  } catch (e) {
    return { status: 'ERR', info: String(e && e.message).slice(0, 50) };
  }
}

const problems = [];

console.log('=== A. 站点本体（应全部 200）===');
for (const p of expect200) {
  const r = await probe(p, p === '/' || p === '/site.css');
  const ok = r.status === 200;
  if (!ok) problems.push('A: ' + p + ' -> ' + r.status);
  console.log('  ' + (ok ? '[OK]  ' : '[FAIL]') + ' ' + String(r.status).padEnd(4) + ' ' + p.padEnd(30) + ' ' + r.info);
}

console.log('');
console.log('=== B. 不该存在的文件（应全部 404）===');
for (const p of expect404) {
  const r = await probe(p, false);
  const ok = r.status === 404;
  if (!ok) problems.push('B: ' + p + ' -> ' + r.status);
  console.log('  ' + (ok ? '[OK]  ' : '[WARN]') + ' ' + String(r.status).padEnd(4) + ' ' + p.padEnd(30) + ' ' + r.info);
}

console.log('');
if (problems.length) {
  console.log('!!! 有 ' + problems.length + ' 项不符合预期：');
  problems.forEach((x) => console.log('  - ' + x));
} else {
  console.log('全部符合预期。部署是干净的。');
}
