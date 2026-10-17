# Noor Estate & Builders

A single-page real estate website built with Next.js 16.4.1, React 19, TypeScript, Tailwind CSS 4, GSAP/ScrollTrigger, and Lenis. Property filtering and detail galleries run in the browser against local data. There is no database, authentication, CMS, or submission service.

## Run and verify

Use npm and the existing lockfile. The property test command uses Node's native TypeScript stripping; Node 22.18+ or Node 24 is recommended.

```sh
npm install
npm run dev
npm run lint
npm run test:properties
npm run build
npm start
```

## Content

- `data/site.ts`: brand, navigation, hero, and company copy.
- `data/homepage.ts`: services, process, neighborhoods, example team, sample testimonials, FAQs, and confirmed contact details.
- `data/properties.ts`: typed sample inventory, gallery records, locations, and filter defaults. Prices are USD; rents are monthly. Studio means zero bedrooms; numbered bedroom filters mean that many or more.
- `public/images/`: local imagery and source/asset notes. The hero WebP is the optimized delivery asset; its original PNG is retained.

Team profiles, testimonials, inventory, and some photography are explicitly illustrative. Replace these with approved business material before a public business launch. The confirmed brand is Noor Estate & Builders, with the supplied domain https://www.noorestatebuilders.com.

## Behavior

Header/footer links use homepage anchors. Service and neighborhood links also update the property filters. Details open in a native modal with Escape, focus restoration, keyboard gallery controls, background scroll locking, and its own scrolling surface.

One `MotionProvider` coordinates Lenis with GSAP's ticker. Touch scrolling remains native. The hero follows the supplied screenshot sequence: rising/scaling building, fading headline, outlined NOOR logo, live building revealed through the lettering, then a cloud-to-white exit. It uses CSS sticky positioning with one reversible ScrollTrigger timeline and `scrub: true`; no stage plays automatically. Mobile uses shorter travel and a shorter scroll range. Reduced-motion preferences disable smoothing and choreography, including live preference changes. Animation styles are applied only after initialization, so server-rendered content stays readable if scripts fail.

The enquiry form creates a local draft. Copying copies only to the clipboard; email/WhatsApp links open the visitor's own app. The site does not send or confirm delivery. Contact configuration is in `data/homepage.ts`.

## Metadata and assets

The site includes a custom icon, Apple touch icon, and static Open Graph/Twitter preview images. `public/social-preview.svg` is the editable source. Set the `SITE_URL` environment variable to the real deployment origin before a production build so social images use that domain. The supplied Noor domain is the default metadata origin. Override it with `SITE_URL` for another deployment.

Follow `AGENTS.md` and the installed documentation in `node_modules/next/dist/docs/` before changing Next.js APIs. Persistent Turbopack dev/build caching is disabled because the experimental CSS loader retained removed style declarations during verification. The building uses a width-driven image with its natural aspect ratio so a stale fixed-height declaration cannot shrink the entire tower into the viewport.

Browser QA has been performed with headless Chrome. Safari/iOS and real-device checks remain manual; browser emulation does not substitute for those checks.
