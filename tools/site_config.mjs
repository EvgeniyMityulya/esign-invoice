// One place that knows where the site lives. Flip SITE the day the domain is
// live and every generator follows: canonical, sitemap, robots, OG, schema.
export const SITE = 'https://inkoinvoice.com';
export const SITE_NEXT = 'https://inkoinvoice.com'; // live

export const APP = {
  id: '6788092513',
  name: 'Inko: Invoice Maker & eSign',
  shortName: 'Inko',
  // no locale in the path: Apple redirects to the visitor's own storefront
  storeUrl: 'https://apps.apple.com/app/id6788092513',
  // App Store campaign attribution. pt is public, it travels inside every link.
  providerToken: '128999575',
  category: 'BusinessApplication',
  os: 'iOS 18.0 or later',
  price: '0',
  currency: 'USD'
};

export const AUTHOR = {
  name: 'Evgeniy Mityulya',
  role: 'iOS Engineer, Founder of Inko',
  sameAs: [
    'https://www.linkedin.com/in/evgeniy-mityulya/',
    'https://t.me/evgeniymityulya',
    'https://x.com/Evgeniy_iOS'
  ]
};

// Campaign tag per page, so App Store analytics can tell the surfaces apart.
// Apple only reports a tag once five different Apple IDs installed through it,
// so keep the tags coarse until a channel actually produces volume.
export const CAMPAIGNS = {
  'index.html': 'site-home',
  'faq/index.html': 'site-faq',
  'support/index.html': 'site-support',
  'about/index.html': 'site-about'
};

export const PAGES = [
  { file: 'index.html', path: '/', priority: '1.0',
    title: 'Inko — Invoice Maker & eSign for iPhone',
    description: 'Invoices, estimates and receipts built on your phone and signed by the client on the spot. No account, no commission, nothing leaves your device.' },
  { file: 'support/index.html', path: '/support/', priority: '0.6',
    title: 'Support — Inko',
    description: 'Questions about invoices, signatures or your subscription? Write to the developer directly. Every message is read and usually answered the same day.' },
  { file: 'privacy/index.html', path: '/privacy/', priority: '0.4',
    title: 'Privacy Policy — Inko',
    description: 'Inko keeps your invoices and signatures on your device. No accounts, no server storage of your documents, no selling of data.' },
  { file: 'terms/index.html', path: '/terms/', priority: '0.4',
    title: 'Terms of Use — Inko',
    description: 'The terms that apply when you use Inko for invoices, estimates and electronic signatures on iPhone.' },
  { file: 'about/index.html', path: '/about/', priority: '0.7',
    title: 'About Inko — built by one iOS developer',
    description: 'Why Inko exists, who builds it, and why your invoices and signatures never leave your iPhone. Written by Evgeniy Mityulya, iOS engineer.' },
  { file: 'faq/index.html', path: '/faq/', priority: '0.8', faq: true,
    title: 'FAQ — Inko | Signatures, estimates and invoices',
    description: 'Is a finger signature legally binding? Can a client sign on your phone? Straight answers about electronic signatures, estimates and invoices in Inko.' },
  { file: 'esign/index.html', path: '/esign/', priority: '0.9',
    title: 'Client Signatures on a Phone — Inko',
    description: 'Signing your own paperwork is solved. Getting the client to sign on the spot is not. How electronic signatures work on a phone and what makes one hold up.' },
  { file: 'esign/sign-document-iphone/index.html', path: '/esign/sign-document-iphone/', priority: '0.8',
    title: 'How to Sign a Document on iPhone — Free and Paid Ways',
    description: 'Sign a PDF yourself with Markup for free, and see what to use when a client has to sign on your screen instead. Step by step, no account needed.' },
  { file: 'esign/docusign-alternative/index.html', path: '/esign/docusign-alternative/', priority: '0.8',
    title: 'DocuSign Alternative for a Few Documents a Year',
    description: 'DocuSign killed its free plan in 2022. If you sign two documents a year and the other person is standing next to you, here is the smaller shape of tool.' },
  { file: 'esign/legally-binding/index.html', path: '/esign/legally-binding/', priority: '0.8',
    title: 'Are Electronic Signatures Legally Binding',
    description: 'Yes in most everyday cases, under ESIGN, UETA, UK eIDAS, the Australian ETA and Canadian UECA. What those laws require and what is still excluded.' },
  { file: 'for/index.html', path: '/for/', priority: '0.8',
    title: 'Who Uses Inko — Trades, Developers, Designers',
    description: 'One engine, different workflows. Ninety one currencies, estimates signed on the spot and no cut of your payments, whatever line of work you send invoices in.' },
  { file: 'for/tradesmen/index.html', path: '/for/tradesmen/', priority: '0.8',
    title: 'Invoice App for Tradesmen — Quotes Signed on Site',
    description: 'Price the job in the hallway, get it signed with a finger, convert the estimate to an invoice when the work is done. Works with no signal, takes no cut.' },
  { file: 'for/developers/index.html', path: '/for/developers/', priority: '0.8',
    title: 'Invoicing for Developers and IT Contractors',
    description: 'Milestones instead of hours, a signed estimate as your scope document, and ninety one currencies for clients who pay from another country.' },
  { file: 'for/designers/index.html', path: '/for/designers/', priority: '0.8',
    title: 'Invoices and Estimates for Designers',
    description: 'Revisions and usage rights written as line items, a deposit as its own line, and documents that carry your own colour, logo and typeface.' },
  { file: 'for/photographers/index.html', path: '/for/photographers/', priority: '0.8',
    title: 'Invoices and Releases for Photographers',
    description: 'Quote the shoot, hold the date with a signature, sign the release on location and turn the same document into an invoice after delivery.' },
  { file: 'support/thanks/index.html', path: '/support/thanks/', priority: null, robots: 'noindex,follow',
    title: 'Message sent — Inko',
    description: 'Your message reached the developer.' }
];
