// Tells Bing (and the other IndexNow engines) what changed. Reads the sitemap so
// the list never drifts from what we publish.
import { readFileSync } from 'node:fs';
import { INDEXNOW_KEY } from './indexnow_key.mjs';
import { SITE } from './site_config.mjs';

const host = SITE.replace(/^https?:\/\//, '').split('/')[0];
const urls = [...readFileSync('sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const only = process.argv.slice(2);
const list = only.length ? urls.filter((u) => only.some((f) => u.includes(f))) : urls;

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`, urlList: list })
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${list.length} urls`);
if (![200, 202].includes(res.status)) console.log(await res.text());
