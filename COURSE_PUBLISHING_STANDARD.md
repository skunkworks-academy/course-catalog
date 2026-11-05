# Skunkworks Academy course publishing contract

**Applies to every new or edited Academy course.** The public publishing owner is
[skunkworks-academy/www](https://github.com/skunkworks-academy/www); this
repository owns canonical Docusaurus course source at
https://www.skunkworksacademy.com/courses/.

## Non-negotiable page contract

1. **One Academy shell:** load the central
   `https://skunkworksacademy.com/assets/academy-navigation.js` runtime.
   The header, footer, search, favicon, and global navigation come from the
   existing shared site assets. Never introduce a second standalone Navbar or
   Footer in Docusaurus, or fork the Academy palette per course.
2. **Discoverable route:** add each course to `docs/`, `sidebars.ts`,
   `static/course-manifest.json`, and the published listing at
   `src/pages/courses.tsx`. Use a unique course ID, title, description and
   canonical `/courses/<slug>` route. The site-release process merges the
   Docusaurus sitemap into the *www* sitemap after composing the site.
3. **Registration-aware:** protected lessons use `EnrollmentGate` with the
   same course ID as the manifest. The shared component derives sign-in and
   enrolment URLs, preserving `courseId` and `returnUrl`, and fails closed
   when the access API cannot verify entitlements. Public courses must expose
   a real registration link for formal enrollment/assessment.
4. **Brand and themes:** use Academy design tokens, the existing shared CSS
   and semantic components. The light and dark themes must both be legible.
   WCAG 2.2 AA contrast targets: at least **4.5:1** for normal text,
   **3:1** for large text and meaningful UI components. Check focus, errors,
   disabled/hover states, and text over images/gradients, not only root tokens.
5. **Responsive page layout:** test mobile (390 px), tablet and desktop,
   avoid sideways scrolling, keep a visible H1, landmarks, headings,
   breadcrumbs, course summary and primary registration CTA.
6. **SEO and routing:** one canonical HTTPS URL per course; published URLs
   must be present exactly once in the final *www* sitemap. Keep public
   marketing copy indexable; keep private answer keys, learner data and
   paid lesson files **out of GitHub Pages HTML and public repositories**.
   Client-side hiding is not server-side content protection.
7. **Release gate:** block publication on missing routes, registration, assets,
   navigation, sitemap entries, accessibility or theme conformance.
   Review the rendered course in both themes before merge. Never bypass
   failing checks by deleting them.

## Required local commands

~~~bash
npm install
npm run validate:content
npm run build
npm run validate:publication-build
~~~

The `validate:publication` source check runs as part of
`validate:content`. The post-build check verifies Docusaurus's generated
sitemap, canonical links and shared-shell loader for **every manifested
course**. GitHub Actions repeats these checks on pull requests and main.

The *www* pipeline must independently compose course HTML, include route
aliases, merge the course sitemap and inspect the final artifact before
deploying. Keep the two repositories' contracts aligned during any site
architecture change.

## Creating a course

1. Allocate a unique course ID and `docs/<slug>.mdx`; include frontmatter
   `id`, `title`, `description`, and an explicit `slug` if its path differs.
2. Add the course to the manifest, canonical sidebar and published listing.
3. Use `EnrollmentGate` for protected lessons and ensure the `courseId`
   matches the manifest. Provide a portal registration route for public courses.
4. Compose with the central design system; check light/dark and mobile.
5. Open a feature-branch PR. Do not publish until source, build, and final
   site-release gates pass.

**Important:** Course catalogue changes alone do not publish the site.
The *www* repository owns production deployment; its existing scheduled
release runs every four hours, and can also be dispatched manually. Faster
cross-repository triggering requires a separately authorized integration.
