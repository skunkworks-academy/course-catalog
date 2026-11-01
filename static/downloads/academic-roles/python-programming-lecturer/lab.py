"""Offline standard-library examples using only synthetic learner records."""
import csv
import sys
import tempfile
import unittest
from pathlib import Path


def score(value):
    result=float(value)
    if not 0 <= result <= 100: raise ValueError("score must be between 0 and 100")
    return result


def load_scores(path):
    with open(path,encoding="utf-8",newline="") as handle:
        rows=csv.DictReader(handle)
        if not rows.fieldnames or not {"id","score"}.issubset(rows.fieldnames):
            raise ValueError("id and score columns required")
        result=[]
        for line,row in enumerate(rows,start=2):
            try:
                if not row.get("id"): raise ValueError("id required")
                result.append((row["id"],score(row["score"])))
            except (TypeError,ValueError) as error:
                raise ValueError(f"invalid record at line {line}") from error
        return result


class ImportTests(unittest.TestCase):
    def test_boundaries(self):
        self.assertEqual(score("0"),0); self.assertEqual(score("100"),100)
    def test_reject(self):
        for value in ("101","-1","nan","oops"):
            with self.assertRaises(ValueError): score(value)
    def test_missing_file(self):
        with tempfile.TemporaryDirectory() as root:
            with self.assertRaises(FileNotFoundError): load_scores(Path(root)/"absent.csv")
    def test_valid_file(self):
        with tempfile.TemporaryDirectory() as root:
            path=Path(root)/"scores.csv"; path.write_text("id,score\nL01,80\n",encoding="utf-8")
            self.assertEqual(load_scores(path),[("L01",80.0)])
    def test_bad_header(self):
        for content in ("name,points\nL01,80\n", "name,points\n"):
            with self.subTest(content=content), tempfile.TemporaryDirectory() as root:
                path=Path(root)/"scores.csv"; path.write_text(content,encoding="utf-8")
                with self.assertRaisesRegex(ValueError, "^id and score columns required$"):
                    load_scores(path)
    def test_bad_line(self):
        with tempfile.TemporaryDirectory() as root:
            path=Path(root)/"scores.csv"; path.write_text("id,score\nL01,nope\n",encoding="utf-8")
            with self.assertRaisesRegex(ValueError,"line 2"): load_scores(path)


if __name__ == "__main__":
    command=sys.argv[1] if len(sys.argv)>1 else "test"
    if command == "alias":
        original=[1,2]; alias=original; copied=original.copy(); alias.append(3)
        print("original",original,"copy",copied)
    elif command == "contracts": print(score("0"),score("100"))
    elif command == "files":
        with tempfile.TemporaryDirectory() as root:
            path=Path(root)/"scores.csv"; path.write_text("id,score\nL01,80\nL02,100\n",encoding="utf-8")
            print(load_scores(path))
    elif command == "test": unittest.main(argv=[sys.argv[0]])
    else: raise SystemExit("Use alias, contracts, files or test")
