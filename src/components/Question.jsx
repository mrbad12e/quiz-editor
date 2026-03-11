/*
Each multiple-choice question should have:
 - Name
 - Description
 - Sort order
 - A list of options (at least 2 options)
 - A list of values of correct options (at least 1 option value)
*/
import { OptionItem } from "./OptionItem";
import './Question.css';

export function Question({question, onUpdate, onRemove}) {
  function updateField(field, value) {
    onUpdate({ ...question, [field]: value });
  }

  function addOption() {
    const newOption = {
      id: crypto.randomUUID(),
      value: "",
      label: "",
      sortOrder: question.options.length + 1,
    };
    onUpdate({ ...question, options: [...question.options, newOption] });
  }

  function updateOption(id, updated) {
    // Find option
    const options = question.options.map(o => (o.id === id ? updated : o));
    const old = question.options.find(o => o.id === id);
    let correctValues = question.correctValues;
    // If exist that option && it was not the disired value(s), save the desired value into a variable
    if (old && old.value !== updated.value) {
      correctValues = correctValues.map(v => (v === old.value ? updated.value : v));
    }
    // Update the option
    onUpdate({ ...question, options, correctValues });
  }

  function removeOption(id) {
    // Find the Option id that want to remove
    const removed = question.options.find(o => o.id === id);
    // Save the option list that exclude that removed option
    const options = question.options.filter(o => o.id !== id).map((o, i) => ({ ...o, sortOrder: i + 1 }));
    // The option can be the correct answer of that question, so need to save the correct answer, not removing it
    const correctValues = removed
      ? question.correctValues.filter(v => v !== removed.value)
      : question.correctValues;
    onUpdate({ ...question, options, correctValues });
  }

  function toggleCorrect(value) {
    /* 
      Function that when question.options(N) have some options(M<=N) that is valid (not disabled)
      Usecase: User select/toggle (n<=M) options to be question.correctValues
      ==> Update question.correctValues
    */
    const correctValues = question.correctValues.includes(value)
      ? question.correctValues.filter(v => v !== value)
      : [...question.correctValues, value];
    onUpdate({ ...question, correctValues });
  }
  
  return (
    <div className="question-card card">
      <div className="question-header">
        <span className="question-number">Q{question.sortOrder}</span>
        <button type="button" className="btn-danger" title="Remove question" onClick={onRemove}>
          ✕ Remove
        </button>
      </div>

      <div className="field">
        <label>Question Name *</label>
        <input
          type="text"
          placeholder="Enter question name"
          value={question.name}
          onChange={e => updateField("name", e.target.value)}
        />
      </div>

      <div className="field">
        <label>Description</label>
        <textarea
          placeholder="Optional description"
          value={question.description}
          onChange={e => updateField("description", e.target.value)}
        />
      </div>

      <div className="field">
        <label>Sort Order</label>
        <input
          type="number"
          className="sort-input"
          value={question.sortOrder}
          onChange={e => updateField("sortOrder", Number(e.target.value))}
          min={1}
        />
      </div>

      <div className="options-section">
        <div className="options-header">
          <h4>Options</h4>
          <div className="options-col-labels">
            <span>Value</span>
            <span>Label</span>
            <span>Sort</span>
          </div>
        </div>

        {/*Implement OptionItem into each question*/}
        {question.options.map(option => (
          <OptionItem
            key={option.id}
            option={option}
            onUpdate={updated => updateOption(option.id, updated)}
            onRemove={() => removeOption(option.id)}
          />
        ))}

        <button type="button" className="btn-secondary" onClick={addOption}>
          + Add Option
        </button>
      </div>

      {/* Section to choose correct answer(s) */}
      {question.options.length > 0 && (
        <div className="correct-section">
          <h4>Correct Answer(s) *</h4>
          <div className="correct-checkboxes">
            {question.options.map(option => (
              <label key={option.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={question.correctValues.includes(option.value)}
                  onChange={() => toggleCorrect(option.value)}
                  disabled={!option.value}
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}