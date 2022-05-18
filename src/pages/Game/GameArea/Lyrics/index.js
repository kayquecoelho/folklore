import styled from "styled-components";
import { useState } from "react";
import useGameContext from "../../../../hooks/useGameContext";
import useSongContext from "../../../../hooks/useSongContext";
import getValidLetters from "../../../../utils/getValidLetters";
import getNextIndexOfArray from "../../../../utils/getNextIndexOfArray";

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
  const ignore = ["'", ",", '"', "."];
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
  const { input, cursorPosition, setCursorPosition, validLines } =
    useGameContext();
  const { encryptedSongData } = useSongContext();

  function handleKeydown(e) {
    if (e.key.toLowerCase() === letter.toLowerCase()) {
      setReveal(true);

      changeCursorPosition(
        validLetters,
        wordsToEncrypt,
        setCursorPosition,
        validLines,
        encryptedSongData,
        cursorPosition
      );
    }
  }

  if (toIgnore) return letter;

  if (
    indexOfLetter === cursorPosition.letterIndex &&
    isCurrentWord &&
    isCurrentLine
  ) {
    return (
      <Cursor ref={input} autoFocus={true} onKeyDown={handleKeydown}>
        {reveal ? letter : <Circle />}
      </Cursor>
    );
  }

  return reveal ? letter : <Circle />;
}

function changeCursorPosition(
  validLetters,
  wordsToEncrypt,
  setCursorPosition,
  validLines,
  encryptedSongData,
  cursorPosition
) {
  const { letterIndex, wordIndex, lineIndex } = cursorPosition;
  const nextLetter = getNextIndexOfArray(validLetters, letterIndex);
  const { lyrics } = encryptedSongData;

  const nextValidLetter = validLetters[nextLetter];

  if (!nextValidLetter) {
    const nextWord = getNextIndexOfArray(wordsToEncrypt, wordIndex);
    const nextValidWord = wordsToEncrypt[nextWord];

    if (!nextValidWord) {
      const nextLine = getNextIndexOfArray(validLines, lineIndex);
      const nextValidLine = validLines[nextLine];

      if (!nextValidLine) {
      }

      const wordIndex = lyrics[nextValidLine].text.wordsToEncrypt[0];

      return setCursorPosition({
        lineIndex: nextValidLine,
        wordIndex,
        letterIndex: 0,
      });
    }

    return setCursorPosition({
      ...cursorPosition,
      wordIndex: wordsToEncrypt[nextWord],
      letterIndex: 0,
    });
  }

  setCursorPosition({
    ...cursorPosition,
    letterIndex: validLetters[nextLetter],
  });
}

const Cursor = styled.button`
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
