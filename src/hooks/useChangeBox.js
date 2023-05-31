import { useEffect } from 'react'

export const useChangeBoxColor = (lastIndexColored, setBoxes, setLastIndexColored, runTime) => {
  useEffect(() => {
    if (lastIndexColored !== null) {
      const timeoutId = setTimeout(() => {
        setBoxes((prevBoxes) => {
          const resetBoxes = [...prevBoxes];
          resetBoxes[lastIndexColored].bgColor = "white";
          setLastIndexColored(null); // reset the lastIndexColored state variable
          return resetBoxes;
        });
      }, runTime - 500);
      return () => clearTimeout(timeoutId);
    }
  }, [lastIndexColored, runTime, setBoxes, setLastIndexColored]);
}
