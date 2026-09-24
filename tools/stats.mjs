// Visit statistics from the inko_events dataset (written by tools/events/worker.js).
// usage: node tools/stats.mjs [days=7]
import { readFileSync } from 'node:fs';
const token = readFileSync(process.env.HOME + '/.config/cloudflare/token.txt', 'utf8').trim();
const days = Math.max(1, Math.min(90, Number(process.argv[2]) || 7));
const since = `timestamp > NOW() - INTERVAL '${days}' DAY AND index1 NOT LIKE 'zztest%'`;

async function sql(query) {
  const r = await fetch('https://api.cloudflare.com/client/v4/accounts/b7fa3a1bcbf2476c4a1e4f2896caf001/analytics_engine/sql', {
    method: 'POST', headers: { authorization: 'Bearer ' + token }, body: query
  });
  const t = await r.text();
  try { return JSON.parse(t).data; } catch { throw new Error(`${r.status} ${t.slice(0, 300)}`); }
}
function table(title, rows) {
  console.log(`\n${title}`);
  if (!rows.length) { console.log('  нет данных'); return; }
  for (const r of rows) console.log('  ' + Object.values(r).map((v) => String(v).padEnd(8)).join('  '));
}

// The dataset may lag a minute behind, and some browsers send `leave` twice per page;
// time and depth take the largest value per visit and page.
const [totals] = await sql(`SELECT count(DISTINCT index1) AS visits,
  countIf(blob1 = 'page') AS pageviews,
  countIf(blob1 = 'store') AS store_clicks
  FROM inko_events WHERE ${since}`);
const [store] = await sql(`SELECT count(DISTINCT index1) AS visits FROM inko_events WHERE ${since} AND blob1 = 'store'`);
console.log(`Inko, последние ${days} дн.`);
console.log(`  визитов ${totals?.visits ?? 0} · просмотров ${totals?.pageviews ?? 0} · кликов в App Store ${totals?.store_clicks ?? 0} (визитов с кликом ${store?.visits ?? 0})`);

table('Источники (визиты)', await sql(`SELECT blob5 AS source, count() AS visits FROM inko_events
  WHERE ${since} AND blob1 = 'visit' GROUP BY source ORDER BY visits DESC LIMIT 15`));
table('Страницы входа', await sql(`SELECT blob10 AS landing, count() AS visits FROM inko_events
  WHERE ${since} AND blob1 = 'visit' GROUP BY landing ORDER BY visits DESC LIMIT 15`));
table('Страницы: просмотры · ср. время, с · ср. дочитали, %', await sql(`SELECT path, count() AS views,
  round(avg(secs)) AS avg_secs, round(avg(depth)) AS avg_depth FROM (
    SELECT index1, blob2 AS path, max(double1) AS secs, max(double2) AS depth FROM inko_events
    WHERE ${since} AND blob1 = 'leave' GROUP BY index1, path)
  GROUP BY path ORDER BY views DESC LIMIT 20`));
table('Клики в App Store: страница · место · текст · ct', await sql(`SELECT blob2 AS page, blob3 AS place, blob4 AS text,
  blob11 AS ct, count() AS clicks FROM inko_events WHERE ${since} AND blob1 = 'store'
  GROUP BY page, place, text, ct ORDER BY clicks DESC LIMIT 20`));
table('Внешние ссылки', await sql(`SELECT blob2 AS page, blob4 AS target, count() AS clicks FROM inko_events
  WHERE ${since} AND blob1 = 'out' GROUP BY page, target ORDER BY clicks DESC LIMIT 15`));
table('Страны · устройства', await sql(`SELECT blob6 AS country, blob7 AS device, count() AS visits FROM inko_events
  WHERE ${since} AND blob1 = 'visit' GROUP BY country, device ORDER BY visits DESC LIMIT 15`));
