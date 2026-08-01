import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const courses = [
  {
    id: 'PYE-101',
    title: 'Python Certification Preparation',
    duration: '30-36 hours · Beginner to entry-level',
    description: 'Build Python fundamentals through deliberate coding practice, debugging, timed mock tasks and an evidence-led capstone.',
    outcomes: ['Trace and write correct Python fundamentals', 'Debug syntax, runtime and logic defects', 'Prepare ethically for entry-level certification'],
    path: '/courses/python-certification-prep',
  },
  {
    id: 'EFL-DOM-101',
    title: 'EasyFile Domain Setup and Production Launch',
    duration: '22-28 hours · Intermediate web operations',
    description: 'Plan, verify, secure and operate an EasyFile launch with DNS, TLS, email, user-journey, monitoring and rollback controls.',
    outcomes: ['Design safe domain and DNS cutovers', 'Validate TLS, portal, email and API journeys', 'Deliver a production launch and handover dossier'],
    path: '/courses/easyfile-domain-setup',
  },
  {
    id: 'DAT-OUT-101',
    title: 'Understanding Outliers in Data Files',
    duration: '24-30 hours · Foundation to intermediate',
    description: 'Find, investigate and explain potential outliers in data files using robust statistics, visual analysis and governed evidence.',
    outcomes: ['Profile data quality before detecting anomalies', 'Compare robust detection methods responsibly', 'Deliver a reproducible investigation package'],
    path: '/courses/data-outlier-analysis',
  },
  {
    id: 'ART-101',
    title: 'Professional Articulation and Executive Communication',
    duration: '36–40 hours · Foundation to advanced',
    description: 'Build clear speech, executive presence, business storytelling, interview, meeting and presentation capability through recorded practice and moderated evidence.',
    outcomes: ['Deliver clear professional and executive messages', 'Handle meetings, interviews, questions and difficult conversations', 'Complete a moderated communication capability portfolio'],
    path: '/courses/professional-articulation',
  },
  {
    id: 'SHP-UPA-101',
    title: 'Shopify User Permissions',
    duration: '4–6 hours · Beginner to intermediate',
    description: 'Design least-privilege Shopify staff roles, separate duties, review access and produce an auditable permission baseline.',
    outcomes: ['Map operational roles to Shopify permissions', 'Harden staff and collaborator access', 'Complete an access review and evidence pack'],
    path: '/courses/shopify-user-permissions',
  },
  {
    id: 'GHP-DOM-101',
    title: 'GitHub Pages Setup',
    duration: '5–7 hours · Beginner to intermediate',
    description: 'Publish a production-ready GitHub Pages site with Actions, custom-domain verification, HTTPS and deployment validation.',
    outcomes: ['Configure Pages deployment', 'Verify DNS and custom domains', 'Troubleshoot builds, routing and HTTPS'],
    path: '/courses/github-pages-setup',
  },
  {
    id: 'M365-LIC-101',
    title: 'Microsoft 365 Licenses',
    duration: '5–8 hours · Intermediate',
    description: 'Administer Microsoft 365 licence allocation, group-based assignment, billing controls and governance evidence.',
    outcomes: ['Map requirements to licence plans', 'Allocate and reclaim licences safely', 'Reconcile billing, utilisation and compliance'],
    path: '/courses/microsoft-365-licenses',
  },
];

export default function Home(): React.JSX.Element {
  return (
    <Layout title="Practical self-paced courses" description="Evidence-led Skunkworks Academy learning journeys for programming, data analysis, EasyFile operations, professional communication, Shopify, GitHub Pages and Microsoft 365 administration.">
      <header className="heroBanner">
        <div className="container">
          <p className="eyebrow">Self-paced capability journeys</p>
          <h1>Learn it. Practise it. Prove it.</h1>
          <p>Seven practical courses built around real implementation tasks, recorded practice, formative assessment and exportable evidence of capability records.</p>
          <div className="heroActions">
            <a className="heroButton heroButtonPrimary" href="#courses">Explore courses</a>
            <a className="heroButton" href="https://portal.skunkworksacademy.com/">Learner sign in</a>
            <a className="heroButton" href="https://www.skunkworksacademy.com/self-paced/">Academy self-paced catalogue</a>
          </div>
        </div>
      </header>

      <main className="catalogSection" id="courses">
        <div className="container">
          <div className="catalogHeader">
            <p className="eyebrow">Published learning journeys</p>
            <h2>Practical courses with controlled learner access</h2>
            <p>Course summaries are public. Lessons, assessments, practice studios and evidence tools are released only after the portal confirms an authenticated learner and active enrolment.</p>
          </div>

          <div className="courseGrid">
            {courses.map((course) => (
              <article className="courseCard" key={course.id}>
                <p className="eyebrow">{course.id}</p>
                <h2>{course.title}</h2>
                <div className="courseMeta">{course.duration}</div>
                <p>{course.description}</p>
                <ul>
                  {course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                </ul>
                <div className="courseCardActions">
                  <Link className="cardButton cardButtonPrimary" to={course.path}>Open course</Link>
                  <a className="cardButton" href={`https://portal.skunkworksacademy.com/checkout/?courseId=${encodeURIComponent(course.id)}`}>Register or enrol</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
