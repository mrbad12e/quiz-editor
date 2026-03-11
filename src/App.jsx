import "./index.css";
import { QuizMeta } from "./components/QuizMeta";
import { QuestionList } from "./components/QuestionList";

import { useRef, useState } from "react";

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

// To import quiz, a JSON file with correct data shape/format is required
// JSON data is parsed in handleImport
// => A function to convert parsed JSON data to object/data shape is required
function addQuiz(quiz) {
  return {
    ...quiz,
    questions: quiz.questions.map(q => ({
      ...q,
      id: crypto.randomUUID(),
      options: q.options.map(o => ({ ...o, id: crypto.randomUUID() })),
    })),
  };
}

// Empty quiz from the data shape
const EMPTY_QUIZ = { name: "", description: "", questions: [] };

export function App() {
  const [quiz, setQuiz] = useState(EMPTY_QUIZ);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  function handleExport() {
    const errs = validate(quiz);
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    const data = stripIds(quiz);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        // Get JSON data
        const parsed = JSON.parse(event.target.result);
        setQuiz(addQuiz(parsed));
        // If JSON file has the correct data format, clear errors
        setErrors([]);
      } catch {
        setErrors(["Invalid JSON file."]);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="app">
      <header>
        <h1>Quiz Editor</h1>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={handleImport}
          />
          <button type="button" className="btn-primary" onClick={() => fileInputRef.current.click()}>
            Import JSON
          </button>
          <button type="button" className="btn-secondary" onClick={handleExport}>
            Export JSON
          </button>
        </div>
      </header>

      {errors.length > 0 && (
        <div>
          <strong>Please fix the following errors:</strong>
          <ul>
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

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
