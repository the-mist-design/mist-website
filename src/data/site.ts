// Global site settings. Change the email here and it updates everywhere.
export const site = {
  name: 'MIST',
  url: 'https://mistdesign.co',
  email: 'stefan@mistdesign.co',
  tagline: 'Brand Identity & Packaging Design for Brands Built to Last',
  description:
    "Brand identity and packaging design by Stefan, MIST. Complete brand systems made to last for generations, not trends.",
  // Google Analytics 4 (loads only after cookie consent). The ID is public, not a secret.
  analytics: {
    measurementId: 'G-LES9EWYTED',
  },
  gapReview: {
    label: 'The Gap Review',
    url: '/the-gap-review/',
    // Shown on the thank-you screen after the brief is sent.
    bookCallUrl: 'https://calendly.com/mistdesign/intro-call',
    callMinutes: 30,
  },
  socials: [
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/the.mist.design/' },
    { name: 'TikTok', icon: 'tiktok', url: 'https://www.tiktok.com/@mistdesign' },
    // LinkedIn: add here when ready, e.g. { name: 'LinkedIn', icon: 'linkedin', url: '...' }
  ],
  nav: [
    { label: 'Projects', href: '/#projects' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '#contact' }, // scrolls to the CTA on the current page
  ],
};
