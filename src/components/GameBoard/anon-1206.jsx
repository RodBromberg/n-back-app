import React, { useEffect, useState, useRef, useCallback } from "react";
import Box from '../Box/Box'
import { BoxRow } from "../BoxRow/BoxRow";
import NBackSelector from "../NBackSelector/NBackSelector";
import { Howl, Howler } from 'howler';
import letterC from '../../audio/letter-c.wav'
import letterG from '../../audio/letter-g.wav'
import letterH from '../../audio/letter-h.wav'
import letterK from '../../audio/letter-k.wav'
import letterP from '../../audio/letter-p.wav'
import letterQ from '../../audio/letter-q.wav'
import letterT from '../../audio/letter-t.wav'
import letterW from '../../audio/letter-w.wav'


export function StartButton({ startGame }) {
  return <button onClick={startGame}>Start</button>;
}

export function GameBoard() {

    const [arr,setArr] = useState([])
    const [countdown, setCountdown] = useState(null);


const [boxes, setBoxes] = useState(Array(9).fill({ bgColor: "white" }));
  const [indexes,setIndexes] = useState([]) 
  const [letterIndex,setLetterIndex] = useState([]) 
  const [letterIndexes,setLetterIndexes] = useState([]) 
  const [gameRunning, setGameRunning] = useState(false);
  const [runTime, setRunTime] = useState(1500);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [correctBox, setCorrectBox] = useState(0);
  const [inCorrectBox, setInCorrectBox] = useState(0);

  const [correctLetter, setCorrectLetter] = useState(0);
  const [inCorrectLetter, setInCorrectLetter] = useState(0);

  const [internalCount,setInternalCount] = useState(0)
  const [stopGame, setStopGame] = useState(false);
  const [total,setTotal] = useState(0)
  const [nBack, setNBack] = useState(2);
  const timeoutIdRef = useRef(null);
  const intervalIdRef = useRef(null);
  const [roundLength] = useState(30)

  const [currentLetter, setCurrentLetter] = useState(null);
  const letters = ['c', 'g', 'h', 'k', 'p', 'q', 't', 'w'];

  const [slow,setSlow] = useState(0)
  const [fast,setFast] = useState(nBack)
  const sounds = {
    c: new Howl({ src: letterC }),
    g: new Howl({ src: letterG }),
    h: new Howl({ src: letterH }),
    k: new Howl({ src: letterK }),
    p: new Howl({ src: letterP }),
    q: new Howl({ src: letterQ }),
    t: new Howl({ src: letterT }),
    w: new Howl({ src: letterW }),
 };
console.log(indexes)

const startCountdown = () => {
  setCountdown(3);
  const countdownTimer = setInterval(() => {
    setCountdown((prevCountdown) => {
      if (prevCountdown === 1) {
        clearInterval(countdownTimer);
        startGame();
        return null;
      }
      return prevCountdown - 1;
    });
  }, 1000);
};


const startGame = () => {
  setTotal(-1);
  setGameRunning(true);
  setStopGame(false);
  setScore(0);
  const timeoutId = setTimeout(() => {
    setGameRunning(false);
    setGameOver(true);
  }, roundLength * 1000);

  let i = 0;
  const intervalId = setInterval(() => {
    const newIndex = generateRandomIndex(boxes);
    setTotal(total => total + 1);
    setCurrentIndex(newIndex);
    const updatedBoxes = [...boxes];
    updatedBoxes.forEach((box, index) => {
      if (currentIndex === index) {
        updatedBoxes[index] = {
          ...updatedBoxes[index],
          bgColor: "white"
        };
      }
      if (index === newIndex) {
        updatedBoxes[index] = {
          ...updatedBoxes[index],
          bgColor: "yellow"
        };
      }
    });
    setBoxes(updatedBoxes);

    setTimeout(() => {
      const resetBoxes = [...boxes];
      resetBoxes[newIndex].bgColor = "white";
      setBoxes(resetBoxes);
    }, runTime - 500);

    // New letter generation code
    const letterIdx = generateRandomLetter();
    setCurrentLetter(letters[letterIdx]);
    setArr([...arr, letters[letterIdx]]);
    
    Object.values(sounds).forEach(sound => sound.stop());

    // Play the new sound
    sounds[letters[letterIdx]].play();

    if (i >= roundLength) {
      clearInterval(intervalId);
      clearTimeout(resetTimer);
    }

    i++;
  }, runTime);

  return () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };
};


// const generateNewState = () => {
//   const newIndex = generateRandomIndex(boxes);
//   setTotal((total) => total + 1);
//   setCurrentIndex(newIndex);
//   const updatedBoxes = [...boxes];
//   updatedBoxes.forEach((box, index) => {
//     if (currentIndex === index) {
//       updatedBoxes[index] = {
//         ...updatedBoxes[index],
//         bgColor: "white",
//       };
//     }
//     if (index === newIndex) {
//       updatedBoxes[index] = {
//         ...updatedBoxes[index],
//         bgColor: "yellow",
//       };
//     }
//   });
//   setBoxes(updatedBoxes);

//   setTimeout(() => {
//     const resetBoxes = [...boxes];
//     resetBoxes[newIndex].bgColor = "white";
//     setBoxes(resetBoxes);
//   }, runTime - 500);

//   const letterIdx = generateRandomLetter();
//   setCurrentLetter(letters[letterIdx]);
//   setArr([...arr, letters[letterIdx]]);
//   sounds[letters[letterIdx]].play();
// };

// const generateRandomIndex = useCallback((boxes) => {
//   const randomIndex = Math.floor(Math.random() * 9);
//   setIndexes((prevIndexes) => [...prevIndexes, randomIndex]);
  
//   const randomLetterIndex = Math.floor(Math.random() * letters.length);
//   setLetterIndex((prevLetterIndex) => [...prevLetterIndex, randomLetterIndex]);

//   return randomIndex;
// }, []);

// ajj ajjj working
  const generateRandomIndex = useCallback((boxes) => {
    const randomIndex = Math.floor(Math.random() * 9);
    setIndexes((prevIndexes) => [...prevIndexes, 0]);
    return randomIndex;
  }, []);
  
  const handleStopClick = () => {
    setStopGame(true);
    setGameRunning(false);
    clearTimeout(timeoutIdRef.current);
    clearInterval(intervalIdRef.current);
  };
  const handleNChange = (event) => {
    setNBack(parseInt(event.target.value));
  };
  const generateRandomLetter = () => {
    // const randomIndex = Math.floor(Math.random() * letters.length);
    const randomIndex = Math.floor(Math.random() * 2);

    setLetterIndexes([...letterIndexes, randomIndex]);

    setArr([...arr, letters[randomIndex]]);
    console.log(arr, 'THESE ARE THE LETTERS')
    console.log({ total })
    if (total > nBack+1) {
      setSlow(slow => slow + 1);
      setFast(fast => fast + 1);
    }
    
    return randomIndex;
  };
  

  

  const [keyPressCount, setKeyPressCount] = useState(0);
  const [keyIncorrect, setKeyIncorrect] = useState(0);


  function handleKeyPress(event) {
    const L_LOCATION = 76;
    const S_LOCATION = 83;

    if (total > nBack) {
        if (event.keyCode === S_LOCATION && arr[slow] === arr[fast]) {
            console.log('SOUND hit');
            setKeyPressCount(k => k + 1);
        }

        if (event.keyCode === S_LOCATION && arr[slow] !== arr[fast]) {
          console.log('SOUND miss');
          setKeyIncorrect(k => k - 1);
      }

        if(event.keyCode === L_LOCATION && indexes[nBack - nBack + internalCount] === indexes[indexes.length - 1]) {
            console.log('LOCATION hit');
            setCorrectBox(correctBox => correctBox + 1);
        }  
        if(event.keyCode === L_LOCATION && indexes[nBack - nBack + internalCount] !== indexes[indexes.length - 1]) {
            console.log('LOCATION miss');
            setInCorrectBox(incorrectBox => incorrectBox + 1);
        }       
    }
}


  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameRunning, currentIndex, stopGame, indexes, score, nBack,total,keyPressCount]);
  

return (
  <div className="flex flex-col items-center justify-center w-full h-screen">
    <div className="mb-8">
    {countdown !== null && (
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="text-white text-6xl font-bold">{countdown}</div>
      </div>
    )}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={startCountdown}
      >
        Start
      </button>
    </div>

    {gameOver && (
      <p className="mb-8 text-2xl font-bold">
        Game Over! Final score: {score}
      </p>
    )}

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

    <BoxRow boxes={boxes} start={0} end={3} currentIndex={currentIndex} gameRunning={gameRunning} stopGame={stopGame} />
    <BoxRow boxes={boxes} start={3} end={6} currentIndex={currentIndex} gameRunning={gameRunning} stopGame={stopGame} />
    <BoxRow boxes={boxes} start={6} end={9} currentIndex={currentIndex} gameRunning={gameRunning} stopGame={stopGame} />


    <div className="mt-8">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={handleStopClick}
      >
        Stop
      </button>
    </div>
  </div>
);

}

  
  
  







import React, { useEffect, useState, useRef, useCallback } from "react";
import Box from '../Box/Box'
import { BoxRow } from "../BoxRow/BoxRow";
import NBackSelector from "../NBackSelector/NBackSelector";
import { Howl, Howler } from 'howler';
import letterC from '../../audio/letter-c.wav'
import letterG from '../../audio/letter-g.wav'
import letterH from '../../audio/letter-h.wav'
import letterK from '../../audio/letter-k.wav'
import letterP from '../../audio/letter-p.wav'
import letterQ from '../../audio/letter-q.wav'
import letterT from '../../audio/letter-t.wav'
import letterW from '../../audio/letter-w.wav'


export function StartButton({ startGame }) {
  return <button onClick={startGame}>Start</button>;
}

export function GameBoard() {

    const [soundIndexes,setSoundIndexes] = useState([])
    const [countDown, setCountdown] = useState(3);
    const [TT,setTT] = useState(false)


  const [boxes, setBoxes] = useState(Array(9).fill({ bgColor: "white" }));
  const [indexes,setIndexes] = useState([]) 
  // console.log(indexes)
  const [letterIndex,setLetterIndex] = useState([]) 
  const [letterIndexes,setLetterIndexes] = useState([]) 
  const [gameRunning, setGameRunning] = useState(false);
  const [runTime, setRunTime] = useState(2000);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [correctBox, setCorrectBox] = useState(0);
  const [inCorrectBox, setInCorrectBox] = useState(0);

  const [correctLetter, setCorrectLetter] = useState(0);
  const [inCorrectLetter, setInCorrectLetter] = useState(0);

  const [internalCount,setInternalCount] = useState(0)
  const [stopGame, setStopGame] = useState(false);
  const [total,setTotal] = useState(0)
  const [nBack, setNBack] = useState(2);
  const timeoutIdRef = useRef(null);
  const intervalIdRef = useRef(null);
  const [roundLength] = useState(30)

  const [currentLetter, setCurrentLetter] = useState(null);
  const letters = ['c', 'g', 'h', 'k', 'p', 'q', 't', 'w'];

  const [slow,setSlow] = useState(0)
  const [fast,setFast] = useState(nBack)
  const sounds = {
    c: new Howl({ src: letterC }),
    g: new Howl({ src: letterG }),
    h: new Howl({ src: letterH }),
    k: new Howl({ src: letterK }),
    p: new Howl({ src: letterP }),
    q: new Howl({ src: letterQ }),
    t: new Howl({ src: letterT }),
    w: new Howl({ src: letterW }),
 };


  const generateRandomIndex = useCallback((boxes) => {
    const randomIndex = Math.floor(Math.random() * 9);
    setIndexes((prevIndexes) => [...prevIndexes, randomIndex]);
    return randomIndex;
  }, []);

  // console.log(soundIndexes, 'HERE')

  const generateRandomLetter = () => {
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
    };

  const startCountDown = () => {
    let gameStarted = false;
    const timer = setInterval(() => {
        setCountdown(countDown => {
            if(countDown === 1) {
              clearInterval(timer);
              // ensures the startGame is ran only one time
              if (!gameStarted) {
                gameStarted = true;
                startGame();
              }
              return 0;
            }
            return countDown - 1;
        });
    }, 1000);
};


    

  const startGame = () => {
      setGameRunning(true);
      setStopGame(false);
      setScore(0);
      const timeoutId = setTimeout(() => {
        setGameRunning(false);
        setGameOver(true);
      }, roundLength * 1000);
  
      let i = 0;
      const intervalId = setInterval(() => {
      const newIndex = generateRandomIndex(boxes);
      const idx = generateRandomLetter();
      setCurrentLetter(letters[idx]);

      sounds[letters[idx]].play();

        setTotal(total => total + 1)
        setCurrentIndex(newIndex);
        const updatedBoxes = [...boxes];
        updatedBoxes.forEach((box, index) => {
        if (currentIndex === index) {
          updatedBoxes[index] = {
            ...updatedBoxes[index],
            bgColor: "white"
          };
        }
        if (index === newIndex) {
          updatedBoxes[index] = {
            ...updatedBoxes[index],
            bgColor: "yellow"
          };
        }
      });
      setBoxes(updatedBoxes);

        setTimeout(() => {
          const resetBoxes = [...boxes];
          resetBoxes[newIndex].bgColor = "white";
          setBoxes(resetBoxes);
        }, runTime - 500);

        if (i >= roundLength) {
          clearInterval(intervalId);
          clearTimeout(resetTimer);
        }

        i++;
      }, runTime);

      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
  };

useEffect(() => {
  // if (currentIndex !== null) {
  //   const idx = generateRandomLetter();
  //   setCurrentLetter(letters[idx]);
  //   setSoundIndexes([...soundIndexes,letters[idx]])
  //   sounds[letters[idx]].play();
  // }
  if(total > nBack) {
    setInternalCount(internalCount + 1)
  }
},[total,currentIndex,TT]);

const handleStopClick = () => {
  setStopGame(true);
  setGameRunning(false);
  clearTimeout(timeoutIdRef.current);
  clearInterval(intervalIdRef.current);
};
const handleNChange = (event) => {
  setNBack(parseInt(event.target.value));
};


  

  

  const [keyPressCount, setKeyPressCount] = useState(0);
  const [keyIncorrect, setKeyIncorrect] = useState(0);


  function handleKeyPress(event) {
    const L_LOCATION = 76;
    const S_LOCATION = 83;

    if (total > nBack) {
        if (event.keyCode === S_LOCATION && soundIndexes[nBack - nBack + internalCount] === soundIndexes[soundIndexes.length - 1]) {
            console.log('SOUND hit');
            setKeyPressCount(k => k + 1);
        }

        if (event.keyCode === S_LOCATION && soundIndexes[nBack - nBack + internalCount] !== soundIndexes[soundIndexes.length - 1]) {
          console.log('SOUND miss');
          setKeyIncorrect(k => k - 1);
      }

        if(event.keyCode === L_LOCATION && indexes[nBack - nBack + internalCount] === indexes[indexes.length - 1]) {
            console.log('LOCATION hit');
            setCorrectBox(correctBox => correctBox + 1);
        }  
        if(event.keyCode === L_LOCATION && indexes[nBack - nBack + internalCount] !== indexes[indexes.length - 1]) {
            console.log('LOCATION miss');
            setInCorrectBox(incorrectBox => incorrectBox + 1);
        }       
    }
}


  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameRunning, currentIndex, stopGame, indexes, score, nBack,total,keyPressCount]);

  
 

//   useEffect(()=>{
//     if (total > nBack+1) {
//         setSlow((prevSlow) => prevSlow + 1);
//         setFast((prevFast) => prevFast + 1);
//       }
//     if (currentIndex !== null) {
//         const idx = generateRandomLetter();
//         setCurrentLetter(letters[idx]);
//         setArr([...arr,letters[idx]])
//         sounds[letters[idx]].play();
//       }
//       if(total > nBack) {
//         setInternalCount(internalCount + 1)
//     }

//   },[total,currentIndex])

 
return (
  <>
  <div className="flex flex-col items-center justify-center w-full h-screen">
    <div className="mb-8">
      {countDown}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={startCountDown}
      >
        Start
      </button>
    </div>

    {gameOver && (
      <p className="mb-8 text-2xl font-bold">
        Game Over! Final score: {score}
      </p>
    )}

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

    <BoxRow boxes={boxes} start={0} end={3} currentIndex={currentIndex} gameRunning={gameRunning} stopGame={stopGame} />
    <BoxRow boxes={boxes} start={3} end={6} currentIndex={currentIndex} gameRunning={gameRunning} stopGame={stopGame} />
    <BoxRow boxes={boxes} start={6} end={9} currentIndex={currentIndex} gameRunning={gameRunning} stopGame={stopGame} />


    <div className="mt-8">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={handleStopClick}
      >
        Stop
      </button>
    </div>
  </div>
  </>
);

}

  
  
  
