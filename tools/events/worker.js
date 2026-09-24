// Same-origin event endpoint for inkoinvoice.com (route: inkoinvoice.com/api/event).
// Takes the anonymous events sent by /t.js and stores them in Workers Analytics Engine
// (dataset inko_events). No IP, no cookies; country and device come from the edge.
const SITE_ORIGIN = 'https://inkoinvoice.com';
const EVENT_TYPES = new Set(['visit', 'page', 'store', 'out', 'leave']);
const BOT_UA = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|embedly|quora link|csp-check/i;
const SOURCE_RULES = [
  [/chatgpt|openai/, 'ChatGPT'], [/perplexity/, 'Perplexity'], [/claude\.ai|anthropic/, 'Claude'],
  [/gemini|bard/, 'Gemini'], [/copilot/, 'Copilot'], [/linkedin|lnkd\.in/, 'LinkedIn'],
  [/youtube|youtu\.be/, 'YouTube'], [/t\.me|telegram/, 'Telegram'], [/instagram/, 'Instagram'],
  [/facebook|fb\.com/, 'Facebook'], [/tiktok/, 'TikTok'], [/twitter|x\.com|t\.co/, 'X'],
  [/threads/, 'Threads'], [/reddit/, 'Reddit'], [/producthunt/, 'Product Hunt'],
  [/alternativeto/, 'AlternativeTo'], [/saashub/, 'SaaSHub'], [/yandex|ya\.ru/, 'Яндекс'],
  [/google/, 'Google'], [/bing/, 'Bing'], [/duckduckgo/, 'DuckDuckGo'], [/ecosia/, 'Ecosia'],
  [/clinkyapp/, 'Clinky'], [/github/, 'GitHub']
];

function sourceName(source, referrer) {
  const s = String(source || '').toLowerCase().trim();
  let host = '';
  try { host = new URL(referrer).host.toLowerCase(); } catch (e) {}
  if (host.endsWith('inkoinvoice.com')) host = '';
  if (!s && !host) return 'Прямой заход';
  const hay = s + ' ' + host;
  for (const [re, name] of SOURCE_RULES) if (re.test(hay)) return name;
  return s || host.replace(/^www\./, '');
}

function describeAgent(ua) {
  const has = (re) => re.test(ua);
  let browser = 'Другой';
  if (has(/Instagram/)) browser = 'Instagram';
  else if (has(/FBAN|FBAV|FB_IAB/)) browser = 'Facebook';
  else if (has(/LinkedInApp/)) browser = 'LinkedIn';
  else if (has(/Telegram/)) browser = 'Telegram';
  else if (has(/Edg\//)) browser = 'Edge';
  else if (has(/OPR\/|Opera/)) browser = 'Opera';
  else if (has(/Firefox|FxiOS/)) browser = 'Firefox';
  else if (has(/CriOS|Chrome\//)) browser = 'Chrome';
  else if (has(/Safari\//)) browser = 'Safari';
  let os = 'Другая';
  if (has(/iPhone|iPod/)) os = 'iOS';
  else if (has(/iPad/)) os = 'iPadOS';
  else if (has(/Android/)) os = 'Android';
  else if (has(/Mac OS X|Macintosh/)) os = 'macOS';
  else if (has(/Windows/)) os = 'Windows';
  else if (has(/Linux|CrOS/)) os = 'Linux';
  const device = has(/iPad|Tablet/) ? 'Планшет' : has(/Mobi|iPhone|Android/) ? 'Телефон' : 'Компьютер';
  return { browser, os, device };
}

async function handleEvent(request, env) {
  if (request.method !== 'POST') return new Response(null, { status: 405 });
  const origin = request.headers.get('origin');
  const site = request.headers.get('sec-fetch-site');
  if (origin ? origin !== SITE_ORIGIN : (site && site !== 'same-origin')) return new Response(null, { status: 403 });
  const ua = request.headers.get('user-agent') || '';
  if (BOT_UA.test(ua)) return new Response(null, { status: 204 });
  let e;
  try { e = JSON.parse(await request.text()); } catch (err) { return new Response(null, { status: 400 }); }
  const str = (v, n) => String(v == null ? '' : v).slice(0, n);
  const type = str(e.t, 8);
  const sid = str(e.sid, 16);
  if (!EVENT_TYPES.has(type) || !/^[a-z0-9]{6,16}$/.test(sid)) return new Response(null, { status: 400 });
  const agent = describeAgent(ua);
  const cf = request.cf || {};
  const num = (v, max) => Math.max(0, Math.min(Number(v) || 0, max));
  env.EVENTS.writeDataPoint({
    indexes: [sid],
    blobs: [
      type, str(e.p, 120), str(e.c, 40), str(e.q, 80), type === 'visit' ? sourceName(e.s, e.ref) : '',
      cf.country || '', agent.device, agent.browser, agent.os, str(e.lp, 120), str(e.ct, 40), sid
    ],
    doubles: [num(e.v, 86400), num(e.r, 100)]
  });
  return new Response(null, { status: 204 });
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === '/api/event') return handleEvent(request, env);
    return new Response(null, { status: 404 });
  }
};
