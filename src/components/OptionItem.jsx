/*
Each option should have:
 - Value
 - Label
 - Sort order
*/
import './OptionItem.css'

export function OptionItem({ option, onUpdate, onRemove }) {
  return (
    <div className="option-row">
      <input
        type="text"
        value={option.value}
        onChange={e => onUpdate({ ...option, value: e.target.value })}
        placeholder="Value"
        className="option-value"
      />
      <input
        type="text"
        value={option.label}
        onChange={e => onUpdate({ ...option, label: e.target.value })}
        placeholder="Label"
        className="option-label"
      />
      <input
        type="number"
        value={option.sortOrder}
        onChange={e => onUpdate({ ...option, sortOrder: Number(e.target.value) })}
        className="option-sort"
        min={1}
      />
      <button type="button" className="option-btn-remove" onClick={onRemove} title="Remove option">
        ✕
      </button>
    </div>
  );
}