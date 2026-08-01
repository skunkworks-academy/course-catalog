import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const courses = [
  {file: 'docs/python-certification-prep.mdx', id: 'PYE-101', minimumModules: 8, minimumLabs: 5},
  {file: 'docs/easyfile-domain-setup.mdx', id: 'EFL-DOM-101', minimumModules: 8, minimumLabs: 5},
  {file: 'docs/data-outlier-analysis.mdx', id: 'DAT-OUT-101', minimumModules: 8, minimumLabs: 5},
  {file: 'docs/shopify-user-permissions.mdx', id: 'SHP-UPA-101', minimumModules: 7, minimumLabs: 3},
  {file: 'docs/github-pages-setup.mdx', id: 'GHP-DOM-101', minimumModules: 7, minimumLabs: 3},
  {file: 'docs/microsoft-365-licenses.mdx', id: 'M365-LIC-101', minimumModules: 8, minimumLabs: 4},
  {file: 'docs/professional-articulation.mdx', id: 'ART-101', minimumModules: 12, minimumLabs: 8},
];

const requiredFiles = [
  'package.json',
  'docusaurus.config.ts',
  'sidebars.ts',
  'src/pages/index.tsx',
  'src/components/EnrollmentGate.tsx',
  'src/components/EvidenceRecord.tsx',
  'src/components/KnowledgeCheck.tsx',
  'src/components/PracticeStudio.tsx',
  'static/course-manifest.json',
  'docs/professional-articulation-resources.mdx',
  'static/downloads/art-101/art-101-learner-workbook.md',
  'static/downloads/art-101/art-101-presentation-planning-template.md',
  'static/downloads/art-101/art-101-reviewer-scorecard.csv',
  'static/downloads/art-101/art-101-90-day-development-plan.md',
  'static/downloads/art-101/art-101-assessor-moderation-guide.md',
  'static/downloads/art-101/art-101-corporate-implementation-checklist.md',
  ...courses.map((course) => course.file),
];

const errors = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing required file: ${file}`);
}

for (const course of courses) {
  const path = join(root, course.file);
  if (!existsSync(path)) continue;
  const content = readFileSync(path, 'utf8');
  const moduleCount = (content.match(/^## Module /gm) || []).length;
  const labCount = (content.match(/^## Practical Lab /gm) || []).length;

  if (!content.includes(`courseId="${course.id}"`)) errors.push(`${course.file}: missing course ID ${course.id}`);
  if (!content.includes('<EnrollmentGate')) errors.push(`${course.file}: content is not wrapped in EnrollmentGate`);
  if (!content.includes('<EvidenceRecord')) errors.push(`${course.file}: evidence-of-capability record is missing`);
  if (!content.includes('<KnowledgeCheck')) errors.push(`${course.file}: interactive knowledge check is missing`);
  if (!/^#{2,4} Assessment rubric$/m.test(content)) errors.push(`${course.file}: assessment rubric is missing`);
  if (!content.includes('## Official reference set')) errors.push(`${course.file}: official reference set is missing`);
  if (moduleCount < course.minimumModules) errors.push(`${course.file}: expected at least ${course.minimumModules} modules, found ${moduleCount}`);
  if (labCount < course.minimumLabs) errors.push(`${course.file}: expected at least ${course.minimumLabs} practical labs, found ${labCount}`);
}

const articulationPath = join(root, 'docs/professional-articulation.mdx');
if (existsSync(articulationPath)) {
  const articulation = readFileSync(articulationPath, 'utf8');
  for (const marker of ['<PracticeStudio', '## Capstone — Executive communication portfolio', '## Moderation checklist', '## Corporate deployment guide']) {
    if (!articulation.includes(marker)) errors.push(`ART-101 is missing production marker: ${marker}`);
  }
}

const resourcePath = join(root, 'docs/professional-articulation-resources.mdx');
if (existsSync(resourcePath)) {
  const resources = readFileSync(resourcePath, 'utf8');
  for (const marker of ['art-101-learner-workbook.md', 'art-101-reviewer-scorecard.csv', 'art-101-assessor-moderation-guide.md']) {
    if (!resources.includes(marker)) errors.push(`ART-101 resource page is missing link: ${marker}`);
  }
}

const gatePath = join(root, 'src/components/EnrollmentGate.tsx');
if (existsSync(gatePath)) {
  const gate = readFileSync(gatePath, 'utf8');
  for (const marker of ['credentials: \'include\'', 'Authorization', "state === 'allowed'", 'Course content remains locked']) {
    if (!gate.includes(marker)) errors.push(`EnrollmentGate is missing security marker: ${marker}`);
  }
}

if (errors.length) {
  console.error('Course catalogue validation failed.');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Course catalogue validation passed for ${courses.length} courses.`);
