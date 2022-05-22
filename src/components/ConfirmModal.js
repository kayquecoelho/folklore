import styled from "styled-components";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

import useGameContext from "../hooks/useGameContext";
import useSongContext from "../hooks/useSongContext";
import encryptLyrics from "../utils/encryptLyrics";
import getValidLines from "../utils/getValidLines";

export default function ConfirmModal({ setStatusOfPage, songData }) {
  const { setEncryptedSongData } = useSongContext();
  const { setValidLines, setCursorPosition, level } = useGameContext();

  function startGame() {
    const encryptedLyrics = encryptLyrics(songData, level.percentage);
    const validLines = getValidLines(encryptedLyrics.lyrics);
    const lineIndex = validLines[0];
    const wordIndex = encryptedLyrics.lyrics[lineIndex].text.wordsToEncrypt[0];

    setEncryptedSongData(encryptedLyrics);
    setValidLines(validLines);
    setCursorPosition({
      lineIndex,
      wordIndex,
      letterIndex: 0,
    });
  }

  return (
    <Container>
      <Level>{level.name}</Level>
      <FakeGameArea onClick={startGame}>
        Press here to start the game
      </FakeGameArea>
      <GetBackButton onClick={() => setStatusOfPage("select")} />
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  max-width: 1000px;

  position: relative;
  margin-top: 30px;
`;

const Level = styled.p`
  font-size: 26px;
  line-height: 26px;
`;

const FakeGameArea = styled.div`
  width: 100%;
  height: 400px;

  margin-top: 20px;
  background-color: #161d2f;
  border-radius: 5px;
  font-size: 30px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const GetBackButton = styled(BsFillArrowLeftSquareFill)`
  margin-top: 20px;
  font-size: 40px;
  cursor: pointer;

  color: #defead;
`;