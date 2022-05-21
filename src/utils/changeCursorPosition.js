import getNextIndexOfArray from "./getNextIndexOfArray";

export default function changeCursorPosition(
  validLetters,
  wordsToEncrypt,
  setCursorPosition,
  validLines,
  encryptedSongData,
  cursorPosition,
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
        return setCursorPosition({lineIndex: 0, wordIndex: 0, letterIndex: 0})
      }

      const wordIndex = lyrics[nextValidLine]?.text.wordsToEncrypt[0];

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