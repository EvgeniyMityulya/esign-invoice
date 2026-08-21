// One-shot switch from the github.io path to the custom domain.
// Run after DNS resolves: it flips SITE, regenerates everything and writes CNAME.
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { SITE, SITE_NEXT } from './site_config.mjs';

const host = SITE_NEXT.replace(/^https?:\/\//, '');
const dns = execSync(`dig +short A ${host}`).toString().trim();
if (!dns) {
  console.log(`${host} does not resolve yet. Add the DNS records first, then re-run.`);
  process.exit(1);
}

const cfg = readFileSync('tools/site_config.mjs', 'utf8');
writeFileSync('tools/site_config.mjs', cfg
  .replace(`export const SITE = '${SITE}';`, `export const SITE = '${SITE_NEXT}';`)
  .replace(`export const SITE_NEXT = '${SITE_NEXT}';`, `export const SITE_NEXT = '${SITE_NEXT}'; // live`));
writeFileSync('CNAME', host + '\n');

for (const step of ['build_faq.mjs', 'patch_meta.mjs', 'build.mjs']) {
  console.log(execSync(`node tools/${step}`).toString().trim());
}
console.log(`switched to ${SITE_NEXT}, CNAME written. Commit, push, then set the Pages custom domain.`);
