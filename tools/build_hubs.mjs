// Generates the content hubs from hub_content.mjs, reusing the support page as
// the shell so header, footer and styles never drift between pages.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { HUBS } from './hub_content.mjs';
import { APP } from './site_config.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const shell = readFileSync('support/index.html', 'utf8');
const bar = (shell.match(/<div class="bar">[\s\S]*?\n<\/div>/) || [''])[0]
  .replace(/href="\.\.\//g, 'href="/').replace(/href="\.\//g, 'href="/')
  .replace(/src="\.\.\//g, 'src="/').replace(/src="\.\//g, 'src="/')
  .replace(/ class="active"/g, '');
const footer = (shell.match(/<footer>[\s\S]*?<\/footer>/) || [''])[0]
  .replace(/href="\.\.\//g, 'href="/').replace(/href="\.\//g, 'href="/');

const byline = (h) => HUBS.find((x) => x.slug === h.parent);

function body(h) {
  const out = [];
  // Head block is centred and carries the whole hierarchy: where you are, the
  // one-line thesis, then the paragraph that frames the sections below.
  const up = h.parent ? byline(h) : null;
  out.push('      <header class="hub-head">');
  out.push(`        <p class="hub-eyebrow">${up ? `<a href="/${up.slug}/">${esc(up.title)}</a>` : esc(h.title)}</p>`);
  out.push(`        <h1>${esc(h.h1)}</h1>`);
  out.push(`        <p class="hub-lead">${esc(h.lead)}</p>`);
  out.push('      </header>');
  if (h.introTitle) out.push(`      <h2>${esc(h.introTitle)}</h2>`);
  out.push(`      <p class="hub-intro">${esc(h.intro)}</p>`);

  if (h.steps) {
    out.push(`      <h2>${esc(h.steps.title)}</h2>`);
    out.push('      <ol class="hub-steps">');
    for (const s of h.steps.items) out.push(`        <li>${esc(s)}</li>`);
    out.push('      </ol>');
  }

  if (h.compare) {
    out.push(`      <h2>${esc(h.compare.title)}</h2>`);
    out.push('      <div class="hub-table"><table>');
    if (h.compare.head) {
      out.push(`        <tr class="hub-thead">${h.compare.head.map((c, i) => (i ? `<td>${esc(c)}</td>` : `<th>${esc(c)}</th>`)).join('')}</tr>`);
    }
    for (const [label, a, b] of h.compare.rows) {
      out.push(`        <tr><th>${esc(label)}</th><td>${esc(a)}</td><td>${esc(b)}</td></tr>`);
    }
    out.push('      </table></div>');
  }

  if (h.laws) {
    out.push(`      <h2>${esc(h.laws.title)}</h2>`);
    out.push('      <div class="hub-table"><table>');
    for (const [place, law] of h.laws.rows) out.push(`        <tr><th>${esc(place)}</th><td colspan="2">${esc(law)}</td></tr>`);
    out.push('      </table></div>');
  }

  for (const s of h.sections || []) {
    out.push(`      <h2>${esc(s.h)}</h2>`);
    out.push(`      <p>${esc(s.p)}</p>`);
  }

  if (h.links?.length) {
    out.push(`      <h2>${esc(h.kind === 'hub' ? 'Pick your situation' : 'Read next')}</h2>`);
    out.push('      <ul class="hub-links">');
    for (const l of h.links) out.push(`        <li><a href="/${l.to}/">${esc(l.text)}</a></li>`);
    out.push('      </ul>');
  }

  // Same App Store badge the home page and the FAQ use, centred under the page.
  out.push(`      <div class="hub-foot">
        <a class="store-badge" href="${APP.storeUrl}" aria-label="Download on the App Store">
          <img src="/appstore-badge.svg" alt="Download on the App Store" width="168" height="56">
        </a>
      </div>`);
  return out.join('\n');
}

let written = 0;
for (const h of HUBS) {
  mkdirSync(h.slug, { recursive: true });
  const nav = bar.replace('<a href="/">Home</a>', '<a href="/">Home</a>')
    .replace(`<a href="/${h.slug.split('/')[0]}/">`, `<a href="/${h.slug.split('/')[0]}/" class="active">`);
  writeFileSync(`${h.slug}/index.html`, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/favicon.png">
<link rel="stylesheet" href="/style.css">
</head>
<body>
${nav}

<main class="page">
  <section class="wrap narrow">
    <article class="hub">
${body(h)}
    </article>
  </section>
</main>

${footer}
</body>
</html>
`);
  written++;
}
console.log(`hubs written: ${written}`);
