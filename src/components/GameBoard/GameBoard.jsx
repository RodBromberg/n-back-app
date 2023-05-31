import React, { useEffect, useState, useRef, useCallback } from "react";
import { BoxRow } from "../BoxRow/BoxRow";
import { Howl, Howler } from 'howler';
import letterC from '../../audio/letter-c.wav'
import letterG from '../../audio/letter-g.wav'
import letterH from '../../audio/letter-h.wav'
import letterK from '../../audio/letter-k.wav'
import letterP from '../../audio/letter-p.wav'
import letterQ from '../../audio/letter-q.wav'
import letterT from '../../audio/letter-t.wav'
import letterW from '../../audio/letter-w.wav'
import incorrectAnswer from '../../audio/wrong-answer.mp3'
import { OptionsPanel } from "../OptionsPanel/OptionsPanel";
import { StartStop } from "../StartStop/StartStop";
import { GameNav } from "../GameNav/GameNav";
import { Modal } from "../Modal/Modal";
import { MobileButtons } from "../MobileButtons/MobileButtons";
import { ScoreModal } from '../Modal/ScoreModal'
import { HowToPlay } from "../HowToPlay/HowToPlay";

import { useGameControls } from '../../hooks/useGameControls'
import { useGetTally } from "../../hooks/useGetTally";
import { useKeyPress } from "../../hooks/useKeyPressHandler";
import { useChangeBoxColor } from "../../hooks/useChangeBox";
import { ButtonInstructions } from "../ButtonInstructions/ButtonInstructions";



export function StartButton({ startGame }) {
  return <button onClick={startGame}>Start</button>;
}

export function GameBoard() {
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);

  const toggleOptionsModal = () => {
    setOptionsModalOpen(!optionsModalOpen);
  };
  
  const [togglePlayModal, setTogglePlayModal] = useState(false)
  const [playIncorrectSound, setPlayIncorrectSound] = useState(false);
  const [randomColor, setRandomColor] = useState(false);
  const [randomShape, setRandomShape] = useState(false);
  const [countDown, setCountdown] = useState(null);
  const [TT,setTT] = useState(false)
  const [showScore, setShowScore] = useState(false);
  const [boxes, setBoxes] = useState(Array(9).fill({ bgColor: "white" }));
  const [letterIndex,setLetterIndex] = useState([]) 
  const [gameRunning, setGameRunning] = useState(false);
  const [runTime, setRunTime] = useState(2000);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  const [letterIndexes,setLetterIndexes] = useState([]) 
  const [indexes,setIndexes] = useState([]) 
  const [soundIndexes,setSoundIndexes] = useState([])

  const [correctBox, setCorrectBox] = useState(0);
  const [inCorrectBox, setInCorrectBox] = useState(0);

  const [correctLetter, setCorrectLetter] = useState(0);
  const [inCorrectLetter, setInCorrectLetter] = useState(0);


  const [correctColor, setCorrectColor] = useState(0);
  const [incorrectColor, setIncorrectColor] = useState(0);

  // round tally
  const [completedRounds, setCompletedRounds] = useState(
    parseInt(localStorage.getItem("completedRounds")) || 0
  );


  const [internalCount,setInternalCount] = useState(0)
  const [stopGame, setStopGame] = useState(false);
  const [total,setTotal] = useState(0)
  const [nBack, setNBack] = useState(2);
  const timeoutIdRef = useRef(null);
  const intervalIdRef = useRef(null);
  const countdownRef = useRef(null);
  const [roundLength] = useState(4)

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
 const incorrectAudio = {
  inCorrect: new Howl({ src: incorrectAnswer })
 }

 const [colorIndexes,setColorIndexes] = useState([])
 const [lastIndexColored, setLastIndexColored] = useState(null);

 const colors = ['yellow', 'purple', 'blue', 'red', 'orange', 'green'];

 const generateRandomColor = useCallback(() => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  setColorIndexes((prevColorIndexes) => [...prevColorIndexes, randomColor]);
  return randomColor;
}, []);



const generateRandomIndex = useCallback((boxes) => {
  const randomIndex = Math.floor(Math.random() * 9);
  setIndexes((prevIndexes) => [...prevIndexes, randomIndex]);
  setLastIndexColored(randomIndex); // set the lastIndexColored state variable to the new index
  return randomIndex;
}, []);


  const generateRandomLetter = () => {
      const randomIndex = Math.floor(Math.random() * 8);
      setLetterIndexes([...letterIndexes, 0]);
      setSoundIndexes((prevSoundIndexes) => {
        const newSoundIndexes = [...prevSoundIndexes, letters[0]];
        return newSoundIndexes;
      });
      if (total > nBack+1) {
        setSlow(slow => slow + 1);
        setFast(fast => fast + 1);
      }
      
      return 0;
};
  
  const startGame = () => {
    setGameRunning(true);
    setStopGame(false);
    setScore(0);
    let i = 0;
    const intervalId = setInterval(() => {
      const newIndex = generateRandomIndex(boxes);
      const idx = generateRandomLetter();
      setCurrentLetter(letters[idx]);
    
      sounds[letters[idx]].play();
    
      setTotal((total) => total + 1);
      setCurrentIndex(newIndex);
      const updatedBoxes = [...boxes];
      updatedBoxes.forEach((box, index) => {
        if (currentIndex === index) {
          updatedBoxes[index] = {
            ...updatedBoxes[index],
            bgColor: "white",
          };
        }
        if (index === newIndex) {
          if (randomColor) {
            const newColor = generateRandomColor();
            updatedBoxes[index] = {
              ...updatedBoxes[index],
              bgColor: newColor,
            };
          } else {
            updatedBoxes[index] = {
              ...updatedBoxes[index],
              bgColor: 'red'
            };
          }
        }
      });
      setBoxes(updatedBoxes);
    
      const timeoutId = setTimeout(() => {
        const resetBoxes = [...boxes];
        resetBoxes[newIndex].bgColor = "white";
        setBoxes(resetBoxes);
      
        if (i >= roundLength) {
          handleGameOver();
        }
      
        i++;
      }, runTime + 1000);
      
    
      timeoutIdRef.current = timeoutId; // store timeout ID in ref
    
      if (i >= roundLength) {
        clearInterval(intervalId);
        clearTimeout(timeoutIdRef.current);
        setCurrentIndex(null);
        setGameRunning(false);
        setGameOver(true);
      }
    }, runTime);
    

    intervalIdRef.current = intervalId; // store interval ID in ref
  };
  const handleGameOver = () => {
    clearInterval(intervalIdRef.current);
    clearTimeout(timeoutIdRef.current);
    setCurrentIndex(null);
    setGameRunning(false);
    setGameOver(true);
    setShowScore(false);
    setTimeout(() => {
      setShowScore(true);
    }, 2000);
  };

  const handleRunTimeChange = (event) => {
    setRunTime(parseInt(event.target.value, 10));
  };

  const handleIncorrectSoundChange = (event) => {
    setPlayIncorrectSound(event.target.checked);
  };

  const handleRandomColorChange = (event) => {
    const newValue = event.target.value === "true"; // Convert the string to a boolean
    setRandomColor(newValue);
  };
  
  const handleRandomShapeChange = (event) => {
    setRandomShape(event.target.checked);
  };

// change box Color with appropriate delay
useChangeBoxColor(lastIndexColored, setBoxes, setLastIndexColored, runTime);


const handleStopClick = () => {
  setStopGame(true);
  setGameRunning(false);
  clearTimeout(timeoutIdRef.current);
  clearInterval(intervalIdRef.current);
  setBoxes((prevBoxes) => {
    const resetBoxes = [...prevBoxes];
    if (lastIndexColored !== null) {
      resetBoxes[lastIndexColored].bgColor = "white";
      setLastIndexColored(null); // reset the lastIndexColored state variable
    }
    return resetBoxes;
  });
};

const startCountDown = () => {
  setCountdown(3)
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
            setCountdown(null)
            return 0;
          }
          return countDown - 1;
      });
  }, 1000);
  
};


const handleNextRound = () => {
  setCorrectBox(0);
  setInCorrectBox(0);
  setCorrectLetter(0);
  setInCorrectLetter(0);
  setCurrentIndex(null);
  setShowScore(false);
  setCompletedRounds((prevCount) => Number(prevCount) + 1);


  if (countdownRef.current === null) {
    // Start the countdown only if it's not already running
    startCountDown();
  } else {
    clearTimeout(countdownRef.current); // Clear the previous countdown timer
    startGame(); // Start the next round immediately
  }
};

const handleCloseScoreModal = () => {
  setShowScore(false);
  setGameOver(false);
  setCountdown(null); // Clear the countdown timer
  clearInterval(timer); // Clear the interval used for countdown
};

const handleNChange = (event) => {
  setNBack(parseInt(event.target.value));
};
const [keyPressCount, setKeyPressCount] = useState(0);

// 
const { fired  } = useGetTally(
  total,
  nBack,
  soundIndexes,
  colorIndexes,
  indexes,
  internalCount,
  setInCorrectLetter,
  setIncorrectColor,
  setInCorrectBox
);

const handleKeyPress = useKeyPress(playIncorrectSound, soundIndexes, indexes, colorIndexes, total, nBack, internalCount, setKeyPressCount, setInCorrectLetter, setCorrectBox, setInCorrectBox, setCorrectColor, setIncorrectColor);

function handleSoundButtonTouch() {
  handleKeyPress({ keyCode: 83 }, "sound");
}
function handleLocationButtonTouch() {
  handleKeyPress({ keyCode: 76 }, "location");
}
    
const [instructionsModalOpen, setInstructionsModalOpen] = useState(false);

const toggleInstructionsModal = () => {
  setInstructionsModalOpen(!instructionsModalOpen);
};

const rowIndices = [
  { start: 0, end: 3 },
  { start: 3, end: 6 },
  { start: 6, end: 9 },
];

useEffect(() => {
  if(total > nBack) {
    setInternalCount(internalCount + 1)
  }
},[total,currentIndex,TT]);

useEffect(() => {
  document.addEventListener("keydown", handleKeyPress);
  return () => {
    document.removeEventListener("keydown", handleKeyPress);
  };
}, [handleKeyPress]);
  
  return (
    <>
      <GameNav
        onSoundButtonTouch={handleSoundButtonTouch}
        onLocationButtonTouch={handleLocationButtonTouch}
        toggleOptionsModal={toggleOptionsModal}
        togglePlayModal={togglePlayModal}
        toggleInstructionsModal={toggleInstructionsModal}
      />

      <h2 className='text-white'>{randomColor ? 'Tri-N-Back' : 'Dual-N-Back'}</h2>
  
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="mb-8">
          {countDown !== null && (
            <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="text-white text-6xl font-bold">{countDown}</div>
            </div>
          )}
        </div>

        <div className="flex">
            {/* Show instruction for audio match */}
          <ButtonInstructions letter={'S'}/>
          <ButtonInstructions letter={'L'}/>
            {/* Show instruction for color match if color is enabled */}
            {randomColor && (
            <ButtonInstructions letter={'C'}/>
            )}
        </div>



            
        {/* Display game information */}
        <h2 className="text-white">
          {randomColor ? "Tri-N-Back" : "Dual-N-Back"}
        </h2>


        <div className="mb-4 text-lg font-bold">
          Current n-Back: {nBack}
        </div>
        <div className="mb-4 text-lg font-bold">
          Color mode: {randomColor ? "Enabled" : "Disabled"}
        </div>
        {/* Display game board */}
        {completedRounds && <p>'look here',{completedRounds}</p>}
        {rowIndices.map((row, index) => (
        <BoxRow
          key={index}
          boxes={boxes}
          start={row.start}
          end={row.end}
          currentIndex={currentIndex}
          gameRunning={gameRunning}
          stopGame={stopGame}
        />
      ))}
        <StartStop
          startCountDown={startCountDown}
          handleStopClick={handleStopClick}
        />
        <MobileButtons
          handleLocationButtonTouch={handleLocationButtonTouch}
          handleSoundButtonTouch={handleSoundButtonTouch}
        />
        <Modal isOpen={optionsModalOpen} closeModal={toggleOptionsModal}>
          <OptionsPanel
            nBack={nBack}
            runTime={runTime}
            randomColor={randomColor}
            playIncorrectSound={playIncorrectSound}
            handleNChange={handleNChange}
            handleRunTimeChange={handleRunTimeChange}
            handleRandomColorChange={handleRandomColorChange}
            handleIncorrectSoundChange={handleIncorrectSoundChange}
          />
        </Modal>
        <Modal isOpen={instructionsModalOpen} closeModal={toggleInstructionsModal}>
          <HowToPlay />
        </Modal>
        {/* Render the ScoreModal overlay when the game is over and the showScore state is true */}
        {gameOver && showScore && (
          <ScoreModal
          correctLetter={correctLetter}
          inCorrectLetter={inCorrectLetter}
          correctBox={correctBox}
          inCorrectBox={inCorrectBox}
          randomColor={randomColor}
          onClose={handleCloseScoreModal}
          onNextRound={handleNextRound}
          completedRounds={completedRounds}
          roundCount={completedRounds}
        />
        )}
      </div>
    </>
  );
}


