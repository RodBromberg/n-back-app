// useGameControls.js
import { useState, useEffect, useCallback } from 'react';
import { colors, letters } from '../components/Constants/constants'

export const useGameControls = (nBack, locationMode, colorMode, soundMode) => {
  const [colorIndexes, setColorIndexes] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [letterIndexes, setLetterIndexes] = useState([]);
  const [soundIndexes, setSoundIndexes] = useState([]);
  const [total, setTotal] = useState(0);
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const [lastIndexColored, setLastIndexColored] = useState(null);

  const generateRandomColor = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    setColorIndexes((prevColorIndexes) => [...prevColorIndexes, randomColor]);
    return randomColor;
  }, []);

  const generateRandomIndex = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * 9);
    setIndexes((prevIndexes) => [...prevIndexes, randomIndex]);
    setLastIndexColored(randomIndex);
    return randomIndex;
  }, []);

  const generateRandomLetter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * 8);
    setLetterIndexes([...letterIndexes, randomIndex]);
    setSoundIndexes((prevSoundIndexes) => {
      const newSoundIndexes = [...prevSoundIndexes, letters[randomIndex]];
      return newSoundIndexes;
    });
    if (total > nBack+1) {
      setSlow(slow => slow + 1);
      setFast(fast => fast + 1);
    }
    return randomIndex;
  }, [total, nBack, letterIndexes]);

  useEffect(() => {
    if (total > nBack && colorMode && colorIndexes[total] === colorIndexes[total - nBack]) {
      setSlow(slow => slow + 1);
    }
    if (total > nBack && locationMode && indexes[total] === indexes[total - nBack]) {
      setSlow(slow => slow + 1);
    }
    if (total > nBack && soundMode && soundIndexes[total] === soundIndexes[total - nBack]) {
      setSlow(slow => slow + 1);
    }
  }, [total, nBack, colorMode, locationMode, soundMode, colorIndexes, indexes, soundIndexes]);

  return {
    colorIndexes,
    indexes,
    letterIndexes,
    soundIndexes,
    lastIndexColored,
    total,
    slow,
    fast,
    generateRandomColor,
    generateRandomIndex,
    generateRandomLetter,
  };
};
