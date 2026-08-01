import {existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import {join} from 'node:path';

const root = process.cwd();
const require = createRequire(import.meta.url);
const catalogPath = join(root, 'data/generated-courses.cjs');
const requiredFiles = [catalogPath, join(root, 'plugins/generated-course-pages/index.js'), join(root, 'src/components/GeneratedCoursePage.tsx'), join(root, 'src/components/GeneratedCoursePage.module.css')];
const errors = [];
for (const file of requiredFiles) if (!existsSync(file)) errors.push(`Missing generated-catalog file: ${file.replace(`${root}/`, '')}`);

if (existsSync(catalogPath)) {
  delete require.cache[require.resolve(catalogPath)];
  const catalog = require(catalogPath);
  if (catalog.schema !== 'skunkworks-academy/generated-course-catalog/v1') errors.push('Unexpected generated-course catalog schema.');
  if (!Array.isArray(catalog.fields) || !Array.isArray(catalog.courses)) errors.push('Generated catalogue fields and courses must be arrays.');
  const courses = Array.isArray(catalog.courses) ? catalog.courses : [];
  if (courses.length !== 176) errors.push(`Expected 176 generated courses, found ${courses.length}.`);
  const requiredFields = ['courseId', 'title', 'slug', 'deliveryMode', 'category', 'level', 'estimatedEffort', 'sourcePath'];
  for (const field of requiredFields) if (!catalog.fields?.includes(field)) errors.push(`Missing catalogue field: ${field}.`);
  const fieldIndex = Object.fromEntries((catalog.fields || []).map((field, index) => [field, index]));
  const codes = new Set();
  const slugs = new Set();
  const allowedModes = new Set(['Self-Paced', 'Instructor-led']);
  const allowedLevels = new Set(['Beginner', 'Intermediate', 'Advanced']);
  for (const [index, row] of courses.entries()) {
    const label = `Course ${index + 1}`;
    const value = (field) => row[fieldIndex[field]];
    if (row.length !== catalog.fields.length) errors.push(`${label}: field count mismatch.`);
    for (const field of requiredFields) if (!value(field)) errors.push(`${label}: missing ${field}.`);
    if (codes.has(value('courseId'))) errors.push(`${label}: duplicate courseId ${value('courseId')}.`);
    if (slugs.has(value('slug'))) errors.push(`${label}: duplicate slug ${value('slug')}.`);
    codes.add(value('courseId'));
    slugs.add(value('slug'));
    if (!allowedModes.has(value('deliveryMode'))) errors.push(`${label}: invalid deliveryMode ${value('deliveryMode')}.`);
    if (!allowedLevels.has(value('level'))) errors.push(`${label}: invalid level ${value('level')}.`);
  }
}

if (errors.length) {
  console.error('Generated course catalogue validation failed.');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Generated course catalogue validation passed for 176 courses.');
