export const GameNav = ({ toggleOptionsModal, onSoundButtonTouch, onLocationButtonTouch }) => {
  return (
    <div className="game-nav">
      <nav>
        <ul className="mt-0 flex justify-around bg-white">
          <li className="text-black p-2 rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300">home</li>
          <li
            className="text-black p-2 rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300"
            onClick={toggleOptionsModal}
          >
            options
          </li>
          <li className="text-black p-2 rounded cursor-pointer hover:bg-blue-700 color-white transition-colors duration-300">placeholder</li>
        </ul>
        <div className="mt-4 flex justify-around">
          {/* <button
            className="button w-40 h-40 bg-green-500 location-button"
            onClick={onSoundButtonTouch}
            onTouchStart={onSoundButtonTouch}
          >
            Sound (S)
          </button>
          <button
            className="button w-40 h-40 bg-green-500 location-button"
            onClick={onLocationButtonTouch}
            onTouchStart={onLocationButtonTouch}
          >
            Location (L)
          </button> */}
        </div>
      </nav>

   
    </div>
  );
};
