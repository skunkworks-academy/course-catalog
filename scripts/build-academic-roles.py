#!/usr/bin/env python3
"""Build deterministic, public pilot courseware from reviewed-in-repository sources."""
import argparse, json, pathlib, re, zipfile, io
ROOT=pathlib.Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'data/academic-roles/courses.json').read_text())
CHECK='--check' in __import__('sys').argv
outputs={}
def put(path,text): outputs[path]=text.encode() if isinstance(text,str) else text

def front(id,title,slug,description):
    return f'---\nid: {id}\nslug: /{slug}\ntitle: {json.dumps(title)}\nsidebar_label: {json.dumps(title)}\ndescription: {json.dumps(description)}\nhide_title: true\n---\n\n'

def reg(c):
    return f'[Ask about facilitated enrolment](https://www.skunkworksacademy.com/course-registration/?course={c["courseId"]})'

def capstone(c):
    editing=c['courseId']=='EDU-EDT-201'
    performance='editorial handover' if editing else 'microteaching session'
    return f'''## Outcomes

Integrate the course evidence into a reproducible {performance}; apply an analytic rubric; identify a specific improvement after feedback.

## Scenario and deliverable

{c['capstone']}

This capstone is a public portfolio brief. It is not a secure exam. Formal assessment requires an assigned assessor, an approved private submission channel and confirmed assessment arrangements. Do not upload learner records or controlled institutional questions to a public repository.

## Worked example: plan the evidence before the performance

A strong submission makes a claim, shows the relevant artifact and explains why the artifact meets the criterion. For example, “the task has been checked” is weaker than a dated run record naming the fixture, environment and expected result. For editorial work, show the original wording, the query or edit, its justification and the release decision. For teaching work, show the outcome, the task and the learner evidence it produces.

| Stage | Time budget | Observable output |
|---|---|---|
| Plan and check prerequisites | 45 minutes | Scope, outcome and readiness checklist |
| Produce the task and worked example | 75 minutes | Reproducible learner materials |
| Rehearse and deliver | 60 minutes | Observed performance and feedback |
| Moderate and revise | 60 minutes | Rubric, correction and final reflection |

These are planning estimates, not measured completion times. Pause when a prerequisite is missing and record the adjustment rather than rushing through unverified work.

## Lab — assemble and defend the portfolio

1. Gather the three earlier module artifacts. Label each with the course ID, module, version and date; remove unnecessary personal information.
2. Use the downloadable workbook to map each artifact to an outcome and acceptance criterion.
3. Prepare the role-specific capstone above. Keep its scope small enough to verify every important claim.
4. Rehearse with a peer or record a self-review. If recording another person, obtain permission and use an approved private location; a written observation is an alternative.
5. Introduce one controlled defect in a labelled copy. Demonstrate how a test, source check or rubric detects it, then restore the correct version.
6. Score the evidence against the rubric below. An assessor should reproduce at least one technical or editorial check and explain any disagreement.
7. Revise the weakest criterion and submit a short change record. Retain the initial and revised versions so the improvement is visible.

**Expected observations:** Every scored claim has observable evidence, and the corrected artifact passes the same check that exposed the defect. **Evidence:** The four artifacts listed on the course overview, a rubric record and a reflection. **Cleanup:** Remove faulty release copies and temporary files; retain only the agreed evidence in the approved workspace.

## Assessment rubric

This is the proposed Academy pilot standard. Score each criterion from 0 to 4 and calculate `weight × level / 4`. Level 0 means absent evidence; 1 means major errors; 2 means partially working or incompletely verified; 3 means correct, reproducible and appropriately explained; 4 adds justified transfer and diagnosis of a meaningful fault.

| Criterion | Weight | Evidence required for level 3 |
|---|---|---|
| Subject correctness | 30% | Correct reasoning and outputs against explicit requirements |
| Role-specific performance | 25% | A coherent {performance} aligned with its audience and outcome |
| Verification and reproducibility | 20% | Traceable checks, environment or source details, and a demonstrated repair |
| Accessibility and clarity | 15% | Structured materials, readable visuals and equivalent text explanations |
| Safe professional handover | 10% | Synthetic or authorized data, source attribution and unresolved issues recorded |

**Pilot completion threshold:** at least 75/100, with subject correctness and verification each at level 3 or above, and all critical conditions resolved. This is not a vendor examination pass mark. A browser self-check does not issue a certificate or record an official grade.

**Critical condition:** {c['critical']}

## Feedback, moderation and reassessment

Give feedback using an observed artifact, the relevant criterion and one concrete next action. Where two assessors disagree, compare the same evidence and record the reason for the final decision. Do not average unexplained scores to hide disagreement. A reassessment should target the missing capability with a fresh equivalent task, followed by rechecking the affected criteria. Follow the commissioning institution's approved appeals process for formal delivery.

## Retrieval and reflection

<details><summary>Can a polished presentation compensate for incorrect subject reasoning?</summary>

No. Subject correctness has a minimum required level and cannot be offset by attractive formatting. Correct the reasoning and verify the revised artifact.

</details>

<details><summary>What distinguishes a self-check from formal assessment here?</summary>

A self-check supports practice. Formal assessment requires an authorized assessor, controlled evidence handling, recorded decisions and confirmed institutional arrangements. This public course does not create those records automatically.

</details>

## Official references and next steps

Use the specific official sources in Modules 1–3 and record their versions in your portfolio. Consult [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) when reviewing your handout. {reg(c)} for a supported cohort or assessment discussion; an enquiry does not grant access or award a credential.
'''

for c in DATA['courses']:
    slug=c['slug']; cid=c['courseId']; title=c['title']; download=f'/downloads/academic-roles/{slug}'
    nav=lambda n:f'<RoleCourseNav courseId="{cid}" current={{{n}}} />\n'
    imports="import RoleCourseNav from '@site/src/components/RoleCourseNav';\n\n"
    evidence='\n'.join(f'| LO-{i+1:02} | {item} | Module {i+1} | '+('Capstone rubric' if i==3 else 'Module lab acceptance and capstone rubric')+' |' for i,item in enumerate(c['evidence']))
    over=front(slug,title,slug,c['summary'])+imports+f'''# {title}

<p className="eyebrow">Academic roles · {cid} · Version 1.0.0</p>

{c['summary']}

<div className="ghp-lesson-summary">

**Public pilot courseware** · **Intermediate professional development** · **Estimated effort: 10 hours** · **Four separate modules**

Read, practise and build a portfolio. Independent subject review is pending. Formal grading, certification and LMS progress tracking are not enabled by these public pages.

</div>

{reg(c)} · [Download the course pack]({download}/course-pack.zip)

## Who this course serves

This course supports the **{c['role']}** role listed in the supplied job alert. The alert locations are **{', '.join(c['locations'])}**. It develops bounded professional capabilities; it does not replace a relevant degree, employment experience or the employer's selection requirements. It is independently authored Skunkworks Academy material and is not an Eduvos-endorsed or accredited qualification.

**Prerequisites:** {c['prerequisites']}

**Lab environment:** {c['environment']}

**Delivery:** self-paced practice with an optional facilitated cohort. English text, native tables and expandable formative feedback support accessible study. No paid tools are required for the core exercises. Plan two hours for each of Modules 1–3 and four hours for the capstone, including practice and revision; actual time depends on prior knowledge.

## Your learning pathway

{nav(0)}
## Outcomes and evidence

The course uses a portfolio to make capability observable. The following evidence statements define the work you will produce, rather than promising an employment or certification outcome.

| Outcome | Evidence you will produce and explain | Where | Assessment link |
|---|---|---|---|
{evidence}

## Course materials

- [Complete course pack: guide, workbook, facilitator notes and labs]({download}/course-pack.zip)
- [Learner workbook]({download}/learner-workbook.md)
- [Facilitator and assessor guide]({download}/facilitator-guide.md)
'''
    labdir=ROOT/'static/downloads/academic-roles'/slug
    for f in sorted(labdir.iterdir()):
        if f.name in ('lab.py','SearchLab.java','source-handout.md'):
            over+=f'- [Download {f.name}]({download}/{f.name})\n'
    over+=f'''
## How to study and retain evidence

Begin by predicting the result of each worked example. Run or complete the activity, compare the observation with the prediction, and explain one discrepancy. Use the expandable retrieval questions for practice; their answers are public and are not a secure exam bank. The workbook is a local planning aid and does not submit work or save a grade to an LMS.

Keep only synthetic or authorized data. Before formal submission, confirm the assessor, private evidence channel and retention rules. If you need help or an accessible alternative, use the Academy contact route in the shared footer or the facilitated-enrolment enquiry above. Do not include confidential evidence in the enquiry form.

## Source and maintenance record

**Role source:** a user-supplied job-alert PDF dated 1 November 2026. Its short excerpts establish the role labels and broad duties, not a complete employer competency specification. The generic IT Lecturer listing at two campuses maps to one course. The mathematics title normalizes the alert's spelling. Full job descriptions have not been assumed.

**Technical sources:** official documentation linked at the end of each module; original synthetic examples and datasets. **Owner:** Skunkworks Academy curriculum team. **Independent SME reviewer:** not yet assigned. **Next review target:** 1 February 2027, or earlier when a referenced interface or role requirement changes. **Changelog:** 1.0.0, initial pilot edition, 1 November 2026.

{nav(0)}'''
    over=re.sub(r'\]\((/downloads/[^)]*\.md)\)', r'](pathname://\1)', over)
    put(f'docs/{slug}.mdx',over)
    all_bodies=[]
    for i,(topic,mtitle) in enumerate(c['modules'],1):
        mslug=f'module-{i:02}-{topic}'
        body=capstone(c) if i==4 else (ROOT/f'data/academic-roles/lessons/{slug}-{i}.md').read_text()
        body=body.replace('<details><summary>', '<details>\n<summary>')
        all_bodies.append(body)
        doc=front(mslug,f'Module {i} — {mtitle}',f'{slug}/{mslug}',f'{mtitle}: worked examples, a safe practical exercise, evidence and formative feedback for {title}.')+imports
        doc+=f'# Module {i} — {mtitle}\n\n**{cid}** · Module {i} of 4 · Estimated effort: {"4 hours" if i==4 else "2 hours"} including practice\n\n'
        doc+=f'**Before you begin:** '+(c['prerequisites'] if i==1 else f'Complete Module {i-1} or demonstrate its evidence criteria.')+f' Use the [course environment and downloads](/courses/{slug}#course-materials).\n\n'
        doc+=nav(i)+'\n'+body+'\n\n'+reg(c)+'\n\n'+nav(i)
        put(f'docs/{slug}/{mslug}.mdx',doc)
    workbook=f'''# {cid} — learner workbook

Course: {title}
Version: 1.0.0 | Public pilot | 1 November 2026

## Before starting

Record your interpreter/compiler or editor version, access needs and prior experience. Use fictional data. This file is a local workbook, not an LMS submission or grade record.

## Evidence map

| Outcome | Artifact | Module | Acceptance |
|---|---|---|---|
{evidence}

## Repeat for each module

- My prediction and its reasoning:
- Command or editorial action performed:
- Actual result and environment/source version:
- Difference from the expected result:
- Controlled defect and how it was detected:
- Correction and recheck:
- Evidence filename and private storage location:
- Assistance received and fresh transfer evidence:
- One teaching misconception and feedback response:

## Capstone brief

{c['capstone']}

## Self-review

Score each criterion 0–4: correctness (30%), role performance (25%), verification (20%), accessibility (15%), handover (10%). Weighted score = sum(weight × level / 4). Pilot threshold: 75/100, correctness and verification at least level 3, critical conditions resolved. An authorized assessor must confirm formal results.

Critical condition: {c['critical']}

## Handover and cleanup

Confirm the assessor and approved private submission channel before sending evidence. Remove faulty release copies, temporary files and unnecessary personal information. Record unresolved issues, the next action and your review date.
'''
    guide=f'''# Facilitator and assessor guide — {cid}

{title} | Version 1.0.0 | Public pilot, independent SME review pending

## Preparation

Confirm the audience meets: {c['prerequisites']}
Environment: {c['environment']}
Reproduce every executable or editorial fixture before a cohort. Inspect official references and record actual versions. Do not claim this short course replaces employer qualification or experience requirements.

## Delivery plan

Allow 2 hours per foundational module: 15 minutes diagnostic retrieval, 25 minutes explanation and worked example, 55 minutes practice, 15 minutes feedback, 10 minutes evidence/cleanup. The capstone has a separate 4-hour planning budget. Adjust based on a pilot and record observed seat time.

For each topic, ask for a prediction before demonstrating the result. Use the module's unique comparison table or trace as the visual explanation. Give hints in stages: expected versus observed result, relevant rule, relevant location, then worked correction. Require a fresh transfer task after a full solution is shown.

## Role-specific evidence

'''+''.join(f'{i+1}. {e}\n' for i,e in enumerate(c['evidence']))+f'''
## Capstone and moderation

{c['capstone']}

Use the five-criterion rubric in Module 4. Level 3 requires correct, reproducible evidence; level 4 adds justified transfer and fault diagnosis. Reproduce at least one artifact. Record assistance and distinguish independent work. Double-mark a sample and all borderline or contested cases where institutional policy requires; agree the actual sampling policy before formal delivery. Preserve reasons for adjustments and provide an appeal/reassessment route.

Critical condition: {c['critical']}

## Assessment integrity and privacy

All examples and retrieval answers in this package are public formative materials. They are not a controlled summative test bank. Create any high-stakes variants in an approved private assessment service. No public-page score is an official grade. Confirm assessor authorization, evidence retention and learner support arrangements before a formal cohort. Do not publish learner submissions or identifying records.

## Accessibility and quality review

Review heading structure, keyboard access, zoom/reflow, text alternatives, both themes and meaningful feedback. Native tables provide an exact text representation of each worked example. There is no required video; any future video needs captions and a transcript. Record technical and pedagogical SME findings separately from automated build checks. No ISO, WCAG certification, SCORM or xAPI conformance is claimed.

## Review record

Reviewer role/name: unassigned
Date and environment: to be completed at review
Observed checks and evidence: to be completed at review
Decision: pilot pending independent subject review
Remediation and reassessment: record criterion, new task, evidence and decision
'''
    put(f'static/downloads/academic-roles/{slug}/learner-workbook.md',workbook)
    put(f'static/downloads/academic-roles/{slug}/facilitator-guide.md',guide)
    learner='# '+title+'\n\n'+re.sub(r'<RoleCourseNav[^>]+/>','',over.split('# '+title,1)[1])+'\n\n'
    # Plain-text offline guide keeps references absolute and removes React-only wrappers.
    learner=re.sub(r'<[^>]+>','',learner).replace('](/','](https://www.skunkworksacademy.com/')
    learner+='\n\n'.join(f'# Module {i+1} — {c["modules"][i][1]}\n\n'+re.sub(r'</?(?:details|summary)>','',body) for i,body in enumerate(all_bodies))
    learner=learner.replace('pathname://','').replace('](/','](https://www.skunkworksacademy.com/')
    put(f'static/downloads/academic-roles/{slug}/learner-guide.md',learner)
    archive=io.BytesIO()
    with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
        entries={p.name:p.read_bytes() for p in labdir.iterdir() if p.name in ('lab.py','SearchLab.java','source-handout.md')}
        entries.update({'learner-guide.md':learner.encode(),'learner-workbook.md':workbook.encode(),'facilitator-guide.md':guide.encode()})
        for name,value in sorted(entries.items()):
            info=zipfile.ZipInfo(name,date_time=(2026,11,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
            z.writestr(info,value)
    put(f'static/downloads/academic-roles/{slug}/course-pack.zip',archive.getvalue())

navdata={c['courseId']:{'title':c['title'],'slug':c['slug'],'modules':c['modules']} for c in DATA['courses']}
put('src/components/academic-role-navigation.json',json.dumps(navdata,indent=2)+'\n')
fail=[]
for name,value in outputs.items():
    p=ROOT/name
    if CHECK:
        if not p.exists() or p.read_bytes()!=value: fail.append(name)
    else:
        p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(value)
if fail: raise SystemExit('Stale generated role courseware: '+', '.join(fail))
print(('Checked' if CHECK else 'Built')+f' {len(DATA["courses"])} courses, 32 modules, 8 course packs and {len(outputs)} generated files')
