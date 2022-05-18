export default function getValidLetters(word, ignore) {
  const wordsToEncrypt = word.map((letter, indexOfLetter) => {
    if (ignore.includes(letter)) return false;

    return indexOfLetter;
  });

  const validLetters = wordsToEncrypt.filter((indexOfLetter) => indexOfLetter !== false);

  return validLetters;
}
