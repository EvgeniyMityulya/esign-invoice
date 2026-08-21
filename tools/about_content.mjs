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
      title: 'Estimate, signature, invoice',
      body: 'Build it in a minute, hand over the phone, and the client signs with a finger. The signed estimate **becomes an invoice in one tap**.',
      art: 'art/3d-document.png',
      alt: 'A document with a signature'
    },
    {
      tag: 'Payments',
      title: 'Paid directly, with no cut',
      body: 'The payment QR code points at **your own PayPal, Stripe or Revolut**. Inko never holds the money and takes no commission.',
      art: 'art/3d-coin.png',
      alt: 'A chrome coin'
    },
    {
      tag: 'Security',
      title: 'Nothing leaves the phone',
      body: 'No accounts, no server. Documents and signatures **stay on your iPhone**, so the app also works with no signal.',
      art: 'art/3d-shield.png',
      alt: 'A shield'
    }
  ],
  whoTitle: 'Developer',
  name: 'Evgeniy Mityulya',
  role: 'iOS Engineer, Founder of Inko',
  who: [
    'I write the app and every document it produces, alone. If something in a PDF looks wrong, you know exactly whom to tell 🙂',
    'Write to me directly. Requests from people who invoice for a living get built first.'
  ],
  photo: 'author.jpg'
};

export const AUTHOR_LINKS = [
  { label: 'LinkedIn', handle: 'Evgeniy Mityulya', href: 'https://www.linkedin.com/in/evgeniy-mityulya/', icon: 'linkedin', color: '#0A66C2' },
  { label: 'Telegram', handle: '@evgeniymityulya', href: 'https://t.me/evgeniymityulya', icon: 'telegram', color: '#26A5E4' },
  { label: 'X', handle: '@Evgeniy_iOS', href: 'https://x.com/Evgeniy_iOS', icon: 'x', color: '#111111' }
];
