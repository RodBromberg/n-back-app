import { useState, useEffect } from 'react';

const useGenerateBoxes = (
  currentBox,
  gameOver,
  color,
  gameOverColor,
  prevIndex
) => {
  const [boxes, setBoxes] = useState([]);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    if (currentBox === prevIndex) {
      const updatedBoxes = [...boxes];
     if(updatedBoxes[currentBox]){ updatedBoxes[currentBox].color = 'blue';}
      setBoxes(updatedBoxes);
      return;
    }

    const newBoxes = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const idx = i * 3 + j;
        const box = {
          id: `${i}-${j}`,
          x: 0,
          y: 0,
          size: 100,
          color:
            currentBox === idx
              ? color
              : prevIndex === idx
              ? "blue"
              : gameOver
              ? gameOverColor
              : "#000000",
          clicked: false,
        };

        newBoxes.push(box);
      }
    }

    setBoxes(newBoxes);

    const updatedBoxes = [...newBoxes];

    if (prevIndex !== null && updatedBoxes[prevIndex]) {
      if (updatedBoxes[prevIndex] && updatedBoxes[prevIndex].color) {
        updatedBoxes[prevIndex].color = '#000000';
      }
    }

    setTimeout(() => {
      if (currentBox !== null && updatedBoxes[currentBox]) {
        if (updatedBoxes[currentBox] && updatedBoxes[currentBox].color) {
          updatedBoxes[currentBox].color = '#000000';
          setBoxes(updatedBoxes);
        }
      }
    }, 1000);

    setPrev(currentBox);
  }, [currentBox, gameOver, color, gameOverColor, prevIndex]);

  return [boxes, setBoxes];
};

export default useGenerateBoxes;