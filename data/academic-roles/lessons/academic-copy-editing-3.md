## Outcomes

Edit instructions without changing their technical meaning; create accessible headings and tables; design a release check that catches semantic regressions.

## Explain and demonstrate

Technical editing must preserve the relationship between instructions and results. If a command operates on a file, the document should state the starting folder, prerequisites, expected result and recovery action. An editor should flag an unexplained destructive operation rather than making it look more authoritative. Code, filenames and identifiers are literal data: typographic quotation marks can break a command even when they look attractive.

Accessibility is part of editorial quality. Headings express document structure, not merely visual size. Tables need meaningful headers and should represent relationships rather than page layout. An informative figure needs a text alternative that conveys its purpose; a complex diagram also needs an adjacent explanation. Colour alone should not distinguish “pass” from “fail.”

### Worked example: repair a lab instruction

| Weak instruction | Edited instruction | Remaining subject check |
|---|---|---|
| “Run it and check the result” | “From the exercise folder, run `python lab.py test`.” | Confirm filename and supported Python version |
| “Green means it worked” | “The test runner reports `OK`; colour is optional.” | Confirm expected test count |
| “Fix permissions” | “Record the error and ask the facilitator before changing permissions.” | Identify the authorized recovery procedure |

The edit supplies observable behaviour without inventing privileges. A technically accurate lab should still be executed by a subject reviewer. A successful grammar check is not a lab validation.

## Lab — produce an accessible teaching handout

**Setup:** Work with the supplied synthetic handout and your editor’s styles or semantic Markdown. Keep a copy of the original.

1. Replace manually bolded section labels with real heading levels. Avoid jumping from the document title directly to a fourth-level heading.
2. Convert a list of pass/fail criteria into a two-column table with clear headers and short cells.
3. Describe a three-stage process in text and add a labelled visual. Make the adjacent explanation sufficient without colour or the image.
4. Check code punctuation, paths and expected output against the supplied fixture or a subject-approved run record.
5. Review at 200% zoom and a narrow window. Use the keyboard to reach links and expandable sections in the published preview when available.
6. Introduce a smart quote into a code example, identify it in a literal comparison and restore the original character.

**Expected observations:** Structure remains understandable without visual styling; instructions identify the action, evidence and recovery boundary. **Evidence:** Before/after handout, heading outline, text alternative and technical-query log. **Cleanup:** Remove the deliberate smart-quote defect and any unresolved test claim from the clean release copy.

## Common pitfalls and teaching decisions

An automated accessibility checker cannot decide whether a diagram’s explanation is useful. Alt text that repeats a filename provides little meaning. Do not label the whole document “WCAG compliant” from a handful of checks; report the observed checks and remaining review scope. For equations, provide readable notation and a prose explanation of variables rather than an image alone.

## Retrieval and reflection

<details><summary>Should alt text list every visual detail of a complex diagram?</summary>

Use a concise purpose-focused alternative and provide the detailed relationships in nearby text. Avoid forcing a long technical explanation into a single label.

</details>

<details><summary>What can a copy editor conclude after checking the spelling of a command?</summary>

Only that the literal text matches the checked source. Execution, permissions and technical correctness still need appropriate validation.

</details>

## Official references

[W3C page structure tutorial](https://www.w3.org/WAI/tutorials/page-structure/) · [W3C table tutorial](https://www.w3.org/WAI/tutorials/tables/) · [W3C complex images](https://www.w3.org/WAI/tutorials/images/complex/).
