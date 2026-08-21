// sitemap.xml, robots.txt and a noindex 404, all derived from site_config.
import { writeFileSync, readFileSync } from 'node:fs';
import { SITE, PAGES, APP } from './site_config.mjs';

const indexable = PAGES.filter((p) => !/noindex/.test(p.robots || ''));
const urls = indexable.map((p) => {
  const loc = SITE + (p.path === '/' ? '/' : p.path);
  return `  <url><loc>${loc}</loc>${p.priority ? `<priority>${p.priority}</priority>` : ''}</url>`;
}).join('\n');
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

// GitHub Pages serves 404.html for unknown paths; keep it out of the index
const shell = readFileSync('support/index.html', 'utf8');
const head = shell.slice(0, shell.indexOf('</head>'));
const nav = (shell.match(/<div class="bar">[\s\S]*?<\/div>\s*<\/div>/) || [''])[0];
writeFileSync('404.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found — ${APP.shortName}</title>
<meta name="robots" content="noindex,follow">
<link rel="icon" href="/favicon.png">
<link rel="stylesheet" href="/style.css">
</head>
<body>
${nav.replace(/href="\.\//g, 'href="/').replace(/src="\.\//g, 'src="/')}
<section class="hero">
  <h1>This page moved or never existed</h1>
  <p class="lede">Nothing here. The invoice maker is still where you left it.</p>
  <p><a class="cta" href="/">Back to the home page</a></p>
</section>
</body>
</html>
`);
console.log(`sitemap: ${indexable.length} urls, robots.txt and 404.html written`);
