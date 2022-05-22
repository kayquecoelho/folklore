import getValidLetters from "../../utils/getValidLetters";
import EncryptedLetter from "./EncryptedLetter";

export default function Word({
  word,
  encrypted,
  isCurrentWord,
  isCurrentLine,
  wordsToEncrypt,
}) {
  const ignore = [",", ".", '"', "-", "?", "!", "'"]
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