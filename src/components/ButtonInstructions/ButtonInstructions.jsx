import React from 'react'

export const ButtonInstructions = ({
    letter
}) => {
  return (
    <div className="flex items-center justify-center mb-4">
    <div className="bg-gray-500 full p-4 m-2">
      <div className="text-white text-center font-bold">
        Click '{letter}' to Match Sound
      </div>
    </div>
  </div>
  )
}
