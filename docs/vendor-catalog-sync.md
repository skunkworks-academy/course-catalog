# Vendor catalogue metadata sync (initial pilot)

Tracking: [#60](https://github.com/skunkworks-academy/course-catalog/issues/60)

This pilot is **metadata-only** and read-only by default. It does not
scrape paid courseware, access learner records, grant enrolments,
approve offerings, change the public catalogue, or run on a schedule.

## Import a Skunkworks manifest

Use a hand-curated, reviewed file with this structure:

```json
{
  "schemaVersion": 1,
  "courses": [
    {
      "externalId": "SW-NET-001",
      "title": "Networking Essentials",
      "type": "course",
      "sourceUrl": "https://www.skunkworksacademy.com/networking/",
      "discoverable": true
    }
  ]
}
```

The example is illustrative, **not** evidence that the named course is a
currently approved offering. Each source URL and course must be
verified by the catalogue owner before importing.

```sh
node scripts/import-skunkworks-manifest.mjs approved-manifest.json --output=skunkworks-records.json
node scripts/vendor-catalog-diff.mjs previous-records.json skunkworks-records.json --output=change-review.json
node --test tests/vendor-catalog-diff.test.mjs tests/import-skunkworks-manifest.test.mjs
```

Output files are drafts, created with exclusive creation (will not overwrite).
New items always require manual review before inclusion in an approved
Academy offering. Missing entries are candidates for investigation, never
automatically deleted. A vendor authorization and integration review is
required before adding Microsoft, IBM, CompTIA, Cisco or Google feed connectors.

## Review controls

- Only import explicitly discoverable public metadata; avoid private courseware.
- No automatic publication, price, certification, delivery, or accreditation claims.
- Validate external IDs and HTTPS URLs.
- Preserve source/provenance; enrolment remains a separate authorization check.
- Keep sensitive API credentials out of GitHub.
