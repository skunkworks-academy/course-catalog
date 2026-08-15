# Skunkworks Academy Course Catalog

Docusaurus-based self-paced course catalogue containing four evidence-led learning journeys:

- `ART-101` — Professional Articulation and Executive Communication
- `SHP-UPA-101` — Shopify User Permissions
- `GHP-DOM-101` — GitHub Pages Setup
- `M365-LIC-101` — Microsoft 365 Licenses

- **185 unique course titles**: 7 production-authored courses, 176 generated foundation curricula and 2 additional Academy course destinations.
- **34 self-paced source-derived offerings** plus the production and legacy self-paced journeys.
- **146 instructor-led source-derived offerings**.
- **15 normalised subject categories**.
- Public overviews with default-deny enrolment gating for modules, labs, assessments and evidence tools.

The generated curricula are clearly marked for subject-matter review before formal accreditation, certification alignment or customer-delivery claims are made. Existing Academy course destinations retain their own course-route access rules.

- **180 course routes**: 4 established production courses and 176 generated foundation curricula
- **34 self-paced offerings** including the four established courses
- **146 instructor-led offerings**
- 15 normalized subject categories
- public overviews with default-deny enrolment gating for modules, labs, assessments and evidence tools

The generated curricula are explicitly marked for subject-matter review before formal accreditation, certification alignment or customer-delivery claims are made.

## Framework

- Docusaurus `3.10.2`
- React `19.2`
- Node.js `20+`
- GitHub Actions build and GitHub Pages deployment
- build-time route generation through the Docusaurus plugin lifecycle

## Local development

```bash
npm install
npm run validate:content
npm run validate:catalog
npm run start
```

Production build:

```bash
npm run build
npm run serve
```

## Course design standard

Each course includes:

- capability-based learning outcomes;
- structured theory modules;
- guided practical labs and acceptance criteria;
- positive and negative validation tasks where applicable;
- formative knowledge checks;
- capstone implementation or performance scenario;
- weighted assessment rubric;
- browser-based Evidence of Capability Record export;
- official reference set.

`ART-101` additionally includes:

- twelve professional communication modules;
- eight recorded practical labs;
- browser-based microphone recording and playback;
- transcript analysis for pace, filler words and sentence length;
- executive briefing, meeting, interview and presentation simulations;
- moderated assessment and a corporate transfer-of-learning guide.

## Learner access control

Public catalogue information is rendered on the landing page. Docusaurus course routes are wrapped in `EnrollmentGate`, which uses a default-deny decision and calls:

```text
GET https://skunkworks-instructor-portal-api-a5gxhyc2fvc7gmch.southafricanorth-01.azurewebsites.net/api/course-access?courseId=<COURSE_ID>
```

The request supports an authenticated portal cookie and an optional bearer token from the learner session. Course content is rendered only when the API returns:

```json
{
  "allowed": true,
  "courseId": "ART-101",
  "learnerId": "<subject-id>",
  "enrolmentStatus": "active"
}
```

Any `401`, `403`, `404`, network failure or malformed response keeps content locked.

### Security boundary

GitHub Pages is a static hosting platform and this repository is public. The gate prevents normal browser navigation before authentication and enrolment, but it is not a confidentiality boundary against a user who downloads public repository source or reverse-engineers generated JavaScript bundles.

## Continuous validation and deployment

1. make the course-content source private and deploy behind an authenticated application gateway;
2. store lesson bodies in a protected content API and return them only after server-side entitlement validation;
3. use Azure Static Web Apps, App Service, Cloudflare Access or an equivalent identity-aware edge layer instead of relying only on client-side gating.

The required API contract and control requirements are documented in `architecture/course-access-api.md`.

## Privacy and recorded practice

The ART-101 Practice Studio records microphone audio locally in the learner's browser. The component does not upload audio. Learners are responsible for obtaining consent, sanitising content and placing approved evidence in a governed storage location before adding its URL to the Evidence of Capability Record.

## Continuous validation

Every pull request executes the course-content validator and a complete Docusaurus production build. Only the `main` branch deploys the generated `build` artefact to the GitHub Pages environment.

Validation confirms that ART-101 contains at least twelve modules, eight practical labs, enrolment gating, interactive knowledge checks, a Practice Studio, assessment rubric, moderation checklist, corporate deployment guidance and evidence capture.

## Deployment

The workflow `.github/workflows/deploy-pages.yml` validates every pull request and deploys the `build` artefact after changes reach `main`.

Expected project URL:

```text
https://skunkworks-academy.github.io/course-catalog/
```

Protected ART-101 route:

```text
https://skunkworks-academy.github.io/course-catalog/courses/professional-articulation
```

The main Academy catalogue at `https://www.skunkworksacademy.com/self-paced/` should link to the protected course route and the Portal checkout route for `ART-101`.
