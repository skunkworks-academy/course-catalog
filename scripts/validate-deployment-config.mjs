import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const errors = [];
const expectedOrigin = 'https://catalog.skunkworksacademy.com';
const configPath = join(root, 'docusaurus.config.ts');
const cnamePath = join(root, 'static', 'CNAME');
const manifestPath = join(root, 'static', 'course-manifest.json');
const config = readFileSync(configPath, 'utf8');

if (!config.includes(`url: '${expectedOrigin}'`)) {
  errors.push(`Docusaurus url must be ${expectedOrigin}.`);
}
if (!config.includes("baseUrl: '/',")) {
  errors.push('Docusaurus baseUrl must be root (/) for the custom domain.');
}
if (config.includes("baseUrl: '/course-catalog/'")) {
  errors.push('The legacy /course-catalog/ baseUrl must not be used by the custom-domain build.');
}
if (!existsSync(cnamePath)) {
  errors.push('Missing static/CNAME; GitHub Pages cannot retain the custom-domain declaration.');
} else if (readFileSync(cnamePath, 'utf8').trim() !== 'catalog.skunkworksacademy.com') {
  errors.push('static/CNAME must contain catalog.skunkworksacademy.com.');
}

try {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (manifest.catalogUrl !== `${expectedOrigin}/`) {
    errors.push(`course-manifest catalogUrl must be ${expectedOrigin}/.`);
  }
  for (const course of manifest.courses || []) {
    if (typeof course.path === 'string' && course.path.startsWith('/') && !course.path.startsWith('/courses/')) {
      errors.push(`Manifest path for ${course.courseId || 'a course'} must start with /courses/.`);
    }
  }
} catch (error) {
  errors.push(`Could not validate course manifest: ${(error instanceof Error ? error.message : String(error))}`);
}

if (errors.length) {
  console.error('Custom-domain deployment validation failed.');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Custom-domain deployment configuration validation passed.');
