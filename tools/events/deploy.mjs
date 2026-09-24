// Uploads worker.js as the "inko-events" Worker and routes inkoinvoice.com/api/event to it.
import { readFileSync } from 'node:fs';
const token = readFileSync(process.env.HOME + '/.config/cloudflare/token.txt', 'utf8').trim();
const acct = 'b7fa3a1bcbf2476c4a1e4f2896caf001', name = 'inko-events', pattern = 'inkoinvoice.com/api/event';
const h = { authorization: 'Bearer ' + token };
const api = async (p, o = {}) => { const r = await fetch('https://api.cloudflare.com/client/v4' + p, { ...o, headers: { ...h, ...(o.headers || {}) } }); return [r.status, await r.json().catch(() => ({}))]; };

const form = new FormData();
form.append('metadata', new Blob([JSON.stringify({ main_module: 'worker.js', compatibility_date: '2026-09-01', observability: { enabled: true }, bindings: [{ type: 'analytics_engine', name: 'EVENTS', dataset: 'inko_events' }] })], { type: 'application/json' }));
form.append('worker.js', new Blob([readFileSync(new URL('./worker.js', import.meta.url))], { type: 'application/javascript+module' }), 'worker.js');
const [s1, j1] = await api(`/accounts/${acct}/workers/scripts/${name}`, { method: 'PUT', body: form });
console.log('upload', s1, j1.success ? 'ok' : JSON.stringify(j1.errors));
if (!j1.success) process.exit(1);

const [, zj] = await api('/zones?name=inkoinvoice.com'); const zone = zj.result[0].id;
const [, rl] = await api(`/zones/${zone}/workers/routes`);
const existing = (rl.result || []).find(r => r.pattern === pattern);
const [s2, j2] = existing
  ? await api(`/zones/${zone}/workers/routes/${existing.id}`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pattern, script: name }) })
  : await api(`/zones/${zone}/workers/routes`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pattern, script: name }) });
console.log('route', s2, j2.success ? pattern + ' -> ' + name : JSON.stringify(j2.errors));
