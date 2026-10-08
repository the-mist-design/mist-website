// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mistdesign.co',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  image: {
    // Hi-res source photos are resized and converted to AVIF/WebP at build time.
    responsiveStyles: false,
  },
});
