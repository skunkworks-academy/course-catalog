# Academic role course release — 1 November 2026

## Scope and blueprint

Eight intermediate professional-development courses cover all nine listings in the user-supplied job alert. IT Lecturer appears at Nelson Mandela Bay and Bedfordview and maps to EDU-ITL-201. The source typo “Marhematics” is normalized in the title while retained in metadata. Full job descriptions were not available; no unstated employer competency or accreditation requirement is claimed. The alert and its personalized links are not published.

The authoritative blueprint is `data/academic-roles/courses.json`. Each course has a public overview, three subject modules and a role-specific capstone, with 10 hours of estimated effort (not measured seat time). Every module has observable outcomes, a worked example, an original native comparison/trace table, a safe exercise, expected observations, fault/recovery work, evidence, cleanup, two retrieval checks and official references. Outcome-to-module-to-evidence maps are on each overview. Individual routes use `/courses/<slug>/module-XX-<topic>`.

## Publication and access contract

New courses explicitly declare `contentAccess: public`, `releaseState: pilot` and `assessmentStatus: facilitated-enquiry-only`. The publication validator requires the disclosure, a course-scoped registration enquiry and parent navigation. Existing protected courses continue to require EnrollmentGate; no entitlement checks have been removed. New material contains only public formative answers and synthetic data. No checkout, paid entitlement, secure exam, certificate, SCORM, xAPI or gradebook is claimed.

The central Academy shell, tokens, sidebar and catalogue are reused. All eight course IDs are included in the website registration selector. An enquiry is not an entitlement grant. The existing form's submission delivery needs an authorized end-to-end service test; no unsolicited registration is sent during QA.

## Visual provenance

All module visuals are original native HTML tables generated from Academy-authored Markdown: truth tables, coordinate checks, frequency tables, editorial decision matrices, outcome maps, hint ladders, rubrics, motion quantities, controller traces, transition tables, subnet plans, protocol layers, hypothesis tables, performance breakdowns, collection comparisons, reference traces and validation cases. Each has an adjacent explanation and a module-specific learning purpose. There are no third-party screenshots or simulated product interfaces. Robotics and diagnostic outputs are explicitly simulated. Native tables preserve selectable text and are usable without colour. Browser checks must inspect reflow, zoom, keyboard and both themes; table markup alone does not establish accessibility conformance.

## Quality evidence and limitations

| Dimension | Evidence | Release interpretation |
|---|---|---|
| Role coverage | Eight unique role records; nine location/listing mappings | Source-excerpt alignment, not complete job analysis |
| Instructional structure | 32 module pages, 64 formative checks, 8 capstones | Authored pilot |
| Learner and facilitator materials | Eight ZIP packs with guides, workbooks, labs and notes | Public formative courseware |
| Technical fixtures | Python contract, numerical, state, policy and file tests; Java comparison fixture | Execute in local/CI environments and record results |
| Assessment integrity | Public brief and rubric; private assessment requirement stated | Formal assessment service not provisioned |
| Subject review | Curriculum owner role named; independent reviewer unassigned | Independent SME sign-off pending |
| Accessibility | Shared tokens; native text visuals; browser and automated checks | No complete WCAG conformance claim |
| Learning standards | Outcome/evidence mapping, support and moderation instructions | No ISO certification or standards audit claim |
| Interoperability | Static web courseware and offline Markdown/ZIP | SCORM/xAPI/cmi5 not implemented |
| Learner records | No personal records, submissions or official scores stored by new pages | No new processing service introduced |

## Reproduction

1. Edit course metadata and `data/academic-roles/lessons/*.md`.
2. Run `python3 scripts/build-academic-roles.py`.
3. Run `python3 scripts/check-academic-roles.py --java-required` with Python 3.12+ and JDK 17+.
4. Run `npm run build` and `npm run validate:publication-build`.
5. Compose with the website's `mount-subsystem.mjs` and `publish-course-contract.mjs`, then run browser checks.
6. Merge source before website registration/release changes; preserve all existing CI and deployment gates.
7. Verify all 40 new canonical routes, downloads, sitemap entries and registration prefill on production.

## Change log

1.0.0: initial pilot curriculum, offline fixtures, course navigation, metadata, registration scope, deterministic generation and validation. Next content review target: 1 February 2027 or when a source/role requirement changes.
