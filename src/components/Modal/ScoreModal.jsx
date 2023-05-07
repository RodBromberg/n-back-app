export const ScoreModal = ({
    correctLetter,
    inCorrectLetter,
    correctBox,
    inCorrectBox,
    randomColor,
    onClose,
    onNextRound,
  }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="bg-white rounded-md p-8">
          <p className="mb-2 text-lg font-bold">
            Sound: {`${correctLetter} / ${correctLetter + inCorrectLetter}`}
          </p>
          <p className="mb-2 text-lg font-bold">
            Location: {`${correctBox} / ${correctBox + inCorrectBox}`}
          </p>
          <p className="mb-2 text-lg font-bold">
            {randomColor ? <>Color: {`${correctLetter} / ${correctLetter + inCorrectLetter}`} </>: null}
          </p>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={onNextRound}
            >
              Next Round
            </button>
            <button className="btn" onClick={onClose}>
          Close
        </button>

          </div>
        </div>
      </div>
    );
  };
  