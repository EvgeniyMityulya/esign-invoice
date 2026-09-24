// Anonymous visit statistics for inkoinvoice.com. One random id per tab (sessionStorage),
// no cookies, no IP, nothing personal. Events go to /api/event (tools/events/worker.js),
// the report is `node tools/stats.mjs`.
(function () {
  var ENDPOINT = '/api/event';
  var sid = null;
  function sessionId() {
    if (sid) return sid;
    try { sid = sessionStorage.getItem('inko_sid'); } catch (e) {}
    if (!sid || !/^[a-z0-9]{6,16}$/.test(sid)) {
      sid = (Math.random().toString(36) + Math.random().toString(36)).replace(/[^a-z0-9]/g, '').slice(0, 12);
      try { sessionStorage.setItem('inko_sid', sid); } catch (e) {}
    }
    return sid;
  }
  function track(type, data) {
    try {
      var ev = { t: type, sid: sessionId(), p: location.pathname };
      for (var k in data) if (Object.prototype.hasOwnProperty.call(data, k)) ev[k] = data[k];
      var body = JSON.stringify(ev);
      if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }))) return;
      fetch(ENDPOINT, { method: 'POST', body: body, keepalive: true }).catch(function () {});
    } catch (e) {}
  }

  var q = new URLSearchParams(location.search);
  var source = q.get('utm_source') || q.get('ref') || q.get('source') || '';
  var visitSent = false;
  try { visitSent = !!sessionStorage.getItem('inko_visit'); sessionStorage.setItem('inko_visit', '1'); } catch (e) {}
  if (!visitSent) track('visit', { lp: location.pathname, s: source, ref: document.referrer || '' });
  track('page', {});

  // Where on the page a link sits: the first meaningful class up the tree (hero, cta, hub-foot…),
  // skipping layout wrappers; nav and footer are named by tag.
  var LAYOUT = /^(wrap|narrow|tiles|inner|container|row|col|store-badge|cta-row)$/;
  function placement(el) {
    var box = el.closest('nav, footer');
    if (box) return box.tagName.toLowerCase();
    for (var n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      var cls = String(n.className || '').split(/\s+/);
      for (var i = 0; i < cls.length; i++) if (cls[i] && !LAYOUT.test(cls[i])) return cls[i];
    }
    return 'page';
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var text = (a.textContent || a.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    if (/apps\.apple\.com/.test(href)) {
      var ct = (href.match(/[?&]ct=([^&]+)/) || [])[1] || '';
      track('store', { c: placement(a), q: text || 'badge', ct: ct });
    } else if (/^mailto:/i.test(href)) {
      track('out', { c: placement(a), q: 'mail' });
    } else if (/^https?:/i.test(href) && a.host !== location.host) {
      track('out', { c: placement(a), q: a.host });
    }
  }, true);

  // Time counts only while the tab is in front; depth is the furthest point scrolled to.
  var visibleSince = Date.now(), activeMs = 0, depth = 0;
  function measureDepth() {
    var doc = document.documentElement;
    var seen = (window.scrollY || doc.scrollTop) + window.innerHeight;
    var d = Math.min(100, Math.round(seen / Math.max(1, doc.scrollHeight) * 100));
    if (d > depth) depth = d;
  }
  window.addEventListener('scroll', measureDepth, { passive: true });
  measureDepth();
  // pagehide and visibilitychange both fire on close; only the first one while visible sends.
  function sendLeave() {
    if (!visibleSince) return;
    activeMs += Date.now() - visibleSince; visibleSince = 0;
    measureDepth();
    track('leave', { v: Math.round(activeMs / 1000), r: depth });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) sendLeave(); else visibleSince = Date.now();
  });
  window.addEventListener('pagehide', sendLeave);
})();
