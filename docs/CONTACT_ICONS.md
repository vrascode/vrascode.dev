# Contact platform marks

Contact uses local vector assets from each platform's official brand resources, without an icon dependency or a client component. The same server-rendered cards serve Portuguese and English. The envelope remains Lucide's `Mail`.

| Asset | Official source | Original mark |
| --- | --- | --- |
| `public/images/social/linkedin.svg` | https://brand.linkedin.com/linkedin-logo | The page's `inbug-blue-28` SVG symbol, exported into a standalone SVG with its original 28 × 28 viewBox, path and `#0A66C2` fill. |
| `public/images/social/github.svg` | https://brand.github.com/foundations/logo — https://brand.github.com/GitHub_Logos.zip | `GitHub Logos/SVG/GitHub_Invertocat_Black.svg`, unchanged. |
| `public/images/social/whatsapp.svg` | https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/ — official “Logo pack” download | `Brand Resource Center Page Downloads/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Green_RGB_2026.svg`, unchanged. |

Marks are displayed as proportional CSS masks inside the existing icon slots. LinkedIn uses its official blue, WhatsApp its official green, GitHub the theme's foreground, and Mail the existing purple accent. A dark backing inside the existing WhatsApp slot keeps the green legible in the light theme (approximately 8.5:1); the brand green is unchanged. No card geometry, typography, links or translations were changed. Hover/focus only highlights the existing icon border; existing keyboard outlines and reduced-motion behavior remain intact.

The icon wrappers are decorative (`aria-hidden="true"`), since the card headings and action labels already name each contact. The platform marks remain owned by their respective trademark holders and identify links to those platforms without implying endorsement.

Validation: lint, TypeScript, all 12 unit/content tests and production build passed. Four existing Playwright checks passed, covering confirmed contact links and accessibility across both locales/themes. A separate Chrome comparison checked eight combinations (PT/EN × dark/light × 1440/390 px): original card and icon-slot dimensions, unchanged copy/URLs, SVG decoding and HTTP 200, brand/theme colors, visible keyboard focus, no horizontal overflow, no runtime errors and no axe-core violations. Before/after screenshots are ignored QA artifacts under `.artifacts/contact-icons/`.
