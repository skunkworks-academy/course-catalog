# Skunkworks Academy Course Catalog

Docusaurus-based, evidence-led catalogue for self-paced and instructor-led delivery.

## Catalogue scope

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

Production-authored courses include capability outcomes, theory modules, practical labs, formative assessment, capstone work, a weighted rubric, an Evidence of Capability Record and official references. The 176 source-inventory records use a shared foundation curriculum and remain marked for subject-matter review.

## Learner access control

Public catalogue information is rendered on the landing page. Docusaurus course routes are wrapped in `EnrollmentGate`, which uses a default-deny decision and calls:

```text
GET https://skunkworks-instructor-portal-api-a5gxhyc2fvc7gmch.southafricanorth-01.azurewebsites.net/api/course-access?courseId=<COURSE_ID>
```

Any `401`, `403`, `404`, network failure or malformed response keeps content locked. GitHub Pages is public static hosting: this gate controls normal navigation, not source confidentiality. Strictly private course materials must be served from a protected API or identity-aware host.

## Continuous validation and deployment

Every pull request executes the production-course validator, generated-catalogue validator and complete Docusaurus build. Only `main` deploys the generated site to GitHub Pages.

Catalogue: <https://skunkworks-academy.github.io/course-catalog/>
