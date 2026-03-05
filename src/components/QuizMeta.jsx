export function QuizMeta() {
  return (
    <div className="quiz-meta card">
      <h2>Quiz Details</h2>
      <div className="field">
        <label htmlFor="quiz-name">Quiz Name *</label>
        <input
          id="quiz-name"
          type="text"
          placeholder="Enter quiz name"
        />
      </div>
      <div className="field">
        <label htmlFor="quiz-description">Description</label>
        <textarea
          id="quiz-description"
          placeholder="Enter quiz description"
        />
      </div>
    </div>
  );
}