/*
Each option should have:
 - Value
 - Label
 - Sort order
*/

export function Option() {
  return (
    <div className="option-row">
      <input
        type="text"
        className="option-value"
      />
      <input
        type="text"
        className="option-label"
      />
      <input
        type="number"
        className="option-sort"
        min={1}
      />
    </div>
  );
}