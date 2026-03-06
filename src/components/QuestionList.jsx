import { Question } from "./Question";

export function QuestionList({questions, onUpdate}) {
  function addQuestion() {
    const newQuestion = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      sortOrder: questions.length + 1,
      options: [
        { id: crypto.randomUUID(), value: "", label: "", sortOrder: 1 },
        { id: crypto.randomUUID(), value: "", label: "", sortOrder: 2 },
      ],
      correctValues: [],
    };
    onUpdate([...questions, newQuestion]);
  }


  function updateQuestion(id, updated) {
    onUpdate(questions.map(q => (q.id === id ? updated : q)));
  }

  return (
    <div className="question-list">
      <div className="question-list-header">
        <h2>Questions 1</h2>

        {questions.map(question => (
        <Question
          key={question.id}
          question={question}
          onUpdate={updated => updateQuestion(question.id, updated)}
        />
      ))}
        <button type="button" className="btn-primary" onClick={addQuestion}>
          + Add Question
        </button>
      </div>
    </div>
  );
}