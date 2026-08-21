// The /about copy. Same shape as the Clinky page: why the app exists, who builds
// it, what happens to your data. Edit here, the page is generated.
export const ABOUT = {
  title: 'About Inko',
  // two lines, the first shorter than the second
  lead: 'Paperwork finished on your phone.\nEstimates, invoices and signatures, without a laptop or an account.',
  // short noun tags, bold marks the phrase that matters, same as the home page
  blocks: [
    {
      tag: 'Documents',
      title: 'From estimate to invoice',
      body: 'Build it in a minute, hand over the phone, and the client signs with a finger. One tap **turns it into an invoice**.',
      art: 'art/3d-document.png',
      alt: 'A document with a signature'
    },
    {
      tag: 'Payments',
      title: 'You keep every cent',
      body: 'The payment QR code points at **your own PayPal or Stripe**. Inko never holds the money and takes no commission.',
      art: 'art/3d-coin.png',
      alt: 'A chrome coin'
    },
    {
      tag: 'Security',
      title: 'Works without an account',
      body: 'No sign-up and no server to trust. Clients, documents and signatures **stay on your iPhone**, so the app keeps working with no signal on site.',
      art: 'art/3d-shield.png',
      alt: 'A shield'
    }
  ],
  whoTitle: 'Developer',
  name: 'Evgeniy Mityulya',
  role: 'iOS Engineer, Founder of Inko',
  who: [
    'I build Inko alone, which means the app, the PDF renderer, the signature engine and every default template come from the same pair of hands. If a document comes out wrong, you know exactly whom to tell 🙂',
    'The app started because I was tired of promising clients an estimate later and then writing it up at midnight. Everything in it exists to end that habit, and nothing is in it to collect data or upsell a plan.',
    'Write to me directly on any of these. Requests from people who invoice for a living get built first, and I usually answer the same day.'
  ],
  photo: 'author.jpg'
};

export const AUTHOR_LINKS = [
  { label: 'LinkedIn', handle: 'Evgeniy Mityulya', href: 'https://www.linkedin.com/in/evgeniy-mityulya/', icon: 'linkedin', chip: '#0A66C2', mark: '#FFFFFF' },
  { label: 'Telegram', handle: '@evgeniymityulya', href: 'https://t.me/evgeniymityulya', icon: 'telegram', chip: '#26A5E4', mark: '#FFFFFF' },
  { label: 'X', handle: '@Evgeniy_iOS', href: 'https://x.com/Evgeniy_iOS', icon: 'x', chip: '#FFFFFF', mark: '#111111' }
];
