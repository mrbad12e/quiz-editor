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

  function removeQuestion(id) {
    onUpdate(
      questions
        .filter(q => q.id !== id)
        .map((q, i) => ({ ...q, sortOrder: i + 1 }))
    );
  }

  return (
    <div className="question-list">
      <div className="question-list-header">
        <h2>Questions {questions.length}</h2>

        {questions.map(question => (
        <Question
          key={question.id}
          question={question}
          onUpdate={updated => updateQuestion(question.id, updated)}
          onRemove={() => removeQuestion(question.id)}
        />
      ))}
        <button type="button" className="btn-primary" onClick={addQuestion}>
          + Add Question
        </button>
      </div>
    </div>
  );
}