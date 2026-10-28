# Architecture

## Application boundaries

This repository is the portfolio presentation layer. It does not run the financial, adoption or inventory systems it describes, access their databases, or embed their authentication. Project data is editorial content tied to inspected source evidence.

Next.js App Router provides server-rendered and prerendered routes. The twenty content pages are statically generated for `en` and `pt`; the home page revalidates after one hour for GitHub data. Open Graph images are generated through Next.js ImageResponse. The application uses the standard Next.js runtime and is prepared for Vercel, not a static-only Hostinger upload.

## Modules

| Area | Responsibility |
| --- | --- |
| `content/identity.json` | Original professional identity, links and exact home presentation. Preserved from the earlier session. |
| `messages/en.json`, `messages/pt.json` | Complete localized UI, accessibility labels and page metadata copy. |
| `src/i18n/` | next-intl locale configuration and typed navigation helpers. `/` defaults to English regardless of browser language. |
| `src/proxy.ts` | Locale routing, excluding static assets, Next internals and the root Apple icon route. |
| `src/lib/projects.ts` | Ordered project catalog, localized scope, architecture, contributions, limitations and source links. Search handles accents. |
| `src/lib/identity.ts` | Read-only adapter for the original identity file. |
| `src/lib/metadata.ts` | Production canonical URLs, language alternatives, localized social metadata. |
| `src/lib/github.server.ts` | Fixed GitHub API endpoint, optional server token, four-second timeout and hourly caching. |
| `src/lib/github.ts` | Strict public-profile response parsing and safe failure handling. Only login and public counts are returned. |
| `src/components/` | Shared page sections, cards, navigation and small interaction components. |
| `src/app/[locale]/` | Home, projects, project details, about, experience, contact, errors and Open Graph images. |

## Browser boundaries

Client components are limited to navigation controls, themes, Motion reveals, project filtering, clipboard and back-to-top. `next-themes` persists the selected theme; dark is the initial default. The language switch retains the current route, query and hash. Native dialog behavior supplies focus containment and Escape handling for the mobile menu.

Server-rendered text remains visible without animation or JavaScript. Motion honors reduced-motion preferences; CSS also disables nonessential animation and smooth scrolling. Links remain actual links. The site uses one `h1` per page, semantic landmarks, a skip link and visible focus styles.

## Visual system and assets

CSS variables implement the requested dark palette and an independently checked light palette. Tailwind supplies utilities and reset; shared CSS describes the visual system. Geist and JetBrains Mono ship through local npm font assets, without a runtime Google Fonts request. Lucide supplies interface icons; the VRAS mark and project illustrations are original code-native artwork.

Two authorized local screenshots illustrate the user's FinTrack Pro and ClearLedger projects. `next/image` supplies responsive sizes and lazy loading on collection pages. Detail-page images are preloaded. ClearLedger captions disclose synthetic records. Illustrations for the other projects are explicitly identified as illustrations.

## Content and integration constraints

Project order is fixed. Only the verified curated collection is rendered; GitHub integration does not import arbitrary repositories into the portfolio. VRAS remains an honest pending entry. Team attribution and simulated payment behavior are visible in project details. No CV, email address, proficiency percentage or production claim is invented.

No database, contact API, analytics, authentication or secret-bearing client integration is needed. Vercel preview environments receive noindex metadata and disallow crawling. The production domain remains `https://vrascode.dev` in metadata, regardless of local preview host.

## Verification

Node's test runner with tsx checks identity, translated message formatting, project completeness/order, search, GitHub error cases and canonical URLs. Playwright checks the production server with Chromium/Edge and axe-core. Source-code analysis and tests of the showcased projects are recorded separately in `docs/project-research.md`.
