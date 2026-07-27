import React, {useEffect, useMemo, useState} from 'react';

interface EvidenceRecordProps {
  courseId: string;
  courseTitle: string;
  tasks: string[];
}

interface EvidenceEntry {
  task: string;
  evidenceUrl: string;
  notes: string;
  completed: boolean;
}

export default function EvidenceRecord({courseId, courseTitle, tasks}: EvidenceRecordProps) {
  const storageKey = `skw-ecr-${courseId}`;
  const emptyEntries = useMemo<EvidenceEntry[]>(
    () => tasks.map((task) => ({task, evidenceUrl: '', notes: '', completed: false})),
    [tasks],
  );
  const [entries, setEntries] = useState<EvidenceEntry[]>(emptyEntries);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [status, setStatus] = useState('Not yet saved.');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return;
      const record = JSON.parse(saved) as {candidateName?: string; candidateEmail?: string; entries?: EvidenceEntry[]};
      setCandidateName(record.candidateName || '');
      setCandidateEmail(record.candidateEmail || '');
      if (Array.isArray(record.entries) && record.entries.length === tasks.length) setEntries(record.entries);
      setStatus('Saved record restored from this browser.');
    } catch {
      setStatus('A saved record could not be restored. Start a new record below.');
    }
  }, [storageKey, tasks.length]);

  function updateEntry(index: number, patch: Partial<EvidenceEntry>) {
    setEntries((current) => current.map((entry, entryIndex) => entryIndex === index ? {...entry, ...patch} : entry));
  }

  function createRecord() {
    return {
      schema: 'skunkworks-academy/evidence-of-capability-record/v1',
      courseId,
      courseTitle,
      candidateName,
      candidateEmail,
      generatedAt: new Date().toISOString(),
      completion: {
        completedTasks: entries.filter((entry) => entry.completed).length,
        totalTasks: entries.length,
      },
      entries,
      declaration: 'I confirm that the evidence listed in this record represents work I completed or administered.',
    };
  }

  function saveRecord() {
    window.localStorage.setItem(storageKey, JSON.stringify(createRecord()));
    setStatus(`Saved locally at ${new Date().toLocaleTimeString()}.`);
  }

  function exportRecord() {
    const blob = new Blob([JSON.stringify(createRecord(), null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${courseId.toLowerCase()}-evidence-record.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus('Evidence record exported. Submit the JSON file with the referenced artefacts.');
  }

  return (
    <section className="evidenceRecord" aria-labelledby={`${courseId}-ecr-title`}>
      <p className="eyebrow">Evidence of capability record</p>
      <h2 id={`${courseId}-ecr-title`}>Build your assessment evidence pack</h2>
      <p>Record artefact links, implementation notes and completion status. Evidence remains in this browser until exported or submitted through the learner portal.</p>

      <div className="evidenceTask">
        <label htmlFor={`${courseId}-candidate-name`}>Candidate name</label>
        <input id={`${courseId}-candidate-name`} type="text" value={candidateName} onChange={(event) => setCandidateName(event.target.value)} autoComplete="name" />
      </div>
      <div className="evidenceTask">
        <label htmlFor={`${courseId}-candidate-email`}>Learner email</label>
        <input id={`${courseId}-candidate-email`} type="email" value={candidateEmail} onChange={(event) => setCandidateEmail(event.target.value)} autoComplete="email" />
      </div>

      {entries.map((entry, index) => (
        <div className="evidenceTask" key={entry.task}>
          <label htmlFor={`${courseId}-url-${index}`}>{index + 1}. {entry.task}</label>
          <input
            id={`${courseId}-url-${index}`}
            type="url"
            value={entry.evidenceUrl}
            placeholder="Secure SharePoint, OneDrive, GitHub or approved evidence URL"
            onChange={(event) => updateEntry(index, {evidenceUrl: event.target.value})}
          />
          <label htmlFor={`${courseId}-notes-${index}`}>Implementation notes and assessor context</label>
          <textarea
            id={`${courseId}-notes-${index}`}
            value={entry.notes}
            placeholder="Explain what was configured, the decisions made, validation performed and any redactions applied."
            onChange={(event) => updateEntry(index, {notes: event.target.value})}
          />
          <label>
            <input type="checkbox" checked={entry.completed} onChange={(event) => updateEntry(index, {completed: event.target.checked})} />{' '}
            Evidence checked, sanitized and ready for assessment
          </label>
        </div>
      ))}

      <div className="recordActions">
        <button className="recordButton recordButtonPrimary" type="button" onClick={saveRecord}>Save in this browser</button>
        <button className="recordButton recordButtonSecondary" type="button" onClick={exportRecord}>Export capability record</button>
        <button className="recordButton recordButtonSecondary" type="button" onClick={() => window.print()}>Print review copy</button>
      </div>
      <p className="accessStatus" role="status" aria-live="polite">{status}</p>
    </section>
  );
}
