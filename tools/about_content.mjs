// The /about copy. Same shape as the Clinky page: why the app exists, who builds
// it, what happens to your data. Edit here, the page is generated.
export const ABOUT = {
  title: 'About Inko',
  lead: 'An iPhone app for the paperwork at the end of a job: estimates, signatures and invoices, finished before you leave.',
  // three blocks in the same style as the home page
  blocks: [
    {
      tag: 'The app',
      title: 'What Inko actually is',
      body: 'An estimate, a client signature and an invoice, all on one phone. You build the document in a minute, the client signs it with a finger, and the signed estimate becomes an invoice in one tap. Nothing to install on their side, no email round trip.',
      art: 'art/3d-document.png',
      alt: 'A document with a signature'
    },
    {
      tag: 'Why it exists',
      title: 'Paperwork always slips to next week',
      body: 'Every trade and freelance job ends the same way. The work is done, everyone stands in the hallway, and you promise to send the estimate later. Later becomes next week, and next week becomes an awkward reminder. Inko closes that gap while you are still on site.',
      art: 'art/3d-coin.png',
      alt: 'A chrome coin'
    },
    {
      tag: 'Your data',
      title: 'Nothing leaves the phone',
      body: 'There are no accounts and no server. Clients, documents and signatures stay on your iPhone, so I cannot see who you work for or what you charge. Payment QR codes point at your own PayPal, Stripe or Revolut, so the money never passes through me either.',
      art: 'art/3d-shield.png',
      alt: 'A shield'
    }
  ],
  whoTitle: 'Who makes it?',
  name: 'Evgeniy Mityulya',
  role: 'iOS Engineer, Founder of Inko',
  who: [
    'I write the app and the documents it produces, alone. That includes the PDF renderer, the signature engine and every default template, so if something in a document looks wrong you know exactly whom to tell 🙂',
    'Write to me directly. Feature requests from people who actually invoice for a living are the ones that get built first.'
  ],
  photo: 'author.jpg'
};

export const AUTHOR_LINKS = [
  { label: 'LinkedIn', handle: 'Evgeniy Mityulya', href: 'https://www.linkedin.com/in/evgeniy-mityulya/', icon: 'linkedin', color: '#0A66C2' },
  { label: 'Telegram', handle: '@evgeniymityulya', href: 'https://t.me/evgeniymityulya', icon: 'telegram', color: '#26A5E4' },
  { label: 'X', handle: '@Evgeniy_iOS', href: 'https://x.com/Evgeniy_iOS', icon: 'x', color: '#111111' }
];
