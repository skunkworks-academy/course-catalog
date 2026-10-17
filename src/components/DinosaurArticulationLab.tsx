import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './DinosaurArticulationLab.module.css';
import PracticeStudio from './PracticeStudio';

type Exercise = {name:string; focus:string; prompt:string; checkpoint:string};
const exercises:Exercise[] = [
 {name:'Raptor consonant precision',focus:'Final consonants',prompt:'The project risks, scripts and costs must be checked before launch. Repeat slowly, then at meeting pace.',checkpoint:'Ask a listener to identify risks, scripts and costs independently.'},
 {name:'Triceratops number clarity',focus:'Numbers and contrasts',prompt:'Fifteen participants completed the pilot; fifty participants joined the next cohort. Revenue increased by fifteen percent, not fifty percent.',checkpoint:'Ask the listener to write each number without seeing the script.'},
 {name:'Stegosaurus breath and pauses',focus:'Breath and phrasing',prompt:'Our recommendation is clear. [Pause] Approve the pilot. [Pause] Measure the result after thirty days. [Pause] Decide whether to expand.',checkpoint:'Review natural breaths and whether pauses follow units of meaning.'},
 {name:'Brachiosaurus vowel distinctions',focus:'Vowels and stress',prompt:'We will ship the updated sheet this week. The client needs access to the data before the next review meeting.',checkpoint:'Ask for a verbatim repeat of the key nouns; do not attempt to eliminate a legitimate accent.'},
 {name:'T-Rex executive briefing',focus:'Decision-first delivery',prompt:'I recommend a thirty-day pilot. It limits upfront risk, gives us measurable evidence and needs one executive sponsor. May we proceed?',checkpoint:'Ask the listener to name the recommendation, benefit and decision requested.'},
 {name:'Pterodactyl storytelling',focus:'Narrative and emphasis',prompt:'A customer could not access the training portal. We traced the issue to an expired session, corrected the login flow and published a clear recovery guide. The lesson: diagnose before changing the platform.',checkpoint:'Ask the listener to recall problem, response and lesson.'}
];
const dimensions=['Intelligibility','Pronunciation of critical terms','Pace and pausing','Message structure','Listener comprehension'] as const;
type Scores = Record<string,number>;
const emptyScores=():Scores=>Object.fromEntries(dimensions.map(d=>[d,0]));
function average(scores:Scores){const v=dimensions.map(d=>scores[d]);return v.every(Boolean)?Math.round(v.reduce((a,b)=>a+b,0)/v.length*20):null;}
export default function DinosaurArticulationLab(){
 const [selected,setSelected]=useState(0);
 const [exampleRate,setExampleRate]=useState(0.85);
 const [exampleStatus,setExampleStatus]=useState('Ready to play a synthesised reference example.');
 const [examplePlaying,setExamplePlaying]=useState(false);
 useEffect(()=>()=>{if(typeof window!=='undefined' && 'speechSynthesis' in window)window.speechSynthesis.cancel();},[]);
 function stopExample(){if(typeof window!=='undefined' && 'speechSynthesis' in window)window.speechSynthesis.cancel();setExamplePlaying(false);setExampleStatus('Example playback stopped.');}
 function playExample(){
   if(typeof window==='undefined'||!('speechSynthesis' in window)){setExampleStatus('Speech playback is unavailable in this browser. Read the reference script below.');return;}
   window.speechSynthesis.cancel();
   const utterance=new SpeechSynthesisUtterance(current.prompt.replace(/\[Pause\]/gi,'. '));
   utterance.lang='en-ZA';
   utterance.rate=exampleRate;
   utterance.onstart=()=>{setExamplePlaying(true);setExampleStatus('Playing synthesised reference. Listen for clear words and natural pauses.');};
   utterance.onend=()=>{setExamplePlaying(false);setExampleStatus('Example complete. Record your own version below.');};
   utterance.onerror=()=>{setExamplePlaying(false);setExampleStatus('Example playback was unavailable. Try Safari or another supported browser.');};
   window.speechSynthesis.speak(utterance);
 }

 const activeChallengeRef=useRef<HTMLDivElement | null>(null);
 function chooseChallenge(index:number){stopExample();setQuizChoice(null);setQuizRevealed(false);setSelected(index);requestAnimationFrame(()=>activeChallengeRef.current?.scrollIntoView({behavior:'smooth',block:'start'}));}
 const [phase,setPhase]=useState<'baseline'|'final'>('baseline');
 const [scores,setScores]=useState<{baseline:Scores;final:Scores}>({baseline:emptyScores(),final:emptyScores()});
 const [listener,setListener]=useState({baseline:'',final:''});
 const [notes,setNotes]=useState({baseline:'',final:''});
 const [transcripts,setTranscripts]=useState({baseline:'',final:''});
 const [durations,setDurations]=useState({baseline:'',final:''});
 const [checks,setChecks]=useState({baseline:'',final:''});
 const [showGuide,setShowGuide]=useState(false);
 const [quizChoice,setQuizChoice]=useState<number|null>(null);
 const [quizRevealed,setQuizRevealed]=useState(false);
 const listeningChecks=[
  {question:'Which ending is crucial in “risks, scripts and costs”?',options:['The final consonant clusters','A louder first vowel','No particular sound'],correct:0,tip:'Keep the final consonants audible rather than swallowing the word endings.'},
  {question:'How many participants joined the next cohort?',options:['Fifteen','Fifty','Five hundred'],correct:1,tip:'The passage contrasts fifteen and fifty. Ask a listener to write both numbers.'},
  {question:'Where should pauses normally occur?',options:['Every three words','At meaningful phrase boundaries','Only after the entire speech'],correct:1,tip:'Pause after complete ideas to help your listener follow the decision.'},
  {question:'What should the listener repeat accurately?',options:['Only the speaker’s accent','The important words “ship”, “sheet”, and “week”','The volume of the speaker'],correct:1,tip:'Focus on distinctions in meaning, not accent elimination.'},
  {question:'What decision is requested?',options:['Cancel the training','Approve the thirty-day pilot','Increase the meeting length'],correct:1,tip:'Executive communication should make the requested decision explicit.'},
  {question:'What was the underlying problem in the story?',options:['An expired session','A damaged microphone','An incorrect course price'],correct:0,tip:'Retell the problem, diagnosis, response and lesson in a clear sequence.'}
 ];
 const listeningCheck=listeningChecks[selected];
 const baseline=average(scores.baseline),final=average(scores.final);
 const delta=baseline!==null&&final!==null?final-baseline:null;
 const current=exercises[selected];
 const stats=useMemo(()=>{const t=transcripts[phase].trim(),words=t?t.split(/\s+/).length:0,sec=Number(durations[phase]);const fillers=(t.match(/\b(um+|uh+|erm+|you know|sort of|kind of)\b/gi)||[]).length;return {words,fillers,wpm:words&&sec>0?Math.round(words*60/sec):null};},[phase,transcripts,durations]);
 function exportResults(){const payload={schema:'skunkworks-academy/art-101-dinosaur-lab/v1',exercise:current.name,assessmentCriteria:dimensions,scoreScale:'1 to 5, listener-rated',scores,listener,notes,transcripts,durations,checks,baselinePercentage:baseline,finalPercentage:final,changePercentagePoints:delta,exportedAt:new Date().toISOString()};const u=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=u;a.download='art-101-dinosaur-articulation-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
 return <section className={styles.lab} aria-labelledby="dino-lab-heading">
  <div className={styles.hero}><span className={styles.dino} aria-hidden="true">🦖</span><div><p className={styles.kicker}>ART-101 · Dinosaur field lab</p><h2 id="dino-lab-heading">The Articulation Expedition</h2><p>Six guided speech challenges, listener-based checkpoints and comparable before-and-after scores. Dinosaur challenges reinforce professional capability; the Academy brand stays in control.</p></div></div>
  <div className={styles.diagram} role="img" aria-label="Practice loop: establish baseline, drill speech, receive listener feedback, repeat equivalent final assessment and compare results"><span>Baseline</span><b>→</b><span>Speak</span><b>→</b><span>Listener feedback</span><b>→</b><span>Repeat</span><b>→</b><span>Compare</span></div>
  <h3>1. Choose a challenge</h3><p>Select any dinosaur challenge. The speech prompt and recorder below update to match your selection.</p><div className={styles.grid}>{exercises.map((e,i)=><button type="button" key={e.name} aria-pressed={selected===i} className={selected===i?styles.active:styles.challenge} onClick={()=>chooseChallenge(i)}><strong>{i+1}. {e.name}</strong><small>{e.focus}</small></button>)}</div>
  <div className={styles.prompt} id="art101-active-challenge" ref={activeChallengeRef} style={{scrollMarginTop:"110px"}} tabIndex={-1}><h3>{current.name}</h3><p>{current.prompt}</p><div aria-label="Reference audio example"><h4>Listen to a model delivery</h4><p>This is a browser-generated example of the selected script, not a human coach recording or an accent standard. Compare articulation, pacing and pauses, then record your own response.</p><label htmlFor="art101-example-rate">Playback speed </label><select id="art101-example-rate" value={exampleRate} onChange={e=>setExampleRate(Number(e.target.value))}><option value={0.7}>Slow (0.7×)</option><option value={0.85}>Practice (0.85×)</option><option value={1}>Normal (1×)</option></select> <button type="button" className={styles.secondary} onClick={playExample}>Play example</button> <button type="button" className={styles.secondary} onClick={stopExample} disabled={!examplePlaying}>Stop example</button><p role="status" aria-live="polite">{exampleStatus}</p></div><strong>Listening checkpoint</strong><p>{current.checkpoint}</p><button type="button" className={styles.secondary} onClick={()=>setShowGuide(v=>!v)} aria-expanded={showGuide}> {showGuide?'Hide':'Show'} delivery guide</button>{showGuide&&<p>Read naturally, articulate critical sounds without forcing them, and pause at meaning boundaries. Record in the studio directly below this guide or using another consented recording tool. Ask a second person to listen without reading the script.</p>}</div>
  <div className={styles.prompt} aria-label="Speech production guide"><h3>Articulation mechanics</h3><p><strong>Lips</strong> shape vowels and sounds such as /p/, /b/ and /m/. <strong>Tongue</strong> placement controls sounds such as /t/, /d/, /s/ and /l/. <strong>Airflow and voicing</strong> distinguish sounds like /s/ and /z/. Keep the jaw relaxed; aim for intelligibility, not accent removal.</p><details><summary>Try a 60-second sound drill</summary><p>Say “sip–zip”, “pat–bat”, and “ship–sheep” slowly. Place fingers gently at the throat for /s/ versus /z/ to feel the difference in voicing. Record each pair and ask someone to identify which word they heard without viewing the text.</p></details></div>
  <div className={styles.prompt} aria-label="Listener comprehension exercise"><h3>Listening comprehension checkpoint</h3><p>After listening to the example, answer this question without rereading the passage.</p><fieldset><legend>{listeningCheck.question}</legend>{listeningCheck.options.map((option,i)=><label key={option} style={{display:'block',margin:'8px 0'}}><input type="radio" name="art101-listening-choice" checked={quizChoice===i} onChange={()=>{setQuizChoice(i);setQuizRevealed(false);}}/> {option}</label>)}</fieldset><button type="button" className={styles.secondary} disabled={quizChoice===null} onClick={()=>setQuizRevealed(true)}>Check answer</button>{quizRevealed&&<p role="status"><strong>{quizChoice===listeningCheck.correct?'Correct.':'Not quite.'}</strong> {listeningCheck.tip}</p>}</div>
  <h3>2. Record your selected challenge</h3><p>Use Start recording, allow microphone permission, speak the selected prompt, then Stop recording. Replay and download your audio. The microphone indicator and timer show when recording is active.</p>
  <PracticeStudio key={selected} courseId="ART-101" exerciseId={`dino-${selected+1}`} title={`${current.name} — speech recorder`} prompt={current.prompt} targetSeconds={90}/>
  <h3>3. Assess before and after</h3><p>Use the <strong>same scenario and comparable duration</strong> for both recordings. A listener should independently score each dimension from 1 (not yet clear) to 5 (consistently clear). These are structured ratings, not clinical measures or automatic speech-recognition scores.</p>
  <div className={styles.toggle}><button type="button" aria-pressed={phase==='baseline'} onClick={()=>setPhase('baseline')}>Baseline recording</button><button type="button" aria-pressed={phase==='final'} onClick={()=>setPhase('final')}>Final recording</button></div>
  <div className={styles.gridScores}>{dimensions.map(d=><label key={d}>{d}<select value={scores[phase][d]} onChange={e=>setScores(old=>({...old,[phase]:{...old[phase],[d]:Number(e.target.value)}}))}><option value={0}>Not rated</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} / 5</option>)}</select></label>)}</div>
  <div className={styles.inputs}><label>Reviewer or listener identifier<input value={listener[phase]} onChange={e=>setListener(old=>({...old,[phase]:e.target.value}))} placeholder="e.g. colleague A (use pseudonym)"/></label><label>Speaking duration in seconds<input type="number" min="1" value={durations[phase]} onChange={e=>setDurations(old=>({...old,[phase]:e.target.value}))} placeholder="90"/></label><label>Listener comprehension: what did they hear?<textarea value={checks[phase]} onChange={e=>setChecks(old=>({...old,[phase]:e.target.value}))} placeholder="What did the listener correctly repeat? Which terms or numbers were misheard?"/></label><label>Transcript (optional, manually verified)<textarea value={transcripts[phase]} onChange={e=>setTranscripts(old=>({...old,[phase]:e.target.value}))} placeholder="Paste your transcript for descriptive pace and filler statistics."/></label><label>Improvement notes<textarea value={notes[phase]} onChange={e=>setNotes(old=>({...old,[phase]:e.target.value}))} placeholder="Record actions, evidence, pronunciation adjustments and feedback."/></label></div>
  <div className={styles.metrics}><div><strong>{stats.wpm??'—'}</strong><span>Words/min (transcript estimate)</span></div><div><strong>{stats.fillers}</strong><span>Detected fillers in text</span></div><div><strong>{stats.words}</strong><span>Transcript words</span></div></div>
  <h3>4. Compare effectiveness</h3><div className={styles.metrics}><div><strong>{baseline??'—'}{baseline!==null?'%':''}</strong><span>Baseline listener rating</span></div><div><strong>{final??'—'}{final!==null?'%':''}</strong><span>Final listener rating</span></div><div><strong>{delta===null?'—':(delta>0?'+':'')+delta+' pp'}</strong><span>Change in percentage points</span></div></div>
  {delta!==null&&<p role="status">{delta>0?'Listener ratings improved.':delta===0?'Ratings did not change.':'Ratings declined; review the feedback and retest.'} Verify improvement by checking whether the listener identified more critical words, numbers and action points correctly.</p>}
  <button className={styles.download} type="button" onClick={exportResults}>Export progress record (JSON)</button>
  <p className={styles.privacy}>Privacy: entries remain in this browser session unless exported. This activity does not upload audio or automatically transcribe speech. Use the existing ART-101 Practice Studio for optional audio recording. Do not include confidential data. Baseline and final scores should ideally come from the same independent listener using equivalent prompts.</p>
 </section>;
}
