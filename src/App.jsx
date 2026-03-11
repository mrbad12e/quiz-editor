import "./index.css";
import { QuizMeta } from "./components/QuizMeta";
import { QuestionList } from "./components/QuestionList";

import { useState } from "react";

// To export quiz, a function to validate quiz's fields is required
// And a function to strip the quiz from Object/Data shape into JSON

function validate(quiz) {
  const errors = [];
  if (!quiz.name.trim()) errors.push("Quiz name is required.");
  quiz.questions.forEach((q, i) => {
    if (!q.name.trim()) errors.push(`Question ${i + 1}: name is required.`);
    if (q.options.length < 2) errors.push(`Question ${i + 1}: at least 2 options required.`);
    if (q.correctValues.length === 0) errors.push(`Question ${i + 1}: at least 1 correct answer required.`);
    q.options.forEach((o, j) => {
      if (!o.value.trim()) errors.push(`Question ${i + 1}, Option ${j + 1}: value is required.`);
    });
  });
  return errors;
}

function stripIds(quiz) {
  return {
    name: quiz.name,
    description: quiz.description,
    questions: quiz.questions.map(({ id, ...q }) => ({
      name: q.name,
      description: q.description,
      sortOrder: q.sortOrder,
      options: q.options.map(({ id, ...o }) => o),
      correctValues: q.correctValues,
    })),
  };
}

// Empty quiz from the data shape
const EMPTY_QUIZ = { name: "", description: "", questions: [] };

export function App() {
  const [quiz, setQuiz] = useState(EMPTY_QUIZ)
  return (
    <div className="app">
      <main className="editor">
        <QuizMeta quiz={quiz} onChange={setQuiz}/>
        <QuestionList 
          questions={quiz.questions}
          onUpdate={questions => setQuiz({ ...quiz, questions })}
        />
      </main>
    </div>
  );
}

export default App;
