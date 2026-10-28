# Content sources

Reviewed on **October 27, 2026**. This record links portfolio claims to user instructions and inspected implementation. Detailed evidence, local source paths, authorship checks and executed source-project tests are in [docs/project-research.md](docs/project-research.md).

## Professional identity

The user supplied the name Matheus Sulino, VRAS CODE brand, official domain/repository, UFT Computer Science degree in progress, location, exact bilingual home presentation and EGEFAZ IT internship starting in June 2025. The internship description is limited to technical support, computer maintenance and IT infrastructure. No graduation date, seniority, client outcomes or extra responsibilities were inferred.

The original [identity JSON](content/identity.json) and [identity requirements](docs/identidade-profissional.md) are preserved. Contact uses only the supplied public GitHub link; no email has been inferred from Git author metadata.

## Project evidence

| Project | Source revision | Evidence and scope |
| --- | --- | --- |
| FinTrack Pro | [`f5e71fd`](https://github.com/vrascode/fintrack-pro/tree/f5e71fd5f2aacc377ff551ab884fddc391df1595) | Read Expo navigation/preferences, NestJS health endpoint, shared money/security primitives, Prisma schema and tests. Financial workflows and database integration remain pending. |
| ClearLedger | [`d5205e1`](https://github.com/vrascode/clearledger/tree/d5205e199e823edaf0607038549b489edbd9139c) | Read reconciliation, CSV ingestion, SQLite immutability, API, CLI, dashboard and tests. A single-host prototype with synthetic examples. |
| VRAS | Unconfirmed | Public repositories and accessible local project folders were searched. The distinct USE-VRAS watch-store project does not establish the requested previous website. No technologies or authorship were invented. |
| Amigo Fiel | [`98696f0`](https://github.com/vrascode/Amigo-Fiel/tree/98696f0e3fa4bacf4d6e781ce0390427e82fd0be) | Read Django models, views, templates, settings, migrations and chat. The fork description's PHP/MySQL claim conflicts with the code. Matheus's [product-model contribution](https://github.com/Projeto-de-Sistemas-2025-2/Amigo-Fiel/commit/e0228e591d78a44593f0aeab17745d835b1d87bf) is explicitly attributed. Checkout is simulated. |
| Controle de Estoque | [`ec18061`](https://github.com/vrascode/Eng.Software-Controle-de-Estoque/tree/ec1806143aef31b89ba09e0f97c020fcc2e39fb3) | Read PHP MVC models/controllers/views, MySQL schema, inventory/reporting and contribution history. Team credits and Matheus's specific changes are documented. |

Source links in individual project pages point to the inspected revision where possible. The GitHub Pages page for Controle de Estoque is linked as a source presentation, not an interactive application demo. No public live demo is claimed for FinTrack Pro, ClearLedger or Amigo Fiel.

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
- Geist and JetBrains Mono are packaged via Fontsource; Lucide supplies interface icons. Package distributions include their respective license information.

## Maintenance rules

Review implementation before expanding claims, maintain both languages, keep team attribution, and update the revision and verification date when a project changes. Source-project test counts are dated observations, not promises that future revisions pass. Do not turn GitHub repository descriptions into unreviewed project content.
