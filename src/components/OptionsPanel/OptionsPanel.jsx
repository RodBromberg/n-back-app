import React from 'react'

export const OptionsPanel = ({ nBack, handleNChange, runTime, handleRunTimeChange, randomColor, handleRandomColorChange, playIncorrectSound, handleIncorrectSoundChange }) => {
  return (
    <div className="flex-col text-gray-800">
      <div className="w-64 mb-8">
        <label className="text-lg font-bold">N-Back:</label>
        <select
          className="w-full mt-2 border-2 border-gray-400 rounded-lg p-2"
          value={nBack}
          onChange={handleNChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className="w-64 mb-8">
        <label className="text-lg font-bold">Run Time (ms):</label>
        <select
          className="w-full mt-2 border-2 border-gray-400 rounded-lg p-2"
          value={runTime}
          onChange={handleRunTimeChange}
        >
          <option value={1500}>1500</option>
          <option value={2000}>2000</option>
        </select>
      </div>
      <div className="w-64 mb-8">
        <label className="text-lg font-bold">Random Color:</label>
        <select
          className="w-full mt-2 border-2 border-gray-400 rounded-lg p-2"
          value={randomColor.toString()} // Convert boolean to string
          onChange={handleRandomColorChange}
        >
          <option value="false">Disabled</option>
          <option value="true">Enabled</option>
        </select>
      </div>
      <div className="mb-8">
        <label className="text-lg font-bold">Play sound for incorrect answers:</label>
        <input
          className="ml-2"
          type="checkbox"
          checked={playIncorrectSound}
          onChange={handleIncorrectSoundChange}
        />
      </div>
    </div>
  )
}
