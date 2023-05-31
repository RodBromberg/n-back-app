import { useEffect, useState } from 'react';

export const useGetTally = (total, nBack, soundIndexes, colorIndexes, indexes, setInCorrectLetter, setIncorrectColor, setInCorrectBox, internalCount) => {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (total > nBack) {
      if (!fired && soundIndexes[nBack - nBack + internalCount] === soundIndexes[soundIndexes.length - 1]) {
        setInCorrectLetter((k) => k + 1);
        setFired(true);
      }

      if (!fired && colorIndexes[nBack - nBack + internalCount] === colorIndexes[colorIndexes.length - 1]) {
        setIncorrectColor((k) => k + 1);
        setFired(true);
      }

      if (!fired && indexes[nBack - nBack + internalCount] === indexes[indexes.length - 1]) {
        setInCorrectBox((k) => k + 1);
        setFired(true);
      }
    }

    setFired(false);
  }, [total, nBack, soundIndexes, colorIndexes, indexes, internalCount, setInCorrectLetter, setIncorrectColor, setInCorrectBox]);

  return { fired };
};

// Usage example
// const MyComponent = () => {
//   const { fired } = useIncorrectAnswer(
//     total,
//     nBack,
//     soundIndexes,
//     colorIndexes,
//     indexes,
//     setInCorrectLetter,
//     setIncorrectColor,
//     setInCorrectBox
//   );

//   // Rest of the component code

//   return (
//     // JSX code
//   );
// };
