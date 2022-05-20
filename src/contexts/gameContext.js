import { createContext, useState, useRef } from "react";

export const GameContext = createContext();

export default function GameProvider({ children }) {
  const input = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({
    lineIndex: 0,
    wordIndex: 0,
    letterIndex: 0,
  });
  const [validLines, setValidLines] = useState();
  const [pointsSystem, setPointsSystem] = useState({
    points: 0,
    streak: 0,
    weight: {
      value: 1,
      minValue: 0,
      maxValue: 12
    }
  });

  return (
    <GameContext.Provider
      value={{
        input,
        cursorPosition,
        setCursorPosition,
        setValidLines,
        validLines,
        pointsSystem,
        setPointsSystem
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
