import React, {useMemo, useState} from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './courses.module.css';

type CourseType = {
  name: string;
  summary: string;
  bestFor: string;
  elements: string[];
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

const publishedCourses = [
  {
    id: 'SHP-UPA-101',
    title: 'Shopify User Permissions',
    description: 'Least-privilege role design, access reviews and auditable Shopify permission baselines.',
    path: '/courses/shopify-user-permissions',
  },
  {
    id: 'GHP-DOM-101',
    title: 'GitHub Pages Setup',
    description: 'Production-ready Pages deployment, custom domains, HTTPS, Actions and deployment validation.',
    path: '/courses/github-pages-setup',
  },
  {
    id: 'M365-LIC-101',
    title: 'Microsoft 365 Licenses',
    description: 'Licence allocation, group-based assignment, billing controls, utilisation and governance evidence.',
    path: '/courses/microsoft-365-licenses',
  },
  {
    id: 'SEC-OSINT-201',
    title: 'Open-Source Intelligence Gathering',
    description: 'A lawful, passive-first OSINT methodology using Recon-ng, Shodan, correlation and evidence-led reporting.',
    path: '/courses/open-source-intelligence-gathering',
  },
  {
    id: 'LXD-SLD-201',
    title: 'Evidence-Based Slide Design for Digital Learning',
    description: 'Build accessible learning experiences using cognitive science, multimedia learning, interaction design and LMS tracking.',
    path: '/courses/evidence-based-slide-design-digital-learning',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Skunkworks Academy Courses',
  url: 'https://www.skunkworksacademy.com/courses',
  description: 'Explore Skunkworks Academy online course formats, delivery styles and published practical technology learning journeys.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Skunkworks Academy',
    url: 'https://www.skunkworksacademy.com/',
  },
  hasPart: courseTypes.map((courseType) => ({
    '@type': 'Course',
    name: courseType.name,
    description: courseType.summary,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Skunkworks Academy',
    },
  })),
};

export default function CoursesLandingPage(): React.JSX.Element {
  const [query, setQuery] = useState('');

  const filteredTypes = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return courseTypes;

    return courseTypes.filter((courseType) => {
      const searchable = [
        courseType.name,
        courseType.summary,
        courseType.bestFor,
        ...courseType.elements,
      ].join(' ').toLowerCase();
      return searchable.includes(needle);
    });
  }, [query]);

  return (
    <Layout
      title="Courses | Learning Formats and Training Delivery"
      description="Explore Skunkworks Academy self-paced, instructor-led, blended, microlearning, bootcamp, certification prep, workshop, cohort and mentorship-driven course formats."
    >
      <Head>
        <link rel="canonical" href="https://www.skunkworksacademy.com/courses" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Skunkworks Academy" />
        <meta property="og:title" content="Skunkworks Academy Courses" />
        <meta property="og:description" content="Choose the learning format that fits your goals, schedule and required level of practical support." />
        <meta property="og:url" content="https://www.skunkworksacademy.com/courses" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>Skunkworks Academy course catalogue</p>
                <h1>Choose how you want to learn.</h1>
                <p className={styles.heroLead}>
                  From independent self-paced study to instructor-led delivery, technical bootcamps, certification preparation and coached learning, choose a format that matches the capability you need to build.
                </p>
                <div className={styles.heroActions}>
                  <a className={`${styles.button} ${styles.primaryButton}`} href="#course-types">Explore course types</a>
                  <a className={styles.button} href="#published-courses">Browse published courses</a>
                  <a className={styles.button} href="https://portal.skunkworksacademy.com/">Learner portal</a>
                </div>
              </div>

              <aside className={styles.heroPanel} aria-label="Course catalogue overview">
                <div className={styles.heroMetric}>
                  <strong>10</strong>
                  <span>Core online course formats</span>
                </div>
                <div className={styles.heroMetric}>
                  <strong>3</strong>
                  <span>Delivery-style groupings</span>
                </div>
                <div className={styles.heroMetric}>
                  <strong>Practical</strong>
                  <span>Labs, projects, assessment and evidence-led learning</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.section} id="course-types">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Major types of online courses</p>
                <h2>Match the format to the learner and the outcome.</h2>
              </div>
              <p>
                The right delivery model depends on learner availability, complexity, required instructor support, assessment depth and how much hands-on practice is needed.
              </p>
            </div>

            <div className={styles.searchWrap}>
              <input
                className={styles.searchInput}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search formats by goal, method or learning element…"
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
                No course format matches “{query}”. Try terms such as certification, lab, coaching, live, project or self-paced.
              </div>
            )}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Course types by delivery style</p>
                <h2>Design around content, practice or verification.</h2>
              </div>
              <p>
                A programme can use more than one delivery style. A certification pathway, for example, may combine structured content, practical labs and assessment-heavy exam preparation.
              </p>
            </div>

            <div className={styles.styleGrid}>
              {deliveryStyles.map((deliveryStyle) => (
                <article className={styles.styleCard} key={deliveryStyle.name}>
                  <p className={styles.eyebrow}>Delivery emphasis</p>
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

        <section className={styles.section} id="published-courses">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Published learning journeys</p>
                <h2>Start with a practical Skunkworks Academy course.</h2>
              </div>
              <p>
                These learning journeys are already represented in the course-catalog repository and are built around implementation tasks, assessment and demonstrable outcomes.
              </p>
            </div>

            <div className={styles.publishedGrid}>
              {publishedCourses.map((course) => (
                <article className={styles.publishedCard} key={course.id}>
                  <p className={styles.courseCode}>{course.id}</p>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <Link className={styles.cardLink} to={course.path}>Open course</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <div className={styles.ctaBand}>
              <div>
                <p className={styles.eyebrow}>Build your learning path</p>
                <h2>Need a format designed around your team?</h2>
                <p>
                  Combine self-paced content, live instruction, labs, workshops, assessments and mentoring into one delivery plan aligned to business outcomes, certification targets or role capability.
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
