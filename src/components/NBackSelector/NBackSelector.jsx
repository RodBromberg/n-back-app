import React from "react";

function NBackSelector({ n, handleNChange }) {
  return (
    <div>
      <label htmlFor="n-select">N-back:</label>
      <select id="n-select" value={n} onChange={handleNChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
}

export default NBackSelector;
