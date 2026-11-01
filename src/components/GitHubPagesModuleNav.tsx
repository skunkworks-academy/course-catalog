import React from 'react';
import Link from '@docusaurus/Link';

const MODULES = [
  {slug: 'deployment-model', title: 'Pages architecture'},
  {slug: 'actions-deployment', title: 'GitHub Actions'},
  {slug: 'custom-domain-dns', title: 'Custom domains and DNS'},
  {slug: 'https-security', title: 'HTTPS and security'},
  {slug: 'troubleshooting', title: 'Troubleshooting'},
  {slug: 'operations', title: 'Operational readiness'},
  {slug: 'capstone', title: 'Capstone assessment'},
] as const;

const root = '/courses/github-pages-setup';
export const moduleRoute = (index: number) =>
  index === 0 ? root : `${root}/module-${String(index).padStart(2, '0')}-${MODULES[index - 1].slug}`;

export default function GitHubPagesModuleNav({current = 0}: {current?: number}): React.JSX.Element {
  const safeCurrent = Math.min(Math.max(Math.trunc(current), 0), MODULES.length);
  return (
    <nav className="ghp-course-navigation" aria-label="GitHub Pages Setup module navigation">
      <div className="ghp-course-navigation__heading">
        <strong>GHP-DOM-101 · Learning pathway</strong>
        <span>{safeCurrent ? `Module ${safeCurrent} of ${MODULES.length}` : `${MODULES.length} guided modules`}</span>
      </div>
      <ol className="ghp-course-navigation__grid">
        {MODULES.map((module, index) => {
          const number = index + 1;
          return (
            <li key={module.slug}>
              <Link
                to={moduleRoute(number)}
                className={safeCurrent === number ? 'ghp-course-navigation__active' : ''}
                aria-current={safeCurrent === number ? 'page' : undefined}>
                <span className="ghp-course-navigation__number">{String(number).padStart(2, '0')}</span>
                <span>{module.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="ghp-course-navigation__paging">
        <Link to={moduleRoute(Math.max(0, safeCurrent - 1))} aria-label={safeCurrent <= 1 ? 'Return to course overview' : 'Previous module'}>
          ← {safeCurrent <= 1 ? 'Course overview' : 'Previous module'}
        </Link>
        {safeCurrent < MODULES.length && (
          <Link to={moduleRoute(safeCurrent + 1)}>Next module →</Link>
        )}
        {safeCurrent === MODULES.length && <Link to={moduleRoute(0)}>Back to course overview ↗</Link>}
      </div>
    </nav>
  );
}
