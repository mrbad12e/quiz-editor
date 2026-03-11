import "./index.css";
import { QuizMeta } from "./components/QuizMeta";
import { QuestionList } from "./components/QuestionList";

import { useState } from "react";

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
