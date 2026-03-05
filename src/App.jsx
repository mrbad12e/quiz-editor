import { APITester } from "./APITester";
import "./index.css";
import { QuizMeta } from "./components/QuizMeta";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import { useState } from "react";

// Empty quiz from the data shape
const EMPTY_QUIZ = { name: "", description: "", questions: [] };

export function App() {
  const [quiz, setQuiz] = useState(EMPTY_QUIZ)
  return (
    <div className="app">
      <main className="editor">
        <QuizMeta quiz={quiz} onChange={setQuiz}/>
        
      </main>
    </div>
  );
}

export default App;
