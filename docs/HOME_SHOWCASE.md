# Complete Home showcase — 2026-11-06

Home now renders every entry returned by `getPublishedProjects()` in catalog order, using the same collection as Projects. Records default to published; setting `published: false` removes them from both collections. No featured-project slice is used. Draft page publishing is outside this catalog-display change.

Each project has a wide editorial section: introduction and technical detail on the left, large media on the right. On narrow screens, the DOM order is introduction, media, technical details. Content, technologies, source links and existing verified highlights are reused from the catalog. The page header, personal information, theme tokens and navigation are unchanged.

Home uses `HomeProjectShowcase`, `HomeVideoPlayback`, `HomeProjectFrame` and `HomeProjectVideo`. It does not use the modal/hover preview component. There is no Watch demo label, duration overlay or modal on Home. Projects and case pages retain their existing presentation, image zoom, video modals, search and filters.

The reference was inspected through a real browser: large bordered project sections, editorial information beside dominant media and a small circular pause control. Implementation uses original VRAS components/assets and the existing purple palette. No reference code, text or images were copied.

## Real dark recordings

The original clips remain unchanged for Projects. New Home variants were recorded by Playwright from the existing local applications, using their actual theme controls and synthetic datasets. No application source code in another repository was changed; no inversion filters, recoloring or fabricated interfaces were used.

| Home asset | Duration | Bytes | Source/environment |
| --- | --- | --- | --- |
| clearledger-dark.mp4 | 28.33 s | 365937 | ClearLedger d5205e1, real theme toggle; local FastAPI/SQLite and example CSVs |
| fintrack-pro-dark.mp4 | 28.88 s | 291121 | FinTrack Pro 25a9ed3, real dark preference; built-in fictional client demo |
| controle-de-estoque-dark.mp4 | 28.63 s | 329027 | Inventory ec18061, real theme toggle; separate local MariaDB with fictitious products |
| vrascode.mp4 | 26.21 s | 504688 | Existing verified recording of the public portfolio in dark theme |

New posters are direct screenshots in the selected theme. Clips are silent H.264, 1280×720, 24 fps, fast-start MP4. The three additions total 986085 bytes, plus posters. `RECORD_THEME=dark` in `scripts/record-project-videos.mjs` selects actual application theme controls and writes `-dark` assets without overwriting the original recordings. Full provenance and setup details for the applications are in [PROJECT_VIDEOS.md](PROJECT_VIDEOS.md).

Amigo Fiel has no verified dark-theme implementation in the inspected source. Home uses its real logo and explicitly explains the absent dark recording; its existing light-theme recording remains on Projects. VRAS Watches still has no verifiable accessible application/source recording, so it uses its existing real poster. Neither fallback has a decorative nonfunctional play button. Their project links remain accessible.

## Playback and performance

One shared IntersectionObserver chooses the most visible eligible media (at least 25% visibility). Video sources are attached only when their media enters the viewport. Playback is muted, looped, inline, and paused outside the viewport or when the document is hidden. Returning resumes the current timeline rather than resetting it. A user's explicit pause remains respected.

The small circular control supports keyboard/touch play, pause and failed-request retry. Failed/blocked autoplay keeps the real poster visible. An explicit click retries playback in the user gesture. Reduced motion and data-saver settings suppress automatic playback; manual play remains available. Only one Home video is allowed to play at a time. Posters and fixed aspect ratios preserve layout stability. Motion handles the section entrance; the existing scroll system is reused.

Videos do not change when the portfolio theme changes. Their dark appearance comes from the real recorded applications. Safari/physical mobile hardware was not available; MP4 is standard H.264/yuv420p, and touch/reduced-motion behavior is exercised through browser emulation.

## Validation

Lint, TypeScript, all 12 unit/content tests and production build passed. The full 48-test Playwright suite passed on installed Edge, including existing Projects interactions, accessibility in both themes, image zoom and video modals. All nine Home-specific tests also passed on installed Chrome: catalog parity and order, 1440/768/390 px, both locales/themes, no Home modal/Watch demo overlay, deferred video requests, visibility autoplay, one-player arbitration, pause/resume, browser-interrupted playback recovery, reduced motion with manual touch playback, and network-error poster/retry behavior. Screenshots were reviewed in `.artifacts/home-showcase/`; reference and recording review images remain ignored QA artifacts.

The playback control reads the native player's paused/ended state for each gesture. A rapid consecutive-click regression is covered, so delayed React media events cannot turn a resume gesture into a second pause. Unmount cleanup is separate from playback synchronization, so effect updates do not cancel a just-started manual play/retry request. The final nine Home tests and the combined desktop/mobile smoke flow passed again after this correction.
