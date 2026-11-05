# Mathematics for IT Lecturers



Academic roles · EDU-MAT-201 · Version 1.0.0

Make discrete logic, vectors and conditional probability teachable through worked computing examples and misconception-led feedback.



**Public pilot courseware** · **Intermediate professional development** · **Estimated effort: 10 hours** · **Four separate modules**

Read, practise and build a portfolio. Independent subject review is pending. Formal grading, certification and LMS progress tracking are not enabled by these public pages.



[Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-MAT-201) · [Download the course pack](https://www.skunkworksacademy.com/downloads/academic-roles/mathematics-for-it-lecturers/course-pack.zip)

## Who this course serves

This course supports the **IT Lecturer - Mathematics** role listed in the supplied job alert. The alert locations are **Nelson Mandela Bay**. It develops bounded professional capabilities; it does not replace a relevant degree, employment experience or the employer's selection requirements. It is independently authored Skunkworks Academy material and is not an Eduvos-endorsed or accredited qualification.

**Prerequisites:** Algebra, functions and introductory probability; experience explaining quantitative reasoning.

**Lab environment:** A calculator, spreadsheet or Python 3.12 or later; paper working is a complete alternative.

**Delivery:** self-paced practice with an optional facilitated cohort. English text, native tables and expandable formative feedback support accessible study. No paid tools are required for the core exercises. Plan two hours for each of Modules 1–3 and four hours for the capstone, including practice and revision; actual time depends on prior knowledge.

## Your learning pathway



## Outcomes and evidence

The course uses a portfolio to make capability observable. The following evidence statements define the work you will produce, rather than promising an employment or certification outcome.

| Outcome | Evidence you will produce and explain | Where | Assessment link |
|---|---|---|---|
| LO-01 | Truth table, counterexample and repaired rule | Module 1 | Module lab acceptance and capstone rubric |
| LO-02 | Annotated vector transformation and invariant check | Module 2 | Module lab acceptance and capstone rubric |
| LO-03 | Frequency table and explained posterior probability | Module 3 | Module lab acceptance and capstone rubric |
| LO-04 | A diagnostic-led mini-lesson and moderated mathematics assessment | Module 4 | Capstone rubric |

## Course materials

- [Complete course pack: guide, workbook, facilitator notes and labs](https://www.skunkworksacademy.com/downloads/academic-roles/mathematics-for-it-lecturers/course-pack.zip)
- [Learner workbook](https://www.skunkworksacademy.com/downloads/academic-roles/mathematics-for-it-lecturers/learner-workbook.md)
- [Facilitator and assessor guide](https://www.skunkworksacademy.com/downloads/academic-roles/mathematics-for-it-lecturers/facilitator-guide.md)
- [Download lab.py](https://www.skunkworksacademy.com/downloads/academic-roles/mathematics-for-it-lecturers/lab.py)

## How to study and retain evidence

Begin by predicting the result of each worked example. Run or complete the activity, compare the observation with the prediction, and explain one discrepancy. Use the expandable retrieval questions for practice; their answers are public and are not a secure exam bank. The workbook is a local planning aid and does not submit work or save a grade to an LMS.

Keep only synthetic or authorized data. Before formal submission, confirm the assessor, private evidence channel and retention rules. If you need help or an accessible alternative, use the Academy contact route in the shared footer or the facilitated-enrolment enquiry above. Do not include confidential evidence in the enquiry form.

## Source and maintenance record

**Role source:** a user-supplied job-alert PDF dated 1 November 2026. Its short excerpts establish the role labels and broad duties, not a complete employer competency specification. The generic IT Lecturer listing at two campuses maps to one course. The mathematics title normalizes the alert's spelling. Full job descriptions have not been assumed.

**Technical sources:** official documentation linked at the end of each module; original synthetic examples and datasets. **Owner:** Skunkworks Academy curriculum team. **Independent SME reviewer:** not yet assigned. **Next review target:** 1 February 2027, or earlier when a referenced interface or role requirement changes. **Changelog:** 1.0.0, initial pilot edition, 1 November 2026.




# Module 1 — Logic, quantifiers and counterexamples

## Outcomes

Construct a truth table; distinguish conjunction from disjunction; refute a universal claim with a counterexample and explain its limits.

## Explain and demonstrate

Logic becomes useful to an IT learner when it governs a visible decision. Suppose a lab requires both enrolment and an active account. Let E mean enrolled and A mean active. The intended rule is E AND A. Replacing AND with OR permits an inactive enrolled learner and an active non-enrolled learner. A truth table exposes both errors without requiring access to a real identity system.

Separate a proposition from its implementation. “Every active account may access this lab” is a universal claim. One active account without enrolment is a counterexample under the stated policy. A counterexample disproves the universal claim; it does not establish a different universal claim. Likewise, checking a few successful users cannot prove a rule for every possible account.

### Worked example: the complete Boolean input space

| E | A | E AND A | E OR A |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 |

Read one row aloud: “The account is active, but the learner is not enrolled, so access is denied.” This verbal explanation connects symbols to the scenario and supports learners unfamiliar with Boolean notation. Make clear that the exercise models only two factors; a real access decision may require more evidence.

## Lab — repair a policy explanation

**Setup:** Use the course `lab.py`, or reproduce the table on paper. No accounts or network services are involved.

1. Predict all four rows, then run `python lab.py logic` to compare.
2. Mark the two rows where AND and OR disagree. Explain which requirement each OR result violates.
3. Add a third proposition S for suspended. Write the rule “enrolled AND active AND NOT suspended” and enumerate its eight input combinations.
4. Give a counterexample to “If a learner is enrolled, access must be allowed.” State all three input values.
5. Design a distractor that reveals confusion between necessary and sufficient conditions. Provide feedback that explains the mistake rather than only naming the answer.

**Expected observations:** Enrolment is necessary in this rule, but it is not sufficient. The only allowed three-factor combination is enrolled, active and not suspended. **Fault injection:** Replace the AND joining enrolment and activity with OR and find a previously denied combination that becomes allowed. Restore the intended rule.

**Evidence:** Truth tables, a counterexample and a feedback paragraph. **Cleanup:** Keep the synthetic worksheet; discard any real access records accidentally used.

## Common pitfalls and teaching decisions

A learner may reverse an implication because the same words appear on both sides. Ask them to test one concrete row rather than repeating the formula. Do not use “obviously” when moving between everyday language and notation. Define the domain of a universal claim: all learners in this fictional lab is different from all people.

## Retrieval and reflection


Does one allowed account prove that the access rule is correct?

No. It checks one input combination. The truth table covers all combinations of the two Boolean variables in this simplified model.




Is enrolment sufficient for access in the original rule?

No. Activity is also required. Explain the enrolled-but-inactive row to distinguish necessity from sufficiency.



## Official references

[OpenStax Contemporary Mathematics: logic](https://openstax.org/books/contemporary-mathematics/pages/2-introduction) · [Python Boolean operations](https://docs.python.org/3.14/library/stdtypes.html#boolean-operations-and-or-not). The access scenario is original and simplified for teaching.


# Module 2 — Vectors and coordinate transformations

## Outcomes

Apply a two-dimensional rotation; identify coordinate conventions; verify a geometric invariant and diagnose a sign error.

## Explain and demonstrate

A vector records magnitude and direction relative to a coordinate system. The ordered pair (2, 1) is meaningful only after declaring what x and y represent, their units and the direction of positive axes. In this lesson x points right, y points up and positive rotation is counterclockwise. These conventions differ from many image grids, where row values increase downward.

A 90-degree counterclockwise rotation maps (x, y) to (−y, x). Applying it to (2, 1) gives (−1, 2). The squared length before rotation is 2² + 1² = 5; afterwards it is (−1)² + 2² = 5. Length preservation is an invariant of this rotation. It provides a check independent of the exact expected coordinate pair, although it cannot detect every wrong transformation: a reflection also preserves length.

### Worked example: independent checks

| Input | Correct rotated point | Squared length | Check purpose |
|---|---|---|---|
| (1, 0) | (0, 1) | 1 | Confirms rotation direction |
| (0, 1) | (−1, 0) | 1 | Confirms sign and axis exchange |
| (2, 1) | (−1, 2) | 5 | Checks a non-axis example |
| (0, 0) | (0, 0) | 0 | Checks the origin |

Two successive quarter-turns produce (−x, −y); four return the original point. This composition check reveals how repeated operations relate to a larger transformation. Translation is different: adding an offset changes position, while a direction vector does not receive the same translation treatment in geometric models.

## Lab — teach a transformation through evidence

**Setup:** Use graph paper or the supplied `lab.py`; keep all quantities dimensionless for this fixture.

1. Plot (2, 1), predict its rotated location and draw both position vectors.
2. Run `python lab.py vectors`. Expect `(-1, 2) squared length: 5`.
3. Apply `rotate` four times to each point in the table. Check that the original point returns.
4. Replace the mapping with `(y, x)` in a copy. Show that the length check and the (1, 0) example both pass, but the (0, 1) example fails. Use both basis vectors to distinguish the reflection from the intended rotation.
5. Write a two-minute explanation of why one invariant is insufficient. Include the two basis-vector tests.

**Expected observations:** The swap-only function reflects across y = x; it is not a quarter-turn rotation. **Recovery:** Restore `(-point[1], point[0])` and rerun the checks.

**Evidence:** Annotated plots, the convention statement, test results and the explanation. **Cleanup:** Keep corrected code and label the faulty example as a teaching counterexample.

## Common pitfalls and teaching decisions

Mixing degrees and radians creates numerical errors in later trigonometric code. A correct formula under one axis convention can look reversed under another. Ask learners to annotate axes before calculating. Offer an equivalent coordinate table for learners who cannot interpret the plotted arrows.

## Retrieval and reflection


Why can a length-preserving result still be wrong?

Reflection preserves length too. Verify orientation and known points as well as length.




What should be declared before comparing two coordinate implementations?

Axis directions, units, origin and angle convention. Resolve these assumptions before diagnosing a formula defect.



## Official references

[OpenStax Precalculus: rotation of axes](https://openstax.org/books/precalculus-2e/pages/10-4-rotation-of-axes) · [Python mathematics functions](https://docs.python.org/3.14/library/math.html). This lesson rotates a vector in fixed axes; the source also discusses rotating axes, which is a distinct convention to compare deliberately.


# Module 3 — Conditional probability and evidence

## Outcomes

Calculate conditional probability using natural frequencies; distinguish sensitivity from positive predictive value; explain how prevalence changes an interpretation.

## Explain and demonstrate

Conditional probability changes the group used as the denominator. In a fictional screening example, sensitivity asks what fraction of people with a condition test positive. The probability of having the condition after a positive result asks a different question: among all positive results, how many belong to people with the condition? Confusing these quantities creates confident but incorrect explanations.

Use a fictional population of 10,000, prevalence 1%, sensitivity 90% and false-positive rate 5%. Exactly 100 have the condition in this constructed example. Of those, 90 test positive. Of the other 9,900, 495 test positive. There are therefore 585 positive results, and 90 / 585 = 2 / 13, approximately 15.38%, are true positives. These are invented teaching values, not clinical advice or measured test characteristics.

### Worked example: a frequency table

| Group | Positive | Negative | Total |
|---|---|---|---|
| Condition present | 90 | 10 | 100 |
| Condition absent | 495 | 9,405 | 9,900 |
| Total | 585 | 9,415 | 10,000 |

Ask learners to point to the denominator before entering numbers into a calculator. For sensitivity, select the “condition present” row. For probability after a positive result, select the “positive” column. The visual selection explains the difference more clearly than memorizing two formulas.

Changing prevalence while keeping sensitivity and false-positive rate fixed changes the positive-result interpretation. At 10% prevalence in the same population, true positives become 900 and false positives 450. The resulting probability is 900 / 1,350, or two thirds. The assumptions are deliberately held constant for comparison; real settings may also change the test characteristics.

## Lab — build a misconception diagnostic

**Setup:** Use a calculator, spreadsheet or `lab.py`. No health or personal data are needed.

1. Recreate the first frequency table and verify that row and column totals agree.
2. Run `python lab.py probability`. Expected output: `2/13 = 15.3846%`.
3. Construct the 10%-prevalence table and explain the changed denominator.
4. Write a multiple-choice question with 90%, 5% and 15.38% as options. For each incorrect option, identify the quantity the learner has substituted.
5. Create a transfer problem using a spam classifier or equipment alarm. State all assumptions and derive an answer before using it with learners.

**Fault injection:** Divide 90 by 100 and label the result as probability after a positive result. Use the table to identify why the label is wrong. **Recovery:** Restore the positive-column denominator of 585.

**Evidence:** Both tables, arithmetic, distractor explanations and transfer task. **Cleanup:** Retain only fictional examples and remove unsupported real-world claims.

## Common pitfalls and teaching decisions

A rounded percentage should not be presented as exact. A small denominator can make a percentage unstable in measured data. This fixture uses exact constructed counts to teach the relationship; inference from observed samples would require additional uncertainty analysis.

## Retrieval and reflection


Why is sensitivity not the answer to “given a positive result, what is the probability?”

Sensitivity conditions on the condition being present. The second question conditions on a positive result. They select different groups.




What changed when prevalence increased to 10%?

The balance of true and false positives changed, even though the stated sensitivity and false-positive rate stayed fixed. Rebuild the frequency table to see the effect.



## Official references

[OpenStax Introductory Statistics: probability](https://openstax.org/books/introductory-statistics-2e/pages/3-introduction) · [Python exact rational arithmetic](https://docs.python.org/3.14/library/fractions.html).


# Module 4 — Mathematics teaching capstone

## Outcomes

Integrate the course evidence into a reproducible microteaching session; apply an analytic rubric; identify a specific improvement after feedback.

## Scenario and deliverable

Teach a 20-minute lesson on interpreting a positive screening result using a fictional population. Provide both a frequency table and a probability derivation; diagnose confusion between sensitivity and the probability of a condition after a positive result. Add one transfer problem with different prevalence and a transparent partial-credit rubric.

This capstone is a public portfolio brief. It is not a secure exam. Formal assessment requires an assigned assessor, an approved private submission channel and confirmed assessment arrangements. Do not upload learner records or controlled institutional questions to a public repository.

## Worked example: plan the evidence before the performance

A strong submission makes a claim, shows the relevant artifact and explains why the artifact meets the criterion. For example, “the task has been checked” is weaker than a dated run record naming the fixture, environment and expected result. For editorial work, show the original wording, the query or edit, its justification and the release decision. For teaching work, show the outcome, the task and the learner evidence it produces.

| Stage | Time budget | Observable output |
|---|---|---|
| Plan and check prerequisites | 45 minutes | Scope, outcome and readiness checklist |
| Produce the task and worked example | 75 minutes | Reproducible learner materials |
| Rehearse and deliver | 60 minutes | Observed performance and feedback |
| Moderate and revise | 60 minutes | Rubric, correction and final reflection |

These are planning estimates, not measured completion times. Pause when a prerequisite is missing and record the adjustment rather than rushing through unverified work.

## Lab — assemble and defend the portfolio

1. Gather the three earlier module artifacts. Label each with the course ID, module, version and date; remove unnecessary personal information.
2. Use the downloadable workbook to map each artifact to an outcome and acceptance criterion.
3. Prepare the role-specific capstone above. Keep its scope small enough to verify every important claim.
4. Rehearse with a peer or record a self-review. If recording another person, obtain permission and use an approved private location; a written observation is an alternative.
5. Introduce one controlled defect in a labelled copy. Demonstrate how a test, source check or rubric detects it, then restore the correct version.
6. Score the evidence against the rubric below. An assessor should reproduce at least one technical or editorial check and explain any disagreement.
7. Revise the weakest criterion and submit a short change record. Retain the initial and revised versions so the improvement is visible.

**Expected observations:** Every scored claim has observable evidence, and the corrected artifact passes the same check that exposed the defect. **Evidence:** The four artifacts listed on the course overview, a rubric record and a reflection. **Cleanup:** Remove faulty release copies and temporary files; retain only the agreed evidence in the approved workspace.

## Assessment rubric

This is the proposed Academy pilot standard. Score each criterion from 0 to 4 and calculate `weight × level / 4`. Level 0 means absent evidence; 1 means major errors; 2 means partially working or incompletely verified; 3 means correct, reproducible and appropriately explained; 4 adds justified transfer and diagnosis of a meaningful fault.

| Criterion | Weight | Evidence required for level 3 |
|---|---|---|
| Subject correctness | 30% | Correct reasoning and outputs against explicit requirements |
| Role-specific performance | 25% | A coherent microteaching session aligned with its audience and outcome |
| Verification and reproducibility | 20% | Traceable checks, environment or source details, and a demonstrated repair |
| Accessibility and clarity | 15% | Structured materials, readable visuals and equivalent text explanations |
| Safe professional handover | 10% | Synthetic or authorized data, source attribution and unresolved issues recorded |

**Pilot completion threshold:** at least 75/100, with subject correctness and verification each at level 3 or above, and all critical conditions resolved. This is not a vendor examination pass mark. A browser self-check does not issue a certificate or record an official grade.

**Critical condition:** Incorrect denominators or a worked solution that conflicts with the stated assumptions must be corrected.

## Feedback, moderation and reassessment

Give feedback using an observed artifact, the relevant criterion and one concrete next action. Where two assessors disagree, compare the same evidence and record the reason for the final decision. Do not average unexplained scores to hide disagreement. A reassessment should target the missing capability with a fresh equivalent task, followed by rechecking the affected criteria. Follow the commissioning institution's approved appeals process for formal delivery.

## Retrieval and reflection


Can a polished presentation compensate for incorrect subject reasoning?

No. Subject correctness has a minimum required level and cannot be offset by attractive formatting. Correct the reasoning and verify the revised artifact.




What distinguishes a self-check from formal assessment here?

A self-check supports practice. Formal assessment requires an authorized assessor, controlled evidence handling, recorded decisions and confirmed institutional arrangements. This public course does not create those records automatically.



## Official references and next steps

Use the specific official sources in Modules 1–3 and record their versions in your portfolio. Consult [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) when reviewing your handout. [Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-MAT-201) for a supported cohort or assessment discussion; an enquiry does not grant access or award a credential.
