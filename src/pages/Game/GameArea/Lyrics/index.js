import styled from "styled-components";
import { useState } from "react";
import useGameContext from "../../../../hooks/useGameContext";
import useSongContext from "../../../../hooks/useSongContext";

export default function Line({ text, part }) {
  const { lineContent, toEncrypt } = text;
  const { cursorPosition } = useGameContext();

  if (toEncrypt.length === 0) return <Lyric>{lineContent.join(" ")}</Lyric>;

  return (
    <Lyric>
      {lineContent.map((word, index) => (
        <Word
          key={index}
          word={word.split("")}
          encrypted={toEncrypt.includes(index + "")}
          isCurrentWord={cursorPosition.wordIndex === index}
          isCurrentLine={cursorPosition.lineIndex === part - 1}
          toEncrypt={toEncrypt}
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
  toEncrypt,
}) {
  const ignore = ["'", ",", '"', "."];
  const validIndexes = word
    .map((letter, index) => {
      if (ignore.includes(letter)) {
        return false;
      }
      return index;
    })
    .filter((index) => index !== false);

  if (!encrypted) return word.join("") + " ";

  return (
    <b>
      &nbsp;
      {word.map((letter, index) => (
        <EncryptedLetter
          key={index}
          letter={letter}
          index={index}
          isCurrentWord={isCurrentWord}
          isCurrentLine={isCurrentLine}
          toIgnore={ignore.includes(letter)}
          validIndexes={validIndexes}
          toEncrypt={toEncrypt}
        />
      ))}
      &nbsp;
    </b>
  );
}

function EncryptedLetter({
  letter,
  isCurrentWord,
  isCurrentLine,
  toIgnore,
  validIndexes,
  index,
  toEncrypt,
}) {
  const [reveal, setReveal] = useState(false);
  const { input, cursorPosition, setCursorPosition, validLines } = useGameContext();
  const { encryptedSongData } = useSongContext();

  function handleKeydown(e) {
    e.preventDefault();
    if (e.key.toLowerCase() === letter.toLowerCase()) {
      setReveal(true);
      const nextLetter = validIndexes.indexOf(cursorPosition.letterIndex) + 1;
      
      if (!validIndexes[nextLetter]) {
        const nextWord = toEncrypt.indexOf(cursorPosition.wordIndex + "") + 1;

        if (!toEncrypt[nextWord]) {
          const nextLine = validLines.indexOf(cursorPosition.lineIndex) + 1;

          if (!validLines[nextLine]) {}
          const wordIndex = Number(encryptedSongData.lyrics[nextLine].text.toEncrypt[0]);

          return setCursorPosition({
            wordIndex,
            letterIndex: 0,
            lineIndex: validLines[nextLine],
          });
        }        

        return setCursorPosition({
          ...cursorPosition,
          letterIndex: 0,
          wordIndex: Number(toEncrypt[nextWord]),
        });
      }

      setCursorPosition({
        ...cursorPosition,
        letterIndex: validIndexes[nextLetter],
      });
    }
  }

  if (toIgnore) return letter;

  if (cursorPosition.letterIndex === index && isCurrentWord && isCurrentLine) {
    return (
      <Cursor ref={input} tabIndex="-1" onKeyDown={handleKeydown}>
        <Circle />
      </Cursor>
    );
  }

  return reveal ? letter : <Circle />;
}

const Cursor = styled.i`
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
