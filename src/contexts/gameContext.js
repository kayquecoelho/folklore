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

  return (
    <GameContext.Provider
      value={{
        input,
        cursorPosition,
        setCursorPosition,
        setValidLines,
        validLines,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
