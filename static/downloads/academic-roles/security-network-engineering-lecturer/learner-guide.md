# Security and Network Engineering Lecturer Practice



Academic roles · EDU-NET-201 · Version 1.0.0

Teach subnet planning, access decisions and evidence-led incident diagnosis in isolated fictional networks.



**Public pilot courseware** · **Intermediate professional development** · **Estimated effort: 10 hours** · **Four separate modules**

Read, practise and build a portfolio. Independent subject review is pending. Formal grading, certification and LMS progress tracking are not enabled by these public pages.



[Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-NET-201) · [Download the course pack](https://www.skunkworksacademy.com/downloads/academic-roles/security-network-engineering-lecturer/course-pack.zip)

## Who this course serves

This course supports the **Security and Network Engineering Lecturer** role listed in the supplied job alert. The alert locations are **Mowbray**. It develops bounded professional capabilities; it does not replace a relevant degree, employment experience or the employer's selection requirements. It is independently authored Skunkworks Academy material and is not an Eduvos-endorsed or accredited qualification.

**Prerequisites:** TCP/IP fundamentals, subnetting and basic security concepts; the job alert mentions a relevant MSc requirement, which this course does not replace.

**Lab environment:** Python 3.12 or later with its standard library; supplied synthetic logs. No scanning, packet capture or changes to production networks are required.

**Delivery:** self-paced practice with an optional facilitated cohort. English text, native tables and expandable formative feedback support accessible study. No paid tools are required for the core exercises. Plan two hours for each of Modules 1–3 and four hours for the capstone, including practice and revision; actual time depends on prior knowledge.

## Your learning pathway



## Outcomes and evidence

The course uses a portfolio to make capability observable. The following evidence statements define the work you will produce, rather than promising an employment or certification outcome.

| Outcome | Evidence you will produce and explain | Where | Assessment link |
|---|---|---|---|
| LO-01 | Non-overlapping subnet plan and access matrix | Module 1 | Module lab acceptance and capstone rubric |
| LO-02 | Allow/deny cases with authentication and authorization reasoning | Module 2 | Module lab acceptance and capstone rubric |
| LO-03 | Timeline, competing hypotheses and verification plan | Module 3 | Module lab acceptance and capstone rubric |
| LO-04 | A segmented-network teaching scenario and incident assessment | Module 4 | Capstone rubric |

## Course materials

- [Complete course pack: guide, workbook, facilitator notes and labs](https://www.skunkworksacademy.com/downloads/academic-roles/security-network-engineering-lecturer/course-pack.zip)
- [Learner workbook](https://www.skunkworksacademy.com/downloads/academic-roles/security-network-engineering-lecturer/learner-workbook.md)
- [Facilitator and assessor guide](https://www.skunkworksacademy.com/downloads/academic-roles/security-network-engineering-lecturer/facilitator-guide.md)
- [Download lab.py](https://www.skunkworksacademy.com/downloads/academic-roles/security-network-engineering-lecturer/lab.py)

## How to study and retain evidence

Begin by predicting the result of each worked example. Run or complete the activity, compare the observation with the prediction, and explain one discrepancy. Use the expandable retrieval questions for practice; their answers are public and are not a secure exam bank. The workbook is a local planning aid and does not submit work or save a grade to an LMS.

Keep only synthetic or authorized data. Before formal submission, confirm the assessor, private evidence channel and retention rules. If you need help or an accessible alternative, use the Academy contact route in the shared footer or the facilitated-enrolment enquiry above. Do not include confidential evidence in the enquiry form.

## Source and maintenance record

**Role source:** a user-supplied job-alert PDF dated 1 November 2026. Its short excerpts establish the role labels and broad duties, not a complete employer competency specification. The generic IT Lecturer listing at two campuses maps to one course. The mathematics title normalizes the alert's spelling. Full job descriptions have not been assumed.

**Technical sources:** official documentation linked at the end of each module; original synthetic examples and datasets. **Owner:** Skunkworks Academy curriculum team. **Independent SME reviewer:** not yet assigned. **Next review target:** 1 February 2027, or earlier when a referenced interface or role requirement changes. **Changelog:** 1.0.0, initial pilot edition, 1 November 2026.




# Module 1 — Subnetting and segmentation

## Outcomes

Partition an IPv4 address block; verify non-overlap and usable-host ranges; distinguish address separation from enforced access policy.

## Explain and demonstrate

An IPv4 prefix identifies the network portion of an address. Splitting 10.20.0.0/24 into /26 networks borrows two additional prefix bits, producing four equal blocks of 64 addresses. For these conventional /26 subnets, the network and broadcast addresses leave 62 host addresses. Do not generalize that subtraction rule to every prefix type; point-to-point /31 addressing is a separate case.

Address planning and segmentation are related but different. Assigning different subnets does not itself prevent routed communication. An enforcement point needs rules governing traffic between zones. A teaching design should therefore include both an address table and an access matrix, with source, destination, service and decision stated explicitly.

### Worked example: four classroom zones

| Zone | Prefix | First host | Last host |
|---|---|---|---|
| Learner lab | 10.20.0.0/26 | 10.20.0.1 | 10.20.0.62 |
| Teaching service | 10.20.0.64/26 | 10.20.0.65 | 10.20.0.126 |
| Administration | 10.20.0.128/26 | 10.20.0.129 | 10.20.0.190 |
| Reserved lab | 10.20.0.192/26 | 10.20.0.193 | 10.20.0.254 |

An example policy permits the learner lab to reach a teaching web service on TCP 443 while denying access to the administration zone. This is a fictional design, not a firewall configuration to apply to a real campus. Private addressing also does not imply encryption or trusted identity.

## Lab — validate a segmentation plan offline

**Setup:** Use the supplied `lab.py` and Python’s standard-library `ipaddress` module. The exercise sends no packets and modifies no interfaces.

1. Calculate the four ranges by hand, then run `python lab.py subnets`.
2. Confirm each row reports 62 hosts and that no prefixes overlap.
3. Assign 50 fictional learners to the first subnet and explain how gateway and infrastructure addresses affect remaining capacity.
4. Build a three-row policy matrix: learner-to-teaching HTTPS, learner-to-administration, and administration-to-teaching management. State assumptions and approval requirements.
5. Add an overlapping range to a copy of the plan and use `overlaps` to demonstrate the defect.

**Expected observations:** Correct arithmetic does not establish that traffic is blocked; enforcement must be separately tested in an authorized lab. **Fault injection:** Allocate the same /26 to two zones and identify the collision. **Recovery:** Restore the unique allocation before writing the final matrix.

**Evidence:** Address plan, overlap check, capacity reasoning and access matrix. **Cleanup:** Delete the faulty plan; no infrastructure teardown is required.

## Common pitfalls and teaching decisions

A diagram with separate boxes may imply isolation that the configuration does not enforce. Ask learners to name the enforcement point and the allowed flow. Avoid introducing public targets or real organizational ranges; documentation and private fixture addresses are sufficient. Explain that the subnet lab assesses planning, not live firewall operation.

## Retrieval and reflection


Does putting learners and administrators in different subnets prove isolation?

No. Routing and enforcement policy determine allowed traffic. Verify both positive and negative access cases in an authorized environment.




Why can a 62-host subnet still be too small for 62 learners?

Gateway and other infrastructure interfaces may consume usable addresses. Include those requirements and growth assumptions.



## Official references

[RFC 1918 private address space](https://www.rfc-editor.org/rfc/rfc1918) · [Python ipaddress](https://docs.python.org/3.14/library/ipaddress.html) · [RFC 3021 point-to-point /31 use](https://www.rfc-editor.org/rfc/rfc3021).


# Module 2 — Identity, policy and protocol boundaries

## Outcomes

Separate authentication, device evidence and authorization; construct an explicit allow rule; explain the different assurances provided by network reachability and TLS.

## Explain and demonstrate

A successful connection does not establish permission to perform every action. Authentication establishes a claimed identity under a chosen mechanism; authorization decides whether that identity may perform a specific action on a resource. Device compliance is another input, not a substitute for either. The offline fixture allows a learner to read a lab only when identity is authenticated, the device is compliant, the role is learner and the action is `read-lab`.

This is a deliberately narrow policy model. A real implementation also needs trustworthy evidence sources, session handling, resource scope, expiry and server-side enforcement. A browser flag that says “allowed” cannot supply those properties. Zero-trust reasoning asks for explicit decisions using relevant evidence rather than trusting a request because it originated on an internal network.

### Worked example: distinct layers of evidence

| Observation | Supports | Does not establish |
|---|---|---|
| DNS answer | Name resolution returned data | Service identity or authorization |
| TCP connection | Transport endpoint was reachable | Application permission |
| Verified TLS identity | Peer identity under certificate validation | User entitlement to a resource |
| HTTP 403 response | Application or intermediary refused the request | Exact policy cause without more evidence |

Avoid diagnosing solely from one status code. A proxy can generate a response, and a system may deliberately conceal some details. Combine client observations with authorized service logs and a request identifier when available.

## Lab — test least-privilege decisions

**Setup:** Run only the supplied Boolean policy simulation. No credentials, accounts or external services are used.

1. Run `python lab.py policy`. Expect `read-lab: True` and `change-grades: False`.
2. Create a decision table varying one input at a time: unauthenticated, noncompliant device, different role and different action.
3. Add a resource identifier to a proposed policy. Explain why permission for one course should not automatically grant another.
4. Write two negative tests and one allowed test. Include a case where the user is authenticated but lacks the action permission.
5. Draft a short explanation for a learner who says “TLS succeeded, so the application must allow access.”

**Fault injection:** Replace the complete decision with `return authenticated` in a copy. Show that the change-grades case now passes incorrectly. **Recovery:** Restore the narrow rule and rerun `python lab.py test`.

**Expected observations:** Authentication is necessary for this policy but insufficient by itself. **Evidence:** Decision table, tests and layer explanation. **Cleanup:** Remove the broad-rule copy; retain no tokens or real identity records.

## Common pitfalls and teaching decisions

Do not call the fixture a production access-control service. A role name is meaningful only when assigned through a trusted process. Changing a UI control does not enforce a server decision. Require learners to distinguish the design of a policy from proof that a deployed service enforces it.

## Retrieval and reflection


Why should an authenticated learner still be denied permission to change grades?

The permitted action is read-lab. Authentication does not grant unrelated privileges.




What further evidence is needed to explain a 403?

Authorized application or gateway evidence identifying the resource and policy decision, correlated with the request. The code alone does not identify the cause.



## Official references

[NIST SP 800-207 Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final) · [RFC 9110 HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110) · [RFC 8446 TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446).


# Module 3 — Evidence-led network diagnosis

## Outcomes

Construct an evidence timeline; compare competing failure hypotheses; propose a minimal correction with a verification and rollback plan.

## Explain and demonstrate

Troubleshooting starts with a bounded symptom and preserves the distinction between observation and inference. “The network is broken” is too broad. “At 09:00 a fictional learner resolved the service name, established a connection and received a 403 for a lab resource” is more useful. It narrows the likely layer without proving a root cause.

A hypothesis should make a testable prediction. If name resolution were failing, a successful DNS answer would be unexpected. If the role assignment were missing, a policy denial naming that requirement would support the hypothesis. Correlation still matters: logs from another request or an earlier session can mislead. Record timestamps, time zones and identifiers, and avoid silently joining unrelated observations.

### Worked example: competing hypotheses

| Hypothesis | Predicted evidence | Fixture observation | Decision |
|---|---|---|---|
| DNS failure | No usable name answer | Answer present | Weakened for this request |
| Transport failure | Connection cannot complete | Connection established | Weakened for this request |
| Missing course role | Authorization denial | Synthetic policy reason matches | Supported within the fixture |

The final column is scoped to the fixture. It is not proof about a real campus service. A proposed fix should target the missing course entitlement through an authorized process, not open all firewall rules or grant broad administrator access.

## Lab — write a defensible incident explanation

**Setup:** Run `python lab.py logs`. Every line is explicitly labelled SIMULATED. The documentation address 192.0.2.10 is not a test target.

1. Copy the three synthetic lines into a timeline and label each as observation.
2. Add the three hypotheses above and explain which evidence supports or weakens each.
3. Propose the minimum authorized policy correction. State who may approve it and what evidence they must inspect, using organizational roles rather than invented people.
4. Define positive verification: the intended learner can read the intended lab. Define negative verification: the learner still cannot change grades or read an unrelated course.
5. Define rollback: revert the specific entitlement change if scope is wrong or an unauthorized case becomes allowed. Preserve the audit record.
6. Prepare a two-minute explanation that distinguishes symptom, cause hypothesis, correction and verification.

**Fault injection:** Insert a log line from a different request and identify why it must not be used as causal evidence. **Recovery:** Separate it from the correlated timeline.

**Expected observations:** The narrow correction preserves least privilege. **Evidence:** Timeline, hypothesis table, change proposal and paired positive/negative checks. **Cleanup:** Keep only synthetic logs; do not attach live credentials, tokens or packet captures.

## Common pitfalls and teaching decisions

The first plausible cause is not necessarily the root cause. Rebooting or widening access can erase evidence and add risk. In a classroom, give learners a counterexample where the same status code has a different cause so they learn to reason from evidence. Do not ask them to scan third-party systems to make the exercise feel realistic.

## Retrieval and reflection


Why is an allowed-path test insufficient after changing a role assignment?

The change may also grant unintended access. Negative tests verify that the denied boundaries remain intact.




When does a timeline become misleading?

When events from different requests, time zones or systems are combined without a justified correlation. Preserve identifiers and uncertainty.



## Official references

[NIST SP 800-61 Revision 3 incident response guidance](https://csrc.nist.gov/pubs/sp/800/61/r3/final) · [RFC 5737 documentation IPv4 blocks](https://www.rfc-editor.org/rfc/rfc5737). The scenario is an original training simulation.


# Module 4 — Network security teaching capstone

## Outcomes

Integrate the course evidence into a reproducible microteaching session; apply an analytic rubric; identify a specific improvement after feedback.

## Scenario and deliverable

Teach a 20-minute scenario about a fictional campus laboratory that can resolve a service name but receives HTTP 403. Provide subnet and policy diagrams, synthetic evidence and an assessment that distinguishes transport reachability, TLS identity and application authorization. Require a least-privilege correction and a rollback check.

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

**Critical condition:** Scanning third-party infrastructure, collecting real credentials or widening access without authorization prevents completion.

## Feedback, moderation and reassessment

Give feedback using an observed artifact, the relevant criterion and one concrete next action. Where two assessors disagree, compare the same evidence and record the reason for the final decision. Do not average unexplained scores to hide disagreement. A reassessment should target the missing capability with a fresh equivalent task, followed by rechecking the affected criteria. Follow the commissioning institution's approved appeals process for formal delivery.

## Retrieval and reflection


Can a polished presentation compensate for incorrect subject reasoning?

No. Subject correctness has a minimum required level and cannot be offset by attractive formatting. Correct the reasoning and verify the revised artifact.




What distinguishes a self-check from formal assessment here?

A self-check supports practice. Formal assessment requires an authorized assessor, controlled evidence handling, recorded decisions and confirmed institutional arrangements. This public course does not create those records automatically.



## Official references and next steps

Use the specific official sources in Modules 1–3 and record their versions in your portfolio. Consult [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) when reviewing your handout. [Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-NET-201) for a supported cohort or assessment discussion; an enquiry does not grant access or award a credential.
