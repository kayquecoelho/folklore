import useGameContext from "../../hooks/useGameContext";

import { Lyric } from "./style";
import Word from "./Word";

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
