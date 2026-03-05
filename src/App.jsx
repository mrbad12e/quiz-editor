import { APITester } from "./APITester";
import "./index.css";
import { QuizMeta } from "./components/QuizMeta";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  return (
    <div className="app">
      <main className="editor">
        <QuizMeta />
        
      </main>
    </div>
  );
}

export default App;
