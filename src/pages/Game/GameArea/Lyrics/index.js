import styled from "styled-components";
import { useState } from "react";
import useGameContext from "../../../../hooks/useGameContext";
import useSongContext from "../../../../hooks/useSongContext";

import getValidLetters from "../../../../utils/getValidLetters";
import determineWeight from "../../../../utils/determineWeight";
import changeCursorPosition from "../../../../utils/changeCursorPosition";

export default function Line({ text, part }) {
  const { lineContent, wordsToEncrypt } = text;
  const { cursorPosition } = useGameContext();

  if (wordsToEncrypt.length === 0)
    return <Lyric>{lineContent.join(" ")}</Lyric>;

  return (
    <Lyric>
      {lineContent.map((word, indexOfWord) => (
        <Word
          key={indexOfWord}
          word={word.split("")}
          encrypted={wordsToEncrypt.includes(indexOfWord)}
          isCurrentWord={cursorPosition.wordIndex === indexOfWord}
          isCurrentLine={cursorPosition.lineIndex === part - 1}
          wordsToEncrypt={wordsToEncrypt}
        />
      ))}
    </Lyric>
  );
}

function Word({
  word,
  encrypted,
  isCurrentWord,
  isCurrentLine,
  wordsToEncrypt,
}) {
  const ignore = [",", ".", '"', "-", "?", "!"]
  const validLetters = getValidLetters(word, ignore);

  if (!encrypted) return word.join("") + " ";

  return (
    <b>
      &nbsp;
      {word.map((letter, indexOfLetter) => (
        <EncryptedLetter
          key={indexOfLetter}
          indexOfLetter={indexOfLetter}
          isCurrentWord={isCurrentWord}
          isCurrentLine={isCurrentLine}
          toIgnore={ignore.includes(letter)}
          letter={letter}
          validLetters={validLetters}
          wordsToEncrypt={wordsToEncrypt}
        />
      ))}
      &nbsp;
    </b>
  );
}

function EncryptedLetter({
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
  } = useGameContext();
  const { encryptedSongData } = useSongContext();

  function handleKeydown(e) {
    let points = pointsSystem.points;
    let streak = pointsSystem.streak;
    
    if (e.key.toLowerCase() === letter.normalize("NFD").toLowerCase()) {
      setReveal(true);

      if (streak < 32) {
        streak += 1;
      }
      points += pointsSystem.weight;

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
      <Cursor ref={input} tabIndex="-1" onKeyDown={handleKeydown}>
        {reveal ? letter : <Circle />}
      </Cursor>
    );
  }

  return reveal ? letter : <Circle />;
}

const Cursor = styled.i`
  all: unset;
  box-sizing: border-box;

  background-color: #8b12e8;
  width: 10px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #fff;
`;

const Lyric = styled.li`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;

  b {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
`;
