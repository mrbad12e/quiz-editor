import './QuizMeta.css';

export function QuizMeta({ quiz, onChange }) {
  return (
    <div className="quiz-meta card">
      <h2>Quiz Details</h2>
      <div className="field">
        <label htmlFor="quiz-name">Quiz Name *</label>
        <input
          id="quiz-name"
          type="text"
          value={quiz.name}
          onChange={e => onChange({ ...quiz, name: e.target.value })}
          placeholder="Enter quiz name"
        />
      </div>
      <div className="field">
        <label htmlFor="quiz-description">Description</label>
        <textarea
          id="quiz-description"
          value={quiz.description}
          onChange={e => onChange({ ...quiz, description: e.target.value })}
          placeholder="Enter quiz description"
        />
      </div>
    </div>
  );
}