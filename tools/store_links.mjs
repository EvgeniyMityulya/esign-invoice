// Rewrites every App Store link so it carries the campaign tag for its page.
// Keeps the badge attribution parameters Apple wants on the official badge.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { APP, CAMPAIGNS } from './site_config.mjs';

const link = (tag, badge) => {
  const p = new URLSearchParams({ pt: APP.providerToken, ct: tag, mt: '8' });
  if (badge) { p.set('itsct', 'apps_box_badge'); p.set('itscg', '30200'); }
  return `https://apps.apple.com/app/apple-store/id${APP.id}?${p.toString()}`;
};

let changed = 0;
for (const [file, tag] of Object.entries(CAMPAIGNS)) {
  if (!existsSync(file)) { console.log('skip (missing)', file); continue; }
  let html = readFileSync(file, 'utf8');
  const before = html;
  // the official badge keeps itsct/itscg, other links stay clean
  html = html.replace(/https:\/\/apps\.apple\.com\/[^"']*id6788092513[^"']*/g, (m) =>
    link(tag, /itsct/.test(m)).replace(/&/g, '&amp;'));
  if (html !== before) { writeFileSync(file, html); changed++; }
  console.log(file.padEnd(22), '->', tag);
}
console.log(`\nlinks for posts (create the campaign in App Store Connect first):`);
for (const tag of ['linkedin', 'x', 'product-hunt']) console.log('  ' + tag.padEnd(14) + link(tag));
console.log(`\n${changed} files rewritten`);
