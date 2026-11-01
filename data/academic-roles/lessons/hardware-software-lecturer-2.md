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

<details><summary>Why is a lower latency value after a change not sufficient proof of causation?</summary>

The workload or other conditions may also have changed. Compare controlled conditions and preserve the baseline.

</details>

<details><summary>What makes a correction reversible?</summary>

A known starting state, a specific rollback action and a trigger for using it, followed by verification that the rollback restored the intended condition.

</details>

## Official references

[Linux kernel administrator’s guide](https://www.kernel.org/doc/html/latest/admin-guide/) · [Microsoft Windows performance analysis guidance](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/). This module teaches a diagnostic method, not a claim of certification in either operating system.
