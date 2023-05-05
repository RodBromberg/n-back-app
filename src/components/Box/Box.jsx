import React from 'react';

export default function Box({ index, bgColor, currentIndex, gameRunning, stopGame }) {
  const boxStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: bgColor,
    border: '1px solid black',
  };

  return (
    <div className="p-2">
      <div style={boxStyle}></div>
    </div>
  );
}
