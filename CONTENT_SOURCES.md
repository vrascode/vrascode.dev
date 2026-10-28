# Content sources

Reviewed on **October 28, 2026**. This record links portfolio claims to user instructions and inspected implementation. Detailed evidence, local source paths, authorship checks and executed source-project tests are in [docs/project-research.md](docs/project-research.md).

## Professional identity

The user supplied the name Matheus Sulino, VRAS CODE brand, official domain/repository, UFT Computer Science degree in progress (8th term), LinkedIn-reported period from January 2023 to December 2027, location and bilingual presentation. The user identified December 2027 as an expected graduation date and supplied the SEFAZ-TO Information Technology internship beginning June 2025, its role, location, on-site arrangement and summary. No completion percentage is shown.

The identity JSON and identity requirements remain in the repository; the identity JSON now contains the confirmed public e-mail, WhatsApp number and academic semester. Contact values were explicitly authorized in the latest update.

The LinkedIn link provided for this update is included as a professional link. Its anonymous public page could not be read during the October 27, 2026 review (web reader returned `999 Unknown Status Code`); no profile text was guessed. [docs/profile-research.md](docs/profile-research.md) records the lookup, GitHub knowledge source and remaining personal data needed for richer content.

## Project evidence

| Project | Source revision | Evidence and scope |
| --- | --- | --- |
| FinTrack Pro | [`f5e71fd`](https://github.com/vrascode/fintrack-pro/tree/f5e71fd5f2aacc377ff551ab884fddc391df1595) | Read Expo navigation/preferences, NestJS health endpoint, shared money/security primitives, Prisma schema and tests. Financial workflows and database integration remain pending. |
| ClearLedger | [`d5205e1`](https://github.com/vrascode/clearledger/tree/d5205e199e823edaf0607038549b489edbd9139c) | Read reconciliation, CSV ingestion, SQLite immutability, API, CLI, dashboard and tests. A single-host prototype with synthetic examples. |
| VRAS Watches | [Repository URL supplied by user](https://github.com/vrascode/vras-watches) | Anonymous GitHub API returned 404 on October 28, 2026. The listing uses only the user-supplied Django, catalog, shopping cart and responsive-interface description; the source link and screenshots are omitted. |
| VRAS CODE | [Public repository](https://github.com/vrascode/vrascode.dev) | GitHub API confirmed the repository is public. The catalog describes the current Next.js/TypeScript portfolio, separately from VRAS Watches. |
| Amigo Fiel | [`98696f0`](https://github.com/vrascode/Amigo-Fiel/tree/98696f0e3fa4bacf4d6e781ce0390427e82fd0be) | Read Django models, views, templates, settings, migrations and chat. The fork description's PHP/MySQL claim conflicts with the code. Matheus's [product-model contribution](https://github.com/Projeto-de-Sistemas-2025-2/Amigo-Fiel/commit/e0228e591d78a44593f0aeab17745d835b1d87bf) is explicitly attributed. Checkout is simulated. |
| Controle de Estoque | [`ec18061`](https://github.com/vrascode/Eng.Software-Controle-de-Estoque/tree/ec1806143aef31b89ba09e0f97c020fcc2e39fb3) | Read PHP MVC models/controllers/views, MySQL schema, inventory/reporting and contribution history. Team credits and Matheus's specific changes are documented. |

Source links in individual project pages point to the inspected revision where possible. The GitHub Pages page for Controle de Estoque is linked as a source presentation, not an interactive application demo. No public live demo is claimed for FinTrack Pro, ClearLedger or Amigo Fiel.

## Institutional visual assets

- **UFT:** `public/images/institutions/uft-logo.png` is the original PNG served by the official UFT document system for the vertical UFT mark. The official [UFT visual identity page](https://pitanga.uft.edu.br/index.php/es/sucom/servicos/assessoria-de-imprensa/cadastramento-de-profissionais-da-imprensa/156-orgaos-complementares/sucom/20109-identidade-visual) identifies this as an official university symbol and distinguishes the mark from the formal coat of arms. The original pixels, colors and proportions are preserved. The same image is used in About and Experience.
- **SEFAZ-TO:** `public/images/institutions/sefaz-to-logo.png` is a pixel-preserving crop of the official SEFAZ/Governo do Tocantins signature from [this official SEFAZ news image](https://central.to.gov.br/image/210267?f=1), published with the article [Planejamento Estratégico da Sefaz-TO será revisado](https://www.to.gov.br/sefaz/noticias/planejamento-estrategico-da-sefaz-to-sera-revisado/48th97a01yiu). The crop retains the source colors and proportions and excludes the press image's surrounding field and “divulgação” credit. The public [SEFAZ-TO LinkedIn profile](https://br.linkedin.com/company/sefaz-to) is discoverable, but its organization logo was not exposed in anonymous page content; the asset used here is instead directly verified from an official government publication. It is shown next to SEFAZ-TO on the experience timeline.

## Academic project images

- **Amigo Fiel:** `public/images/projects/amigo-fiel-logo.png` is the original yellow symbol `sistema/templates/style/img/amigo-fiel-logo-amarelo.png` from the [public project repository](https://github.com/Projeto-de-Sistemas-2025-2/Amigo-Fiel/blob/98696f0e3fa4bacf4d6e781ce0390427e82fd0be/sistema/templates/style/img/amigo-fiel-logo-amarelo.png). The source PNG is preserved unchanged and displayed with a black field in the About academic timeline.
- **Controle de Estoque:** no screenshot file was available in either the portfolio repository history or the source project's tracked assets. The original project README points to a Drive folder that requires sign-in. Its GitHub Pages presentation contains a CSS-built illustrative dashboard with example figures, not a verifiable capture of the PHP application. The slide deck contains illustrations rather than screenshots of the interface. No image is copied from these sources, and `public/images/projects/controle-de-estoque.png` remains pending a verifiable application capture.

## Source-project tests actually executed

| Project | Result | Limits |
| --- | --- | --- |
| FinTrack Pro | 27 Node tests passed | Does not validate PostgreSQL or native devices. |
| ClearLedger | 64 backend + 51 frontend tests passed | One Starlette/httpx deprecation warning; browser tests were not repeated during research. |
| Amigo Fiel | No implemented cases found in the two `tests.py` files | No passing suite claimed. |
| Controle de Estoque | PHPUnit cases inspected, not executed | Helper tests are not proof of HTTP E2E or database validation. |

These results concern the showcased source projects. The portfolio's own tests are recorded separately in [PROGRESS.md](PROGRESS.md).

## Visual source and assets

[bernardes.dev/pt](https://bernardes.dev/pt) was inspected in a browser. The review informed typography scale, generous whitespace, restrained navigation and project-focused storytelling. The implementation uses its own layout, palette, logo and copy; none of the reference site's images or application code is distributed.

- `public/icon.svg` and code-native monograms/illustrations: original artwork created for VRAS CODE.
- `public/projects/fintrack-pro.png`: an existing real screenshot from the user's FinTrack Pro workspace. The interface displays its genuine empty state.
- `public/projects/clearledger.png`: an existing real screenshot from the user's ClearLedger workspace. Its sample-data banner and the portfolio captions identify synthetic financial records.
- No third-party pet, product, staff or avatar images were copied from the collaborative projects.
- The supplied portrait was found as public/images/matheus-sulino.png.jpeg (JPEG bytes, despite the double suffix) and is used unchanged in the home page, About page and localized Open Graph image. The exact .png pathname does not exist.
- A public professional email and WhatsApp number were explicitly authorized by Matheus on this update; both appear in the localized contact cards. The LinkedIn profile content itself remains inaccessible anonymously, so no details are attributed to that page.
- Geist and JetBrains Mono are packaged via Fontsource; Lucide supplies interface icons. Package distributions include their respective license information.

## Maintenance rules

Review implementation before expanding claims, maintain both languages, keep team attribution, and update the revision and verification date when a project changes. Source-project test counts are dated observations, not promises that future revisions pass. Do not turn GitHub repository descriptions into unreviewed project content.
