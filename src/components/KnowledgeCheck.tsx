import React, {useMemo, useState} from 'react';

export interface KnowledgeQuestion {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface KnowledgeCheckProps {
  title?: string;
  passMark?: number;
  questions: KnowledgeQuestion[];
}

export default function KnowledgeCheck({title = 'Knowledge check', passMark = 80, questions}: KnowledgeCheckProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    const correct = questions.reduce((score, question, index) => score + (answers[index] === question.answer ? 1 : 0), 0);
    const percentage = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    return {correct, percentage, passed: percentage >= passMark};
  }, [answers, passMark, questions]);

  return (
    <section className="knowledgeCheck">
      <p className="eyebrow">Formative assessment</p>
      <h2>{title}</h2>
      <p>Select the best answer for each scenario. A score of {passMark}% or higher demonstrates readiness to continue.</p>

      {questions.map((question, questionIndex) => (
        <fieldset className="questionBlock" key={question.prompt}>
          <legend><strong>{questionIndex + 1}. {question.prompt}</strong></legend>
          {question.options.map((option, optionIndex) => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${questionIndex}`}
                checked={answers[questionIndex] === optionIndex}
                onChange={() => {
                  setAnswers((current) => ({...current, [questionIndex]: optionIndex}));
                  setSubmitted(false);
                }}
              />{' '}
              {option}
            </label>
          ))}
          {submitted && (
            <p className="accessStatus">
              {answers[questionIndex] === question.answer ? 'Correct. ' : 'Review required. '}
              {question.explanation}
            </p>
          )}
        </fieldset>
      ))}

      <button className="recordButton recordButtonPrimary" type="button" onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length !== questions.length}>
        Score assessment
      </button>
      {submitted && (
        <div className="scoreBanner" role="status">
          <strong>{result.percentage}% — {result.passed ? 'Pass' : 'Not yet competent'}</strong>
          <div>{result.correct} of {questions.length} responses were correct.</div>
        </div>
      )}
    </section>
  );
}
