# Robotics Lecturer Practice



Academic roles · EDU-ROB-201 · Version 1.0.0

Teach robot motion, feedback control and fail-safe state machines using deterministic software simulations.



**Public pilot courseware** · **Intermediate professional development** · **Estimated effort: 10 hours** · **Four separate modules**

Read, practise and build a portfolio. Independent subject review is pending. Formal grading, certification and LMS progress tracking are not enabled by these public pages.



[Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-ROB-201) · [Download the course pack](https://www.skunkworksacademy.com/downloads/academic-roles/robotics-lecturer-practice/course-pack.zip)

## Who this course serves

This course supports the **IT Lecturer - Robotics** role listed in the supplied job alert. The alert locations are **Bedfordview**. It develops bounded professional capabilities; it does not replace a relevant degree, employment experience or the employer's selection requirements. It is independently authored Skunkworks Academy material and is not an Eduvos-endorsed or accredited qualification.

**Prerequisites:** Basic Python, algebra, vectors and introductory electronics concepts.

**Lab environment:** Python 3.12 or later; simulation only. Physical robotics and ROS installations are optional extensions requiring a separate supervised safety plan.

**Delivery:** self-paced practice with an optional facilitated cohort. English text, native tables and expandable formative feedback support accessible study. No paid tools are required for the core exercises. Plan two hours for each of Modules 1–3 and four hours for the capstone, including practice and revision; actual time depends on prior knowledge.

## Your learning pathway



## Outcomes and evidence

The course uses a portfolio to make capability observable. The following evidence statements define the work you will produce, rather than promising an employment or certification outcome.

| Outcome | Evidence you will produce and explain | Where | Assessment link |
|---|---|---|---|
| LO-01 | Pose trace with units and frame annotations | Module 1 | Module lab acceptance and capstone rubric |
| LO-02 | Controller response table and bounded-command test | Module 2 | Module lab acceptance and capstone rubric |
| LO-03 | State-transition table and fault-injection evidence | Module 3 | Module lab acceptance and capstone rubric |
| LO-04 | A safe simulated robotics lesson with assessed recovery tasks | Module 4 | Capstone rubric |

## Course materials

- [Complete course pack: guide, workbook, facilitator notes and labs](https://www.skunkworksacademy.com/downloads/academic-roles/robotics-lecturer-practice/course-pack.zip)
- [Learner workbook](https://www.skunkworksacademy.com/downloads/academic-roles/robotics-lecturer-practice/learner-workbook.md)
- [Facilitator and assessor guide](https://www.skunkworksacademy.com/downloads/academic-roles/robotics-lecturer-practice/facilitator-guide.md)
- [Download lab.py](https://www.skunkworksacademy.com/downloads/academic-roles/robotics-lecturer-practice/lab.py)

## How to study and retain evidence

Begin by predicting the result of each worked example. Run or complete the activity, compare the observation with the prediction, and explain one discrepancy. Use the expandable retrieval questions for practice; their answers are public and are not a secure exam bank. The workbook is a local planning aid and does not submit work or save a grade to an LMS.

Keep only synthetic or authorized data. Before formal submission, confirm the assessor, private evidence channel and retention rules. If you need help or an accessible alternative, use the Academy contact route in the shared footer or the facilitated-enrolment enquiry above. Do not include confidential evidence in the enquiry form.

## Source and maintenance record

**Role source:** a user-supplied job-alert PDF dated 1 November 2026. Its short excerpts establish the role labels and broad duties, not a complete employer competency specification. The generic IT Lecturer listing at two campuses maps to one course. The mathematics title normalizes the alert's spelling. Full job descriptions have not been assumed.

**Technical sources:** official documentation linked at the end of each module; original synthetic examples and datasets. **Owner:** Skunkworks Academy curriculum team. **Independent SME reviewer:** not yet assigned. **Next review target:** 1 February 2027, or earlier when a referenced interface or role requirement changes. **Changelog:** 1.0.0, initial pilot edition, 1 November 2026.




# Module 1 — Motion models and reference frames

## Outcomes

Define a planar robot pose with units; predict one discrete motion step; distinguish model assumptions from physical behaviour.

## Explain and demonstrate

A simple mobile-robot model describes pose as x, y and heading theta. In this lesson x points right, y points up, heading is measured counterclockwise in radians and speed is metres per second. A forward-Euler update uses the current heading to calculate displacement over a time step: x changes by speed × cos(theta) × dt, y by speed × sin(theta) × dt, and theta by angular speed × dt.

This is a teaching model. It ignores wheel slip, acceleration limits, localization error and collision geometry. For straight motion from the origin with heading zero, speed 1 m/s and dt 2 s, the new pose is (2, 0, 0). If angular speed is nonzero, a long Euler step approximates a curved path poorly. Reducing the step can improve the numerical approximation, but it does not remove the physical assumptions.

### Worked example: name the quantities

| Quantity | Meaning | Unit | Example |
|---|---|---|---|
| x, y | Position in world frame | metres | 0, 0 |
| theta | Heading from positive x | radians | 0 |
| speed | Forward body speed | metres/second | 1 |
| angular speed | Heading change rate | radians/second | 0 |
| dt | Step duration | seconds | 2 |

A body frame moves with the robot, while the world frame remains fixed for this scenario. The trigonometric terms convert forward body motion into world-coordinate displacement. Naming the frame prevents a learner from treating “forward” as always increasing world x.

## Lab — predict and trace motion

**Setup:** Download `lab.py`. Use only the Python simulation; do not connect motors, hardware interfaces or physical robots.

1. Predict the straight-motion pose, then run `python lab.py motion`. Expect `(2.0, 0.0, 0)`.
2. Call `step` with heading approximately pi/2 and zero angular speed. Predict displacement along positive y; allow small floating-point residuals near zero.
3. Compare one 1-second turning step with ten 0.1-second steps using the same speed and angular speed. Record the different positions and explain the approximation.
4. Add a zero-speed case. Check that position remains fixed while heading may still change.
5. Prepare a trace table with initial pose, inputs, duration and resulting pose for each case.

**Fault injection:** Pass 90 as a heading while treating it as degrees. Explain the unexpected direction; convert degrees to radians before rerunning. **Expected observations:** Units and integration interval affect results even when the code executes without error.

**Evidence:** Trace table, units, model assumptions and a short learner explanation. **Cleanup:** Retain the offline fixture only; no devices or services were provisioned.

## Common pitfalls and teaching decisions

A simulator can produce an apparently precise number from an unrealistic model. Do not describe that output as a measured physical result. For a learner struggling with trigonometry, begin with headings 0 and pi/2 before introducing arbitrary angles. Provide the coordinate table as an alternative to a plotted trajectory.

## Retrieval and reflection


Does a smaller time step make the model physically complete?

No. It can reduce integration error while leaving slip, sensing and actuator limitations unmodelled.




Why is a frame declaration necessary?

Position and direction depend on the reference frame. Body-forward movement is converted into world displacement using the heading.



## Official references

[ROS coordinate conventions, REP 103](https://github.com/ros-infrastructure/rep/blob/master/rep-0103.rst) · [Python trigonometric functions](https://docs.python.org/3.14/library/math.html). This fixture is not a ROS installation or a physical robot controller.


# Module 2 — Feedback, saturation and model limits

## Outcomes

Calculate proportional feedback; explain actuator saturation; compare a response trace with the stated plant model.

## Explain and demonstrate

A controller compares a target with an observed state. In the scalar fixture, error is target minus position, and the requested velocity is gain times error. The command is clamped between −1 and 1 to model a bounded actuator. Position then changes by that velocity for a one-second step. These assumptions make the trace easy to calculate; they do not establish that the controller is safe for real machinery.

With target 4, initial position 0 and gain 0.5, the first requested velocity is 2, but saturation limits it to 1. Position becomes 1. The next two commands also equal 1, reaching position 3. Thereafter the command drops to 0.5, then 0.25, because the error has decreased. The controller approaches the target gradually in this idealized model.

### Worked example: the bounded response

| Tick | Command | Position after step |
|---|---|---|
| 0 | 1.000 | 1.000 |
| 1 | 1.000 | 2.000 |
| 2 | 1.000 | 3.000 |
| 3 | 0.500 | 3.500 |
| 4 | 0.250 | 3.750 |

The table separates command from state. A common misconception is to treat the controller output as the next position. Another is to assume increasing gain always improves the response. In a real system, delay, inertia and sampling affect stability. Even in a simple discrete model, excessive gain can create overshoot or oscillation.

## Lab — explain a control trace

**Setup:** Use the supplied offline `lab.py`. Do not use these functions to drive hardware.

1. Calculate the five rows by hand, then run `python lab.py control` and compare.
2. Change the target to a negative value in a copy. Verify the command remains within the declared bounds and has the appropriate sign.
3. Compare gain 0.25 with gain 0.5 while keeping target, time step and bounds constant.
4. Run an explicitly labelled alternative with gain 2 and a sufficiently large command bound. Observe the idealized oscillation and explain why saturation had obscured that behaviour in the original setup.
5. Write a learner question asking for the distinction between setpoint, error, command and measured state.

**Fault injection:** Reverse the error to position minus target. Predict the direction before execution and show that the controller moves away from the target in the fixture. Restore the sign.

**Expected observations:** Saturation limits command magnitude; it does not guarantee convergence or physical safety. **Evidence:** Two response tables, the sign-error diagnosis and a model-limit statement. **Cleanup:** Label exploratory variants and retain the corrected baseline.

## Common pitfalls and teaching decisions

Comparing two controllers while changing several parameters at once makes the cause of improvement unclear. A plot without units is hard to assess. Use a table first, then a graph if helpful. Declare whether the state is simulated, measured or estimated; these are different kinds of evidence.

## Retrieval and reflection


Why does the first command equal 1 when gain times error equals 2?

The command is clamped to the configured upper bound. Distinguish requested and applied command.




Does a command limit prove a robot is safe?

No. Physical safety also depends on hardware, hazards, sensing, faults and independent controls. This lesson demonstrates only a mathematical bound.



## Official references

[ROS control PID controller documentation](https://control.ros.org/jazzy/doc/ros2_controllers/pid_controller/doc/userdoc.html) · [Python numerical functions](https://docs.python.org/3.14/library/math.html). The lab uses proportional control only; integral and derivative terms are extension topics.


# Module 3 — State machines and fault handling

## Outcomes

Specify a finite-state controller; test invalid-input behaviour; explain why fault recovery needs an explicit transition.

## Explain and demonstrate

A state machine describes permitted transitions between named operating conditions. The fixture uses RUN, STOP and FAULT. An invalid sensor reading moves any state to FAULT. Valid data alone does not clear a latched fault. An explicit reset with valid data moves FAULT to STOP, giving a separate decision point before operation resumes.

The ordering of rules matters. Check invalid input first so a simultaneous reset cannot conceal it. Then handle the latched fault. Only when no fault remains should the obstacle condition select STOP or RUN. In a physical system, safe motion would require more controls than this three-state model. The exercise deliberately remains disconnected from actuators.

### Worked example: transition priority

| Current state | Input | Next state | Teaching point |
|---|---|---|---|
| Any | Invalid sensor | FAULT | Invalid evidence takes priority |
| FAULT | Valid, no reset | FAULT | Fault remains latched |
| FAULT | Valid, reset | STOP | Reset does not directly command motion |
| RUN or STOP | Valid, obstacle | STOP | Obstacle prevents run |
| RUN or STOP | Valid, clear | RUN | Normal operation in this simplified model |

A transition table is executable design evidence: each row can become a test. Testing only the happy path misses the most consequential rule. Ask learners to explain what happens when two conditions occur together, not just when each condition is isolated.

## Lab — inject a recoverable fault

**Setup:** Use `lab.py` offline. No robot, ROS middleware, external sensors or network access is required.

1. Predict the three outputs of `python lab.py states`, then run it. Expect `FAULT`, `FAULT`, `STOP` on separate lines.
2. Run `python lab.py test`; six robotics checks should pass.
3. Add a test for invalid data and reset occurring simultaneously. The expected result remains FAULT.
4. Add a test for an obstacle while running. Explain why STOP and FAULT represent different situations.
5. Draw a labelled state diagram or use the complete transition table. Include a text explanation of priority and recovery.
6. Extend the requirements to demand a separate operator-start event after reset. Write the revised table before modifying code; explain which original transition is no longer acceptable.

**Fault injection:** Remove the latched-fault branch in a copy. Show that valid input can now resume RUN without reset and that a test detects the defect. Restore the branch.

**Expected observations:** Fault handling is a temporal property: the previous state affects the decision. **Evidence:** Transition table, added tests, failure log and recovery rationale. **Cleanup:** Remove the faulty variant and retain the corrected simulation.

## Common pitfalls and teaching decisions

Do not equate a software STOP label with a verified physical emergency stop. A missing reading is not the same as a reading of zero. A reset should not be used to discard evidence of an unresolved condition. Give learners a sequence of inputs to trace so they practise state over time.

## Retrieval and reflection


Why does valid data alone leave the fixture in FAULT?

The fault is latched until an explicit reset occurs with valid input. This makes recovery a deliberate transition.




What should happen if reset and invalid data arrive together?

FAULT remains the result because invalid data has priority. Add this combination as a regression test.



## Official references

[ROS managed-node lifecycle design](https://design.ros2.org/articles/node_lifecycle.html) · [Python unittest assertions](https://docs.python.org/3.14/library/unittest.html). The lifecycle source is a comparison for explicit transitions, not a claim that this fixture implements ROS lifecycle states.


# Module 4 — Robotics teaching capstone

## Outcomes

Integrate the course evidence into a reproducible microteaching session; apply an analytic rubric; identify a specific improvement after feedback.

## Scenario and deliverable

Teach a 20-minute simulated robot-control lesson. Learners must predict motion, tune a bounded proportional controller and demonstrate that an invalid sensor reading produces a stopped state. Deliver deterministic tests, a state diagram, a lesson plan and an assessment requiring explanation of simulation limitations.

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

**Critical condition:** Connecting the exercise to physical actuators without a separate approved safety plan, or failing to stop on invalid input, prevents completion.

## Feedback, moderation and reassessment

Give feedback using an observed artifact, the relevant criterion and one concrete next action. Where two assessors disagree, compare the same evidence and record the reason for the final decision. Do not average unexplained scores to hide disagreement. A reassessment should target the missing capability with a fresh equivalent task, followed by rechecking the affected criteria. Follow the commissioning institution's approved appeals process for formal delivery.

## Retrieval and reflection


Can a polished presentation compensate for incorrect subject reasoning?

No. Subject correctness has a minimum required level and cannot be offset by attractive formatting. Correct the reasoning and verify the revised artifact.




What distinguishes a self-check from formal assessment here?

A self-check supports practice. Formal assessment requires an authorized assessor, controlled evidence handling, recorded decisions and confirmed institutional arrangements. This public course does not create those records automatically.



## Official references and next steps

Use the specific official sources in Modules 1–3 and record their versions in your portfolio. Consult [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) when reviewing your handout. [Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course=EDU-ROB-201) for a supported cohort or assessment discussion; an enquiry does not grant access or award a credential.
