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
  whoTitle: 'Founder',
  name: 'Evgeniy Mityulya',
  role: 'iOS Engineer\nFounder of Inko',
  who: [
    'Hi, I am Evgeniy! Thanks for reading this far. If Inko is already on your phone, thank you twice, and if it is not, I hope you give it a try.',
    'I built it because I wanted all of this in one place. Sign a document in seconds, turn a finished job into an invoice, then style that invoice the way each client expects. All of it on the phone that is already in my hand, with nothing to open first and no laptop involved. The small details are where most of the work went, and I hope you notice them. If something does go wrong, you know where to find me 🙂',
    'Write to me on any of these, I usually answer the same day!'
  ],
  photo: 'author.jpg'
};

export const AUTHOR_LINKS = [
  { label: 'LinkedIn', handle: 'Evgeniy Mityulya', href: 'https://www.linkedin.com/in/evgeniy-mityulya/', icon: 'linkedin', chip: '#FFFFFF', mark: '#0A66C2' },
  { label: 'Telegram', handle: '@evgeniymityulya', href: 'https://t.me/evgeniymityulya', icon: 'telegram', chip: '#FFFFFF', mark: '#26A5E4' },
  { label: 'X', handle: '@Evgeniy_iOS', href: 'https://x.com/Evgeniy_iOS', icon: 'x', chip: '#FFFFFF', mark: '#111111' }
];
