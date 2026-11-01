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

<details><summary>Does one allowed account prove that the access rule is correct?</summary>

No. It checks one input combination. The truth table covers all combinations of the two Boolean variables in this simplified model.

</details>

<details><summary>Is enrolment sufficient for access in the original rule?</summary>

No. Activity is also required. Explain the enrolled-but-inactive row to distinguish necessity from sufficiency.

</details>

## Official references

[OpenStax Contemporary Mathematics: logic](https://openstax.org/books/contemporary-mathematics/pages/2-introduction) · [Python Boolean operations](https://docs.python.org/3.14/library/stdtypes.html#boolean-operations-and-or-not). The access scenario is original and simplified for teaching.
