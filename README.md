# Skunkworks Academy Course Catalog

Docusaurus-based, evidence-led course catalogue for self-paced and instructor-led delivery.

## Catalogue scope

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

## Data-driven course architecture

The four established courses remain authored in MDX under `docs/`. The additional 176 courses are generated from:

```text
data/generated-courses.cjs
        |
        v
plugins/generated-course-pages/index.js
        |
        v
src/components/GeneratedCoursePage.tsx
        |
        v
/courses/catalog/<course-slug>
```

Each generated route provides public metadata, six to eight enrolment-gated modules, three practical labs, an interactive knowledge check, capstone assessment, weighted rubric, official-reference guidance and a browser-based Evidence of Capability Record.

## Access control

`EnrollmentGate` calls the Academy course-access API and renders learning content only when it receives `allowed: true`. Any `401`, `403`, `404`, malformed response or network failure keeps content locked.

GitHub Pages is static hosting and this repository is public. Client-side gating controls the normal learner journey but is not a confidentiality boundary for source code. Strictly confidential lesson bodies should be served from a protected content API or identity-aware hosting platform.

## Validation

`npm run build` validates the four established courses, validates schema and uniqueness for all 176 generated courses, and executes a complete Docusaurus production build.

## Public listings

- `https://www.skunkworksacademy.com/self-paced/`
- `https://www.skunkworksacademy.com/instructor-led/`
