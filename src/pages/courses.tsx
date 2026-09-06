import React, {useMemo, useState} from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './courses.module.css';

type CourseType = {
  name: string;
  summary: string;
  bestFor: string;
  elements: string[];
};

type CatalogCourse = {
  courseId: string;
  title: string;
  deliveryMode: string;
  category: string;
  level: string;
  estimatedEffort: string;
  description: string;
  route: string;
  contentStatus?: string;
  source?: 'published' | 'generated';
};

type GeneratedPluginData = {
  courses?: CatalogCourse[];
};

const courseTypes: CourseType[] = [
  {
    name: 'Self-Paced Courses',
    summary: 'Learners progress on their own schedule with no fixed class times or cohort deadlines.',
    bestFor: 'Busy professionals, foundational skills and evergreen technical learning.',
    elements: ['Video and reading lessons', 'Quizzes and knowledge checks', 'Hands-on labs', 'Certificates and evidence of capability'],
  },
  {
    name: 'Instructor-Led Courses',
    summary: 'Scheduled live delivery with an instructor, fixed dates and structured facilitation through Teams, Zoom or an equivalent classroom platform.',
    bestFor: 'Complex topics, guided practice, enterprise enablement and learners who benefit from live support.',
    elements: ['Live lectures and demonstrations', 'Q&A and guided troubleshooting', 'Assignments and practical exercises', 'Attendance and completion tracking'],
  },
  {
    name: 'Hybrid / Blended Courses',
    summary: 'A structured mix of asynchronous learning and scheduled live sessions, allowing learners to prepare before applied workshops.',
    bestFor: 'Professional certifications, deep technical training and programmes that combine theory with coached practice.',
    elements: ['Pre-work and self-study', 'Live workshops', 'Technical labs', 'Assessments and feedback checkpoints'],
  },
  {
    name: 'Microlearning Courses',
    summary: 'Short, focused learning units designed to build or refresh one capability at a time, typically in five to fifteen minutes.',
    bestFor: 'Productivity skills, just-in-time learning, quick upskilling and mobile-first delivery.',
    elements: ['Bite-sized lessons', 'Flashcards and recall prompts', 'Mini-quizzes', 'Short demonstrations and job aids'],
  },
  {
    name: 'Bootcamps',
    summary: 'Intensive accelerated programmes delivered over days or weeks with a strong emphasis on applied outcomes.',
    bestFor: 'Career transitions, rapid technical upskilling and job-ready capability development.',
    elements: ['Applied projects', 'Mentorship and coaching', 'Structured practice', 'Capstone assessment'],
  },
  {
    name: 'MOOCs',
    summary: 'Large-scale online courses designed to serve broad learner populations with repeatable digital delivery.',
    bestFor: 'Broad audiences, open learning initiatives and academic-style foundational learning.',
    elements: ['Video lectures', 'Peer discussion', 'Automated grading', 'Scalable digital learning resources'],
  },
  {
    name: 'Certification Prep Courses',
    summary: 'Exam-aligned learning focused on the knowledge domains, practical skills and assessment techniques required for an industry credential.',
    bestFor: 'Career advancement, vendor certification pathways and formal credential preparation.',
    elements: ['Exam-objective mapping', 'Practice tests', 'Scenario-based questions', 'Labs and exam-readiness checks'],
  },
  {
    name: 'Workshop-Style Courses',
    summary: 'Short, practical sessions built around doing the work with an instructor, facilitator or guided activity sequence.',
    bestFor: 'Tool training, demonstrations, team enablement and applied skills transfer.',
    elements: ['Live walkthroughs', 'Guided exercises', 'Reusable templates', 'Practical take-home outputs'],
  },
  {
    name: 'Cohort-Based Courses',
    summary: 'Learners move through the programme together against common milestones, deadlines and collaborative activities.',
    bestFor: 'Accountability, networking, peer learning and collaborative capability building.',
    elements: ['Group projects', 'Discussion forums', 'Peer reviews', 'Shared milestones and deadlines'],
  },
  {
    name: 'Mentorship-Driven Courses',
    summary: 'Learning content is combined with one-to-one or small-group coaching, feedback and personalised goal tracking.',
    bestFor: 'Leadership development, career growth and advanced technical capability where context matters.',
    elements: ['Coaching sessions', 'Personalised feedback', 'Goal tracking', 'Individual development plans'],
  },
];

const deliveryStyles = [
  {
    name: 'Content-Heavy',
    description: 'Best when learners need structured explanation, reference material and conceptual depth before practice.',
    items: ['Video-first courses', 'Reading-based courses', 'Case-study-driven courses'],
  },
  {
    name: 'Practice-Heavy',
    description: 'Best when performance depends on repeated application, implementation and learning-by-doing.',
    items: ['Lab-based courses', 'Project-based courses', 'Simulation-based courses'],
  },
  {
    name: 'Assessment-Heavy',
    description: 'Best when progress must be measured against explicit standards, exam objectives or demonstrated competence.',
    items: ['Exam preparation', 'Skills verification', 'Competency-based learning'],
  },
];

const publishedCourses: CatalogCourse[] = [
  {
    courseId: 'AFF-FND-101',
    title: 'Affiliate Marketing Foundations: Platforms, Offers and Trust',
    deliveryMode: 'Self-Paced',
    category: 'Digital Commerce & Affiliate Marketing',
    level: 'Beginner',
    estimatedEffort: '6–8 hours',
    description: 'Understand affiliate marketing mechanics, evaluate platforms and offers, disclose relationships clearly and build a sustainable learner-first operating model.',
    route: '/courses/affiliate-marketing-foundations',
    contentStatus: 'Published evidence-led learning journey',
    source: 'published',
  },
  {
    courseId: 'AFF-TLF-201',
    title: 'Affiliate Traffic, Lead Capture and Email Foundations',
    deliveryMode: 'Self-Paced',
    category: 'Digital Commerce & Affiliate Marketing',
    level: 'Beginner to intermediate',
    estimatedEffort: '8–10 hours',
    description: 'Plan permission-based traffic, landing pages and email journeys with measurable goals, privacy controls and a practical experiment backlog.',
    route: '/courses/affiliate-traffic-and-list-building',
    contentStatus: 'Published evidence-led learning journey',
    source: 'published',
  },
  {
    courseId: 'AFF-OPS-301',
    title: 'Affiliate Campaign Operations, Measurement and Compliance',
    deliveryMode: 'Self-Paced',
    category: 'Digital Commerce & Affiliate Marketing',
    level: 'Intermediate',
    estimatedEffort: '10–12 hours',
    description: 'Operate affiliate campaigns responsibly through attribution, evidence-based optimisation, record keeping, claim governance and risk escalation.',
    route: '/courses/affiliate-campaign-operations-and-compliance',
    contentStatus: 'Published evidence-led learning journey',
    source: 'published',
  },
  {
    courseId: 'SHP-OPS-201',
    title: 'Shopify Store Operations and Growth',
    deliveryMode: 'Self-Paced',
    category: 'Professional & Business Skills',
    level: 'Beginner to intermediate',
    estimatedEffort: '18-22 hours',
    description: 'Build, operate, measure and continuously improve a secure Shopify storefront with practical merchandising, fulfilment, conversion and launch-readiness work.',
    route: '/courses/shopify/store-operations',
    contentStatus: 'Published evidence-led learning journey',
    source: 'published',
  },
  {
    courseId: 'SHP-UPA-101',
    title: 'Shopify User Permissions',
    deliveryMode: 'Self-Paced',
    category: 'Professional & Business Skills',
    level: 'Beginner',
    estimatedEffort: '4–6 hours',
    description: 'Design least-privilege Shopify staff roles, separate duties, review access and produce an auditable permission baseline.',
    route: '/courses/shopify-user-permissions',
    contentStatus: 'Published evidence-led learning journey',
    source: 'published',
  },
  {
    courseId: 'GHP-DOM-101',
    title: 'GitHub Pages Setup',
    deliveryMode: 'Self-Paced',
    category: 'Cloud, DevOps & Project Delivery',
    level: 'Beginner',
    estimatedEffort: '5–7 hours',
    description: 'Publish a production-ready GitHub Pages site with Actions, custom-domain verification, HTTPS and deployment validation.',
    route: '/courses/github-pages-setup',
    contentStatus: 'Published evidence-led learning journey',
    source: 'published',
  },
  {
    courseId: 'M365-LIC-101',
    title: 'Microsoft 365 Licenses',
    deliveryMode: 'Self-Paced',
    category: 'Microsoft Technologies',
    level: 'Intermediate',
    estimatedEffort: '5–8 hours',
    description: 'Administer Microsoft 365 licence allocation, group-based assignment, billing controls and governance evidence.',
    route: '/courses/microsoft-365-licenses',
    contentStatus: 'Published evidence-led learning journey',
    source: 'published',
  },
  {
    courseId: 'SEC-OSINT-201',
    title: 'Open-Source Intelligence (OSINT) Gathering with Recon-ng and Shodan',
    deliveryMode: 'Self-Paced',
    category: 'Cybersecurity',
    level: 'Intermediate',
    estimatedEffort: '24–30 hours',
    description: 'Build a lawful, passive-first OSINT methodology using Recon-ng, Shodan, public-source correlation, provenance, privacy controls and evidence-led reporting.',
    route: '/courses/open-source-intelligence-gathering',
    contentStatus: 'Published evidence-led learning journey',
    source: 'published',
  },
  {
    courseId: 'LXD-SLD-201',
    title: 'Evidence-Based Slide Design for Digital Learning',
    deliveryMode: 'Self-Paced',
    category: 'Creative Technology',
    level: 'Intermediate',
    estimatedEffort: '30–36 hours',
    description: 'Design, build, test and publish accessible slide-based learning experiences using cognitive science, multimedia learning and LMS tracking.',
    route: '/courses/evidence-based-slide-design-digital-learning',
    contentStatus: 'Published evidence-led learning journey',
    source: 'published',
  },
];

function categoryAnchor(category: string): string {
  return `track-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

export default function CoursesLandingPage(): React.JSX.Element {
  const pluginData = usePluginData('skunkworks-academy-generated-course-pages') as GeneratedPluginData;
  const generatedCourses = pluginData?.courses ?? [];

  const [formatQuery, setFormatQuery] = useState('');
  const [catalogQuery, setCatalogQuery] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredTypes = useMemo(() => {
    const needle = formatQuery.trim().toLowerCase();
    if (!needle) return courseTypes;

    return courseTypes.filter((courseType) => {
      const searchable = [courseType.name, courseType.summary, courseType.bestFor, ...courseType.elements]
        .join(' ')
        .toLowerCase();
      return searchable.includes(needle);
    });
  }, [formatQuery]);

  const allCourses = useMemo(() => {
    const byId = new Map<string, CatalogCourse>();
    for (const course of generatedCourses) {
      byId.set(course.courseId, {...course, source: 'generated'});
    }
    for (const course of publishedCourses) {
      byId.set(course.courseId, course);
    }
    return Array.from(byId.values()).sort((a, b) => a.title.localeCompare(b.title));
  }, [generatedCourses]);

  const categories = useMemo(
    () => Array.from(new Set(allCourses.map((course) => course.category))).sort((a, b) => a.localeCompare(b)),
    [allCourses],
  );

  const deliveryModes = useMemo(
    () => Array.from(new Set(allCourses.map((course) => course.deliveryMode))).sort((a, b) => a.localeCompare(b)),
    [allCourses],
  );

  const levels = useMemo(
    () => Array.from(new Set(allCourses.map((course) => course.level))).sort((a, b) => a.localeCompare(b)),
    [allCourses],
  );

  const filteredCourses = useMemo(() => {
    const needle = catalogQuery.trim().toLowerCase();
    return allCourses.filter((course) => {
      const matchesQuery = !needle || [
        course.courseId,
        course.title,
        course.category,
        course.deliveryMode,
        course.level,
        course.estimatedEffort,
        course.description,
      ].join(' ').toLowerCase().includes(needle);
      const matchesDelivery = deliveryFilter === 'All' || course.deliveryMode === deliveryFilter;
      const matchesLevel = levelFilter === 'All' || course.level === levelFilter;
      const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
      return matchesQuery && matchesDelivery && matchesLevel && matchesCategory;
    });
  }, [allCourses, catalogQuery, deliveryFilter, levelFilter, categoryFilter]);

  const groupedCourses = useMemo(() => {
    const groups = new Map<string, CatalogCourse[]>();
    for (const course of filteredCourses) {
      const group = groups.get(course.category) ?? [];
      group.push(course);
      groups.set(course.category, group);
    }
    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, courses]) => ({
        category,
        courses: courses.sort((a, b) => a.title.localeCompare(b.title)),
      }));
  }, [filteredCourses]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const course of allCourses) counts.set(course.category, (counts.get(course.category) ?? 0) + 1);
    return counts;
  }, [allCourses]);

  const clearFilters = () => {
    setCatalogQuery('');
    setDeliveryFilter('All');
    setLevelFilter('All');
    setCategoryFilter('All');
  };

  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Skunkworks Academy Courses',
    url: 'https://www.skunkworksacademy.com/courses',
    description: 'Complete Skunkworks Academy course catalogue with course formats, delivery modes, technology tracks and practical learning journeys.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Skunkworks Academy',
      url: 'https://www.skunkworksacademy.com/',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allCourses.length,
      itemListElement: allCourses.map((course, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Course',
          name: course.title,
          description: course.description,
          url: `https://www.skunkworksacademy.com${course.route}`,
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Skunkworks Academy',
          },
        },
      })),
    },
  }), [allCourses]);

  return (
    <Layout
      title="Courses | Complete Course Catalogue"
      description="Browse the complete Skunkworks Academy course catalogue by format, category, delivery mode and level, including self-paced and instructor-led technology training."
    >
      <Head>
        <link rel="canonical" href="https://www.skunkworksacademy.com/courses" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Skunkworks Academy" />
        <meta property="og:title" content="Skunkworks Academy Courses | Complete Catalogue" />
        <meta property="og:description" content="Explore every Skunkworks Academy course offering by learning format, discipline, delivery mode and level." />
        <meta property="og:url" content="https://www.skunkworksacademy.com/courses" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>Complete Skunkworks Academy catalogue</p>
                <h1>Every course. Every track. One catalogue.</h1>
                <p className={styles.heroLead}>
                  Browse the full Academy offering across technical disciplines, certification preparation, professional capability and applied digital learning. Compare course formats, filter the complete catalogue and open the learning journey that matches your goal.
                </p>
                <div className={styles.heroActions}>
                  <a className={`${styles.button} ${styles.primaryButton}`} href="#complete-catalogue">Browse all courses</a>
                  <a className={styles.button} href="#course-types">Explore course types</a>
                  <a className={styles.button} href="https://portal.skunkworksacademy.com/">Learner portal</a>
                </div>
              </div>

              <aside className={styles.heroPanel} aria-label="Course catalogue overview">
                <div className={styles.heroMetric}>
                  <strong>{allCourses.length}</strong>
                  <span>Course offerings currently represented</span>
                </div>
                <div className={styles.heroMetric}>
                  <strong>{categories.length}</strong>
                  <span>Technology and professional learning tracks</span>
                </div>
                <div className={styles.heroMetric}>
                  <strong>{deliveryModes.length}</strong>
                  <span>Active delivery modes in the published catalogue</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.section} id="course-types">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Course formats</p>
                <h2>All major ways to learn with Skunkworks Academy.</h2>
              </div>
              <p>
                Course format describes how learning is experienced. The live catalogue below records the delivery mode, discipline and level for each current offering, while programmes can combine multiple formats where required.
              </p>
            </div>

            <div className={styles.searchWrap}>
              <input
                className={styles.searchInput}
                type="search"
                value={formatQuery}
                onChange={(event) => setFormatQuery(event.target.value)}
                placeholder="Search course formats by goal, method or learning element…"
                aria-label="Search course formats"
              />
              <div className={styles.resultCount} aria-live="polite">
                {filteredTypes.length} of {courseTypes.length} formats
              </div>
            </div>

            {filteredTypes.length > 0 ? (
              <div className={styles.typeGrid}>
                {filteredTypes.map((courseType) => {
                  const index = courseTypes.findIndex((item) => item.name === courseType.name) + 1;
                  return (
                    <article className={styles.typeCard} key={courseType.name}>
                      <div className={styles.typeNumber}>{String(index).padStart(2, '0')}</div>
                      <div>
                        <h3>{courseType.name}</h3>
                        <p className={styles.typeSummary}>{courseType.summary}</p>
                        <p className={styles.typeBest}>
                          <span className={styles.label}>Best for</span><br />
                          {courseType.bestFor}
                        </p>
                        <ul className={styles.typeElements}>
                          {courseType.elements.map((element) => <li key={element}>{element}</li>)}
                        </ul>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                No course format matches “{formatQuery}”. Try certification, lab, coaching, live, project or self-paced.
              </div>
            )}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Delivery emphasis</p>
                <h2>Content, practice and verification can work together.</h2>
              </div>
              <p>
                A single learning journey may combine structured content, practical labs and assessment. This lets certification, enterprise and role-based programmes use the right balance for the required outcome.
              </p>
            </div>

            <div className={styles.styleGrid}>
              {deliveryStyles.map((deliveryStyle) => (
                <article className={styles.styleCard} key={deliveryStyle.name}>
                  <p className={styles.eyebrow}>Course design style</p>
                  <h3>{deliveryStyle.name}</h3>
                  <p>{deliveryStyle.description}</p>
                  <ul className={styles.styleList}>
                    {deliveryStyle.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="complete-catalogue">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Complete course offering</p>
                <h2>Browse the entire catalogue.</h2>
              </div>
              <p>
                Every offering represented in the course-catalog source is listed below. Use search and filters to narrow by discipline, delivery mode or level without leaving the page.
              </p>
            </div>

            <div className={styles.catalogToolbar}>
              <div className={styles.catalogSearch}>
                <label htmlFor="catalog-search">Search the full catalogue</label>
                <input
                  id="catalog-search"
                  className={styles.searchInput}
                  type="search"
                  value={catalogQuery}
                  onChange={(event) => setCatalogQuery(event.target.value)}
                  placeholder="Course title, code, technology, category or keyword…"
                />
              </div>

              <div className={styles.filterGrid}>
                <label>
                  <span>Delivery mode</span>
                  <select value={deliveryFilter} onChange={(event) => setDeliveryFilter(event.target.value)}>
                    <option value="All">All delivery modes</option>
                    {deliveryModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
                  </select>
                </label>
                <label>
                  <span>Level</span>
                  <select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}>
                    <option value="All">All levels</option>
                    {levels.map((level) => <option key={level} value={level}>{level}</option>)}
                  </select>
                </label>
                <label>
                  <span>Course track</span>
                  <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                    <option value="All">All course tracks</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category} ({categoryCounts.get(category) ?? 0})</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className={styles.catalogSummary}>
                <div aria-live="polite">
                  <strong>{filteredCourses.length}</strong> of {allCourses.length} offerings shown
                </div>
                <button type="button" className={styles.clearButton} onClick={clearFilters}>Clear filters</button>
              </div>
            </div>

            <nav className={styles.trackNav} aria-label="Course tracks">
              {categories.map((category) => (
                <a key={category} href={`#${categoryAnchor(category)}`}>
                  {category}<span>{categoryCounts.get(category) ?? 0}</span>
                </a>
              ))}
            </nav>

            {groupedCourses.length > 0 ? (
              <div className={styles.catalogGroups}>
                {groupedCourses.map(({category, courses}) => (
                  <section className={styles.catalogGroup} id={categoryAnchor(category)} key={category}>
                    <div className={styles.groupHeader}>
                      <div>
                        <p className={styles.eyebrow}>Course track</p>
                        <h3>{category}</h3>
                      </div>
                      <span>{courses.length} {courses.length === 1 ? 'offering' : 'offerings'}</span>
                    </div>

                    <div className={styles.offeringGrid}>
                      {courses.map((course) => (
                        <article className={styles.offeringCard} key={course.courseId}>
                          <div className={styles.offeringTopline}>
                            <span className={styles.courseCode}>{course.courseId}</span>
                            {course.source === 'published' && <span className={styles.featuredBadge}>Published</span>}
                          </div>
                          <h4>{course.title}</h4>
                          <div className={styles.metaRow}>
                            <span>{course.deliveryMode}</span>
                            <span>{course.level}</span>
                            <span>{course.estimatedEffort}</span>
                          </div>
                          <p>{course.description}</p>
                          <div className={styles.offeringFooter}>
                            <Link className={styles.cardLink} to={course.route}>Open course</Link>
                            <a
                              className={styles.enrolLink}
                              href={`https://portal.skunkworksacademy.com/checkout/?courseId=${encodeURIComponent(course.courseId)}`}
                            >
                              Register / enrol
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                No courses match the selected filters. Clear one or more filters or try a broader search term.
              </div>
            )}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <div className={styles.ctaBand}>
              <div>
                <p className={styles.eyebrow}>Build your learning path</p>
                <h2>Need a programme assembled around your team?</h2>
                <p>
                  Combine self-paced content, instructor delivery, labs, workshops, assessments and mentoring into a structured pathway aligned to business outcomes, certification targets or role capability.
                </p>
              </div>
              <div className={styles.sectionActions}>
                <a className={`${styles.button} ${styles.primaryButton}`} href="mailto:training@skunkworks.africa?subject=Skunkworks%20Academy%20Course%20Delivery%20Enquiry">Plan training delivery</a>
                <a className={styles.button} href="https://labs.skunkworksacademy.com/">Launch labs</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
