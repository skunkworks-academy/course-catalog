# Course access API contract

## Purpose

Provide a server-side, default-deny decision for protected Skunkworks Academy course routes.

## Endpoint

```http
GET /api/course-access?courseId=SHP-UPA-101
Accept: application/json
Authorization: Bearer <access-token>
Cookie: <portal-session-cookie>
```

The API may accept the portal session cookie, a bearer token, or both. It must not trust a learner ID, email address, role or enrolment status supplied by the browser.

## Authentication requirements

1. Validate the token signature, issuer, audience, expiry and not-before values.
2. Resolve the learner identity from validated claims.
3. Require an approved learner role or application role where applicable.
4. Reject anonymous, expired, malformed or wrong-audience tokens.
5. Apply rate limiting and security logging.
6. Return no personally sensitive data beyond the minimum decision context.

## Authorisation requirements

Access is allowed only when all required conditions are true:

- the learner identity is active;
- the course ID exists and is published;
- an enrolment record exists for the learner and course;
- the enrolment status is `active` or another explicitly approved status;
- payment, sponsorship or manual approval conditions are satisfied;
- the enrolment start and expiry dates are valid;
- the learner is not suspended or blocked;
- any tenant, cohort or regional restriction is satisfied.

The decision must be made from the authoritative enrolment data source, not browser storage.

## Response examples

### Allowed

```http
HTTP/1.1 200 OK
Cache-Control: no-store
Content-Type: application/json

{
  "allowed": true,
  "courseId": "SHP-UPA-101",
  "learnerId": "00000000-0000-0000-0000-000000000000",
  "enrolmentStatus": "active",
  "expiresAt": "2026-12-31T23:59:59Z"
}
```

### Authentication required

```http
HTTP/1.1 401 Unauthorized
Cache-Control: no-store
Content-Type: application/json

{
  "allowed": false,
  "reason": "authentication_required"
}
```

### No active enrolment

```http
HTTP/1.1 403 Forbidden
Cache-Control: no-store
Content-Type: application/json

{
  "allowed": false,
  "reason": "active_enrolment_required"
}
```

### Unknown course

```http
HTTP/1.1 404 Not Found
Cache-Control: no-store
Content-Type: application/json

{
  "allowed": false,
  "reason": "course_not_found"
}
```

## CORS and cookie requirements

For a cross-origin portal cookie:

- allow only the exact course-catalogue origin;
- set `Access-Control-Allow-Credentials: true`;
- do not use `*` for `Access-Control-Allow-Origin`;
- use `Secure`, `HttpOnly` and an appropriate `SameSite` policy;
- validate the request origin server-side;
- add CSRF protection to state-changing enrolment endpoints.

## Audit event

Record an access-decision event containing:

- timestamp;
- request correlation ID;
- learner subject ID;
- course ID;
- decision;
- reason code;
- token issuer and application ID;
- source IP or approved privacy-preserving equivalent;
- user agent summary;
- policy version.

Do not log access tokens, session cookies or unnecessary personal data.

## Cache policy

Use `Cache-Control: no-store`. Do not cache an allow decision in a public CDN. A short client-side refresh interval may be used for user experience, but the server remains authoritative.

## Protected-content production pattern

For strict enforcement, the API should return signed, short-lived content URLs or lesson JSON only after entitlement validation. The static public Docusaurus build should contain course summaries and route shells, not confidential lesson bodies.
