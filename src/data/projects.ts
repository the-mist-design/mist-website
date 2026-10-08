import type { ImageMetadata } from 'astro';

import thumbUkusi from '../assets/projects/ukusi-morave.jpg';
import thumbMaster from '../assets/projects/master.jpg';
import thumbDvaLica from '../assets/projects/dva-lica.jpg';

import logoUkusi from '../assets/logos/ukusi-morave.svg?raw';
import logoMaster from '../assets/logos/master.svg?raw';
import logoDvaLica from '../assets/logos/dva-lica.svg?raw';

const caseImages = import.meta.glob<{ default: ImageMetadata }>('../assets/case/*/img-*.jpg', {
  eager: true,
});

/**
 * Returns the 10 case study images (index 0 = Image 1) for a project folder.
 * A missing file returns null and renders as an empty template slot.
 */
function imagesFor(slug: string): (ImageMetadata | null)[] {
  return Array.from({ length: 10 }, (_, i) => caseImages[`../assets/case/${slug}/img-${i + 1}.jpg`]?.default ?? null);
}

export interface Solution {
  title: string;
  text: string;
}

export interface Project {
  slug: string;
  name: string;
  /** One-line description used on cards and "Next case study". */
  description: string;
  categories: string[];
  thumbnail: ImageMetadata;
  /** CSS object-position for the thumbnail crop. */
  thumbnailPosition?: string;
  logoSvg: string;
  logoHeight: number;
  title: string;
  summary: string;
  details: { label: string; value: string }[];
  challenge: string[];
  outcome: string;
  testimonial: { quote: string; name: string; position: string };
  solutions: [Solution, Solution, Solution, Solution];
  images: (ImageMetadata | null)[];
  imageAlts: string[];
}

export const projects: Project[] = [
  {
    slug: 'ukusi-morave',
    name: 'Ukusi Morave',
    description: 'Brand Identity design for high-end wine & food fair.',
    categories: ['Brand Identity Design', 'Brand Applications', 'Art Direction'],
    thumbnail: thumbUkusi,
    logoSvg: logoUkusi,
    logoHeight: 48,
    title: "A new fair, built to feel like it's been here for decades.",
    summary:
      "Ukusi Morave brings the region's best wine, rakija, honey and food producers together in one place. We built its identity from scratch, rooted in the region's rivers, wine and tradition, and carried it into every detail guests can see and touch. From day one, it looked and felt like a premium fair, for exhibitors and visitors alike.",
    details: [
      { label: 'Price', value: '3000€' },
      { label: 'Deadline', value: '4 weeks' },
      { label: 'Year', value: '2023.' },
    ],
    challenge: [
      'Ukusi Morave is a new food and drink fair from the Morava region. It gathers local producers of wine, rakija, honey and traditional food, with tastings and talks for visitors.',
      'A new event has no name to lean on. Without a strong identity, it would have looked like one more local fair, and it needed to win over serious producers and their guests before the first edition even opened.',
      'We agreed on a complete brand identity: the logo system, the visual system, and the materials for the fair itself, from invitations to on-site details.',
    ],
    outcome:
      'From its first edition, Ukusi Morave looked and felt like a high-end fair, the kind producers want to be part of.',
    testimonial: {
      quote:
        'Stefan perfectly blended the traditions of our region with clean, timeless design, beautifully reflecting authentic quality. Pure professionalism!',
      name: 'Ivana Todorov',
      position: 'Marketing Lead at Ukusi Morave',
    },
    solutions: [
      {
        title: 'Five symbols in one mark.',
        text: 'The letters M and U, a traditional Serbian cap, three rivers and a wine glass, combined into a single symbol. It tells the story of the region and stays clear at any size, from a small label to a large banner.',
      },
      {
        title: 'Wine red as the main brand color.',
        text: 'Wine is at the center of the fair, so red was the natural place to start. It ties every print and digital piece together, so everything clearly belongs to one fair.',
      },
      {
        title: 'Printed invitations for every exhibitor.',
        text: 'Each exhibitor received a personal invitation on textured paper, in a matching envelope. A letter takes more effort than an email, and that effort shows producers the fair takes them seriously.',
      },
      {
        title: 'Real materials, down to the smallest detail.',
        text: 'The symbol is stitched into the flags and embossed into leather coasters. These are small touches, but they make the whole fair feel carefully made.',
      },
    ],
    images: imagesFor('ukusi-morave'),
    imageAlts: [
      'Ukusi Morave primary logo on the wine red background',
      'Creative direction moodboard for Ukusi Morave',
      'The Ukusi Morave mark in use at different sizes',
      'Sketches of the Ukusi Morave mark',
      'Ukusi Morave design system: logo, colors and typography',
      'Wine red across Ukusi Morave print materials',
      'Wine red across Ukusi Morave digital materials',
      'Printed exhibitor invitation and envelope',
      'Stitched flag and embossed leather coaster with the Ukusi Morave symbol',
      'Ukusi Morave brand in use at the fair',
    ],
  },
  {
    slug: 'master',
    name: 'MASTER',
    description: 'Design System for a brand developing human potential, inspired by martial arts.',
    categories: ['Brand Identity Design', 'Design System', 'Brand Applications'],
    thumbnail: thumbMaster,
    logoSvg: logoMaster,
    logoHeight: 40,
    title: 'One master brand, ready for every new branch.',
    summary:
      "MASTER is Serge's practice for bringing the lessons of Eastern martial arts into modern life. We built its first real identity as a master brand that new sub-brands can grow from, and carried it from posters and emails to a full website with an online learning platform. The business now has one clear system to grow on.",
    details: [
      { label: 'Price', value: '6500€' },
      { label: 'Deadline', value: '8 weeks' },
      { label: 'Year', value: '2026.' },
    ],
    challenge: [
      'Serge runs MASTER, a personal development practice in Switzerland inspired by martial arts, adapted for modern life: career, sport and everyday challenges. He works with clients in training spaces and online.',
      'The business worked, but it had no defined brand. Serge was ready to grow it into several smaller brands, and without one strong identity at the center, each new brand would have looked like a separate business.',
      'We agreed on a master brand identity that sub-brands can build on, for print and online materials, and the design of the whole website, including its learning platform.',
    ],
    outcome:
      'The master brand identity was extended across the sub-brands, creating a clear visual connection between them.',
    testimonial: {
      quote: '100% professional. Demonstrates creative, conceptual, and strategic design thinking.',
      name: 'Serge Cvetković',
      position: 'Founder of MASTER',
    },
    solutions: [
      {
        title: 'Eastern tradition shaped by Swiss minimalism.',
        text: 'The mark, symbols and colors draw on the tradition, culture and mysticism of Eastern martial arts. Swiss minimalism, a style built on clean grids and few elements, keeps it all calm and clear.',
      },
      {
        title: 'From the city streets to the training room.',
        text: 'Posters, signs and flyers promote MASTER across Zurich, in the streets around the training space and inside it. Clients also get the same materials in digital form, so the brand looks the same wherever they meet it.',
      },
      {
        title: 'A website with a Digital Dojo inside.',
        text: 'One design system keeps both parts consistent and easy to recognize: the marketing pages that present MASTER to new clients and the digital dojo, the online platform where they learn and train.',
      },
      {
        title: 'Sub-brands that clearly belong to MASTER.',
        text: 'Each sub-brand keeps the master identity and adds its own color and an addition to the logo. Clients see right away that it is part of MASTER, and which part.',
      },
    ],
    images: imagesFor('master'),
    imageAlts: [
      'MASTER primary logo',
      'Creative direction: Eastern martial arts next to Swiss minimalism',
      'The MASTER mark and symbols in use',
      'Sketches of the MASTER mark and symbols',
      'MASTER design system: logo, colors and typography',
      'MASTER poster',
      'MASTER flyer',
      'MASTER website and Digital Dojo on a tablet',
      'MASTER Wear bag',
      'The Master Hack, a MASTER sub-brand',
    ],
  },
  {
    slug: 'dva-lica',
    name: 'Dva lica',
    description: 'Packaging design for a premium Serbian rakija.',
    categories: ['Packaging Design', 'SKU System', 'Print Design'],
    thumbnail: thumbDvaLica,
    thumbnailPosition: 'center top',
    logoSvg: logoDvaLica,
    logoHeight: 48,
    title: "One drawing that tells a whole distillery's story.",
    summary:
      'Dva lica made exceptional rakija, but had no packaging to show it. We built a packaging system around one hand-drawn illustration of their story, carried across eight varieties, a copper-foiled tube and print. It won a Grand Gold Medal for packaging design at the 92nd International Agricultural Fair in Novi Sad.',
    details: [
      { label: 'Price', value: '2000€' },
      { label: 'Deadline', value: '3 weeks' },
      { label: 'Year', value: '2024.' },
      { label: 'Credits', value: 'Product photography - Danijel Milić' },
    ],
    challenge: [
      'Dva lica, Serbian for "two faces", is a premium rakija distillery started by two friends, Nebojša and Toplica. The name stands for the two of them, and for a rakija that is rustic and refined at once.',
      'The rakija is made the traditional way, from fruit they grow themselves with an organic approach. They had a logo, but no packaging that showed any of this, so there was nothing to set it apart from competitors.',
      'We agreed on a packaging system that tells their story simply and works across eight rakija varieties, plus a brochure and business cards.',
    ],
    outcome:
      'The rakija is the same as before, but it now looks as premium as it tastes, with a Grand Gold Medal for packaging design to prove it.',
    testimonial: {
      quote:
        'Stefan managed to translate the character of our spirit, our way of working, and the emotion behind the brand into packaging that carries the soul of our rakija.',
      name: 'Nebojša Rakić',
      position: 'Co-Founder of Dva lica Distillery',
    },
    solutions: [
      {
        title: 'A hand-drawn illustration, every element with meaning.',
        text: "Drawn line by line, with no stock images: roots for tradition, books for knowledge, the still and barrels for distillation, orchards in the background. The lamb is a quiet symbol of the founders' Orthodox faith.",
      },
      {
        title: 'One bottle, one structure, a color for each.',
        text: 'All eight varieties share the same 500 ml bottle and label layout, and only the name and color change. The range reads as one family, and a new variety is easy to add.',
      },
      {
        title: 'A round tube with copper, not gold.',
        text: 'Instead of the usual rectangular box, each bottle comes in a cylindrical tube. Copper foil picks out the key details and feels premium without the gold finish so many bottles rely on.',
      },
      {
        title: 'The same drawing, carried into print.',
        text: "The brochure and business cards carry the same hand-drawn illustration. The brochure tells the distillery's story in full, for anyone who wants to know who is behind the rakija.",
      },
    ],
    images: imagesFor('dva-lica'),
    imageAlts: [
      'Dva lica bottle and copper-foiled tube',
      'Creative direction for the Dva lica illustration',
      'The Dva lica illustration on the label, close up',
      'Sketches of the Dva lica illustration',
      'Dva lica SKU system: labels, logo and typography',
      'The full Dva lica range lined up',
      'Dva lica labels close up',
      'The cylindrical Dva lica tube with copper foil',
      'Dva lica brochure and business card',
      'Dva lica bottle and tube together',
    ],
  },
];

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
