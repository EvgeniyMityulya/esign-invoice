// Output helpers shared by the page generators: everything that comes from the
// content files passes through here on its way into the HTML.
import { SITE } from './site_config.mjs';

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const ORIGIN = new URL(SITE).origin;

// Covers element text and quoted attribute values alike, so callers never
// have to know which of the two they are writing into.
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ENTITIES[c]);

// A link built from content may only be https:, a path on this site (or a
// #fragment of the same page) or a mailto: with one plain address, so a slip in the content can never ship a
// javascript: or data: link, or a "//host" that leaves the site. Anything else
// fails the build. Returns the value escaped for an attribute.
export function safeUrl(value) {
  const s = String(value);
  let url = null;
  try { url = new URL(s, `${ORIGIN}/`); } catch (e) {}
  const https = /^https:\/\//i.test(s) && url?.protocol === 'https:';
  const onSite = /^(\/(?![/\\])|#)/.test(s) && url?.origin === ORIGIN;
  const mail = /^mailto:[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(s);
  if (!https && !onSite && !mail) throw new Error(`unsafe link ${JSON.stringify(s)}: use https:, a path on this site or a plain mailto:`);
  return esc(s);
}
