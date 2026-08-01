const path = require('node:path');

function audienceFor(category, level) {
  const audiences = {
    'AI & Emerging Technology': 'business leaders, analysts, developers, educators and solution practitioners',
    'Application Development': 'software developers, technical leads, testers and solution architects',
    'Automation & Business Rules': 'automation developers, business analysts, process owners and platform administrators',
    'Communications & VoIP': 'voice engineers, PBX administrators, network engineers and support specialists',
    'Cloud, DevOps & Project Delivery': 'cloud engineers, DevOps practitioners, project professionals and solution architects',
    Cybersecurity: 'security analysts, administrators, developers, auditors and incident responders',
    'CompTIA Certification': 'certification candidates and early-to-mid-career IT professionals',
    'Microsoft Technologies': 'Microsoft administrators, consultants, support engineers and technical decision-makers',
    'IBM Technologies': 'IBM platform administrators, developers, architects, operators and technical sellers',
    'SAP, Data & Databases': 'data engineers, database administrators, analysts, SAP practitioners and solution teams',
    'Professional & Business Skills': 'professionals, graduates, managers, team leaders and corporate cohorts',
    'Networking & Vendor Certification': 'network engineers, collaboration administrators and certification candidates',
    'Governance, Risk & Compliance': 'auditors, implementers, risk managers, compliance teams and management-system owners',
    Finance: 'finance professionals, accountants, auditors and reporting specialists',
    'Creative Technology': 'designers, marketers, content creators and digital production teams',
  };
  const prefix = {Beginner: 'Entry-level and transitioning', Intermediate: 'Practising', Advanced: 'Experienced'}[level] || 'Practising';
  return `${prefix} ${audiences[category] || 'professionals and technical practitioners'}.`;
}

function prerequisitesFor(category, level) {
  const base = {
    Beginner: 'No formal prerequisite. Basic digital literacy and willingness to complete practical work are expected.',
    Intermediate: 'Foundational knowledge of the subject area and routine computer administration or professional experience are recommended.',
    Advanced: 'Substantial hands-on experience in the subject area, access to an approved lab environment and familiarity with architecture, security and troubleshooting are recommended.',
  }[level];
  if (category === 'CompTIA Certification') return `${base} Confirm the latest official CompTIA exam objectives before delivery or exam preparation.`;
  if (category === 'Governance, Risk & Compliance') return `${base} Access to the applicable standard or an authorised licensed copy is required for formal implementation or audit work.`;
  if (category === 'Finance') return `${base} Familiarity with financial statements and accounting terminology is recommended.`;
  return base;
}

function normaliseCourse(fields, row) {
  const source = Object.fromEntries(fields.map((field, index) => [field, row[index]]));
  const descriptionLead = source.deliveryMode === 'Self-Paced' ? 'A structured self-paced learning journey' : 'A facilitator-led practical course';
  return {
    ...source,
    path: `/course-catalog/courses/catalog/${source.slug}`,
    route: `/courses/catalog/${source.slug}`,
    description: `${descriptionLead} that develops applied capability in ${source.title}, with guided theory, scenario work, practical labs, formative assessment and an Evidence of Capability Record.`,
    audience: audienceFor(source.category, source.level),
    prerequisites: prerequisitesFor(source.category, source.level),
    contentStatus: 'Generated foundation curriculum — subject-matter review required before formal accreditation or certification claims.',
    sourceMetadata: {sourcePath: source.sourcePath, titleBasis: source.titleBasis, reviewStatus: source.reviewStatus, matchingSourceRecords: source.matchingSourceRecords},
  };
}

module.exports = function generatedCoursePagesPlugin(context) {
  return {
    name: 'skunkworks-academy-generated-course-pages',
    async loadContent() {
      const catalogPath = path.join(context.siteDir, 'data', 'generated-courses.cjs');
      delete require.cache[require.resolve(catalogPath)];
      const catalog = require(catalogPath);
      return catalog.courses.map((row) => normaliseCourse(catalog.fields, row));
    },
    async contentLoaded({content, actions}) {
      const {createData, addRoute, setGlobalData} = actions;
      setGlobalData({courses: content.map((course) => ({courseId: course.courseId, title: course.title, deliveryMode: course.deliveryMode, category: course.category, level: course.level, estimatedEffort: course.estimatedEffort, description: course.description, route: course.route, contentStatus: 'Generated foundation curriculum'}))});
      for (const course of content) {
        const dataPath = await createData(`generated-course-${course.slug}.json`, JSON.stringify(course));
        addRoute({
          path: `${context.baseUrl}courses/catalog/${course.slug}`.replace(/\/+/g, '/'),
          component: '@site/src/components/GeneratedCoursePage.tsx',
          modules: {course: dataPath},
          exact: true,
          priority: 20,
          metadata: {sourceFilePath: 'data/generated-courses.cjs', lastUpdatedAt: Date.parse('2026-07-27T00:00:00Z')},
        });
      }
    },
  };
};
