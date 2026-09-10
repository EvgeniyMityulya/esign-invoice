// Content hubs. Each page answers one question people actually type, in the
// app's own voice. Nothing here promises what the app cannot do yet: no VAT
// numbers, no "Tax Invoice" heading, no country tax pages until v1.2 ships
// those fields. Signatures, currencies and the estimate-to-invoice flow are
// all real today.

export const HUBS = [
  {
    slug: 'esign',
    kind: 'hub',
    title: 'Signing on a phone',
    h1: 'Getting a signature on a phone',
    lead: 'Hand over the phone. They draw. Done.',
    introTitle: 'The gap every app leaves',
    intro: 'Preview on a Mac and Markup on an iPhone sign your own paperwork for free. Neither helps when a second person has to sign. That path runs through an email, an account and a subscription, and the customer signs tomorrow instead of now.',
    sections: [
      { h: 'What counts as a signature?', p: 'A drawn mark is enough for the vast majority of everyday agreements. The US ESIGN Act and UETA, the UK eIDAS regulations, the Australian Electronic Transactions Act and the Canadian UECA all accept an electronic signature where a handwritten one would do. What matters is intent, association with the document, and being able to show who signed and when.' },
      { h: 'Why does the record matter more than the mark?', p: 'A signature image on its own proves little. Inko writes an entry for every signed document with the time, the document title and the parties, and can produce a completion certificate alongside the PDF. That record is what answers a dispute, not how neat the line looked.' },
      { h: 'The part nobody builds', p: 'Every large signing service is designed around sending a document away. That is the right shape for a contract between offices and the wrong shape for a quote agreed at a kitchen table. On site, the fastest path is the phone already in your hand.' }
    ],
    links: [
      { to: 'esign/sign-document-iphone', text: 'How to sign a document on an iPhone' },
      { to: 'esign/docusign-alternative', text: 'Coming from a subscription service' },
      { to: 'esign/legally-binding', text: 'Are electronic signatures legally binding' }
    ]
  },

  {
    slug: 'esign/sign-document-iphone',
    parent: 'esign',
    title: 'Sign a document on iPhone',
    h1: 'How to sign a document on an iPhone',
    lead: 'Three ways, and two of them are free.',
    introTitle: 'Which one do you need?',
    intro: 'Signing it yourself needs no app at all. Getting a client to sign, while they stand in front of you, does.',
    steps: {
      title: 'Signing something yourself, free, no app',
      items: [
        'Open the PDF in Files or straight from the email',
        'Tap the markup icon, the pen tip in the top right',
        'Tap the plus, choose Signature, draw it once and it is saved for next time',
        'Drag it onto the line, resize, then share the file back'
      ]
    },
    sections: [
      { h: 'Where does Markup run out?', p: 'Markup has no idea what a document is. It cannot record who signed, it cannot stamp a date next to the mark, and it treats a signature as a drawing on top of a picture. For your own paperwork that is fine. For anything you might have to defend later, it is thin.' },
      { h: 'What if someone else has to sign?', p: 'This is the real reason people look for an app. Inko keeps the document on your phone, you turn the screen around, and the client draws with a finger. No app for them, no account, no email round trip. The signed PDF and its record land back on your device.' },
      { h: 'What about a photo of a paper signature?', p: 'It works and it is legal, but it is the weakest option. A pasted image carries no timestamp and no link to the document it sits on, so it is the easiest thing to dispute and the easiest to reuse without permission.' }
    ],
    links: [
      { to: 'esign/legally-binding', text: 'Whether that signature holds up' },
      { to: 'esign/docusign-alternative', text: 'How this compares with the big services' }
    ]
  },

  {
    slug: 'esign/docusign-alternative',
    parent: 'esign',
    title: 'DocuSign alternative',
    h1: 'A DocuSign alternative for people who sign a few documents',
    lead: 'Paying monthly to sign twice a year.',
    introTitle: 'Why does the price feel wrong?',
    intro: 'The big signing services route documents between people in different buildings, and they price for that routing. If your customer is standing next to you, routing is the part you never use.',
    compare: {
      title: 'Two different jobs',
      head: ['', 'Routing services', 'Inko'],
      rows: [
        ['Signing happens', 'By email, later', 'In front of you, now'],
        ['The other person needs', 'A link and often an account', 'Nothing, they use your phone'],
        ['Works with no signal', 'No, it needs the cloud', 'Yes, everything is on the device'],
        ['Your documents live', 'On someone else\'s servers', 'On your phone'],
        ['Cost to sign one document', 'A monthly subscription', 'Free tier, no watermark']
      ]
    },
    sections: [
      { h: 'What is Inko built for?', p: 'The moment both people are in the same place. A quote agreed at a kitchen table, a release signed at a shoot, a contract signed across a desk. Everything in the app is shaped around that minute, which is why it needs no account, no signal and no second app for the other person.' },
      { h: 'Why does that make it faster?', p: 'Nothing leaves the device and nobody waits for an email, so the whole exchange happens while the customer is still in front of you. One tap turns the signed estimate into an invoice, and the record of who signed and when is saved next to it.' },
      { h: 'What do you get?', p: 'A signed PDF in under a minute, a completion certificate with the time and the parties, ninety one currencies, three premium templates, and your documents staying on your own phone. No commission on anything you get paid.' }
    ],
    links: [
      { to: 'esign/legally-binding', text: 'Is an electronic signature legally binding' },
      { to: 'for/tradesmen', text: 'If you quote jobs on site' }
    ]
  },

  {
    slug: 'esign/legally-binding',
    parent: 'esign',
    title: 'Are e-signatures legally binding',
    h1: 'Are electronic signatures legally binding',
    lead: 'Yes, for almost everything you sign.',
    introTitle: 'The part that actually matters',
    intro: 'Electronic signatures have been recognised for two decades, and a mark drawn with a finger is one of them. The question is never whether it counts. It is what you can show afterwards.',
    laws: {
      title: 'The laws behind it',
      rows: [
        ['United States', 'ESIGN Act 2000 and UETA at state level'],
        ['United Kingdom', 'eIDAS as retained in UK law, plus the Electronic Communications Act 2000'],
        ['Australia', 'Electronic Transactions Act 1999'],
        ['Canada', 'UECA and PIPEDA at federal level'],
        ['European Union', 'eIDAS Regulation 910/2014']
      ]
    },
    sections: [
      { h: 'What do these laws require?', p: 'They ask three things. The signer intended to sign. The signature is connected to the document rather than floating loose. Both are capable of being retained and reproduced later. A drawn signature saved into the PDF with a record of the time meets all three.' },
      { h: 'What is excluded?', p: 'Wills, some property transfers, powers of attorney and a handful of family law documents still want wet ink or a witness, and the list differs by country. If a document has a legal formality attached to it, check before relying on any electronic signature, including the expensive ones.' },
      { h: 'Where do cheap tools fall down?', p: 'Not on legality, on evidence. If all you kept is an image pasted on a page, you have no time, no context and no way to show the document was not altered afterwards. Inko keeps a ledger entry for each signing and can render a completion certificate next to the document.' },
      { h: 'One honest caveat', p: 'This is a plain description of how these laws work, not legal advice, and the author builds software rather than practises law. For anything high value, ask someone qualified in your jurisdiction.' }
    ],
    links: [
      { to: 'esign/sign-document-iphone', text: 'How to sign on an iPhone' },
      { to: 'esign', text: 'Back to signing on a phone' }
    ]
  },

  {
    slug: 'for',
    kind: 'hub',
    title: 'Who uses Inko',
    h1: 'Built for whoever sends the invoice themselves',
    lead: 'Same document, different line items.',
    introTitle: 'One engine, four workflows',
    intro: 'A developer bills in milestones, a designer in rounds, a tradesman on the spot. The app underneath is the same, so these pages are about the workflow, not about different features.',
    sections: [
      { h: 'Bill in the currency the client pays in', p: 'Inko carries ninety one currencies, from the pound, euro and dollar to the zloty, dirham, rand and tenge. You set the one your business bills in, and a price book item can carry a different one when you buy materials abroad.' },
      { h: 'The estimate is the useful part', p: 'Quote first, get it signed, convert it to an invoice when the work is done. The signature is what stops the argument about what was agreed, and the conversion is what stops you typing the same lines twice.' },
      { h: 'Nothing routes through us', p: 'No account, no server holding your documents, no cut of what you get paid. The app makes the PDF and you send it however you already send things.' }
    ],
    links: [
      { to: 'for/tradesmen', text: 'Trades and site work' },
      { to: 'for/developers', text: 'Developers and IT contractors' },
      { to: 'for/designers', text: 'Designers and studios' },
      { to: 'for/photographers', text: 'Photographers and videographers' }
    ]
  },

  {
    slug: 'for/tradesmen',
    parent: 'for',
    title: 'Invoice app for tradesmen',
    h1: 'An invoice app for trades, quotes signed on site',
    lead: 'Quoted at the door, signed on the spot.',
    introTitle: 'The gap in a trade job',
    intro: 'You price the job in the hallway, the paperwork happens that evening, and by then the customer remembers the number differently. A signature at the moment of agreement closes that gap in fifteen seconds.',
    steps: {
      title: 'A job, step by step',
      items: [
        'Build the estimate on the spot, pulling repeat lines from your price book',
        'Turn the phone around, the customer signs with a finger',
        'The signed PDF and its record are saved to your device',
        'When the job is done, convert the same estimate into an invoice',
        'Mark it paid or overdue, chase from the client screen'
      ]
    },
    sections: [
      { h: 'Materials and labour in one document', p: 'The price book keeps both, with unit types like the metre, the hour or the linear foot, and remembers which lines are taxable. A material bought in another currency keeps its own code so the maths stays honest.' },
      { h: 'Works with no signal', p: 'Basements, new builds and half the countryside have no data. Everything in Inko happens on the device, so a dead zone changes nothing about whether you can quote.' },
      { h: 'No cut of the job', p: 'Inko does not process payments and takes no percentage. You get paid however you already get paid, by transfer, card machine or cash, and the app just makes the paperwork.' }
    ],
    links: [
      { to: 'esign/sign-document-iphone', text: 'Getting the signature itself' },
      { to: 'for', text: 'Other trades and professions' }
    ]
  },

  {
    slug: 'for/developers',
    parent: 'for',
    title: 'Invoices for developers',
    h1: 'Invoicing for developers and IT contractors',
    lead: 'Milestones, retainers, clients abroad.',
    introTitle: 'What breaks in contract work?',
    intro: 'The work is remote, the client is often abroad, and the money arrives in their currency. What holds it together is a scope agreed in writing rather than on a call.',
    steps: {
      title: 'A project through the app',
      items: [
        'Write the estimate as milestones rather than hours, so scope is visible',
        'Get it signed before the first commit, in person or on your screen at a kickoff',
        'Invoice per milestone from the same document, no retyping',
        'Track paid and overdue per client rather than in a spreadsheet'
      ]
    },
    sections: [
      { h: 'Billing across borders', p: 'Ninety one currencies are built in, so a client paying in euros, pounds, dirhams or tenge gets an invoice in their own denomination rather than a converted guess. Your reports still group by currency, so nothing is silently mixed.' },
      { h: 'The estimate is your scope document', p: 'A signed estimate is the cheapest protection against scope creep that exists. It costs nothing, it takes a minute, and it turns "we assumed that was included" into a document with a date on it.' },
      { h: 'Your client list is not a spreadsheet', p: 'Clients, their documents and their totals live together, so answering "what has this client paid this year" takes one tap rather than a search through a folder of PDFs.' }
    ],
    links: [
      { to: 'esign/docusign-alternative', text: 'If you are paying a monthly fee to sign' },
      { to: 'for/designers', text: 'Similar workflow, different lines' }
    ]
  },

  {
    slug: 'for/designers',
    parent: 'for',
    title: 'Invoices for designers',
    h1: 'Invoices and estimates for designers',
    lead: 'Rounds, rights and the deposit.',
    introTitle: 'Where do design jobs go wrong?',
    intro: 'Two things cause almost every dispute. How many revisions are included, and what the client may do with the result. Both belong on a signed estimate, before anything gets designed.',
    steps: {
      title: 'A project through the app',
      items: [
        'Estimate lists the deliverable, the number of rounds and the usage',
        'Deposit as its own line, so the terms are visible not verbal',
        'Client signs the estimate, on your screen or at the meeting',
        'Convert to an invoice on delivery, add extra rounds as new lines'
      ]
    },
    sections: [
      { h: 'Revisions as line items', p: 'Two rounds included, third round priced. Written that way on the estimate, an extra round becomes a normal conversation about a number rather than an argument about what was implied.' },
      { h: 'Documents that look like your studio', p: 'Three premium templates with your own accent colour, logo and typeface. A designer sending a default beige invoice undermines the invoice.' },
      { h: 'Deposits and staged payments', p: 'Split the job across documents, mark each paid as it lands, and see what is outstanding per client without opening a spreadsheet.' }
    ],
    links: [
      { to: 'for/photographers', text: 'Shoots and licensing' },
      { to: 'esign/legally-binding', text: 'Whether a signed estimate holds up' }
    ]
  },

  {
    slug: 'for/photographers',
    parent: 'for',
    title: 'Invoices for photographers',
    h1: 'Invoices, quotes and releases for photographers',
    lead: 'Booked, signed and invoiced on the phone.',
    introTitle: 'Three moments, one document',
    intro: 'A booking, a release on the day, an invoice after delivery. All three are the same document at different stages, and all three happen on the device in your hand.',
    steps: {
      title: 'A shoot through the app',
      items: [
        'Quote the shoot with the day rate, travel and licensing as separate lines',
        'The client signs the quote when booking, so the date is held',
        'On the day, a release or a model agreement is signed the same way',
        'After delivery, the quote becomes the invoice'
      ]
    },
    sections: [
      { h: 'Licensing belongs on the document', p: 'Personal use, commercial use, social only, print. Written as its own line with its own price, licensing stops being an awkward conversation six months later when the photo turns up on a billboard.' },
      { h: 'Signatures on location', p: 'A release signed on your phone at the shoot beats one emailed afterwards, because afterwards half of them never come back. It takes fifteen seconds and the record is kept with the document.' },
      { h: 'Travel, prints and extras', p: 'The price book keeps the lines you use on every job, so a quote is assembled rather than typed. Prints and albums carry their own units and currency where they need to.' }
    ],
    links: [
      { to: 'for/designers', text: 'Rounds and usage rights' },
      { to: 'esign/sign-document-iphone', text: 'How signing works' }
    ]
  }
];
