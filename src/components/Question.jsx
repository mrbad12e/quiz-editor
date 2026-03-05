/*
Each multiple-choice question should have:
 - Name
 - Description
 - Sort order
 - A list of options (at least 2 options)
 - A list of values of correct options (at least 1 option value)
*/

export function Question() {
  
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
        />
      </div>

      <div className="field">
        <label>Description</label>
        <textarea
          placeholder="Optional description"
        />
      </div>

      <div className="field">
        <label>Sort Order</label>
        <input
          type="number"
          className="sort-input"
        />
      </div>

      <div className="options-section">
        <div className="options-header">
          <h4>Options</h4>
          <div className="options-col-labels">
            <span>Value</span>
            <span>Label</span>
            <span>Sort</span>
            <span></span>
          </div>
        </div>
      </div>

    </div>
  );
}