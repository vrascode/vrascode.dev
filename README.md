# Matheus Sulino · VRAS CODE

[Português](README.pt-BR.md)

A bilingual portfolio for **Matheus Sulino**, Full-Stack Developer and Computer Science student at the Federal University of Tocantins. **VRAS CODE** is the visual brand; the planned production domain is **https://vrascode.dev**.

The application is implemented and validated locally. Production deployment is not yet confirmed. See [PROGRESS.md](PROGRESS.md) for delivery status and [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel and Hostinger setup.

## Run locally

Use Node.js 22 or newer; validation used Node.js 24.20.0. In PowerShell:

```powershell
cd C:\Users\mathe\vrascode.dev
npm.cmd ci
npm.cmd run dev
```

Open **http://localhost:3000**. The root redirects to `/en`; Portuguese is available at **http://localhost:3000/pt**. Keep the command running in your terminal. If the dev server is already running on port 3000, open that server instead of starting a second one. Stop your own server with Ctrl+C. Do not change PowerShell execution policy; `npm.cmd` works without doing so.

On macOS/Linux, use `npm` instead of `npm.cmd`. The dev server binds to loopback. `npm run build` followed by `npm run start` runs the production build locally.

## Features

- Twenty localized pages: home, project collection, five project details, about, experience and contact, in English and Portuguese.
- Exact supplied identity and presentation, a custom typographic logo, SVG favicon and Apple icon.
- Dark/light themes, persistent theme preference, route-preserving language switch, mobile dialog navigation, keyboard access and reduced-motion support.
- Searchable project collection with category filters and honest implementation/contribution notes.
- Self-hosted Geist and JetBrains Mono, optimized project screenshots and restrained Motion animations.
- GitHub public profile data fetched on the server, cached for one hour, with a graceful failure state.
- Localized metadata and Open Graph images, canonical/alternate URLs, sitemap, robots and Person JSON-LD.
- EGEFAZ IT internship since June 2025, UFT education and evidence-based technology descriptions.
- Academic project timeline with confirmed terms only; unknown degree progress, courses and graduation date stay unspecified.
- LinkedIn and GitHub contact cards. E-mail, WhatsApp, portrait and CV appear only after their real assets/details are supplied; no contact channel is fabricated.
- Localized Open Graph cards with the optional supplied portrait; a VRAS CODE fallback is used while the portrait is absent.

## Projects

| Order | Project | Verified scope |
| --- | --- | --- |
| 01 | FinTrack Pro | Expo/React Native/NestJS foundation; financial workflows remain in development. |
| 02 | ClearLedger | FastAPI/SQLite reconciliation, CSV imports, immutable reports and a Next.js dashboard. |
| 03 | VRAS | Reserved page with an explicit source-identification pending state. |
| 04 | Amigo Fiel | Collaborative Django/PostgreSQL academic project; Matheus's specific product-model contribution is credited. |
| 05 | Controle de Estoque | Collaborative PHP/MySQL MVC project; products, movements, inventory and reports. |

[CONTENT_SOURCES.md](CONTENT_SOURCES.md) and [the research record](docs/project-research.md) distinguish inspected code, executed tests, screenshots, team credits and unverified claims.

## Stack and structure

Next.js App Router, React, TypeScript, Tailwind CSS, Motion, Lucide, next-intl and next-themes. Small native controls cover the required interactions; shadcn/ui is not needed for this implementation.

```text
content/identity.json       Original identity, preserved
messages/                  English and Portuguese UI messages
public/                    Original icon and verified project screenshots
src/app/[locale]/          Localized pages and project details
src/components/            Navigation, cards, sections and interactions
src/i18n/                  Routing, navigation and request configuration
src/lib/                   Identity, verified projects, SEO and GitHub access
src/proxy.ts               Locale routing; English default
tests/                     Content, failure-path and browser tests
scripts/check-links.ts     Public source-link verification
docs/                      Identity requirements and project research
.github/workflows/ci.yml   Validation on pushes and pull requests
```

## Checks

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run test:e2e
npm.cmd run check:links
npm.cmd audit --omit=dev
```

Playwright starts its own production server on port **3100**, leaving your dev server on 3000 alone. On Windows it uses installed Microsoft Edge when available. Otherwise run `npx.cmd playwright install chromium` first; Linux CI installs Chromium and its system dependencies. `PLAYWRIGHT_CHANNEL` can select another installed channel. Tests produce ignored reports and responsive screenshots in `.artifacts/screenshots/`.

## Configuration and maintenance

No environment variables are required. Optional `GITHUB_TOKEN` increases GitHub API rate limits and stays server-only; consult `.env.example` and [SECURITY.md](SECURITY.md).

Optional portrait: add Matheus's original image at `public/images/matheus-sulino.png`. Optional CV: add `public/documents/matheus-sulino-cv.pdf`. Contact cards may be enabled with the server-only `PORTFOLIO_EMAIL` or `PORTFOLIO_WHATSAPP` variables only after Matheus authorizes publication; WhatsApp requires an international number. See `.env.example`, [profile research](docs/profile-research.md) and [SECURITY.md](SECURITY.md).

Edit identity in `content/identity.json`, UI copy in both message files, and verified project details in `src/lib/projects.ts`. Update both locales and source evidence together. Never infer project features from a package dependency or a marketing description alone.

Further documentation: [architecture](ARCHITECTURE.md), [progress](PROGRESS.md), [commits](COMMITS.md), [deployment](DEPLOYMENT.md), [sources](CONTENT_SOURCES.md), [security](SECURITY.md).
