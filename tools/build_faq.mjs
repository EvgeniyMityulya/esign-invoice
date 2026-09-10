// Generates /faq/index.html from faq_content.mjs, reusing the support page as the
// shell so the header, footer and styles never drift between pages.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { FAQ } from './faq_content.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const shell = readFileSync('support/index.html', 'utf8');
const bar = (shell.match(/<div class="bar">[\s\S]*?\n<\/div>/) || shell.match(/<div class="bar">[\s\S]*?<\/div>\s*<\/div>/) || [''])[0];
const footer = (shell.match(/<footer>[\s\S]*?<\/footer>/) || [''])[0];

const chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
// Topic cards double as the way into the longer guides, so the page stops
// being one undifferentiated list and the hubs get a visible entry point.
const TOPICS = [
  { key: 'signing', title: 'Signing', blurb: 'Who signs, on whose phone, and what gets recorded', to: '/esign/', cta: 'Read the guide' },
  { key: 'legal', title: 'Is it legal', blurb: 'ESIGN, UK eIDAS, the Australian ETA and what they require', to: '/esign/legally-binding/', cta: 'Read the guide' },
  { key: 'documents', title: 'Estimates and invoices', blurb: 'What goes on the document and how a quote becomes a bill', to: '/for/', cta: 'Read the guide' },
  { key: 'money', title: 'Price and privacy', blurb: 'What the free tier covers and where your documents live', to: '#money', cta: 'Jump to answers' }
];

const cards = TOPICS.map((t) => `        <a class="tile is-dark" href="${t.to}">
          <span class="tile-h">${esc(t.title)}</span>
          <span class="tile-p">${esc(t.blurb)}</span>
          <span class="tile-go">${esc(t.cta)}</span>
        </a>`).join('\n');

const items = TOPICS.map((t) => {
  const group = FAQ.filter((f) => f.topic === t.key);
  if (!group.length) return '';
  const rows = group.map((f) => `        <details>
          <summary>${esc(f.q)}${chev}</summary>
          <p class="a">${esc(f.a)}</p>
        </details>`).join('\n');
  return `      <section class="faq-group" id="${t.key}">
        <h2>${esc(t.title)}</h2>
${rows}
      </section>`;
}).join('\n');

mkdirSync('faq', { recursive: true });
writeFileSync('faq/index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/favicon.png">
<link rel="stylesheet" href="/style.css">
</head>
<body>
${bar
  .replace(/href="\.\.\//g, 'href="/')
  .replace(/href="\.\//g, 'href="/')
  .replace(/src="\.\.\//g, 'src="/')
  .replace(/src="\.\//g, 'src="/')
  .replace(/ class="active"/g, '')
  .replace('<a href="/faq/">FAQ</a>', '<a href="/faq/" class="active">FAQ</a>')}

<main class="page">
  <section class="wrap narrow">
    <div class="faq-head">
      <h1>FAQ</h1>
      <p class="lead">The questions people ask most.<br>Signing, estimates, invoices and what the free tier covers.</p>
    </div>
    <div class="tiles">
${cards}
    </div>

    <div class="faq">
${items}
    </div>
    <div class="faq-foot">
      <p class="support-line">Question not here? <a href="/support/">Write to the developer</a> and you will usually get an answer the same day.</p>
      <a class="store-badge" href="https://apps.apple.com/app/id6788092513" aria-label="Download on the App Store">
        <img src="/appstore-badge.svg" alt="Download on the App Store" width="168" height="56">
      </a>
    </div>
  </section>
</main>

${footer.replace(/href="\.\.\//g, 'href="/').replace(/href="\.\//g, 'href="/')}
</body>
</html>
`);
console.log(`faq/index.html written with ${FAQ.length} questions`);
