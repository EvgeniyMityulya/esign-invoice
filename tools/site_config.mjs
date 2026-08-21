// One place that knows where the site lives. Flip SITE the day the domain is
// live and every generator follows: canonical, sitemap, robots, OG, schema.
export const SITE = 'https://evgeniymityulya.github.io/esign-invoice';
export const SITE_NEXT = 'https://inkoinvoice.com';

export const APP = {
  id: '6788092513',
  name: 'Inko: Invoice Maker & eSign',
  shortName: 'Inko',
  storeUrl: 'https://apps.apple.com/us/app/inko-invoice-maker-esign/id6788092513',
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
  { file: 'faq/index.html', path: '/faq/', priority: '0.8', faq: true,
    title: 'FAQ — Inko | Signatures, estimates and invoices',
    description: 'Is a finger signature legally binding? Can a client sign on your phone? Straight answers about electronic signatures, estimates and invoices in Inko.' },
  { file: 'support/thanks/index.html', path: '/support/thanks/', priority: null, robots: 'noindex,follow',
    title: 'Message sent — Inko',
    description: 'Your message reached the developer.' }
];
