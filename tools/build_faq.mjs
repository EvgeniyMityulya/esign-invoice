// Generates /faq/index.html from faq_content.mjs, reusing the support page as the
// shell so the header, footer and styles never drift between pages.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { FAQ } from './faq_content.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const shell = readFileSync('support/index.html', 'utf8');
const bar = (shell.match(/<div class="bar">[\s\S]*?\n<\/div>/) || shell.match(/<div class="bar">[\s\S]*?<\/div>\s*<\/div>/) || [''])[0];
const footer = (shell.match(/<footer>[\s\S]*?<\/footer>/) || [''])[0];

const chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
const items = FAQ.map((f) => `      <details>
        <summary>${esc(f.q)}${chev}</summary>
        <p>${esc(f.a)}</p>
      </details>`).join('\n');

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
    <h1>Questions about signing and invoicing</h1>
    <p class="lede">Short answers about signatures, estimates, invoices and what the app does with your data.</p>
    <div class="faq">
${items}
    </div>
    <p class="faq-more">Still stuck? <a href="/support/">Write to the developer</a> and you will get an answer, usually the same day.</p>
  </section>
</main>

${footer.replace(/href="\.\.\//g, 'href="/').replace(/href="\.\//g, 'href="/')}
</body>
</html>
`);
console.log(`faq/index.html written with ${FAQ.length} questions`);
