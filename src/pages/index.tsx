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
  route: string;
}

const establishedCourses: CatalogCourse[] = [
  {courseId: 'ART-101', title: 'Professional Articulation and Executive Communication', deliveryMode: 'Self-Paced', category: 'Professional & Business Skills', level: 'Foundation to advanced', estimatedEffort: '36–40 hours', description: 'Build clear speech, executive presence, business storytelling, interview, meeting and presentation capability through recorded practice and moderated evidence.', route: '/courses/professional-articulation'},
  {courseId: 'SHP-UPA-101', title: 'Shopify User Permissions', deliveryMode: 'Self-Paced', category: 'Commerce Administration', level: 'Beginner to intermediate', estimatedEffort: '4–6 hours', description: 'Design least-privilege Shopify staff roles, separate duties, review access and produce an auditable permission baseline.', route: '/courses/shopify-user-permissions'},
  {courseId: 'GHP-DOM-101', title: 'GitHub Pages Setup', deliveryMode: 'Self-Paced', category: 'Web Deployment', level: 'Beginner to intermediate', estimatedEffort: '5–7 hours', description: 'Publish a production-ready GitHub Pages site with Actions, custom-domain verification, HTTPS and deployment validation.', route: '/courses/github-pages-setup'},
  {courseId: 'M365-LIC-101', title: 'Microsoft 365 Licenses', deliveryMode: 'Self-Paced', category: 'Microsoft Technologies', level: 'Intermediate', estimatedEffort: '5–8 hours', description: 'Administer Microsoft 365 licence allocation, group-based assignment, billing controls and governance evidence.', route: '/courses/microsoft-365-licenses'},
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
        <p>Explore {courses.length} structured learning journeys across technology, security, cloud, data, communications, governance and professional capability.</p>
        <div className="heroActions"><a className="heroButton heroButtonPrimary" href="#courses">Explore courses</a><a className="heroButton" href="https://portal.skunkworksacademy.com/">Learner sign in</a><a className="heroButton" href="https://www.skunkworksacademy.com/self-paced/">Self-paced catalogue</a><a className="heroButton" href="https://www.skunkworksacademy.com/instructor-led/">Instructor-led catalogue</a></div>
      </div></header>
      <main className="catalogSection" id="courses"><div className="container">
        <div className="catalogHeader"><p className="eyebrow">Controlled learning access</p><h2>Public overviews, enrolment-gated learning content</h2><p>Course summaries are public. Modules, labs, assessments and evidence tools are released only after the portal confirms an authenticated learner and active enrolment.</p></div>
        <section className={styles.filters} aria-label="Course catalogue filters">
          <label>Search<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Course title, code, category or keyword" /></label>
          <label>Delivery<select value={deliveryMode} onChange={(event) => setDeliveryMode(event.target.value)}><option>All</option><option>Self-Paced</option><option>Instructor-led</option></select></label>
          <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Difficulty<select value={level} onChange={(event) => setLevel(event.target.value)}><option>All</option>{levels.map((item) => <option key={item}>{item}</option>)}</select></label>
        </section>
        <p className={styles.resultCount}><strong>{visibleCourses.length}</strong> courses match the selected filters.</p>
        <div className="courseGrid">{visibleCourses.map((course) => <article className="courseCard" key={course.courseId}>
          <p className="eyebrow">{course.courseId} · {course.deliveryMode}</p><h2>{course.title}</h2><div className="courseMeta">{course.category} · {course.level} · {course.estimatedEffort}</div><p>{course.description}</p>
          <ul><li>Structured theory and guided practice</li><li>Scenario-based practical labs</li><li>Assessment and Evidence of Capability Record</li></ul>
          <div className="courseCardActions"><Link className="cardButton cardButtonPrimary" to={course.route}>Open course</Link><a className="cardButton" href={`https://portal.skunkworksacademy.com/checkout/?courseId=${encodeURIComponent(course.courseId)}`}>Register or enrol</a></div>
        </article>)}</div>
        {!visibleCourses.length && <div className={styles.emptyState}>No courses match these filters. Clear one or more filters and try again.</div>}
      </div></main>
    </Layout>
  );
}
