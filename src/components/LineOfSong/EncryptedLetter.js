import { useState } from "react";
import useGameContext from "../../hooks/useGameContext";
import useSongContext from "../../hooks/useSongContext";
import changeCursorPosition from "../../utils/changeCursorPosition";
import determineWeight from "../../utils/determineWeight";
import { Circle, Cursor } from "./style";

export default function EncryptedLetter({
  isCurrentWord,
  isCurrentLine,
  indexOfLetter,
  letter,
  toIgnore,
  validLetters,
  wordsToEncrypt,
}) {
  const [reveal, setReveal] = useState(false);
  const {
    input,
    cursorPosition,
    setCursorPosition,
    validLines,
    pointsSystem,
    setPointsSystem,
    setShowFocusModal
  } = useGameContext();
  const { encryptedSongData } = useSongContext();

  function handleKeydown(e) {
    let points = pointsSystem.points;
    let streak = pointsSystem.streak;
    const refLetter = letter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    if (e.key.toLowerCase() === refLetter) {
      setReveal(true);

      if (streak < 96) {
        streak += 1;
      }
      points += pointsSystem.weight.value;

      changeCursorPosition(
        validLetters,
        wordsToEncrypt,
        setCursorPosition,
        validLines,
        encryptedSongData,
        cursorPosition,
      );
    } else {
      if (streak > 0) {
        streak -= 1;        
      }
    }

    const weight = determineWeight(streak);
    setPointsSystem({points, streak, weight});
  }

  if (toIgnore) return letter; 

  const isCurrentLetter = indexOfLetter === cursorPosition.letterIndex;
  if (isCurrentLetter && isCurrentWord && isCurrentLine) {
    return (
      <Cursor ref={input} tabIndex="-1" onKeyDown={handleKeydown} onBlur={() => setShowFocusModal(true)}>
        {reveal ? letter : <Circle />}
      </Cursor>
    );
  }

  return reveal ? letter : <Circle />;
}