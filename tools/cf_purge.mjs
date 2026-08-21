// Purges the CDN copies of the built assets. The cache rule keeps /assets/* for a
// year, so a request that lands mid-deploy can pin a stale file for that long.
// Run this right after a deploy goes live.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const token = readFileSync(process.env.HOME + '/.config/cloudflare/token.txt', 'utf8').trim();
// zone id is looked up by name, so this works the moment the token can see it
const zoneRes = await fetch('https://api.cloudflare.com/client/v4/zones?name=inkoinvoice.com', {
  headers: { authorization: 'Bearer ' + token }
});
const zoneJson = await zoneRes.json();
const zone = (zoneJson.result || [])[0]?.id;
if (!zone) { console.log('inkoinvoice.com not visible to this token yet'); process.exit(1); }

const hash = (f) => execSync(`md5 -q ${f}`).toString().trim().slice(0, 8);
const urls = ['https://inkoinvoice.com/style.css'];
try { urls.push(`https://inkoinvoice.com/style.css?v=${hash('style.css')}`); } catch (e) {}
for (const p of ['/', '/faq/', '/support/', '/privacy/', '/terms/']) urls.push('https://inkoinvoice.com' + p);

const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
  method: 'POST',
  headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
  body: JSON.stringify({ files: urls })
});
const out = await res.json();
console.log(out.success ? `purged ${urls.length} urls` : JSON.stringify(out.errors || out).slice(0, 300));
