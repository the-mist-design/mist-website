// Global site settings. Change the email here and it updates everywhere.
export const site = {
  name: 'MIST',
  url: 'https://mistdesign.co',
  email: 'hello@mistdesign.co', // TODO: replace with the real address before launch
  tagline: 'Brand Identity & Packaging Design for Brands Built to Last',
  description:
    "Brand identity and packaging design by Stefan, MIST. Complete brand systems made to last for generations, not trends.",
  assessmentUrl: '/the-positioning-brief/',
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
