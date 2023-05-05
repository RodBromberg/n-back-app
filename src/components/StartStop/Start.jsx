import React from 'react'

export const Start = ({ startCountDown }) => {
  return (
    <div className="mt-8 flex">
    <button
        className="px-4 mr-5 py-2 bg-blue-500 text-white rounded-lg"
        onClick={startCountDown}
      >
        Start
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={handleStopClick}
      >
        Stop
      </button>
    </div>
  )
}
