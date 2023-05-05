import React from 'react';
import Box from '../Box/Box';

export function BoxRow({ boxes, start, end, currentIndex, gameRunning, stopGame }) {
  return (
    <div className="flex">
      {boxes.slice(start, end).map((box, index) => (
        <Box
          key={index}
          index={index + start}
          bgColor={box.bgColor}
          currentIndex={currentIndex}
          gameRunning={gameRunning}
          stopGame={stopGame}
        />
      ))}
    </div>
  );
}
