export const GameNav = ({ toggleOptionsModal, toggleInstructionsModal, onSoundButtonTouch, onLocationButtonTouch }) => {
  return (
    <div className="game-nav fixed top-0 left-0 right-0 z-10">
  <nav>
    <ul className="mt-0 flex justify-around bg-white">
      <li className="text-black p-2 rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300">Home</li>
      <li
        className="text-black p-2 rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300"
        onClick={toggleOptionsModal}
      >
        Options
      </li>
      <li
        className="text-black p-2 rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300"
        onClick={toggleInstructionsModal}
      >
        How To Play
      </li>
    </ul>
    <div className="mt-4 flex justify-around">
      {/* Additional content */}
    </div>
  </nav>
</div>

  );
};
