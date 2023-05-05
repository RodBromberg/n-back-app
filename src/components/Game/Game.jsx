import React, { useState, useEffect } from "react";
import Box from "../Box/Box";

const Game = () => {
  const [boxes, setBoxes] = useState([]);
  async function generateBoxes() {
    const boxesArray = [];
    // Generate 3 rows and 3 columns of boxes
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Create a blank box in the center
        if (i === 1 && j === 1) {
          boxesArray.push(
            <Box
              key={`${i}-${j}`}
              x={0}
              y={0}
              size={100}
              color="#FFFFFF"
            />
          );
        } else {
          boxesArray.push(
            <Box
              key={`${i}-${j}`}
              x={0}
              y={0}
              size={100}
              color="#000000"
            />
          );
        }
      }
    }
    setBoxes(boxesArray);
  }

  useEffect(() => {
    generateBoxes();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "300px" }}>
      {boxes}
    </div>
  );
};


export default Game;