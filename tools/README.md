# Inko site tools

The site is hand-written static HTML. Everything SEO-related is generated from
`site_config.mjs`, so edit that file and re-run the scripts. Do not hand-edit the
block between `<!-- seo:start -->` and `<!-- seo:end -->`, it gets overwritten.

```bash
node tools/build_faq.mjs      # faq/index.html from faq_content.mjs, shell copied from support/
node tools/store_links.mjs    # App Store links get the campaign tag for their page
node tools/patch_meta.mjs     # per-page title/description/canonical/OG/JSON-LD + css cache-buster
node tools/build.mjs          # sitemap.xml, robots.txt, 404.html
node tools/seo_baseline.mjs   # diff the live pages against snapshots/seo-baseline.json
```

Run them in that order: `build_faq.mjs` first (it copies the header from
`support/index.html`, so nav changes must already be in place), then
`store_links.mjs`, then `patch_meta.mjs`, then `build.mjs`. Commit after.

Campaign tags live in `CAMPAIGNS` in `site_config.mjs`. Apple only reports a tag
once five different Apple IDs installed through it, so keep them coarse. `seo_baseline.mjs --save`
rewrites the snapshot after an intentional change; without the flag it exits 1
when a high-severity field (status, canonical, robots, title, h1) moved.

## Moving to the real domain

1. Buy `inkoinvoice.com` and point it at GitHub Pages.
2. Put the bare domain in a `CNAME` file at the repo root.
3. Swap `SITE` in `site_config.mjs` for `SITE_NEXT`, re-run both generators, commit.
4. Update the support and privacy URLs in App Store Connect.
5. Add the domain to Search Console and Bing, then submit the sitemap.
