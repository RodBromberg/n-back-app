// useKeyPress.js
import { useCallback } from 'react';
import { Howl } from 'howler';
import incorrectAnswer from '../audio/wrong-answer.mp3'

const incorrectAudio = {
  inCorrect: new Howl({ src: incorrectAnswer })
};

export function useKeyPress(playIncorrectSound, soundIndexes, indexes, colorIndexes, total, nBack, internalCount, setKeyPressCount, setInCorrectLetter, setCorrectBox, setInCorrectBox, setCorrectColor, setIncorrectColor) {
  return useCallback((event) => {
    const L_LOCATION = 76;
    const S_LOCATION = 83;
    const C_LOCATION = 67;

    if (total > nBack) {
      if (event.keyCode === S_LOCATION && soundIndexes[nBack - nBack + internalCount] === soundIndexes[soundIndexes.length - 1]) {
        console.log("SOUND hit");
        setKeyPressCount((k) => k + 1);
      }
      if (event.keyCode === S_LOCATION && soundIndexes[nBack - nBack + internalCount] !== soundIndexes[soundIndexes.length - 1]) {
        console.log("SOUND miss");
        setInCorrectLetter((k) => k + 1);
        if (playIncorrectSound) {
          incorrectAudio.inCorrect.play();
        }
      }
      if (event.keyCode === L_LOCATION && indexes[nBack - nBack + internalCount] === indexes[indexes.length - 1]) {
        console.log("LOCATION hit");
        setCorrectBox((correctBox) => correctBox + 1);
      }
      if (event.keyCode === L_LOCATION && indexes[nBack - nBack + internalCount] !== indexes[indexes.length - 1]) {
        console.log("LOCATION miss");
        setInCorrectBox((incorrectBox) => incorrectBox + 1);
        if (playIncorrectSound) {
          incorrectAudio.inCorrect.play();
        }
      }
      if (event.keyCode === C_LOCATION && colorIndexes[nBack - nBack + internalCount] === colorIndexes[colorIndexes.length - 1]) {
        console.log("COLOR hit");
        setCorrectColor((correctColor) => correctColor + 1);
      }
      if (event.keyCode === C_LOCATION && colorIndexes[nBack - nBack + internalCount] !== colorIndexes[colorIndexes.length - 1]) {
        console.log("COLOR miss");
        setIncorrectColor((incorrectColor) => incorrectColor + 1);
        if (playIncorrectSound) {
          incorrectAudio.inCorrect.play();
        }
      }
    }
  }, [playIncorrectSound, soundIndexes, indexes, colorIndexes, total, nBack, internalCount, setKeyPressCount, setInCorrectLetter, setCorrectBox, setInCorrectBox, setCorrectColor, setIncorrectColor]);
}
