// Rewrites the SEO block of every page from site_config: canonical, robots,
// absolute OG/Twitter tags, JSON-LD and the stylesheet cache-buster.
// Idempotent, so run it after every content edit.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SITE, APP, AUTHOR, PAGES } from './site_config.mjs';
import { FAQ } from './faq_content.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cssVer = createHash('md5').update(readFileSync('style.css')).digest('hex').slice(0, 8);

function schemaFor(p) {
  const url = SITE + (p.path === '/' ? '/' : p.path);
  const org = {
    '@type': 'Organization', '@id': `${SITE}/#org`, name: APP.shortName, url: `${SITE}/`,
    logo: `${SITE}/icon.png`, founder: { '@id': `${SITE}/#author` }
  };
  const author = {
    '@type': 'Person', '@id': `${SITE}/#author`, name: AUTHOR.name,
    jobTitle: AUTHOR.role, sameAs: AUTHOR.sameAs
  };
  const graph = [org, author, {
    '@type': 'WebPage', '@id': url, url, name: p.title, description: p.description,
    inLanguage: 'en', isPartOf: { '@id': `${SITE}/#website` }
  }, {
    '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: APP.shortName,
    publisher: { '@id': `${SITE}/#org` }, inLanguage: 'en'
  }];
  if (p.faq) {
    graph.push({
      '@type': 'FAQPage', '@id': `${url}#faq`,
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    });
  }
  if (p.path === '/') {
    graph.push({
      '@type': 'MobileApplication', '@id': `${SITE}/#app`, name: APP.name,
      applicationCategory: APP.category, operatingSystem: APP.os,
      url: APP.storeUrl, installUrl: APP.storeUrl, image: `${SITE}/og.jpg`,
      description: p.description,
      offers: { '@type': 'Offer', price: APP.price, priceCurrency: APP.currency },
      author: { '@id': `${SITE}/#author` }, publisher: { '@id': `${SITE}/#org` }
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function block(p) {
  const url = SITE + (p.path === '/' ? '/' : p.path);
  const lines = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta name="robots" content="${p.robots || 'index,follow,max-image-preview:large'}">`,
    `<meta name="apple-itunes-app" content="app-id=${APP.id}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(APP.shortName)}">`,
    `<meta property="og:title" content="${esc(p.title)}">`,
    `<meta property="og:description" content="${esc(p.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${SITE}/og.jpg">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(p.title)}">`,
    `<meta name="twitter:description" content="${esc(p.description)}">`,
    `<meta name="twitter:image" content="${SITE}/og.jpg">`,
    `<script type="application/ld+json">${schemaFor(p)}</script>`
  ];
  return '<!-- seo:start -->\n' + lines.join('\n') + '\n<!-- seo:end -->';
}

let touched = 0;
for (const p of PAGES) {
  if (!existsSync(p.file)) { console.log('skip (missing)', p.file); continue; }
  let html = readFileSync(p.file, 'utf8');

  if (/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/.test(html)) {
    html = html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, block(p));
  } else {
    // drop the hand-written tags this block now owns, then insert before </head>
    html = html
      .replace(/[ \t]*<title>[\s\S]*?<\/title>\s*\n?/g, '')
      .replace(/[ \t]*<meta name="(description|robots|apple-itunes-app|twitter:[a-z:]+)"[^>]*>\s*\n?/g, '')
      .replace(/[ \t]*<meta property="og:[a-z_:]+"[^>]*>\s*\n?/g, '')
      .replace(/[ \t]*<link rel="canonical"[^>]*>\s*\n?/g, '')
      .replace('</head>', block(p) + '\n</head>');
    touched++;
  }

  html = html.replace(/(href="[^"]*style\.css)(\?v=[a-z0-9]+)?"/g, `$1?v=${cssVer}"`);
  writeFileSync(p.file, html);
}
console.log(`patched ${PAGES.filter((p) => existsSync(p.file)).length} pages (${touched} first-time), css v=${cssVer}`);
