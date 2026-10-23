# MIST website: pravila za Claude Code

Vlasnik projekta je Stefan, brand identity dizajner (MIST). Ne programira: objašnjavaj jednostavno, na srpskom, korak po korak, bez žargona. Kad mora tehnički izraz, objasni ga u jednoj rečenici.

## Projekat

- Statički sajt u **Astro 7**, Node 22 (najmanje 22.23). Hosting: Netlify (`netlify.toml` je podešen), domen mistdesign.co.
- Stranice: Home (`src/pages/index.astro`), tri case studija (`src/pages/case-study/[slug].astro` + podaci u `src/data/projects.ts`), The Gap Review upitnik (`src/pages/the-gap-review.astro`, ranije The Positioning Brief), 404.
- Globalna podešavanja (email, društvene mreže, navigacija): `src/data/site.ts`.
- Boje, fontovi i razmaci su tokeni u `src/styles/global.css` (`:root`). Koristi njih, ne nove boje.
- Fontovi (Inter, Vollkorn Italic) su self-hosted preko `@fontsource`. Ne dodaji Google Fonts linkove.
- Slike idu kroz `astro:assets` (`<Picture>` / `<Image>`). Originali su u `src/assets/`.
- Detalji ponašanja i responsive pravila su u `README.md`.

## Pravila

1. **Desktop (≥ 1080px) prati Figmu 1:1.** Ne menjaj dizajn, tekst, razmake, boje ni dimenzije na desktopu bez Stefanovog odobrenja.
2. Pre svake veće izmene ukratko reci šta planiraš i sačekaj potvrdu.
3. Posle izmene pokreni `npm run build`. Ako build pada, popravi pre nego što javiš da je gotovo.
4. Svaku završenu izmenu sačuvaj kao git commit sa jasnom porukom. **Push na GitHub samo kad Stefan to potvrdi**, jer push automatski objavljuje sajt preko Netlify-a.
5. Ne briši i ne prepisuj fajlove iz `src/assets/` bez pitanja.
6. Ne dodaji nove biblioteke (npm pakete) bez objašnjenja zašto su potrebne.
7. Nikad ne upisuj lozinke, API ključeve ni tokene u kod.

## Poznate otvorene stavke (nisu greške)

- The Gap Review: odgovori idu preko Netlify Forms (forma `gap-review`). Obaveštenje na stefan@mistdesign.co šalje Netlify; upis u Google Sheets "The Gap Review - Brief" i potvrdu posetiocu (Email 0) radi Google Apps Script iz `integrations/gap-review-sheet.gs`, koji Netlify poziva preko outgoing webhook-a.
- "View All Projects", All Projects strana i LinkedIn link čekaju Stefanov znak.
- Google Analytics 4 (`G-LES9EWYTED`, `src/data/site.ts` → `analytics`) se učitava samo posle "Accept" u cookie banneru (`src/components/CookieBanner.astro`, `src/scripts/analytics.ts`). Nove kolačiće ili alate za praćenje uvek dodaj i u sekciju "Cookies and analytics" u `src/pages/privacy-policy.astro`.
