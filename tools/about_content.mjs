// The /about copy. Same shape as the Clinky page: why the app exists, who builds
// it, what happens to your data. Edit here, the page is generated.
export const ABOUT = {
  eyebrow: 'About',
  title: 'Built by one developer who was tired of chasing paperwork',
  lede: 'Inko started as a tool for my own jobs, not as a product plan.',
  storyTitle: 'Why does this exist?',
  story: [
    'Every trade and freelance job ends the same way. The work is done, everyone is standing in the hallway, and the paperwork starts. You promise to send an estimate later, then an invoice later still, and later turns into next week.',
    'Inko closes that gap on the spot. You build the estimate in a minute, the client signs it on your phone before you leave, and the signed estimate becomes an invoice in one tap. No laptop, no signal needed, no account to create.'
  ],
  whoTitle: 'Who makes it?',
  name: 'Evgeniy Mityulya',
  role: 'iOS Engineer, Founder of Inko',
  who: [
    'I write the app and the documents it produces, alone. That includes the PDF renderer, the signature engine and every default template, so if something in a document looks wrong you know exactly whom to tell 🙂',
    'Write to me directly. Feature requests from people who actually invoice for a living are the ones that get built first.'
  ],
  dataTitle: 'What happens to your data?',
  data: 'There are no accounts and there is no server. Clients, invoices and signatures stay on your iPhone, so I cannot see who you work for or what you charge. Payment QR codes point at your own PayPal, Stripe or Revolut, which means the money never passes through me either.'
};

export const AUTHOR_LINKS = [
  { label: 'LinkedIn', handle: 'Evgeniy Mityulya', href: 'https://www.linkedin.com/in/evgeniy-mityulya/', icon: 'linkedin', color: '#0A66C2' },
  { label: 'Telegram', handle: '@evgeniymityulya', href: 'https://t.me/evgeniymityulya', icon: 'telegram', color: '#26A5E4' },
  { label: 'X', handle: '@Evgeniy_iOS', href: 'https://x.com/Evgeniy_iOS', icon: 'x', color: '#111111' }
];
