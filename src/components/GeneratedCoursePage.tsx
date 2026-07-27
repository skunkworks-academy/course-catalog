import React from 'react';
import Layout from '@theme/Layout';
import EnrollmentGate from './EnrollmentGate';
import EvidenceRecord from './EvidenceRecord';
import KnowledgeCheck, {type KnowledgeQuestion} from './KnowledgeCheck';
import styles from './GeneratedCoursePage.module.css';

type DeliveryMode = 'Self-Paced' | 'Instructor-led';
type Level = 'Beginner' | 'Intermediate' | 'Advanced';

interface CourseMetadata {
  courseId: string;
  title: string;
  slug: string;
  deliveryMode: DeliveryMode;
  category: string;
  level: Level;
  estimatedEffort: string;
  description: string;
  audience: string;
  prerequisites: string;
  contentStatus: string;
  sourceMetadata: {
    titleBasis: string;
    sourcePath: string;
    matchingSourceRecords: number;
    reviewStatus: string;
  };
}

interface GeneratedCoursePageProps { course: CourseMetadata }

const categoryModules: Record<string, string[]> = {
  'AI & Emerging Technology': ['Responsible-use context', 'Data and model foundations', 'Workflow and interaction design', 'Implementation and integration', 'Evaluation and quality assurance', 'Security, privacy and governance', 'Operations and continuous improvement'],
  'Application Development': ['Requirements and architecture', 'Development environment and source control', 'Core implementation patterns', 'Data, APIs and integration', 'Testing and quality engineering', 'Secure development lifecycle', 'Deployment and observability'],
  'Automation & Business Rules': ['Process discovery', 'Automation architecture', 'Workflow and rule modelling', 'Implementation and integration', 'Exception handling and testing', 'Governance and change control', 'Monitoring and optimisation'],
  'Communications & VoIP': ['Communications architecture', 'Protocols and interoperability', 'Installation and baseline configuration', 'Routing and service features', 'Security and fraud prevention', 'Monitoring and troubleshooting', 'Resilience and operations'],
  'Cloud, DevOps & Project Delivery': ['Business outcomes and delivery model', 'Architecture foundations', 'Environment provisioning', 'Pipelines and release controls', 'Security governance and cost', 'Observability and service operations', 'Resilience and improvement'],
  Cybersecurity: ['Threat and risk context', 'Security architecture', 'Secure configuration', 'Detection and analysis', 'Incident response', 'Validation and assurance', 'Governance and reporting'],
  'CompTIA Certification': ['Domain orientation', 'Core concepts', 'Systems and operations', 'Security and risk', 'Troubleshooting method', 'Performance-based practice', 'Exam readiness'],
  'Microsoft Technologies': ['Service architecture', 'Tenant and environment preparation', 'Identity and access', 'Workload configuration', 'Security and compliance', 'Monitoring and troubleshooting', 'Governance and lifecycle'],
  'IBM Technologies': ['Platform architecture', 'Environment preparation', 'Administration and configuration', 'Integration and workload operations', 'Security and governance', 'Monitoring and troubleshooting', 'Resilience and optimisation'],
  'SAP, Data & Databases': ['Data and process context', 'Architecture and modelling', 'Environment and connectivity', 'Configuration and operations', 'Quality performance and controls', 'Security and governance', 'Monitoring and recovery'],
  'Professional & Business Skills': ['Professional context and baseline', 'Core frameworks', 'Planning and preparation', 'Applied workplace practice', 'Communication and stakeholder alignment', 'Quality and ethical judgement', 'Improvement and transfer'],
  'Networking & Vendor Certification': ['Network architecture', 'Protocols and addressing', 'Platform configuration', 'Services and policy', 'Security and segmentation', 'Monitoring and troubleshooting', 'Resilience and exam practice'],
  'Governance, Risk & Compliance': ['Context and scope', 'Requirements interpretation', 'Risk assessment', 'Control design and implementation', 'Evidence and internal audit', 'Corrective action', 'Management review and improvement'],
  Finance: ['Financial context', 'Data and accounting foundations', 'Processing and controls', 'Analysis and reporting', 'Risk and assurance', 'Systems and automation', 'Decision support'],
  'Creative Technology': ['Creative brief and audience', 'Design foundations', 'Tool workflow', 'Asset production', 'Quality and accessibility', 'Rights and governance', 'Publishing and portfolio'],
};

const categoryReferences: Record<string, string[]> = {
  'AI & Emerging Technology': ['Current official model or platform documentation', 'NIST AI Risk Management Framework', 'ISO/IEC 42001 guidance where applicable'],
  'Application Development': ['Current official language and framework documentation', 'OWASP Application Security Verification Standard', 'OWASP Secure Coding Practices'],
  'Communications & VoIP': ['Current vendor administration documentation', 'Relevant IETF SIP and RTP standards', 'Vendor hardening guidance'],
  Cybersecurity: ['NIST Cybersecurity Framework', 'CIS Controls', 'Current vendor security guidance'],
  'CompTIA Certification': ['Current official CompTIA exam objectives', 'Current CompTIA candidate policies', 'Official performance-based-question guidance'],
  'Microsoft Technologies': ['Microsoft Learn documentation', 'Microsoft security and compliance guidance', 'Current service release notes'],
  'IBM Technologies': ['IBM Documentation', 'Relevant IBM Redbooks', 'Current product release notes and security bulletins'],
  'Governance, Risk & Compliance': ['Applicable licensed standard', 'Accreditation-body guidance', 'Organisation policies and legal requirements'],
};

function moduleCount(level: Level): number {
  return level === 'Beginner' ? 6 : level === 'Advanced' ? 8 : 7;
}

function buildModules(course: CourseMetadata): string[] {
  const base = categoryModules[course.category] || ['Context and outcomes', 'Conceptual foundations', 'Planning and design', 'Implementation', 'Validation', 'Security and governance', 'Operations and improvement'];
  const count = moduleCount(course.level);
  return count === 8 ? [...base, 'Advanced capstone preparation'] : base.slice(0, count);
}

function questions(course: CourseMetadata): KnowledgeQuestion[] {
  return [
    {
      prompt: `What should happen before implementing ${course.title}?`,
      options: ['Start in production immediately', 'Define outcomes, scope, prerequisites, risk and acceptance criteria', 'Copy an undocumented configuration', 'Disable validation'],
      answer: 1,
      explanation: 'A controlled implementation starts with measurable outcomes, scope, prerequisites, risk and acceptance criteria.',
    },
    {
      prompt: 'Which evidence best demonstrates capability?',
      options: ['A course attendance record only', 'A claim without artefacts', 'Redacted implementation artefacts plus repeatable validation results and reflective notes', 'Credentials and confidential production data'],
      answer: 2,
      explanation: 'Competence is supported by traceable, sanitised artefacts and repeatable validation evidence.',
    },
    {
      prompt: 'What is the correct way to test a solution?',
      options: ['Test only the happy path', 'Use positive, negative and exception-based tests', 'Avoid recording actual results', 'Treat every warning as success'],
      answer: 1,
      explanation: 'Positive, negative and exception-based tests establish intended and controlled-failure behaviour.',
    },
    {
      prompt: 'How should sensitive information be handled in course evidence?',
      options: ['Publish it openly', 'Include passwords for assessor convenience', 'Use approved storage and redact credentials, personal data and confidential information', 'Disable access controls'],
      answer: 2,
      explanation: 'Evidence must be protected, access-controlled and sanitised before submission.',
    },
    {
      prompt: 'What completes an operational handover?',
      options: ['A screenshot only', 'Named owners, monitoring, support procedures, known risks and review dates', 'An undocumented verbal statement', 'Deleting the test record'],
      answer: 1,
      explanation: 'A usable handover records ownership, monitoring, support, residual risk and review obligations.',
    },
  ];
}

export default function GeneratedCoursePage({course}: GeneratedCoursePageProps): React.JSX.Element {
  const modules = buildModules(course);
  const catalogueUrl = course.deliveryMode === 'Self-Paced'
    ? 'https://www.skunkworksacademy.com/self-paced/'
    : 'https://www.skunkworksacademy.com/instructor-led/';
  const deliveryGuidance = course.deliveryMode === 'Self-Paced'
    ? 'Work through the modules sequentially, complete each practical activity and retain evidence before proceeding to the capstone.'
    : 'The facilitator should demonstrate each capability, supervise practical work, conduct debriefs and verify evidence during the scheduled delivery.';
  const references = categoryReferences[course.category] || ['Current official vendor or platform documentation', 'Applicable industry standards and security guidance', 'Current product release notes'];
  const evidenceTasks = [
    'Requirements, scope and risk assessment',
    'Architecture, design, process or implementation plan',
    'Practical implementation or performance artefact',
    'Positive, negative and exception-test results',
    'Security, privacy and governance checklist',
    'Operational handover or improvement plan',
    'Capstone assessment and learner reflection',
  ];

  return (
    <Layout title={course.title} description={course.description}>
      <header className="heroBanner">
        <div className="container">
          <p className="eyebrow">{course.deliveryMode} · {course.category}</p>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className={styles.meta}>
            <span>{course.courseId}</span><span>{course.level}</span><span>{course.estimatedEffort}</span>
          </div>
          <div className="heroActions">
            <a className="heroButton heroButtonPrimary" href={`https://portal.skunkworksacademy.com/checkout/?courseId=${encodeURIComponent(course.courseId)}`}>Register or enrol</a>
            <a className="heroButton" href="https://portal.skunkworksacademy.com/signin">Learner sign in</a>
            <a className="heroButton" href={catalogueUrl}>Return to catalogue</a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <section className={styles.publicOverview}>
            <p className="eyebrow">Public course overview</p>
            <h2>Capability-based learning journey</h2>
            <p><strong>Audience:</strong> {course.audience}</p>
            <p><strong>Prerequisites:</strong> {course.prerequisites}</p>
            <div className={styles.statusNotice}><strong>Content status:</strong> {course.contentStatus}</div>
            <h3>Learning outcomes</h3>
            <ul>
              <li>Explain the concepts, architecture and professional practices associated with {course.title}.</li>
              <li>Plan and complete a controlled implementation, administration or workplace scenario.</li>
              <li>Validate results with positive, negative and exception-based tests.</li>
              <li>Apply appropriate security, governance, documentation and operational controls.</li>
              <li>Produce an auditable Evidence of Capability Record.</li>
            </ul>
          </section>

          <EnrollmentGate courseId={course.courseId} courseTitle={course.title} catalogUrl={catalogueUrl}>
            <article className={styles.courseBody}>
              <section>
                <p className="eyebrow">Course operating model</p>
                <h2>Understand. Practise. Validate. Prove.</h2>
                <p>{deliveryGuidance}</p>
                <ol>
                  <li><strong>Understand:</strong> establish the terminology, architecture, responsibilities and constraints.</li>
                  <li><strong>Plan:</strong> define the outcome, environment, risks and acceptance criteria.</li>
                  <li><strong>Practise:</strong> complete guided work in an authorised training environment.</li>
                  <li><strong>Validate:</strong> test intended, prohibited and failure conditions.</li>
                  <li><strong>Prove:</strong> submit traceable artefacts and reflective notes.</li>
                </ol>
              </section>

              {modules.map((module, index) => (
                <section className={styles.module} key={module}>
                  <p className="eyebrow">Module {index + 1}</p>
                  <h2>{module}</h2>
                  <p>This module applies <strong>{module.toLowerCase()}</strong> to {course.title}. Learners identify the relevant concepts, dependencies, decision points, roles and operational implications.</p>
                  <h3>Theory and discussion</h3>
                  <ul>
                    <li>Terminology, architecture and expected outcomes</li>
                    <li>Quality, cost, risk and stakeholder implications</li>
                    <li>Ownership, approvals, documentation and evidence requirements</li>
                    <li>Common failure modes and troubleshooting signals</li>
                  </ul>
                  <h3>Applied activity</h3>
                  <p>Apply the module to a realistic scenario. Record the inputs, assumptions, decisions, actions, actual result and one improvement for production use.</p>
                  <h3>Evidence requirement</h3>
                  <p>Submit a concise, redacted artefact showing analysis, design, configuration, performance or validation. Another practitioner must be able to understand and verify the work.</p>
                </section>
              ))}

              <section className={styles.lab}>
                <p className="eyebrow">Practical Lab 1</p>
                <h2>Baseline and requirements analysis</h2>
                <ol>
                  <li>Identify stakeholders, business outcomes, constraints and measurable success criteria.</li>
                  <li>Document the current state, dependencies, assumptions and priority risks.</li>
                  <li>Define the target capability and a repeatable acceptance test.</li>
                  <li>Produce a one-page recommendation with owner, due date and next action.</li>
                </ol>
              </section>

              <section className={styles.lab}>
                <p className="eyebrow">Practical Lab 2</p>
                <h2>Controlled implementation or demonstration</h2>
                <ol>
                  <li>Prepare the approved environment and record prerequisite checks.</li>
                  <li>Implement or demonstrate the principal {course.title} capability using documented steps.</li>
                  <li>Capture configuration, commands, diagrams, analysis or performance artefacts.</li>
                  <li>Protect credentials, personal data, confidential information and production services.</li>
                </ol>
              </section>

              <section className={styles.lab}>
                <p className="eyebrow">Practical Lab 3</p>
                <h2>Validation, troubleshooting and handover</h2>
                <ol>
                  <li>Run positive, negative and exception-based validation tests.</li>
                  <li>Investigate one injected or simulated fault using observation, hypothesis, action and verification.</li>
                  <li>Record expected and actual results, corrective action and residual risk.</li>
                  <li>Prepare an operational handover, runbook or management summary.</li>
                </ol>
              </section>

              <KnowledgeCheck title={`${course.title} knowledge check`} questions={questions(course)} />

              <section className={styles.capstone}>
                <p className="eyebrow">Capstone assessment</p>
                <h2>{course.title} capability portfolio</h2>
                <p>Plan, implement, administer or demonstrate a realistic {course.title} capability for a defined organisation or stakeholder group.</p>
                <h3>Required deliverables</h3>
                <ol>
                  {evidenceTasks.map((task) => <li key={task}>{task}</li>)}
                </ol>
                <h3>Assessment rubric</h3>
                <div className={styles.tableWrap}>
                  <table>
                    <thead><tr><th>Criterion</th><th>Weight</th><th>Competent evidence</th></tr></thead>
                    <tbody>
                      <tr><td>Requirements and design</td><td>20%</td><td>Outcomes, scope, dependencies and risks are explicit.</td></tr>
                      <tr><td>Applied implementation</td><td>25%</td><td>The practical work is complete, repeatable and appropriate to the scenario.</td></tr>
                      <tr><td>Validation and troubleshooting</td><td>20%</td><td>Positive, negative and exception tests support the conclusion.</td></tr>
                      <tr><td>Security and governance</td><td>15%</td><td>Sensitive information, access, change and evidence controls are addressed.</td></tr>
                      <tr><td>Operations and communication</td><td>10%</td><td>Ownership, monitoring, handover and residual risk are clear.</td></tr>
                      <tr><td>Evidence quality</td><td>10%</td><td>Artefacts are dated, traceable, redacted and assessor-ready.</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2>Official reference set</h2>
                <ul>
                  {references.map((reference) => <li key={reference}>{reference}</li>)}
                  <li>Current official product release notes and security advisories applicable to the delivery environment</li>
                  <li>Source inventory reference: <code>{course.sourceMetadata.sourcePath}</code></li>
                </ul>
                <p className={styles.sourceNote}>Metadata basis: {course.sourceMetadata.titleBasis}; matching source records: {course.sourceMetadata.matchingSourceRecords}; review state: {course.sourceMetadata.reviewStatus}.</p>
              </section>

              <EvidenceRecord courseId={course.courseId} courseTitle={course.title} tasks={evidenceTasks} />
            </article>
          </EnrollmentGate>
        </div>
      </main>
    </Layout>
  );
}
