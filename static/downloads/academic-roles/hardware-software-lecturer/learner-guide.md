# IT Hardware and Software Lecturer Practice



Academic roles · EDU-HWS-201 · Version 1.0.0

Connect computer architecture, operating-system troubleshooting and Java data structures to measurable classroom demonstrations.



**Public pilot courseware** · **Intermediate professional development** · **Estimated effort: 10 hours** · **Four separate modules**

Read, practise and build a portfolio. Independent subject review is pending. Formal grading, certification and LMS progress tracking are not enabled by these public pages.



[Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-HWS-201) · [Download the course pack](https://www.skunkworksacademy.com/downloads/academic-roles/hardware-software-lecturer/course-pack.zip)

## Who this course serves

This course supports the **IT Hardware/Software Lecturer** role listed in the supplied job alert. The alert locations are **Mowbray**. It develops bounded professional capabilities; it does not replace a relevant degree, employment experience or the employer's selection requirements. It is independently authored Skunkworks Academy material and is not an Eduvos-endorsed or accredited qualification.

**Prerequisites:** Computer hardware and operating-system fundamentals; basic Java syntax.

**Lab environment:** Python 3.12 or later and JDK 17 or later. Optional disposable Linux VM for read-only inspection; no hardware disassembly or privileged changes.

**Delivery:** self-paced practice with an optional facilitated cohort. English text, native tables and expandable formative feedback support accessible study. No paid tools are required for the core exercises. Plan two hours for each of Modules 1–3 and four hours for the capstone, including practice and revision; actual time depends on prior knowledge.

## Your learning pathway



## Outcomes and evidence

The course uses a portfolio to make capability observable. The following evidence statements define the work you will produce, rather than promising an employment or certification outcome.

| Outcome | Evidence you will produce and explain | Where | Assessment link |
|---|---|---|---|
| LO-01 | Bottleneck calculation and bounded performance claim | Module 1 | Module lab acceptance and capstone rubric |
| LO-02 | Hypothesis-driven diagnostic record and recovery plan | Module 2 | Module lab acceptance and capstone rubric |
| LO-03 | Runnable Java search comparison and collection choice | Module 3 | Module lab acceptance and capstone rubric |
| LO-04 | A systems lesson connecting observed performance to algorithms | Module 4 | Capstone rubric |

## Course materials

- [Complete course pack: guide, workbook, facilitator notes and labs](https://www.skunkworksacademy.com/downloads/academic-roles/hardware-software-lecturer/course-pack.zip)
- [Learner workbook](https://www.skunkworksacademy.com/downloads/academic-roles/hardware-software-lecturer/learner-workbook.md)
- [Facilitator and assessor guide](https://www.skunkworksacademy.com/downloads/academic-roles/hardware-software-lecturer/facilitator-guide.md)
- [Download SearchLab.java](https://www.skunkworksacademy.com/downloads/academic-roles/hardware-software-lecturer/SearchLab.java)
- [Download lab.py](https://www.skunkworksacademy.com/downloads/academic-roles/hardware-software-lecturer/lab.py)

## How to study and retain evidence

Begin by predicting the result of each worked example. Run or complete the activity, compare the observation with the prediction, and explain one discrepancy. Use the expandable retrieval questions for practice; their answers are public and are not a secure exam bank. The workbook is a local planning aid and does not submit work or save a grade to an LMS.

Keep only synthetic or authorized data. Before formal submission, confirm the assessor, private evidence channel and retention rules. If you need help or an accessible alternative, use the Academy contact route in the shared footer or the facilitated-enrolment enquiry above. Do not include confidential evidence in the enquiry form.

## Source and maintenance record

**Role source:** a user-supplied job-alert PDF dated 1 November 2026. Its short excerpts establish the role labels and broad duties, not a complete employer competency specification. The generic IT Lecturer listing at two campuses maps to one course. The mathematics title normalizes the alert's spelling. Full job descriptions have not been assumed.

**Technical sources:** official documentation linked at the end of each module; original synthetic examples and datasets. **Owner:** Skunkworks Academy curriculum team. **Independent SME reviewer:** not yet assigned. **Next review target:** 1 February 2027, or earlier when a referenced interface or role requirement changes. **Changelog:** 1.0.0, initial pilot edition, 1 November 2026.




# Module 1 — Architecture and measurement

## Outcomes

Relate application behaviour to CPU, memory and storage; calculate a bounded speedup estimate; distinguish a modelled result from a benchmark.

## Explain and demonstrate

A computer’s performance depends on the workload and its limiting resources. More memory may reduce paging when capacity is insufficient, but it does not automatically accelerate a CPU-bound calculation. Faster storage may help an I/O-heavy task while leaving computation unchanged. Teach learners to identify the measured component before recommending a replacement.

Amdahl-style reasoning makes the limit explicit. If 40% of execution time benefits from a change that doubles that part’s speed, the new total time is 60% unchanged plus 20% improved, or 80% of the original. Overall speedup is 1 / 0.8 = 1.25, not 2. This calculation assumes the fractions describe the original workload and that other effects remain unchanged.

### Worked example: where time goes

| Portion | Original time units | After change |
|---|---|---|
| Unchanged work | 60 | 60 |
| Improved work | 40 | 20 |
| Total | 100 | 80 |

This table explains a causal model, not a measurement of the learner’s machine. A real benchmark needs workload definition, repeated observations, configuration, warm-up and a clear metric such as median latency or throughput. Avoid comparing one warm run with one cold run and calling the difference a hardware effect.

## Lab — defend a performance claim

**Setup:** Use the supplied `lab.py`; no hardware inspection, disassembly or system changes are required.

1. Calculate the table by hand, then run `python lab.py performance`. Expect `Predicted speedup: 1.25x`.
2. Repeat the calculation with an improved fraction of zero. Explain why the result is 1 regardless of the component’s speedup.
3. Calculate the limit as the improved portion becomes arbitrarily fast. With 60% unchanged work, the maximum approaches 1 / 0.6, approximately 1.67.
4. Design a measurement plan for a fictional slow application. State workload, baseline, comparison condition, repetitions and a stopping criterion.
5. Write a claim limited to the evidence: distinguish “the model predicts” from “the benchmark measured.”

**Fault injection:** Report the doubled component speed as doubled application speed. Use the time table to refute the statement and restore the bounded claim.

**Expected observations:** The unchanged portion limits the total improvement. **Evidence:** Calculations, assumptions and measurement plan. **Cleanup:** Keep the original arithmetic and label all data as synthetic.

## Common pitfalls and teaching decisions

Utilization is not the same as useful throughput. Averages can hide a slow tail. A faster algorithm can matter more than a faster component. Ask learners what observation would falsify their bottleneck hypothesis before discussing a purchase. No actual procurement recommendation is required by this exercise.

## Retrieval and reflection


Why does doubling a component yield only 1.25 times overall speed in the example?

Only 40% of the original time benefits. The unchanged 60% still takes the same time.




Can this calculation prove a specific computer upgrade will help?

No. The workload fraction and assumptions must be established with appropriate measurements. The calculation is a conditional prediction.



## Official references

[Linux kernel performance and administration documentation](https://www.kernel.org/doc/html/latest/admin-guide/) · [Python performance counter documentation](https://docs.python.org/3.14/library/time.html#time.perf_counter). The arithmetic fixture is original and performs no hardware benchmark.


# Module 2 — Operating-system diagnosis

## Outcomes

Separate symptoms from causes; choose a low-risk diagnostic action; document a reversible correction and verification criteria.

## Explain and demonstrate

Operating-system troubleshooting benefits from a sequence of bounded questions. Is the symptom reproducible? Which resource or process correlates with it? What changed? What alternative explanation fits the same evidence? Start with read-only observations and a baseline. Do not begin by deleting files, changing permissions broadly or disabling controls.

The synthetic fixture reports CPU utilization 25%, free memory 4 GiB, I/O wait 35% and request p95 latency 800 ms. A second fictional observation after correcting an I/O fixture reports I/O wait 5% and p95 200 ms. This is constructed evidence for discussion. It does not prove that every application with low CPU and high latency has a storage problem, and it is not telemetry from the machine running the script.

### Worked example: diagnostic choices

| Hypothesis | Useful observation | Unsafe shortcut to avoid |
|---|---|---|
| CPU bottleneck | Process CPU and workload behaviour | Killing unfamiliar processes |
| Memory pressure | Working set, paging and capacity trends | Deleting system caches blindly |
| I/O delay | I/O latency, queueing and correlated requests | Formatting or resetting storage |
| Permission issue | Exact error and intended access | Granting everyone full control |

A reversible change has a recorded starting state and a defined way back. Verification checks both the original symptom and unintended effects. If a permission correction restores one task while exposing unrelated files, it is not a successful repair.

## Lab — produce a troubleshooting record

**Setup:** Run `python lab.py diagnose`. Use the synthetic output only. Optional read-only inspection in a disposable Linux VM must be clearly separated from this fixture and requires authorization for that VM.

1. Record the two fixture observations with their simulated provenance.
2. Write three hypotheses and identify what additional evidence would distinguish them.
3. Choose one minimal next diagnostic action and explain why it is safer or more informative than a configuration change.
4. Draft a change record containing scope, expected effect, baseline, rollback trigger and verification.
5. Add an alternative explanation: the workload changed between observations. Explain what control or measurement would be needed to rule it out.
6. Prepare a learner prompt that rewards justified uncertainty rather than guessing a component.

**Fault injection:** Remove the baseline and declare the lower latency a proven improvement. Identify the missing comparison evidence, then restore the baseline and assumptions.

**Expected observations:** A plausible diagnosis remains a hypothesis until the relevant evidence supports it. **Evidence:** Hypothesis table, next action and change/rollback record. **Cleanup:** No services or configuration were changed; retain only the simulated record.

## Common pitfalls and teaching decisions

Do not confuse free memory with all reusable memory or interpret one utilization percentage in isolation. Real diagnostic tools vary by operating system and version. Require learners to record the exact tool and environment when doing an authorized extension. Do not teach commands that can damage a host as a routine recovery shortcut.

## Retrieval and reflection


Why is a lower latency value after a change not sufficient proof of causation?

The workload or other conditions may also have changed. Compare controlled conditions and preserve the baseline.




What makes a correction reversible?

A known starting state, a specific rollback action and a trigger for using it, followed by verification that the rollback restored the intended condition.



## Official references

[Linux kernel administrator’s guide](https://www.kernel.org/doc/html/latest/admin-guide/) · [Microsoft Windows performance analysis guidance](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/). This module teaches a diagnostic method, not a claim of certification in either operating system.


# Module 3 — Java data structures and algorithms

## Outcomes

Run a Java comparison fixture; explain binary search prerequisites; justify a collection choice using access patterns and evidence.

## Explain and demonstrate

An algorithm’s behaviour depends on its data representation. Linear search examines items in sequence until it finds the target or reaches the end. Binary search repeatedly halves a sorted search interval. It requires the ordering to match the comparison rule. Efficient index access also matters: repeatedly retrieving middle positions from a linked structure can change the practical cost.

The supplied Java fixture stores integers 0 through 15 in an `ArrayList`. Searching for 15 takes 16 comparisons in the linear implementation and 5 in the binary implementation. These are exact counts for this input and these implementations. They are not elapsed times, nor proof that binary search always wins for every workload. Sorting, updates, memory and small-input overhead may change the design choice.

### Worked example: choose by operation

| Requirement | Candidate | Question to ask |
|---|---|---|
| Indexed ordered values | ArrayList | How often is the list resized or modified? |
| Membership without duplicates | HashSet | Are values hashable with stable equality semantics? |
| Key-to-value lookup | HashMap | Are keys unique and correctly compared? |
| Sorted search | Sorted random-access list | Who maintains ordering after updates? |

A collection’s name is not a justification. A learner should identify the operations the application performs and the constraints that matter. Keep the teaching fixture small enough to trace by hand before discussing larger input sizes.

## Lab — reproduce and explain Java search

**Setup:** Download `SearchLab.java`. Use JDK 17 or later; confirm `java -version` and `javac -version`. A JRE without the compiler is insufficient. Work in a new folder.

1. Compile with `javac SearchLab.java` and run `java SearchLab`.
2. Expect `linear=16; binary=5`, followed by a reminder that comparisons are not elapsed time.
3. Trace the binary-search middle indices for target 15: 7, 11, 13, 14 and 15.
4. Change the target to 0 in a copy and predict both counts before execution. Update the fixture’s expected-count assertion to match your derived oracle.
5. Shuffle the data deliberately. Explain why binary search’s ordering precondition no longer holds; do not generalize a coincidental successful result.
6. Propose a collection for frequent unique-ID membership checks and justify the tradeoff.

**Expected observations:** For target 0, linear search uses one comparison and this binary implementation uses four. **Recovery:** Restore sorted input and the original assertion. **Evidence:** Version output, run result, index trace and collection decision. **Cleanup:** Delete generated `SearchLab.class` when finished; retain the source and evidence.

## Common pitfalls and teaching decisions

Changing the test’s expected answer merely to match a defect invalidates the test. Derive the answer independently. Explain primitive comparison versus object equality when extending the example. Do not advertise comparison counts as a benchmark of Java or a particular computer.

## Retrieval and reflection


Why can binary search fail on unsorted data even when the code compiles?

Compilation does not establish the algorithm’s ordering precondition. Its interval decisions rely on sorted values.




Why might linear search be appropriate for a tiny or frequently changing list?

Maintaining sorted order and other overheads may outweigh fewer search comparisons. Evaluate the complete workload.



## Official references

[Java Collections Framework overview](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html) · [Java ArrayList](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayList.html) · [Java Collections binarySearch](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Collections.html#binarySearch(java.util.List,T)).


# Module 4 — Hardware and software teaching capstone

## Outcomes

Integrate the course evidence into a reproducible microteaching session; apply an analytic rubric; identify a specific improvement after feedback.

## Scenario and deliverable

Teach a 20-minute lesson explaining why an application is slow. Compare a memory-capacity hypothesis with algorithmic operation counts, demonstrate Java linear and binary search on a sorted dataset, and ask learners to justify a collection choice. Supply the source, expected results, a troubleshooting decision tree and a moderated rubric.

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

**Critical condition:** Destructive operating-system commands, unsafe electrical work or unqualified performance claims require remediation.

## Feedback, moderation and reassessment

Give feedback using an observed artifact, the relevant criterion and one concrete next action. Where two assessors disagree, compare the same evidence and record the reason for the final decision. Do not average unexplained scores to hide disagreement. A reassessment should target the missing capability with a fresh equivalent task, followed by rechecking the affected criteria. Follow the commissioning institution's approved appeals process for formal delivery.

## Retrieval and reflection


Can a polished presentation compensate for incorrect subject reasoning?

No. Subject correctness has a minimum required level and cannot be offset by attractive formatting. Correct the reasoning and verify the revised artifact.




What distinguishes a self-check from formal assessment here?

A self-check supports practice. Formal assessment requires an authorized assessor, controlled evidence handling, recorded decisions and confirmed institutional arrangements. This public course does not create those records automatically.



## Official references and next steps

Use the specific official sources in Modules 1–3 and record their versions in your portfolio. Consult [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) when reviewing your handout. [Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-HWS-201) for a supported cohort or assessment discussion; an enquiry does not grant access or award a credential.
