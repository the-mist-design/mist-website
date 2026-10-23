import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { site } from '../data/site';

// Sitemap for search engines (submitted in Google Search Console). Add new pages here.
const paths = ['/', ...projects.map((p) => `/case-study/${p.slug}/`), site.gapReview.url, '/privacy-policy/'];

export const GET: APIRoute = () => {
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site.url).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
