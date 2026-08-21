// Generates /about/index.html from about_content.mjs. Header, footer and the
// alternating feature rows are reused from the site so nothing drifts in style.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { ABOUT, AUTHOR_LINKS } from './about_content.mjs';
import { BRAND_ICONS } from './brand_icons_data.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rich = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
const lines = (s) => esc(s).split('\n').join('<br>');
const shell = readFileSync('support/index.html', 'utf8');
const root = (h) => h
  .replace(/href="\.\.\//g, 'href="/').replace(/href="\.\//g, 'href="/')
  .replace(/src="\.\.\//g, 'src="/').replace(/src="\.\//g, 'src="/');
const bar = root((shell.match(/<div class="bar">[\s\S]*?\n<\/div>/) || [''])[0])
  .replace(/ class="active"/g, '')
  .replace('<a href="/about/">About</a>', '<a href="/about/" class="active">About</a>');
const footer = root((shell.match(/<footer>[\s\S]*?<\/footer>/) || [''])[0]);

const rows = ABOUT.blocks.map((b, i) => `  <div class="zrow${i % 2 ? ' flip' : ''}">
    <div class="ztext">
      <span class="ztag">${esc(b.tag)}</span>
      <h2>${esc(b.title)}</h2>
      <p>${rich(b.body)}</p>
    </div>
    <div class="zart"><img src="/${b.art}" alt="${esc(b.alt)}" width="600" height="600" loading="lazy"></div>
  </div>`).join('\n');

// brand mark inside a coloured chip, so it stays legible on the dark card
const mark = (l) => `<span class="brand-chip" style="background:${l.chip}"><svg viewBox="0 0 24 24" width="13" height="13" fill="${l.mark}" aria-hidden="true"><path d="${BRAND_ICONS[l.icon]}"/></svg></span>`;
const links = AUTHOR_LINKS.map((l) =>
  `        <a class="author-link" href="${l.href}" rel="me noopener" target="_blank" aria-label="${esc(l.handle)}, ${esc(l.label)}">${mark(l)}${esc(l.handle)}</a>`
).join('\n');

mkdirSync('about', { recursive: true });
writeFileSync('about/index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/favicon.png">
<link rel="stylesheet" href="/style.css">
</head>
<body>
${bar}

<main class="page about">
  <section class="about-hero">
    <img class="app-icon" src="/icon.png" alt="Inko app icon" width="78" height="78">
    <h1>${esc(ABOUT.title)}</h1>
    <p class="lead">${lines(ABOUT.lead)}</p>
  </section>

<section class="zig">
${rows}
</section>

  <section class="dev-wrap">
    <div class="dev-card">
      <div class="dev-side">
        <img class="dev-photo" src="/${ABOUT.photo}" alt="${esc(ABOUT.name)}" width="132" height="132" loading="lazy">
        <div class="dev-name">${esc(ABOUT.name)}</div>
        <div class="dev-role">${esc(ABOUT.role)}</div>
      </div>
      <div>
        <span class="ztag dev-tag">${esc(ABOUT.whoTitle)}</span>
${ABOUT.who.map((p) => `        <p>${esc(p)}</p>`).join('\n')}
        <div class="author-links">
${links}
        </div>
      </div>
    </div>

    <div class="faq-foot">
      <p class="support-line">Something to ask before you install? <a href="/support/">Write to the developer</a>.</p>
      <a class="store-badge" href="https://apps.apple.com/app/id6788092513" aria-label="Download on the App Store">
        <img src="/appstore-badge.svg" alt="Download on the App Store" width="168" height="56">
      </a>
    </div>
  </section>
</main>

${footer}
</body>
</html>
`);
console.log('about/index.html written with', ABOUT.blocks.length, 'feature rows');
