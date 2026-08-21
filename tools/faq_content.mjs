// FAQ source. Feeds the page and the FAQPage schema, so both stay identical.
// Answers stay short and concrete; every one of them is true of the shipped app.
export const FAQ = [
  {
    q: 'Is a signature drawn with a finger legally binding?',
    a: 'In most everyday cases yes. The US ESIGN Act and UETA, the UK eIDAS regulations, the Australian Electronic Transactions Act 1999 and the Canadian UECA all accept an electronic signature for ordinary business documents, and a drawn signature counts as one. Land transfers, wills and a few other categories still need paper or a qualified certificate, so check before you use any app for those.'
  },
  {
    q: 'Can a client sign an estimate on my phone, in person?',
    a: 'That is what Inko is built around. You hand over the phone, the client draws their signature on the document, and it is placed with the date. When the job is approved the estimate turns into an invoice in one tap, so you do not retype anything.'
  },
  {
    q: 'Can I photograph my handwritten signature and reuse it?',
    a: 'Yes. Sign on paper, take a photo, and Inko lifts the ink off the background and saves it to your signature library. After that you place it on any document without drawing it again, and it stays sharp at any size.'
  },
  {
    q: 'Do I need an account to sign a document?',
    a: 'No. There is no sign-up and no server. Documents, signatures and clients live on your iPhone, which also means the app works on a job site with no signal.'
  },
  {
    q: 'Does Inko take a cut of my payments?',
    a: 'None at all. You add a payment QR code that points at your own PayPal, Stripe, Revolut, Venmo, Zelle or Cash App, and the client pays you directly. Inko never touches the money, so there is nothing to hold or delay.'
  },
  {
    q: 'What is the difference between an estimate and an invoice?',
    a: 'An estimate says what the work will cost before it starts, and the client signs it to approve. An invoice asks for payment once the work is done. Inko keeps both in one place and converts a signed estimate into an invoice without re-entering the line items.'
  },
  {
    q: 'Can I put my own logo and colours on the documents?',
    a: 'Yes, and it is not a choice between three fixed templates. You set the accent colour, the font, the frame, the table style, your logo and the footer, so the document looks like your business rather than like an app.'
  },
  {
    q: 'Is Inko free?',
    a: 'The app is free to download and the first documents cost nothing. Premium unlocks the template constructor, extra fonts and frames, the payment QR code and unlimited documents. There is no watermark on the free tier.'
  }
];
