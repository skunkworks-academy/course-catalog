# Software Engineering Lecturer Practice



Academic roles · EDU-SWE-201 · Version 1.0.0

Teach requirements, testable software design and digital image processing through a reproducible classroom project.



**Public pilot courseware** · **Intermediate professional development** · **Estimated effort: 10 hours** · **Four separate modules**

Read, practise and build a portfolio. Independent subject review is pending. Formal grading, certification and LMS progress tracking are not enabled by these public pages.



[Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-SWE-201) · [Download the course pack](https://www.skunkworksacademy.com/downloads/academic-roles/software-engineering-lecturer/course-pack.zip)

## Who this course serves

This course supports the **IT Lecturer (Software Engineering)** role listed in the supplied job alert. The alert locations are **Midrand**. It develops bounded professional capabilities; it does not replace a relevant degree, employment experience or the employer's selection requirements. It is independently authored Skunkworks Academy material and is not an Eduvos-endorsed or accredited qualification.

**Prerequisites:** A relevant computing qualification or equivalent software-development experience; basic Python and Git.

**Lab environment:** Python 3.12 or later, Git, a text editor; no third-party Python packages required. OpenCV 4.13 documentation is an extension reading.

**Delivery:** self-paced practice with an optional facilitated cohort. English text, native tables and expandable formative feedback support accessible study. No paid tools are required for the core exercises. Plan two hours for each of Modules 1–3 and four hours for the capstone, including practice and revision; actual time depends on prior knowledge.

## Your learning pathway



## Outcomes and evidence

The course uses a portfolio to make capability observable. The following evidence statements define the work you will produce, rather than promising an employment or certification outcome.

| Outcome | Evidence you will produce and explain | Where | Assessment link |
|---|---|---|---|
| LO-01 | Boundary-test table and corrected booking function | Module 1 | Module lab acceptance and capstone rubric |
| LO-02 | Design decision record and operation-count comparison | Module 2 | Module lab acceptance and capstone rubric |
| LO-03 | Reproducible image-filter worksheet with border policy | Module 3 | Module lab acceptance and capstone rubric |
| LO-04 | A 20-minute image-processing lesson, test suite and moderated marking guide | Module 4 | Capstone rubric |

## Course materials

- [Complete course pack: guide, workbook, facilitator notes and labs](https://www.skunkworksacademy.com/downloads/academic-roles/software-engineering-lecturer/course-pack.zip)
- [Learner workbook](https://www.skunkworksacademy.com/downloads/academic-roles/software-engineering-lecturer/learner-workbook.md)
- [Facilitator and assessor guide](https://www.skunkworksacademy.com/downloads/academic-roles/software-engineering-lecturer/facilitator-guide.md)
- [Download lab.py](https://www.skunkworksacademy.com/downloads/academic-roles/software-engineering-lecturer/lab.py)

## How to study and retain evidence

Begin by predicting the result of each worked example. Run or complete the activity, compare the observation with the prediction, and explain one discrepancy. Use the expandable retrieval questions for practice; their answers are public and are not a secure exam bank. The workbook is a local planning aid and does not submit work or save a grade to an LMS.

Keep only synthetic or authorized data. Before formal submission, confirm the assessor, private evidence channel and retention rules. If you need help or an accessible alternative, use the Academy contact route in the shared footer or the facilitated-enrolment enquiry above. Do not include confidential evidence in the enquiry form.

## Source and maintenance record

**Role source:** a user-supplied job-alert PDF dated 1 November 2026. Its short excerpts establish the role labels and broad duties, not a complete employer competency specification. The generic IT Lecturer listing at two campuses maps to one course. The mathematics title normalizes the alert's spelling. Full job descriptions have not been assumed.

**Technical sources:** official documentation linked at the end of each module; original synthetic examples and datasets. **Owner:** Skunkworks Academy curriculum team. **Independent SME reviewer:** not yet assigned. **Next review target:** 1 February 2027, or earlier when a referenced interface or role requirement changes. **Changelog:** 1.0.0, initial pilot edition, 1 November 2026.




# Module 1 — Requirements and testable contracts

## Outcomes

Translate a prose requirement into a contract; distinguish rejected input from a legitimate negative result; produce tests that expose an off-by-one error.

## Explain and demonstrate

A requirement describes observable behaviour, while an implementation explains how to obtain it. For a fictional lab-booking service, “prevent overbooking” is too vague to assess. Specify that capacity and enrolment are non-negative integer counts, enrolment cannot already exceed capacity, and a booking requests at least one seat. An exact fill is valid. A request exceeding available seats returns `False`; an impossible starting state raises an error. This distinction makes a failed booking different from corrupt data.

A useful teaching sequence starts with examples before code. Ask learners to predict the decision for capacity 10, enrolled 8 and requested 2. Then change only the requested count to 3. Keeping the other variables fixed isolates the boundary. Finally introduce `True` as the requested count: Python treats booleans as integers in some contexts, so this example deliberately checks exact integer types. Explain the policy choice rather than presenting it as a universal rule.

### Worked example: a test oracle

| Capacity | Enrolled | Requested | Expected decision | Reason |
|---|---|---|---|---|
| 10 | 8 | 2 | Accept | Exactly fills the class |
| 10 | 8 | 3 | Decline | Exceeds available places |
| 10 | 8 | 0 | Input error | No booking was requested |
| 10 | 11 | 1 | Input error | Starting state violates the contract |

The table is an oracle: the expected answer comes from the requirement, not from whatever the current program prints. A green test suite is persuasive only when its cases can detect plausible defects. Replacing `<=` with `<` should break the exact-capacity test. If it does not, the suite misses the key boundary.

## Lab — turn a requirement into evidence

**Setup:** Download `lab.py` from the course overview into a new folder. Use synthetic counts only. Record `python --version`; use `python3` if that is your interpreter command.

1. Run `python lab.py contracts`. Expected output: `True False`.
2. Run `python lab.py test`. Seven automated checks should pass; execution time may vary.
3. In a copy of the file, change the final comparison in `reserve` from `<=` to `<`. Run the tests again and identify the failed assertion.
4. Restore the original comparison. Add a test for capacity 0, enrolled 0 and requested 1. Justify the expected result from the contract.
5. Write a three-sentence feedback note for a learner who only tested a class with spare capacity. Name the missing boundary, provide a hint and ask them to explain their repaired test.

**Expected observations:** The mutant incorrectly refuses the exact fill. The zero-capacity request is a valid request that cannot be fulfilled, so the result is `False`.

**Evidence:** Save the input table, the failing assertion, the repaired test output and the feedback note. **Cleanup:** Keep the original and repaired files labelled; remove the deliberately faulty copy after comparison.

## Common pitfalls and teaching decisions

Testing only normal inputs rewards a plausible implementation without checking the contract. Catching every exception and returning `False` hides data defects. Publishing actual enrolment records adds no learning value: fictional counts are sufficient. For a learner needing a non-coding route, use the table to explain the boundary before moving to executable assertions.

## Retrieval and reflection


Why should the expected result be written before running the implementation?

It reduces the chance of treating a defect as correct behaviour. Derive the oracle from the requirement, then compare the program with it. Revisit the input table if the distinction is unclear.




Does seven passing tests prove the booking function is correct for every input?

No. Tests establish the checked cases. Explain the input domain and remaining assumptions, and add cases for credible failure modes.



## Official references

[Python unittest: fixtures and assertions](https://docs.python.org/3.14/library/unittest.html) · [Python built-in types](https://docs.python.org/3.14/library/stdtypes.html). Reference baseline checked 1 November 2026; the executable example uses Python 3.12-compatible syntax.


# Module 2 — Design boundaries and algorithm evidence

## Outcomes

Separate policy from presentation; compare two deduplication strategies using an explicit workload; teach the difference between operation counts and elapsed time.

## Explain and demonstrate

A small program can teach architecture without requiring a distributed system. Keep booking policy in a function, input conversion at the boundary and printing in the command-line interface. The function should not read from a keyboard or depend on a web request. This separation allows the same policy to be tested directly and reused in a later interface.

Consider deduplicating a list of submission identifiers while preserving the first occurrence. A novice solution scans the results already collected before adding each new value. It is easy to trace, but on a list of distinct values the comparisons grow as 0 + 1 + … + (n − 1). A set can support membership checks more efficiently on average, while a separate output list preserves order. The tradeoff includes additional memory and a requirement for hashable values. “Use a set” is therefore an incomplete explanation.

### Worked example: an architecture decision record

| Concern | List scan | Set plus output list |
|---|---|---|
| First-occurrence order | Preserved | Preserved by the output list |
| Distinct-value membership work | Quadratic comparisons | Expected near-linear total membership work |
| Values | Equality-comparable objects | Hashable objects |
| Teaching purpose | Exposes the repeated scan | Exposes a time/memory tradeoff |

For four distinct items, the scan makes 6 comparisons. For eight, it makes 28. Doubling the input did not merely double the count. This is evidence about this algorithm and this workload. It is not a benchmark of a particular computer, and it does not establish the time taken by Python’s built-in operations.

## Lab — explain a design tradeoff

**Setup:** Use the supplied offline `lab.py` and a text editor. Work in a new folder; no service or database is required.

1. Run `python lab.py design`. Expect `n=4; comparisons=6` and `n=8; comparisons=28`.
2. Trace `unique_scan([1, 2, 1])` by hand. Record the result list after each iteration and the number of equality checks.
3. Add a function using a `seen` set and a result list. Compare its returned values with the original on empty, duplicate and distinct inputs.
4. Explain why a list containing nested lists needs a different policy: nested lists are not hashable. Do not silently stringify arbitrary objects to make the error disappear.
5. Write a short decision record with context, chosen option, rejected option and a trigger for revisiting the choice.

**Expected observations:** `[1, 2, 1]` produces `[1, 2]` with two comparisons. Both designs should preserve output order for supported inputs. **Fault injection:** Remove the membership check from the new function; show that the duplicate test detects the problem. Restore it before submission.

**Evidence:** Keep the trace table, test cases and decision record. **Cleanup:** Remove the defective variant; retain the working code and environment version.

## Common pitfalls and teaching decisions

A stopwatch measurement on one small input is noisy and does not prove asymptotic complexity. Counting only successful matches misses unsuccessful comparisons. Mixing UI and policy makes a unit test unnecessarily depend on keyboard input. Ask learners to make a prediction first, observe evidence second and revise their explanation third.

## Retrieval and reflection


Why can a faster membership structure still be the wrong choice?

It may require unsupported value types, extra memory or different semantics. State the constraints before choosing a structure.




What evidence would show that the refactor preserved behaviour?

The same contract-based cases should produce the same ordered results, including empty and duplicate inputs. Operation counts alone do not establish correctness.



## Official references

[Python data structures](https://docs.python.org/3.14/tutorial/datastructures.html) · [Git tutorial for versioned changes](https://git-scm.com/docs/gittutorial). Examples and comparison counts are original Academy fixtures, not vendor benchmark results.


# Module 3 — Digital image processing

## Outcomes

Represent a grayscale image as a matrix; calculate a local mean filter; distinguish border handling, numerical precision and visual interpretation.

## Explain and demonstrate

A grayscale image can be modelled as a grid of intensity values. Filtering replaces each output position with a calculation over a neighbourhood. A 3 by 3 mean filter assigns equal weight to nine values. The weights sum to one, so a constant patch retains its value away from borders. A single bright impulse is spread across neighbouring outputs, illustrating the tradeoff between noise reduction and lost detail.

Before demonstrating a library call, declare the border policy. This lab uses only valid 3 by 3 windows: a 5 by 5 input produces a 3 by 3 output. It does not pad the input. Another implementation might pad with zeros or reflect the edge and retain the original dimensions. Different results near an edge can therefore be legitimate policy differences rather than defects.

### Worked example: an impulse image

| Row | Five input intensities |
|---|---|
| 1 | 0, 0, 0, 0, 0 |
| 2 | 0, 0, 0, 0, 0 |
| 3 | 0, 0, 90, 0, 0 |
| 4 | 0, 0, 0, 0, 0 |
| 5 | 0, 0, 0, 0, 0 |

Every valid 3 by 3 window in this particular image contains the central 90. Its mean is 90 / 9 = 10. The result is a 3 by 3 grid of 10. This pattern depends on both the input size and the position of the impulse; it is not a general property of image blurring.

Keeping floating-point values avoids silently discarding fractions. Casting to integer is a separate decision that needs a stated rounding rule. OpenCV’s filtering interface offers more options, but the matrix calculation remains the conceptual oracle. This course does not require OpenCV installation.

## Lab — build a numerical image explanation

**Setup:** Use the supplied `lab.py`; the image is generated in memory and contains no personal or copyrighted material.

1. Before execution, draw the nine valid windows and predict their means.
2. Run `python lab.py image`. Expect three rows of `[10.0, 10.0, 10.0]`.
3. Change the central impulse from 90 to 45 in a working copy. Predict and check a grid of 5.
4. Move the impulse to the top-left corner. Identify which valid window includes it; the top-left output is 10 and the other outputs are zero when the impulse is 90.
5. Write a separate test for output dimensions and a test for numerical values. Explain why a single screenshot cannot replace either check.
6. Prepare a handout with the input matrix, one highlighted window, the arithmetic and a text explanation suitable for someone who cannot see colour highlights.

**Fault injection:** Change division by 9 to division by 8 and use the constant or impulse test to identify the incorrect normalization. Restore division by 9.

**Evidence:** Submit predictions, actual matrices, tests and the accessible handout. **Cleanup:** Retain only synthetic fixtures and your corrected source; no installed dependency needs removal.

## Common pitfalls and teaching decisions

Do not confuse image coordinates with Cartesian axes: array rows normally increase down the displayed image. Avoid claiming all smoothing preserves edges. A filter is not automatically an improvement; its suitability depends on the task. Ask learners what information the filter removes and when that would be harmful.

## Retrieval and reflection


Why is the output smaller than the input?

Only full 3 by 3 windows are evaluated, with no padding. Each dimension loses two positions. Revisit the border policy before comparing library outputs.




Would all outputs remain 10 after moving the bright pixel to a corner?

No. Only the valid window containing that corner receives its contribution. Trace window membership before calculating the mean.



## Official references

[OpenCV 4.13 smoothing and filtering](https://docs.opencv.org/4.13.0/d4/d13/tutorial_py_filtering.html) · [Python list comprehensions](https://docs.python.org/3.14/tutorial/datastructures.html#list-comprehensions). The fixture is an original scalar demonstration, not an OpenCV screenshot or performance claim.


# Module 4 — Software engineering teaching capstone

## Outcomes

Integrate the course evidence into a reproducible microteaching session; apply an analytic rubric; identify a specific improvement after feedback.

## Scenario and deliverable

Design and teach a 20-minute lesson that takes a 5 by 5 grayscale image through a documented filter. Learners must predict the centre value, run the implementation and diagnose a deliberate border-policy defect. Submit a requirements-to-test matrix, an accessible learner handout and a five-case test suite.

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

**Critical condition:** Unlicensed source images, private learner data or untested numerical claims require correction before assessment.

## Feedback, moderation and reassessment

Give feedback using an observed artifact, the relevant criterion and one concrete next action. Where two assessors disagree, compare the same evidence and record the reason for the final decision. Do not average unexplained scores to hide disagreement. A reassessment should target the missing capability with a fresh equivalent task, followed by rechecking the affected criteria. Follow the commissioning institution's approved appeals process for formal delivery.

## Retrieval and reflection


Can a polished presentation compensate for incorrect subject reasoning?

No. Subject correctness has a minimum required level and cannot be offset by attractive formatting. Correct the reasoning and verify the revised artifact.




What distinguishes a self-check from formal assessment here?

A self-check supports practice. Formal assessment requires an authorized assessor, controlled evidence handling, recorded decisions and confirmed institutional arrangements. This public course does not create those records automatically.



## Official references and next steps

Use the specific official sources in Modules 1–3 and record their versions in your portfolio. Consult [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) when reviewing your handout. [Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-SWE-201) for a supported cohort or assessment discussion; an enquiry does not grant access or award a credential.
