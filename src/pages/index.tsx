import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './index.module.css';

interface CatalogCourse {
  courseId: string;
  title: string;
  deliveryMode: 'Self-Paced' | 'Instructor-led';
  category: string;
  level: string;
  estimatedEffort: string;
  description: string;
  route?: string;
  externalUrl?: string;
  contentStatus: 'Production curriculum' | 'Generated foundation curriculum' | 'Existing Academy course';
}

const establishedCourses: CatalogCourse[] = [
  {courseId: 'PYE-101', title: 'Python Certification Preparation', deliveryMode: 'Self-Paced', category: 'Software Development', level: 'Beginner to entry-level', estimatedEffort: '30–36 hours', description: 'Build Python fundamentals through deliberate coding practice, debugging, timed mock tasks and an evidence-led capstone.', route: '/courses/python-certification-prep', contentStatus: 'Production curriculum'},
  {courseId: 'EFL-DOM-101', title: 'EasyFile Domain Setup and Production Launch', deliveryMode: 'Self-Paced', category: 'Web Deployment', level: 'Intermediate', estimatedEffort: '22–28 hours', description: 'Plan, verify, secure and operate an EasyFile launch with DNS, TLS, email, user-journey, monitoring and rollback controls.', route: '/courses/easyfile-domain-setup', contentStatus: 'Production curriculum'},
  {courseId: 'DAT-OUT-101', title: 'Understanding Outliers in Data Files', deliveryMode: 'Self-Paced', category: 'Data Analytics', level: 'Foundation to intermediate', estimatedEffort: '24–30 hours', description: 'Find, investigate and explain potential outliers in data files using robust statistics, visual analysis and governed evidence.', route: '/courses/data-outlier-analysis', contentStatus: 'Production curriculum'},
  {courseId: 'ART-101', title: 'Professional Articulation and Executive Communication', deliveryMode: 'Self-Paced', category: 'Professional & Business Skills', level: 'Foundation to advanced', estimatedEffort: '36–40 hours', description: 'Build clear speech, executive presence, business storytelling, interview, meeting and presentation capability through recorded practice and moderated evidence.', route: '/courses/professional-articulation', contentStatus: 'Production curriculum'},
  {courseId: 'SHP-UPA-101', title: 'Shopify User Permissions', deliveryMode: 'Self-Paced', category: 'Commerce Administration', level: 'Beginner to intermediate', estimatedEffort: '4–6 hours', description: 'Design least-privilege Shopify staff roles, separate duties, review access and produce an auditable permission baseline.', route: '/courses/shopify-user-permissions', contentStatus: 'Production curriculum'},
  {courseId: 'GHP-DOM-101', title: 'GitHub Pages Setup', deliveryMode: 'Self-Paced', category: 'Web Deployment', level: 'Beginner to intermediate', estimatedEffort: '5–7 hours', description: 'Publish a production-ready GitHub Pages site with Actions, custom-domain verification, HTTPS and deployment validation.', route: '/courses/github-pages-setup', contentStatus: 'Production curriculum'},
  {courseId: 'M365-LIC-101', title: 'Microsoft 365 Licenses', deliveryMode: 'Self-Paced', category: 'Microsoft Technologies', level: 'Intermediate', estimatedEffort: '5–8 hours', description: 'Administer Microsoft 365 licence allocation, group-based assignment, billing controls and governance evidence.', route: '/courses/microsoft-365-licenses', contentStatus: 'Production curriculum'},
  {courseId: 'JSON-UI-101', title: 'JSON Course and Self-Paced Course Interface Design', deliveryMode: 'Self-Paced', category: 'Application Development', level: 'Not specified', estimatedEffort: 'Not specified', description: 'Existing Academy course destination for JSON learning content and self-paced course interface design.', externalUrl: 'https://www.skunkworksacademy.com/self-paced/json-course-interface-design/', contentStatus: 'Existing Academy course'},
  {courseId: 'MDB-SP-101', title: 'MongoDB Self-Paced Technical Course', deliveryMode: 'Self-Paced', category: 'SAP, Data & Databases', level: 'Not specified', estimatedEffort: 'Not specified', description: 'Existing Academy course destination for MongoDB technical learning.', externalUrl: 'https://www.skunkworksacademy.com/self-paced/mongodb-self-paced-technical-course/', contentStatus: 'Existing Academy course'},
];

export default function Home(): React.JSX.Element {
  const pluginData = usePluginData('skunkworks-academy-generated-course-pages') as {courses: CatalogCourse[]};
  const courses = useMemo(() => [...establishedCourses, ...(pluginData.courses || [])], [pluginData.courses]);
  const [query, setQuery] = useState('');
  const [deliveryMode, setDeliveryMode] = useState('All');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const categories = useMemo(() => [...new Set(courses.map((course) => course.category))].sort(), [courses]);
  const levels = useMemo(() => [...new Set(courses.map((course) => course.level))].sort(), [courses]);
  const visibleCourses = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery = !needle || `${course.courseId} ${course.title} ${course.category} ${course.description}`.toLowerCase().includes(needle);
      return matchesQuery && (deliveryMode === 'All' || course.deliveryMode === deliveryMode) && (category === 'All' || course.category === category) && (level === 'All' || course.level === level);
    });
  }, [courses, query, deliveryMode, category, level]);

  return (
    <Layout title="Course catalogue" description="Evidence-led self-paced and instructor-led Skunkworks Academy courses with controlled learner access.">
      <header className="heroBanner"><div className="container">
        <p className="eyebrow">Skunkworks Academy course catalogue</p><h1>Learn it. Practise it. Prove it.</h1>
        <p>Explore {courses.length} unique learning journeys across technology, security, cloud, data, communications, governance and professional capability.</p>
        <div className="heroActions"><a className="heroButton heroButtonPrimary" href="#courses">Explore courses</a><a className="heroButton" href="https://portal.skunkworksacademy.com/">Learner sign in</a><a className="heroButton" href="https://www.skunkworksacademy.com/self-paced/">Self-paced catalogue</a><a className="heroButton" href="https://www.skunkworksacademy.com/instructor-led/">Instructor-led catalogue</a></div>
      </div></header>
      <main className="catalogSection" id="courses"><div className="container">
        <div className="catalogHeader"><p className="eyebrow">Controlled learning access</p><h2>Public overviews, enrolment-gated learning content</h2><p>Course summaries are public. Modules, labs, assessments and evidence tools are released only after the portal confirms an authenticated learner and active enrolment. Generated foundations are clearly labelled for subject-matter review.</p></div>
        <section className={styles.filters} aria-label="Course catalogue filters">
          <label>Search<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Course title, code, category or keyword" /></label>
          <label>Delivery<select value={deliveryMode} onChange={(event) => setDeliveryMode(event.target.value)}><option>All</option><option>Self-Paced</option><option>Instructor-led</option></select></label>
          <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Difficulty<select value={level} onChange={(event) => setLevel(event.target.value)}><option>All</option>{levels.map((item) => <option key={item}>{item}</option>)}</select></label>
        </section>
        <p className={styles.resultCount}><strong>{visibleCourses.length}</strong> courses match the selected filters.</p>
        <div className="courseGrid">{visibleCourses.map((course) => <article className="courseCard" key={course.courseId}>
          <p className="eyebrow">{course.courseId} · {course.deliveryMode}</p><h2>{course.title}</h2><div className="courseMeta">{course.category} · {course.level} · {course.estimatedEffort}</div><p>{course.description}</p>
          <p className={styles.contentStatus}>{course.contentStatus}</p>
          <ul><li>Structured theory and guided practice</li><li>Scenario-based practical labs</li><li>Assessment and Evidence of Capability Record</li></ul>
          <div className="courseCardActions">{course.externalUrl ? <a className="cardButton cardButtonPrimary" href={course.externalUrl}>Open course</a> : <Link className="cardButton cardButtonPrimary" to={course.route!}>Open course</Link>}<a className="cardButton" href={`https://portal.skunkworksacademy.com/checkout/?courseId=${encodeURIComponent(course.courseId)}`}>Register or enrol</a></div>
        </article>)}</div>
        {!visibleCourses.length && <div className={styles.emptyState}>No courses match these filters. Clear one or more filters and try again.</div>}
      </div></main>
    </Layout>
  );
}
