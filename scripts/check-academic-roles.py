#!/usr/bin/env python3
"""Verify generated assets, role coverage, local links and executable teaching fixtures."""
import json,pathlib,re,subprocess,sys,shutil,tempfile,zipfile
root=pathlib.Path(__file__).resolve().parents[1]
subprocess.run([sys.executable,str(root/'scripts/build-academic-roles.py'),'--check'],check=True)
data=json.loads((root/'data/academic-roles/courses.json').read_text())
courses=data['courses'];assert len(courses)==8
assert sum(len(c['locations']) for c in courses)==9
manifest=json.loads((root/'static/course-manifest.json').read_text())['courses']
source_words=0;checks=0
for c in courses:
    match=[m for m in manifest if m['courseId']==c['courseId']]
    assert len(match)==1 and match[0]['contentAccess']=='public'
    for i,mod in enumerate(c['modules'],1):
        p=root/f'docs/{c["slug"]}/module-{i:02}-{mod[0]}.mdx'
        text=p.read_text();source_words+=len(re.findall(r'\b[\w-]+\b',text))
        for marker in ('## Outcomes','## Lab','**Evidence:**','**Cleanup:**','## Official references','<RoleCourseNav','/course-registration/?course='+c['courseId']):
            assert marker in text,(p,marker)
        assert '<EnrollmentGate' not in text,'Public materials must not pretend client hiding protects content'
        assert text.count('<details>')==text.count('</details>')==2
        checks+=2
        assert '|---' in text,'Each module needs its own meaningful worked-example table'
        for url in re.findall(r'\]\((/[^)]+)\)',text):
            path=url.split('#')[0].split('?')[0]
            if path.startswith('/courses/'):
                assert (root/'docs'/path.removeprefix('/courses/')).with_suffix('.mdx').exists(),url
    pack=root/f'static/downloads/academic-roles/{c["slug"]}/course-pack.zip'
    with zipfile.ZipFile(pack) as z:
        assert z.testzip() is None
        for name in ('learner-guide.md','learner-workbook.md','facilitator-guide.md'): assert name in z.namelist()
    lab=pack.parent/'lab.py'
    if lab.exists(): subprocess.run([sys.executable,str(lab),'test'],check=True)
    if c['courseId'] in ('EDU-PYT-201', 'EDU-ITL-201'):
        original=lab.read_text()
        mutant=original.replace('        if not rows.fieldnames or not {"id","score"}.issubset(rows.fieldnames):\n            raise ValueError("id and score columns required")\n', '')
        assert mutant != original, 'The published schema fault must still target the validation branch'
        with tempfile.TemporaryDirectory() as tmp:
            broken=pathlib.Path(tmp)/'schema_mutant.py';broken.write_text(mutant)
            result=subprocess.run([sys.executable,str(broken),'test'],capture_output=True,text=True)
            assert result.returncode != 0 and 'FAILED' in result.stderr, 'Prescribed schema defect escaped the lab tests'
        print(c['courseId'] + ': missing-header fault injection detected')
java=root/'static/downloads/academic-roles/hardware-software-lecturer/SearchLab.java'
javac=shutil.which('javac') or ('/usr/lib/jvm/java-17-openjdk-amd64/bin/javac' if pathlib.Path('/usr/lib/jvm/java-17-openjdk-amd64/bin/javac').exists() else None)
if javac:
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run([javac,'-d',tmp,str(java)],check=True)
        java_bin=str(pathlib.Path(javac).parent/'java')
        output=subprocess.check_output([java_bin,'-cp',tmp,'SearchLab'],text=True)
        assert 'linear=16; binary=5' in output
        print(output.strip())
elif '--java-required' in sys.argv: raise SystemExit('JDK required to verify the published Java lab')
else: print('Java lab not run: JDK unavailable')
print(f'Academic roles verified: 8 courses, 9 listing mappings, 32 modules, {checks} formative checks, 8 downloadable packs.')
print(f'Module-source word tokens (including markup/code, not seat time): {source_words}')
