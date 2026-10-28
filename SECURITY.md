# Security

## Scope

The portfolio presents public information. It does not accept financial records, process payments, run the showcased backends, authenticate visitors or store contact submissions. The project screenshots contain empty states or labeled synthetic data.

## Secrets and network access

- No secrets are required. An optional `GITHUB_TOKEN` is read exclusively in `src/lib/github.server.ts`, guarded with `server-only`.
- Never prefix a credential with `NEXT_PUBLIC_`, put it in the identity/project files or commit `.env` files. `.env.example` contains no credential.
- `PORTFOLIO_EMAIL` and `PORTFOLIO_WHATSAPP` are opt-in public contact values, not secrets. Do not set them until Matheus confirms they may be published. The WhatsApp value is normalized and validated as an international number; contact controls are omitted if either value is invalid. Keep deployment environment configuration private even though the resulting contact details are intentionally public.
- The server fetches one fixed public GitHub endpoint. It uses a four-second timeout and hourly cache, validates the response and exposes only public counts and the expected login. HTTP, rate-limit, malformed-data and network failures have a safe fallback.
- No arbitrary user-supplied URLs are fetched by the application. External source links are a reviewed allowlist in the project data.
- External links opened in a new tab use `noopener noreferrer`.

## Browser and deployment

The application sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and a restrictive camera/microphone/geolocation Permissions Policy. JSON-LD escapes `<` before insertion. Only theme preference is stored in browser localStorage; the app's JavaScript does not collect analytics or personal form data. The next-intl framework may manage its language cookie; routing explicitly defaults to English.

Preview deployments are marked noindex and disallow crawling. This is indexing guidance, not authentication. Add Vercel deployment protection separately if a preview must be private.

There is no custom CSP nonce system in this release. Security headers and automated checks do not substitute for a comprehensive security audit. Keep Next.js and other dependencies maintained, and review advisory changes before upgrading.

## Reporting

Use the repository's private vulnerability reporting channel if GitHub exposes one. Otherwise contact the owner through the public profile to arrange a private report; do not post credentials or exploitation details in public issues. No private reporting channel is falsely claimed as configured.

## Verification

On October 27, 2026, `npm.cmd audit --omit=dev` reported **zero production dependency vulnerabilities**. The result is time-bound. Automated tests cover GitHub response validation and safe handling of HTTP/network errors. No deployment credentials or DNS settings were changed during implementation.
