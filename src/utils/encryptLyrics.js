export default function encryptLyrics(songData, levelPercentage) {
  let totalOfWords = 0;
  const lyrics = songData.lyrics.map((line) => {
    totalOfWords += line.text.length;
    return line.text;
  });

  const chosen = {};

  let amountOfWordsToBeChosen = Math.round(totalOfWords * (levelPercentage / 100));

  while (amountOfWordsToBeChosen !== 0) {
    const indexOfLine = getRandomIndex(lyrics.length);
    const indexOfWord = getRandomIndex(lyrics[indexOfLine].length);
    const word = lyrics[indexOfLine][indexOfWord];

    if (chosen[indexOfLine] !== undefined) {
      if (chosen[indexOfLine][indexOfWord] !== undefined) {
        continue;
      } else {
        chosen[indexOfLine] = { ...chosen[indexOfLine], [indexOfWord]: word };
      }
    } else {
      chosen[indexOfLine] = { [indexOfWord]: word };
    }
    amountOfWordsToBeChosen--;
  }

  function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  const formattedData = lyrics.map((line, index) => {
    if (chosen[index] !== undefined) {
      const wordsToEncrypt = Object.keys(chosen[index]).map(word => Number(word));
      return { lineContent: line, wordsToEncrypt };
    } else {
      return { lineContent: line, wordsToEncrypt: [] };
    }
  });
  
  const finalLyrics = songData.lyrics.map((lyric, index) => {
    return {...lyric, text: formattedData[index]}
  });

  return {...songData, lyrics: finalLyrics};
}
