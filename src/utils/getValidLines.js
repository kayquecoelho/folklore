export default function getValidLines(lyrics){
  const linesToEncrypt = lyrics.map((line, index) => {
    if (line.text.wordsToEncrypt.length > 0) {
      return index;
    }
    return false;
  });
  const validLines = linesToEncrypt.filter((line) => line !== false);

  return validLines;
}