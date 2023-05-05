import React from 'react';

export const Options = ({ label, value, options, handleChange }) => (
  <div>
    <label>{label}</label>
    <select value={value} onChange={handleChange}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);