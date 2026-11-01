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

<details><summary>Should a high weighted total override a declared critical safety failure?</summary>

No. Apply the published critical condition and require correction, while preserving the evidence and feedback record.

</details>

<details><summary>What should a moderation record explain?</summary>

The evidence examined, the disagreement, the criterion used, the decision and any consistent re-marking required. A changed number alone is insufficient.

</details>

## Official references

[QAA assessment guidance](https://www.qaa.ac.uk/en/the-quality-code/2024/advice-and-guidance-2024/quality-code-advice-and-guidance-principle-11) · [Python unittest concepts](https://docs.python.org/3.14/library/unittest.html). Confirm the commissioning institution’s assessment, retention and appeal policies before formal delivery.
