// Purges the CDN copies of the stylesheet and of every configured page, so the
// previous deploy stops being served. Run this right after a deploy goes live.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { PAGES } from './site_config.mjs';

const token = readFileSync(process.env.HOME + '/.config/cloudflare/token.txt', 'utf8').trim();
// the token goes into a request header, so the file must hold nothing else;
// the message never echoes what it found
if (!/^[A-Za-z0-9_-]+$/.test(token)) {
  console.log('~/.config/cloudflare/token.txt must be a single line of A-Z a-z 0-9 _ -');
  process.exit(1);
}

const hash = (f) => execSync(`md5 -q ${f}`).toString().trim().slice(0, 8);
const urls = ['https://inkoinvoice.com/style.css'];
try { urls.push(`https://inkoinvoice.com/style.css?v=${hash('style.css')}`); } catch (e) {}
// every page the site config knows about, so a new hub is never left stale
for (const p of PAGES) urls.push('https://inkoinvoice.com' + p.path);
// plus anything passed on the command line, paths or full urls, as long as it
// stays on this host; checked before the token is sent anywhere
for (const a of process.argv.slice(2)) {
  let u = null;
  try { u = new URL(a, 'https://inkoinvoice.com/'); } catch (e) {}
  if (u?.host !== 'inkoinvoice.com') { console.log(`not an inkoinvoice.com url: ${a}`); process.exit(1); }
  urls.push(u.href);
}

// zone id is looked up by name, so this works the moment the token can see it
const zoneRes = await fetch('https://api.cloudflare.com/client/v4/zones?name=inkoinvoice.com', {
  headers: { authorization: 'Bearer ' + token }
});
const zoneJson = await zoneRes.json();
const zone = (zoneJson.result || [])[0]?.id;
if (!zone) { console.log('inkoinvoice.com not visible to this token yet'); process.exit(1); }

const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
  method: 'POST',
  headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
  body: JSON.stringify({ files: urls })
});
const out = await res.json();
console.log(out.success ? `purged ${urls.length} urls` : JSON.stringify(out.errors || out).slice(0, 300));
