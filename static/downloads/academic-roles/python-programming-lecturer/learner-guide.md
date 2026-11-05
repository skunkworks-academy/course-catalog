# Python Programming Lecturer Practice



Academic roles · EDU-PYT-201 · Version 1.0.0

Teach Python through execution tracing, explicit contracts, robust file handling and reproducible tests.



**Public pilot courseware** · **Intermediate professional development** · **Estimated effort: 10 hours** · **Four separate modules**

Read, practise and build a portfolio. Independent subject review is pending. Formal grading, certification and LMS progress tracking are not enabled by these public pages.



[Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-PYT-201) · [Download the course pack](https://www.skunkworksacademy.com/downloads/academic-roles/python-programming-lecturer/course-pack.zip)

## Who this course serves

This course supports the **IT Lecturer - Python Programming** role listed in the supplied job alert. The alert locations are **Tygervalley / Tyger Valley**. It develops bounded professional capabilities; it does not replace a relevant degree, employment experience or the employer's selection requirements. It is independently authored Skunkworks Academy material and is not an Eduvos-endorsed or accredited qualification.

**Prerequisites:** Basic programming and Python syntax; ability to run a script in a terminal.

**Lab environment:** Python 3.12 or later and a text editor. Examples use the standard library and are checked against Python 3.14 documentation.

**Delivery:** self-paced practice with an optional facilitated cohort. English text, native tables and expandable formative feedback support accessible study. No paid tools are required for the core exercises. Plan two hours for each of Modules 1–3 and four hours for the capstone, including practice and revision; actual time depends on prior knowledge.

## Your learning pathway



## Outcomes and evidence

The course uses a portfolio to make capability observable. The following evidence statements define the work you will produce, rather than promising an employment or certification outcome.

| Outcome | Evidence you will produce and explain | Where | Assessment link |
|---|---|---|---|
| LO-01 | Execution trace explaining aliasing and mutation | Module 1 | Module lab acceptance and capstone rubric |
| LO-02 | Validated function with boundary and exception cases | Module 2 | Module lab acceptance and capstone rubric |
| LO-03 | Temporary-file tests for a CSV importer | Module 3 | Module lab acceptance and capstone rubric |
| LO-04 | A microteaching portfolio with a tested Python learning task | Module 4 | Capstone rubric |

## Course materials

- [Complete course pack: guide, workbook, facilitator notes and labs](https://www.skunkworksacademy.com/downloads/academic-roles/python-programming-lecturer/course-pack.zip)
- [Learner workbook](https://www.skunkworksacademy.com/downloads/academic-roles/python-programming-lecturer/learner-workbook.md)
- [Facilitator and assessor guide](https://www.skunkworksacademy.com/downloads/academic-roles/python-programming-lecturer/facilitator-guide.md)
- [Download lab.py](https://www.skunkworksacademy.com/downloads/academic-roles/python-programming-lecturer/lab.py)

## How to study and retain evidence

Begin by predicting the result of each worked example. Run or complete the activity, compare the observation with the prediction, and explain one discrepancy. Use the expandable retrieval questions for practice; their answers are public and are not a secure exam bank. The workbook is a local planning aid and does not submit work or save a grade to an LMS.

Keep only synthetic or authorized data. Before formal submission, confirm the assessor, private evidence channel and retention rules. If you need help or an accessible alternative, use the Academy contact route in the shared footer or the facilitated-enrolment enquiry above. Do not include confidential evidence in the enquiry form.

## Source and maintenance record

**Role source:** a user-supplied job-alert PDF dated 1 November 2026. Its short excerpts establish the role labels and broad duties, not a complete employer competency specification. The generic IT Lecturer listing at two campuses maps to one course. The mathematics title normalizes the alert's spelling. Full job descriptions have not been assumed.

**Technical sources:** official documentation linked at the end of each module; original synthetic examples and datasets. **Owner:** Skunkworks Academy curriculum team. **Independent SME reviewer:** not yet assigned. **Next review target:** 1 February 2027, or earlier when a referenced interface or role requirement changes. **Changelog:** 1.0.0, initial pilot edition, 1 November 2026.




# Module 1 — Execution models and data structures

## Outcomes

Trace names and objects; distinguish mutation from rebinding; explain when a shallow copy does and does not isolate changes.

## Explain and demonstrate

Python names refer to objects. Assigning one list variable to another does not copy the list; it creates another reference to the same object. Mutating the object through either name is therefore visible through both. Rebinding a name to a different object is a different operation. These distinctions explain many beginner bugs more effectively than saying that a variable is simply a box containing a value.

In the fixture, `original = [1, 2]`, `alias = original` and `copied = original.copy()`. Appending 3 through `alias` changes `original`, while `copied` remains `[1, 2]`. The shallow copy creates a new outer list. If the list contains nested mutable objects, those inner references may still be shared; a shallow copy does not recursively duplicate everything.

### Worked example: execution trace

| Step | original | alias | copied |
|---|---|---|---|
| Create original | List A: [1, 2] | Unbound | Unbound |
| Assign alias | List A | List A | Unbound |
| Copy outer list | List A | List A | List B: [1, 2] |
| Append through alias | List A: [1, 2, 3] | List A: [1, 2, 3] | List B: [1, 2] |

The labels A and B are conceptual identifiers, not actual memory addresses. A trace table makes the reference relationship accessible without requiring a diagram. Ask learners to predict before execution and explain any discrepancy after it.

## Lab — diagnose an aliasing misconception

**Setup:** Download `lab.py`; use Python 3.12 or later. No packages or network connection are required.

1. Run `python lab.py alias`. Expect `original [1, 2, 3] copy [1, 2]`.
2. Recreate the trace table without looking at the output.
3. Replace `alias.append(3)` with `alias = alias + [3]` in a copy. Explain why rebinding changes which object the alias names while leaving the original list unchanged.
4. Repeat with a nested list and an outer shallow copy. Mutate an inner list and record the shared effect.
5. Write a formative question that distinguishes shallow copying from recursively copying nested objects. Provide feedback for the misconception, not just the answer.

**Fault injection:** Replace `.copy()` with a direct assignment while keeping the “independent copy” claim. Use the mutation observation to expose the false claim. **Recovery:** Restore the shallow copy and state its limits.

**Expected observations:** Assignment, mutation and shallow copying produce different relationships. **Evidence:** Two trace tables, predictions and feedback. **Cleanup:** Retain synthetic objects only; remove exploratory variants that are not clearly labelled.

## Common pitfalls and teaching decisions

A printed value alone does not reveal whether two names share an object. Do not teach `is` as a replacement for value equality. Use `==` for intended value comparison and discuss identity only when the relationship matters. Keep examples small enough that every step can be reasoned about.

## Retrieval and reflection


Why does appending through alias change original?

Both names refer to the same mutable list. The operation changes that object rather than assigning a new one.




Does a shallow copy isolate changes to every nested object?

No. It copies the outer container, while nested references can remain shared. Trace the inner objects separately.



## Official references

[Python data structures](https://docs.python.org/3.14/tutorial/datastructures.html) · [Python copy module and shallow/deep copying](https://docs.python.org/3.14/library/copy.html).


# Module 2 — Functions, contracts and errors

## Outcomes

Define a function contract; validate numerical boundaries; handle errors without silently changing the meaning of input.

## Explain and demonstrate

A small validation function is a good teaching unit because its behaviour can be stated precisely. The supplied `score` function converts a value to a floating-point number and accepts only values from 0 through 100 inclusive. Values outside the range and nonnumeric strings are rejected. The special value NaN also fails the bounded comparison. A missing or incompatible object can raise a type error, which a caller must handle deliberately.

Returning zero for every invalid value is tempting because it lets processing continue, but it changes the data. A learner who typed “eighty” would be recorded as scoring zero. Error handling should preserve the distinction between a legitimate zero and an invalid record. Decide whether the application stops, reports the row or collects errors; do not let a broad exception handler choose the policy accidentally.

### Worked example: boundary classes

| Input | Expected behaviour | Why it matters |
|---|---|---|
| "0" | 0.0 | Lower boundary is valid |
| "100" | 100.0 | Upper boundary is valid |
| "101" | ValueError | Above the permitted range |
| "oops" | ValueError | Cannot represent a number |
| "nan" | ValueError | Not a usable bounded score |

A contract must also state what it does not promise. This fixture accepts decimal scores and numeric strings. An institution requiring integer marks or locale-specific decimal notation would need a different documented rule. Do not claim the example implements an unknown institution’s marking policy.

## Lab — make rejection teachable

**Setup:** Use the course `lab.py` in a local folder. All data are fictional.

1. Run `python lab.py contracts`; expect `0.0 100.0`.
2. Run `python lab.py test`; six tests should pass.
3. Add cases immediately below and above the boundaries, and explain whether decimal values are permitted by this contract.
4. Write a caller that catches a validation error and records a neutral message identifying the failed field. Avoid printing confidential raw data.
5. Explain why `except Exception: return 0` is inappropriate here.
6. Design a hint ladder for a learner who rejects 100 because they used a strict upper-bound comparison.

**Fault injection:** Replace `<= 100` with `< 100` in a copy and show that the upper-bound test fails. **Recovery:** Restore the inclusive comparison and rerun the suite.

**Expected observations:** A valid zero remains distinguishable from invalid input. **Evidence:** Contract, boundary cases, failure/recovery record and feedback. **Cleanup:** Remove the mutant copy; retain the corrected function and synthetic test inputs.

## Common pitfalls and teaching decisions

Checking only one typical value misses the boundaries. Catching too broad an exception can hide programming defects. A user-friendly message should not erase the exception’s cause from authorized diagnostic evidence. Discuss which information belongs in learner-facing feedback and which belongs in a restricted technical log.

## Retrieval and reflection


Why is converting invalid input to zero a data-quality problem?

It makes an invalid record indistinguishable from a genuine zero and may alter an assessment outcome.




Does this function enforce integer-only marking?

No. It accepts decimal numeric values within the range. A different policy needs an explicit contract and tests.



## Official references

[Python errors and exceptions](https://docs.python.org/3.14/tutorial/errors.html) · [Python floating-point arithmetic](https://docs.python.org/3.14/tutorial/floatingpoint.html) · [Python built-in float](https://docs.python.org/3.14/library/functions.html#float).


# Module 3 — Files, tests and reproducibility

## Outcomes

Read CSV data with an explicit schema; distinguish file, header and row errors; create reproducible tests with automatic cleanup.

## Explain and demonstrate

File handling introduces failures outside the numerical function itself. The file may not exist; its header may lack required columns; a row may contain an invalid score. Treat these as distinct cases so feedback points to the correct next action. A missing file is not repaired by changing a score, and a missing column should be detected before processing rows.

The supplied importer uses `csv.DictReader`, requires `id` and `score` headers and reports the line of an invalid record. The file is opened with UTF-8 encoding and `newline=""`, and the context manager closes it. Tests create temporary directories rather than relying on a learner’s home folder. This avoids hidden dependencies and cleans up synthetic files even when a test fails.

### Worked example: failure classification

| Fixture | Expected result | Next diagnostic step |
|---|---|---|
| Missing path | FileNotFoundError | Verify file location |
| `name,points` header | ValueError | Compare schema with contract |
| `id,score` plus `L01,nope` | ValueError naming line 2 | Inspect the score field |
| Valid two-row file | Parsed tuples | Verify values and count |

The fixture deliberately stops on the first invalid row. A production importer might collect all row errors or reject duplicate IDs, but that is a separate requirement. Do not claim those behaviours exist until they are implemented and tested.

## Lab — verify a complete import boundary

**Setup:** Use the supplied `lab.py`; no database, account or external package is required.

1. Run `python lab.py files`. Expect `[('L01', 80.0), ('L02', 100.0)]`.
2. Run `python lab.py test` and identify the six test methods in the source.
3. Explain how the temporary directory supports isolation and cleanup.
4. Add a test for an empty ID and a test for a missing score value. Derive each expected error from the function contract.
5. Propose, but do not silently assume, a duplicate-ID policy. Write the required behaviour and a failing test before implementing it in a separate extension.
6. Create a learner handout showing the header, one data row, the expected output and a troubleshooting decision table.

**Fault injection:** Remove the required-header check from a copy. Determine which test fails and whether the resulting error is sufficiently clear. Restore the check.

**Expected observations:** Tests distinguish schema errors from row-value errors and do not leave data files behind. **Evidence:** Test output, added cases, environment version and accessible handout. **Cleanup:** Temporary fixtures are automatically removed; delete any manually created synthetic files after retaining the required evidence.

## Common pitfalls and teaching decisions

Splitting CSV lines manually on commas fails when fields contain quoted commas or other valid CSV syntax. A happy-path demo does not establish robust error handling. Avoid using actual student marks as convenient sample data. The same teaching objective can be met with fictional identifiers.

## Retrieval and reflection


Why should a missing header be detected before processing data rows?

It is a schema failure affecting interpretation of the whole file. Early validation produces a clearer diagnosis.




Do these tests prove that duplicate IDs are rejected?

No. That behaviour is not part of the baseline implementation. Add a requirement and tests if it becomes necessary.



## Official references

[Python CSV reading and writing](https://docs.python.org/3.14/library/csv.html) · [Python temporary files](https://docs.python.org/3.14/library/tempfile.html) · [Python unittest](https://docs.python.org/3.14/library/unittest.html).


# Module 4 — Python teaching capstone

## Outcomes

Integrate the course evidence into a reproducible microteaching session; apply an analytic rubric; identify a specific improvement after feedback.

## Scenario and deliverable

Teach a 20-minute lesson on a CSV score importer. Require learners to distinguish missing files, missing columns and invalid numeric values, test a boundary case and explain one aliasing bug. Submit runnable standard-library code, a test suite, an accessible trace diagram and a rubric that rewards reasoning as well as output.

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

**Critical condition:** Silently accepting invalid input, leaking real learner data or fabricating test evidence requires correction.

## Feedback, moderation and reassessment

Give feedback using an observed artifact, the relevant criterion and one concrete next action. Where two assessors disagree, compare the same evidence and record the reason for the final decision. Do not average unexplained scores to hide disagreement. A reassessment should target the missing capability with a fresh equivalent task, followed by rechecking the affected criteria. Follow the commissioning institution's approved appeals process for formal delivery.

## Retrieval and reflection


Can a polished presentation compensate for incorrect subject reasoning?

No. Subject correctness has a minimum required level and cannot be offset by attractive formatting. Correct the reasoning and verify the revised artifact.




What distinguishes a self-check from formal assessment here?

A self-check supports practice. Formal assessment requires an authorized assessor, controlled evidence handling, recorded decisions and confirmed institutional arrangements. This public course does not create those records automatically.



## Official references and next steps

Use the specific official sources in Modules 1–3 and record their versions in your portfolio. Consult [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) when reviewing your handout. [Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-PYT-201) for a supported cohort or assessment discussion; an enquiry does not grant access or award a credential.
