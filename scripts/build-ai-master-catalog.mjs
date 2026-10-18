import {readFileSync, writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {resolve, dirname} from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const catalog = require(resolve(root, 'data/generated-courses.cjs'));
const additions = JSON.parse(readFileSync(resolve(root, 'data/ai-curated-additions.json'), 'utf8'));
const target = resolve(root, 'static/ai-master-catalog.json');
const extraAI = new Set(['SWA-APP-009', 'SWA-SEC-013', 'SWA-IBM-026']);
const possibleDuplicates = {
  'SWA-AI-003': 'ai-fundamentals',
  'SWA-AI-004': 'ai-fundamentals',
  'SWA-AI-008': 'ai-personal-data',
  'SWA-AI-013': 'ai-personal-data',
  'SWA-AI-009': 'prompt-engineering-compare',
  'SWA-AI-014': 'prompt-engineering-compare',
};
if (catalog.schema !== 'skunkworks-academy/generated-course-catalog/v1') throw new Error('Unexpected generated catalogue schema');
if (additions.schema !== 'skunkworks-academy/ai-curated-additions/v1') throw new Error('Unexpected curated additions schema');
const rows = catalog.courses.map(row => Object.fromEntries(catalog.fields.map((field, i) => [field, row[i]])));
const generated = rows.filter(course => course.category === 'AI & Emerging Technology' || extraAI.has(course.courseId)).map(course => ({
  id: course.courseId,
  courseCode: course.courseId,
  title: course.title,
  category: course.category,
  level: course.level,
  deliveryMode: course.deliveryMode,
  duration: course.estimatedEffort,
  kind: 'generated-foundation',
  reviewStatus: course.reviewStatus === 'Review recommended' ? 'source-and-curriculum-review-required' : 'foundation-curriculum-review-required',
  availability: 'source-present-live-unverified',
  overviewUrl: 'https://www.skunkworksacademy.com/courses/catalog/' + course.slug,
  sourceUrl: 'https://github.com/skunkworks-academy/course-catalog/blob/main/data/generated-courses.cjs',
  enrolmentStatus: 'enquiry-only',
  ...(possibleDuplicates[course.courseId] ? {possibleDuplicateGroup: possibleDuplicates[course.courseId]} : {})
}));
const courses = [...generated, ...additions.courses];
const ids = new Set();
for (const course of courses) {
  for (const key of ['id', 'title', 'category', 'level', 'deliveryMode', 'kind', 'reviewStatus', 'availability', 'sourceUrl', 'overviewUrl', 'enrolmentStatus']) {
    if (!course[key]) throw new Error(course.id + ': missing ' + key);
  }
  if (ids.has(course.id)) throw new Error('Duplicate AI course identifier: ' + course.id);
  ids.add(course.id);
  if (course.checkoutUrl && course.enrolmentStatus !== 'portal-allowlisted') throw new Error('Unreviewed course has a checkout URL: ' + course.id);
}
if (generated.length !== 19 || additions.courses.length !== 7) throw new Error('Unexpected AI catalogue counts: ' + generated.length + ' + ' + additions.courses.length);
const master = {
  schema: 'skunkworks-academy/ai-master-catalog/v1',
  generatedOn: '2026-10-18',
  authoritativeRepository: 'skunkworks-academy/course-catalog',
  dataPolicy: 'Discovery entries, not publication, enrolment or accreditation approvals. Only portal-allowlisted entries may expose checkout.',
  summary: {generated: generated.length, curated: additions.courses.length, total: courses.length},
  courses,
  resources: additions.resources
};
const expected = JSON.stringify(master, null, 2) + '\n';
if (process.argv.includes('--write')) {
  writeFileSync(target, expected);
  console.log('Wrote AI master catalogue (' + courses.length + ' records)');
} else {
  const actual = readFileSync(target, 'utf8');
  if (actual !== expected) throw new Error('AI master catalogue is stale. Run npm run generate:ai-catalog and commit the result.');
  console.log('AI master catalogue validated (' + courses.length + ' records, no unapproved checkout links)');
}
