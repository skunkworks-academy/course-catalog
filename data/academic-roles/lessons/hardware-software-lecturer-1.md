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

<details><summary>Why does doubling a component yield only 1.25 times overall speed in the example?</summary>

Only 40% of the original time benefits. The unchanged 60% still takes the same time.

</details>

<details><summary>Can this calculation prove a specific computer upgrade will help?</summary>

No. The workload fraction and assumptions must be established with appropriate measurements. The calculation is a conditional prediction.

</details>

## Official references

[Linux kernel performance and administration documentation](https://www.kernel.org/doc/html/latest/admin-guide/) · [Python performance counter documentation](https://docs.python.org/3.14/library/time.html#time.perf_counter). The arithmetic fixture is original and performs no hardware benchmark.
