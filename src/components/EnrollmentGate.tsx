import React, {type ReactNode, useEffect, useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface EnrollmentGateProps {
  courseId: string;
  courseTitle: string;
  children: ReactNode;
}

type AccessState = 'checking' | 'allowed' | 'locked' | 'unavailable';

export default function EnrollmentGate({courseId, courseTitle, children}: EnrollmentGateProps) {
  const {siteConfig} = useDocusaurusContext();
  const fields = siteConfig.customFields as Record<string, string>;
  const [state, setState] = useState<AccessState>('checking');
  const [detail, setDetail] = useState('Confirming your learner account and course enrolment.');

  const returnUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  }, []);

  const signInUrl = `${fields.portalSignInUrl}?returnUrl=${encodeURIComponent(returnUrl)}`;
  const enrollUrl = `${fields.portalEnrollUrl}?courseId=${encodeURIComponent(courseId)}&returnUrl=${encodeURIComponent(returnUrl)}`;

  useEffect(() => {
    const controller = new AbortController();

    async function verifyAccess() {
      try {
        const token = window.sessionStorage.getItem('skw_access_token') || window.localStorage.getItem('skw_access_token');
        const headers: HeadersInit = {Accept: 'application/json'};
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await fetch(`${fields.accessApi}?courseId=${encodeURIComponent(courseId)}`, {
          method: 'GET',
          credentials: 'include',
          headers,
          signal: controller.signal,
        });

        if (response.ok) {
          const result = (await response.json()) as {allowed?: boolean; reason?: string};
          if (result.allowed === true) {
            setState('allowed');
            return;
          }
          setState('locked');
          setDetail(result.reason || 'Your account is signed in, but an active enrolment was not found for this course.');
          return;
        }

        if (response.status === 401) {
          setState('locked');
          setDetail('Sign in with the learner account used during registration or enrolment.');
          return;
        }

        if (response.status === 403 || response.status === 404) {
          setState('locked');
          setDetail('An active enrolment was not found for this learner and course.');
          return;
        }

        setState('unavailable');
        setDetail('The learner access service did not return a valid response. Course content remains locked.');
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        setState('unavailable');
        setDetail('The learner access service is currently unreachable. Course content remains locked by default.');
      }
    }

    void verifyAccess();
    return () => controller.abort();
  }, [courseId, fields.accessApi]);

  if (state === 'allowed') return <>{children}</>;

  return (
    <section className="accessGate" role="status" aria-live="polite">
      <p className="eyebrow">Protected learning content</p>
      <h2>{state === 'checking' ? 'Checking learner access…' : `${courseTitle} is enrolment-gated`}</h2>
      <p className="accessStatus">{detail}</p>
      {state !== 'checking' && (
        <div className="accessGateActions">
          <a className="cardButton cardButtonPrimary" href={signInUrl}>Sign in to continue</a>
          <a className="cardButton" href={enrollUrl}>Register or enrol</a>
          <a className="cardButton" href="https://www.skunkworksacademy.com/self-paced/">Return to catalogue</a>
        </div>
      )}
    </section>
  );
}
