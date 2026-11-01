## Outcomes

Read CSV data with an explicit schema; distinguish file, header and row errors; create reproducible tests with automatic cleanup.

## Explain and demonstrate

File handling introduces failures outside the numerical function itself. The file may not exist; its header may lack required columns; a row may contain an invalid score. Treat these as distinct cases so feedback points to the correct next action. A missing file is not repaired by changing a score, and a missing column should be detected before processing rows.

The supplied importer uses `csv.DictReader`, requires `id` and `score` headers and reports the line of an invalid record. The file is opened with UTF-8 encoding and `newline=""`, and the context manager closes it. Tests create temporary directories rather than relying on a learner’s home folder. This avoids hidden dependencies and cleans up synthetic files even when a test fails.

### Worked example: failure classification

| Fixture | Expected result | Next diagnostic step |
|---|---|---|
| Missing path | FileNotFoundError | Verify file location |
| `name,points` header | ValueError | Compare schema with contract |
| `id,score` plus `L01,nope` | ValueError naming line 2 | Inspect the score field |
| Valid two-row file | Parsed tuples | Verify values and count |

The fixture deliberately stops on the first invalid row. A production importer might collect all row errors or reject duplicate IDs, but that is a separate requirement. Do not claim those behaviours exist until they are implemented and tested.

## Lab — verify a complete import boundary

**Setup:** Use the supplied `lab.py`; no database, account or external package is required.

1. Run `python lab.py files`. Expect `[('L01', 80.0), ('L02', 100.0)]`.
2. Run `python lab.py test` and identify the six test methods in the source.
3. Explain how the temporary directory supports isolation and cleanup.
4. Add a test for an empty ID and a test for a missing score value. Derive each expected error from the function contract.
5. Propose, but do not silently assume, a duplicate-ID policy. Write the required behaviour and a failing test before implementing it in a separate extension.
6. Create a learner handout showing the header, one data row, the expected output and a troubleshooting decision table.

**Fault injection:** Remove the required-header check from a copy. Determine which test fails and whether the resulting error is sufficiently clear. Restore the check.

**Expected observations:** Tests distinguish schema errors from row-value errors and do not leave data files behind. **Evidence:** Test output, added cases, environment version and accessible handout. **Cleanup:** Temporary fixtures are automatically removed; delete any manually created synthetic files after retaining the required evidence.

## Common pitfalls and teaching decisions

Splitting CSV lines manually on commas fails when fields contain quoted commas or other valid CSV syntax. A happy-path demo does not establish robust error handling. Avoid using actual student marks as convenient sample data. The same teaching objective can be met with fictional identifiers.

## Retrieval and reflection

<details><summary>Why should a missing header be detected before processing data rows?</summary>

It is a schema failure affecting interpretation of the whole file. Early validation produces a clearer diagnosis.

</details>

<details><summary>Do these tests prove that duplicate IDs are rejected?</summary>

No. That behaviour is not part of the baseline implementation. Add a requirement and tests if it becomes necessary.

</details>

## Official references

[Python CSV reading and writing](https://docs.python.org/3.14/library/csv.html) · [Python temporary files](https://docs.python.org/3.14/library/tempfile.html) · [Python unittest](https://docs.python.org/3.14/library/unittest.html).
