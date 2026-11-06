# Complete Home showcase — 2026-11-06

Home now renders every entry returned by `getPublishedProjects()` in catalog order, using the same collection as Projects. Records default to published; setting `published: false` removes them from both collections. No featured-project slice is used. Draft page publishing is outside this catalog-display change.

Each project has a wide editorial section: introduction and technical detail on the left, large media on the right. On narrow screens, the DOM order is introduction, media, technical details. Content, technologies, source links and existing verified highlights are reused from the catalog. The page header, personal information, theme tokens and navigation are unchanged.

Home uses `HomeProjectShowcase`, `HomeProjectFrame` and the shared `ProjectVideoPreview` / `ProjectVideoPlayback` components. Projects and case pages use the same playback implementation. There is no Watch demo label, duration overlay, hover requirement or video modal. The editorial layouts, image zoom, ClearLedger sample, search and filters remain available.

The reference was inspected through a real browser: large bordered project sections, editorial information beside dominant media and a small circular pause control. Implementation uses original VRAS components/assets and the existing purple palette. No reference code, text or images were copied.

## Real dark recordings

The original clips remain unchanged. Dark variants were recorded by Playwright from the existing local applications, using their actual theme controls and synthetic datasets. The shared `projectPreviewVideos` catalog prefers those variants in both Home and Projects, falling back to an existing real light-theme recording. No application source code in another repository was changed; no inversion filters, recoloring or fabricated interfaces were used.

| Home asset | Duration | Bytes | Source/environment |
| --- | --- | --- | --- |
| clearledger-dark.mp4 | 28.33 s | 365937 | ClearLedger d5205e1, real theme toggle; local FastAPI/SQLite and example CSVs |
| fintrack-pro-dark.mp4 | 28.88 s | 291121 | FinTrack Pro 25a9ed3, real dark preference; built-in fictional client demo |
| controle-de-estoque-dark.mp4 | 28.63 s | 329027 | Inventory ec18061, real theme toggle; separate local MariaDB with fictitious products |
| vrascode.mp4 | 26.21 s | 504688 | Existing verified recording of the public portfolio in dark theme |

New posters are direct screenshots in the selected theme. Clips are silent H.264, 1280×720, 24 fps, fast-start MP4. The three additions total 986085 bytes, plus posters. `RECORD_THEME=dark` in `scripts/record-project-videos.mjs` selects actual application theme controls and writes `-dark` assets without overwriting the original recordings. Full provenance and setup details for the applications are in [PROJECT_VIDEOS.md](PROJECT_VIDEOS.md).

Amigo Fiel has no verified dark-theme implementation in the inspected source. Both Home and Projects now use the same existing real recording, `/videos/projects/amigo-fiel.mp4`, in its original light theme. Lack of a dark recording never hides a real demonstration. VRAS Watches still has no verifiable accessible application/source recording, so it uses its existing real image without a decorative play button. Project links remain accessible.

## Playback and performance

One shared IntersectionObserver chooses the most visible eligible media (at least 25% visibility). Video sources are attached only when their media enters the viewport. Playback is muted, looped, inline, and paused outside the viewport or when the document is hidden. Returning resumes the current timeline rather than resetting it. A user's explicit pause remains respected.

The small bottom-left circular control supports keyboard/touch play, pause and failed-request retry. Failed/blocked autoplay keeps the real poster visible. An explicit click retries playback in the user gesture. Reduced motion and data-saver settings suppress automatic playback; manual play remains available. Only one video per collection is allowed to play at a time. Posters and fixed aspect ratios preserve layout stability. Home retains its existing 16:9 presentation; Projects retains each project's existing media aspect ratio with `object-contain`. Motion handles the existing section entrance; the existing scroll system is reused.

Videos do not change when the portfolio theme changes. Their dark appearance comes from the real recorded applications. Safari/physical mobile hardware was not available; MP4 is standard H.264/yuv420p, and touch/reduced-motion behavior is exercised through browser emulation.

## Inline playback correction and validation

Home and Projects now use one player and one recording-selection table. Five real recordings are available across the six published projects. Amigo Fiel uses its existing light-theme MP4; no media file was duplicated, regenerated or recolored. The former hover player, video modal, large launch button, duration overlay and unused translation keys were removed. Image enlargement, case studies, the ClearLedger interactive sample and project links remain intact.

The coordinator excludes the fixed header from the visible area. An explicit play/retry takes priority until further scrolling; a passive scroll handler then restores viewport arbitration even if no IntersectionObserver threshold was crossed. Pointer/key-down captures the displayed play/pause intention so focus-induced scrolling cannot reverse a pause before the click arrives. Programmatic gestures still read the native player state, preserving rapid-toggle and browser-interrupted-playback recovery.

Lint, TypeScript, 12 unit/content tests and production build passed. The complete 49-test browser suite passed on installed Edge. After the final gesture correction, all 16 Home/Projects video tests passed on installed Chrome, including PT/EN, desktop/mobile, themes, no hover or video modal, all five recordings, manual controls, reduced motion, retry after network failure, offscreen pause and only one active player. The large-viewport sequential playback regression also passed three repeated Chrome runs. All 22 external source links returned HTTP 200.

A separate Chrome smoke check against the local production server exercised 20 inline previews (five recordings × two pages × two locales), touch playback at 390 px with reduced motion, no horizontal overflow, and matching SHA-256 hashes for all five served MP4s. Ignored screenshots in `.artifacts/video-screenshots/` were visually reviewed, including the actual Amigo Fiel application after initial loading. Physical mobile devices, Firefox and Safari were not tested.

The existing accessibility test now stores each theme before navigation and waits for the loaded fonts. This avoids auditing a transient mismatch while next-themes hydrates; no accessibility rule or contrast threshold was disabled and no theme colors were changed.
