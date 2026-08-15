import React, {useEffect, useMemo, useRef, useState} from 'react';

interface PracticeStudioProps {
  courseId: string;
  exerciseId: string;
  title: string;
  prompt: string;
  targetSeconds?: number;
}

const FILLER_PATTERN = /\b(um+|uh+|erm+|like|basically|actually|literally|you know|sort of|kind of)\b/gi;

export default function PracticeStudio({
  courseId,
  exerciseId,
  title,
  prompt,
  targetSeconds = 120,
}: PracticeStudioProps) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Ready. Recording stays on this device unless you export and submit it.');

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  const metrics = useMemo(() => {
    const words = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
    const minutes = Math.max(seconds / 60, 1 / 60);
    const wordsPerMinute = words ? Math.round(words / minutes) : 0;
    const fillers = transcript.match(FILLER_PATTERN) || [];
    const sentences = transcript.split(/[.!?]+/).map((item) => item.trim()).filter(Boolean);
    const averageSentenceLength = sentences.length ? Math.round(words / sentences.length) : 0;
    return {
      words,
      wordsPerMinute,
      fillerCount: fillers.length,
      fillers: [...new Set(fillers.map((item) => item.toLowerCase()))],
      averageSentenceLength,
      withinTarget: seconds >= Math.round(targetSeconds * 0.8) && seconds <= Math.round(targetSeconds * 1.2),
    };
  }, [seconds, targetSeconds, transcript]);

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setStatus('Audio recording is not supported in this browser. Use a device recorder and paste the transcript below.');
      return;
    }

    try {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl('');
      }
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {type: recorder.mimeType || 'audio/webm'});
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setStatus('Recording complete. Review the playback, add a transcript and export the practice record.');
      };
      setSeconds(0);
      setRecording(true);
      recorder.start();
      timerRef.current = setInterval(() => setSeconds((current) => current + 1), 1000);
      setStatus('Recording. Speak naturally and complete the prompt without reading every word.');
    } catch {
      setStatus('Microphone access was unavailable or denied. Check browser permissions or use an external recorder.');
    }
  }

  function stopRecording() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    setRecording(false);
  }

  function exportRecord() {
    const record = {
      schema: 'skunkworks-academy/articulation-practice-record/v1',
      courseId,
      exerciseId,
      title,
      prompt,
      completedAt: new Date().toISOString(),
      durationSeconds: seconds,
      targetSeconds,
      transcript,
      metrics,
      learnerDeclaration: 'I confirm that this practice record reflects my own delivery and self-review.',
    };
    const blob = new Blob([JSON.stringify(record, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${courseId.toLowerCase()}-${exerciseId.toLowerCase()}-practice.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus('Practice metrics exported. Save the audio separately where required by the assessment brief.');
  }

  return (
    <section className="practiceStudio" aria-labelledby={`${exerciseId}-title`}>
      <p className="eyebrow">Recorded practice studio</p>
      <h2 id={`${exerciseId}-title`}>{title}</h2>
      <p><strong>Prompt:</strong> {prompt}</p>
      <p className="accessStatus">Target duration: {Math.round(targetSeconds / 60)} minute(s). Microphone audio is processed locally by the browser.</p>

      <div className="studioTimer" aria-live="polite">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
      <div className="recordActions">
        <button className="recordButton recordButtonPrimary" type="button" onClick={startRecording} disabled={recording}>Start recording</button>
        <button className="recordButton recordButtonSecondary" type="button" onClick={stopRecording} disabled={!recording}>Stop recording</button>
      </div>

      {audioUrl && <audio className="studioAudio" controls src={audioUrl}>Your browser does not support audio playback.</audio>}

      <label className="studioLabel" htmlFor={`${exerciseId}-transcript`}>Paste or type your transcript</label>
      <textarea
        id={`${exerciseId}-transcript`}
        className="studioTranscript"
        value={transcript}
        onChange={(event) => setTranscript(event.target.value)}
        placeholder="Add the words you delivered. This enables pace, filler-word and sentence-length analysis."
      />

      <div className="studioMetrics" aria-label="Practice metrics">
        <div><strong>{metrics.words}</strong><span>Words</span></div>
        <div><strong>{metrics.wordsPerMinute}</strong><span>Words/minute</span></div>
        <div><strong>{metrics.fillerCount}</strong><span>Filler words</span></div>
        <div><strong>{metrics.averageSentenceLength}</strong><span>Average sentence length</span></div>
      </div>
      <p className="accessStatus">
        Duration: {metrics.withinTarget ? 'within the target range' : 'outside the target range'}.
        {metrics.fillers.length ? ` Detected fillers: ${metrics.fillers.join(', ')}.` : ' No listed filler words detected in the transcript.'}
      </p>

      <button className="recordButton recordButtonPrimary" type="button" onClick={exportRecord} disabled={!transcript.trim()}>Export practice record</button>
      <p className="accessStatus" role="status" aria-live="polite">{status}</p>
    </section>
  );
}
