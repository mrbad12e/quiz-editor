/*
Each multiple-choice question should have:
 - Name
 - Description
 - Sort order
 - A list of options (at least 2 options)
 - A list of values of correct options (at least 1 option value)
*/
import { OptionItem } from "./OptionItem";

export function Question({question, onUpdate}) {
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

  
  return (
    <div className="question-card card">
      <div className="question-header">
        <span className="question-number">Q1</span>
        <button type="button" className="btn-remove" title="Remove question">
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
          />
        ))}

        <button type="button" className="btn-secondary" onClick={addOption}>
          + Add Option
        </button>
      </div>

      

    </div>
  );
}