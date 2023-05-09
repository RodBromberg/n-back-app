import React from 'react'

export const HowToPlay = () => {
  return (
    <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">How to Play</h2>
    <p className="mb-2">
      This is a n-back game where you must remember the location of a box
      or the sound and/or color of a letter n steps back.
    </p>
    <p className="mb-2">
      Select the level of difficulty with the n-back setting, the length
      of each round with the run time setting, and whether to include
      random colors and/or play an incorrect sound for incorrect answers.
    </p>
    <p className="mb-2">
      At the end of each round, you will be shown your score and can choose
      to start a new round or end the game.
    </p>
  </div>
  )
}
