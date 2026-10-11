# MIST — website

Statički sajt (Astro 5) za mistdesign.co: Home i tri case studija (Ukusi Morave, MASTER, Dva lica).

## Pokretanje

```bash
npm install
npm run dev       # lokalno: http://localhost:4321
npm run build     # produkcija u folder dist/
npm run preview   # pregled build-a
```

Potreban je Node 22.

## Gde se šta menja

| Šta | Gde |
| --- | --- |
| Email adresa (Nav, "Click to copy mail") | `src/data/site.ts` → `email` |
| Instagram, TikTok, (LinkedIn) | `src/data/site.ts` → `socials` |
| Tekstovi i detalji case studija | `src/data/projects.ts` |
| Slike case studija | `src/assets/case/<projekat>/img-1.jpg … img-10.jpg` |
| Thumbnail projekata | `src/assets/projects/` |
| Boje, fontovi, razmaci | `src/styles/global.css` (`:root`) |
| Hero, Social Proof, About, Testimonials | `src/components/` |
| The Gap Review: naziv dugmeta, adresa, "Book a call" link | `src/data/site.ts` → `gapReview` |
| The Gap Review: pitanja i sekcije | `src/pages/the-gap-review.astro` |

Ako neka slika case studija (`img-N.jpg`) nedostaje, na tom mestu stoji prazan template.

Slike se pri build-u automatski smanjuju i pretvaraju u AVIF/WebP, pa originale možeš ubaciti u punoj rezoluciji.

## Ponašanje

- **Hero Social Proof 1.1:** 3 stanja, smena na 3s uz progress bar, pa ispočetka.
- **Social Proof 2:** 3 stanja, smena na 5s; okvir oko slike klijenta se iscrtava kao progress. Klik na sliku prebacuje na tog klijenta.
- **Testimonials:** horizontalni scroll uz strelice, prevlačenje mišem, swipe i tastaturu (← →).
- **Slike projekata:** zoom in na hover.
- **Click to copy email:** kopira adresu, tekst prelazi u "Copied!" na 2s.
- **Contact** skroluje do CTA sekcije na trenutnoj strani; **Projects** i **About** vode na sekcije Home strane.
- **The Gap Review:** na otvaranju se vidi samo uvod (Opening Screen). "Start the Brief" skraćuje uvod i otvara upitnik. Sekcija "The Product" se pojavljuje samo ako je odgovor na "Do you sell a physical product?" *Yes, a product* ili *Both*, pa upitnik ima 4 ili 5 sekcija (brojevi sekcija i progress se prilagođavaju). Posle Submit-a ide Thank-you ekran sa imenom i email-om iz upitnika. Stara adresa `/the-positioning-brief/` preusmerava na novu (`netlify.toml`).
- Animacije se pauziraju dok je tab sakriven. Uz uključeno smanjeno kretanje (prefers-reduced-motion) prelazi su isključeni.

## Responsive

- **Desktop ≥ 1080px:** prati Figmu 1:1 na 1440. Između 1280 i 1439 margine se sužavaju sa 80 na 40px.
- **Tablet 768–1079px:** jedna kolona za projekte, About i Social Proof se slažu vertikalno, meni ide u hamburger.
- **Telefon < 768px:** hero slika iznad teksta, sve se slaže u jednu kolonu, CTA dugmad su pune širine.

## Deploy (Netlify)

`netlify.toml` je podešen (build: `npm run build`, publish: `dist`).

1. Postavi ovaj folder na GitHub repozitorijum.
2. Na Netlify-u izaberi **Add new site → Import from Git** i taj repozitorijum.
3. Netlify sam pokreće build na svaki push.

Za brz pregled bez Git-a: `npm run build`, pa prevuci folder `dist` na https://app.netlify.com/drop

## Još nije urađeno

- The Gap Review (`/the-gap-review/`): upitnik (4 ili 5 sekcija) i Thank-you ekran rade, ali slanje odgovora (Submit → email / Google Sheets) još nije povezano. Link za "Book a call" se menja u `src/data/site.ts` → `gapReview.bookCallUrl`.
- All Projects strana. Dugme "View All Projects" je sakriveno.
- Privacy Policy, cookie banner i Google Analytics.
- LinkedIn link.
