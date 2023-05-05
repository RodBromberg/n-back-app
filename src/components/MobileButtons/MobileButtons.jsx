import React from 'react'

export const MobileButtons = ({handleLocationButtonTouch,handleSoundButtonTouch}) => {
  return (
    <div className="sm:hidden">
    <button
      className="button w-40 h-40 m-5 bg-green-500 location-button"
      onClick={handleSoundButtonTouch}
      onTouchStart={handleSoundButtonTouch}
    >
      Sound (S)
    </button>
    <button
      className="button w-40 h-40 bg-green-500 location-button"
      onClick={handleSoundButtonTouch}
      onTouchStart={handleLocationButtonTouch}
    >
      Location (L)
    </button>
  </div>
  )
}
