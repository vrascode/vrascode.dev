# Real project recordings — 2026-11-06

All clips were captured through Playwright from running applications at 1280×720. They are silent H.264 MP4, 24 fps, yuv420p, with fast-start metadata. Posters are screenshots of the same applications. No static images were animated into simulated application footage. Only initial loading frames were trimmed in the final ClearLedger, FinTrack and portfolio captures.

| Project | Source reviewed | Recorded flow | Duration | MP4 bytes |
| --- | --- | --- | --- | --- |
| ClearLedger | [d5205e1](https://github.com/vrascode/clearledger/tree/d5205e199e823edaf0607038549b489edbd9139c) | Real FastAPI/SQLite CSV example import and persisted reconciliation, exception details, import datasets and analytics | 28.38 s | 351825 |
| FinTrack Pro | [25a9ed3](https://github.com/vrascode/fintrack-pro/tree/25a9ed3545a81abdad09ae639d2bedd9cd5e16d5) | Real Expo web app in its built-in fictional demo: dashboard, transaction search, accounts and device theme preferences | 28.63 s | 325614 |
| Amigo Fiel | [98696f0](https://github.com/vrascode/Amigo-Fiel/tree/98696f0e3fa4bacf4d6e781ce0390427e82fd0be) | Real Django app: pet profile/catalog, product details and persisted cart item | 26.08 s | 362227 |
| Controle de Estoque | [ec18061](https://github.com/vrascode/Eng.Software-Controle-de-Estoque/tree/ec1806143aef31b89ba09e0f97c020fcc2e39fb3) | Real PHP/MariaDB dashboard, stock entry form, persisted five-unit entry and reports | 28.67 s | 318045 |
| VRAS CODE | [bf74112](https://github.com/vrascode/vrascode.dev/tree/bf741122b10c6b666dda5693efe9d1dcf0949902) | Existing public portfolio: projects, category filtering, technology search and biography | 26.21 s | 504688 |

The FinTrack public homepage linked by its repository redirected to Vercel authentication on this date. No authentication was bypassed. Recording used a disposable local clone and its explicitly labelled client-side demo, without claiming authenticated financial operations. Cards/budgets marked as incomplete were excluded from the final recording.

Amigo Fiel was run with a separate local Django settings module overriding DATABASES to a fresh SQLite file and a local-only secret. All migrations ran, then the disposable database was flushed and seeded with fictional accounts, three pets, one NGO, one shop and two products. No remote database was contacted. The recording environment differs from its usual PostgreSQL setup, and this is disclosed in both portfolio languages. Images/default banners are original application assets.

Inventory used PHP 8.2.12 and a separate MariaDB 10.4.32 data directory on loopback port 13316. Its original schema was imported into that isolated instance. Three fictional products were seeded, with the demo mouse initially at three units. The recorded form persisted five additional units through the actual controller; no SQL was substituted for the recorded UI action. No pre-existing database was used.

ClearLedger used its real example CSVs, API and local SQLite database. Example import is idempotent; the UI's Sample Data banner remains visible. The portfolio clip is read-only navigation of already public content.

## Unavailable recording

VRAS Watches is listed but its supplied repository returned HTTP 404 to anonymous GitHub API access. No verified running shop was available. Its existing image is preserved without a fake play control, and no broken public-code link is added. “VRAS” corresponds to the existing Watches/VRAS CODE entries; no duplicate project was invented. No other software appeared in the current six-project catalog.

## Reproduction

Install the application dependencies from each source repository and seed only disposable databases. Never use a production database. The recorder refuses non-loopback application URLs except read-only navigation of the official portfolio.

Run `node scripts/record-project-videos.mjs <slug>` with:

- `RECORD_BASE_URL`: the running demo root (without trailing slash).
- `RECORD_FFMPEG`: a local FFmpeg executable with libx264 support.
- `RECORD_BROWSER`: installed Playwright channel, default `chrome`.
- `RECORD_SOURCE_SHA`: inspected source revision for evidence.
- `RECORD_EMAIL`/`RECORD_USERNAME` and `RECORD_PASSWORD`: only disposable demo login details when required. These are never written to evidence.

Recording workflows expect the fictitious pet `Luna Demo`, shop handle `loja-demo`, product slug `brinquedo-demo`, and inventory product ID 2. Seed these in the disposable instances. Local launcher/settings/database files and raw recordings live outside versioned content. The recorder writes action provenance to ignored `.artifacts/project-recordings/<slug>/evidence.json`. Final media are in `public/videos/projects/` and presentation data in `src/lib/project-videos.ts`.

## Performance and accessibility

The five MP4 files total 1,862,399 bytes (~1.78 MiB), plus JPEG posters. They are static assets, not function responses. This is well below the documented [Vercel source-upload limit for CLI deployments](https://vercel.com/docs/limits); no external video host or paid service is required for these clips. Future large libraries should be evaluated against bandwidth and deployment size before expanding.

Home and Projects now share `ProjectVideoPreview` and `ProjectVideoPlayback`. Sources are attached when media becomes visible; muted, looping, inline playback starts without hover or a click. One IntersectionObserver selects the most visible eligible preview and pauses the others. Offscreen/background playback stops and returning resumes the timeline. Reduced motion and data-saver preferences suppress autoplay; the small circular button permits explicit playback and retry. No video modal or Watch demo overlay remains. Apple/Safari playback uses standard H.264 MP4 and inline playback, but physical iOS/Android devices were not available for testing. Dark variants and their provenance are documented in [HOME_SHOWCASE.md](HOME_SHOWCASE.md); Amigo Fiel retains its real light-theme recording in both collections.

New UI uses the existing locale dictionaries. Clips preserve the original software language; localized notes disclose the recording environment. The original image zoom, ClearLedger isolated simulation, filters, project URLs, themes and other portfolio sections remain available.

## Validation performed

On 2026-11-06: lint, Next.js type generation/TypeScript, all 11 unit/content tests and production build passed. The complete Playwright suite passed 39/39 on installed Microsoft Edge. After the final media hit-area refinement, all six video tests also passed on installed Chrome, covering real MP4 decoding/play/pause, native-dialog Escape/backdrop close, focus restoration, scroll locking, modal accessibility, PT/EN, 390/1440 px, dark/light themes, reduced motion, hover loading and explicit absence of a fabricated Watches recording. Screenshots were reviewed from ignored `.artifacts/video-screenshots/`. Source-link validation passed 22/22 URLs.

The existing favicon regression assertion was updated to the current committed favicon and Apple Touch URLs; favicon assets themselves were not changed by this feature. No claim is made of testing physical mobile devices or Safari.

The first Linux CI run passed all six new video tests but detected insufficient light-theme contrast on the existing technology-list slash separators. Their color was corrected from the border token to the existing secondary-text token, preserving layout and the palette.
