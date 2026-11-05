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

<details><summary>Why is sensitivity not the answer to “given a positive result, what is the probability?”</summary>

Sensitivity conditions on the condition being present. The second question conditions on a positive result. They select different groups.

</details>

<details><summary>What changed when prevalence increased to 10%?</summary>

The balance of true and false positives changed, even though the stated sensitivity and false-positive rate stayed fixed. Rebuild the frequency table to see the effect.

</details>

## Official references

[OpenStax Introductory Statistics: probability](https://openstax.org/books/introductory-statistics-2e/pages/3-introduction) · [Python exact rational arithmetic](https://docs.python.org/3.14/library/fractions.html).
