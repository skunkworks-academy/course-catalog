## Outcomes

Build a claim-to-source ledger; distinguish citation identity from claim support; document uncertainty and correction decisions.

## Explain and demonstrate

A reference can be real yet fail to support the nearby sentence. Source checking therefore has two layers. First, establish identity: title, author, date, publisher and identifier refer to the intended work. Second, inspect the relevant passage to determine whether it supports the claim at the required level of precision. A DOI resolving successfully answers neither question by itself.

Break broad statements into checkable units. “All students learn better with video” combines a population, intervention, comparison and outcome while hiding the conditions. An editor should ask what study, participants, measure and comparison justify “all” and “better.” Do not replace the claim with another unsupported generalization. Record whether the claim is supported, overstated, contradicted or not yet verifiable.

### Worked example: a claim ledger

| Claim | Evidence needed | Editorial decision |
|---|---|---|
| “The course has four modules” | Current course inventory | Verify exact count |
| “All learners improve by 50%” | Defined measure, sample and analysis | Query; do not infer evidence |
| “The API supports method X” | Official documentation for the stated version | Check version and method |
| “A DOI proves reliability” | No identifier guarantees reliability | Correct the conceptual error |

Metadata services can help identify a work and discover updates. They do not replace reading the work or checking publisher notices. If the source is inaccessible, record the access limitation. “Not verified” is an honest status; it is not equivalent to “false.” Keep the quote short and record a section or page locator for the reviewer rather than copying entire documents into the ledger.

## Lab — verify three bounded claims

**Setup:** Use the synthetic handout. Choose three claims that can be checked against freely available primary sources. Use the browser manually; no bulk scraping or authenticated access is necessary.

1. Record the claim verbatim, its location and the exact question to verify.
2. Open the primary source and record its title, URL, relevant section, version or date, and your access date.
3. If a DOI is present, compare its metadata with the reference entry. Check the publisher’s current page for corrections or notices.
4. Write a short support rationale in your own words. Use “not verified” if the actual content is inaccessible.
5. Deliberately attach a valid but irrelevant source to one claim. Explain how an identity-only check would miss the mismatch, then restore the correct mapping.

**Expected observations:** At least one editorial decision should concern the strength or scope of a claim, not just punctuation. **Evidence:** Three ledger rows, a corrected reference and an unresolved-query example. **Cleanup:** Remove irrelevant citations from the release copy and keep only short, necessary excerpts.

## Common pitfalls and teaching decisions

A search snippet may omit qualifications. A vendor’s current documentation may differ from the version used by the course. An AI-generated citation must be opened and checked like any other unverified reference. Do not upload unpublished manuscripts or learner records into an unapproved external service.

## Retrieval and reflection

<details><summary>A DOI resolves and the title matches. Is the factual claim verified?</summary>

No. Read the relevant content and compare it with the exact claim. Identity and support are separate checks.

</details>

<details><summary>How should an inaccessible source be recorded?</summary>

Record the attempted source and access limitation, mark support as not verified and query the author for an accessible or authorized version.

</details>

## Official references

[Crossref metadata retrieval documentation](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) · [Crossmark and update information](https://www.crossref.org/services/crossmark/). Original ledger examples are not claims about any actual study or institution.
