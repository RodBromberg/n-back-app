import React from 'react'

export const HowToPlay = () => {
  return (
    <div style={{ height: 800 }} className="p-8 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-black">How to Play</h2>
      <div className="overflow-y-auto">
        <ol className="list-decimal pl-6 text-black">
          <li className="mb-2 text-black">
            Start the game by clicking the "Start" or "Begin" button.
          </li>
          <li className="mb-2 text-black">
            You will see a grid of boxes and hear a sound. Each box represents a position, and the sound represents a letter or a color.
          </li>
          <li className="mb-2 text-black">
            Pay attention to both the position and the sound. Try to remember the position and the sound as accurately as possible.
          </li>
          <li className="mb-2 text-black">
            After a few seconds, a new box will appear in a different position and with a new sound. You have to determine if the current position and sound match the position and sound that appeared two turns ago.
          </li>
          <li className="mb-2 text-black">
            If the current position and sound match the ones from two turns ago, click the "Yes" or "Match" button. Otherwise, click the "No" or "Mismatch" button.
          </li>
          <li className="mb-2 text-black">
            Continue this process for each new box that appears. Remember, you have to match the position and sound from two turns ago.
          </li>
          <li className="mb-2 text-black">
            The difficulty will increase as you progress, with more boxes and sounds to remember. Stay focused and try to improve your accuracy.
          </li>
          <li className="mb-4 text-black">
            The game will continue for a set number of rounds or a specific duration. Try to achieve the highest accuracy possible.
          </li>
        </ol>

        <h3 className="text-lg font-bold mb-2 text-black">Sample Round at Dual N-Back Level 2:</h3>
        <p className="mb-2 text-black">
          In this sample round, you will be presented with a 3x3 grid of boxes and a sequence of sounds. Each box represents a position, and each sound represents a letter. The objective is to determine if the current box and sound match the ones that appeared two turns ago.
        </p>
        <p className="mb-2 text-black">
          Let's say the sequence of boxes and sounds is as follows:
        </p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-300 p-4 text-center">Box 1</div>
          <div className="bg-gray-300 p-4 text-center">Box 2</div>
          <div className="bg-gray-300 p-4 text-center">Box 3</div>
          <div className="bg-gray-300 p-4 text-center">Box 4</div>
          <div className="bg-gray-300 p-4 text-center">Box 5</div>
          <div className="bg-gray-300 p-4 text-center">Box 6</div>
          <div className="bg-gray-300 p-4 text-center">Box 7</div>
          <div className="bg-gray-300 p-4 text-center">Box 8</div>
          <div className="bg-gray-300 p-4 text-center">Box 9</div>
        </div>
        <p className="mb-2 text-black">
          Let's go through the sample round step by step:
        </p>
        <ol className="list-decimal pl-6 mb-2 text-black">
          <li className="mb-2">
            Box 1 appears at position A and produces Sound A.
          </li>
          <li className="mb-2">
            Box 2 appears at position B and produces Sound B.
          </li>
          <li className="mb-2">
            Box 3 appears at position C and produces Sound C.
          </li>
          <li className="mb-2">
            Now, you need to recall the position and sound that appeared two turns ago:
          </li>
          <li className="mb-2">
            Box 1 (two turns ago) was at position A, and Sound A (two turns ago) was played.
          </li>
          <li className="mb-2">
            Based on your memory, determine if the current box and sound match the ones from two turns ago:
          </li>
          <li className="mb-2">
            In this case, the current box (Box 3) is at position C, and the current sound (Sound C) matches the ones from two turns ago.
          </li>
          <li className="mb-2">
            Finally, click the appropriate button to indicate whether it's a match or non-match:
          </li>
          <li className="mb-2">
            As the current box and sound match the ones from two turns ago, click the "Yes" or "Match" button.
          </li>
          <li className="mb-2">
            Continue this process for each new box and sound that appear in subsequent rounds. The difficulty will increase as you progress to higher levels, with more elements to remember, such as colors.
          </li>
        </ol>
        <p className="mb-2 text-black">
          Remember to stay focused, improve your accuracy, and challenge your working memory and cognitive abilities.
        </p>
        <p className="mb-2 text-black">
          Good luck and enjoy the game!
        </p>
      </div>
    </div>
  );
};








