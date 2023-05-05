import React from 'react';
import { Options } from '../Options/Options'

export const ControlPanel = ({ startGame, stopGame, level, handleLevelChange, speedBetweenFlashes, handleSpeedChange, nBack, handleNBackChange, correct, inCorrect }) => (
  <div>
    <button onClick={startGame}>Start</button>
    <button onClick={stopGame}>Stop</button>
    <Options label="Level:" value={level} options={[1, 2, 3, 4, 5]} handleChange={handleLevelChange} />
    <Options label="Set Speed:" value={speedBetweenFlashes} options={[1000, 1500, 2000, 2500, 3000]} handleChange={handleSpeedChange} />
    <Options label="N-Back:" value={nBack} options={[1, 2, 3, 4, 5, 6, 7, 8]} handleChange={handleNBackChange} />
    <div>
      <p>Score: {correct} / {inCorrect}</p>
      <p>Correct: {correct}</p> 
      <p>InCorrect: {inCorrect}</p> 
    </div>
  </div>
);


