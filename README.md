# Skunkworks Academy Course Catalog

Docusaurus-based course catalogue containing evidence-led learning journeys including:

- `SHP-UPA-101` — Shopify User Permissions
- `GHP-DOM-101` — GitHub Pages Setup
- `M365-LIC-101` — Microsoft 365 Licenses
- `SEC-OSINT-201` — Open-Source Intelligence (OSINT) Gathering with Recon-ng and Shodan
- `LXD-SLD-201` — Evidence-Based Slide Design for Digital Learning

## Canonical production URL

```text
https://www.skunkworksacademy.com/courses
```

This repository is the source of truth for the course-catalog application. Production hosting is owned by `skunkworks-academy/www`: its site-release workflow checks out this repository, builds the Docusaurus site, mounts the generated `/courses` routes and required assets into the Academy GitHub Pages artifact, and verifies the production URL after deployment.

The former standalone custom domain `catalog.skunkworksacademy.com` is no longer the canonical deployment target.

## Framework baseline

- Docusaurus `3.10.2`
- React `19.2.8`
- Node.js `20+`
- GitHub Actions validation in this repository
- GitHub Pages publication through `skunkworks-academy/www`
- Central Skunkworks Academy global navigation loader

## Local development

```bash
npm install
npm run validate:content
npm run start
```

Production build:

```bash
npm run build
npm run serve
```

## Course design standard

Each validated course includes:

- capability-based learning outcomes;
- structured theory modules;
- guided practical labs and acceptance criteria;
- positive and negative validation tasks;
- formative knowledge checks;
- capstone implementation scenario;
- weighted assessment rubric;
- browser-based Evidence of Capability Record export;
- official vendor or authoritative documentation references.

## Learner access control

Public catalogue information is rendered on the landing page. Course routes are wrapped in `EnrollmentGate`, which uses a default-deny decision and calls:

```text
GET https://portal.skunkworksacademy.com/api/course-access?courseId=<COURSE_ID>
```

The request supports an authenticated portal cookie and an optional bearer token from the learner session. Course content is rendered only when the API returns:

```json
{
  "allowed": true,
  "courseId": "SHP-UPA-101",
  "learnerId": "<subject-id>",
  "enrolmentStatus": "active"
}
```

Any `401`, `403`, `404`, network failure or malformed response keeps content locked.

### Security boundary

GitHub Pages is a static hosting platform and this repository is currently public. The gate prevents normal browser navigation before authentication and enrolment, but it is not a confidentiality boundary against a user who downloads public repository source or reverse-engineers generated JavaScript bundles.

For strict content confidentiality, use one of these production patterns:

1. make the course-content source private and deploy behind an authenticated application gateway;
2. store lesson bodies in a protected content API and return them only after server-side entitlement validation;
3. use Azure Static Web Apps, App Service, Cloudflare Access or an equivalent identity-aware edge layer instead of relying only on client-side gating.

The required API contract and control requirements are documented in `architecture/course-access-api.md`.

## Continuous validation

Every pull request and push to `main` executes the course-content validator, deployment-configuration validator and a complete Docusaurus production build. The workflow uploads the build as a diagnostic artifact but does not publish an independent GitHub Pages site.

## Deployment ownership

- Source repository: `skunkworks-academy/course-catalog`
- Hosting repository: `skunkworks-academy/www`
- Canonical route: `https://www.skunkworksacademy.com/courses`
- Publication workflow: `skunkworks-academy/www/.github/workflows/site-release.yml`
- Refresh cadence: every `www` production release and every four hours through the scheduled site-release workflow

The public Academy self-paced catalogue at `https://www.skunkworksacademy.com/self-paced/` can continue to reference individual protected course routes under the canonical `/courses` namespace.
