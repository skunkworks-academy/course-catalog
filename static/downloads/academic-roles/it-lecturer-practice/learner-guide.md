# IT Lecturer Practice and Assessment



Academic roles · EDU-ITL-201 · Version 1.0.0

Plan aligned IT lessons, facilitate safe labs and produce defensible assessment and moderation evidence.



**Public pilot courseware** · **Intermediate professional development** · **Estimated effort: 10 hours** · **Four separate modules**

Read, practise and build a portfolio. Independent subject review is pending. Formal grading, certification and LMS progress tracking are not enabled by these public pages.



[Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-ITL-201) · [Download the course pack](https://www.skunkworksacademy.com/downloads/academic-roles/it-lecturer-practice/course-pack.zip)

## Who this course serves

This course supports the **IT Lecturer** role listed in the supplied job alert. The alert locations are **Nelson Mandela Bay, Bedfordview**. It develops bounded professional capabilities; it does not replace a relevant degree, employment experience or the employer's selection requirements. It is independently authored Skunkworks Academy material and is not an Eduvos-endorsed or accredited qualification.

**Prerequisites:** Competence in one IT subject and basic document/spreadsheet skills; prior teaching is useful but not required.

**Lab environment:** Text editor, Python 3.12 or later for the demonstration, and an offline or institution-approved teaching workspace.

**Delivery:** self-paced practice with an optional facilitated cohort. English text, native tables and expandable formative feedback support accessible study. No paid tools are required for the core exercises. Plan two hours for each of Modules 1–3 and four hours for the capstone, including practice and revision; actual time depends on prior knowledge.

## Your learning pathway



## Outcomes and evidence

The course uses a portfolio to make capability observable. The following evidence statements define the work you will produce, rather than promising an employment or certification outcome.

| Outcome | Evidence you will produce and explain | Where | Assessment link |
|---|---|---|---|
| LO-01 | Outcome-to-evidence map and timed lesson plan | Module 1 | Module lab acceptance and capstone rubric |
| LO-02 | Lab readiness checklist, hint ladder and recovery plan | Module 2 | Module lab acceptance and capstone rubric |
| LO-03 | Rubric, two synthetic marked scripts and moderation decision | Module 3 | Module lab acceptance and capstone rubric |
| LO-04 | A teaching portfolio and observed microteaching session | Module 4 | Capstone rubric |

## Course materials

- [Complete course pack: guide, workbook, facilitator notes and labs](https://www.skunkworksacademy.com/downloads/academic-roles/it-lecturer-practice/course-pack.zip)
- [Learner workbook](https://www.skunkworksacademy.com/downloads/academic-roles/it-lecturer-practice/learner-workbook.md)
- [Facilitator and assessor guide](https://www.skunkworksacademy.com/downloads/academic-roles/it-lecturer-practice/facilitator-guide.md)
- [Download lab.py](https://www.skunkworksacademy.com/downloads/academic-roles/it-lecturer-practice/lab.py)

## How to study and retain evidence

Begin by predicting the result of each worked example. Run or complete the activity, compare the observation with the prediction, and explain one discrepancy. Use the expandable retrieval questions for practice; their answers are public and are not a secure exam bank. The workbook is a local planning aid and does not submit work or save a grade to an LMS.

Keep only synthetic or authorized data. Before formal submission, confirm the assessor, private evidence channel and retention rules. If you need help or an accessible alternative, use the Academy contact route in the shared footer or the facilitated-enrolment enquiry above. Do not include confidential evidence in the enquiry form.

## Source and maintenance record

**Role source:** a user-supplied job-alert PDF dated 1 November 2026. Its short excerpts establish the role labels and broad duties, not a complete employer competency specification. The generic IT Lecturer listing at two campuses maps to one course. The mathematics title normalizes the alert's spelling. Full job descriptions have not been assumed.

**Technical sources:** official documentation linked at the end of each module; original synthetic examples and datasets. **Owner:** Skunkworks Academy curriculum team. **Independent SME reviewer:** not yet assigned. **Next review target:** 1 February 2027, or earlier when a referenced interface or role requirement changes. **Changelog:** 1.0.0, initial pilot edition, 1 November 2026.




# Module 1 — Outcomes, alignment and lesson planning

## Outcomes

Write an observable learning outcome; align practice and assessment with that outcome; plan a short lesson with realistic evidence checkpoints.

## Explain and demonstrate

A topic is not an outcome. “CSV files” identifies subject matter; “validate a CSV header and explain a rejected record” identifies a performance that can be observed. Add conditions and criteria so the task is assessable: given a synthetic file and the Python standard library, reject a missing required column and report the line containing an invalid score. Avoid adding unnecessary tool constraints unless using that tool is itself part of the intended capability.

Backward design begins with the evidence of learning. If learners must diagnose an import failure, a recall-only quiz is insufficient. They need a failing fixture, a way to inspect it and a requirement to justify their diagnosis. Explanations and guided practice then prepare them for that performance. A short lesson can target one meaningful capability; it does not need to summarize an entire discipline.

### Worked example: alignment map

| Outcome | Practice | Independent evidence |
|---|---|---|
| Identify a missing column | Compare two CSV headers | Explain why a new file is rejected |
| Diagnose an invalid score | Trace a failing row | Name the row and violated rule |
| Verify a repair | Run a corrected fixture | Show both a passing and a rejection case |

Notice that every outcome has a distinct observable artifact. “Learner was engaged” is useful facilitation information but is not direct evidence that the import logic was understood.

## Lab — build a 20-minute lesson

**Setup:** Download the supplied `lab.py`. Its `files` command uses temporary synthetic records and does not require an LMS or internet connection.

1. Run `python lab.py files` to see `[('L01', 80.0), ('L02', 100.0)]`.
2. Write one outcome using an action, condition and acceptance criterion.
3. Allocate 2 minutes to a diagnostic prediction, 5 to a worked example, 7 to guided practice, 4 to an independent transfer and 2 to feedback.
4. Create a new transfer fixture that changes the record and error location while preserving the intended difficulty.
5. Ask a peer to complete only the independent task. Record which instructions required clarification.
6. Revise the task wording without revealing the answer. Recheck that the evidence still measures the outcome.

**Expected observations:** A learner can demonstrate the target capability without copying the worked example verbatim. **Fault injection:** Remove the independent transfer task from the plan and identify the missing evidence; restore it before release.

**Evidence:** Alignment map, timed plan, diagnostic prompt and transfer task. **Cleanup:** Keep only fictional identifiers and approved teaching artifacts.

## Common pitfalls and teaching decisions

An outcome such as “understand files” does not tell an assessor what to observe. Too many objectives leave no time for practice. A task can also be misaligned by testing typing speed or language complexity instead of the intended concept. Provide accessible instructions and allow equivalent evidence when the response format is not itself being assessed.

## Retrieval and reflection


Why is copying the demonstrated solution weak evidence of transfer?

The learner may reproduce steps without understanding the rule. Change the fixture and ask for an explanation of the decision.




What should be removed first when a 20-minute plan contains six outcomes?

Narrow the intended performance and move supporting topics to prerequisites or later lessons. Preserve practice and evidence time for the remaining outcome.



## Official references

[CAST Universal Design for Learning guidelines](https://udlguidelines.cast.org/) · [Python CSV interface](https://docs.python.org/3.14/library/csv.html). The timing and alignment example are an Academy design proposal to pilot, not a measured teaching effect.


# Module 2 — Inclusive lab facilitation and feedback

## Outcomes

Prepare a reproducible lab; provide graduated hints without taking over the task; distinguish environment failure from conceptual misunderstanding.

## Explain and demonstrate

A lab has two learning environments: the technical setup and the learner’s current model of the problem. A missing interpreter is not evidence that a learner misunderstands functions. A correct installation is not evidence that they understand validation. Check readiness before the lesson, and keep technical recovery separate from conceptual feedback.

A useful hint ladder reveals progressively more information. Start by asking the learner to compare expected and observed behaviour. Then direct attention to the relevant rule. Only later identify the function or line to inspect. A final worked explanation may be appropriate, but record that the learner received it and provide a fresh transfer task afterwards. Otherwise the assessor may confuse guided completion with independent performance.

### Worked example: graduated support

| Level | Facilitator prompt | Information revealed |
|---|---|---|
| 1 | “Which result did you predict?” | Learner’s current model |
| 2 | “Which column names does the contract require?” | Relevant requirement |
| 3 | “Compare `rows.fieldnames` with the required set.” | Location and representation |
| 4 | Demonstrate one corrected header | A solution for one case |

Offer the same conceptual task through readable text, a trace table and a spoken explanation where appropriate. Equivalent access does not mean lowering the criterion. A learner can explain a validation rule orally while still demonstrating the required code behaviour if code execution is part of the outcome.

## Lab — rehearse a safe failure

**Setup:** In a fresh folder, run `python --version` and `python lab.py test`. Six tests should pass. Keep the original file available as a reset point.

1. Prepare a readiness checklist covering interpreter, file location, command, expected result and recovery path.
2. Ask a peer to change the expected CSV header in a copy, or make the change yourself for a delayed rehearsal.
3. Use the hint ladder to diagnose the resulting failure. Record the highest hint level used.
4. Prepare an offline alternative containing the same input and output trace for a learner whose environment cannot be repaired during class.
5. After recovery, give a fresh fixture and require an independent explanation.
6. Write feedback in three parts: observed behaviour, relation to the criterion, and the next action.

**Expected observations:** The support record distinguishes independent success from success after a demonstrated solution. **Recovery:** Restore the original file and rerun all six tests. **Evidence:** Readiness checklist, hint log, feedback and transfer response. **Cleanup:** Delete faulty copies that could be mistaken for the final solution; retain anonymized teaching notes only.

## Common pitfalls and teaching decisions

Taking the keyboard away from the learner can fix the machine while losing the learning opportunity. Publicly displaying named errors can discourage participation and expose personal information. Use fictional examples for whole-class feedback. Do not send a learner into a production tenant to compensate for a broken training lab.

## Retrieval and reflection


A learner completed the task after seeing the full solution. What evidence is still needed?

A new independent task or explanation that demonstrates transfer. Record the assistance already provided.




How can you preserve the outcome when a learner cannot run the environment?

Use an equivalent trace or explanation for conceptual outcomes, and reschedule required execution evidence when execution itself is part of the outcome. Do not silently mark an unperformed practical task complete.



## Official references

[CAST guidelines for action and expression](https://udlguidelines.cast.org/) · [W3C accessible teaching materials](https://www.w3.org/WAI/tips/writing/). Local hint and recovery records are formative teaching aids, not institutional grading records.


# Module 3 — Assessment design and moderation

## Outcomes

Design a criterion-referenced rubric; moderate two synthetic submissions; document feedback and a defensible reassessment path.

## Explain and demonstrate

An assessment should make the required performance visible to both learner and assessor. A rubric separates criteria such as correctness, verification and explanation. “Excellent work” is not an observable criterion. “Rejects missing columns and invalid scores, with reproducible evidence for both cases” is more useful because two assessors can inspect the same artifacts.

Weighting communicates importance, but a weighted total can hide a critical failure. A submission that exposes real learner records should not pass simply because its code is otherwise strong. Declare critical conditions in advance and require remediation. These are Academy pilot assessment rules, not a vendor exam pass standard or an institution’s official policy.

### Worked example: a 100-point task rubric

| Criterion | Weight | Competent evidence |
|---|---|---|
| Correct validation | 40 | Header and score rules implemented |
| Verification | 30 | Valid, boundary and rejection cases reproduced |
| Explanation | 20 | Error is connected to the violated rule |
| Safe handover | 10 | Synthetic data, versions and recovery notes |

Moderation compares the interpretation of criteria. Suppose one marker awards full correctness because the happy path works, while another notices missing rejection checks. The discrepancy reveals an ambiguous criterion or incomplete evidence review. Resolve it by referring to the stated requirement, then record the decision and apply it consistently to comparable submissions.

## Lab — moderate fictional evidence

**Setup:** Use two synthetic submissions. Submission A accepts valid rows but converts any invalid score to zero. Submission B rejects invalid scores and missing headers but supplies no execution record. Do not use real learner grades.

1. Score each submission independently against the four criteria. Write evidence-based notes for every deduction.
2. Compare your scores with a peer or a second delayed marking pass.
3. Identify whether each disagreement concerns missing evidence, a technical error or rubric wording.
4. Revise the descriptor where necessary, then re-mark both submissions consistently. Preserve the original and revised scores in the simulation record.
5. Define a reassessment task targeting the gap. A should demonstrate explicit rejection; B should reproduce and explain the tests.
6. Draft an appeal route that names a reviewer role and evidence required, without inventing an institutional deadline or authority.

**Expected observations:** A plausible output does not justify accepting silently altered data. Missing evidence limits the claim that behaviour was verified. **Fault injection:** Award full verification marks without logs or a witnessed run; identify and correct the unsupported score.

**Evidence:** Rubric, two synthetic marking sheets, moderation rationale and remediation tasks. **Cleanup:** Label the packet “training simulation”; do not import these scores into a live gradebook.

## Common pitfalls and teaching decisions

Agreement between markers is not enough if both use an invalid criterion. A hidden answer key in a public website is not secure. Keep controlled summative items and actual submissions in an approved access-controlled service. Public knowledge checks in this course are formative and do not create a formal grade.

## Retrieval and reflection


Should a high weighted total override a declared critical safety failure?

No. Apply the published critical condition and require correction, while preserving the evidence and feedback record.




What should a moderation record explain?

The evidence examined, the disagreement, the criterion used, the decision and any consistent re-marking required. A changed number alone is insufficient.



## Official references

[QAA assessment guidance](https://www.qaa.ac.uk/en/the-quality-code/2024/advice-and-guidance-2024/quality-code-advice-and-guidance-principle-11) · [Python unittest concepts](https://docs.python.org/3.14/library/unittest.html). Confirm the commissioning institution’s assessment, retention and appeal policies before formal delivery.


# Module 4 — IT teaching portfolio capstone

## Outcomes

Integrate the course evidence into a reproducible microteaching session; apply an analytic rubric; identify a specific improvement after feedback.

## Scenario and deliverable

Deliver a 20-minute lesson on validating a small CSV import. Include a diagnostic question, a worked example, guided practice and an independent transfer task. Submit a timed plan, accessible handout, fault-recovery guide, rubric and moderation record for two fictional student submissions.

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

**Critical condition:** Public learner records, unsafe lab instructions or unverifiable grades must be corrected before release.

## Feedback, moderation and reassessment

Give feedback using an observed artifact, the relevant criterion and one concrete next action. Where two assessors disagree, compare the same evidence and record the reason for the final decision. Do not average unexplained scores to hide disagreement. A reassessment should target the missing capability with a fresh equivalent task, followed by rechecking the affected criteria. Follow the commissioning institution's approved appeals process for formal delivery.

## Retrieval and reflection


Can a polished presentation compensate for incorrect subject reasoning?

No. Subject correctness has a minimum required level and cannot be offset by attractive formatting. Correct the reasoning and verify the revised artifact.




What distinguishes a self-check from formal assessment here?

A self-check supports practice. Formal assessment requires an authorized assessor, controlled evidence handling, recorded decisions and confirmed institutional arrangements. This public course does not create those records automatically.



## Official references and next steps

Use the specific official sources in Modules 1–3 and record their versions in your portfolio. Consult [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) when reviewing your handout. [Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-ITL-201) for a supported cohort or assessment discussion; an enquiry does not grant access or award a credential.
