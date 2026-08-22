import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const errors = [];
const expectedOrigin = 'https://www.skunkworksacademy.com';
const expectedCatalogUrl = `${expectedOrigin}/courses`;
const configPath = join(root, 'docusaurus.config.ts');
const cnamePath = join(root, 'static', 'CNAME');
const manifestPath = join(root, 'static', 'course-manifest.json');
const config = readFileSync(configPath, 'utf8');

if (!config.includes(`url: '${expectedOrigin}'`)) {
  errors.push(`Docusaurus url must be ${expectedOrigin}.`);
}
if (!config.includes("baseUrl: '/',")) {
  errors.push('Docusaurus baseUrl must remain root (/) because /courses is a route published by the www repository.');
}
if (!config.includes("routeBasePath: 'courses'")) {
  errors.push('Docs routeBasePath must remain courses so course pages publish below /courses/.');
}
if (existsSync(cnamePath)) {
  errors.push('static/CNAME must not exist; the course-catalog repository no longer owns a standalone custom domain.');
}

try {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (manifest.catalogUrl !== expectedCatalogUrl) {
    errors.push(`course-manifest catalogUrl must be ${expectedCatalogUrl}.`);
  }
  for (const course of manifest.courses || []) {
    if (typeof course.path === 'string' && !course.path.startsWith('/courses/')) {
      errors.push(`Manifest path for ${course.courseId || 'a course'} must start with /courses/.`);
    }
  }
} catch (error) {
  errors.push(`Could not validate course manifest: ${(error instanceof Error ? error.message : String(error))}`);
}

if (errors.length) {
  console.error('Academy /courses deployment validation failed.');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Academy /courses deployment configuration validation passed.');
