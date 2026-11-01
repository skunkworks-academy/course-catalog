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

<details><summary>Why is copying the demonstrated solution weak evidence of transfer?</summary>

The learner may reproduce steps without understanding the rule. Change the fixture and ask for an explanation of the decision.

</details>

<details><summary>What should be removed first when a 20-minute plan contains six outcomes?</summary>

Narrow the intended performance and move supporting topics to prerequisites or later lessons. Preserve practice and evidence time for the remaining outcome.

</details>

## Official references

[CAST Universal Design for Learning guidelines](https://udlguidelines.cast.org/) · [Python CSV interface](https://docs.python.org/3.14/library/csv.html). The timing and alignment example are an Academy design proposal to pilot, not a measured teaching effect.
