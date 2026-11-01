import React from 'react';
import Link from '@docusaurus/Link';
import courses from './academic-role-navigation.json';

export default function RoleCourseNav({courseId, current = 0}: {courseId: string; current?: number}) {
  const course = courses[courseId as keyof typeof courses];
  if (!course) throw new Error(`Unknown academic role course: ${courseId}`);
  const root = `/courses/${course.slug}`;
  const route = (index: number) => index === 0 ? root : `${root}/module-${String(index).padStart(2, '0')}-${course.modules[index - 1][0]}`;
  return <nav className="ghp-course-navigation" aria-label={`${course.title} module navigation`}>
    <div className="ghp-course-navigation__heading"><strong>{courseId} · Learning pathway</strong><span>{current ? `Module ${current} of 4` : 'Four guided modules'}</span></div>
    <ol className="ghp-course-navigation__grid">{course.modules.map(([slug, title], index) => <li key={slug}>
      <Link to={route(index + 1)} aria-current={current === index + 1 ? 'page' : undefined} className={current === index + 1 ? 'ghp-course-navigation__active' : ''}>
        <span className="ghp-course-navigation__number">{String(index + 1).padStart(2, '0')}</span><span>{title}</span>
      </Link>
    </li>)}</ol>
    <div className="ghp-course-navigation__paging">
      {current > 1 && <Link to={route(current - 1)}>← Previous module</Link>}
      <Link to={root}>Course overview</Link>
      {current < 4 && <Link to={route(current + 1)}>Next module →</Link>}
    </div>
  </nav>;
}
