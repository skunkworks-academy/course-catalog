import React, {useMemo, useState} from 'react';
import styles from './DinosaurArticulationLab.module.css';

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
 const [phase,setPhase]=useState<'baseline'|'final'>('baseline');
 const [scores,setScores]=useState<{baseline:Scores;final:Scores}>({baseline:emptyScores(),final:emptyScores()});
 const [listener,setListener]=useState({baseline:'',final:''});
 const [notes,setNotes]=useState({baseline:'',final:''});
 const [transcripts,setTranscripts]=useState({baseline:'',final:''});
 const [durations,setDurations]=useState({baseline:'',final:''});
 const [checks,setChecks]=useState({baseline:'',final:''});
 const [showGuide,setShowGuide]=useState(false);
 const baseline=average(scores.baseline),final=average(scores.final);
 const delta=baseline!==null&&final!==null?final-baseline:null;
 const current=exercises[selected];
 const stats=useMemo(()=>{const t=transcripts[phase].trim(),words=t?t.split(/\s+/).length:0,sec=Number(durations[phase]);const fillers=(t.match(/\b(um+|uh+|erm+|you know|sort of|kind of)\b/gi)||[]).length;return {words,fillers,wpm:words&&sec>0?Math.round(words*60/sec):null};},[phase,transcripts,durations]);
 function exportResults(){const payload={schema:'skunkworks-academy/art-101-dinosaur-lab/v1',exercise:current.name,assessmentCriteria:dimensions,scoreScale:'1 to 5, listener-rated',scores,listener,notes,transcripts,durations,checks,baselinePercentage:baseline,finalPercentage:final,changePercentagePoints:delta,exportedAt:new Date().toISOString()};const u=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=u;a.download='art-101-dinosaur-articulation-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
 return <section className={styles.lab} aria-labelledby="dino-lab-heading">
  <div className={styles.hero}><span className={styles.dino} aria-hidden="true">🦖</span><div><p className={styles.kicker}>ART-101 · Dinosaur field lab</p><h2 id="dino-lab-heading">The Articulation Expedition</h2><p>Six guided speech challenges, listener-based checkpoints and comparable before-and-after scores. Dinosaur challenges reinforce professional capability; the Academy brand stays in control.</p></div></div>
  <div className={styles.diagram} role="img" aria-label="Practice loop: establish baseline, drill speech, receive listener feedback, repeat equivalent final assessment and compare results"><span>Baseline</span><b>→</b><span>Speak</span><b>→</b><span>Listener feedback</span><b>→</b><span>Repeat</span><b>→</b><span>Compare</span></div>
  <h3>1. Choose a challenge</h3><div className={styles.grid}>{exercises.map((e,i)=><button type="button" key={e.name} aria-pressed={selected===i} className={selected===i?styles.active:styles.challenge} onClick={()=>setSelected(i)}><strong>{i+1}. {e.name}</strong><small>{e.focus}</small></button>)}</div>
  <div className={styles.prompt}><h3>{current.name}</h3><p>{current.prompt}</p><strong>Listening checkpoint</strong><p>{current.checkpoint}</p><button type="button" className={styles.secondary} onClick={()=>setShowGuide(v=>!v)} aria-expanded={showGuide}> {showGuide?'Hide':'Show'} delivery guide</button>{showGuide&&<p>Read naturally, articulate critical sounds without forcing them, and pause at meaning boundaries. Record using the ART-101 Practice Studio elsewhere on this page or another consented recording tool. Ask a second person to listen without reading the script.</p>}</div>
  <h3>2. Assess before and after</h3><p>Use the <strong>same scenario and comparable duration</strong> for both recordings. A listener should independently score each dimension from 1 (not yet clear) to 5 (consistently clear). These are structured ratings, not clinical measures or automatic speech-recognition scores.</p>
  <div className={styles.toggle}><button type="button" aria-pressed={phase==='baseline'} onClick={()=>setPhase('baseline')}>Baseline recording</button><button type="button" aria-pressed={phase==='final'} onClick={()=>setPhase('final')}>Final recording</button></div>
  <div className={styles.gridScores}>{dimensions.map(d=><label key={d}>{d}<select value={scores[phase][d]} onChange={e=>setScores(old=>({...old,[phase]:{...old[phase],[d]:Number(e.target.value)}}))}><option value={0}>Not rated</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} / 5</option>)}</select></label>)}</div>
  <div className={styles.inputs}><label>Reviewer or listener identifier<input value={listener[phase]} onChange={e=>setListener(old=>({...old,[phase]:e.target.value}))} placeholder="e.g. colleague A (use pseudonym)"/></label><label>Speaking duration in seconds<input type="number" min="1" value={durations[phase]} onChange={e=>setDurations(old=>({...old,[phase]:e.target.value}))} placeholder="90"/></label><label>Listener comprehension: what did they hear?<textarea value={checks[phase]} onChange={e=>setChecks(old=>({...old,[phase]:e.target.value}))} placeholder="What did the listener correctly repeat? Which terms or numbers were misheard?"/></label><label>Transcript (optional, manually verified)<textarea value={transcripts[phase]} onChange={e=>setTranscripts(old=>({...old,[phase]:e.target.value}))} placeholder="Paste your transcript for descriptive pace and filler statistics."/></label><label>Improvement notes<textarea value={notes[phase]} onChange={e=>setNotes(old=>({...old,[phase]:e.target.value}))} placeholder="Record actions, evidence, pronunciation adjustments and feedback."/></label></div>
  <div className={styles.metrics}><div><strong>{stats.wpm??'—'}</strong><span>Words/min (transcript estimate)</span></div><div><strong>{stats.fillers}</strong><span>Detected fillers in text</span></div><div><strong>{stats.words}</strong><span>Transcript words</span></div></div>
  <h3>3. Compare effectiveness</h3><div className={styles.metrics}><div><strong>{baseline??'—'}{baseline!==null?'%':''}</strong><span>Baseline listener rating</span></div><div><strong>{final??'—'}{final!==null?'%':''}</strong><span>Final listener rating</span></div><div><strong>{delta===null?'—':(delta>0?'+':'')+delta+' pp'}</strong><span>Change in percentage points</span></div></div>
  {delta!==null&&<p role="status">{delta>0?'Listener ratings improved.':delta===0?'Ratings did not change.':'Ratings declined; review the feedback and retest.'} Verify improvement by checking whether the listener identified more critical words, numbers and action points correctly.</p>}
  <button className={styles.download} type="button" onClick={exportResults}>Export progress record (JSON)</button>
  <p className={styles.privacy}>Privacy: entries remain in this browser session unless exported. This activity does not upload audio or automatically transcribe speech. Use the existing ART-101 Practice Studio for optional audio recording. Do not include confidential data. Baseline and final scores should ideally come from the same independent listener using equivalent prompts.</p>
 </section>;
}
