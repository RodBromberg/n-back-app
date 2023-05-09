export const GameNav = ({ toggleOptionsModal, toggleInstructionsModal, onSoundButtonTouch, onLocationButtonTouch }) => {
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
          <li
            className="text-black p-2 rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300"
            onClick={toggleInstructionsModal}
          >
            How To Play
          </li>
        </ul>
        <div className="mt-4 flex justify-around">

        </div>
      </nav>

   
    </div>
  );
};
