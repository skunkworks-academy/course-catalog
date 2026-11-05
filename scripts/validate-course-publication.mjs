#!/usr/bin/env node
/**
 * Fail closed when a publishable Docusaurus course is missing the Academy
 * registration, navigation, route, theme or sitemap contract.
 *
 * Run before build: node scripts/validate-course-publication.mjs
 * Run after build:  node scripts/validate-course-publication.mjs --build build
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const origin = 'https://www.skunkworksacademy.com';
const errors = [];
const file = rel => path.join(root, rel);
const read = rel => fs.readFileSync(file(rel), 'utf8');
const required = rel => {
  if (!fs.existsSync(file(rel))) {
    errors.push('Missing required publication file: ' + rel);
    return '';
  }
  return read(rel);
};
const config = required('docusaurus.config.ts');
const sidebar = required('sidebars.ts');
const index = required('src/pages/courses.tsx');
const brand = required('src/css/custom.css');
const navbar = required('src/theme/Navbar/index.tsx');
const footer = required('src/theme/Footer/index.tsx');
const gate = required('src/components/EnrollmentGate.tsx');

let manifest;
try {
  manifest = JSON.parse(required('static/course-manifest.json'));
} catch (error) {
  errors.push('Invalid course manifest JSON: ' + error.message);
  manifest = {courses: []};
}
const courses = Array.isArray(manifest.courses) ? manifest.courses : [];
if (manifest.catalogUrl !== origin + '/courses') errors.push('Manifest catalogue URL is not canonical.');
if (!courses.length) errors.push('Course manifest is empty.');

function walk(dir) {
  if (!fs.existsSync(file(dir))) return [];
  return fs.readdirSync(file(dir), {withFileTypes: true}).flatMap(entry => {
    const relative = path.posix.join(dir, entry.name);
    return entry.isDirectory() ? walk(relative) : (relative.endsWith('.mdx') ? [relative] : []);
  });
}

function docInfo(rel) {
  const content = read(rel);
  const header = /^---\r?\n([\s\S]*?)\r?\n---/.exec(content);
  if (!header) {
    errors.push(rel + ': missing MDX frontmatter.');
    return null;
  }
  const front = header[1];
  const value = name => {
    const m = new RegExp('^' + name + ':\\s*(.+)$', 'm').exec(front);
    return (m ? m[1] : '').trim().replace(/^["']|["']$/g, '');
  };
  const id = value('id');
  const slug = value('slug');
  const relative = rel.replace(/^docs\//, '').replace(/\.mdx$/, '');
  const docId = relative;
  const route = '/courses/' + (slug ? slug.replace(/^\/+/, '') : relative);
  const enrollmentId = /<EnrollmentGate\s+courseId="([^"]+)"/.exec(content)?.[1];
  return {rel, id, docId, route, title: value('title'), description: value('description'), enrollmentId, content};
}

const docs = walk('docs').map(docInfo).filter(Boolean);
const byRoute = new Map();
for (const doc of docs) {
  if (byRoute.has(doc.route)) errors.push('Duplicate course route: ' + doc.route);
  byRoute.set(doc.route, doc);
  if (!doc.id || !doc.title || !doc.description) errors.push(doc.rel + ': id, title and description are required.');
}

const ids = new Set();
const routes = new Set();
for (const course of courses) {
  const id = String(course.courseId || '').trim();
  const route = String(course.path || '').trim();
  if (!/^[A-Z0-9][A-Z0-9-]{2,30}$/.test(id)) errors.push('Invalid course ID: ' + id);
  if (ids.has(id)) errors.push('Duplicate course ID: ' + id);
  ids.add(id);
  if (!/^\/courses\/[a-z0-9][a-z0-9/-]*$/.test(route) || route.includes('//')) {
    errors.push(id + ': invalid Academy route ' + route);
  }
  if (routes.has(route)) errors.push('Duplicate manifest route: ' + route);
  routes.add(route);
  const doc = byRoute.get(route);
  if (!doc) {
    errors.push(id + ': manifest route has no matching MDX course: ' + route);
    continue;
  }
  if (course.contentAccess === 'public') {
    const registration = '/course-registration/?course=' + encodeURIComponent(id);
    if (course.releaseState !== 'pilot' || course.assessmentStatus !== 'facilitated-enquiry-only' ||
        course.registrationPath !== registration || !doc.content.includes(registration)) {
      errors.push(id + ': public pilot requires explicit status and a course-scoped registration enquiry.');
    }
    if (!index.includes("registrationPath: '" + registration + "'")) {
      errors.push(id + ': catalogue card must use the pilot enquiry route.');
    }
    if (!doc.content.includes('Public pilot') || !doc.content.includes('Independent subject review is pending')) {
      errors.push(id + ': public pilot must disclose its review and assessment limitations.');
    }
  } else if (id === 'ART-101') {
    if (!doc.content.includes('https://portal.skunkworksacademy.com/')) {
      errors.push('ART-101 public course must link to portal registration.');
    }
  } else if (doc.enrollmentId !== id) {
    errors.push(doc.rel + ': protected course must use EnrollmentGate for ' + id);
  }
  if (!sidebar.includes("'" + doc.docId + "'") && !sidebar.includes('"' + doc.docId + '"')) {
    errors.push(doc.rel + ': course missing from Docusaurus sidebar navigation.');
  }
  if (!index.includes("courseId: '" + id + "'") || !index.includes("route: '" + route + "'")) {
    errors.push(id + ': published catalogue must expose course ID and canonical route.');
  }
}

for (const doc of docs) {
  if (routes.has(doc.route)) continue;
  // Individual lesson routes inherit the registered parent course ID.
  // They must still be enrolment-gated and discoverable in the course sidebar.
  const parent = courses.find(course => doc.route.startsWith(course.path + '/'));
  if (parent) {
    if (parent.contentAccess === 'public') {
      if (!doc.content.includes(parent.registrationPath) || !doc.content.includes('RoleCourseNav')) {
        errors.push(doc.rel + ': public module needs parent navigation and scoped registration enquiry.');
      }
    } else if (doc.enrollmentId !== parent.courseId) {
      errors.push(doc.rel + ': module must use parent EnrollmentGate for ' + parent.courseId);
    }
    if (!sidebar.includes("'" + doc.docId + "'") && !sidebar.includes('"' + doc.docId + '"')) {
      errors.push(doc.rel + ': lesson missing from Docusaurus course sidebar.');
    }
    continue;
  }
  // A resource pack is a subpage of the publicly catalogued ART-101 course.
  const isArtResource = doc.rel === 'docs/professional-articulation-resources.mdx'
    && doc.enrollmentId === 'ART-101';
  if (!isArtResource) errors.push(doc.rel + ': every course requires a manifest entry and catalogue navigation.');
  else if (!sidebar.includes("'professional-articulation-resources'")) {
    errors.push('ART-101 resource pack must be navigable from the sidebar.');
  }
}

for (const marker of [
  "url: '" + origin + "'",
  "routeBasePath: 'courses'",
  'academy-navigation.js',
  'skunkworks-ui.js',
  'skunkworks-footer.js',
  'data-skunkworks-global-nav',
  "portalEnrollUrl: 'https://portal.skunkworksacademy.com/checkout/'",
  "portalSignInUrl: 'https://portal.skunkworksacademy.com/signin'",
  'sitemap: {'
]) if (!config.includes(marker)) errors.push('Docusaurus config missing publication contract: ' + marker);
if (!navbar.includes('return null') || !footer.includes('return null')) {
  errors.push('Local Navbar/Footer must be suppressed so the Academy global shell is unique.');
}
if (!brand.includes(":root {") || !brand.includes("[data-theme='dark']")) {
  errors.push('Course CSS must include light and dark Academy design token mappings.');
}
for (const marker of [
  'courseId', 'returnUrl', 'portalEnrollUrl', 'portalSignInUrl',
  "credentials: 'include'", "state === 'allowed'"
]) if (!gate.includes(marker)) errors.push('Registration/access gate missing: ' + marker);

const buildAt = process.argv.indexOf('--build');
if (buildAt !== -1) {
  const buildDir = process.argv[buildAt + 1];
  if (!buildDir) errors.push('--build requires an output directory');
  else {
    const buildRoot = path.resolve(buildDir);
    const sitemapPath = path.join(buildRoot, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      errors.push('Docusaurus sitemap.xml missing from build.');
    } else {
      const sitemap = fs.readFileSync(sitemapPath, 'utf8').replaceAll('&amp;', '&');
      // Validate every lesson route, not only manifested course overviews.
      const publishedPages = docs.map(doc => ({courseId: doc.id, path: doc.route}));
      for (const course of publishedPages) {
        const canonical = origin + course.path;
        if (!sitemap.includes('<loc>' + canonical + '</loc>')) {
          errors.push(course.courseId + ': canonical course URL missing from generated sitemap: ' + canonical);
        }
        const relative = course.path.replace(/^\/+/, '');
        const candidates = [
          path.join(buildRoot, relative + '.html'),
          path.join(buildRoot, relative, 'index.html')
        ];
        const existing = candidates.find(fs.existsSync);
        if (!existing) {
          errors.push(course.courseId + ': course not present in built artifact: ' + course.path);
          continue;
        }
        const html = fs.readFileSync(existing, 'utf8');
        if (!html.includes('academy-navigation.js')) errors.push(course.courseId + ': shared Academy shell loader missing.');
        if (!html.includes('rel="canonical"') || !html.includes(canonical)) {
          errors.push(course.courseId + ': canonical URL missing from rendered HTML.');
        }
      }
    }
  }
}

if (errors.length) {
  console.error('Course publication contract failed (' + errors.length + ' issue(s)):');
  for (const error of errors) console.error(' - ' + error);
  process.exit(1);
}
console.log('Course publication contract passed for ' + courses.length + ' canonical Academy courses, including registration, navigation, theme, and ' + (buildAt === -1 ? 'source' : 'rendered sitemap') + ' checks.');
